const API_KEY = "d8kknnhr01qjgd716g7gd8kknnhr01qjgd716g80";

const params = new URLSearchParams(window.location.search);

const symbol = params.get("symbol");
document.getElementById("stock-title").textContent = symbol;

let chart;

let quoteData;

const chartRanges = {
  "1H": {
    labels: ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM"],
    multiplier: [0.996, 0.999, 1.002, 1.004, 1.006, 1],
  },

  "1D": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    multiplier: [0.97, 0.98, 0.99, 1.01, 1],
  },

  "1W": {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    multiplier: [0.9, 0.94, 0.97, 1],
  },

  "1M": {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    multiplier: [0.82, 0.85, 0.9, 0.94, 0.97, 1],
  },
};

function renderChart(range) {
  const config = chartRanges[range];

  const prices = config.multiplier.map((m) => quoteData.c * m);

  if (chart) {
    chart.data.labels = config.labels;

    chart.data.datasets[0].data = prices;

    chart.update();

    return;
  }

  chart = new Chart(document.getElementById("stockChart"), {
    type: "line",

    data: {
      labels: config.labels,

      datasets: [
        {
          label: `${symbol} Price`,

          data: prices,

          tension: 0.35,

          borderWidth: 3,

          borderColor: "#0d6efd",

          backgroundColor: "rgba(13,110,253,.15)",

          pointRadius: 0,

          fill: true,
        },
      ],
    },

    options: {
      responsive: true,

      plugins: {
        legend: {
          display: false,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },

      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`)
  .then((r) => r.json())
  .then((data) => {
    quoteData = data;

    document.getElementById("stock-price").textContent = `$${data.c.toFixed(
      2
    )}`;

    const change = document.getElementById("stock-change");

    change.textContent =
      data.dp >= 0
        ? `▲ ${data.dp.toFixed(2)}%`
        : `▼ ${Math.abs(data.dp).toFixed(2)}%`;

    change.className = data.dp >= 0 ? "text-success" : "text-danger";

    renderChart("1D");
  });

document.querySelectorAll(".timeframe").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".timeframe")
      .forEach((b) => b.classList.remove("active"));

    button.classList.add("active");

    renderChart(button.dataset.range);
  });
});

const watchSymbols = ["AAPL", "MSFT", "NVDA", "TSLA"];

const watchlist = document.getElementById("watchlist");

watchSymbols.forEach((stock) => {
  fetch(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=${API_KEY}`)
    .then((r) => r.json())

    .then((data) => {
      const color = data.dp >= 0 ? "text-success" : "text-danger";

      const active = stock === symbol ? "active-watch" : "";

      watchlist.innerHTML += `

      <div
          class="watch-item"
          onclick="window.location='stock-details.html?symbol=${stock}'">

          <div>

              <strong>${stock}</strong>

              <div class="${color}">
                  ${data.dp.toFixed(2)}%
              </div>

          </div>

          <div>

              $${data.c.toFixed(2)}

          </div>

      </div>

      `;
    });
});

fetch(
  `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`
)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("stock-title").textContent = data.name;

    document.getElementById("company-industry").textContent =
      data.finnhubIndustry;

    document.getElementById("company-country").textContent = data.country;

    document.getElementById("company-logo").src = data.logo;

    document.getElementById("company-website").href = data.weburl;

    document.getElementById(
      "market-cap"
    ).textContent = `$${data.marketCapitalization.toFixed(2)}B`;
  });

const today = new Date();

const from = new Date();
from.setDate(today.getDate() - 7);

const fromDate = from.toISOString().split("T")[0];
const toDate = today.toISOString().split("T")[0];

const newsContainer = document.getElementById("news-container");

fetch(
  `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${fromDate}&to=${toDate}&token=${API_KEY}`
)
  .then((response) => response.json())
  .then((news) => {
    newsContainer.innerHTML = "";

    news
      .slice(0, 6)
      .forEach((article) => {
        const summary = article.summary
          ? article.summary.substring(0, 140) + "..."
          : "No summary available.";

        newsContainer.innerHTML += `

<div class="col-md-6">

<div class="card h-100 p-3">

<img
src="${article.image || "assets/logo.png"}"
class="news-image">

<h5 class="mt-3">

${article.headline}

</h5>

<p>

${summary}

</p>

<small class="text-muted">

${article.source}

</small>

<a
href="${article.url}"
target="_blank"
class="btn btn-primary mt-auto">

Read More

</a>

</div>

</div>

`;
      })
      .catch(() => {
        newsContainer.innerHTML = `
    
    <div class="alert alert-danger">
    
    Unable to load company news.
    
    </div>
    
    `;
      });
  });
