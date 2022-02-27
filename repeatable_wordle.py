import enum
from random import randint


class States(enum.Enum):
    Emp = 0
    Correct = 1
    Present = 2
    Absent = 3


def colouring(guess: str, target: str) -> tuple[States]:
    # states of each letter (correct, present, and absent)
    states = [States.Absent] * 5
    guessArr = list(guess)
    targetArr = list(target)
    for i in range(5):
        if guessArr[i] == targetArr[i]:
            states[i] = States.Correct
            targetArr[i] = 0  # type: ignore
    for i in range(5):
        if guessArr[i] in targetArr and guess.count(
            guessArr[i], 0, i
        ) < targetArr.count(guess[i]):
            states[i] = States.Present
    return tuple(states)  # type: ignore


def prGreen(skk):
    return "\033[92m {}\033[00m".format(skk)


def prYellow(skk):
    return "\033[93m {}\033[00m".format(skk)


def prBlack(skk):
    return "\033[98m {}\033[00m".format(skk)


def playGame(target: str) -> int:
    target = target.lower()
    score = 0
    guesses = 0
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
                if correctLetters == 5:
                    notSolved = False
            elif currState[i] == States.Present:
                coloredGuesses += prYellow(currGuess[i])
            else:
                coloredGuesses += prBlack(currGuess[i])
        guesses += 1
        score += 1
        coloredGuesses += "\n"
        print(coloredGuesses)
    if notSolved:
        return -1
    else:
        return score


if __name__ == "__main__":
    index = randint(0, 2315)
    file = open("./data/wordle-answers-alphabetical.txt", "r")
    lines = file.readlines()
    word = lines[index].strip("\n")

    print(playGame(word))
