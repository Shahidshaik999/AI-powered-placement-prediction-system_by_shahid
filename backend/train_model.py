import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
df = pd.read_csv('Placement_Data_Full_Class.csv')

# Remove unnecessary columns
df = df.drop(['sl_no', 'salary'], axis=1)

# Handle categorical encoding
label_encoders = {}
categorical_columns = ['gender', 'ssc_b', 'hsc_b', 'hsc_s', 'degree_t', 'workex', 'specialisation']

for col in categorical_columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Encode target variable
target_encoder = LabelEncoder()
df['status'] = target_encoder.fit_transform(df['status'])

# Split features and target
X = df.drop('status', axis=1)
y = df['status']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10)
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=target_encoder.classes_))

# Save model and encoders
model_data = {
    'model': model,
    'label_encoders': label_encoders,
    'target_encoder': target_encoder,
    'feature_columns': list(X.columns)
}

with open('placement_model.pkl', 'wb') as f:
    pickle.dump(model_data, f)

print("\nModel saved successfully as 'placement_model.pkl'")
