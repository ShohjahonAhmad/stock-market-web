if (localStorage.getItem("token")) {
  window.location.href = "portfolio.html";
}

console.log(localStorage.getItem("token"));

const form = document.getElementById("login-form");
const messageElement = document.getElementById("login-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value;

  try {
    const response = await fetch(
      "https://itransition-auth-backend.vercel.app/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    localStorage.setItem("token", data.token);

    messageElement.textContent = "Login successful";

    messageElement.className = "alert alert-success";

    setTimeout(() => {
      window.location.href = "portfolio.html";
    }, 1000);
  } catch (error) {
    messageElement.textContent = error.message;

    messageElement.className = "alert alert-danger";
  }
});
