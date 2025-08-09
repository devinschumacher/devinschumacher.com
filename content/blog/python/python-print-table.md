---
slug: /python-print-table/
title: "python print table"
date: "2022-08-27"
categories:
  - "python"
category: "Python"
---

need to take some comma separated data and turn it into a table format, in python?

we can do this easily using the `format` method.

## `format` method syntax

result = template.format(_\*_parameters)

### ELI5

**result:** _result_ is just a variable. it's where you will store the output.

**template.format:** _template.format_ is what you use to invoke the `format` method on python `template` class for the table you're about to make - it defines your columns.

**(\*parameters):** `(*parameters)` is where you will put an infinite amount of arguments telling python what you want it to do.

\- for example, you could write: `template.format(revenue="revenue," profit="profit," percent="profit/revenue)`" and this will tell python:

1. for the first argument i passed in, please use the string "revenue" as the

## example: turning data into a table in python

let's say you have some data for your company's revenue, and profit, like so:

1100,11
2200,19
2400,110
2300,-112

this is how you would take that data and turn it into a table in python:

1. enter your data

3. add a header row to the table (optional)

5. format the data

7. print the data into rows

```python
#1 the data

data = [
    (1100,11),
    (2200,19),
    (2400,110),
    (2300,-112),
]

#2 add a header row to the table

print("Revenue | Profit | Percent Change")

#3 format the data

#4 print the data into rows

for revenue, profit in data:
    row = template.format(revenue=revenue, profit=profit, percent=profit/revenue)
    print(row)
```

**output**

```
Revenue | Profit | Percent Change
1,100 | +11 | 1%
2,200 | +19 | 1%
2,400 | +110 | 5%
2,300 | -112 | -5%
```

* * *

tags:

- _how to print data in table format in python_

- _python print table_

- _python create table_

- _print a list_

- _how to make a table in python_

- _how to print a list in python_

- _make a table in python_

- _python data table_

- _creating a table in python_

- _how to create a table in python_
