var userVar = {
    guessCorrect: 0,
    guessIncorrect: 0
}

var gameVar = {
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
    createStartBtn: function () {
        $('#button-area').html('<button id="start-button">START</button>');
    },
    createQuestionCard: function () {
        var timer = $('<h2>');
        timer.text('You have ' + gameVar.countTime + ' seconds left.');
        $('#timer-area').append(timer);

        for (var i = 0; i < 4; i++) {
            var answer = $('<h3>');
            answer.text();
        }
    },
    pickQuest: function () {

        var random = Math.floor(Math.random());
        gameVar.currentQuest
    },
    pickNextQuest: function () {

    }
}

$(document).ready(function () {
    gameCtrl.createStartBtn();


    $('#start-button').on('click', function() {
        $('#button-area').empty();
        gameVar.listQuest
        
        gameCtrl.createQuestionCard();
    });
})

