import sys
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
import warnings

# Suppress specific sklearn warnings
warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")

# Function to create model and predict temperature for a given year
def predict_temperature_for_year(input_year):
    # Check if the input year is in the allowed range
    year = int(input_year)
    if year < 1900 or year > 100000:
        return "Year out of range. Please enter a year between 1900 and 2223."

    # Sample data for model (from 1900 to 2023)
    years = np.arange(1900, 2024)
    temperatures = np.linspace(24.0, 26.8, len(years))

    # Create DataFrame and train model
    data = pd.DataFrame({'Year': years, 'AverageTemperature': temperatures})
    X = data[['Year']]
    y = data['AverageTemperature']
    model = LinearRegression()
    model.fit(X, y)

    # Predict temperature for the specified year
    predicted_temp = model.predict(np.array([[year]]))[0]
    return f"{predicted_temp:.2f}"
#f"{number:.2f}"

# Main entry point
if __name__ == "__main__":
    input_text = sys.argv[1]
    print(predict_temperature_for_year(input_text))
