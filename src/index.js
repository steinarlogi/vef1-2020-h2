import { createCategories } from "./tools/scripts.js";

document.addEventListener("DOMContentLoaded", async () => {
  fetch("videos.json")
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".loading-div").remove();
      createCategories(data);
    });
});
