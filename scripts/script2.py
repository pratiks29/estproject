# scripts/script2.py

import pandas as pd
from prophet import Prophet
from sklearn.linear_model import LinearRegression
import numpy as np
import warnings
import sys
import os
import traceback
import json

# Suppress all warnings
warnings.filterwarnings("ignore")

def main(input_text):
    try:
        # Get the directory of the current script
        script_dir = os.path.dirname(os.path.abspath(__file__))

        def load_data():
            data_path = os.path.join(script_dir, 'DATAMAIN.xlsx')  # Ensure DATAMAIN.xlsx is in the scripts directory
            if not os.path.exists(data_path):
                raise FileNotFoundError(f"Data file not found at {data_path}")
            return pd.read_excel(data_path)

        def generate_future_emissions(df, column_name):
            # Prepare data for Prophet
            data_df = df[['Year', column_name]].rename(columns={'Year': 'ds', column_name: 'y'})
            data_df['ds'] = pd.to_datetime(data_df['ds'], format='%Y')

            # Fit Prophet model and forecast
            model = Prophet()
            model.fit(data_df)
            future = model.make_future_dataframe(periods=101, freq='Y')
            forecast = model.predict(future)

            # Extract years and forecasted values
            forecast['ds'] = forecast['ds'].dt.year
            return forecast[['ds', 'yhat']].tail(100)

        def save_future_emissions(forecast, filename):
            save_path = os.path.join(script_dir, filename)
            forecast.to_csv(save_path, index=False)

        def train_temperature_model(df):
            X = df[['CO2_emissions', 'GHG_emissions']]
            y = df['Temperature']
            model = LinearRegression()
            model.fit(X, y)
            return model

        def predict_temperature(year, temp_model):
            future_co2_path = os.path.join(script_dir, "future_co2_emissions.csv")
            future_ghg_path = os.path.join(script_dir, "future_ghg_emissions.csv")

            if not os.path.exists(future_co2_path) or not os.path.exists(future_ghg_path):
                raise FileNotFoundError("Future emissions CSV files not found.")

            future_co2_df = pd.read_csv(future_co2_path)
            future_ghg_df = pd.read_csv(future_ghg_path)

            # Get CO₂ and GHG emissions for the given year
            co2_row = future_co2_df.loc[future_co2_df['ds'] == year, 'yhat']
            ghg_row = future_ghg_df.loc[future_ghg_df['ds'] == year, 'yhat']

            if co2_row.empty or ghg_row.empty:
                raise ValueError(f"Emissions data for the year {year} not found.")

            co2_value = co2_row.values[0]
            ghg_value = ghg_row.values[0]

            # Predict temperature using the trained model
            temperature = temp_model.predict(np.array([[co2_value, ghg_value]]))
            return temperature[0]

        def generate_future_temperatures(temp_model):
            future_temps = []
            for year in range(2016, 2116):
                future_temp = predict_temperature(year, temp_model)
                future_temps.append({'Year': year, 'Predicted_Temperature': future_temp})
            return pd.DataFrame(future_temps)

        def train_ice_sheet_loss_model():
            data = {
                'year': [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
                'ice_sheet_loss': [-242.63, -624.93, -856.54, -983.47, -1335.03, -1883.82, -2162.68, -2472.26, -3254.27, -3664.5, -4367.2, -4744.03, -5131.81, -5663.13, -5652.48, -5808.57, -6459.88, -7121.34, -7645.46],
                'surface_temp': [15.82916667, 15.82658333, 15.75725, 15.87925, 15.8135, 15.82733333, 15.72125, 15.82716667, 15.8955, 15.7695, 15.80233333, 15.85441667, 15.913, 16.05858333, 15.93179501, 15.9323529, 15.93233293, 15.93175646, 15.99686251]
            }

            df = pd.DataFrame(data)
            X = df[['year', 'surface_temp']]
            y = df['ice_sheet_loss']

            model = LinearRegression()
            model.fit(X, y)
            return model

        def generate_future_ice_sheet_loss(future_temp_df, ice_model):
            future_years = future_temp_df['Year']
            future_temperatures = future_temp_df['Predicted_Temperature']

            future_X = pd.DataFrame({
                'year': future_years,
                'surface_temp': future_temperatures
            })

            predicted_ice_sheet_loss = ice_model.predict(future_X)

            return pd.DataFrame({
                'Year': future_years,
                'Predicted_Ice_Sheet_Loss': predicted_ice_sheet_loss
            })

        def get_yearly_data(year):
            co2_path = os.path.join(script_dir, 'future_co2_emissions.csv')
            ghg_path = os.path.join(script_dir, 'future_ghg_emissions.csv')
            ice_sheet_path = os.path.join(script_dir, 'future_ice_sheet_loss_predictions.csv')
            temp_path = os.path.join(script_dir, 'future_temperature_predictions.csv')

            for path in [co2_path, ghg_path, ice_sheet_path, temp_path]:
                if not os.path.exists(path):
                    raise FileNotFoundError(f"Required file not found: {path}")

            co2_df = pd.read_csv(co2_path)
            ghg_df = pd.read_csv(ghg_path)
            ice_sheet_df = pd.read_csv(ice_sheet_path)
            temp_df = pd.read_csv(temp_path)

            try:
                co2_data = co2_df.loc[co2_df['ds'] == year, 'yhat'].values[0]
                ghg_data = ghg_df.loc[ghg_df['ds'] == year, 'yhat'].values[0]
                ice_sheet_data = ice_sheet_df.loc[ice_sheet_df['Year'] == year, 'Predicted_Ice_Sheet_Loss'].values[0]
                temp_data = temp_df.loc[temp_df['Year'] == year, 'Predicted_Temperature'].values[0]

                # Prepare the data as a dictionary
                output_data = {
                    "CO2_emissions": co2_data,
                    "GHG_emissions": ghg_data,
                    "Predicted_Ice_Sheet_Loss": ice_sheet_data,
                    "Predicted_Temperature": temp_data
                }

                # Print the data as JSON
                print(json.dumps(output_data))

            except IndexError:
                raise ValueError(f"Data for the year {year} not found.")

        # Run all the steps
        df = load_data()

        # Step 2 and 3: Generate CO2 and GHG emissions
        future_co2 = generate_future_emissions(df, 'CO2_emissions')
        save_future_emissions(future_co2, "future_co2_emissions.csv")

        future_ghg = generate_future_emissions(df, 'GHG_emissions')
        save_future_emissions(future_ghg, "future_ghg_emissions.csv")

        # Step 4: Train Temperature Model and Generate Predictions
        temp_model = train_temperature_model(df)
        future_temp_df = generate_future_temperatures(temp_model)
        save_temp_path = os.path.join(script_dir, "future_temperature_predictions.csv")
        future_temp_df.to_csv(save_temp_path, index=False)

        # Step 5: Train Ice Sheet Loss Model and Generate Predictions
        ice_model = train_ice_sheet_loss_model()
        future_ice_loss_df = generate_future_ice_sheet_loss(future_temp_df, ice_model)
        save_ice_path = os.path.join(script_dir, "future_ice_sheet_loss_predictions.csv")
        future_ice_loss_df.to_csv(save_ice_path, index=False)

        # Convert input_text to integer for the year and display predictions
        year = int(input_text)
        get_yearly_data(year)

    except Exception as e:
        # Print the traceback to stderr
        print(traceback.format_exc(), file=sys.stderr)

# To execute the entire workflow and pass the year as a command-line argument
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No input year provided.", file=sys.stderr)
    else:
        input_text = sys.argv[1]
        input_text = int(input_text)
        if input_text<2016 or input_text>2115:
            output_data = {
                    "CO2_emissions": 0,
                    "GHG_emissions": 0,
                    "Predicted_Ice_Sheet_Loss": 0,
                    "Predicted_Temperature": 0
                }
            print(json.dumps(output_data))
        else:
            main(input_text)
