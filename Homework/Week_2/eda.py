import pandas as pd
import csv
from statistics import mode
from statistics import stdev
import matplotlib.pyplot as plt; plt.rcdefaults()
import matplotlib.pyplot as plt
import numpy as np
import json



"""Open input.csv and parse and preprocess the data"""
# make a global list for the gdp
gdp_list = []
# make a global list for the gdp numbers
gdp_no_list = []
# make a global list for the histogram
gdp_hist = []
# make a global list for the countries
countries = []
# make a global list for the infant Mortality
im = []
# make a global list for regions
region = []
# make a global list for population density
pop_den = []
# make a global list for the boxplot for infant mortality
im_boxplot = []


# open input.csv
with open('input.csv', 'r', newline='') as csvfile:
    panda_reader = pd.read_csv('input.csv').to_dict()

    reader = csv.DictReader(csvfile)
    # read each row in csv file
    for row in reader:
        # skip the empty rows
        if not row:
            continue
        else:
            # make population value a float
            population = float(row['Population'])
            # make area value a float
            area = float(row['Area (sq. mi.)'])

            region_name = row['Region']
            region.append(region_name)

            country = row['Country']
            countries.append(country)

            # ensure that population density value has a comma
            if ',' in row['Pop. Density (per sq. mi.)']:
                # change comma into dot
                row['Pop. Density (per sq. mi.)'] = row['Pop. Density (per sq. mi.)'].replace(",", ".")
                pop_density = float(row['Pop. Density (per sq. mi.)'])
                pop_den.append(pop_density)
            else:
                # make population density value a float
                pop_density = row['Pop. Density (per sq. mi.)']
                pop_den.append(pop_density)

            # ensure that coastline value has a dot
            if ',' in row['Coastline (coast/area ratio)']:
                row['Coastline (coast/area ratio)'] = row['Coastline (coast/area ratio)'].replace(',', '.')
                coastline = float(row['Coastline (coast/area ratio)'])
            else:
                coastline = float(row['Coastline (coast/area ratio)'])

            # ensure that migration value has a dot
            if ',' in row['Net migration']:
                row['Net migration'] = row['Net migration'].replace(',', '.')
                migration = float(row['Net migration'])
            elif isinstance(row['Net migration'], float):
                migration = row['Net migration']
            else:
                migration = "blank"

            # ensure that infant mortality value has a dot
            if ',' in row['Infant mortality (per 1000 births)']:
                row['Infant mortality (per 1000 births)'] = row['Infant mortality (per 1000 births)'].replace(',', '.')
                inf_mortality = float(row['Infant mortality (per 1000 births)'])
                # append infant mortality value to list for later usage
                im.append(inf_mortality)

            elif isinstance(row['Infant mortality (per 1000 births)'], float):
                inf_mortality = row['Infant mortality (per 1000 births)']
                # append infant mortality value to list for later usage
                im.append(inf_mortality)

            # undefined infant mortality value is blank
            else:
                inf_mortality = "blank"
                im.append(inf_mortality)


            # empty value for GDP is defined as blank
            if not row['GDP ($ per capita) dollars']:
                gdp = "blank"
                gdp_list.append(gdp)
            # isolate the number from the GDP value
            else:
                split_gdp = row['GDP ($ per capita) dollars'].split()
                gdp = split_gdp[0]
                gdp_list.append(gdp)

            # ensure Net literacy value has a dot
            if ',' in row['Literacy (%)']:
                row['Literacy (%)'] = row['Literacy (%)'].replace(',', '.')
                literacy = float(row['Literacy (%)'])
            elif isinstance(row['Literacy (%)'], float):
                literacy = row['Literacy (%)']

            # ensure Phones value has a dot
            if ',' in row['Phones (per 1000)']:
                row['Phones (per 1000)'] = row['Phones (per 1000)'].replace(',', '.')
                phones = float(row['Phones (per 1000)'])
            elif isinstance(row['Phones (per 1000)'], float):
                literacy = row['Literacy (%)']

            # ensure Phones value has a dot
            if ',' in row['Arable (%)']:
                row['Arable (%)'] = row['Arable (%)'].replace(',', '.')
                arable = float(row['Arable (%)'])
            elif isinstance(row['Arable (%)'], float):
                arable = row['Arable (%)']

            # ensure Crops value has a dot
            if ',' in row['Crops (%)']:
                row['Crops (%)'] = row['Crops (%)'].replace(',', '.')
                crops = float(row['Crops (%)'])
            elif isinstance(row['Crops (%)'], float):
                crops = row['Crops (%)']

            # ensure Other value has a dot
            if ',' in row['Other (%)']:
                row['Other (%)'] = row['Other (%)'].replace(',', '.')
                other = float(row['Other (%)'])
            elif isinstance(row['Other (%)'], float):
                other = row['Other (%)']

            # ensure Other value has a dot
            if ',' in row['Climate']:
                row['Climate'] = row['Climate'].replace(',', '.')
                climate = float(row['Climate'])
            elif isinstance(row['Climate'], float):
                climate = row['Climate']

            # ensure Birthrate value has a dot
            if ',' in row['Birthrate']:
                row['Birthrate'] = row['Birthrate'].replace(',', '.')
                birthrate = float(row['Birthrate'])
            elif isinstance(row['Birthrate'], float):
                birthrate = row['Birthrate']

            # ensure Deathrate value has a dot
            if ',' in row['Deathrate']:
                row['Deathrate'] = row['Deathrate'].replace(',', '.')
                deathrate = float(row['Deathrate'])
            elif isinstance(row['Deathrate'], float):
                deathrate = row['Deathrate']

            # ensure Agriculture value has a dot
            if ',' in row['Agriculture']:
                row['Agriculture'] = row['Agriculture'].replace(',', '.')
                agriculture = float(row['Agriculture'])
            elif isinstance(row['Agriculture'], float):
                agriculture = row['Agriculture']

            # ensure Industry value has a dot
            if ',' in row['Industry']:
                row['Industry'] = row['Industry'].replace(',', '.')
                industry = float(row['Industry'])
            elif isinstance(row['Industry'], float):
                industry = row['Industry']

            # ensure Industry value has a dot
            if ',' in row['Service']:
                row['Service'] = row['Service'].replace(',', '.')
                service = float(row['Service'])
            elif isinstance(row['Service'], float):
                service = row['Service']


    """Calculate the average of GDP"""
    # set total gdp to 0
    total = 0
    # add every gdp value to total
    for value in gdp_list:
        # ensure that added value is a digit
        if value.isdigit():
            total = total + int(value)

    # calculate the gdp average
    gdp_average = total / len(gdp_list)

    """JSON file"""
    data_dict = {}
    i = 0
    # iterate over values in list 'countries'
    for value in countries:
        data_dict[value] = {}
        data_dict[value]["Region"] = region[i]
        data_dict[value]["Pop. Density (per sq. mi.)"] = pop_den[i]
        data_dict[value]["Infant mortality (per 1000 births)"] = im[i]
        data_dict[value]["GDP"] = gdp_list[i]
        i += 1

    print(json.dumps(data_dict, sort_keys=True, indent=4))
    with open('eda.json', 'w') as outfile:
        json.dump(data_dict, outfile)

    """Calculate the median of GDP"""
    # function that returns length of value
    def length(value):
        return len(value)

    middle = int(len(gdp_list) / 2 + 1)
    # sort the list
    gdp_list.sort()
    gdp_list.sort(key=length)
    median_gdp = gdp_list[middle]


    """Calculate the mode of GDP"""
    gdp_mode = mode(gdp_list)


    """Calculate the standard deviation of GDP"""
    # ensure only numbers are taken into the calculation
    for value in gdp_list:
        if value.isdigit():
            value = int(value)
            gdp_no_list.append(value)

    gdp_stdev = stdev(gdp_no_list)

    for value in gdp_no_list:
        if value < (gdp_average + 2 * gdp_stdev):
            gdp_hist.append(value)




    """Plot the GDP per country in a histogram"""
    plt.hist(gdp_hist, bins=30)
    plt.show()


    """Plot the Infant Mortality (per 1000 births) in a boxplot"""
    for value in im:
        if isinstance(value, float):
            im_boxplot.append(value)
    plt.boxplot(im_boxplot)
    plt.title('Infant Mortality (per 1000 births)')
    plt.ylabel('Percentage')
    plt.show()


    regions = panda_reader.get("Region")

input = pd.read_csv("input.csv")
