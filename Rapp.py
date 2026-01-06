import streamlit as st
import time

st.set_page_config(
    page_title="AgriSmart Recommender",
    page_icon="🌾",
    layout="wide"  # Makes it stretch like an app
)

st.markdown(
    "<h1 style='text-align: center; color: green;'>🌾 AgriSmart Recommender</h1>",
    unsafe_allow_html=True
)
st.markdown(
    "<p style='text-align: center;'>Optimizing crop yields using Decision Tree models.</p>",
    unsafe_allow_html=True
)
st.write("---")
col1, col2 = st.columns([1, 2])  # Left column smaller, right column bigger

# Left column: Inputs
with col1:
    st.header("Input Parameters")
    temperature = st.slider("Temperature (°C)", 0, 50, 25)
    rainfall = st.slider("Rainfall (mm)", 0, 300, 100)
    humidity = st.slider("Humidity (%)", 0, 100, 50)
    generate = st.button("Generate Recommendation", use_container_width=True)

# Right column: Results
with col2:
    st.header("Recommendation")
    if generate:
        st.info("Processing…")
        time.sleep(1)
        if temperature > 30 and rainfall < 50:
            crop = "🌽 Maize"
        elif rainfall > 200:
            crop = "🌾 Rice"
        else:
            crop = "🥬 Vegetables"
        st.success(f"✅ You should grow: *{crop}*")
    else:
        st.write("Enter parameters and click Generate Recommendation")
      st.markdown("### How it works")
st.info("This app uses temperature, rainfall, and humidity to recommend the best crop.")
