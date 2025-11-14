const likeInput = document.getElementById("likeCount");
const commentInput = document.getElementById("commentCount");
const startBtn = document.getElementById("startBtn");

function validate() {
    if (likeInput.value && commentInput.value) {
        startBtn.disabled = false;
        startBtn.classList.add("enabled");
    } else {
        startBtn.disabled = true;
        startBtn.classList.remove("enabled");
    }
}

likeInput.addEventListener("input", validate);
commentInput.addEventListener("input", validate);

startBtn.addEventListener("click", () => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

        // Check if user is already on LinkedIn Feed
        if (!tabs[0].url.includes("linkedin.com/feed")) {
            alert("Please open LinkedIn Feed first!");
            return;
        }

        chrome.tabs.sendMessage(tabs[0].id, {
            action: "START",
            likeCount: parseInt(likeInput.value),
            commentCount: parseInt(commentInput.value)
        });

    });
});
