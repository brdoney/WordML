from read_dataset import read_data
from board import Board, Row
import numpy as np
from os.path import exists

OPENING_CACHE = "./data/opening-words.npz"


def calc_openings() -> tuple[np.ndarray, np.ndarray]:
    # Load the data from disk if it is cached
    if exists(OPENING_CACHE):
        data = np.load(OPENING_CACHE)
        return data["words"], data["scores"]  # type: ignore

    # Otherwise, we have to calculate things
    words = read_data()
    board = Board([], np.array(words))
    words, scores = board.scan_words()

    # Save the data to cache it later
    np.savez(OPENING_CACHE, words=words, scores=scores)

    return words, scores


if __name__ == "__main__":
    words, scores = calc_openings()
    print(words, scores)

    board = Board([], words)
    board = board.add_row(Row({(4, "s")}, {}, {*"tare"}))
    board = board.add_row(Row(set(), {0: "s", 2: "i", 3: "l"}, {*"oy"}))
    board = board.add_row(Row(set(), {0: "s", 2: "i", 3: "l", 4: "l"}, {*"h"}))
    print(board.scan_words())
