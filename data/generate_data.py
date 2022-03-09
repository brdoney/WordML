import csv

with open("./new-wordle-answers.txt") as f:
    reader = csv.reader(f)
    n = next(reader)

with open("./new-wordle-answers-alphabetical.txt", "w") as f:
    contents = [val.strip('", ') + "\n" for val in n]
    contents.sort()
    f.writelines(contents)
