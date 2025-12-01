
# 🌦️ Simple Weather App

A lightweight weather application built with **JavaScript**, **OpenWeatherMap API**, and **Visual Crossing API**.  
It detects your current location, shows real-time weather conditions, and provides a 24-hour forecast along with yesterday’s and tomorrow’s weather.

<img width="1919" height="957" alt="image" src="https://github.com/user-attachments/assets/1df18422-4737-40f1-a151-39b9727fdbcd" />

---

## ✨ Features

- 📍 **Auto-detect location** using browser geolocation
- 🔎 **Search weather by city name**
- 🌡️ **Current weather details**:
  - Temperature (°C)
  - Humidity (%)
  - Wind speed (kmph)
  - Weather icon
- 📅 **Forecast data**:
  - Yesterday’s conditions
  - Tomorrow’s conditions
  - 24-hour hourly forecast
- ⚠️ **Error handling** for invalid city names or API limits

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **APIs**:
  - [OpenWeatherMap](https://openweathermap.org/api) – Current weather data
  - [Visual Crossing](https://www.visualcrossing.com/weather-api) – Forecast data
  - [BigDataCloud](https://www.bigdatacloud.com/) – Reverse geocoding for location detection

---
🚀 How to Run This Project Locally

To run this application on your local machine, you need to set up the necessary API keys and use a local web server (since modern browsers restrict direct file system access for fetch and geolocation).

1. Prerequisites
API Keys: Obtain keys for the following services:

OpenWeatherMap: For current weather data.

Visual Crossing: For forecast data.

(Note: The BigDataCloud API for reverse geocoding is used without a key in the existing code.)

2. Setup and Configuration

Clone the repository:

Bash

git clone https://github.com/HarinduVihan/Weather-app.git
cd Weather-app
Create the Configuration File:

In the root of the project directory, create a new file named config.json.

Add your API keys and the base URLs to this file in the following JSON format:

JSON

{

  "API_KEY": "YOUR_OPENWEATHERMAP_API_KEY",
  
  "API_URL": "https://api.openweathermap.org/data/2.5/weather?units=metric&q=",
  
  "FORCAST_API_KEY": "YOUR_VISUAL_CROSSING_API_KEY",
  
  "FORCAST_API_URL": "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
  
}

The application's JavaScript fetches these values from this file on startup.

Run a Local Web Server:

VS Code Live Server (Recommended)

---

## Web Site URL

https://harinduvihan.github.io/Weather-app/

## Project URL

https://roadmap.sh/projects/weather-app
