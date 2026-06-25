const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

const API_KEY = "d8kknnhr01qjgd716g7gd8kknnhr01qjgd716g80";

const BASE_URL = "https://itransition-auth-backend.vercel.app";

const tableBody = document.getElementById("portfolio-body");

const totalElement = document.getElementById("portfolio-total");

const addButton = document.getElementById("add-stock-btn");

async function loadPortfolio() {
  tableBody.innerHTML = "";

  let portfolioTotal = 0;

  const response = await fetch(`${BASE_URL}/portfolio`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  for (const holding of data.holdings) {
    const quoteResponse = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${holding.symbol}&token=${API_KEY}`
    );

    const quote = await quoteResponse.json();

    const totalValue = holding.shares * quote.c;

    portfolioTotal += totalValue;

    const changeClass = quote.dp >= 0 ? "text-success" : "text-danger";

    tableBody.innerHTML += `
      <tr>
        <td>${holding.symbol}</td>
        <td>${holding.shares}</td>
        <td>$${quote.c.toFixed(2)}</td>
        <td>$${totalValue.toFixed(2)}</td>
        <td class="${changeClass}">
          ${quote.dp.toFixed(2)}%
        </td>
        <td>
          <button
            class="btn btn-sm btn-danger"
            onclick="deleteHolding('${holding.id}')">
            Delete
          </button>
        </td>
      </tr>
    `;
  }

  totalElement.textContent = `Total Value: $${portfolioTotal.toFixed(2)}`;
}

async function deleteHolding(id) {
  await fetch(`${BASE_URL}/portfolio/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  loadPortfolio();
}

addButton.addEventListener("click", async () => {
  const symbol = document
    .getElementById("symbol-input")
    .value.trim()
    .toUpperCase();

  const shares = Number(document.getElementById("shares-input").value);

  if (!symbol || !shares) {
    return;
  }

  await fetch(`${BASE_URL}/portfolio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      symbol,
      shares,
    }),
  });

  document.getElementById("symbol-input").value = "";

  document.getElementById("shares-input").value = "";

  loadPortfolio();
});

loadPortfolio();

window.deleteHolding = deleteHolding;
