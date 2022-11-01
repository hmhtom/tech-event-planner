const updatePasswordHandler = async (event) => {
  const password = document.querySelector("#password").value.trim();
  const password_confirm = document
    .querySelector("#password-confirm")
    .value.trim();
  if (password && password_confirm) {
    if (password === password_confirm) {
      const response = await fetch(`/api/user/password`, {
        method: "PUT",
        body: JSON.stringify({ password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert("Failed to update password");
      }
    } else {
      alert("Confirm password is different than password.");
    }
  }
};

document
  .querySelector("#update-password")
  .addEventListener("click", updatePasswordHandler);
