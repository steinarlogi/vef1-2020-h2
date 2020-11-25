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
    var correctDurationMinutes = 0; //video.duration
    var correctDurationSeconds = 0;
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
    var oldDate = new Date(1604246400000);
    var todayDate = new Date();

    if ((oldDate - todayDate) / (1000 * 3600 * 24 * 365) > 1) {
      console.log('Fyrir meira en einu ári síðan');
    } else if (oldDate - todayDate / (1000 * 3600 * 24 * 30) > 1) {
      console.log('Fyrir meira en x mánuðum síðan');
    } else if (oldDate - todayDate / (1000 * 3600 * 24 * 7) > 1) {
      console.log('Fyrir meira en x vikum síðan');
    } else if (oldDate - todayDate / (1000 * 3600 * 24) > 1) {
      console.log('Fyrir x mörgum dögum síðan');
    } else if (oldDate - todayDate / (1000 * 3600) > 1) {
      console.log('Fyrir x mörgum klukkstund/klukkustundum síðan');
    }

    var videoCreatedText = document.createTextNode(`${todayDate}`);

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
