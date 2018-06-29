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
    incImg: './images/aiSad.jpg',
    ootImg: './images/sadKobe.jpg',
    currentQuest: {},
    listQuest: [],
    staticListQuest: [{
            question: 'Which of these wore number 3 for the Sixers?',
            options: ['Eric Snow', 'Kenny Thomas', 'Raja Bell', 'Allen Iverson'],
            correct: 'Allen Iverson',
            picture: './images/ai.gif'
        },{
            question: 'Who you gotta trust?',
            options: ['The Ghostbusters', 'The Spiderman', 'The Bird', 'The Process'],
            correct: 'The Process',
            picture: './images/ai.gif'
        },
        {
            question: 'Allen Iverson was almost traded after the 99-00 season to which of these teams?',
            options: ['L.A. Clippers', 'Houston Rockets', 'Washington Wizards', 'Seattle Supersonics'],
            correct: 'L.A. Clippers',
            picture: './images/clippers.jpg'
        },
        {
            question: "What was Greg Buckner's primary position?",
            options: ['Forward', 'Guard', 'Center', "He wasn't a player"],
            correct: 'Guard',
            picture: './images/gregBuck.jpg'
        },
        {
            question: 'Who was the head coach of the 76ers in 2003, who was fired mid-season?',
            options: ['Larry Bird', 'Paul Silas', 'Randy Ayers', 'Phil Jackson'],
            correct: 'Randy Ayers',
            picture: './images/ayers.jpg'
        },
        {
            question: 'What number did Derrick Coleman wear?',
            options: ['14', '34', '44', '24'],
            correct: '44',
            picture: './images/derrickCole.gif'
        },
        {
            question: 'Where did the 76ers play their home games?',
            options: ['Wachovia Center', 'Union Center', 'Staples Center', 'Madison Square Garden'],
            correct: 'Wachovia Center',
            picture: './images/wach.jpg'
        },
        {
            question: 'Which one of the players listed was not a player on the 2003 roster of 76ers?',
            options: ['Efthimios Rentzias', 'John Salmons', 'Raja Bell', 'Monty Williams'],
            correct: 'Raja Bell',
            picture: './images/raja.png'
        },
        {
            question: '76er George Lynch scored his career high of 30 points on March 27, 1994 against what team?',
            options: ['Milwaukee Bucks', 'Portland Trailblazers', 'Los Angeles Lakers', 'New York Knicks'],
            correct: 'Milwaukee Bucks',
            picture: './images/bucks.png'
        },
        {
            question: 'Which 76er was a part of the National Honor Society when he was a high school student?',
            options: ['Dikembe Mutombo', 'Nazr Mohammed', 'Eric Snow', 'Roshown McLeod'],
            correct: 'Eric Snow',
            picture: './images/ericSnow.jpg'
        },
        {
            question: "During the 00-01 season, the 76ers retired which former 76er's jersey?",
            options: ['Julius Erving', 'Wilt Chamberlain', 'Magic Johnson', 'Charles Barkley'],
            correct: 'Magic Johnson',
            picture: './images/barkley.jpg'
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

        var answerPack = $('<div>');
        var options = gameVar.currentQuest.options.slice(0);
        //console.log(options);
        
        while (options.length > 0) {  
            var random = Math.floor(Math.random() * options.length);
       
            var answer = $('<h4>');
            answer.text(options[random]);
            answer.attr({
                'answer-id': options.length,
                'class': 'answers',
            });
            options.splice(random, 1);
            answerPack.append(answer);            
            
        }
        $answerArea.append(answerPack);
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
        question.text(gameVar.msg[1]);
        if (bool) {
            question.text(gameVar.msg[2]);
            userVar.guessCorrect++;
        }
            


        //shows picture
        var image = $('<img>');        
        image.attr({
            class: 'answer-image',
            alt: 'incorrect answer :(',
            src: gameVar.incImg,
        });        
        if (bool) {
        image.attr({
            class: 'answer-image',
            alt: 'incorrect answer :(',
            src: gameVar.currentQuest.picture,
        });    
        }       
        
        //sets the timer
        var timer = $('<h2>');
        if (clock.countTime > 0) {
            timer.text(`You finished with ${userVar.endTime} seconds left.`);
        }
        else {
            timer.text(`You didn't answer in time :(`);
            question.text(gameVar.msg[0]);
            image.attr({
                class: 'answer-image',
                alt: 'too slow!',
                src: gameVar.ootImg,
            });  
        }
        


        $questionArea.append(question);
        $timerArea.append(timer);
        $answerArea.append(image);

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
    },
    /* old version, replaced by pickQuests
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
    //handles timeout for showing next quest or result screen
    nextQuest: function () {
        if (gameVar.listQuest.length > 0) {
            var timeout = setTimeout(gameCtrl.proceed, 3000);
        } 
        else {
            var timeout = setTimeout(gameCtrl.finishGame, 3000);
        }
        clock.countTime = 30;
    },

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
        userVar.userAnswer = $(this).text();
        
        if (gameVar.currentQuest.correct === userVar.userAnswer) {     
            userVar.userWon = true;
        }

        clock.resetClock();
        gameCtrl.createResultCard(userVar.userWon);
        
        gameCtrl.nextQuest();

        console.log(userVar.userWon);
    });
})

 