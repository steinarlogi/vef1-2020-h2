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
    var videoVideo = document.createElement("video");
    videoVideo.src = singleVideo.video;
    main.appendChild(videoVideo);

    // back

    // play - pause

    // mute - unmute

    // fullscreen

    // next

    // description
    var videoDescription = document.createElement("p");
    videoDescriptionText = document.createTextNode(singleVideo.description);
    main.appendChild(videoDescription);
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
