#!/usr/bin/env python
# Name: Ewa Sillem
# Student number: 12149071
"""
This script visualizes data obtained from a .csv file
"""

import csv
import matplotlib.pyplot as plt

# Global constants for the input file, first and last year
INPUT_CSV = "movies.csv"
START_YEAR = 2008
END_YEAR = 2018

# Global dictionary for the data
data_dict = {str(key): [] for key in range(START_YEAR, END_YEAR)}
# open movies.csv
with open('movies.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    years = []

    # read the csv file per line
    for row in reader:
        # save the value of the key 'Year' in 'year'
        year = row['Year']
        if year not in years:
            # make a list of the years
            years.append(year)
        # save the value of the key 'Rating' in 'rating'
        rating = row['Rating']
        data_dict[year].append(rating)

    # sort the years in the list 'years' from low to high
    years = sorted(years, reverse=False)
    averages = []

    # iterate over each key in data_dict
    for key in data_dict:
        total = 0
        # iterate over the values of the current key
        for value in data_dict[key]:
            number = float(value)
            total = total + number

        # calculae the average rating of current year
        average = total / len(data_dict[key])
        # append the calculated average to the list of averages
        averages.append(average)

    # make the plot and show the plot
    plt.plot(years, averages, "m", marker="X")
    plt.show()


if __name__ == "__main__":
    print(data_dict)
