var state = {
  items: [],
  index: 0,
  ID: ""
}
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromAPI(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyCZCFLDSTF5Vx88pI9OIlmd78RyrSl2zZU',
    q: searchTerm,
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

//render fun.
function renderResult(result){
  return `
    <div class="js-search_result">
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank" ><img class="js-result_thumb" src="${result.snippet.thumbnails.medium.url}"></a>
      <br><h3>${result.snippet.title}</h3><a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank" >more from the channel</a>
      <hr>
    </div>
  `;
}

//callback fun.
function renderData(data){
  const results = data.items.map(function(item, index){
    return renderResult(item)
  });
  $(".js-results").html(results)
}

//event listen
function handleFormSubmit() {
$('#js-search_form').submit(function(event){
	event.preventDefault();
	const query = $(this).find("#js-search_entry").val();
  $(this).find("#js-search_entry").val("");
  getDataFromAPI(query, renderData)
  })
}

$(function() {
  handleFormSubmit();
})

//result.id.videoId

/*function getID(index){
  var index = state.items[index];
  var ID = index.id.videoId;
  state.ID = ID
  //$(".js-results").append(results)

  function handleThumbClick() {
  $('.js-results').on('click', '.js-result_thumb', function(event) {
    var index = $(this).closest('div').index();
    state.index = index;
    getID(index);
  })
}
}*/




