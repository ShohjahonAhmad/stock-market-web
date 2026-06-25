const API_KEY = "d8kknnhr01qjgd716g7gd8kknnhr01qjgd716g80";

const stocks = ["AAPL", "MSFT", "NVDA", "TSLA"];

const container = document.getElementById("stocks-container");

stocks.forEach((symbol) => {
  fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      const color = data.dp >= 0 ? "text-success" : "text-danger";
      container.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="card p-3">
                        <h5>${symbol}</h5>
                        <p>$${data.c}</p>
                        <p class="${color}">
                            ${data.dp}%
                        </p>

                        <a
                            href="stock-details.html?symbol=${symbol}"
                            class="btn btn-primary">
                            View Details
                        </a>
                </div>
            </div>
        `;
    });
});

const canvas = document.getElementById("stockChart");

if (canvas) {
  new Chart(canvas, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Apple Stock Price",
          data: [205, 208, 210, 209, 213],
          tension: 0.4,
        },
      ],
    },
  });
}

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const searchResults = document.getElementById("search-results");

if (searchButton) {
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchButton.click();
    }
  });

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();

    if (!query) return;

    fetch(`https://finnhub.io/api/v1/search?q=${query}&token=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        searchResults.innerHTML = "";

        data.result.slice(0, 5).forEach((stock) => {
          searchResults.innerHTML += `
        <div class="card p-3 mb-2">
          <h5>${stock.description}</h5>

          <p>${stock.symbol}</p>

          <a href="stock-details.html?symbol=${stock.symbol}" class="btn btn-secondary">
          View Details
          </a>
        </div>
        `;
        });
      });
  });
}

const countryElement = document.getElementById("user-country");
const marketElement = document.getElementById("market-name");

const markets = {
  Germany: "DAX",
  "United States": "NASDAQ",
  "United Kingdom": "FTSE 100",
  France: "CAC 40",
  Japan: "Nikkei 225",
};

if (countryElement) {
  fetch("https://itransition-auth-backend.vercel.app/api")
    .then((res) => res.json())
    .then((data) => {
      countryElement.textContent = data.country;
      marketElement.textContent = markets[data.country] || "Global Market";
    });
}

document.getElementById("explore-btn").addEventListener("click", () => {
  document.getElementById("stocks-container").scrollIntoView({
    behavior: "smooth",
  });
});

const homeNews = document.getElementById("home-news");

fetch(`https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`)
  .then((response) => response.json())
  .then((news) => {
    news.slice(0, 3).forEach((article) => {
      homeNews.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card h-100">

            <img
              src="${article.image}"
              class="card-img-top news-image">

            <div class="card-body d-flex flex-column">

              <h5>
                ${article.headline}
              </h5>

              <p>
                ${article.summary.substring(0, 100)}...
              </p>

              <a
                href="${article.url}"
                target="_blank"
                class="btn btn-outline-primary mt-auto">
                Read More
              </a>

            </div>
          </div>
        </div>
      `;
    });
  });
