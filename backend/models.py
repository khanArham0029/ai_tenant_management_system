from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Date
from sqlalchemy.orm import relationship

from database import Base

class Tenant(Base):
    __tablename__ = "tenants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    unit = Column(String, index=True)
    phone = Column(String)
    cnic = Column(String)
    monthly_rent = Column(Float)
    agreement_start = Column(Date)
    agreement_end = Column(Date)
    status = Column(String, default="active")
    security_deposit = Column(Float)

    rent_payments = relationship("RentPayment", back_populates="tenant")

class RentPayment(Base):
    __tablename__ = "rent_payments"

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    tenant_name = Column(String)
    month = Column(String)
    amount = Column(Float)
    status = Column(String, default="pending")
    paid_date = Column(Date, nullable=True)

    tenant = relationship("Tenant", back_populates="rent_payments")

class Expenditure(Base):
    __tablename__ = "expenditures"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)
    category = Column(String)
    description = Column(String)
    amount = Column(Float)
    type = Column(String)
