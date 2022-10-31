const unattendHandler = async (event) => {
  const urlArray = location.href.split("/");
  const event_id = urlArray[urlArray.length - 1];
  const response = await fetch(`/api/event/participant/${event_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to unattend");
  }
};

document
  .querySelector("#unattendBtn")
  .addEventListener("click", unattendHandler);
