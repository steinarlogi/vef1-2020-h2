<<<<<<< HEAD
import "scripts.js";
import "video.js";
=======
import { createCategories } from './tools/scripts.js';

document.addEventListener('DOMContentLoaded', async () => {
  fetch('videos.json')
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('.loading-div').remove();
      createCategories(data)
    });
});
>>>>>>> 2d5cba123c1419c83a447d2862b23a0bc552d603
