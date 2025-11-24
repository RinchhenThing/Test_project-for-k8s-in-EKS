const button = document.getElementById('call');
const pre = document.getElementById('resp');
button.onclick = async () => {
  try {
    const res = await fetch('/api/hello');
    const text = await res.text();
    pre.textContent = text;
  } catch (e) {
    pre.textContent = 'Error: ' + e.message;
  }
};
