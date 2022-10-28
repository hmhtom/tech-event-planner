const newEventHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#eventName').value.trim();
    const date = document.querySelector('#eventDate').value.trim();
    const description = document.querySelector('#eventDescription').value.trim();
    const location = document.querySelector('#eventLocation').value.trim();
    const needed_funding = document.querySelector('#eventFunding').value.trim();
  
    if (name && date && description && location && needed_funding) {
      const response = await fetch(`/api/events`, {
        method: 'POST',
        body: JSON.stringify({ name, date, description, location, needed_funding }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/event/${id}`);
      } else {
        alert('Failed to create event');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/event/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-event')
    .addEventListener('submit', newEventHandler);
  
  document
    .querySelector('.btn-delete')
    .addEventListener('click', delButtonHandler);