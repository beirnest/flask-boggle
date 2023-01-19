
let score = 0;
let start = 60;
//handles click on submit to check word
$('#submit').on('click', function(evt) {
    evt.preventDefault()
    $guess = $('#guess').val();
    getResults();
})

$('#start').on('click', function(evt) {
    evt.preventDefault()
    setInterval(runTimer, 1000);
})

//send the request to the serve and get results. put results on page
async function getResults(){
    let response = await axios.get("/guess", { params: {guess: $guess}})
    
    const results = response.data.results

    if (results === "not-word") {
        $('#results').text(`This is not a word`)
      } else if (results === "not-on-board") {
        $('#results').text(`This is not a word on the board.`);
      } else {
        $('#results').text(`You found a word.`);
        score += $guess.length
      }

      $('#results').append(` Score: ${score}`)
}

function runTimer(){
    if (start > 0){
        $('#timer').text(start)
        start--;
        console.log(start);
    }
    else if (start == 0) {
        $('#timer').text("Time's up!")
        $("form").hide();
        clearInterval;
    }

}