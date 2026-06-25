# 📈 Stock Market Tracker

A responsive web application for tracking stock market data, viewing company information, managing a personal portfolio, and staying updated with the latest financial news.

This project was developed as part of a university coursework project and demonstrates the integration of external APIs, user authentication, and responsive web design.

---

## Features

### Dashboard

- Search publicly traded companies by symbol or company name.
- View trending stocks.
- Country-based market recommendation.
- Latest financial news.
- Responsive landing page.

### Stock Details

- Live stock price.
- Company profile.
- Interactive price chart.
- Multiple chart ranges:

  - 1 Hour
  - 1 Day
  - 1 Week
  - 1 Month

- Company statistics.
- Company website link.
- Related company news.
- Watchlist with quick navigation.

### News

- Latest market news.
- Company news with images.
- Direct links to original articles.

### Portfolio

- Protected page requiring login.
- Displays user holdings.
- Calculates total portfolio value using live prices.
- Add stocks to portfolio.
- Delete stocks from portfolio.
- Live percentage change for each holding.

### Authentication

- User registration.
- User login.
- Email verification.
- JWT authentication.
- Protected routes.
- Logout functionality.

### Pro Page

- Premium subscription landing page.
- Modern pricing layout.
- Feature comparison.
- Upgrade button (demo).

---

# Technologies Used

## Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- Chart.js

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Supabase)

## Authentication

- JWT
- Bcrypt
- Nodemailer
- Email Verification

## External APIs

### Finnhub API

Used for:

- Stock quotes
- Company profiles
- Market news
- Company news
- Symbol search

---

# Project Structure

```
assets/
css/
js/

index.html
news.html
portfolio.html
stock-details.html
login.html
register.html
pro.html
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Open the project folder.

If using the frontend only:

- Open `index.html` using Live Server.

For authentication features:

Start the backend server:

```bash
npm install
npm run dev
```

---

# Authentication

The application uses JWT authentication.

After a successful login:

- JWT token is stored in Local Storage.
- Protected pages verify the token before allowing access.
- Users must verify their email before logging in.

---

# Portfolio

Authenticated users can:

- Add stocks
- Remove stocks
- View live prices
- Calculate portfolio value

---

# APIs

The application integrates several Finnhub endpoints:

- Quote
- Company Profile
- Company News
- Market News
- Symbol Search

---

# Future Improvements

- Buy/Sell simulation
- Historical price data
- Portfolio performance charts
- Favorites synchronization
- Market alerts
- Dark mode
- Real payment integration
- Real-time WebSocket updates

---

# Author

Developed by **Shokhjahon Akhmedov**

---

# License

This project was created for educational purposes.
