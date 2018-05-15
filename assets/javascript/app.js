$("#document").ready(function (){
    var correctImage = "assets/images/right.gif";
    var inCorrectImage = "assets/images/wrong.gif";
    var timer;
    var currentGame;
    var temp;
    
    var trivia=[{
            question: "Vito Corleone's natural children's names are?",
            choices: ["Sonny, Fredo, Michael and Connie","Sammy, Fredo, Tom, Michael and Connie","Sonny , Anthony, Fredo and Michael","Sonny, Fredo, Mary and Michael"],
            answer: "Sonny, Fredo, Michael and Connie",
            rightImage: correctImage,
            wrongImage: inCorrectImage
        },{
            question: "What is the name of the woman Michael Corleone marries in Sicily?",
            choices: ["Kay","Apollonia","Sophia","Isabela"],
            answer: "Apollonia",
            rightImage: correctImage,
            wrongImage: inCorrectImage
        },{
            question:"Who is known as the Turk?",
            choices: ["Sollozzo","Tessio", "McCluskey", "Clemenza"],
            answer:"Sollozzo",
            rightImage: correctImage,
            wrongImage: inCorrectImage
        },{
            question:"What business is Don Corleone in? He imports ________.",
            choices: ["coffee","garments","seafood","olive oil"],
            answer:"olive oil",
            rightImage: correctImage,
            wrongImage: inCorrectImage
        },{
            question:"How is Tom Hagen related to the Family?",
            choices: ["He is Connie's husband","He is Sonny's cousin","He was adopted","He is Don Corleone's youngest son"],
            answer: "He was adopted",
            rightImage: correctImage,
            wrongImage: inCorrectImage
        }
    ];

    var quiz=$("#panel");
//a subject that contains functions
    var game={
        timeCount:10,
        gameCount: 0,
        correctCount:0,
        inCorrectCount:0,
        unansweredCount:0,
        countDown: function() {
            //cant use game here its window
            game.timeCount--;
            $("#timer").html("TIme Remaining: " + game.timeCount);
            if (game.timeCount == 0) {
                game.timeUp();
                clearInterval(timer);
            };
        },

        timeUp: function () {
            if(game.gameCount == trivia.length-1) {
                setTimeout(game.endGame, 1000*3);
            }
            else {
                game.gameCount++;
                setTimeout(game.loadGame,1000*3);
            }
        },

        loadGame: function() {
            game.timeCount = 10;
            $("#start").remove();
            $("#timer").html("TIme Remaining: " + game.timeCount);
            clearInterval(timer);
            timer=setInterval(game.countDown,1000);
            quiz.html("<h3 style='color:lightgreen;'>"+trivia[game.gameCount].question+"</h3>"+"<br>");
            for (i=0; i<trivia[game.gameCount].choices.length; i++) {
                var option=$("<div>");
                option.html("<h4 style='color: greenyellow;'>"+trivia[game.gameCount].choices[i]+"</h4>");
                option.attr("class","clickMe");
                option.attr("data-option",trivia[game.gameCount].choices[i]);
                quiz.append(option);
            };
            
        },

        endGame: function () {
            clearInterval(timer);
            $("#timer").empty();
            quiz.empty();
            quiz.append("<h2 style='color: white;'>"+"Wrong Answers: "+game.inCorrectCount+"</h2>"+"<br>");
            quiz.append("<h2 style='color: white;'>"+"Correct Answers: "+game.correctCount+"</h2>"+"<br>");
            quiz.append("<h2 style='color: white;'>"+"Unanswered Answers: "+(trivia.length-(game.correctCount + game.inCorrectCount))+"</h2>");
            var restart=$("<button class='restart'>Start Over</button>");
            quiz.append(restart);
        },

        showAnswer: function () {
            clearInterval(timer);
            //show if answerCorrect       
            if ($(temp).attr("data-option") == trivia[game.gameCount].answer) {
                game.answerCorrect();
            }
            else {
                game.answerWrong();
            }
        },

        answerCorrect: function () {
            quiz.empty();
            quiz.append("<h2 style='color: white;'>"+"Awesome! You are a true fan!"+"</h2>"+"<br>");
            quiz.append("<img src="+correctImage+">");
            game.correctCount++;
            game.gameCount++;
            if (game.gameCount == trivia.length) {
                setTimeout(game.endGame,1000*3);
            }
            else{
                setTimeout(game.loadGame, 1000*3);
            }
        },

        answerWrong: function () {
            quiz.empty();
            quiz.append("<h2 style='color: white;'>"+"Hmmmmm! the movie worth watching again!"+"</h2>"+"<br>");
            quiz.append("<img src="+inCorrectImage+">");
            game.inCorrectCount++;
            game.gameCount++;
            if (game.gameCount == trivia.length) {
                setTimeout(game.endGame,1000*3);
            }
            else{
                setTimeout(game.loadGame, 1000*3);
            }
        },
    }
    
    //on click function
    $("#start").on("click", function() {
        game.loadGame();
        
    });

    $(document).on("click", ".clickMe", function() {
        temp = this;
        game.showAnswer();
    });

    $(document).on("click",".restart", function() {
        game.gameCount=0;
        game.correctCount=0,
        game.inCorrectCount=0,
        game.unansweredCount=0,
        game.loadGame();
    })

});

