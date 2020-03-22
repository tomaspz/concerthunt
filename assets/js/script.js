$(document).ready(function () {




  // GET THE TOP ARTISTS RESPONSE FROM LAST FM
  getTopArtists().then(function (response) {
    // ARRAY OF 12 TOP ARTISTS
    var topArtists = response.artists.artist;

    // CREATE THE SECTION TITLE
    var articleTitle = $(
      "<article class='grid-container' id='artist-search'><h2 class='main-title'><strong>Top Artists</strong></h2><div id='cards-group' class='grid-x grid-margin-x small-up-2 medium-up-3 large-up-4'></div></article>"
    );

    // APPEND THE TITLE TO THE MAIN TAG
    $("main").append(articleTitle);

    // LOOP TROUGH THE TOP ARTISTS ARRAY
    for (var i = 0; i < topArtists.length; i++) {
      let artistName = topArtists[i].name;
      let artistURL = topArtists[i].url;

      // GET THE ARTIST NAME,IMAGE AND URL
      getArtistImage(artistName).then(function (imageResp) {
        let obj = {
          image: imageResp.thumb_url,
          name: imageResp.name,
        };

        // CREATE THE CARD FOR EACH ARTIST
        var cardEl = createCardTopArtists(obj.name, obj.image);

        // APPEND THE ARTIST CARD TO THE DOM
        $("#cards-group").append(cardEl);
      });
    }
  });

  // FUNCTION TO CREATE THE HTML ARTIST CARD
  function createCardTopArtists(artist, image) {
    return `<div class="cell" onclick="showTopAristInfo('${artist}');"><img class="thumbnail" src="${image}"/><h5 class="artist-name">${artist}</h5></a></div>`;
  }

  // EVENT LISTENER ON THE SEARCH BUTTON
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();

    // EMPTY THE PAGE CONTENT
    $("#content").empty();

    // GET THE ARTIST NAME FROM INPUT FIELD
    let artist = $("#inputSearch").val();

    // GET THE ARTIST INFO RESPONSE FROM LAST FM
    artistInfoQueryLFM(artist).then(function (lastResponse) {
      // CREATE THE ARTIST INFO HTML ELEMENT
      let artistInfoElem = createArtistInfoLFMEl(lastResponse);

      // GET ARTIST IMAGE FROM BANDSINTOWN
      getArtistImage(artist).then(function (response) {
        let image = response.thumb_url;
        let name = response.name;
        // ADD THE SOURCE ATTRIBUTE TO THE IMAGE AND APPEND IT TO THE DOM
        $("#artist-650")
          .attr("src", image)
          .append(image);
      });

      // GET ALBUM IMAGES FROM LAST FM, ADD IMAGES TO AN ARRAY AND APPEND THEM TO THE DOM WITH THE SOURCE ATTRIBUTE
      getAlbumImagesLFM(artist).then(function (resp) {
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

      // GET CONCERT INFORMATION FROM BANDSINTOWN
      concertQueryBIT(artist).then(function (concertResponseBIT) {
        let response = concertResponseBIT;
        console.log(response);
        let buyTickets = [];
        let dateArray = [];
        let venueNameArray = [];
        let venueCityArray = [];
        let venueCountryArray = [];

        $("#concerts").append(
          "Whoops! Looks liked there are no upcoming concerts for " + artist
        );
        for (var i = 0; i < 3; i++) {
          if (concertResponseBIT.length == 0) {
            $(".concert-info").empty();
          } else {
            $("#concerts").empty();
            $("#concerts").append("Concerts for " + artist);
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
        }
      });
      // console.log("artistInfoElem: " + artistInfoElem)
      $("#content").append(artistInfoElem);
      // console.log(lastResponse);
    });
  });
});


////////////////////////////////////////////////////////////////////////////////////////

const bandsAPIKey = "7a94704114b40126fda0059aab05bb1c";
const lastFmAPIKey = "f73c832fa45f573c5aa8ef6885d8fab3";


function showTopAristInfo(artist) {

  $("#content").empty();

  // GET THE ARTIST INFO RESPONSE FROM LAST FM
  artistInfoQueryLFM(artist).then(function (lastResponse) {
    // CREATE THE ARTIST INFO HTML ELEMENT
    let artistInfoElem = createArtistInfoLFMEl(lastResponse);

    // GET ARTIST IMAGE FROM BANDSINTOWN
    getArtistImage(artist).then(function (response) {
      let image = response.thumb_url;
      let name = response.name;
      // ADD THE SOURCE ATTRIBUTE TO THE IMAGE AND APPEND IT TO THE DOM
      $("#artist-650")
        .attr("src", image)
        .append(image);
    });

    // GET ALBUM IMAGES FROM LAST FM, ADD IMAGES TO AN ARRAY AND APPEND THEM TO THE DOM WITH THE SOURCE ATTRIBUTE
    getAlbumImagesLFM(artist).then(function (resp) {
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

    // GET CONCERT INFORMATION FROM BANDSINTOWN
    concertQueryBIT(artist).then(function (concertResponseBIT) {

      console.log(concertResponseBIT);
      let buyTickets = [];
      let dateArray = [];
      let venueNameArray = [];
      let venueCityArray = [];
      let venueCountryArray = [];

      if (concertResponseBIT.length === 0) {
        $("#concerts").empty();
        $("#concerts").append(
          "Whoops! Looks liked there are no upcoming concerts for " + artist
        );
      }
      else {
        $("#concerts").empty();
        $("#concerts").append("Concerts for " + artist);

        for (var i = 0; i < concertResponseBIT.length; i++) {
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

      }
    }); // END OF CONCERT QUERY BIT

    // console.log("artistInfoElem: " + artistInfoElem)
    $("#content").append(artistInfoElem);
    // console.log(lastResponse);
  });
}; // END OF FUNCTION SHOW TOP ARTIST INFO



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// FUNCTION TO CREATE THE HTML ARTIST INFO PAGE
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
        <h2 id="concerts"></h2>

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

// FUNCTION TO QUERY ARTIST INFO FROM LAST FM
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

// FUNCTION TO QUERY TOP ARTISTS FROM LAST FM
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

// FUNCTION TO QUERY ARTIST IMAGES FROM BANDSINTOWN
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

// FUNCTION TO QUERY ALBUM INFO FROM LAST FM
function getAlbumImagesLFM(artist) {
  var queryAlbumsLFM =
    "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" +
    artist +
    "&api_key=" +
    lastFmAPIKey +
    "&format=json";

  return $.ajax({
    url: queryAlbumsLFM,
    method: "GET"
  });
}

// FUNCTION TO QUERY CONCERT INFO FROM BANDSINTOWN
function concertQueryBIT(artist) {
  var queryConcertBIT =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=" +
    bandsAPIKey;

  return $.ajax({
    url: queryConcertBIT,
    method: "GET"
  }).then(function (concertResponse) {
    return concertResponse;
  });
}