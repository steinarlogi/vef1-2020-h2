function createTitle(title) {
  var categoryHeading = document.createElement("h1");
  categoryHeading.className = "singleVideo__Title";
  var categoryHeadingText = document.createTextNode(title);
  categoryHeading.appendChild(categoryHeadingText);
  return categoryHeading;
}

function makeRelatedVideosSection(id, data) {
  let sec = document.createElement('section');
  sec.className = 'Category';

  sec.innerHtml = '<h2 class="Category__Title">Nýleg myndbönd</h2>';

  let cDiv = document.createElement('div');
  cDiv.className = 'Category__flex row';

  let nowPlaying = data.videos.find((x) => x.id == id);

  nowPlaying.related.forEach((x) => {

    let a = document.createElement('a');
    a.className = 'col col-4 col-md-12 singleVideo';
    a.href = '/video.html?id=' + x.id;

    let singleVideoDiv = document.createElement('div');
    singleVideoDiv.className = 'singleVideo__image';

    let img = document.createElement('img');
    img.src = x.poster;

    let videoDuration = document.createElement('span');
    let correctDurationMinutes = Math.floor(x.duration/60); //video.duration
    let correctDurationSeconds = Math.floor(x.duration - correctDurationMinutes * 60);
    correctDurationSeconds < 10 ? correctDurationSeconds = ('0' + correctDurationSeconds) : correctDurationSeconds = correctDurationSeconds;
    let videoDurationText = document.createTextNode(
      `${correctDurationMinutes} : ${correctDurationSeconds}`
    );

    singleVideoDiv.appendChild(img);
    singleVideoDiv.appendChild(videoDuration);

    a.appendChild(singleVideoDiv);

    let heading = document.createElement('h3');
    heading.innerHtml = x.title;

    let created = document.createElement('span');
    var oldDate = new Date(x.created);
    var todayDate = new Date();

    const years = Math.floor((todayDate.getTime() - oldDate.getTime()) / (1000 * 3600 * 24 * 365));
    const months = Math.floor((todayDate.getTime() - oldDate.getTime()) / (1000 * 3600 * 24 * 30));
    const weeks = Math.floor((todayDate.getTime() - oldDate.getTime()) / (1000 * 3600 * 24 * 7));
    const days = Math.floor((todayDate.getTime() - oldDate.getTime()) / (1000 * 3600 * 24));
    const hours = Math.floor((todayDate.getTime() - oldDate.getTime())/ (1000 * 3600));
    let string = "";

    if (years >= 1) {

      years > 1 ?
      string = `Fyrir ${years} árum síðan`
      :
      string = `Fyrir ${years} ári síðan`;

    } else if (months >= 1) {

      months > 1 ?
      string = `Fyrir ${months} mánuðum síðan`
      :
      string = `Fyrir ${months} mánuði síðan`;

    } else if (weeks >= 1) {

      weeks > 1 ?
      string = `Fyrir ${weeks} vikum síðan`
      :
      string = `Fyrir ${weeks} viku síðan`;

    } else if (days >= 1) {

      days > 1 ?
      string = `Fyrir ${days} dögum síðan`
      :
      string = `Fyrir ${days} degi síðan`;

    } else if (hours >= 1) {

      hours > 1 ?
      string = `Fyrir ${hours} klukkustundum síðan`
      :
      string = `Fyrir ${hours} klukkustund síðan`;
    } else {
      string = `Fyrir minna en 1 klukkustund síðan`;
    }

    created.innerHtml = string;

    a.appendChild(heading);
    a.appendChild(created);

    cDiv.appendChild(a);
  });

  sec.appendChild(cDiv);
  const lineDiv = document.createElement('div');
  lineDiv.className = 'line-div'
  sec.appendChild(lineDiv);
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

    // container around buttons

    var buttonContainer = document.createElement("div");
    buttonContainer.className = "row button_container";

    // back

    var videoBackButton = document.createElement("button");
    var imageVideoBackButton = document.createElement("img");
    imageVideoBackButton.src = "../../img/back.svg";
    imageVideoBackButton.className = "image_button";
    videoBackButton.appendChild(imageVideoBackButton);
    buttonContainer.appendChild(videoBackButton)
    //videoGridDiv.appendChild(videoBackButton);

    // play - pause

    var videoPlayButton = document.createElement("button");
    var imageVideoPlayButton = document.createElement("img");
    imageVideoPlayButton.src = "../../img/play.svg";
    imageVideoPlayButton.className = "image_button";
    videoPlayButton.appendChild(imageVideoPlayButton);
    buttonContainer.appendChild(videoPlayButton)
    //videoGridDiv.appendChild(videoPlayButton);

    //switch between play and pause
    var hasPlayButtonBeenPressed = false;
    videoPlayButton.addEventListener("click",changeBackButton);
    function changeBackButton(){
      if(hasPlayButtonBeenPressed === false){
        imageVideoPlayButton.src = "../../img/pause.svg";
        hasPlayButtonBeenPressed = true;
      }
      else{
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
    buttonContainer.appendChild(videoMuteButton)
    //videoGridDiv.appendChild(videoMuteButton);

    //switch between mute and unmute
    var hasMuteButtonBeenPressed = false;
    videoMuteButton.addEventListener("click",changeMuteButton);
    function changeMuteButton(){
      if(hasMuteButtonBeenPressed === false){
        imageVideoMuteButton.src = "../../img/mute.svg";
        hasMuteButtonBeenPressed = true;
      }
      else{
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
    buttonContainer.appendChild(videoFullscreenButton)
    //videoGridDiv.appendChild(videoFullscreenButton);

    // next

    var videoNextButton = document.createElement("button");
    var imageVideoNextButton = document.createElement("img");
    imageVideoNextButton.src = "../../img/next.svg";
    imageVideoNextButton.className = "image_button";
    videoNextButton.appendChild(imageVideoNextButton);
    buttonContainer.appendChild(videoNextButton)
    //videoGridDiv.appendChild(videoNextButton);

    // append button container to videoGridDiv
    videoGridDiv.appendChild(buttonContainer);

    // description
    var videoDescription = document.createElement("p");
    videoDescriptionText = document.createTextNode(singleVideo.description);
    videoGridDiv.appendChild(videoDescription);
    videoDescription.appendChild(videoDescriptionText);

    //tengd myndbönd
    let relVideos = makeRelatedVideosSection(parseInt(idParam), data);
    //videoGridDiv.appendChild(relVideos, data);

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
