from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

import models, schemas
from database import get_db

router = APIRouter(
    prefix="/api/rent",
    tags=["rent"]
)

@router.get("/", response_model=List[schemas.RentPayment])
def read_rent_payments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    payments = db.query(models.RentPayment).offset(skip).limit(limit).all()
    return payments

@router.post("/", response_model=schemas.RentPayment)
def create_rent_payment(payment: schemas.RentPaymentCreate, db: Session = Depends(get_db)):
    db_payment = models.RentPayment(**payment.model_dump())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

@router.put("/{payment_id}", response_model=schemas.RentPayment)
def update_rent_payment(payment_id: int, payment: schemas.RentPaymentUpdate, db: Session = Depends(get_db)):
    db_payment = db.query(models.RentPayment).filter(models.RentPayment.id == payment_id).first()
    if db_payment is None:
        raise HTTPException(status_code=404, detail="Rent payment not found")
    
    update_data = payment.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_payment, key, value)
        
    db.commit()
    db.refresh(db_payment)
    return db_payment
