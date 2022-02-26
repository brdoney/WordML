from random import randint
import enum

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
        elif guess[i] in target and occuranceNumber(guess, i) <= totalOccurances(target, guess[i]):
            states[i] = States.Present
        else:
            states[i] = States.Absent
    return tuple(states)  # type: ignore

def occuranceNumber(word: str, index: int) -> int:
    letter = word[index]
    occurances = 0
    for i in range(index+1):
        if(word[i] == letter):
            occurances += 1
    return occurances

def totalOccurances(word: str, letter: str) -> int:
    count = 0
    for i in range(5):
        if letter == word[i]:
            count += 1
    return count

def prGreen(skk): return "\033[92m {}\033[00m" .format(skk)
def prYellow(skk): return "\033[93m {}\033[00m" .format(skk)
def prBlack(skk): return "\033[98m {}\033[00m" .format(skk)

def playGame(target: str) -> int:
    target = target.lower()
    score = 0
    guesses = 0
    currState = [States.Emp] * 5
    coloredGuesses = ""
    notSolved = True
    while guesses < 6 and notSolved:
        currGuess = str(input())
        currState = colouring(currGuess, target)
        correctLetters = 0
        for i in range(5):
            if currState[i] == States.Correct:
                coloredGuesses += prGreen(currGuess[i])
                correctLetters += 1
                if(correctLetters == 5):
                    notSolved = False
            elif currState[i] == States.Present:
                coloredGuesses += prYellow(currGuess[i])
            else:
                coloredGuesses += prBlack(currGuess[i])
        guesses += 1
        score += 1
        coloredGuesses += "\n"
        print(coloredGuesses)
    if(notSolved):
        return -1
    else:
        return score