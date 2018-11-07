#!/usr/bin/env python
# Name: Ewa Sillem
# Student number: 12149071
"""
This script scrapes IMDB and outputs a CSV file with highest rated movies.
"""

import csv
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup

TARGET_URL = "https://www.imdb.com/search/title?title_type=feature&release_date=2008-01-01,2018-01-01&num_votes=5000,&sort=user_rating,desc"
BACKUP_HTML = 'movies.html'
OUTPUT_CSV = 'movies.csv'


def extract_movies(dom):
    """
    Extract a list of highest rated movies from DOM (of IMDB page).
    Each movie entry should contain the following fields:
    - Title
    - Rating
    - Year of release (only a number!)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    """

    # ADD YOUR CODE HERE TO EXTRACT THE ABOVE INFORMATION ABOUT THE
    # HIGHEST RATED MOVIES
    # NOTE: FOR THIS EXERCISE YOU ARE ALLOWED (BUT NOT REQUIRED) TO IGNORE
    # UNICODE CHARACTERS AND SIMPLY LEAVE THEM OUT OF THE OUTPUT.

    mydivs = dom.findAll('div', {'class': 'lister-item-content'},)

    csv_list = []

    for i in range(len(mydivs)):
        # isolating title
        lister_item_header = mydivs[i].find('h3', {'class': 'lister-item-header'})
        title = lister_item_header.find('a').text

        #isolating the release year
        year = lister_item_header.find('span', {'class': 'lister-item-year'}).text
        # isolating the digits in the release year
        x = year.split()
        if len(x) == 1:
            x = year.split()[0]
            year = x[1] + x[2] + x[3] + x[4]
        else:
            x = year.split()[1]
            year = x[1] + x[2] + x[3] + x[4]

        # isolate ratings
        mydivs_rating_bar = mydivs[i].find('div', {'class': 'ratings-bar'})
        mydivs_rating = mydivs_rating_bar.find('strong')
        rating = mydivs_rating.text

        # isolate runtime
        mydivs_runtime = mydivs[i].find('p', {'class': 'text-muted'})
        min = mydivs_runtime.find('span', {'class': 'runtime'}).text
        runtime = min.split()[0]

        # append all the components into a list
        csv_list.append(title)
        csv_list.append(rating)
        csv_list.append(year)

        # isolating actors
        mydivs_p3 = mydivs[i].findAll('p')[2]
        mydivs_a = mydivs_p3.findAll('a')

        # search in a-tags for the stars of the movie
        for atag in mydivs_a:
            if '_st_' in atag.get('href'):
                actors = atag.text
                #print(actors)
                csv_list.append(f'{actors}')
        #csv_list.append(actors)
        csv_list.append(runtime)

        i += 1

    return [csv_list]

def save_csv(outfile, movies):
    """
    Output a CSV file containing highest rated movies.
    """
    writer = csv.writer(outfile)
    writer.writerow(['Title', 'Rating', 'Year', 'Actors', 'Runtime'])

    # retrieve csv_list from 'extract_movies' function
    csv_list = extract_movies(dom)
    # make an empty list
    row = []

    # iterate over the csv_list
    for i in range(len(csv_list[0])):
        # if the element is a digit and the lenght is 3
        if csv_list[0][i].isdigit() and len(csv_list[0][i]) == 3:
            # append the element to the list 'row'
            row.append(csv_list[0][i])
            # write the list 'row' into the movies.csv
            writer.writerow(row)
            # clear the list 'row'
            row.clear()
        else:
            # append the element to the list 'row'
            row.append(csv_list[0][i])







    # ADD SOME CODE OF YOURSELF HERE TO WRITE THE MOVIES TO DISK


def simple_get(url):
    """
    Attempts to get the content at `url` by making an HTTP GET request.
    If the content-type of response is some kind of HTML/XML, return the
    text content, otherwise return None
    """
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None
    except RequestException as e:
        print('The following error occurred during HTTP GET request to {0} : {1}'.format(url, str(e)))
        return None


def is_good_response(resp):
    """
    Returns true if the response seems to be HTML, false otherwise
    """
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200
            and content_type is not None
            and content_type.find('html') > -1)


if __name__ == "__main__":

    # get HTML content at target URL
    html = simple_get(TARGET_URL)

    # save a copy to disk in the current directory, this serves as a backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # parse the HTML file into a DOM representation
    # dom contains the HTML of the page
    dom = BeautifulSoup(html, 'html.parser')

    # extract the movies (using the function you implemented)
    movies = extract_movies(dom)

    # write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'w', newline='') as output_file:
        save_csv(output_file, movies)
