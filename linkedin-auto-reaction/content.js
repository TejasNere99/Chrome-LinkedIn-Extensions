function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeLikeHuman(element, text) {
    element.focus();
    for (let char of text) {

        element.dispatchEvent(new InputEvent("beforeinput", {
            data: char,
            inputType: "insertText",
            bubbles: true
        }));

        element.textContent += char;

        element.dispatchEvent(new InputEvent("input", {
            data: char,
            inputType: "insertText",
            bubbles: true
        }));

        await sleep(80);
    }
}


async function autoLikeAndComment(likeCount, commentCount) {
    let liked = 0;
    let commented = 0;

    while (liked < likeCount || commented < commentCount) {

        window.scrollBy(0, 600);
        await sleep(2000);

        const posts = document.querySelectorAll("div.feed-shared-update-v2");

        for (let post of posts) {

            // LIKE
            if (liked < likeCount) {
                let likeBtn = post.querySelector('button[aria-label*="Like"]');
                if (likeBtn) {
                    likeBtn.click();
                    liked++;
                    post.style.border = "3px solid green";
                    console.log("Liked:", liked);
                    await sleep(1500);
                }
            }

            // COMMENT
            if (commented < commentCount) {

                let commentBtn = post.querySelector('button[aria-label*="Comment"]');
                if (commentBtn) {

                    commentBtn.click();
                    await sleep(800);

                    let commentBox = post.querySelector("div[role='textbox']");
                    if (!commentBox) continue;

                    await typeLikeHuman(commentBox, "CFBR");
                    await sleep(600);

                    // ⭐⭐ FINAL CORRECT SELECTOR FOR YOUR UI ⭐⭐
                    let submitBtn = document.querySelector("button.comments-comment-box__submit-button--cr");

                    let tries = 0;
                    while (!submitBtn && tries < 15) {
                        await sleep(300);
                        submitBtn = document.querySelector("button.comments-comment-box__submit-button--cr");
                        tries++;
                    }

                    if (submitBtn) {
                        submitBtn.click();
                        commented++;
                        post.style.border = "3px solid orange";
                        console.log("Commented:", commented);
                        await sleep(1500);
                    }
                }
            }




            if (liked >= likeCount && commented >= commentCount) break;
        }
    }

    alert("DONE ✔");
}

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "START") {
        autoLikeAndComment(msg.likeCount, msg.commentCount);
    }
});
