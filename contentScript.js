(() => {
  let youtubeLeftControls, youtubePlayer;

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === 'NEW'){
        currentVideo = videoId;
        newVideoLoaded();
    }
  });

  const newVideoLoaded = () => {
    const bookmarkBtnExists = document.getElementById('bookmark-btn')[0];
    
  }
})();
