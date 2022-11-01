const updateUsernameHandler = async (event) => {
  const username = document.querySelector("#username").value.trim();
  if (username) {
    const response = await fetch(`/api/user/username`, {
      method: "PUT",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert("Failed to update username");
    }
  }
};

document
  .querySelector("#update-username")
  .addEventListener("click", updateUsernameHandler);
