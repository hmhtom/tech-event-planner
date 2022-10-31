const attendHandler = async (event) => {
  const urlArray = location.href.split("/");
  const event_id = urlArray[urlArray.length - 1];
  const response = await fetch(`/api/event/participant`, {
    method: "POST",
    body: JSON.stringify({
      event_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to attend");
  }
};

document.querySelector("#attendBtn").addEventListener("click", attendHandler);
