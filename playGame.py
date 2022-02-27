from random import randint
from board import Board, Row
from colouring import States, colouring

from guessing import calc_openings

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
    words, scores = calc_openings()
    board = Board([], words)
    while guesses < 6 and notSolved:
        currGuess = words[-1]
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
        board = board.add_row(Row.from_states(currState, currGuess))
        words, scores = board.scan_words()
    if notSolved:
        return -1
    else:
        return score


if __name__ == "__main__":
    file = open("./data/new-wordle-answers-alphabetical.txt", "r")
    lines = file.readlines()

    totalScores = 0
    for i in range(len(lines)):
        word = lines[i].strip("\n")
        totalScores += playGame(word)
    print("average score is: " + (totalScores/len(lines)))
