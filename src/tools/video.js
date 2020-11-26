function createDuration(duration) {
  var worker = parseInt(duration, 10);
  var hours = 0;
  var minutes = 0;
  var seconds = 0;

  while (worker >= 3600) {
    hours += 1;
    worker -= 3600;
  }

  while (worker >= 60) {
    minutes += 1;
    worker -= 60;
  }

  seconds = worker;
  return `${hours === 0 ? "" : hours > 9 ? hours + ":" : "0" + hours + ":"}${
    minutes === 0 ? "00" : minutes > 9 ? minutes : "0" + minutes
  }:${seconds > 9 ? seconds : "0" + seconds}`;
}

function createTitle(title) {
  var categoryHeading = document.createElement("h1");
  categoryHeading.className = "singleVideo__Title";
  var categoryHeadingText = document.createTextNode(title);
  categoryHeading.appendChild(categoryHeadingText);
  return categoryHeading;
}

// h2 - tengd myndbönd
function createRelatedVideos(data, singleVideo) {
  var allRelatedVideos = document.createElement("div");
  var videoRelatedHeading = document.createElement("h2");
  var videoRelatedHeadingText = document.createTextNode("Tengd myndbönd");
  videoRelatedHeading.appendChild(videoRelatedHeadingText);

  allRelatedVideos.appendChild(videoRelatedHeading);

  var videoRelatedVideos = document.createElement("div");
  data.videos
    .filter((x) => singleVideo.related.indexOf(x.id) > -1)
    .forEach((element) => {
      // related videos
      // link
      var videoRelated = document.createElement("a");
      videoRelated.href = `/videos.html?id=${element.id}`;
      // poster
      var videoRelatedImg = document.createElement("img");
      videoRelatedImg.src = element.poster;
      videoRelated.appendChild(videoRelatedImg);

      // duration
      var videoRelatedDuration = document.createElement("span");
      var videoRelatedDurationText = document.createTextNode(
        createDuration(element.duration)
      );
      videoRelatedDuration.appendChild(videoRelatedDurationText);
      videoRelated.appendChild(videoRelatedDuration);

      // titill
      var videoRelatedText = document.createElement("h3");
      var videoRelatedTextNode = document.createTextNode(element.title);
      videoRelatedText.appendChild(videoRelatedTextNode);
      videoRelated.appendChild(videoRelatedText);

      // created

      videoRelatedVideos.appendChild(videoRelated);
    });
  allRelatedVideos.appendChild(videoRelatedVideos);
  return allRelatedVideos;
}

function makeVideoPage(data) {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  var main = document.getElementById("main");
  if (idParam !== null) {
    var singleVideo = data.videos.find((x) => x.id == parseInt(idParam, 10));

    //hér smíðum við page

    //title
    main.appendChild(createTitle(singleVideo.title));

    //video
    let videoGridDiv = document.createElement("div");
    videoGridDiv.className = "playVideo grid";

    let videoRowDiv = document.createElement("div");
    videoRowDiv.className = "row";

    let videoDiv = document.createElement("div");
    videoDiv.className = "col col-12";
    var videoVideo = document.createElement("video");
    videoVideo.src = singleVideo.video;
    videoDiv.appendChild(videoVideo);
    videoRowDiv.appendChild(videoDiv);
    videoGridDiv.appendChild(videoRowDiv);

    // container around buttons

    var buttonContainer = document.createElement("div");
    buttonContainer.className = "button_container";

    // back

    var videoBackButton = document.createElement("button");
    var imageVideoBackButton = document.createElement("img");
    imageVideoBackButton.src = "../../img/back.svg";
    imageVideoBackButton.className = "image_button";
    videoBackButton.appendChild(imageVideoBackButton);
    buttonContainer.appendChild(videoBackButton);
    //videoGridDiv.appendChild(videoBackButton);

    // play - pause

    var videoPlayButton = document.createElement("button");
    var imageVideoPlayButton = document.createElement("img");
    imageVideoPlayButton.src = "../../img/play.svg";
    imageVideoPlayButton.className = "image_button";
    videoPlayButton.appendChild(imageVideoPlayButton);
    buttonContainer.appendChild(videoPlayButton);
    //videoGridDiv.appendChild(videoPlayButton);

    //switch between play and pause
    var hasPlayButtonBeenPressed = false;
    videoPlayButton.addEventListener("click", changeBackButton);
    function changeBackButton() {
      if (hasPlayButtonBeenPressed === false) {
        imageVideoPlayButton.src = "../../img/pause.svg";
        hasPlayButtonBeenPressed = true;
      } else {
        imageVideoPlayButton.src = "../../img/play.svg";
        hasPlayButtonBeenPressed = false;
      }
    }

    // mute - unmute

    var videoMuteButton = document.createElement("button");
    var imageVideoMuteButton = document.createElement("img");
    imageVideoMuteButton.src = "../../img/unmute.svg";
    imageVideoMuteButton.className = "image_button";
    videoMuteButton.appendChild(imageVideoMuteButton);
    buttonContainer.appendChild(videoMuteButton);
    //videoGridDiv.appendChild(videoMuteButton);

    //switch between mute and unmute
    var hasMuteButtonBeenPressed = false;
    videoMuteButton.addEventListener("click", changeMuteButton);
    function changeMuteButton() {
      if (hasMuteButtonBeenPressed === false) {
        imageVideoMuteButton.src = "../../img/mute.svg";
        hasMuteButtonBeenPressed = true;
      } else {
        imageVideoMuteButton.src = "../../img/unmute.svg";
        hasMuteButtonBeenPressed = false;
      }
    }

    // fullscreen

    var videoFullscreenButton = document.createElement("button");
    var imageVideoFullscreenButton = document.createElement("img");
    imageVideoFullscreenButton.src = "../../img/fullscreen.svg";
    imageVideoFullscreenButton.className = "image_button";
    videoFullscreenButton.appendChild(imageVideoFullscreenButton);
    buttonContainer.appendChild(videoFullscreenButton);
    //videoGridDiv.appendChild(videoFullscreenButton);

    // next

    var videoNextButton = document.createElement("button");
    var imageVideoNextButton = document.createElement("img");
    imageVideoNextButton.src = "../../img/next.svg";
    imageVideoNextButton.className = "image_button";
    videoNextButton.appendChild(imageVideoNextButton);
    buttonContainer.appendChild(videoNextButton);
    //videoGridDiv.appendChild(videoNextButton);

    // append button container to videoGridDiv
    videoGridDiv.appendChild(buttonContainer);

    // description
    var videoDescription = document.createElement("p");
    videoDescriptionText = document.createTextNode(singleVideo.description);
    videoGridDiv.appendChild(videoDescription);
    videoDescription.appendChild(videoDescriptionText);

    // related videos
    main.appendChild(createRelatedVideos(data, singleVideo));
  } else {
    main.appendChild(createTitle("EKKERT ID!!!"));
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  fetch("videos.json")
    .then((response) => response.json())
    .then((data) => makeVideoPage(data));
});
