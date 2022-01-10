const username = document.getElementById('username');
// Reference to saveScore Buttton
const saveScorebtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
//Getting the score from the localStorage
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;//setting a limit to the highscores stored in the system
//Set the score that is displayed in the last page as the recent Score
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
  //We have to give username.value instead of just username here
  saveScorebtn.disabled = !username.value;//Disable the SaveScoreBtn if there is no username
});

saveHighScore = (e) => {
  console.log("clicked the save button");
  e.preventDefault();

  //Creating the highScore main function
  const score = {
    score: Math.floor(Math.random() * 100),
    // score: mostRecentScore,
    name: username.value
  };
  highScores.push(score);

  // highScores.sort((a, b) =>{ return b.score - a.score});like map function
  highScores.sort((a, b) => b.score - a.score)//this is basically saying that if bscore is higher than ascore then put b before a
  // now the above expresion will give out a list of sorted array
  highScores.splice(5);//after index 5 start cutting off
  localStorage.setItem('highScores',JSON.stringify(highScores));
  window.location.assign('/Quiz App/');
};