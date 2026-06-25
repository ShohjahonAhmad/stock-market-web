const form = document.getElementById("register-form");
const messageElement = document.getElementById("register-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value;

  const confirmPassword = document.getElementById("confirm-password").value;

  const submitButton = form.querySelector("button[type='submit']");

  if (password !== confirmPassword) {
    messageElement.textContent = "Passwords do not match";

    messageElement.className = "alert alert-danger";

    return;
  }

  try {
    submitButton.disabled = true;
    submitButton.textContent = "Registering...";
    const response = await fetch(
      "https://itransition-auth-backend.vercel.app/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    messageElement.textContent =
      "Registration successful. Please verify your email before logging in.";

    messageElement.className = "alert alert-success";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 5000);
  } catch (error) {
    messageElement.textContent = error.message;

    messageElement.className = "alert alert-danger";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Register";
  }
});
