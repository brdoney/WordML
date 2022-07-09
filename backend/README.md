# Backend
This directory is for all of the backend code driving the WordML API.

# Getting Started

## Install Global Dependencies
Ensure you have the following global dependencies and their correct versions installed on your local machine:
| Global Dependency | Version |
| :- | -: |
| Python | ^3.9.2 |

## Create Virtual Environment
Run the following command while at the root directory of the `backend/` folder. For more information on Python virtual environments, check out venv's documentation [here](https://docs.python.org/3/library/venv.html).
```
# Create the virtual environment.
python3 -m venv venv

# Activate and enter the virtual environment.
# Linux or MacOS:
source venv/bin/activate

# Windows:
./venv/Scripts/activate
```

## Install Application Dependencies
Run the following command while at the root directory of the `backend/` folder and while inside your virtual environment.
```
pip install -r requirements.txt
```
