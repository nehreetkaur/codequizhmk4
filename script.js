var quizContainer=document.getElementById("quizcontainer");

var resultshowEl=document.getElementById("resultshow");

var totalScoreEl=document.getElementById("totalscore");

var endQuizDiv=document.getElementById("endquiz");

var questionEl=document.getElementById("questions");

var quizTimer=document.getElementById("timer");

var startButton=document.getElementById("startbutton");

var quizstartDiv=document.getElementById("gamestartpage");

var scoreContainer=document.getElementById("scorecontainer");

var scoredisplayDiv=document.getElementById("scoredisplay");

var InputName=document.getElementById("initials");

var DisplayName=document.getElementById("score-sign");

var buttonsDiv=document.getElementById("buttons");

var submitBtn=document.getElementById("submit");

var DisplayScore=document.getElementById("actualscore");

var button1=document.getElementById("1");
var button2=document.getElementById("2");
var button3=document.getElementById("3");
var button4=document.getElementById("4");



//Quiz question object
var questions=[{
    question:"Pick the correct data type",
    choice1:"alerts",
    choice2:"prompts",
    choice3:"confirm",
    choice4:"String",
    correctAnswer:"4"},
    {
        question:"What does Cascading Style sheet stand for",
        choice1:"CSS",
        choice2:"CSM",
        choice3:"CSD",
        choice4:"CSM",
                correctAnswer:"1"},
     
        {
         question:"Pick the correct Data type",
         choice1:"String",           
          choice2:"quotes",
           choice3:"DOM",
           choice4:"HTML",
           correctAnswer:"1"},



       {
           question:"Array used to store",
            choice1:"Numbers",
            choice2:"Objects",
            choice3:"String",
            choice4:"All above",
            correctAnswer:"4",

       },


       {
           question:"Hyper Text Mark Up stands for ",
           choice1:"HTML",
           choice2 :"HTTP",
           choice3 :"HTMS",
           choice4 :"HTME",
           
           correctAnswer:"1",

       },

        
    
];


var finalIndex=questions.length;
var currentIndex=0;
var timeLeft=76;
var timeInterval;
var score=0;
var correct;




//loop through array for questions
function displayQuestion(){
    buttonsDiv.style.display="none";
    if(currentIndex===finalIndex){
        return displayScore();
    }
    var currentQuestion=questions[currentIndex];
    questionEl.innerHTML="<p> " + currentQuestion.question +"</p";
    button1.innerHTML=currentQuestion.choice1;
    button2.innerHTML=currentQuestion.choice2;
    button3.innerHTML=currentQuestion.choice3;
    button4.innerHTML=currentQuestion.choice4;
};
    
   
function start(){
    endQuizDiv.style.display="none";
    quizstartDiv.style.display="none";
    
    displayQuestion();

    //timer functionality
    timerInterval=setInterval(function() {
        timeLeft--;
        quizTimer.textContent="Time left " + timeLeft;
        if(timeLeft===0){
            clearInterval(timerInterval);
            displayScore();
        }
    },1000);
    quizContainer.style.display="block";
}



function displayScore(){
    quizContainer.style.display="none";

    endQuizDiv.style.display="flex";

    clearInterval(timerInterval);

    InputName.value="";

    totalScoreEl.innerHTML="you got" + score + "in total";
}



submitBtn.addEventListener("click" , function highscore(){

    if(InputName.value===""){
        alert("Make sure enter your initials");
        return false;
    }else{
        var savedscores=JSON.parse(localStorage.getItem("savedScores")) || [];
        var user=InputName.value.trim();
        var currentHighscore= {
            name:user,
            score:score
        };

        endQuizDiv.style.display="none";

        scoreContainer.style.display="flex";

        scoredisplayDiv.style.display="block";

        buttonsDiv.style.display="flex";

        savedscores.push(currentHighscore);
        //local storage
        localStorage.setItem("savedscores",JSON.stringify(savedscores));
        displayHighscores();
    }



});

//display    //local storage

function displayHighscores(){
    DisplayName.innerHTML="";
    DisplayScore.innerHTML="";
    var highscores = JSON.parse(localStorage.getItem("savedscores")) || [];
    for(var i=0 ; i<highscores.length;i++){
        var newName=document.createElement("li");
        var newScore=document.createElement("li");
        newName.textContent=highscores[i].name;
        newScore.textContent=highscores[i].score;
        DisplayName.appendChild(newName);
        DisplayScore.appendChild(newScore);
    }
  }


  
// showing high scores
function showHighscore(){
    quizstartDiv.style.display="none";
    endQuizDiv.style.display="none";
    scoreContainer.style.display="flex";
    scoredisplayDiv.style.display="block";
    buttonsDiv.style.display="flex";
    displayHighscores();
}

function clearScore(){
    window.localStorage.clear();
    DisplayName.textContent="";
    DisplayScore.textContent="";
}
//
function resetQuiz(){
    scoreContainer.style.display="none";

    endQuizDiv.style.display="none";

    quizstartDiv.style.display="flex";

    timeLeft=76;
    score=0;
    currentIndex=0;
}
function checkAnswer(answer){
    correct=questions[currentIndex].correctAnswer;
    if(answer===correct && currentIndex!=finalIndex){
        //alert("that is correct");
        score++;
        score=timeLeft;
       alert("that is correct");
        currentIndex++;
       displayQuestion();


    }else if(answer!==correct && currentIndex!==finalIndex){
        alert("this is incorrect");
       // currentIndex++;
        var penality=5;
        
        timeLeft=timeLeft-penality;
        score=timeLeft;
        currentIndex++;
        displayQuestion();
    }else{
        displayScore();
    }
}
//
startButton.addEventListener("click",start);