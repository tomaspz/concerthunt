

$(document).ready(function() {
  
  // PSEUDO CODE IN UPPERCASE

  // API KEYS 
  const bandsAPIKey = "7a94704114b40126fda0059aab05bb1c";
  const lastFmAPIKey = "f73c832fa45f573c5aa8ef6885d8fab3";
  // const ticketMasterAPIKey = "hvcJpMt4CeVA97EXwALG5lD3bBuXothl";
  // const ipgeolocationAPIKey = "bd316cf32a0e4bf19dbfc6673884261e";


  // GET THE CITY OF THE VISITOR
 
  // function handleResponse(response) {
  //   // console.log(response);
  //   var userCity = response.city;
  //   // console.log(userCity);
    
  //   // var cityEvents = cityMusicEventsTM(userCity);
  //   // console.log(cityEvents);
  //   // console.log(cityEvents._embedded.events);

  //   // var cityEvents = cityMusicEventsTM(userCity).then(function(eventsResponse){
  //   //   return eventsResponse;
  //   // })
  //   // console.log(cityEvents);
    
  // }
  // _ipgeolocation.getGeolocation(handleResponse, ipgeolocationAPIKey);
 

  // GET B-I-T CONCERTS RESPONSE FOR THE VISITOR'S CITY 


  // CREATE 12 CARDS DYNAMICALLY FOR EACH CONCERT


  // ADD THE NECESSARY CONTENT ON EACH CARD


  // APPEND THE CARDS TO THE $("#cards-group")



  // getTopArtistsLFM().then(function(response){
  //   var topArtists = response.artists.artist;
  //   console.log(topArtists);
  //   var namesArray = [];
  //   for(var i=0; i<topArtists.length ; i++){
  //     var cardEl = createCardTopArtists(topArtists[i]);
  //     var artistName = topArtists[i].name;
  //     namesArray.push(artistName);
  //     var image = artistQueryBIT(namesArray[i].image);
  //     console.log(artistName);

  //     // console.log(topArtists[i].image);
  //     $("#cards-group").append(cardEl);

  //   }
  // });

  // getArtistInfo(artist).then(function (response) {
  //   var artistInfo = response;
  //   console.log(response);
  // })

  

  // create card for top artist on page load
  // function createCardTopArtists(artist) {
  //   return `<div class="cell"><img class="thumbnail" src="${artist.image[4][`#text`]}"/><h5 class="artist-name">${artist.name}</h5></div>`
  // }

  function artistQueryLFM(artist) {

    var queryLastFMURL =
      "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artist + "&api_key=" + lastFmAPIKey + "&format=json";

    return $.ajax({
      url: queryLastFMURL,
      method: "GET"
    }).then(function(lastResponse) {
      return lastResponse;
    });
  }

  function getTopArtistsLFM() {
    var queryTopURL = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=12&api_key= f73c832fa45f573c5aa8ef6885d8fab3&format=json";

    return $.ajax({
      url: queryTopURL,
      method: "GET"
    })
  }

  function getArtistInfo(artist){
    var queryTopURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key= f73c832fa45f573c5aa8ef6885d8fab3&format=json";

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

  // CREATE A FUNCTION TO QUERY B-I-T CONCERTS BY CITY
  // Search for music events by city name https://api.songkick.com/api/3.0/search/locations.json?query=Atlanta&apikey={your_api_key}

  // Search for music events in the Los Angeles area 
  // https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=Atlanta&apikey={apikey}

  // https://app.ticketmaster.com/discovery/v2/events?apikey=hvcJpMt4CeVA97EXwALG5lD3bBuXothl&keyword=music&city=Atlanta=*

  function cityMusicEventsTM(city){

    var queryEventsURL =
      "https://app.ticketmaster.com/discovery/v2/events?apikey="+ ticketMasterAPIKey +"&keyword=music&city="+ city +"=*";

    return $.ajax({
      url: queryEventsURL,
      method: "GET"
    }).then(function(eventsResponse) {
      return eventsResponse;
    });

  }

  // CREATE A FUNCTION TO QUERY B-I-T CONCERTS BY ARTIST

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

  // EVENT LISTENER ON THE SEARCH BUTTON
  $("#searchBtn").on("click", function(event) {

    event.preventDefault();

    // get artist name from input field
    var artist = $("#inputSearch").val();
    // console.log(artist);

    artistQueryBIT(artist).then(function(artistResponseBIT){
      var artistCard = createCard(artistResponseBIT);
      $("#cards-group").prepend(artistCard);
    });

    artistQueryLFM(artist).then(function(artistResponseLFM){
      console.log(artistResponseLFM);
    });

    concertQueryBIT(artist).then(function(concertResponseBIT){
      console.log(concertResponseBIT);
    });

   
    




  });
});
