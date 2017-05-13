//Trivia Game Design
//Start Button to start the game
//Timer applies to one question at a time, if time runs out and there is no answer
//Show "out of time" and the correct answer for the question
//answer chosen: correct answer or wrong answer and what is the correct answer
//end of game : show # of Correct Answers, Incorrect Answers and Unanswered questions, button "Start Over"
//Do not refresh the page on Start Over, Reset the timer and start from the 1st question again

$(document).ready(function(){


console.log("testing");
//Declare Variables
var correctCount;
var wrongCount;
var noAnswerCount;
var picked;
var interval;
var counter;


//My Trivia questions and answers object
var triviaQ = [{q:"This is question1", a:"choice1", pic:"url", 
				c:["choice1", "choice2", "choice3"]}, 
				{q:"This is question2?", a:"choice2", pic:"url2",
				c:["choice1", "choice2", "choice3"]},
				{q:"This is question3?", a:"choice3", pic:"url3",
				c:["choice1", "choice2", "choice3"]},
				{q:"This is question4?", a:"choice3", pic:"url4",
				c:["choice1", "choice2", "choice3"]},
				{q:"This is question5?", a:"choice1", pic:"url5",
				c:["choice1", "choice2", "choice3"]}
				];



//Start Button 
  var b = $("<button>");
  // Adding a class of movie to our button
  b.addClass("btn btn-primary");
  // Adding a data-attribute
  b.attr("data-name", "START");
  // Providing the initial button text
  b.text("START GAME");
  // Adding the button to the HTML
  $("#startButton").html(b);

//on startButton click show first question
	$("#startButton").on("click", function() {
		$("#startButton").remove();
		triviaGame.displayQuestion();
	})

	//listen for answer picked
	$(document).on("change","#choices", function(e){
		console.log(e);
		triviaGame.getChoice(e);

	})

	//game restart function
	$(document).on("click", "#restart", function(){
		triviaGame.gameReset();
	})
	// $("#choices input").on("change", function() {
 //   		var userSelection = $("input[name=choices]:checked", "#choices").val();
 //   		triviaGame.getChoice(userSelection);
 //   				//getChoice(x, userSelection);	
	// 	});

//game object

	var triviaGame = {
		questions:triviaQ,
		currentQ: 0,
		counter: 15,
		correctCount: 0,
		wrongCount: 0,
		noAnswerCount:0,
		countDown: function() {
			triviaGame.counter--;
			$("#timer").html("<h3>Time Remaining: " + triviaGame.counter + "</h3>");
			if (triviaGame.counter<=0) {
				console.log("You did not answer");
				triviaGame.tooLate();

			}
		},
		displayQuestion: function() {
			timer = setInterval(triviaGame.countDown, 1000);
			$("#question").html(triviaQ[triviaGame.currentQ].q);
			//for loop to add radio buttons for each choice for question
				for(var i=0; i<triviaQ[triviaGame.currentQ].c.length; i++) {
					var rb = $('<input type="radio" name="choices" value="' + triviaQ[triviaGame.currentQ].c[i] + '">' + triviaQ[triviaGame.currentQ].c[i] + '</input><br />');
					$("#choices").append(rb);
				}
		},
		nextQuestion: function() {
			triviaGame.counter=15;
			$("timer").html(triviaGame.counter);
			triviaGame.currentQ++;
			$("#question").empty();
			$("#choices").empty();
			$("#pic").empty();
			triviaGame.displayQuestion();

		},
		addChoices: function () {
			
		},
		getChoice: function (e) {
			clearInterval(timer);
			console.log(e.target.value);
			console.log(triviaQ[triviaGame.currentQ].a);
   			if (e.target.value==triviaQ[triviaGame.currentQ].a) {
   				console.log("Correct");
   				triviaGame.correctAnswer();
   				// picked = 1;
   				// correctCount++;
   				// showAnswer(picked, x);
 		

   			}
   			else{
   				console.log("Incorrect!");
   				triviaGame.notCorrect();
   				// picked = 2;
   				// wrongCount++;
   				// showAnswer(picked, x);
   				}

		},
		correctAnswer: function () {
			clearInterval(timer);
			$("#question").html("Correct!");
			$("#choices").html("The Correct Answer is: " + triviaQ[triviaGame.currentQ].a);
			$("#pic").html("<img>" + "src=" + triviaQ[triviaGame.currentQ].pic + "</img>");
			triviaGame.correctCount++;
			console.log(triviaGame.correctCount);
			if (triviaGame.currentQ==triviaQ.length-1) {
				setTimeout(triviaGame.gameResults, 3*1000);
			}
			else {setTimeout(triviaGame.nextQuestion, 3*1000);}
		},
		notCorrect: function () {
			clearInterval(timer);
			$("#question").html("Bummer!");
			$("#choices").html("The Correct Answer was: " + triviaQ[triviaGame.currentQ].a);
			$("#pic").html("<img>" + "src=" + triviaQ[triviaGame.currentQ].pic + "</img>");
			triviaGame.wrongCount++;
			console.log(triviaGame.wrongCount.toString());
			if (triviaGame.currentQ==triviaQ.length-1) {
				setTimeout(triviaGame.gameResults, 3*1000);
			}
			else {setTimeout(triviaGame.nextQuestion, 3*1000);}
		},
		tooLate: function() {
			clearInterval(timer);
			$("#question").html("You did not answer in time!");
			$("#choices").html("The Correct Answer was: " + triviaQ[triviaGame.currentQ].a);
			$("#pic").html("<img>" + "src=" + triviaQ[triviaGame.currentQ].pic + "</img>");
				if (triviaGame.currentQ==triviaQ.length-1) {
				setTimeout(triviaGame.gameResults, 3*1000);
				}
				else {setTimeout(triviaGame.nextQuestion, 3*1000);}
			triviaGame.noAnswerCount++;

		},
		gameReset: function() {
			triviaGame.currentQ=0;
			triviaGame.correctCount=0;
			triviaGame.wrongCount=0;
			triviaGame.noAnswerCount=0;
			triviaGame.counter=15;
			triviaGame.displayQuestion();

		},
		gameResults: function(){
			clearInterval(timer);
			$("#question").empty();
			$("#choices").empty();
			$("#pic").empty();
			$(".main-content").html("<h2>All Done!</h2>");
			$(".main-content").append("<h3>Correct Answers: " + triviaGame.correctCount + "<h3>");
			$(".main-content").append("<h3>Incorrect Answers: " + triviaGame.wrongCount + "<h3>");
			$(".main-content").append("<h3>Not Answered: " + triviaGame.noAnswerCount + "<h3>");
			$(".main-content").append("<button id='restart'>Play Again!</button>");
		}

	}

});