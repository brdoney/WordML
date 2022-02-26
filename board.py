from dataclasses import dataclass


@dataclass
class Board:
    # Every letter that is definitely present, but we don't know where (yellow)
    present: list[tuple[int, str]]
    # Letters we know the actual position of (green)
    correct: list[tuple[int, str]]
    # Verified to not be present in the string (gray)
    absent: set[str]

    def is_possible(self, word: str) -> bool:
        remaining = list(word)

        # Check that none of the yellow positions match
        for pos, letter in self.present:
            if remaining[pos] == letter:
                return False

        # Check that none of the green positions match
        for pos, letter in reversed(self.correct):
            if remaining[pos] != letter:
                return False
            remaining.pop(pos)

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


board = Board([(0, "d")], [], {*"cranedoubt"})
print(board.is_possible("crane"))
print(board.is_possible("doubt"))
print(board.is_possible("abcde"))
print(board.is_possible("dvswq"))
