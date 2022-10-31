const loginForm = async (event) => {
  event.preventDefault();

  // Data from login form
  const email = document.querySelector("#login-email").value.trim();
  const password = document.querySelector("#login-password").value.trim();

  if (email && password) {
    // Send POST request
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If login is successful -> stay on same page
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

const signupForm = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#user-name").value.trim();
  const email = document.querySelector("#user-email").value.trim();
  const password = document.querySelector("#user-password").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector("#login-form").addEventListener("submit", loginForm);

document.querySelector("#signup-form").addEventListener("submit", signupForm);
