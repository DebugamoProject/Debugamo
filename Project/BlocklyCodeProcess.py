

import re
from os import sys

__author__  = 'Yu-Chun, Lin'
__version__ = '0.0.1'

def highlightBlockNull(codeFile,option='null',output=False):
    with open(codeFile,'r') as file:
        code_list = file.readlines()
        file.close()
        print(len(code_list))
    # code_list = code.split('\n')
    # print(code_list)
    code = '' 
    target = re.compile('highlightBlock')
    # print(code_list)
    for j in code_list:
        # print(j)
        if target.match(j) is not None:
        # for i in range(len(j)):
        #     if target.match(j[i]) is not None:
            j = 'highlightBlock(%s);'% option
            # print(j[i])
            # code += j[i]
        code += re.sub(r'\n','',j)
    if not output:
        print(code)
    else:
        with open(output,'w') as file:
            file.write(code)
            file.close()



if __name__ == '__main__':

    # highlightBlockNull('./BlocklyCode.txt','null',False)
    highlightBlockNull('./text.txt','null','./text.txt')
        