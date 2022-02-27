from typing import Optional
from flask import Flask, request
from board import Board, Row
from guessing import calc_openings
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def __parse_row(row: dict) -> Row:
    present = {(p["position"], p["letter"]) for p in row["present"]}
    correct = {int(pos): letter for pos, letter in row["correct"].items()}
    absent = row["absent"]
    r = Row(present, correct, absent)
    return r


@app.route("/board", methods=["GET", "POST"])
def transaction():
    words, scores = calc_openings()

    if request.method == "POST":
        entries = request.json["entries"]  # type: ignore

        board = Board([], words)

        for entry in entries:
            row = __parse_row(entry)
            board = board.add_row(row)

        # Get the updated results
        words, scores = board.scan_words()

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
