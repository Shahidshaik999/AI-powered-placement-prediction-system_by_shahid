@echo off
echo Starting Placement Predictor Backend...
echo.

REM Check if model exists
if not exist "placement_model.pkl" (
    echo Model not found. Training model first...
    python train_model.py
    echo.
)

echo Starting FastAPI server...
uvicorn main:app --reload --host 0.0.0.0 --port 8000
