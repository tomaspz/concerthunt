console.log("hello world");
//added document.ready function - Em
$(document).ready(function() {
  // bandsintown API Key
  const bandsAPIKey = "7a94704114b40126fda0059aab05bb1c";
  // example artist
  let artist = "T.I.";

  var queryBandsURL =
    "https://rest.bandsintown.com/artists/" + artist + "?app_id=" + bandsAPIKey;

  $.ajax({
    url: queryBandsURL,
    method: "GET"
  }).then(function(bandsResponse) {
    console.log(bandsResponse);
  });

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
});
