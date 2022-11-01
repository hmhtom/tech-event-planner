const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#commentContent").value.trim();
  const urlArray = location.href.split("/");
  const event_id = urlArray[urlArray.length - 1];
  if (content) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content, event_id }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      location.reload();
    } else {
      alert("Invalid Comment");
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
