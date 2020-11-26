function createCreatedDate(created) {
  var videoCreated = document.createElement("span");
  var oldDate = new Date(created);
  var todayDate = new Date();
  var text = "";
  var diffTime = Math.abs(oldDate - todayDate);
  if (Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365)) >= 1) {
    var value = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    if (value === 1) {
      text = `Fyrir 1 ári síðan`;
    } else {
      text = `Fyrir ${value} árum síðan`;
    }
  } else if (Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30)) >= 1) {
    var value = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
    if (value === 1) {
      text = `Fyrir 1 mánuði síðan`;
    } else {
      text = `Fyrir ${value} mánuðum síðan`;
    }
  } else if (Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)) >= 1) {
    var value = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    if (value === 1) {
      text = `Fyrir 1 viku síðan`;
    } else {
      text = `Fyrir ${value} vikum síðan`;
    }
  } else if (Math.floor(diffTime / (1000 * 60 * 60 * 24)) >= 1) {
    var value = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (value === 1) {
      text = `Fyrir 1 degi síðan`;
    } else {
      text = `Fyrir ${value} dögum síðan`;
    }
  } else if (Math.floor(diffTime / (1000 * 60 * 60)) >= 1) {
    var value = Math.floor(diffTime / (1000 * 60 * 60));
    if (value === 1) {
      text = `Fyrir 1 klukkustund síðan`;
    } else {
      text = `Fyrir ${value} klukkustundum síðan`;
    }
  }

  var videoCreatedText = document.createTextNode(text);
  videoCreated.appendChild(videoCreatedText);

  return videoCreated;
}

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

function createVideos(data, videos) {
  var allVideos = document.createElement("div");
  allVideos.className = "Category__flex row";
  videos.forEach((element) => {
    //create single video section
    var videoSection = document.createElement("a");

    videoSection.className = "col col-4 col-md-12 singleVideo";
    //title,description,duration,poster,video
    var video = data.videos.find((x) => x.id == element);
    videoSection.href = `/video.html?id=${video.id}`;
    //create poster

    var videoPoster = document.createElement("img");
    videoPoster.src = video.poster;
    var imgDiv = document.createElement("div");
    imgDiv.className = "singleVideo__image";
    imgDiv.appendChild(videoPoster);
    videoSection.appendChild(imgDiv);

    //create duration.

    var videoDuration = document.createElement("span");
    var videoDurationText = document.createTextNode(
      createDuration(video.duration)
    );
    videoDuration.appendChild(videoDurationText);
    imgDiv.appendChild(videoDuration);

    //create heading

    var videoHeading = document.createElement("h3");
    var videoHeadingText = document.createTextNode(video.title);
    videoHeading.appendChild(videoHeadingText);

    videoSection.appendChild(videoHeading);

    //create Created
    allVideos.appendChild(createCreatedDate(video.created));

    allVideos.appendChild(videoSection);
  });
  return allVideos;
}

export function createCategories(data) {
  var main = document.getElementById("main");
  main.className = "grid";
  data.categories.forEach((element) => {
    var categorySection = document.createElement("section");
    categorySection.className = "Category";
    var categoryHeading = document.createElement("h2");
    categoryHeading.className = "Category__Title";
    var categoryHeadingText = document.createTextNode(element.title);
    categoryHeading.appendChild(categoryHeadingText);

    categorySection.appendChild(categoryHeading);
    categorySection.appendChild(createVideos(data, element.videos));

    const lineDiv = document.createElement("div");
    lineDiv.className = "line-div";

    categorySection.appendChild(lineDiv);
    main.appendChild(categorySection);
  });
}
