---
slug: /how-to-read-csv-w-the-python-csv-module-csv-reader-csv-dictreader/
title: "How to read CSV w/ the Python csv module: csv.reader() & csv.DictReader()"
date: "2023-02-07"
categories:
  - "programming"
  - "python"
category: "Python"
---

There are two ways to read data from CSV files using [Python’s built-in module ‘csv’.](https://docs.python.org/3/library/csv.html)

1. csv.Reader()

3. csv.DictReader()

Let’s explore the difference between the two options using an example .csv file: `friends_birthdays.csv` - it looks something like this:

| name | location | birthday\_month |
| --- | --- | --- |
| Anthony | Tokyo | June |
| Alex | Maryland | September |

## csv.Reader()

`csv.Reader()` let’s you read & access data in .csv files using _**indexes**_, and it great for simple .csv files.

Using `csv.Reader()` to explore the friends\_birthdays.csv file:

```python
import csv

with open('friends_birthdays.csv') as f:
    my_csv = csv.reader(f, delimiter="',')")
    line_count = 0
    for row in my_csv:
        print(f"{row[0]} lives in {row[1]} and has a birthday in {row[2]}.")
```

### output
```
# name lives in location and has a birthday in birthday_month
# Anthony lives in Tokyo and has a birthday in June
# Alex lives in Maryland and has a birthday in September
```

Notice how this prints the header row in the output.

To remove that you can adjust your code to remove the header row by first turning your read csv into a list, and then slicing off the top row.

```python
import csv

with open('friends_birthdays.csv') as f:
    my_csv = list(csv.reader(f))
    my_csv = my_csv[1:]
    for row in my_csv:
        print(f"{row[0]} lives in {row[1]} and birthday is {row[2]}.")
```

### output
```
# Anthony lives in Tokyo and birthday is June
# Alex lives in Maryland and birthday is September
```

## csv.DictReader()

`csv.DictReader()` is a more convenient option when working with larger CSV files, but can still work for simper .csv files as well.

Using `csv.DictReader()` to explore the friends\_birthdays.csv file:

```python
import csv

with open('friends_birthdays.csv') as file:
    my_csv = csv.DictReader(file, delimiter="',')")
    line_count = 0
    for row in my_csv:
        print(f"{row['name']} lives in {row['location']} and has a birthday in {row['birthday_month']}.")
```

### output
```
# Anthony lives in Tokyo and has a birthday in June.
# Alex lives in Maryland and has a birthday in September.
```
