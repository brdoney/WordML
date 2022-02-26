from tkinter import W
from repeatable_wordle import colouring, States
from read_dataset import read_data
import numpy as np
from tqdm import tqdm
from dataclasses import dataclass

Config = tuple[States]


@dataclass
class Update:
    present: set[tuple[int, str]]
    correct: dict[int, str]
    absent: set[str]


@dataclass
class Board:
    # Every letter that is definitely present, but we don't know where (yellow)
    present: set[tuple[int, str]]
    # Letters we know the actual position of (green)
    correct: dict[int, str]
    # Verified to not be present in the string (gray)
    absent: set[str]

    # List of possible words
    words: np.ndarray

    # Maxmium number of combos (3 possibilities ^ 5 squares)
    NUM_COMBOS = 3 ** 5

    def is_possible(self, word: str) -> bool:
        remaining = list(word)

        # Check that none of the yellow positions match
        for pos, letter in self.present:
            if remaining[pos] == letter:
                return False

        # Check that none of the green positions match
        for i in range(4, -1, -1):
            if i in self.correct:
                if remaining[i] != self.correct[i]:
                    remaining.pop(i)

        # Check that all of the yellow letters are present
        for _, letter in self.present:
            try:
                remaining.remove(letter)
            except ValueError:
                return False

        # Check that none of the remaining letters are in the absent set
        for letter in remaining:
            if letter in self.absent:
                return False
        return True

    def __filter_words(self):
        self.words = np.array([w for w in self.words if self.is_possible(w)])

    def update(self, up: Update) -> "Board":
        # Construct a board with the new state
        present = self.present.union(up.present)
        correct = self.correct | up.correct
        absent = self.absent.union(up.absent)
        b = Board(present, correct, absent, self.words)

        # Filter the words given the new state
        b.__filter_words()

        return b

    @staticmethod
    def __calc_p_configs(words: list[str]) -> dict[Config, float]:
        config_count: dict[Config, int] = {}
        for guess in tqdm(words):
            for target in words:
                # Say that we got the colouring
                c: Config = colouring(guess, target)
                if c not in config_count:
                    config_count[c] = 1
                else:
                    config_count[c] += 1

        # Calculate probabilities of each word config
        num_possibilities = sum(config_count.values())
        probs = {}
        for c, count in config_count.items():
            probs[c] = count / num_possibilities

        return probs

    @staticmethod
    def __entropy(p_configs: dict[Config, float]) -> float:
        p = np.fromiter(p_configs.values(), dtype=float)
        return -np.sum(p * np.log2(p))  # type: ignore

    def scan_words(self):
        num_words = self.words.size
        ps = np.empty((num_words, self.NUM_COMBOS))

        for i, guess in enumerate(tqdm(self.words)):
            counts: dict[Config, int] = {}

            for target in self.words:
                c = colouring(guess, target)
                if c in counts:
                    counts[c] += 1
                else:
                    counts[c] = 1

            # Vectorised
            vals = np.fromiter(counts.values(), dtype=float)
            vals = vals / sum(vals)
            num_missing = self.NUM_COMBOS - vals.shape[0]
            ps[i] = np.pad(vals, (0, num_missing), constant_values=1)

        # Calc entropy
        H = -np.sum(ps * np.log2(ps), axis=1)  # type: ignore
        sorted_indices = np.argsort(H)

        sorted_H = H[sorted_indices]
        sorted_words = self.words[sorted_indices]
        return sorted_words, sorted_H


if __name__ == "__main__":
    words = read_data()
    # print(words)

    board = Board(set(), {}, set(), np.array(words))
    # print(board.scan_words())

    update = Update({(0, "d")}, {}, {*"oubt"})
    board = board.update(update)
    update = Update({(3, "d")}, {1: "i"}, {*"mls"})
    board = board.update(update)
    update = Update(set(), {4: "d"}, {*"ahe"})
    board = board.update(update)
    update = Update(set(), {4: "d"}, {*"ga"})
    board = board.update(update)
    print(board.scan_words())
