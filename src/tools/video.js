function createTitle(title) {
  var categoryHeading = document.createElement("h1");
  categoryHeading.className = "singleVideo__Title";
  var categoryHeadingText = document.createTextNode(title);
  categoryHeading.appendChild(categoryHeadingText);
  return categoryHeading;
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
    let videoGridDiv = document.createElement('div');
    videoGridDiv.className = 'playVideo grid';

    let videoRowDiv = document.createElement('div');
    videoRowDiv.className = 'row';

    let videoDiv = document.createElement('div');
    videoDiv.className = 'col col-12';
    var videoVideo = document.createElement("video");
    videoVideo.src = singleVideo.video;
    videoDiv.appendChild(videoVideo);
    videoRowDiv.appendChild(videoDiv);
    videoGridDiv.appendChild(videoRowDiv);

    // back

    // play - pause

    // mute - unmute

    // fullscreen

    // next

    // description
    var videoDescription = document.createElement("p");
    videoDescriptionText = document.createTextNode(singleVideo.description);
    videoGridDiv.appendChild(videoDescription);
    videoDescription.appendChild(videoDescriptionText);

    // h2 - tengd myndbönd
    var videoRelated = document.createElement("h2");
    videoRelatedText = document.createTextNode("Tengd myndbönd");
    videoGridDiv.appendChild(videoRelated);
    videoRelated.appendChild(videoRelatedText);

    // related videos

    var videoRelated = document.createElement("video");
    videoRelated.src = singleVideo.poster;
    videoGridDiv.appendChild(videoRelated);

    main.appendChild(videoGridDiv);
  } else {
    main.appendChild(createTitle("EKKERT ID!!!"));
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  fetch("videos.json")
    .then((response) => response.json())
    .then((data) => makeVideoPage(data));
});
