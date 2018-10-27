import csv
import json
from os import system

class School(object):
    def __init__(self,PATH:str()):
        self.__Schools = {}
        self.__Schools['elementary'] = self.__OpenSchooljson(PATH+'elementary')
        self.__Schools['junior'] = self.__OpenSchooljson(PATH+'junior')
        self.__Schools['senior_high'] = self.__OpenSchooljson(PATH+'senior_high')
        self.__Kind = 3
    def __OpenSchooljson(self,FileName:str):
        with open(FileName+'.json','r') as f:
            school = json.loads(f.read())
            return school
    def __iter__(self):
        self.__n = 0
        return self
    def __next__(self):
        if self.__n < self.__Kind:
            n = self.__n
            self.__n += 1
            return self.__Schools[list(self.__Schools.keys())[n]]
        else:
            raise StopIteration

    def Schools(self,grade:str):
        return self.__Schools[grade]

    def keys(self):
        return list(self.__Schools.keys())
   

def main(PATH,FileName:str,*,county_clean=0):
    js_schools = {}

    with open(PATH+'{}.csv'.format(FileName),'r') as f:
        result = csv.reader(f)
        for row in result:
            # schools.append([row[0],row[1][county_clean:]])
            if row[1][county_clean:] not in js_schools.keys():
                js_schools[row[1][county_clean:]] = []
            js_schools[row[1][county_clean:]].append(row[0])
    
    with open(PATH+'{}.json'.format(FileName),'w') as f:
        f.write(json.dumps(js_schools,indent=4,ensure_ascii=False))


if __name__ == '__main__':
    main('./school/','elementary',county_clean=4)
    main('./school/','junior')
    main('./school/','senior_high',county_clean=4)
    # print('elementary' in School('./school/').keys())