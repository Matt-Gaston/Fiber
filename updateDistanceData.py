#this script updates distances.js
#uses the fiber footages csv file

import csv, json
data = []
try:
    with open("Fiber footages.csv", 'r', encoding='utf-8-sig') as f:
        freader = csv.DictReader(f, delimiter=',', quotechar='"')
        for row in freader:
            row['Key'] = row['Key'].replace('\\n', '\n')
            data.append(row)
    with open('src/distances.js', 'w') as dataf:
        jsonString = json.dumps(data, indent = 4)
        dataf.write('var distances = ' + jsonString + ';\nexport default distances;')
except Exception as e:
    print(e)