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

  function createArtistInfoLFMEl(object) {
    return ` <article class="grid-container" id="artist-details">
    <div class="grid-x grid-margin-x">
      <div class="medium-6 cell">
        <img id="artist-650" class="thumbnail" src="" alt="${object.artist.name}"/>
        <div class="grid-x grid-padding-x small-up-4">
          <div class="cell">
            <img src="https://placehold.it/250x200" />
          </div>
          <div class="cell">
            <img src="https://placehold.it/250x200" />
          </div>
          <div class="cell">
            <img src="https://placehold.it/250x200" />
          </div>
          <div class="cell">
            <img src="https://placehold.it/250x200" />
          </div>
        </div>
      </div>

      <div class="medium-6 large-5 cell large-offset-1">
        <h3>${object.artist.name}</h3>
        <p id="artist-genre">Genre: ${object.artist.tags.tag[0].name}</p>  
        <p id="artist-info">${object.artist.bio.summary}</p>

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
      <ul
        class="tabs"
        data-tabs=""
        id="artist-tabs"
        role="tablist"
        data-e="kts49s-e"
      >
        <li class="tabs-title is-active" role="presentation">
          <a
            href="#review-panel"
            aria-selected="false"
            role="tab"
            aria-controls="panel1"
            id="review-panel-label"
            tabindex="0"
            >Reviews</a
          >
        </li>
        <li class="tabs-title" role="presentation">
          <a
            href="#concert-panel"
            role="tab"
            aria-controls="panel2"
            aria-selected="true"
            id="concert-panel-label"
            tabindex="-1"
            >Concerts</a
          >
        </li>
      </ul>
      <div class="tabs-content" data-tabs-content="tabs">
        <div
          class="tabs-panel"
          id="review-panel"
          role="tabpanel"
          aria-labelledby="panel1-label"
        >
          <h4>Reviews</h4>
          <div class="media-object stack-for-small">
            <div class="media-object-section">
              <img class="thumbnail" src="https://placehold.it/200x200" />
            </div>
            <div class="media-object-section">
              <h5>Artist Reviewer #1</h5>
              <p>
                I'm going to improvise. Listen, there's something you should
                know about me... about inception. An idea is like a virus,
                resilient, highly contagious. The smallest seed of an idea can
                grow. It can grow to define or destroy you.
              </p>
            </div>
          </div>
          <div class="media-object stack-for-small">
            <div class="media-object-section">
              <img class="thumbnail" src="https://placehold.it/200x200" />
            </div>
            <div class="media-object-section">
              <h5>Artist Reviewer #2</h5>
              <p>
                I'm going to improvise. Listen, there's something you should
                know about me... about inception. An idea is like a virus,
                resilient, highly contagious. The smallest seed of an idea can
                grow. It can grow to define or destroy you
              </p>
            </div>
          </div>
          <div class="media-object stack-for-small">
            <div class="media-object-section">
              <img class="thumbnail" src="https://placehold.it/200x200" />
            </div>
            <div class="media-object-section">
              <h5>Artist Reviewer #3</h5>
              <p>
                I'm going to improvise. Listen, there's something you should
                know about me... about inception. An idea is like a virus,
                resilient, highly contagious. The smallest seed of an idea can
                grow. It can grow to define or destroy you
              </p>
            </div>
          </div>
          <label>
            My Review
            <textarea placeholder="None"></textarea>
          </label>
          <button class="button">Submit Review</button>
        </div>
        <div
          class="tabs-panel is-active"
          id="panel2"
          role="concert-panel"
          aria-labelledby="panel2-label"
          aria-hidden="true"
        >
          <h4>Concerts</h4>
          <div class="media-object stack-for-small">
            <div class="media-object-section">
              <img class="thumbnail" src="https://placehold.it/200x200" />
            </div>
            <div class="media-object-section">
              <h5>Artist Concert #1</h5>
              <p>
                I'm going to improvise. Listen, there's something you should
                know about me... about inception. An idea is like a virus,
                resilient, highly contagious. The smallest seed of an idea can
                grow. It can grow to define or destroy you.
              </p>
            </div>
          </div>
          <div class="media-object stack-for-small">
            <div class="media-object-section">
              <img class="thumbnail" src="https://placehold.it/200x200" />
            </div>
            <div class="media-object-section">
              <h5>Artist Concert #2</h5>
              <p>
                I'm going to improvise. Listen, there's something you should
                know about me... about inception. An idea is like a virus,
                resilient, highly contagious. The smallest seed of an idea can
                grow. It can grow to define or destroy you
              </p>
            </div>
          </div>
          <div class="media-object stack-for-small">
            <div class="media-object-section">
              <img class="thumbnail" src="https://placehold.it/200x200" />
            </div>
            <div class="media-object-section">
              <h5>Artist Concert #3</h5>
              <p>
                I'm going to improvise. Listen, there's something you should
                know about me... about inception. An idea is like a virus,
                resilient, highly contagious. The smallest seed of an idea can
                grow. It can grow to define or destroy you
              </p>
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

    concertQueryBIT(artist).then(function(concertResponseBIT) {
      console.log(concertResponseBIT);
    });

    artistInfoQueryLFM(artist).then(function(lastResponse) {
      var artistInfoElem = createArtistInfoLFMEl(lastResponse);
      getArtistImage(artist).then(function(response) {
        var image = response.thumb_url;
        $("#artist-650").attr("src", image).append(image);
        console.log(image);
        var name = response.name;
        console.log(name);
        // imageArray.push(response.thumb_url);
        // var cardEl = createCardTopArtists(name, image);
        // $("#cards-group").append(cardEl);
      });
      // console.log("artistInfoElem: " + artistInfoElem)
      $("#content").append(artistInfoElem);
      // console.log(lastResponse);

       
    })
    
    
  });
});
