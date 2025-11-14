// background service worker (manifest v3)
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'openProfiles') {
    const links = msg.links;
    (async () => {
      for (const url of links) {
        // create tab and wait for it to load fully before messaging content script
        const tab = await chrome.tabs.create({ url, active: true });
        // wait for the tab to finish loading
        await waitForTabComplete(tab.id);
        // inject/signal content script to scrape and post
        chrome.tabs.sendMessage(tab.id, { action: 'scrapeAndPost', sourceUrl: url });
        // optional: keep tab open for visual; close after a delay
        await sleep(3000);
        // close tab to avoid clutter
        chrome.tabs.remove(tab.id);
        await sleep(500); // small gap
      }
      // notify popup (if open)
      console.log('All done');
    })();
  }
});

function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

function waitForTabComplete(tabId, timeout = 15000){
  return new Promise((resolve) => {
    const start = Date.now();
    const check = async () => {
      try {
        const tab = await chrome.tabs.get(tabId);
        if (tab.status === 'complete' || Date.now() - start > timeout) return resolve();
        setTimeout(check, 300);
      } catch (e) { resolve(); }
    };
    check();
  });
}
