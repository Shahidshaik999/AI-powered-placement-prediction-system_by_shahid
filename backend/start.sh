#!/bin/bash

echo "🚀 Starting Placement Predictor Backend..."
echo ""

# Check if model exists
if [ ! -f "placement_model.pkl" ]; then
    echo "⚠️  Model not found. Training model first..."
    python train_model.py
    echo ""
fi

echo "🔥 Starting FastAPI server..."
uvicorn main:app --reload --host 0.0.0.0 --port 8000
