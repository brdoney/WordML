def read_data():
    with open("wordle-answers-alphabetical.txt") as f:
        words = [line.strip() for line in f.readlines()]
    return words
