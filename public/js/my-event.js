const updateButtonHandler = async (event) => {
  const id = event.target.getAttribute("data-id");
  document.location.replace(`/dashboard/update-event/${id}`);
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/event/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard?opt=1");
    } else {
      alert("Failed to delete project");
    }
  }
};

document
  .querySelector(".btn-update")
  .addEventListener("click", updateButtonHandler);

document
  .querySelector(".btn-delete")
  .addEventListener("click", delButtonHandler);
