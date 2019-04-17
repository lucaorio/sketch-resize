// disable context menu
document.addEventListener('contextmenu', event => {
  event.preventDefault();
});

// cancel button
document.getElementById('cancel').addEventListener('click', event => {
  event.preventDefault();
  window.postMessage('cancel');
});

// submit on enter
document.addEventListener('keypress', event => {
  if (event.keyCode !== 13) return;
  event.preventDefault();
  window.postMessage('submit', getValues());
});

// submit button
document.getElementById('submit').addEventListener('click', event => {
  event.preventDefault();
  window.postMessage('submit', getValues());
});

// get inputs value
const getValues = () => ({
  width: document.getElementById('width').value,
  height: document.getElementById('height').value
});
