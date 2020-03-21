

$(document).ready(function() {
  
  getTopArtists().then(function(response){
    var topArtists = response.artists.artist;
    console.log(topArtists);
    var namesArray = [];
    for(var i=0; i<topArtists.length ; i++){
      var cardEl = createCardTopArtists(topArtists[i]);
      var artistName = topArtists[i].name;
      namesArray.push(artistName);
      var image = artistQueryBIT(namesArray[i]);
      console.log(artistName);

      // console.log(topArtists[i].image);
      $("#cards-group").append(cardEl);

    }
  });

  // getArtistInfo(artist).then(function (response) {
  //   var artistInfo = response;
  //   console.log(response);
  // })

  // bandsintown API Key
  const bandsAPIKey = "7a94704114b40126fda0059aab05bb1c";
  const lastFmAPIKey = "f73c832fa45f573c5aa8ef6885d8fab3";

  // create card for top artist on page load
  function createCardTopArtists(artist) {
    return `<div class="cell"><img class="thumbnail" src="${artist.image[4][`#text`]}"/><h5 class="artist-name">${artist.name}</h5></div>`
  }

  function artistQueryLastFM(artist) {

    var queryLastFMURL =
      "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artist + "&api_key=" + lastFmAPIKey + "&format=json";

    return $.ajax({
      url: queryLastFMURL,
      method: "GET"
    }).then(function(lastResponse) {
      return lastResponse;
    });
  }

  function getTopArtists() {
    var queryTopURL = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=12&api_key=f73c832fa45f573c5aa8ef6885d8fab3&format=json";

    return $.ajax({
      url: queryTopURL,
      method: "GET"
    })
  }

  function getArtistInfo(artist){
    var queryTopURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=f73c832fa45f573c5aa8ef6885d8fab3&format=json";

    return $.ajax({
      url: queryTopURL,
      method: "GET"
    })
  }

  function artistQueryBIT(artist) {

    var queryBandsURL =
      "https://rest.bandsintown.com/artists/" +
      artist +
      "?app_id=" +
      bandsAPIKey;

    return $.ajax({
      url: queryBandsURL,
      method: "GET"
    }).then(function(bandsResponse) {
      return bandsResponse;
    });
  }

  function concertQueryBIT(artist){
    var queryConcertURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=" +
    bandsAPIKey;

    return $.ajax({
      url: queryConcertURL,
      method: "GET"
    }).then(function(concertResponse) {
      return concertResponse;
    });
  }

  $("#searchBtn").on("click", function(event) {

    event.preventDefault();

    // get artist name from input field
    var artist = $("#inputSearch").val();
    // console.log(artist);

    artistQueryBIT(artist).then(function(artistResponseBIT){
      var artistCard = createCard(artistResponseBIT);
      $("#cards-group").prepend(artistCard);
    });

    artistQueryLastFM(artist).then(function(artistResponseLFM){
      console.log(artistResponseLFM);
    });

    concertQueryBIT(artist).then(function(concertResponseBIT){
      console.log(concertResponseBIT);
    });
  });
});
