import os.path
import re
from selenium import webdriver
import pandas as pd
import requests
from bs4 import BeautifulSoup
import scrap
import itertools
import numpy as np
from time import sleep
import time

# generate search sets for nodes:

_objects = {'table': 1, 'desk': 1, 'stool': 1, 'sofa': 1, 'chair': 1, 'shelf': 1, 'couch': 1,
            'nightstands': 1, 'drawer': 1, 'bench': 1, 'lamp': 1,
            'teapot': 1, 'bottle': 1, 'cup': 1, 'plate': 1, 'fork': 1,
            'spoon': 1, 'knife': 1, 'chopsticks': 1, 'straw': 1,
            'brush': 1, 'pencil': 1, 'pen': 1, 'sketchbook': 1
            }
_materials = {'none': 3,
              'ceramic': 3, 'wood': 3, 'metal': 3, 'silicon': 3, 'plastic': 3, 'crystal': 3,
              'copper': 3, 'steal': 3, 'paper': 3, 'glass': 3,
              'cardboard': 3, 'stone': 3, 'leather': 3, 'wool': 3, 'oil': 3, 'ink': 3,
              'rubber': 3}
_shape = {
    'circle': 3, 'round': 3, 'ball': 3, 'sphere': 3, 'square': 3, 'triangle': 3, 'rectangle': 3,
    'box': 3, 'cube': 3, 'ring': 3, 'dots': 3, 'curve': 3, 'big': 3, 'small': 3, 'none': 3
}

_colors = {
    'red': 3, 'blue': 3, 'green': 3, 'yellow': 3, 'white': 3, 'black': 3, 'brown': 3, 'pink': 3, 'purple': 3,
    'orange': 3, 'grey': 3, 'none': 3}

_general = {'illustration': 4, 'drawing': 4, 'sketch': 4, 'origami': 4, 'watercolor': 4,
            'vintage': 4, 'anime': 4, 'makeover': 4, 'diy': 4, 'modern': 4, 'design': 4, 'styling': 4, 'ideas': 4,
            'plans': 4, 'coffee': 4, 'garden': 4, 'office': 4, 'spaces': 4, 'bedroom': 4, 'wine': 4,
            'dining': 4, 'style': 4, 'lounge': 4, 'bar': 4, 'flower': 4, 'none': 3}

l_1 = list(_general.keys())
l_2 = list(_objects.keys())
l_3 = list(_materials.keys())
l_4 = list(_shape.keys())
l_5 = list(_colors.keys())


# Creating a list of all possible nodes combinations
combo = [set(e) for e in itertools.product(l_2, l_3, l_4, l_5)]

# Cleaning up nodes empty sections 
counter = 0
for i in range(len(combo)):
    combo[i].discard('none')

# --------------------------------------------------------------------------------------------------------

'''
For  given object properties list (that represents a node on the graph),
the script will run pinterest search query (adding it to the URL path), and save the nodes relevant image and properties
into JSON file.

@params: list_of_search - list of nodes attributes.
@return: None
'''
def build_vertix(list_of_search):
    
    # Creating a Data frame for pandas
    df = np.array([['id', 'search_tag', 'img_urls', 'neighbors']])
    df = pd.DataFrame(df)
    counter = 1  # the vertex unique ID

    # open webdriver:
    driver = webdriver.Chrome('C:/ProgramData/chocolatey/lib/chromedriver/tools/chromedriver.exe')
    url = 'https://www.pinterest.com/search/pins/?q='
    
    # Open the output file
    with open("Output_pins_log.txt", "w") as bu_file:
        for s in list_of_search:
            
            current_vertix = []
            # update The ID field on the DF
            current_vertix.append(counter)

            if s is not None:
                # update The SEARCH TAGS field to the current vertix
                current_vertix.append(list(s))
                
                # Extracting the Images url paths, by the current serch tags      
                current_str = " ".join(s)
                driver.get(url + current_str) # call current search
                times = 0
                e = []
                
               # Pending for the searched elements - the images URL PATHS
                while times < 4 and len(e) == 0:
                    e = driver.find_elements_by_class_name('GrowthUnauthPinImage')
                    sleep(0.1)
                    times += 1

                # case found nothing
                if len(e) == 0:
                    current_vertix.append([])
                # one element or two
                elif len(e) >= 1:
                    text = e[0].get_attribute('innerHTML')
                    if len(e) >= 3:
                        text += e[1].get_attribute('innerHTML')
                        text += e[2].get_attribute('innerHTML')
                        temp = scrap.parse_img_url(text)
                    
                    # update the current images url pathsto the current vertix
                    current_vertix.append(temp)
                # Set edges to be empty
                current_vertix.append([])
                
                # Append the current vertix data to the result file
                df.loc[counter] = current_vertix
                counter += 1
                bu_file.write(str(current_vertix) + '\n')
                # if counter > 5:
                #     break
                print(str(counter) + '/' + len(combo))

     # Parsing result file to the required format     
    df.to_csv('Output_pins.csv', encoding='utf-8', index=False)
    df = df.to_json(orient='records')
    with open("Output_pins.json", "w") as text_file:
        # for p in df:
        text_file.write(df)

    driver.close()


start = time.time()
build_vertix(combo)
end = time.time()
print('start: ' + str(start))
print('end: ' + str(end))

print('total: ' + str(end - start) + 'for ' + '100')



