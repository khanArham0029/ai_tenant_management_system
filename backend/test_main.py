from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
import pytest

from main import app
from database import get_db, Base

# Setup an in-memory SQLite database for testing to avoid touching production data
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency override
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

# Fixture to create tables before each test and drop them after
@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

# --- Health Check Tests ---
def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

# ========================================
# --- Tenant Tests (CRUD + Errors) ---
# ========================================

def test_create_tenant():
    response = client.post(
        "/api/tenants/",
        json={
            "name": "John Doe",
            "unit": "A-101",
            "phone": "555-1234",
            "cnic": "12345-6789012-3",
            "monthly_rent": 1500.0,
            "agreement_start": "2026-01-01",
            "agreement_end": "2026-12-31",
            "status": "active",
            "security_deposit": 3000.0
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "John Doe"
    assert data["unit"] == "A-101"
    assert "id" in data

def test_read_tenants():
    # First create one
    client.post(
        "/api/tenants/",
        json={
            "name": "Jane Doe",
            "unit": "B-202",
            "phone": "555-5678",
            "cnic": "09876-5432109-8",
            "monthly_rent": 1200.0,
            "agreement_start": "2026-02-01",
            "agreement_end": "2027-01-31",
            "status": "active",
            "security_deposit": 2400.0
        }
    )
    response = client.get("/api/tenants/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1

def test_update_tenant():
    # Create tenant
    create_response = client.post(
        "/api/tenants/",
        json={
            "name": "Update Me",
            "unit": "C-303",
            "phone": "123",
            "cnic": "111",
            "monthly_rent": 1000.0,
            "agreement_start": "2026-01-01",
            "agreement_end": "2026-12-31",
            "status": "active",
            "security_deposit": 2000.0
        }
    )
    tenant_id = create_response.json()["id"]

    # Update tenant
    update_response = client.put(
        f"/api/tenants/{tenant_id}",
        json={
            "name": "Updated Name",
            "monthly_rent": 1100.0
        }
    )
    assert update_response.status_code == 200
    data = update_response.json()
    assert data["name"] == "Updated Name"
    assert data["monthly_rent"] == 1100.0

def test_update_tenant_not_found():
    update_response = client.put(
        "/api/tenants/9999",
        json={"name": "Ghost"}
    )
    assert update_response.status_code == 404
    assert update_response.json()["detail"] == "Tenant not found"

def test_delete_tenant():
    # Create tenant
    create_response = client.post(
        "/api/tenants/",
        json={
            "name": "Delete Me",
            "unit": "D-404",
            "phone": "123",
            "cnic": "111",
            "monthly_rent": 1000.0,
            "agreement_start": "2026-01-01",
            "agreement_end": "2026-12-31",
            "status": "active",
            "security_deposit": 2000.0
        }
    )
    tenant_id = create_response.json()["id"]

    # Delete tenant
    delete_response = client.delete(f"/api/tenants/{tenant_id}")
    assert delete_response.status_code == 200

    # Ensure it's deleted by trying to update it
    update_response = client.put(f"/api/tenants/{tenant_id}", json={"name": "x"})
    assert update_response.status_code == 404

def test_delete_tenant_not_found():
    delete_response = client.delete("/api/tenants/9999")
    assert delete_response.status_code == 404
    assert delete_response.json()["detail"] == "Tenant not found"


# ========================================
# --- Rent Payment Tests (CRUD + Errors) ---
# ========================================

def test_create_rent_payment():
    response = client.post(
        "/api/rent/",
        json={
            "tenant_id": 1,
            "tenant_name": "Jane Doe",
            "month": "February 2026",
            "amount": 1200.0,
            "status": "pending",
            "paid_date": None
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["tenant_id"] == 1
    assert data["status"] == "pending"

def test_read_rent_payments():
    response = client.get("/api/rent/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_update_rent_payment():
    create_response = client.post(
        "/api/rent/",
        json={
            "tenant_id": 2,
            "tenant_name": "Test Tenant",
            "month": "March 2026",
            "amount": 1000.0,
            "status": "pending"
        }
    )
    payment_id = create_response.json()["id"]

    update_response = client.put(
        f"/api/rent/{payment_id}",
        json={
            "status": "paid",
            "paid_date": "2026-03-05"
        }
    )
    assert update_response.status_code == 200
    assert update_response.json()["status"] == "paid"
    assert update_response.json()["paid_date"] == "2026-03-05"

def test_update_rent_payment_not_found():
    update_response = client.put(
        "/api/rent/9999",
        json={"status": "paid"}
    )
    assert update_response.status_code == 404
    assert update_response.json()["detail"] == "Rent payment not found"

# ========================================
# --- Expenditure Tests (CRUD + Errors) ---
# ========================================

def test_create_expenditure():
    response = client.post(
        "/api/expenditures/",
        json={
            "date": "2026-02-15",
            "category": "Plumbing",
            "description": "Fix master bathroom pipe",
            "amount": 450.0,
            "type": "maintenance"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["amount"] == 450.0

def test_read_expenditures():
    response = client.get("/api/expenditures/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_update_expenditure():
    create_response = client.post(
        "/api/expenditures/",
        json={
            "date": "2026-03-01",
            "category": "Tax",
            "description": "Property Tax",
            "amount": 1000.0,
            "type": "tax"
        }
    )
    exp_id = create_response.json()["id"]

    update_response = client.put(
        f"/api/expenditures/{exp_id}",
        json={
            "amount": 1200.0
        }
    )
    assert update_response.status_code == 200
    assert update_response.json()["amount"] == 1200.0

def test_update_expenditure_not_found():
    update_response = client.put(
        "/api/expenditures/9999",
        json={"amount": 1200.0}
    )
    assert update_response.status_code == 404
    assert update_response.json()["detail"] == "Expenditure not found"

def test_delete_expenditure():
    create_response = client.post(
        "/api/expenditures/",
        json={
            "date": "2026-04-01",
            "category": "Supplies",
            "description": "Lightbulbs",
            "amount": 50.0,
            "type": "utility"
        }
    )
    exp_id = create_response.json()["id"]

    # Delete
    delete_response = client.delete(f"/api/expenditures/{exp_id}")
    assert delete_response.status_code == 200
    assert delete_response.json()["message"] == "Expenditure deleted successfully"

    # Verify not found
    update_response = client.put(f"/api/expenditures/{exp_id}", json={"amount": 60})
    assert update_response.status_code == 404

def test_delete_expenditure_not_found():
    delete_response = client.delete("/api/expenditures/9999")
    assert delete_response.status_code == 404
    assert delete_response.json()["detail"] == "Expenditure not found"
