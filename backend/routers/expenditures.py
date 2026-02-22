from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

import models, schemas
from database import get_db

router = APIRouter(
    prefix="/api/expenditures",
    tags=["expenditures"]
)

@router.get("/", response_model=List[schemas.Expenditure])
def read_expenditures(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    expenditures = db.query(models.Expenditure).offset(skip).limit(limit).all()
    return expenditures

@router.post("/", response_model=schemas.Expenditure)
def create_expenditure(expenditure: schemas.ExpenditureCreate, db: Session = Depends(get_db)):
    db_exp = models.Expenditure(**expenditure.model_dump())
    db.add(db_exp)
    db.commit()
    db.refresh(db_exp)
    return db_exp

@router.put("/{expenditure_id}", response_model=schemas.Expenditure)
def update_expenditure(expenditure_id: int, expenditure: schemas.ExpenditureUpdate, db: Session = Depends(get_db)):
    db_exp = db.query(models.Expenditure).filter(models.Expenditure.id == expenditure_id).first()
    if db_exp is None:
        raise HTTPException(status_code=404, detail="Expenditure not found")
    
    update_data = expenditure.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_exp, key, value)
        
    db.commit()
    db.refresh(db_exp)
    return db_exp

@router.delete("/{expenditure_id}")
def delete_expenditure(expenditure_id: int, db: Session = Depends(get_db)):
    db_exp = db.query(models.Expenditure).filter(models.Expenditure.id == expenditure_id).first()
    if db_exp is None:
        raise HTTPException(status_code=404, detail="Expenditure not found")
        
    db.delete(db_exp)
    db.commit()
    return {"message": "Expenditure deleted successfully"}
