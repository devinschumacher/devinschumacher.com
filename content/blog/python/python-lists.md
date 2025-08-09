---
slug: /python-lists/
title: python lists
date: '2022-08-26'
categories:
  - python
category: Python
---

lists in python are _ordered sets of data_ used to store more than one item in a single variable.

up to this point we have been using variables mainly as a 'store of value' for something else - but a list is a way to store multiple items in a single variable that you can access later.

there are 4 built-in data types in python that you can use to store a collection of data.

the 4 types are:

- lists
- sets
- tuples
- dictionaries

## python lists syntax

we write lists in python using brackets `[` `]`.

items within a list are written inside the brackets `[ ]`, separated by a comma `,`.

| Note: it's good practice to put a space after each comma `,` to make things visually easier to read, but not required for python to understand the list.

`
my_list = ["eggs", "butter", "cereal", "sour patch kids"]
`

the first thing most of us think of when we hear the word 'list' is either a grocery list, or a todo list. and that's what python lists are for - creating lists of items.

we can also have an empty list:

`
my_empty_list = []
`

lists in python have an order, starting at `[0]` with the first item, and counting upwards.

most of us are used to counting lists starting with "one", but in most programming languages the count starts at "zero".

yeah it's weird... get over it.

## list length len()

how many things are on your grocery list?

if you know python, you could answer that question - because the length of a list can be determined with the `len()` function.

`
my_list = ["eggs", "butter", "cereal", "sour patch kids"]
`

if that's your list, you can get the length of the list by simply printing the length, aka `len()`

`
length_of_my_list = len(my_list)
print(length_of_my_list)
`

check it out!

in case you don't know how to count to 4, python can do it for you:

