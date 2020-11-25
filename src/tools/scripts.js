export function createVideos(data, videos) {
  var allVideos = document.createElement('div');
  allVideos.className = 'Category__flex row';
  videos.forEach((element) => {
    //create single video section
    var videoSection = document.createElement("a");

    videoSection.className = 'col col-4 col-md-12 singleVideo';
    //title,description,duration,poster,video
    var video = data.videos.find((x) => x.id == element);
    videoSection.href = `/video.html?id=${video.id}`;
    //create poster

    var videoPoster = document.createElement('img');
    videoPoster.src = video.poster;
    var imgDiv = document.createElement('div');
    imgDiv.className = 'singleVideo__image';
    imgDiv.appendChild(videoPoster);
    videoSection.appendChild(imgDiv);

    //create duration.

    var videoDuration = document.createElement('span');
    var correctDurationMinutes = Math.floor(video.duration/60); //video.duration
    var correctDurationSeconds = Math.floor(video.duration - correctDurationMinutes * 60);
    correctDurationSeconds < 10 ? correctDurationSeconds = ('0' + correctDurationSeconds) : correctDurationSeconds = correctDurationSeconds;
    var videoDurationText = document.createTextNode(
      `${correctDurationMinutes} : ${correctDurationSeconds}`
    );
    videoDuration.appendChild(videoDurationText);
    imgDiv.appendChild(videoDuration);

    //create heading

    var videoHeading = document.createElement('h3');
    var videoHeadingText = document.createTextNode(video.title);
    videoHeading.appendChild(videoHeadingText);

    videoSection.appendChild(videoHeading);

    //create Created

    var videoCreated = document.createElement('span');
    var oldDate = new Date(video.created);
    var todayDate = new Date();

    const years = Math.floor((todayDate.getTime() - oldDate.getTime()) / (1000 * 3600 * 24 * 365));
    const months = Math.floor((todayDate.getTime() - oldDate.getTime()) / (1000 * 3600 * 24 * 30));
    const weeks = Math.floor((todayDate.getTime() - oldDate.getTime()) / (1000 * 3600 * 24 * 7));
    const day = Math.floor((todayDate.getTime() - oldDate.getTime()) / (1000 * 3600 * 24));
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


    var videoCreatedText = document.createTextNode(string);

    videoCreated.appendChild(videoCreatedText);
    videoSection.appendChild(videoCreated);

    allVideos.appendChild(videoSection);
  });
  return allVideos;
}

export function createCategories(data) {
  var main = document.getElementById('main');
  main.className = 'grid';
  data.categories.forEach((element) => {
    var categorySection = document.createElement('section');
    categorySection.className = 'Category';
    var categoryHeading = document.createElement('h2');
    categoryHeading.className = 'Category__Title';
    var categoryHeadingText = document.createTextNode(element.title);
    categoryHeading.appendChild(categoryHeadingText);

    categorySection.appendChild(categoryHeading);
    categorySection.appendChild(createVideos(data, element.videos));

    const lineDiv = document.createElement('div');
    lineDiv.className = 'line-div'

    categorySection.appendChild(lineDiv);
    main.appendChild(categorySection);

  });
}
