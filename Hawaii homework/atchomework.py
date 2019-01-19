import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
import datetime as dt

engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

Measurement = Base.classes.measurement
Station = Base.classes.station

session = Session(engine)

app = Flask(__name__)

stations_dict = [
    {"station": 'USC00519397', "name": 'WAIKIKI 717.2, HI US', "latitude": "21.2716", "longitude": "-157.8168", "elevation": "3.0"},
    {"station": 'USC00513117', "name": 'KANEOHE 838.1, HI US', "latitude": "21.4234", "longitude": "-157.8015", "elevation": "14.6"},
    {"station": 'USC00514830', "name": 'KUALOA RANCH HEADQUARTERS 886.9, HI US', "latitude": "21.5213", "longitude": "-157.8374", "elevation": "7.0"},
    {"station": 'USC00517948', "name": 'PEARL CITY, HI US', "latitude": "21.3934", "longitude": "-157.9751", "elevation": "11.9"},
    {"station": 'USC00518838', "name": 'UPPER WAHIAWA 874.3, HI US', "latitude": "21.4992", "longitude": "-158.0111", "elevation": "306.6"},
    {"station": 'USC00519523', "name": 'WAIMANALO EXPERIMENTAL FARM, HI US', "latitude": "21.33556", "longitude": "-157.71139", "elevation": "19.5"},
    {"station": 'USC00519281', "name": 'WAIHEE 837.5, HI US', "latitude": "21.45167", "longitude": "-157.84888999999998", "elevation": "32.9"},
    {"station": 'USC00511918', "name": 'HONOLULU OBSERVATORY 702.2, HI US', "latitude": "21.3152", "longitude": "-157.9992", "elevation": ".09"},
    {"station": 'USC00516128', "name": 'MANOA LYON ARBO 785.2, HI US', "latitude": "21.3331", "longitude": "-157.8025", "elevation": "152.4"}
]


@app.route('/')
def home():
    print("Server received a request for the home page.")
    return(
        f"Available routes:</br>"
        f"/api/v1.0/precipitation</br>"
        f"/api/v1.0/stations</br>"
        f"/api/v1.0/tobs</br>"
        f"/api/v1.0/start-and-end")

@app.route('/api/v1.0/precipitation')
def precip():
    print("Server received a request for precipitation data.")
    one_year = dt.date(2017, 8, 23) - dt.timedelta(days=365)
    rainfall = session.query(Measurement.date, Measurement.prcp).\
    filter(Measurement.date >= one_year).\
    order_by(Measurement.date).all()

    testing = list(np.ravel(rainfall))

    return jsonify(testing)


@app.route('/api/v1.0/stations')
def stations():
    print("Server received a request for station information.")
    return jsonify(stations_dict)


@app.route('/api/v1.0/tobs')
def tobs():
    print("Server received a request for temperature information.")
    one_year = dt.date(2017, 8, 23) - dt.timedelta(days=365)
    temps = session.query(Measurement.date, Measurement.tobs).\
    filter(Measurement.date >= one_year).\
    order_by(Measurement.date).all()

    neaten = list(np.ravel(temps))

    return jsonify(neaten)


@app.route('/api/v1.0/start-and-end')
def dates():
    print("Server received a request for data based on a start and end date. Server is currently laughing its ass off at this request.")
    return("This request has melted the coder's brain. Replacement transistors have been ordered from 1953. A second attempt may be possible once repairs are complete.")

if __name__ == "__main__":
    app.run(debug=True)