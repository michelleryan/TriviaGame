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
var counter = 5;

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
	$("#startButton").on("click", function(){

		//start timer function
			//timer();
			var x = 0;
			interval = setInterval(countDown(x), 5000);

		//remove the startButton
		$("#startButton").empty();

			//display question and choices
			var x = 0;
			$("#question").html(triviaQ[x].q);
			addChoices(x);

	    	//get choice
	    	$("#choices input").on("change", function() {
   				var userSelection = $("input[name=choices]:checked", "#choices").val(); 
   				getChoice(x, userSelection);	
			});
	
	});  //end of startButton function

	//timer function
	function countDown(x){
		tooLate=0;
		counter--;
		if (counter>0) {
			$("#timer").html("<h3>Time Remaining: " + counter + "</h3>");
		}
		else {
			clearInterval(interval);
			tooLate=1;
		}
	}

	function timer() {
		$("#timer").empty();
		var counter = 5;
		interval = setInterval(function() {
			console.log("Start Timer");
    		counter--;
    		//Display Countdown
    		$("#timer").html("<h3>Time Remaining: " + counter + "</h3>");

    		//if time runs out, stop timer, show correct answer
	    	if (counter == 0) {
	        	clearInterval(interval);
	        	console.log("You did not answer");
	        	picked = 0;
	        	noAnswerCount++;
    	       	showAnswer(picked, x);
	    		}
			}, 1000);

	}

	//function to provide choices
	function addChoices(x) {
		$("#choices").empty();
		//for loop to add radio buttons for each choice for question
			for(var i=0; i<triviaQ[x].c.length; i++) {
				var rb = $('<input type="radio" name="choices" value="' + triviaQ[x].c[i] + '">' + triviaQ[x].c[i] + '</input><br />');
				$("#choices").append(rb);
			}
	}

	//function to show correct answer
	function showAnswer(picked, x){
		switch(picked) {
			case 0:
				$("#question").html("You did not answer!");
				$("#choices").html("The Correct Answer was: " + triviaQ[x].a);
			   	break;
			case 1:
				$("#question").html("Correct!");
			   	$("#choices").html("The Correct Answer is: " + triviaQ[x].a);
				break;
			case 2:
				$("#question").html("Bummer!");
			   	$("#choices").html("The Correct Answer was: " + triviaQ[x].a);
			   	break;
		}
		
		setTimeout(nextQ(x), 5000);
	}

	function nextQ(x){
		x++;
		if (x<triviaQ.length) {

			timer();
			$("#question").html(triviaQ[x].q);
			addChoices(x);
			$("#choices input").on("change", function() {
   				userSelection = $("input[name=choices]:checked", "#choices").val(); 
   				clearInterval(interval); //stop timer
   				getChoice(x, userSelection);
   			});

		}
		else{
			console.log("reset game");
		}

	}

	function getChoice(x, userSelection){
				console.log("in getChoice function");
   				console.log(userSelection);
	   			if (userSelection==triviaQ[x].a) {
	   				console.log("Correct");
	   				picked = 1;
	   				correctCount++;
	   				
	   				showAnswer(picked, x);
	   				//x++;
	   				

	   			}
	   			else{
	   				console.log("Incorrect!");
	   				picked = 2;
	   				wrongCount++;
	   				showAnswer(picked, x);
	   				}
	   			
	   			return x;
	}



});
						  	