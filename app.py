from boggle import Boggle

from flask import Flask, request, render_template, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)

boggle_game = Boggle()



@app.route('/')
def start_game():
    """Create the board and start the game"""
    board = boggle_game.make_board()
    session['board'] = board

    return render_template("start.html", board = board)

@app.route('/guess')
def check_guess():
    """Get guess and check it against the word dictionary then return JSON"""

    this_guess = request.args.get('guess')

    board = session['board']

    valid = boggle_game.check_valid_word(board, this_guess)

    return jsonify({'results': valid})