import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load data
df = pd.read_csv("books.csv")

# Combine features for ML
df["features"] = (
    df["title"].astype(str) + " " +
    df["category"].astype(str) + " " +
    df["language"].astype(str)
)

# TF-IDF Vectorization
vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = vectorizer.fit_transform(df["features"])

def recommend_books(title, top_n=6):
    if title not in df["title"].values:
        return []

    idx = df[df["title"] == title].index[0]

    similarity_scores = cosine_similarity(
        tfidf_matrix[idx], tfidf_matrix
    ).flatten()

    similar_indices = similarity_scores.argsort()[::-1][1:top_n+1]

    return df.iloc[similar_indices].to_dict(orient="records")
