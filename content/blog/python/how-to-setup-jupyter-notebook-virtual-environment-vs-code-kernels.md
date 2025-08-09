---
slug: /how-to-setup-jupyter-notebook-virtual-environment-vs-code-kernels/
title: How To Setup Jupyter Notebook in VS Code (w/ Virtual Env & Kernels)
date: '2022-09-20'
categories:
  - programming
  - python
tags:
  - jupyter-notebooks
  - vs-code
category: Python
---

Figuring out how to how setup a `jupyter notebook` is pretty easy - you just open your terminal, install jupyter & run `jupyter notebook`.

But figuring out how to do it inside of VS CODE was not very intuitive (at least not for me, as I am kind of a newb with python).

But learning from newbies is the best thing you can do because, as you will find out, we are so "dumb" that our processes need to be so detailed that a monkey could run them, so it's unlikely we will leave out some critical step that just ruins your whole day.

So here is my process, compiled from digging, reading, and banging my head against a wall until i nailed it.

Let's get to it.

https://youtu.be/-j6y-5t37os


* * *

- [Prerequisites](#strong-prerequisites-strong)
    - [Install jupyter](#install-jupyter)
    - [VS Code jupyter extensions](#vs-code-jupyter-extensions)
- [Process](#process)
    - [Step 1. Create project folder](#step-1-create-project-folder)
    - [Step 2. Create, activate & select your virtual environment](#step-2-create-activate-amp-select-your-virtual-environment)
    - [Step 3. Install ipykernel](#step-3-install-code-ipykernel-code)
    - [Step 4. Create new kernel](#step-4-create-new-kernel)
    - [Step 5. Start jupyter](#step-5-start-jupyter)
    - [Step 6. Select kernel for project](#step-6-select-kernel-for-project)
        - [Step 6.1: Create a new Jupyter notebook](#step-6-1-create-a-new-jupyter-notebook)
        - [Step 6.2: Choose your kernel](#step-6-2-choose-your-kernel)

## **Prerequisites**

### Install jupyter

First, you obviously need jupyter installed.

If you haven't done that, then do that first.

Not going to cover that here because i don't know what system you're on, or package manager you use.

Onwards.

### VS Code jupyter extensions

i don't know enough about extensions to recommend "the perfect setup", but here's what I have installed.

so if you feel like just being a lemming and following my lead, here ya go:

1. Jupyter (extension ID: `ms-toolsai.jupyter`)

3. Jupyter Notebook Renderers (extension ID: `ms-toolsai.jupyter-renderers`)

5. Jupyter Keymap (extension ID: `ms-toolsai.jupyter-keymap`)

7. VS Code Jupyter Notebook Previewer (extension ID: `jithurjacob.nbpreviewer`)



## Process

### Step 1. Create project folder

First you need a project folder, so create that.

You can use Finder, Terminal, or do it in VS Code.

I like doing it without the GUI because "practice makes progress".

Tweet that. You'll look clever & sophisticated.

And then get back to work because you aren't here to be dickin' around on social media.

Create your project folder:

```
# syntax
mkdir [folder-name]

# example
mkdir myproject
```

### Step 2. Create, activate & select your virtual environment

Navigate to / open your project folder and create a virtual environment inside of it:

```
# syntax
python3 -m venv &lt;virtual environment name&gt;

# example
# that would create a virtual environment named 'myenv'
python3 -m venv myenv
```

Now activate the virtual environment and when VS CODE prompts you to set it as default for the project, hit yes.

```
# syntax
source &lt;virtual environment name&gt;/bin/activate

# example
source myenv/bin/activate
```

### Step 3. Install `ipykernel`

Now that your virtual environment is activated, install `ipykernel`

```
pip3 install ipykernel
```

### Step 4. Create new kernel

Now you can create a new kernel to be used for your project:

```
# syntax
python3 -m ipykernel install --user --name="[projectname]"

# example
# That would create a kernel named 'myproject'
python3 -m ipykernel install --user --name="myproject"
```

### Step 5. Start jupyter

Now you can start Jupyter. I do it from the VS Code terminal.

```
jupyter notebook
```

If you did this right you should see something like this in your terminal:

To access the notebook, open this file in a browser:
        file:///Users/[your-username]/Library/Jupyter/runtime/nbserver-15044-open.html
    Or copy and paste one of these URLs:
        https://localhost:8889/?token="f1ae910e56381c26a62cfb18f83241076bd11d84f7e8e36e"
     or https://127.0.0.1:8889/?token="f1ae910e56381c26a62cfb18f83241076bd11d84f7e8e36e"

### Step 6. Select kernel for project

Now you can assign the kernel to the project in VS CODE.

#### Step 6.1: Create a new Jupyter notebook

- Open the VSCODE search bar: `cmd+shift+p`

- Type in & choose: "Create: New Jupyter Notebook"

#### Step 6.2: Choose your kernel

- Open the VSCODE search bar: `cmd+shift+p`

- Type in & choose: "Notebook: Select Notebook Kernel"

At the bottom of your VS Code window, you should see "Jupyter Server: Local"

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/jupyter-server-local-vs-code-1024x665.png)

Click that, and a dropdown will appear.

Now, you will simply enter one of the URLs you received when you ran the Jupyter command back in Step 5:

```
To access the notebook, open this file in a browser:
        file:///Users/[your-username]/Library/Jupyter/runtime/nbserver-15044-open.html

    Or copy and paste one of these URLs:
        http://localhost:8889/?token="f1ae910e56381c26a62cfb18f83241076bd11d84f7e8e36e"
     or https://127.0.0.1:8889/?token="f1ae910e56381c26a62cfb18f83241076bd11d84f7e8e36e"
```


