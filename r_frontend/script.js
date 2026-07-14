let books = [];

/* Load books */
fetch("https://final-year-project-1-431i.onrender.com")
  .then(res => res.json())
  .then(data => {
    books = data;
    document.getElementById("language").onchange = loadBooks;
    document.getElementById("genre").onchange = loadBooks;
  });

function loadBooks() {
  const lang = document.getElementById("language").value;
  const genre = document.getElementById("genre").value;
  const bookSelect = document.getElementById("book");

  bookSelect.innerHTML = `<option value="">Select Book (Optional)</option>`;
  if (!lang || !genre) return;

  books
    .filter(b => b.language === lang && b.category === genre)
    .forEach(b => {
      const opt = document.createElement("option");
      opt.value = b.title;
      opt.textContent = b.title;
      bookSelect.appendChild(opt);
    });
}

/* Recommend */
function getRecommendations() {
  const lang = document.getElementById("language").value;
  const genre = document.getElementById("genre").value;
  const title = document.getElementById("book").value;

  const results = document.getElementById("results");
  const selectedContainer = document.getElementById("selected-book-container");
  const similarHeading = document.getElementById("similar-heading");

  if (!lang || !genre) {
    alert("Select Language and Genre");
    return;
  }

  fetch("https://final-year-project-1-431i.onrender.com/recommend", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        language: lang,
        category: genre,
        title: title
    })
})
    .then(res => res.json())
    .then(data => {
      results.innerHTML = "";
      selectedContainer.innerHTML = "";
      similarHeading.style.display = "none";

      // Selected book
      if (title && data.selected && data.selected.length) {
        selectedContainer.innerHTML = bookCardHTML(data.selected[0], true);
      }

      // Similar books (ML output)
      if (data.similar && data.similar.length) {
        similarHeading.style.display = "block";
        data.similar.forEach(b => {
          results.innerHTML += bookCardHTML(b, false);
        });
      }
    });
}

/* 🔹 SINGLE CARD TEMPLATE (Buy + Download both) */
function bookCardHTML(b, selected) {
  const archiveLink =
    `https://archive.org/search?query=${encodeURIComponent(b.title)}`;

  return `
    <div class="book-card ${selected ? "selected" : ""}">
      <img src="${b.image}">
      <h3>${b.title}</h3>
      <p>${b.language} | ${b.category}</p>

      <div class="book-links">
        <a href="${b.buy_link}" target="_blank" class="buy-link">Buy</a>
        <a href="${archiveLink}" target="_blank" class="archive-link">
          Download
        </a>
      </div>
    </div>
  `;
}
