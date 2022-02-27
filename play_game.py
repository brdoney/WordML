import sys

from tqdm import tqdm
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
        # print(coloredGuesses)
        row = Row.from_states(currState, currGuess)
        board = board.add_row(row)
        words, scores = board.scan_words()
    if notSolved:
        return 0
    else:
        return score


if __name__ == "__main__":
    file = open("./data/wordle-answers-alphabetical.txt", "r")
    lines = file.readlines()

    totalScores = 0
    for i in tqdm(range(len(lines))):
        word = lines[i].strip("\n")
        res = playGame(word)
        totalScores += res
    print("average score is: " + (totalScores / len(lines)))
