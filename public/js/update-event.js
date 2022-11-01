var today = new Date().toISOString().slice(0, 16);

document.getElementsByName("date")[0].min = today;

const newEventHandler = async (event) => {
  const title = document.querySelector("#title").value.trim();
  const date = document.querySelector("#date").value.trim();
  const description = document.querySelector("#description").value.trim();
  const location = document.querySelector("#location").value.trim();
  const category_id = document.querySelector("#category").value;
  const urlArray = document.location.href.split("/");
  const id = urlArray[urlArray.length - 1];
  if (title && date && description && location && category) {
    const response = await fetch(`/api/event/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, date, description, location, category_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace(`/dashboard?opt=1`);
    } else {
      alert("Failed to update event");
      console.log(response);
    }
  }
};

document
  .querySelector("#update-event")
  .addEventListener("click", newEventHandler);
