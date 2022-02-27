from typing import Optional
from flask import Flask, request
from board import Board, Row
from guessing import calc_openings
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


max_id = 0
boards: dict[int, Board] = {}


@app.route("/id", methods=["GET"])
def get_id():
    global max_id
    curr_id = max_id
    max_id += 1
    return {"id": curr_id}


def __parse_row(row: dict) -> tuple[int, Row]:
    present = {(p["position"], p["letter"]) for p in row["present"]}
    correct = {int(pos): letter for pos, letter in row["correct"].items()}
    absent = row["absent"]
    r = Row(present, correct, absent)
    return row["id"], r


def __get_guesses(board_id: int, row: Optional[Row]) -> dict:
    global boards

    if row is None:
        # Use cached opening information for first guess
        words, scores = calc_openings()
        boards[board_id] = Board([], words)
    else:
        # Calculate things for the subsequent guesses
        boards[board_id] = boards[board_id].add_row(row)
        words, scores = boards[board_id].scan_words()

    # Get top 5
    top_words = words[-5:]
    top_score = scores[-1]
    if top_score > 0:
        top_scores = scores[-5:] / top_score
    else:
        top_scores = scores[-5:] + 1

    entries = []
    for i in reversed(range(0, top_words.size)):
        entries.append({"word": top_words[i], "score": top_scores[i]})

    return {"entries": entries}


@app.route("/board/<int:board_id>", methods=["GET", "POST"])
def transaction(board_id: int):
    # A first time get means
    if request.method == "GET":
        return __get_guesses(board_id, None)
    else:
        data: dict = request.json  # type: ignore
        print(data)
        curr_id, row = __parse_row(data)
        return __get_guesses(curr_id, row)
