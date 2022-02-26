""" 

from tkinter import *
from turtle import bgcolor

window = Tk()
window.title("Repeatable Wordle")

canv = Canvas(window, height=700, width = 700, bg='white')
boxDimensions = 75
#boxes = [[a1, a2, a3, a4, a5], [b1, b2, b3, b4, b5], [c1, c2, c3, c4, c5], [d1, d2, d3, d4, d5], [e1, e2, e3, e4, e5]]

boxes = [[0,0,0,0,0],
         [0,0,0,0,0],
         [0,0,0,0,0],
         [0,0,0,0,0],
         [0,0,0,0,0]]

    
for i in range(5):
    for j in range(5):
        x = 50+ 100*j + 25*(j-1)
        y = 50+ 100*i + 25*(i-1)
        boxes[i][j] = canv.create_rectangle(x, y, x+boxDimensions, y + boxDimensions, outline='black')


canv.pack()

window.mainloop()
"""
from random import randint
import enum


tries = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
]


class States(enum.Enum):
    Emp = 0
    Correct = 1
    Present = 2
    Absent = 3


def colouring(guess: str, target: str) -> tuple[States]:
    # states of each letter (correct, present, and absent)
    states = [States.Emp] * 5
    for i in range(5):
        if guess[i] == target[i]:
            states[i] = States.Correct
        elif guess[i] in target:
            states[i] = States.Present
        else:
            states[i] = States.Absent
    return tuple(states)  # type: ignore
