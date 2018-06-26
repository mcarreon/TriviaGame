var userVar = {
    userWon: false,
    guessCorrect: 0,
    guessIncorrect: 0
}

var gameVar = {
    gameStarted: false,
    msg: ['Out of time!', 'Nope!', 'Correct!'],

    currentQuest: {},
    nextQuest: {},
    listQuest: [],
    staticListQuest: [{
            question: 'What is the 3rd letter?',
            options: ['a', 'b', 'c', 'd'],
            correct: 'c'
        },
        {
            question: 'What is the 2rd letter?',
            options: ['a', 'b', 'c', 'd'],
            correct: 'b'
        },
    ],
}

var gameCtrl = {
    //creates start button with two types based off game state
    createStartBtn: function () {
        if (!gameVar.gameStarted) {
            gameVar.gameStarted = true;
            $('#button-area').html('<button id="start-button">Start</button>');
        } else {
            $('#button-area').html('<button id="start-button">Would you like to retry?</button>');
        }

    },
    //sets up area for question phase
    createQuestionCard: function () {
        var timer = $('<h2>');
        timer.text('You have ' + clock.countTime + ' seconds left.');
        $('#timer-area').append(timer);
        clock.startClock();

        var question = $('<h3>');
        question.text(gameVar.currentQuest.question);
        $('#question-area').append(question);

        for (var i = 0; i < 4; i++) {
            var answer = $('<h4>');
            answer.text(gameVar.currentQuest.options[i]);
            $('#answer-area').append(answer);
        }
    },
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
    //clears areas to prepare 
    areaClear: function () {
        $('#timer-area').empty();
        $('#question-area').empty();
        $('#answer-area').empty();
    },
    //creates result card based off of userWon
    createResultCard: function () {

    },
}

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
            clock.countTime = 30;
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


    $('#start-button').on('click', function () {
        $('#button-area').empty();
        gameVar.listQuest = gameVar.staticListQuest;

        gameCtrl.pickQuest('current');
        gameCtrl.pickQuest('next');
        gameCtrl.createQuestionCard();


    });
})