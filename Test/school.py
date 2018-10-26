import csv
import json

def main(FileName:str,*,county_clean=0):
    js_schools = {}

    with open('./school/{}.csv'.format(FileName),'r') as f:
        result = csv.reader(f)
        for row in result:
            # schools.append([row[0],row[1][county_clean:]])
            if row[1][county_clean:] not in js_schools.keys():
                js_schools[row[1][county_clean:]] = []
            js_schools[row[1][county_clean:]].append(row[0])
    
    with open('./school/{}.json'.format(FileName),'w') as f:
        f.write(json.dumps(js_schools,indent=4,ensure_ascii=False))


# OpneData('elementary',county_clean=4)

if __name__ == '__main__':
    main('elementary',county_clean=4)
    main('junior')
    main('senior_high',county_clean=4)