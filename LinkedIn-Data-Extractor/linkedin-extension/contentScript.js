chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'scrapeAndPost') {
    try {
      const url = window.location.href;

      // --- Scraping logic ---
      const nameEl = document.querySelector('h1');
      const locationEl = document.querySelector('.text-body-small.inline.t-black--light.break-words');
      const aboutEl = document.querySelector('#about .pv-shared-text-with-see-more span');
      const headlineEl = document.querySelector('.text-body-medium.break-words');
      const followerEl = Array.from(document.querySelectorAll('span')).find(s => /followers/i.test(s.innerText));
      const connectionEl = Array.from(document.querySelectorAll('span')).find(s => /connections/i.test(s.innerText));

      // --- Data mapping ---
      const data = {
        name: nameEl ? nameEl.innerText.trim() : "",
        location: locationEl ? locationEl.innerText.trim() : "",
        about: aboutEl ? aboutEl.innerText.trim() : "",
        bio: headlineEl ? headlineEl.innerText.trim() : "",
        followerCount: followerEl ? followerEl.innerText.trim() : "",
        connectionCount: connectionEl ? connectionEl.innerText.trim() : "",
        bioLine: headlineEl ? headlineEl.innerText.trim() : "",
        url
      };

      console.log("📦 Scraped Data:", data);

      // --- Post to your Express API ---
      const res = await fetch("http://localhost:3000/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      console.log("✅ Data posted successfully:", await res.json());
    } catch (err) {
      console.error("❌ Scrape error:", err);
    }
  }
});
