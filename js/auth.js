const authLink = document.getElementById("auth-link");

if (authLink && localStorage.getItem("token")) {
  authLink.textContent = "Logout";

  authLink.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("token");

    window.location.href = "login.html";
  });
}
