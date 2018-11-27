import json
import csv
import pandas as pd


"""Convert a csv file into a JSON file"""
data = pd.read_csv('weight.csv', sep=';', skiprows=[0,1,2,3,4,9])
data.to_json('weight.json')

f = open('weight.json')
data = json.load(f)
f.close()

categories = []
years = []
percentages = []

for (key, value) in data.items():
    print("Key: " + key)
    print("Value: " + str(value))
    if key.isdigit():
        years.append(key)
        dict_percentages = data.get(key)
        print(dict_percentages)
        for key in dict_percentages:
            percentages.append(dict_percentages.get(key))

dict_category = data.get('Onderwerp')
for i in dict_category:
    categories.append(dict_category.get(i))

print(years)
print(percentages)
print(categories)
