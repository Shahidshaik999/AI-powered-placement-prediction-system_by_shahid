from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd
import numpy as np
from typing import Dict

app = FastAPI(title="Placement Predictor API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and encoders
try:
    with open('placement_model.pkl', 'rb') as f:
        model_data = pickle.load(f)
    
    model = model_data['model']
    label_encoders = model_data['label_encoders']
    target_encoder = model_data['target_encoder']
    feature_columns = model_data['feature_columns']
    print("Model loaded successfully!")
except FileNotFoundError:
    print("Error: placement_model.pkl not found. Please run train_model.py first.")
    model = None

# Input schema
class StudentData(BaseModel):
    gender: str
    ssc_p: float
    ssc_b: str
    hsc_p: float
    hsc_b: str
    hsc_s: str
    degree_p: float
    degree_t: str
    workex: str
    etest_p: float
    specialisation: str
    mba_p: float

@app.get("/")
def read_root():
    return {
        "message": "Placement Predictor API",
        "status": "running",
        "model_loaded": model is not None
    }

@app.post("/predict")
def predict_placement(data: StudentData) -> Dict:
    if model is None:
        raise HTTPException(
            status_code=500,
            detail="Model not loaded. Please run train_model.py first."
        )
    
    try:
        # Convert input to dictionary
        input_dict = data.dict()
        
        # Encode categorical variables
        encoded_data = {}
        for col, value in input_dict.items():
            if col in label_encoders:
                try:
                    encoded_data[col] = label_encoders[col].transform([value])[0]
                except ValueError:
                    # Handle unknown categories
                    encoded_data[col] = 0
            else:
                encoded_data[col] = value
        
        # Create DataFrame with correct column order
        input_df = pd.DataFrame([encoded_data])[feature_columns]
        
        # Make prediction
        prediction = model.predict(input_df)[0]
        prediction_proba = model.predict_proba(input_df)[0]
        
        # Get placement probability (probability of being placed)
        placement_status = target_encoder.inverse_transform([prediction])[0]
        
        # Get probability for "Placed" class
        placed_class_idx = list(target_encoder.classes_).index("Placed")
        placement_probability = float(prediction_proba[placed_class_idx] * 100)
        
        return {
            "placement_status": placement_status,
            "probability": round(placement_probability, 2),
            "confidence": round(max(prediction_proba) * 100, 2)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None}
