import json
import csv
import pandas as pd
from csv_class import csv_file


"""Convert a csv file into a JSON file"""

def read_csv():
    data = pd.read_csv('csv_file', sep=';', skiprows=[0,22])
    data.to_json('zorguitgaven.json')
