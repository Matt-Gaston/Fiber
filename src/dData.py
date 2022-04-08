import os, sys, csv, json

dlPath = os.path.join(os.getenv("USERPROFILE"), "Downloads", "Fiber footages Matt.csv")
data = []
with open(dlPath, 'r', encoding='utf-8-sig') as f:
    freader = csv.DictReader(f, delimiter=',', quotechar='"')
    for row in freader:
        data.append(row)
with open('distances.js', 'w') as dataf:
    jsonString = json.dumps(data, indent = 4)
    dataf.write('var distances = ' + jsonString + ';\nexport default distances;')