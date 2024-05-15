(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  let currentVideoBookmarks = [];


  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    }
  });

  const fetchBokkmarks = () => {
    return new Promise((resolve)=>{
        chrome.storage.sync.get([currentVideo],(obj)=>{
            resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : [])
        })
    })
  }

  const newVideoLoaded = () => {
    const bookmarkBtnExists = document.getElementById("bookmark-btn")[0];

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");

      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
      bookmarkBtn.className = "ytp-button" + "bookmark-btn";
      bookmarkBtn.title = "Click to bookmark current time";

      youtubeLeftControls =
        document.getElementsByClassName("ytp-left-controls")[0];
      youtubePlayer = document.getElementsByClassName("video-stream")[0];

      youtubeLeftControls.appendChild(bookmarkBtn);
      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    }
  };

  const addNewBookmarkEventHandler = () => {
    const currentTime = youtubePlayer.currentTime;
    const newBookmark = {
        time: currentTime,
        desc: "Bookmark at" + getTime(currentTime),
    };
    chrome.storage.sync.set({
        [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time),
    });
  }
})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(t);

    return date.toISOString().substr(11, 8);
}
