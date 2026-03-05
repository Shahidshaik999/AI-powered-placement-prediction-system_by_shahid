import requests
import json

# API endpoint
API_URL = "http://localhost:8000/predict"

# Test data
test_student = {
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

print("🧪 Testing Placement Predictor API")
print("=" * 50)
print("\n📤 Sending test data:")
print(json.dumps(test_student, indent=2))

try:
    # Make prediction request
    response = requests.post(API_URL, json=test_student)
    
    if response.status_code == 200:
        result = response.json()
        print("\n✅ Prediction successful!")
        print("=" * 50)
        print(f"📊 Placement Status: {result['placement_status']}")
        print(f"📈 Probability: {result['probability']}%")
        print(f"🎯 Confidence: {result['confidence']}%")
        print("=" * 50)
    else:
        print(f"\n❌ Error: {response.status_code}")
        print(response.text)

except requests.exceptions.ConnectionError:
    print("\n❌ Connection Error!")
    print("Make sure the FastAPI server is running:")
    print("   uvicorn main:app --reload")
except Exception as e:
    print(f"\n❌ Error: {str(e)}")
