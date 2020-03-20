console.log("hello world");
//added document.ready function - Em

$(document).ready(function() {
  // bandsintown API Key
  const bandsAPIKey = "7a94704114b40126fda0059aab05bb1c";
  const lastFmAPIKey = "f73c832fa45f573c5aa8ef6885d8fab3";

  // create card for searched artist
  function createCard(artist) {
    return `<div class='large-3 columns'><div class='card'><img class='card-img' src=${artist.image_url} alt='header' /><div class='card-info'><h1 class='card-title'>${artist.name}</h1><div class='card-icon'>${artist.icon}</div><p class='card-author'>${artist.genre}</p><p class='card-stats'>6 <img src="https://placehold.it/20" alt="hi" /> 6 <img src="https://placehold.it/20" alt="hi" /></p></div></div></div>`;
  }

  function artistQueryLastFM(artist) {
    var queryLastFMURL =
      "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" +
      artist +
      "&api_key=" +
      lastFmAPIKey +
      "&format=json";

    $.ajax({
      url: queryLastFMURL,
      method: "GET"
    }).then(function(lastResponse) {
      console.log(lastResponse);
    });
  }

  function artistQueryBIT(artist) {
    var queryBandsURL =
      "https://rest.bandsintown.com/artists/" +
      artist +
      "?app_id=" +
      bandsAPIKey;

    $.ajax({
      url: queryBandsURL,
      method: "GET"
    }).then(function(bandsResponse) {
      console.log(bandsResponse);
    });
  }

  function concertQueryBIT(artist) {
    var queryConcertURL =
      "https://rest.bandsintown.com/artists/" +
      artist +
      "/events?app_id=" +
      bandsAPIKey;

    $.ajax({
      url: queryConcertURL,
      method: "GET"
    }).then(function(concertResponse) {
      console.log(concertResponse);
    });
  }

  $("#searchBtn").on("click", function(event) {
    event.preventDefault();

    // get artist name from input field
    var artist = $("#inputSearch").val();
    console.log(artist);

    artistQueryBIT(artist);
    artistQueryLastFM(artist);
    concertQueryBIT(artist);
  });
});
