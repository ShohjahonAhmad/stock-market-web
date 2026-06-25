const API_KEY = "d8kknnhr01qjgd716g7gd8kknnhr01qjgd716g80";

const newsContainer = document.getElementById("news-container");

fetch(`https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`)
  .then((response) => response.json())
  .then((news) => {
    newsContainer.innerHTML = "";

    news.slice(0, 100).forEach((article) => {
      const summary = article.summary
        ? article.summary.substring(0, 120) + "..."
        : "";

      newsContainer.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card h-100">

            ${
              article.image
                ? `<img
                     src="${article.image}"
                     class="card-img-top news-image"
                     alt="News">`
                : ""
            }

            <div class="card-body d-flex flex-column">

              <h5 class="card-title">
                ${article.headline}
              </h5>

              <p class="card-text">
                ${summary}
              </p>

              <small class="text-muted">
                ${article.source}
              </small>

              <br><br>

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
