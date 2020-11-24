function createVideos(data, videos) {
  var allVideos = document.createElement("div");
  videos.forEach((element) => {
    //create single video section
    var videoSection = document.createElement("div");

    videoSection.className = "col-md-4 singleVideo";
    //title,description,duration,poster,video
    var video = data.videos.find((x) => x.id == element);

    //create poster

    var videoPoster = document.createElement("img");
    videoPoster.src = video.poster;
    videoSection.appendChild(videoPoster);

    //create duration.

    var videoDuration = document.createElement("span");
    var correctDurationMinutes = 0; //video.duration
    var correctDurationSeconds = 0;
    var videoDurationText = document.createTextNode(
      `${correctDurationMinutes} : ${correctDurationSeconds}`
    );
    videoDuration.appendChild(videoDurationText);
    videoSection.appendChild(videoDuration);

    var videoHeading = document.createElement("h3");
    var videoHeadingText = document.createTextNode(video.title);
    videoHeading.appendChild(videoHeadingText);

    videoSection.appendChild(videoHeading);

    allVideos.appendChild(videoSection);
  });
  return allVideos;
}

function createCategories(data) {
  var main = document.getElementById("main");
  data.categories.forEach((element) => {
    var categorySection = document.createElement("section");

    var categoryHeading = document.createElement("h2");
    categoryHeading.className = "CategoryTitle";
    var categoryHeadingText = document.createTextNode(element.title);
    categoryHeading.appendChild(categoryHeadingText);

    categorySection.appendChild(categoryHeading);
    categorySection.appendChild(createVideos(data, element.videos));

    main.appendChild(categorySection);
  });
}
document.addEventListener("DOMContentLoaded", async () => {
  fetch("videos.json")
    .then((response) => response.json())
    .then((data) => createCategories(data));
});
