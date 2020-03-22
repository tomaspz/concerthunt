$(document).ready(function() {
  // var namesArray = [];
  // var imageArray = [];

  // bandsintown API Key
  const bandsAPIKey = "7a94704114b40126fda0059aab05bb1c";
  // lastFM API Key
  const lastFmAPIKey = "f73c832fa45f573c5aa8ef6885d8fab3";

  getTopArtists().then(function(response) {
    var topArtists = response.artists.artist;
    console.log(response);

    var articleTitle = $(
      "<article class='grid-container' id='artist-search'><h2 class='main-title'><strong>Top Artists</strong></h2><div id='cards-group' class='grid-x grid-margin-x small-up-2 medium-up-3 large-up-4'></div></article>"
    );

    $("main").append(articleTitle);
    for (var i = 0; i < topArtists.length; i++) {
      var artist = topArtists[i].name;
      // namesArray.push(artist);
      getArtistImage(artist).then(function(response) {
        var image = response.thumb_url;
        var name = response.name;
        // imageArray.push(response.thumb_url);
        var cardEl = createCardTopArtists(name, image);
        $("#cards-group").append(cardEl);
      });
    }
  });

  // create card for top artist on page load
  function createCardTopArtists(artist, image) {
    return `<div class="cell"><img class="thumbnail" src="${image}"/><h5 class="artist-name">${artist}</h5></div>`;
  }

  function createArtistInfoLFMEl(obj) {
    return ` <article class="grid-container" id="artist-details">
    <div class="grid-x grid-margin-x">
      <div class="medium-6 cell" id="artist-images">
        <img id="artist-650" class="thumbnail" src="" alt="${obj.artist.name}"/>
        <div class="grid-x grid-padding-x small-up-4">
          <div class="cell">
            <img id="album1" alt="artist album cover 1"/>
          </div>
          <div class="cell">
            <img id="album2" alt="artist album cover 2"/>
          </div>
          <div class="cell">
            <img id="album3" alt="artist album cover 3" />
          </div>
          <div class="cell">
            <img id="album4" alt="artist album cover 4" />
          </div>
        </div>
      </div>

      <div class="medium-6 large-5 cell large-offset-1">
        <h2>${obj.artist.name}</h2>
        <p id="artist-genre">Genre: ${obj.artist.tags.tag[0].name}</p>  
        <p id="artist-info">${obj.artist.bio.summary}</p>

        <a href="#" class="button large expanded">ConcertHunt</a>

        <div class="small secondary expanded button-group">
          <a class="button" id="facebook-button">Facebook</a>
          <a class="button" id="twitter-button">Twitter</a>
          <a class="button" id="yo-button">Yo</a>
        </div>
      </div>
    </div>

    <div class="tabs-section">
      <hr />
        <div
          class="tabs-panel is-active"
          id="artist-concerts"
          role="concert-panel"
          aria-labelledby="panel2-label"
          aria-hidden="true"
        >
          <h2>Concerts</h2>

          <hr>

          <div class="concert-info">

          <div class="media-object stack-for-small">
            <div class="media-object-section">
              <h5 id="date-time1"></h5>
              <p id="venue1"></p>
              <a id="button1" class="button">Buy Tickets</a>
            </div>
          </div>

          <hr>

          <div class="media-object stack-for-small">
            <div class="media-object-section">
              <h5 id="date-time2"></h5>
              <p id="venue2"></p>
              <a id="button2" class="button">Buy Tickets</a>
            </div>
          </div>

          <hr>

          <div class="media-object stack-for-small">
            <div class="media-object-section">
              <h5 id="date-time3"></h5>
              <p id="venue3"></p>
              <a id="button3" class="button">Buy Tickets</a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>

    <hr />
  </article>`;
  }

  // function artistQueryLastFM(artist) {
  //   var queryLastFMURL =
  //     "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" +
  //     artist +
  //     "&api_key=" +
  //     lastFmAPIKey +
  //     "&format=json";

  //   return $.ajax({
  //     url: queryLastFMURL,
  //     method: "GET"
  //   }).then(function(lastResponse) {
  //     return lastResponse;
  //   });
  // }

  function artistInfoQueryLFM(artist) {
    var queryLFM =
      "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
      artist +
      "&api_key=" +
      lastFmAPIKey +
      "&format=json";

    return $.ajax({
      url: queryLFM,
      method: "GET"
    });
  }

  function getTopArtists() {
    var queryTopLFM =
      "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=12&api_key=" +
      lastFmAPIKey +
      "&format=json";

    return $.ajax({
      url: queryTopLFM,
      method: "GET"
    });
  }

  //calling 'artist' to get the photo
  function getArtistImage(artist) {
    var queryImagesBIT =
      "https://rest.bandsintown.com/artists/" +
      artist +
      "?app_id=" +
      bandsAPIKey;

    return $.ajax({
      url: queryImagesBIT,
      method: "GET"
    });
  }

  //calling 'albums' to get the photo
  function getAlbumImagesLFM(artist) {
    var queryAlbumsLFM =
      "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" +
      artist +
      "&api_key=" +
      lastFmAPIKey +
      "&format=json";

    return $.ajax({
      url: queryAlbumsLFM,
      method: "GET"
    });
  }
  //calling concert + concertinfo
  function concertQueryBIT(artist) {
    var queryConcertBIT =
      "https://rest.bandsintown.com/artists/" +
      artist +
      "/events?app_id=" +
      bandsAPIKey;

    return $.ajax({
      url: queryConcertBIT,
      method: "GET"
    }).then(function(concertResponse) {
      return concertResponse;
    });
  }

  // EVENT LISTENER ON THE SEARCH BUTTON
  $("#searchBtn").on("click", function(event) {
    event.preventDefault();
    $("#content").empty();
    // get artist name from input field
    var artist = $("#inputSearch").val();
    // console.log(artist);

    // artistQueryBIT(artist).then(function(artistResponseBIT) {
    //   var artistCard = createArtistInfo(artistResponseBIT);
    //   $("#cards-group").prepend(artistCard);
    // });

    // artistQueryLastFM(artist).then(function(artistResponseLFM) {
    //   console.log(artistResponseLFM);
    // });

    artistInfoQueryLFM(artist).then(function(lastResponse) {
      var artistInfoElem = createArtistInfoLFMEl(lastResponse);

      getArtistImage(artist).then(function(response) {
        var image = response.thumb_url;
        $("#artist-650")
          .attr("src", image)
          .append(image);
        console.log(image);
        var name = response.name;
        console.log(name);
        // imageArray.push(response.thumb_url);
        // var cardEl = createCardTopArtists(name, image);
        // $("#cards-group").append(cardEl);
      });

      getAlbumImagesLFM(artist).then(function(resp) {
        console.log(resp);
        var images = [];
        for (var i = 0; i < 4; i++) {
          images.push(resp.topalbums.album[i].image[2][`#text`]);
          console.log(resp.topalbums.album[i].image[2][`#text`]);
          $("#album" + (i + 1))
            .attr("src", images[i])
            .append(images[i]);
          $("#album" + (i + 1)).wrap(
            $("<a>", {
              href: resp.topalbums.album[i].url
            })
          );
        }
      });

      // getAlbumImageLinkLFM(artist).then(function(albumResp) {
      //   $("#album-link" + (i + 1))
      //   .attr("href", link[i]);
      // })

      concertQueryBIT(artist).then(function(concertResponseBIT) {
        console.log(concertResponseBIT);
        var buyTickets = [];
        var dateArray = [];
        var venueNameArray = [];
        var venueCityArray = [];
        var venueCountryArray = [];

        for (var i = 0; i < 3; i++) {
          var concertDate = moment(concertResponseBIT[i].datetime).format(
            "dddd, MMMM Do, YYYY, h:mm a"
          );
          dateArray.push(concertDate);
          $("#date-time" + (i + 1)).append(dateArray[i]);

          venueNameArray.push(concertResponseBIT[i].venue.name);
          venueCityArray.push(concertResponseBIT[i].venue.city);
          venueCountryArray.push(concertResponseBIT[i].venue.country);
          $("#venue" + (i + 1)).append("Venue: " + venueNameArray[i] + " - ");
          $("#venue" + (i + 1)).append(venueCityArray[i] + ", ");
          $("#venue" + (i + 1)).append(venueCountryArray[i] + ".");

          buyTickets.push(concertResponseBIT[i].offers[0].url);
          $("#button" + (i + 1)).attr("href", buyTickets[i]);
        }
      });
      // console.log("artistInfoElem: " + artistInfoElem)
      $("#content").append(artistInfoElem);
      // console.log(lastResponse);
    });
  });
});
