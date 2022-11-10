const eventSource = new EventSource('/sse');
const chatBody = document.getElementById('chat-body');
const form = document.getElementById('chat-form');
const message = document.getElementById('message');

function sendMessage(event) {
  event.preventDefault();
  fetch(`/chat?message=${message.value}`);
  message.value = '';
}

document.addEventListener('DOMContentLoaded', function () {
  eventSource.onmessage = function (event) {
    chatBody.innerHTML += `
    <div class="message-content">
      <div class="message-text">${event.data}</div>
    </div>`;
  };

  form.addEventListener('submit', sendMessage);
});

document.addEventListener('keydown', (event) => {
  if (event.shiftKey && event.key === 'Enter') {
    sendMessage(event);
  }
});
