let search = document.querySelector('#search');
let submit = document.querySelector('#submit');
let container1 = document.querySelector('.container1');
let audio = document.querySelector(".audioplayer");
let input = document.querySelector("#input");



submit.addEventListener('click', function () {
  console.log("hi")
  container1.innerHTML = " "
  fetch(`https://itunes.apple.com/search?term==${input.value}&entity=song&attribute=songTerm`)
    .then(function (response) {
      if (response.status === 200) {
        console.log(response.status);

      }
      return response.json().then(function (data) {

        console.log("Here is the data:", data);

        for (let i = 0; i < data.results.length; i++) {

          container1.innerHTML += `<div class = "container2">
      <img class="cover" src = "${data.results[i].artworkUrl100.replace('100x100', '300x300')}"></img>
      <div>
        <div style="display: none" class = "preview"  >${data.results[i].previewUrl}</div>
        <div class = "artist">${data.results[i].artistName}</div>
        <div class = "song">${data.results[i].trackName}</div>
        </div>
      </div>`

          document.querySelector(".container1").addEventListener("click", function (event) {
            if (event.target && event.target.matches("div.container2 img")) {
              let parent = event.target.parentElement;
              audio.src = parent.getElementsByClassName("preview")[0].innerHTML;
              audio.play();
              let songDisplay = document.querySelector('#nowPlaying');
              let artist = parent.getElementsByClassName('artist')[0].innerHTML;
              let song = parent.getElementsByClassName('song')[0].innerHTML;
              songDisplay.innerHTML = `Listening to: ${artist} - ${song}`;
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
          });
        }
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
});