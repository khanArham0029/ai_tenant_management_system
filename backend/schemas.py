from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import date

# -----------------
# TENANT SCHEMAS
# -----------------
class TenantBase(BaseModel):
    name: str
    unit: str
    phone: str
    cnic: str
    monthly_rent: float
    agreement_start: date
    agreement_end: date
    status: str = "active"
    security_deposit: float

class TenantCreate(TenantBase):
    pass

class TenantUpdate(BaseModel):
    name: Optional[str] = None
    unit: Optional[str] = None
    phone: Optional[str] = None
    cnic: Optional[str] = None
    monthly_rent: Optional[float] = None
    agreement_start: Optional[date] = None
    agreement_end: Optional[date] = None
    status: Optional[str] = None
    security_deposit: Optional[float] = None

class Tenant(TenantBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

# -----------------
# RENT PAYMENT SCHEMAS
# -----------------
class RentPaymentBase(BaseModel):
    tenant_id: int
    tenant_name: str
    month: str
    amount: float
    status: str = "pending"
    paid_date: Optional[date] = None

class RentPaymentCreate(RentPaymentBase):
    pass

class RentPaymentUpdate(BaseModel):
    status: Optional[str] = None
    paid_date: Optional[date] = None

class RentPayment(RentPaymentBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

# -----------------
# EXPENDITURE SCHEMAS
# -----------------
class ExpenditureBase(BaseModel):
    date: date
    category: str
    description: str
    amount: float
    type: str

class ExpenditureCreate(ExpenditureBase):
    pass

class ExpenditureUpdate(BaseModel):
    date: Optional[date] = None
    category: Optional[str] = None
    description: Optional[str] = None
    amount: Optional[float] = None
    type: Optional[str] = None

class Expenditure(ExpenditureBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
