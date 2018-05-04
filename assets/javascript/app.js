$("#document").ready(function (){
    var timeCounter;
    var qCounter;
    var rightAnswerCounter;
    var wrongAnswerCounter;
    var unansweredCounter;
    var intervalTime;
    var intervalTrivia
    var isRunning;
    var temp;
    var isAnswered;
    var button;
    var choiceDiv;
    var userChoice;
    var interval=3;
    var showAnswerTime=1;
    var choiceArr=[$("#choice1"),$("#choice2"),$("#choice3"),$("#choice4")];
    var game=[

        {
            question: "Vito Corleone's natural children's names are?",
            choices: ["Sonny, Fredo, Michael and Connie","Sammy, Fredo, Tom, Michael and Connie","Sonny , Anthony, Fredo and Michael","Sonny, Fredo, Mary and Michael"],
            answer: "Sonny, Fredo, Michael and Connie"
        },
        {
            question: "What is the name of the woman Michael Corleone marries in Sicily?",
            choices: ["Kay","Apollonia","Sophia","Isabela"],
            answer: "Apollonia"
        },
        {
            question:"Who is known as the Turk?",
            choices: ["Sollozzo","Tessio", "McCluskey", "Clemenza"],
            answer:"Sollozzo"
        },
        {
            question:"What business is Don Corleone in? He imports ________.",
            choices: ["coffee","garments","seafood","olive oil"],
            answer:"olive oil"
        },
        {
            question:"How is Tom Hagen related to the Family?",
            choices: ["He is Connie's husband","He is Sonny's cousin","He was adopted","He is Don Corleone's youngest son"],
            answer: "He was adopted"
        }
    ]

    function initialize() {
        timeCounter=interval;
        qCounter=0;
        rightAnswerCounter=0;
        wrongAnswerCounter=0;
        unansweredCounter=0;
        isRunning=false;
        isAnswered=false;
    }
    initialize();
    
    // display button;
    button=$('<button id="startBtn">Start</button>');
    $("#timer").html(button);
   
    $("#startBtn").on("click", function () {
        startTrivia();
        firstQuestion();
        
        
    });

    $(document).on("click", ".option", function(){
        userChoice = $(this).attr("data-choice");
        isAnswered=true;
        checkifAnswered();
        // console.log(qCounter === game.length);
        // console.log(qCounter);
        // console.log(game.length);
        if (qCounter === game.length-1) {
            showSummary();
            clearInterval(intervalTrivia);
            isRunning=true;
            clearInterval(intervalTime);
        };
        isAnswered=true;
    });

    function firstQuestion() {
        startCount();
        showQuestion(qCounter);
        showChoices(qCounter);
        checkifAnswered();
    }

    function checkifAnswered() {
        console.log(isAnswered);
        if (!isAnswered) {
            setTimeout(showAnswer,1000*(interval-showAnswerTime));
            unansweredCounter++;
            console.log(unansweredCounter);
        }
        else {
            showAnswer();
        }
        
    }

    function nextQuestion() {
        console.log(unansweredCounter);
        if (unansweredCounter===game.length) {
            showSummary();
            clearInterval(intervalTrivia);
            isRunning=true;
            clearInterval(intervalTime);
        }
        else {
            qCounter++;
            showQuestion(); 
            showChoices();
            checkifAnswered();
            $("#notice").empty();
            $("#answer").empty();
            console.log(unansweredCounter);
        }
    };

    function showQuestion() {
        $("#question").html(game[qCounter].question);
        isAnswered=false;
    };
    
    function showChoices() {
        $("#choices").empty()//*********** !!!!!!!!
        
        for (i=0; i<game[qCounter].choices.length;i++) {
            
            choiceDiv = $("<button>");
            var choiceDisplay=game[qCounter].choices[i];
            choiceDiv.attr("class","option");
            choiceDiv.attr("data-choice",choiceDisplay);
            choiceDiv.append(choiceDisplay);
            $("#choices").append(choiceDiv);   
        }  
    };
   
    function showAnswer() {
        stopCount();
        if(userChoice === game[qCounter].answer) {
            $("#answer").html("Answer is: " + "<h2>"+game[qCounter].answer+"</h2>" + "You're a True Fan!!" );
            var rightImage = $("<img>");
            rightImage.attr("src",'assets/images/right.gif');
            $("#choices").html(rightImage);
            rightAnswerCounter++;
        }
        else {
            $("#answer").html("<h2>"+"Hmmmmm, You should watch Godfather Again"+"</h4>")
            var wrongImage = $("<img>");
            wrongImage.attr("src","assets/images/wrong.gif");
            $("#choices").html(wrongImage);
            wrongAnswerCounter++;
        }
    }

    function startTrivia() {
        intervalTrivia=setInterval(nextQuestion, 1000*(interval));
    };

    function stopTrivia() {
        clearInterval(intervalTrivia);
    }

    
    function showSummary() {
        stopCount();
        $("#timmer").empty();
        $("#choices").empty();
        $("#answer").empty();
        $("#notice").empty();
        $("#choices").html("<h2>"+"Correct: "+ rightAnswerCounter+"</h2>"+"<br>"+"<h2>"+" wrong: "+ wrongAnswerCounter+"</h2>"+"<br>"+"<h2>"+" unanswered: "+ unansweredCounter+"</h2>");
    };

    // timer
    function startCount() {
        if(!isRunning) {
        clearInterval(intervalTime);
        intervalTime = setInterval(countDown, 1000); 
        };
    }
    
    function countDown(){
        
        $("#timer").html("Time Remaining: " + timeCounter+"s");
        timeCounter--;
        if (timeCounter === 0) {
            timeCounter=interval;
        }
    }

    function stopCount() {
        if(isRunning) {
            clearInterval(intervalTime);
        }
    }
});

