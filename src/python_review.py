import json

data = json.loads('{"name": "John", "age": 21, "fav_colors": ["blue", "red", "orange"]}')
json_str = json.dumps({'key': 'value'})

print(f"Name: {data['name']}")
for fav_color in data['fav_colors']:
    print(fav_color)

print(f"Age: {data.get('age')}")

import math
print(f"SQRT of 16: {int(math.sqrt(16))}")
print(f"POW 2^5: {int(math.pow(2,5))}")
print(f"Floor of 3.141 is {math.floor(3.141)}")

print(f"SQRT: {math.sqrt(16):.0f}")

import string
print(string.ascii_letters)
s = " Hello World "
c = "hello world the world is your oyster"
print(s.strip().lower())
print(c.capitalize())
print(c.split(" "))

l = c.split(" ")
for words in l:
    print(words)

x = "1 5 34 326 2 45 66 34 64"
ivalue = x.split(" ")
for iv in ivalue:
    print(iv * 2)


import re


pattern = re.compile(r'\d+')
text = "I have 2 apples and 15 oranges"
matches = pattern.findall(text)
print(matches)
matches = pattern.findall(c)
print(matches)
print(pattern.findall(x))

xlist = pattern.findall(x)
print(xlist)

for xl in xlist:
    print(xl, int(xl)*2)
    
y = "1.2 4.3 3.14159265 5342 2134 56 3 0.3 0"
fpattern = re.compile(r'^-?\d+(\.\d+)?$')
numbers = y.split(" ")
print(numbers)
ylist = [num for num in numbers if fpattern.match(num)]
ylist = y.split()
print(ylist)
for yl in ylist:
    print(yl, float(yl) * 3)

import random
print(random.choice(y))
print(random.choice(c))
print(random.choice(numbers))
print(random.randint(4, 8))

print(numbers)
print(random.shuffle(numbers))
print(numbers)

import sys
#input_data = sys.stdin.read().strip()
print("Output", file=sys.stdout)

import traceback
try:
    print(1/0)
except:
    traceback.print_exc()
    print("My Error")
    #sys.exit()

def lambdada(x,y):
    return x + y

import functools
print(functools.reduce(lambda x,y: x+y,[[1,2,4],[2,3,4]]))
print(functools.reduce(lambdada,[[1,2,4],[2,3,4]]))

@functools.lru_cache()
def fib(n):
    return n if n < 2 else fib(n-1) + fib(n-2)

print(fib(10))

with open('python_review.py', 'r') as f:
    data = f.readlines()
print(data[0:3])
print(data[-1])
for line in data:
    print(line.rstrip())

data.append("ADD DATA TO THE END OF THE LIST\n")

for i, line in enumerate(data, 1):
    print(f"Line {i}: {line.strip()}")

del data[-1]

print(data[-1])
functions = [line.rstrip() for line in data if line.strip().startswith("def")]
print(functions)

imported = [line.rstrip() for line in data if line.strip().startswith("import ")]
print(imported)
