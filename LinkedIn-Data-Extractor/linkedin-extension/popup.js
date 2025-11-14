document.getElementById('start').addEventListener('click', async () => {
  const raw = document.getElementById('links').value.trim();
  const links = raw.split('\n').map(s => s.trim()).filter(Boolean);
  if (links.length < 3) return alert('Please provide at least 3 links.');
  // Send to background to handle sequential opening
  chrome.runtime.sendMessage({ action: 'openProfiles', links });
  document.getElementById('status').innerText = `Queued ${links.length} profiles...`;
});
