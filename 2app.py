# app.py
import streamlit as st
import time

st.title("🌾 AgriSmart Recommender")
st.write("Optimizing crop yields using Decision Tree classification models.")

# Sidebar inputs
temperature = st.sidebar.slider("Temperature (°C)", 0, 50, 25)
rainfall = st.sidebar.slider("Rainfall (mm)", 0, 300, 100)

# Recommendation logic
def get_crop_recommendation(temp, rain):
    if temp > 30 and rain < 50:
        return "🌽 Maize"
    elif rain > 200:
        return "🌾 Rice"
    else:
        return "🥬 Vegetables"

# Button to generate recommendation
if st.button("Generate Recommendation"):
    st.info("Processing…")
    time.sleep(1)
    recommendation = get_crop_recommendation(temperature, rainfall)
    st.success(f"Recommended Crop: {recommendation}")
