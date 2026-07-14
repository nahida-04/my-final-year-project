from flask import Flask, jsonify, request
from flask_cors import CORS
import csv

# ML recommender (ADDED earlier)
from recommender import recommend_books

app = Flask(__name__)

CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=False
)

BOOKS = []

with open("books.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    BOOKS = list(reader)
    
@app.route("/")
def home():
    return "Backend Working"
    
@app.route("/recommend", methods=["OPTIONS"])
def recommend_options():
    return "", 200
    
@app.route("/books")
def books():
    return jsonify(BOOKS)

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()

    language = data.get("language")
    category = data.get("category")
    title = data.get("title", "")

    selected = []
    similar = []

    if title:
        # selected book (same as before)
        for b in BOOKS:
            if b["title"] == title:
                selected = [b]
                break

        # 🔹 ML-based similar books
        similar = recommend_books(title)

    else:
        # fallback (same as before)
        similar = [
            b for b in BOOKS
            if b["language"] == language and b["category"] == category
        ]

    return jsonify({
        "selected": selected,
        "similar": similar[:6]
    })

if __name__ == "__main__":
    app.run(debug=True)
