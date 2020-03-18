// bandsintown API Key
const bandsAPIKey = "7a94704114b40126fda0059aab05bb1c";
// example artist
let artist = "Michael Jackson";

var queryBandsURL =
  "https://rest.bandsintown.com/artists/" + artist + "?app_id=" + bandsAPIKey;

$.ajax({
  url: queryBandsURL,
  method: "GET"
}).then(function (bandsResponse) {
    console.log(bandsResponse);
})
