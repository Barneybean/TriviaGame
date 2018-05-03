$("#document").ready(function (){
    var timeCounter;
    var qCounter;
    var rightAnswerCounter;
    var wrongAnswerCounter;
    var intervalTime;
    var intervalTrivia
    var isRunning;
    var isAnswered;
    var button;
    var setTime=5;
    var interval=5;
    var showAnswerTime=2;
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
        }
        // {
        //     question:"",
        //     choices: [],
        //     answer:1,
        // },
        // {
        //     question:"",
        //     choices: [],
        //     answer:1,
        // }
    ]

    function initialize() {
        timeCounter=setTime;
        qCounter=0;
        rightAnswerCounter=0;
        wrongAnswerCounter=0;
        isRunning=false;
        isAnswered=false;
    }
    initialize();
    console.log(game[qCounter].choices[0]);
    // display button;
    button=$('<button id="startBtn">Start</button>');
    $("#timer").html(button);
    console.log(button);

    $("#startBtn").on("click", function () {
        startCount();
        setTimeout(showAnswer,1000*(interval-showAnswerTime));
        showQuestion();
        showChoices();
        startTrivia();

    });

    function startTrivia() {
        intervalTrivia=setInterval(nextQuestion, 1000*interval);
        
    };

    function stopTrivia() {
        clearInterval(intervalTrivia);
    }

    function nextQuestion() {
        qCounter++;
        showQuestion(); 
        showChoices();
        setTimeout(showAnswer,1000*(interval-showAnswerTime));
        
        if (qCounter === game.length) {
            showSummary();
            stopTrivia();
            isRunning=true;
        };
        console.log(game.length);
    };

    function showQuestion() {
        console.log(qCounter);
        $("#question").html(game[qCounter].question);
    };
    
    function showChoices() {
       
        $("#choices").html(
            '<input class="radio" type="radio">'+ " " + game[qCounter].choices[0]+"<br>"+
            '<input class="radio" type="radio">'+ " " + game[qCounter].choices[1]+"<br>"+
            '<input class="radio" type="radio">'+ " " + game[qCounter].choices[2]+"<br>"+
            '<input class="radio" type="radio">'+ " " + game[qCounter].choices[3]+"<br>"
            
        );
        
        // for (var i=0; i<game[qCounter].choices.length;i++ ) {
        //     var choices=game[qCounter].choices[i];
        //     choiceArr[i].html("<button>"+choices+"</button>");
        // };
    };

    function showAnswer() {
        $("#choices").html("Great Job! Answer is: " + game[qCounter].answer);
    }

    
    function showSummary() {
        
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
            timeCounter=setTime;
        }
    }




    // function formatChoices() {
    //     var radio1=$('<input id="choice1" type="radio">game[qCounter].choices[0]');
    //     var radio2=$('<input id="choice2" type="radio">');
    //     var radio3=$('<input id="choice3" type="radio">');
    //     var radio4=$('<input id="choice4" type="radio">');
    //     $("#choices").append(radio1);
    //     $("#choices").append(radio2);
    //     $("#choices").append(radio3);
    //     $("#choices").append(radio4);
    //     console.log(radio1);
    // }
});

