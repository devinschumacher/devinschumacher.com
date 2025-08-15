---
slug: /python-float/
title: "python float()"
date: "2022-08-28"
categories:
  - "programming"
  - "python"
tags:
  - "web-development"
category: "Python"
---

## what is float in python?

float refers to the python built-in function `float()` which is used to convert a number into a floating point number.

a floating point number is a number that can store a decimal point with subsequent values.

**not floating point numbers:**

- `10`

- `15`

- `1`

- `525,600` minutes

that last one is how you measure, measure a year. and not a floating point number.

**floating point numbers:**

- `10.0`

- `15.1`

- `1.00`

- `3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989`

that last value is pi (π) to the 1000th place. and also a floating point number.

## python float syntax

```python
float(value)
```

### syntax for floating inside of a print statement

```python
print(float(x))
```

## python float() parameters

| Parameters | Description |
| --- | --- |
| **_value_** | you can assign a number or a string as the _value_ that you pass into `float(_value_)` |

## python float examples

1. float number

3. float string

5. bonus: floating values inside of a `print()` statement with multiple parameters

### convert a number into a floating point number:

1\. number = 10

```python
float(10)
```

python would output this as `10.0` - _notice how_ python only adds 1 decimal place for the zero value when floating a round number.

2\. number = 10.000

```python
float(10.000)
```

python would output this as `10,00` - _notice how python removes any extra decimal places down to 2 places if the additional integers are zeros._

### convert a string into a floating point number

1\. string = "10"

```python
float("10")
```

2, string = "10.00"

```python
float("10.000")
```

3, string = "10.0343"

```python
float("10.0343")
```

### bonus: floating values inside of a `print()` statement with multiple parameters

you can float a value inside of a larger statement by wrapping it with `float()` like we mentioned earlier:

```python
print(float(x))
```

but what if you had a program that was teaching people about floating point numbers, and you wanted to float the number values inside of a larger statement to print something like: _"the floating point number of 10.25000 is 10.25"_

```python
print("the floating point number of 10.2500 is: ", float(10.2500))
```

simply wrap the value you want to float with the `float()`, and be sure to us a comma `,` to separate the parameters!

* * *

alright you modest mouse, it's time for you to go forth and get your [float() on](https://www.youtube.com/watch?v=CTAud5O7Qqk)

**Recommended Reading:**

- [How to use Jupyter Notebooks in VS Code](https://devinschumacher.com/how-to-setup-jupyter-notebook-virtual-environment-vs-code-kernels/)
