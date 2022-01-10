//NOTE : ALWAYS USE [] TO GET A VALUE FROM THE ARRAY DONT EVER USE () OR {} FOR GETTING A VALUE OUT OF AN ARRAY OR U WILL GET THE ERROR AS "THIS IS NOT A FUNCTION ETC"
//Targeting the question
const question = document.getElementById("question");
//to turn the data into an array we use Array.from
const choices = Array.from(document.getElementsByClassName("choice-text"));
//To update the question number target the id of the question number
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
//To update the score 
const scoreText = document.getElementById('score');

let currentQues = {};
let acceptingAns = false;
let score = 0;
let questionCounter = 0;
let availableQues = [];

let ques = [
  {
    question: "What is the full form of HTML?",
    choice1: "Hello to my land",
    choice2: "Hey Text Markup language",
    choice3: "HyperLink Markup Language",
    choice4: "HyperText Markup Language",
    answer: 4 //this the the index of the right answer
  }, {
    question: "What is the full form of HTTP?",
    choice1: "Hypertext Transfer Product",
    choice2: "Hypertext Test Protocol",
    choice3: "Hey Transfer Protocol",
    choice4: "Hypertext Transfer Protocol",
    answer: 4
  },
  {
    question: "What is the full form of CSS?",
    choice1: "Cascading Style sheets",
    choice2: "Cascading Style sheep",
    choice3: "Cartoon Style Sheets",
    choice4: "Cascading Super sheets",
    answer: 1
  },
  {
    question: "What is the full form of JS?",
    choice1: "Jogging shoes",
    choice2: "Jingss shi",
    choice3: "Jingle sheet",
    choice4: "JavaScript",
    answer: 4
  },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQues = [...ques];
  getNewQuestion();
}

getNewQuestion = () => {
  if(availableQues.length === 0 || questionCounter >MAX_QUESTIONS){
    //Setting the score in the local storage
    localStorage.setItem('mostRecentScore',score);
    //go to the game ending page
    return window.location.assign("/Quiz App/end.html");
  }
  //Increasing the counter to get the next Question
  questionCounter++;
  //Incrementing Question number
  progressText.innerText = `Question${questionCounter}/${MAX_QUESTIONS}`;
  //update the progressBar
  // the (questionCounter/MAX_QUESTIONS) for 1st ques is (1/4=0.25)when we do *100 then we have 25 then we can convert it into percentage and show it in the progress bar
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;
  // trying to get a random question
  const questionIndex = Math.floor(Math.random() * availableQues.length);
  //Displaying the ramndom question
  currentQues = availableQues[questionIndex];
  question.innerText = currentQues.question;

  //Bcoz choices are so many so we have to use a for each to loop through them to show the correct choice for correct question
  choices.forEach(choice => {
    //Here we will use the data-number property that we defined in the html document
    const number = choice.dataset['number'];
    choice.innerText = currentQues['choice' + number]//the ['choice' + number] is the choice1,choice2 dynamically
  });
  //Now to get rid of the question that is already attempted we use
  availableQues.splice(questionIndex, 1);//This will splice out the attempted question once done
  //WE can answer after getting everything loaded
  acceptingAns = true;
};

choices.forEach(choice => {
  //Adding eventListener to every choice so that we can keep track if it is clicked or not
  choice.addEventListener('click', e =>{
    if(!acceptingAns)return;
    
    acceptingAns = false;
    const selectedChoice = e.target;
    const selectedAns = selectedChoice.dataset["number"];

    //Checking the correct answer
    const classToApply = selectedAns ==currentQues.answer ? 'correct' : 'incorrect';
    // console.log(classToApply);

    if(classToApply === 'correct'){
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply);//adding the class correct or incorrect to the tag dynamically
    
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);//Removing the correct/incorrect class is equally important bcoz we dont want the green/red color to be forever and just want to apppear for a sec and fade away because of that we use setTimeOut 
      getNewQuestion();//After answering a question we will move to next question
    }, 1000);//1000 millisecond
  });
});

incrementScore = num => {
  score +=num;
  scoreText.innerText = score;
}
startGame();




