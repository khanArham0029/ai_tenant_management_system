from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import models
from database import engine
from routers import tenants, rent, expenditures

# Create all database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Tenant Management System API",
    description="Backend API for managing tenants, rent, and expenditures",
    version="1.0.0"
)

# Configure CORS for local frontend development
origins = [
    "http://localhost:5173", # Vite default port
    "http://localhost:3000",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Backend API is running successfully!"}

app.include_router(tenants.router)
app.include_router(rent.router)
app.include_router(expenditures.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
