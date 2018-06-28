//accessor variables
var $gameArea = $('#game-area');
var $buttonArea = $('#button-area');
var $timerArea = $('#timer-area');
var $questionArea = $('#question-area');
var $answerArea = $('#answer-area');

//holds user values
var userVar = {
    userWon: false,
    userAnswer: -1, 
    guessCorrect: 0,
    guessIncorrect: 0,
    endTime: 0,
    totalTime: 0,
    varReset: function () {
        userVar.userAnswer = -1;
        userVar.guessCorrect = 0;
        userVar.endTime = 0;
        userVar.totalTime = 0;
        userVar.userWon = false; 
    }
}

//holds game relevant values
var gameVar = {
    gameStarted: false,
    msg: ['Out of time!', 'Nope!', 'Correct!'],

    currentQuest: {},
    listQuest: [],
    staticListQuest: [{
            question: 'What is the 3rd letter?',
            options: ['a', 'b', 'c', 'd'],
            correct: 2,
            picture: 'url'
        },
        {
            question: 'What is the 2rd letter?',
            options: ['a', 'b', 'c', 'd'],
            correct: 1,
            picture: 'url'
        },
    ],
    varReset: function () {
        gameVar.currentQuest = {};
        gameVar.listQuest = [];
    }
}

//game functions
var gameCtrl = {
    //creates start button with two types based off game state
    createStartBtn: function () {
        if (!gameVar.gameStarted) {
            gameVar.gameStarted = true;
            $buttonArea.html('<button id="start-button">Start</button>');
        } else {
            $buttonArea.html('<button id="start-button">Would you like to retry?</button>');
        }

    },
    //sets up area for question phase
    createQuestionCard: function () {
        var timer = $('<h2>');
        timer.text('You have ' + clock.countTime + ' seconds left.');
        $timerArea.append(timer);
        clock.startClock();

        var question = $('<h3>');
        question.text(gameVar.currentQuest.question);
        $questionArea.append(question);

        for (var i = 0; i < 4; i++) {
            var answer = $('<h4>');
            answer.attr({
                'answer-id': i,
                'class': 'answers',
            });
            answer.text(gameVar.currentQuest.options[i]);
            $answerArea.append(answer);
        }
    },

    /* old version, replaced byt pickQuests
    //picks a quest with two options, current and next
    pickQuest: function (type) {
        var random = Math.floor(Math.random() + gameVar.listQuest.length) - 1;
        if (type === 'current') {
            gameVar.currentQuest = gameVar.listQuest[random];
            console.log(gameVar.currentQuest);
        } else if (type === 'next') {
            gameVar.nextQuest = gameVar.listQuest[random];
            console.log(gameVar.nextQuest);
        }
        gameVar.listQuest.splice(random, 1);

        console.log(gameVar.listQuest);
    },
    */

    pickQuests: function () {
        var random = Math.floor(Math.random() * gameVar.listQuest.length);
             
        if (gameVar.listQuest.length > 0) {
            
            gameVar.currentQuest = gameVar.listQuest[random];
            gameVar.listQuest.splice(random, 1);
            console.log(gameVar.currentQuest);
        }
        console.log(gameVar.staticListQuest);
        console.log(gameVar.listQuest);
    },
    //clears areas to prepare 
    areaClear: function () {
        $buttonArea.empty();
        $timerArea.empty();
        $questionArea.empty();
        $answerArea.empty();
    },
    //creates result card based off of userWon
    createResultCard: function (bool) {
        gameCtrl.areaClear();

        //resets user answer
        userVar.userAnswer = -1;

        userVar.totalTime += (30 - clock.countTime); 
        userVar.endTime = clock.countTime;


        //shows the answer
        var question = $('<h3>');
        if (bool) {
            question.text(gameVar.msg[2]);
            userVar.guessCorrect++;
        }
        else {
            question.text(gameVar.msg[1]);
        }
        
        //sets the timer
        var timer = $('<h2>');
        if (clock.countTime > 0) {
            timer.text(`You finished with ${userVar.endTime} seconds left.`);
        }
        else {
            timer.text(`You didn't answer in time :(`);
            question.text(gameVar.msg[0]);
        }
        
        //shows picture
        var image = $('<img>');
        image.attr({
            class: 'answer-image',
            alt: 'answer image',
            src: '',
        });
        //src: gameVar.currentQuest.picture

        $questionArea.append(question);
        $timerArea.append(timer);
        $answerArea.append(image);

    },
    //handles timeout for showing next quest or result screen
    nextQuest: function () {
        if (gameVar.listQuest.length > 0) {
            var timeout = setTimeout(gameCtrl.proceed, 4000);
        } 
        else {
            var timeout = setTimeout(gameCtrl.finishGame, 4000);
        }
        clock.countTime = 30;
    },
    //proceeds to show the next question
    proceed: function () {
        userVar.userWon = false;
        gameCtrl.areaClear();
        gameCtrl.pickQuests();
        gameCtrl.createQuestionCard();        
    }, 
    //shows final game screen
    finishGame: function () {
        gameCtrl.areaClear();

        
        var result = $('<h2>');
        result.text(`Your final score is ${userVar.guessCorrect}/${gameVar.staticListQuest.length}.`);

        var stats = $('<h3>');
        stats.text(`You took ${userVar.totalTime} seconds in total to finish the quiz.`);

        
        $timerArea.append(result);
        $questionArea.append(stats);
        gameCtrl.createStartBtn(gameVar.gameStarted);

        gameVar.varReset();
        userVar.varReset();
    }

}

//holds the game clock
var clock = {
    timerStarted: false,
    countTime: 30,

    startClock: function () {
        if (!clock.timerStarted) {
            intervalID = setInterval(clock.countClock, 1000);
            clock.timerStarted = true;
        }
    },
    countClock: function () {
        if (clock.countTime === 0) {
            clock.resetClock();
            gameCtrl.createResultCard();
            gameCtrl.nextQuest();

        } else {
            clock.countTime -= 1;
            $('h2').text('You have ' + clock.countTime + ' seconds left.');
        }
    },
    resetClock: function () {
        clearInterval(intervalID);
        clock.timerStarted = false;
    }
}


$(document).ready(function () {
    gameCtrl.createStartBtn();

    $(document).on('click', '#start-button', function () {
        gameCtrl.areaClear();

        //loner timer reset for post-game reset
        clock.countTime = 30;

        gameVar.listQuest = gameVar.staticListQuest.slice(0);

        gameCtrl.pickQuests();
        gameCtrl.createQuestionCard();
        gameVar.gameStarted = true;
    });

    $(document).on('click', '.answers', function () {
        userVar.userAnswer = parseInt($(this).attr('answer-id'));
        
        if (gameVar.currentQuest.correct === userVar.userAnswer) {     
            userVar.userWon = true;
        }

        clock.resetClock();
        gameCtrl.createResultCard(userVar.userWon);
        
        gameCtrl.nextQuest();

        console.log(userVar.userWon);
    });
})