# 🎓 Placement Predictor AI

<div align="center">

![Placement Predictor AI](https://img.shields.io/badge/ML-Placement%20Predictor-blue)
![Python](https://img.shields.io/badge/Python-3.8+-green)
![React](https://img.shields.io/badge/React-18.3-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-teal)
![License](https://img.shields.io/badge/License-MIT-yellow)

**An AI-powered web application that predicts student placement outcomes using machine learning**

[Features](#-features) • [Demo](#-project-demo-workflow) • [Installation](#-installation-guide) • [API](#-api-endpoint) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 Project Description

**Placement Predictor AI** is a full-stack machine learning web application designed to predict whether a student will be placed during campus recruitment based on their academic performance and background. 

### The Problem
Students often wonder about their chances of getting placed during campus recruitment drives. This uncertainty can cause anxiety and make it difficult to focus on areas that need improvement.

### The Solution
This application leverages machine learning to analyze historical placement data and predict placement outcomes with high accuracy. By inputting academic details such as SSC percentage, HSC percentage, degree performance, work experience, and test scores, students can get instant predictions about their placement probability.

### How It Works
The system uses a **Random Forest Classifier** trained on real campus placement data to make predictions. The model analyzes patterns in academic performance, educational background, and other factors to determine the likelihood of placement.

---

## 🎬 Project Demo Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  1. User enters student academic details in the web form   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  2. Frontend sends POST request to FastAPI backend          │
│     Endpoint: http://localhost:8000/predict                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  3. FastAPI backend receives and validates the data         │
│     - Encodes categorical features                          │
│     - Prepares data for model input                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  4. Machine Learning model makes prediction                 │
│     - Loads trained Random Forest model                     │
│     - Predicts placement status                             │
│     - Calculates probability score                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  5. Result returned to frontend as JSON                     │
│     {"placement_status": "Placed", "probability": 87.4}     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  6. Frontend displays animated prediction result            │
│     - Circular progress indicator                           │
│     - Placement status (Placed/Not Placed)                  │
│     - Confidence percentage                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

- 🤖 **AI-Based Placement Prediction** - Uses Random Forest machine learning algorithm for accurate predictions
- 🎨 **Modern Responsive UI** - Beautiful, mobile-friendly interface built with React and Tailwind CSS
- ⚡ **FastAPI Backend** - High-performance REST API with automatic documentation
- 📊 **Real Dataset Training** - Model trained on actual campus placement data (215+ records)
- 🎯 **Probability Scoring** - Get confidence percentage along with prediction
- 🔄 **Real-Time Predictions** - Instant results in milliseconds
- 📱 **Cross-Platform** - Works on desktop, tablet, and mobile devices
- 🎭 **Animated Results** - Engaging UI with smooth animations and transitions
- 🔒 **Input Validation** - Robust data validation using Pydantic schemas
- 📈 **High Accuracy** - Model achieves ~85% accuracy on test data

---

## 🛠️ Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript for better code quality
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Animation library for smooth transitions
- **Vite** - Next-generation frontend build tool

### Backend
- **Python 3.8+** - Programming language
- **FastAPI** - Modern web framework for building APIs
- **Uvicorn** - ASGI server for running FastAPI applications
- **Pydantic** - Data validation using Python type annotations

### Machine Learning
- **Scikit-learn** - Machine learning library for model training
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing library
- **Pickle** - Model serialization

---

## 📊 Dataset

The model is trained on the **Placement_Data_Full_Class.csv** dataset, which contains campus placement records of students with the following features:

### Input Features (11 features)

| Feature | Description | Type |
|---------|-------------|------|
| **gender** | Student's gender (M/F) | Categorical |
| **ssc_p** | Secondary School Certificate percentage (10th grade) | Numerical |
| **ssc_b** | Board of Education for SSC (Central/Others) | Categorical |
| **hsc_p** | Higher Secondary Certificate percentage (12th grade) | Numerical |
| **hsc_b** | Board of Education for HSC (Central/Others) | Categorical |
| **hsc_s** | Specialization in HSC (Science/Commerce/Arts) | Categorical |
| **degree_p** | Degree percentage (Undergraduate) | Numerical |
| **degree_t** | Type of degree (Sci&Tech/Comm&Mgmt/Others) | Categorical |
| **workex** | Work experience (Yes/No) | Categorical |
| **etest_p** | Employability test percentage | Numerical |
| **specialisation** | MBA specialization (Mkt&HR/Mkt&Fin) | Categorical |
| **mba_p** | MBA percentage | Numerical |

### Target Variable
- **status** - Placement status (Placed/Not Placed) - Binary classification

### Dataset Statistics
- **Total Records**: 215 students
- **Features**: 11 input features + 1 target variable
- **Class Distribution**: Balanced dataset with both placed and not placed students

---

## 🤖 Machine Learning Model

### Algorithm
The project uses **Random Forest Classifier**, an ensemble learning method that operates by constructing multiple decision trees during training and outputting the class that is the mode of the classes of individual trees.

### Why Random Forest?
- High accuracy for classification tasks
- Handles both numerical and categorical features
- Resistant to overfitting
- Provides feature importance rankings
- Works well with small to medium-sized datasets

### Model Training Pipeline

```python
1. Data Loading
   └─> Load Placement_Data_Full_Class.csv using Pandas

2. Data Preprocessing
   ├─> Remove unnecessary columns (sl_no, salary)
   └─> Handle missing values (if any)

3. Feature Encoding
   ├─> Label Encoding for categorical features
   │   ├─> gender: M/F → 0/1
   │   ├─> ssc_b: Central/Others → 0/1
   │   ├─> hsc_b: Central/Others → 0/1
   │   ├─> hsc_s: Science/Commerce/Arts → 0/1/2
   │   ├─> degree_t: Sci&Tech/Comm&Mgmt/Others → 0/1/2
   │   ├─> workex: Yes/No → 0/1
   │   └─> specialisation: Mkt&HR/Mkt&Fin → 0/1
   └─> Target encoding: Placed/Not Placed → 1/0

4. Train-Test Split
   └─> 80% training data, 20% testing data

5. Model Training
   ├─> Algorithm: Random Forest Classifier
   ├─> Number of estimators: 100 trees
   ├─> Max depth: 10
   └─> Random state: 42 (for reproducibility)

6. Model Evaluation
   ├─> Accuracy: ~85%
   ├─> Precision: High for both classes
   ├─> Recall: Balanced performance
   └─> F1-Score: Good overall metric

7. Model Serialization
   └─> Save model using pickle as placement_model.pkl
       (includes model + encoders + feature columns)
```

### Model Performance
- **Accuracy**: ~85% on test data
- **Prediction Time**: <50ms per request
- **Model Size**: ~2-3 MB (serialized)

---

## 📁 Project Structure

```
placement-predictor-ai/
│
├── backend/                          # Python FastAPI Backend
│   ├── main.py                       # FastAPI application with API endpoints
│   ├── train_model.py                # ML model training script
│   ├── test_api.py                   # API testing utility
│   ├── placement_model.pkl           # Trained ML model (generated)
│   ├── Placement_Data_Full_Class.csv # Training dataset
│   ├── requirements.txt              # Python dependencies
│   ├── start.bat                     # Windows quick start script
│   ├── start.sh                      # Linux/Mac quick start script
│   └── README.md                     # Backend documentation
│
├── src/                              # React Frontend Source
│   ├── pages/
│   │   ├── LandingPage.tsx          # Home page with hero section
│   │   ├── PredictPage.tsx          # Prediction form and results
│   │   └── NotFound.tsx             # 404 page
│   ├── components/
│   │   ├── ui/                      # Reusable UI components
│   │   └── NavLink.tsx              # Navigation component
│   ├── hooks/                       # Custom React hooks
│   ├── lib/                         # Utility functions
│   └── main.tsx                     # Application entry point
│
├── public/                           # Static assets
│   ├── favicon.ico
│   └── placeholder.svg
│
├── package.json                      # Node.js dependencies
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── vite.config.ts                    # Vite build configuration
├── index.html                        # HTML entry point
│
├── README.md                         # This file
├── QUICK_START.md                    # Quick setup guide
├── SETUP_GUIDE.md                    # Detailed setup instructions
└── ARCHITECTURE.md                   # System architecture documentation
```

---

## 🚀 Installation Guide

### Prerequisites
- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 16+** - [Download Node.js](https://nodejs.org/)
- **pip** - Python package manager (comes with Python)
- **npm** - Node package manager (comes with Node.js)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Shahidshaik999/AI-powered-placement-prediction-system_by_shahid.git
cd AI-powered-placement-prediction-system_by_shahid
```

### Step 2: Backend Setup

#### 2.1 Navigate to Backend Directory
```bash
cd backend
```

#### 2.2 Install Python Dependencies
```bash
pip install -r requirements.txt
```

This will install:
- fastapi
- uvicorn
- pandas
- scikit-learn
- numpy
- pydantic

#### 2.3 Train the Machine Learning Model
```bash
python train_model.py
```

**Expected Output:**
```
Model Accuracy: 85.00%

Classification Report:
              precision    recall  f1-score   support
   Not Placed       0.82      0.75      0.78        16
       Placed       0.87      0.91      0.89        27

Model saved successfully as 'placement_model.pkl'
```

#### 2.4 Start the FastAPI Server
```bash
uvicorn main:app --reload
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
Model loaded successfully!
```

The backend API will be available at: **http://localhost:8000**

**API Documentation**: Visit http://localhost:8000/docs for interactive Swagger UI

### Step 3: Frontend Setup

#### 3.1 Open New Terminal and Navigate to Project Root
```bash
cd ..
# You should now be in the project root directory
```

#### 3.2 Install Node Dependencies
```bash
npm install
```

#### 3.3 Start the Development Server
```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.4.19  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

The frontend will be available at: **http://localhost:5173**

### Step 4: Test the Application

1. Open your browser and navigate to **http://localhost:5173**
2. Click on **"Start Prediction"** button
3. Fill in the student details (or use the pre-filled default values)
4. Click **"Predict Placement"**
5. View the prediction result with probability percentage

---

## 🔌 API Endpoint

### POST `/predict`

Predicts placement status for a student based on academic details.

#### Request

**URL**: `http://localhost:8000/predict`

**Method**: `POST`

**Headers**:
```json
{
  "Content-Type": "application/json"
}
```

**Body** (JSON):
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

#### Response

**Success Response** (200 OK):
```json
{
  "placement_status": "Placed",
  "probability": 87.4,
  "confidence": 87.4
}
```

**Field Descriptions**:
- `placement_status`: Predicted outcome ("Placed" or "Not Placed")
- `probability`: Probability of being placed (0-100%)
- `confidence`: Model's confidence in the prediction (0-100%)

#### Example using cURL

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

#### Example using Python

```python
import requests

url = "http://localhost:8000/predict"
data = {
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
}

response = requests.post(url, json=data)
result = response.json()
print(f"Placement Status: {result['placement_status']}")
print(f"Probability: {result['probability']}%")
```

#### Example using JavaScript

```javascript
fetch("http://localhost:8000/predict", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    gender: "M",
    ssc_p: 67,
    ssc_b: "Others",
    hsc_p: 91,
    hsc_b: "Others",
    hsc_s: "Commerce",
    degree_p: 58,
    degree_t: "Sci&Tech",
    workex: "No",
    etest_p: 55,
    specialisation: "Mkt&HR",
    mba_p: 58.8
  })
})
.then(response => response.json())
.then(data => {
  console.log("Placement Status:", data.placement_status);
  console.log("Probability:", data.probability + "%");
});
```

### Other Endpoints

#### GET `/`
Returns API status and model loading status.

**Response**:
```json
{
  "message": "Placement Predictor API",
  "status": "running",
  "model_loaded": true
}
```

#### GET `/health`
Health check endpoint for monitoring.

**Response**:
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

---
## 🔮 Output Screenshots
<img width="1102" height="770" alt="image" src="https://github.com/user-attachments/assets/9d7f9d09-7cba-46dd-9812-396da42c5f1c" />
<img width="757" height="905" alt="image" src="https://github.com/user-attachments/assets/0489fc36-cf9a-4253-9ff6-a3e891ffaa13" />
<img width="753" height="443" alt="image" src="https://github.com/user-attachments/assets/653b480d-f7b5-44bd-baf2-0c7393c975a3" />



## 🔮 Future Improvements

### Model Enhancements
- 🎯 **Improve Model Accuracy** - Experiment with XGBoost, LightGBM, and Neural Networks
- 🔧 **Hyperparameter Tuning** - Use GridSearchCV or RandomizedSearchCV for optimal parameters
- 📊 **Feature Engineering** - Create new features from existing ones (e.g., overall academic average)
- 🔄 **Model Retraining** - Implement automated retraining pipeline with new data

### Feature Additions
- 📈 **Feature Importance Visualization** - Show which factors most influence placement
- 💡 **Prediction Explanation** - Use SHAP values to explain individual predictions
- 📊 **Analytics Dashboard** - Display placement trends and statistics
- 🎓 **Skill Recommendation System** - Suggest skills to improve based on prediction
- 📝 **Batch Predictions** - Upload CSV file for multiple student predictions
- 👤 **User Accounts** - Save prediction history and track progress
- 📧 **Email Notifications** - Send prediction results via email
- 📱 **Mobile App** - Native iOS and Android applications

### Technical Improvements
- 🚀 **Deploy Model Online** - Host on AWS, GCP, or Azure
- 🐳 **Containerization** - Create Docker containers for easy deployment
- 🔐 **Authentication** - Add JWT-based authentication for API
- 📊 **Monitoring** - Implement logging and performance monitoring
- ⚡ **Caching** - Add Redis caching for faster predictions
- 🧪 **Testing** - Write unit tests and integration tests
- 📚 **API Versioning** - Implement versioned API endpoints
- 🌐 **Multi-language Support** - Add internationalization (i18n)

### Data & Research
- 📊 **Larger Dataset** - Train on more diverse and larger datasets
- 🔍 **Data Validation** - Implement data quality checks
- 📈 **A/B Testing** - Compare different model versions
- 🎯 **Salary Prediction** - Predict expected salary range
- 🏢 **Company Matching** - Suggest suitable companies based on profile

---

## 👨‍💻 Author

<div align="center">

### **Shahid Shaik**

**B.Tech CSE (AI & ML) Student**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/yourprofile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/yourusername)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail)](mailto:your.email@example.com)

*Passionate about Machine Learning, Artificial Intelligence, and Full-Stack Development*

</div>

---


