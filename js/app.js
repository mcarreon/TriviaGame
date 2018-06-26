var userVar = {
    userWon: false,
    guessCorrect: 0,
    guessIncorrect: 0
}

var gameVar = {
    gameStarted: false,
    countTime: 30,
    msg: ['Out of time!', 'Nope!', 'Correct!'],

    currentQuest: {},
    nextQuest: {},
    listQuest: [],
    staticListQuest: [{
            question: 'What is the 3rd letter',
            options: ['a', 'b', 'c', 'd'],
            correct: 'c'
        },
        {
            question: 'What is the 2rd letter',
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
        }
        else {
            $('#button-area').html('<button id="start-button">Would you like to retry?</button>');
        }
        
    },
    //sets up area for question phase
    createQuestionCard: function () {
        var timer = $('<h2>');
        timer.text('You have ' + gameVar.countTime + ' seconds left.');
        $('#timer-area').append(timer);

        for (var i = 0; i < 4; i++) {
            var answer = $('<h3>');
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
        }
        else if (type === 'next') {
            gameVar.nextQuest = gameVar.listQuest[random];
            console.log(gameVar.nextQuest);
        }    
        gameVar.listQuest.splice(random, 1);
        
        console.log(gameVar.listQuest);
    },
    //creates result card based off of userWon
    createResultCard: function (bool) {

    }
}

$(document).ready(function () {
    gameCtrl.createStartBtn();


    $('#start-button').on('click', function() {
        $('#button-area').empty();
        gameVar.listQuest = gameVar.staticListQuest;

        gameCtrl.pickQuest('current');
        gameCtrl.pickQuest('next');
        gameCtrl.createQuestionCard();

    });
})

