# Placement Predictor Backend

This is the FastAPI backend for the Placement Predictor AI project. It uses a Random Forest machine learning model to predict student placement outcomes.

## Setup Instructions

### 1. Install Python Dependencies

Make sure you have Python 3.8+ installed, then run:

```bash
cd backend
pip install -r requirements.txt
```

### 2. Train the Model

Before running the API, you need to train the model:

```bash
python train_model.py
```

This will:
- Load the `Placement_Data_Full_Class.csv` dataset
- Preprocess and encode categorical features
- Train a Random Forest classifier
- Save the trained model as `placement_model.pkl`
- Display model accuracy and performance metrics

### 3. Start the FastAPI Server

```bash
uvicorn main:app --reload
```

The API will be available at: `http://localhost:8000`

## API Endpoints

### GET `/`
Health check endpoint that returns API status and model loading status.

### POST `/predict`
Predicts placement outcome for a student.

**Request Body:**
```json
{
  "gender": "M",
  "ssc_p": 67.0,
  "ssc_b": "Others",
  "hsc_p": 91.0,
  "hsc_b": "Others",
  "hsc_s": "Commerce",
  "degree_p": 58.0,
  "degree_t": "Sci&Tech",
  "workex": "No",
  "etest_p": 55.0,
  "specialisation": "Mkt&HR",
  "mba_p": 58.8
}
```

**Response:**
```json
{
  "placement_status": "Placed",
  "probability": 87.4,
  "confidence": 87.4
}
```

### GET `/health`
Returns server health status.

## Testing the API

You can test the API using curl:

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "gender": "M",
    "ssc_p": 67,
    "ssc_b": "Others",
    "hsc_p": 91,
    "hsc_b": "Others",
    "hsc_s": "Commerce",
    "degree_p": 58,
    "degree_t": "Sci&Tech",
    "workex": "No",
    "etest_p": 55,
    "specialisation": "Mkt&HR",
    "mba_p": 58.8
  }'
```

Or visit the interactive API docs at: `http://localhost:8000/docs`

## Model Details

- **Algorithm**: Random Forest Classifier
- **Features**: 11 input features (academic scores, work experience, specialization)
- **Target**: Binary classification (Placed / Not Placed)
- **Encoding**: Label encoding for categorical variables

## CORS Configuration

CORS is enabled for all origins in development. For production, update the `allow_origins` in `main.py` to specify exact frontend URLs.
