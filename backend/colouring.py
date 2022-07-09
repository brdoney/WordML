import enum


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
        if (
            states[i] != States.Correct
            and guessArr[i] in targetArr
            and guess.count(guessArr[i], 0, i) <= targetArr.count(guess[i])
        ):
            states[i] = States.Present
    return tuple(states)  # type: ignore
