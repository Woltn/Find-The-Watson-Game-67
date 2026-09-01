// ============================================================
// FIND WATSON
// VERSION 2 - LOCAL DEVELOPMENT VERSION
// ============================================================
//
// NO FIREBASE
// NO DATABASE
// NO IMPORTS
//
// Leaderboard uses localStorage so this can be tested directly
// in VS Code / Live Server.
//
// ============================================================

console.log("");
console.log("================================================");
console.log("🎯 FIND WATSON STARTING");
console.log("================================================");
console.log("");

// ============================================================
// SETTINGS
// ============================================================

const GAME_LENGTH = 5;

const STARTING_WATSON_SIZE = 115;
const MIN_WATSON_SIZE = 37;

const STARTING_FIND_TIME = 20;
const MIN_FIND_TIME = 2.5;

const POINTS_PER_FIND = 12;

const WRONG_CLICK_PENALTY = 10;

const WATSONS_PER_LEVEL = 4;


// ============================================================
// ELEMENTS
// ============================================================

const gameMusic =
    document.getElementById("gameMusic");

const menuScreen =
    document.getElementById("menuScreen");

const gameScreen =
    document.getElementById("gameScreen");

const gameOverScreen =
    document.getElementById("gameOverScreen");

const leaderboardScreen =
    document.getElementById("leaderboardScreen");

const playButton =
    document.getElementById("playButton");

const playAgainButton =
    document.getElementById("playAgainButton");

const menuButton =
    document.getElementById("menuButton");

const highScoreButton =
    document.getElementById("highScoreButton");

const highScoreModal =
    document.getElementById("highScoreModal");

const closeHighScore =
    document.getElementById("closeHighScore");

const modalPlayButton =
    document.getElementById("modalPlayButton");

const leaderboardButton =
    document.getElementById("leaderboardButton");

const leaderboardBackButton =
    document.getElementById("leaderboardBackButton");

const leaderboardList =
    document.getElementById("leaderboardList");

const addLeaderboardButton =
    document.getElementById("addLeaderboardButton");

const leaderboardNameOverlay =
    document.getElementById("leaderboardNameOverlay");

const leaderboardNameInput =
    document.getElementById("leaderboardNameInput");

const leaderboardScore =
    document.getElementById("leaderboardScore");

const leaderboardNameError =
    document.getElementById("leaderboardNameError");

const submitLeaderboardButton =
    document.getElementById("submitLeaderboardButton");

const cancelLeaderboardButton =
    document.getElementById("cancelLeaderboardButton");

const watson =
    document.getElementById("watson");

const gameArea =
    document.getElementById("gameArea");

const scoreDisplay =
    document.getElementById("score");

const streakDisplay =
    document.getElementById("streak");

const multiplierDisplay =
    document.getElementById("multiplier");

const levelDisplay =
    document.getElementById("level");

const timerDisplay =
    document.getElementById("timer");

const findTimerDisplay =
    document.getElementById("findTimer");

const levelProgressBar =
    document.getElementById("levelProgressBar");

const levelMessage =
    document.getElementById("levelMessage");

const levelMessageSmall =
    document.getElementById("levelMessageSmall");

const levelMessageBig =
    document.getElementById("levelMessageBig");

const feedback =
    document.getElementById("feedback");

const menuHighScore =
    document.getElementById("menuHighScore");

const modalHighScore =
    document.getElementById("modalHighScore");

const finalScore =
    document.getElementById("finalScore");

const finalWatsons =
    document.getElementById("finalWatsons");

const finalBestStreak =
    document.getElementById("finalBestStreak");

const finalAccuracy =
    document.getElementById("finalAccuracy");

const finalLevel =
    document.getElementById("finalLevel");

const newHighScore =
    document.getElementById("newHighScore");


// ============================================================
// ELEMENT DEBUGGING
// ============================================================

console.log("🔎 CHECKING HTML ELEMENTS...");

const elementsToCheck = {

    gameMusic,
    menuScreen,
    gameScreen,
    gameOverScreen,
    leaderboardScreen,

    playButton,
    playAgainButton,
    menuButton,

    highScoreButton,
    highScoreModal,
    closeHighScore,
    modalPlayButton,

    leaderboardButton,
    leaderboardBackButton,
    leaderboardList,

    addLeaderboardButton,
    leaderboardNameOverlay,
    leaderboardNameInput,
    leaderboardScore,
    leaderboardNameError,
    submitLeaderboardButton,
    cancelLeaderboardButton,

    watson,
    gameArea,

    scoreDisplay,
    streakDisplay,
    multiplierDisplay,
    levelDisplay,
    timerDisplay,
    findTimerDisplay,

    levelProgressBar,
    levelMessage,
    levelMessageSmall,
    levelMessageBig,
    feedback,

    menuHighScore,
    modalHighScore,

    finalScore,
    finalWatsons,
    finalBestStreak,
    finalAccuracy,
    finalLevel,
    newHighScore

};


for (
    const [name, element]
    of Object.entries(elementsToCheck)
) {

    if (element) {

        console.log(
            `✅ ${name} found`
        );

    }

    else {

        console.error(
            `❌ ${name} MISSING FROM HTML`
        );

    }

}


console.log("");


// ============================================================
// BACKGROUNDS
// ============================================================

const backgrounds = [

    "assets/background1.jpg",
    "assets/background2.jpg",
    "assets/background3.jpg",
    "assets/background4.jpg",
    "assets/background5.jpg",
    "assets/background6.jpg",
    "assets/background7.jpg"

];


console.log(
    "🖼️ Background paths:",
    backgrounds
);


// ============================================================
// GAME VARIABLES
// ============================================================

let score = 0;

let streak = 0;

let bestStreak = 0;

let watsonsFound = 0;

let wrongClicks = 0;

let level = 1;

let gameTime = GAME_LENGTH;

let currentFindTime =
    STARTING_FIND_TIME;

let currentWatsonSize =
    STARTING_WATSON_SIZE;

let gameTimer = null;

let findTimer = null;

let gameRunning = false;


// ============================================================
// IMAGE TEST
// ============================================================

console.log("");
console.log("🖼️ TESTING ASSETS...");

if (watson) {

    watson.addEventListener(
        "load",
        function() {

            console.log(
                "✅ Watson image loaded:",
                watson.src
            );

        }
    );


    watson.addEventListener(
        "error",
        function() {

            console.error(
                "❌ Watson image FAILED:",
                watson.src
            );

        }
    );

}


backgrounds.forEach(
    function(path) {

        const testImage =
            new Image();


        testImage.onload =
            function() {

                console.log(
                    "✅ Background loaded:",
                    path
                );

            };


        testImage.onerror =
            function() {

                console.error(
                    "❌ Background FAILED:",
                    path
                );

            };


        testImage.src = path;

    }
);


// ============================================================
// MUSIC TEST
// ============================================================

if (gameMusic) {

    gameMusic.addEventListener(
        "canplay",
        function() {

            console.log(
                "✅ Music loaded successfully"
            );

        }
    );


    gameMusic.addEventListener(
        "error",
        function() {

            console.error(
                "❌ Music FAILED TO LOAD"
            );

            console.error(
                "Music source:",
                gameMusic.currentSrc ||
                gameMusic.src
            );

        }
    );

}


// ============================================================
// START GAME
// ============================================================

function startGame() {

    console.log("");
    console.log("================================================");
    console.log("🎮 STARTING GAME");
    console.log("================================================");


    score = 0;
    streak = 0;
    bestStreak = 0;
    watsonsFound = 0;
    wrongClicks = 0;
    level = 1;

    gameTime =
        GAME_LENGTH;

    currentWatsonSize =
        STARTING_WATSON_SIZE;

    gameRunning =
        true;


    console.log(
        "Game variables reset"
    );


    clearInterval(gameTimer);
    clearInterval(findTimer);


    // Music

    if (gameMusic) {

        gameMusic.currentTime = 0;

        gameMusic.volume = 0.99;

        gameMusic.play()
            .then(
                function() {

                    console.log(
                        "🎵 Music started"
                    );

                }
            )
            .catch(
                function(error) {

                    console.warn(
                        "⚠️ Music could not play:",
                        error
                    );

                }
            );

    }


    // Screens

    menuScreen.classList.add(
        "hidden"
    );

    gameOverScreen.classList.add(
        "hidden"
    );

    highScoreModal.classList.add(
        "hidden"
    );

    if (leaderboardScreen) {

        leaderboardScreen.classList.add(
            "hidden"
        );

    }

    gameScreen.classList.remove(
        "hidden"
    );


    console.log(
        "✅ Game screen displayed"
    );


    // Background

    changeBackground();


    // UI

    updateDisplays();


    // Watson

    spawnWatson();


    // Timers

    startGameTimer();

    startFindTimer();


    // Intro

    showLevelMessage(
        "GET READY",
        "LEVEL 1"
    );


    console.log(
        "✅ GAME STARTED"
    );

}


// ============================================================
// SPAWN WATSON
// ============================================================

function spawnWatson() {

    if (!gameRunning) {

        return;

    }


    const areaWidth =
        gameArea.clientWidth;

    const areaHeight =
        gameArea.clientHeight;


    const maxX =
        Math.max(
            0,
            areaWidth -
            currentWatsonSize
        );


    const maxY =
        Math.max(
            0,
            areaHeight -
            currentWatsonSize
        );


    const randomX =
        Math.random() *
        maxX;


    const randomY =
        Math.random() *
        maxY;


    watson.style.width =
        `${currentWatsonSize}px`;

    watson.style.left =
        `${randomX}px`;

    watson.style.top =
        `${randomY}px`;

    watson.style.display =
        "block";


    const rotation =
        Math.random() * 12 - 6;


    watson.style.transform =
        `rotate(${rotation}deg)`;


    console.log(
        "🎯 Watson spawned:",
        {
            x: Math.round(randomX),
            y: Math.round(randomY),
            size: currentWatsonSize,
            level
        }
    );

}


// ============================================================
// WATSON CLICK
// ============================================================

watson.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();


        if (!gameRunning) {

            return;

        }


        console.log(
            "🎯 WATSON FOUND!"
        );


        watsonsFound++;

        streak++;


        if (
            streak >
            bestStreak
        ) {

            bestStreak =
                streak;

        }


        const multiplier =
            getMultiplier();


        const points =
            Math.round(
                POINTS_PER_FIND *
                multiplier
            );


        score +=
            points;


        console.log(
            `🔥 +${points}`,
            {
                score,
                streak,
                multiplier
            }
        );


        showFeedback(
            `+${points} 🔥`,
            event.clientX,
            event.clientY
        );


        increaseDifficulty();

        checkLevel();

        spawnWatson();

        resetFindTimer();

        updateDisplays();

    }
);


// ============================================================
// WRONG CLICK
// ============================================================

gameArea.addEventListener(
    "click",
    function(event) {

        if (!gameRunning) {

            return;

        }


        wrongClicks++;

        score -=
            WRONG_CLICK_PENALTY;


        if (score < 0) {

            score = 0;

        }


        console.log(
            "❌ WRONG CLICK",
            {
                score,
                wrongClicks
            }
        );


        showFeedback(
            `-${WRONG_CLICK_PENALTY} ❌`,
            event.clientX,
            event.clientY
        );


        updateDisplays();

    }
);


// ============================================================
// MULTIPLIER
// ============================================================

function getMultiplier() {

    return Math.min(
        1 +
        streak * 0.3,
        5
    );

}


// ============================================================
// DIFFICULTY
// ============================================================

function increaseDifficulty() {

    currentWatsonSize -= 3;


    if (
        currentWatsonSize <
        MIN_WATSON_SIZE
    ) {

        currentWatsonSize =
            MIN_WATSON_SIZE;

    }

}


// ============================================================
// FIND TIMER
// ============================================================

function startFindTimer() {

    clearInterval(findTimer);


    currentFindTime =
        getFindTime();


    updateFindTimer();


    findTimer =
        setInterval(
            function() {

                if (!gameRunning) {

                    return;

                }


                currentFindTime--;


                updateFindTimer();


                if (
                    currentFindTime <= 0
                ) {

                    watsonExplodes();

                }

            },
            1000
        );

}


// ============================================================
// RESET FIND TIMER
// ============================================================

function resetFindTimer() {

    currentFindTime =
        getFindTime();


    updateFindTimer();

}


// ============================================================
// FIND TIME
// ============================================================

function getFindTime() {

    const reduction =
        (level - 1) * 3;


    return Math.max(
        STARTING_FIND_TIME -
        reduction,
        MIN_FIND_TIME
    );

}


// ============================================================
// FIND TIMER DISPLAY
// ============================================================

function updateFindTimer() {

    if (!findTimerDisplay) {

        return;

    }


    findTimerDisplay.textContent =
        Math.ceil(
            currentFindTime
        );


    if (
        currentFindTime <= 5
    ) {

        findTimerDisplay.style.color =
            "#ff4444";

        findTimerDisplay.style.transform =
            "scale(1.15)";

    }

    else {

        findTimerDisplay.style.color =
            "white";

        findTimerDisplay.style.transform =
            "scale(1)";

    }

}


// ============================================================
// EXPLOSION
// ============================================================

function watsonExplodes() {

    if (!gameRunning) {

        return;

    }


    console.log(
        "💥 WATSON EXPLODED!"
    );


    watson.style.display =
        "none";


    streak = 0;


    gameScreen.classList.add(
        "screen-shake"
    );


    setTimeout(
        function() {

            gameScreen.classList.remove(
                "screen-shake"
            );

        },
        500
    );


    showLevelMessage(
        "TOO SLOW 💥",
        "WATSON EXPLODED"
    );


    setTimeout(
        function() {

            if (!gameRunning) {

                return;

            }


            spawnWatson();

            resetFindTimer();

        },
        700
    );


    updateDisplays();

}


// ============================================================
// LEVEL SYSTEM
// ============================================================

function checkLevel() {

    const newLevel =
        Math.floor(
            watsonsFound /
            WATSONS_PER_LEVEL
        ) + 1;


    if (
        newLevel >
        level
    ) {

        level =
            newLevel;


        console.log(
            "🎉 LEVEL UP:",
            level
        );


        showLevelMessage(
            "LEVEL UP!",
            `LEVEL ${level}`
        );


        changeBackground();

    }


    updateLevelProgress();

}


// ============================================================
// LEVEL PROGRESS
// ============================================================

function updateLevelProgress() {

    if (!levelProgressBar) {

        return;

    }


    const progress =
        watsonsFound %
        WATSONS_PER_LEVEL;


    const percentage =
        (
            progress /
            WATSONS_PER_LEVEL
        ) * 100;


    levelProgressBar.style.width =
        `${percentage}%`;

}


// ============================================================
// LEVEL MESSAGE
// ============================================================

function showLevelMessage(
    smallText,
    bigText
) {

    if (!levelMessage) {

        return;

    }


    levelMessageSmall.textContent =
        smallText;

    levelMessageBig.textContent =
        bigText;


    levelMessage.style.opacity =
        "1";


    levelMessage.style.transform =
        "translate(-50%, -50%) scale(1.05)";


    setTimeout(
        function() {

            levelMessage.style.opacity =
                "0";

            levelMessage.style.transform =
                "translate(-50%, -50%) scale(0.8)";

        },
        1000
    );

}


// ============================================================
// BACKGROUND
// ============================================================

function changeBackground() {

    const index =
        (level - 1) %
        backgrounds.length;


    console.log(
        "🖼️ Changing background:",
        backgrounds[index]
    );


    gameScreen.style.backgroundImage =
        `linear-gradient(
            rgba(0,0,0,0.25),
            rgba(0,0,0,0.25)
        ),
        url("${backgrounds[index]}")`;

}


// ============================================================
// GAME TIMER
// ============================================================

function startGameTimer() {

    clearInterval(gameTimer);


    gameTimer =
        setInterval(
            function() {

                if (!gameRunning) {

                    return;

                }


                gameTime--;


                updateTimer();


                if (
                    gameTime <= 0
                ) {

                    endGame();

                }

            },
            1000
        );

}


// ============================================================
// TIMER
// ============================================================

function updateTimer() {

    if (!timerDisplay) {

        return;

    }


    const minutes =
        Math.floor(
            gameTime / 60
        );


    const seconds =
        gameTime % 60;


    timerDisplay.textContent =
        `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;


    if (
        gameTime <= 10
    ) {

        timerDisplay.style.color =
            "#ff3333";

    }

    else {

        timerDisplay.style.color =
            "white";

    }

}


// ============================================================
// UI
// ============================================================

function updateDisplays() {

    scoreDisplay.textContent =
        score.toLocaleString();


    streakDisplay.textContent =
        streak;


    multiplierDisplay.textContent =
        `${getMultiplier().toFixed(1)}x`;


    levelDisplay.textContent =
        level;


    updateTimer();

    updateFindTimer();

    updateLevelProgress();

}


// ============================================================
// FEEDBACK
// ============================================================

function showFeedback(
    text,
    x,
    y
) {

    if (!feedback) {

        return;

    }


    const rect =
        gameArea.getBoundingClientRect();


    feedback.textContent =
        text;


    feedback.style.left =
        `${x - rect.left}px`;


    feedback.style.top =
        `${y - rect.top}px`;


    feedback.style.opacity =
        "1";


    feedback.style.transform =
        "translate(-50%, -50%) scale(1.3)";


    setTimeout(
        function() {

            feedback.style.opacity =
                "0";


            feedback.style.transform =
                "translate(-50%, -50%) scale(1)";

        },
        400
    );

}


// ============================================================
// END GAME
// ============================================================

function endGame() {

    if (!gameRunning) {

        return;

    }


    console.log("");
    console.log("================================================");
    console.log("🏁 GAME OVER");
    console.log("================================================");

    console.log(
        "Score:",
        score
    );

    console.log(
        "Watsons:",
        watsonsFound
    );

    console.log(
        "Best streak:",
        bestStreak
    );

    console.log(
        "Level:",
        level
    );


    gameRunning =
        false;


    clearInterval(gameTimer);

    clearInterval(findTimer);


    if (gameMusic) {

        gameMusic.pause();

    }


    watson.style.display =
        "none";


    const totalClicks =
        watsonsFound +
        wrongClicks;


    let accuracy =
        0;


    if (
        totalClicks > 0
    ) {

        accuracy =
            Math.round(
                (
                    watsonsFound /
                    totalClicks
                ) * 100
            );

    }


    finalScore.textContent =
        score.toLocaleString();

    finalWatsons.textContent =
        watsonsFound;

    finalBestStreak.textContent =
        bestStreak;

    finalAccuracy.textContent =
        `${accuracy}%`;

    finalLevel.textContent =
        level;


    // High score

    const oldHighScore =
        getHighScore();


    if (
        score >
        oldHighScore
    ) {

        console.log(
            "🏆 NEW HIGH SCORE!"
        );


        localStorage.setItem(
            "watsonHighScore",
            score
        );


        newHighScore.classList.remove(
            "hidden"
        );

    }

    else {

        newHighScore.classList.add(
            "hidden"
        );

    }


    updateHighScoreDisplays();


    gameScreen.classList.add(
        "hidden"
    );


    gameOverScreen.classList.remove(
        "hidden"
    );


    console.log(
        "✅ Game over screen displayed"
    );

}


// ============================================================
// HIGH SCORE
// ============================================================

function getHighScore() {

    return Number(
        localStorage.getItem(
            "watsonHighScore"
        ) || 0
    );

}


function updateHighScoreDisplays() {

    const highScore =
        getHighScore();


    if (menuHighScore) {

        menuHighScore.textContent =
            highScore.toLocaleString();

    }


    if (modalHighScore) {

        modalHighScore.textContent =
            highScore.toLocaleString();

    }

}


// ============================================================
// HIGH SCORE MODAL
// ============================================================

if (highScoreButton) {

    highScoreButton.addEventListener(
        "click",
        function() {

            console.log(
                "🏆 HIGH SCORE BUTTON"
            );


            updateHighScoreDisplays();


            highScoreModal.classList.remove(
                "hidden"
            );

        }
    );

}


if (closeHighScore) {

    closeHighScore.addEventListener(
        "click",
        function() {

            highScoreModal.classList.add(
                "hidden"
            );

        }
    );

}


if (modalPlayButton) {

    modalPlayButton.addEventListener(
        "click",
        function() {

            startGame();

        }
    );

}


if (highScoreModal) {

    highScoreModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                highScoreModal
            ) {

                highScoreModal.classList.add(
                    "hidden"
                );

            }

        }
    );

}


// ============================================================
// GAME BUTTONS
// ============================================================

if (playButton) {

    playButton.addEventListener(
        "click",
        function() {

            console.log(
                "▶️ PLAY CLICKED"
            );

            startGame();

        }
    );

}


if (playAgainButton) {

    playAgainButton.addEventListener(
        "click",
        function() {

            console.log(
                "🔄 PLAY AGAIN CLICKED"
            );

            startGame();

        }
    );

}


if (menuButton) {

    menuButton.addEventListener(
        "click",
        function() {

            console.log(
                "🏠 MENU CLICKED"
            );


            gameRunning =
                false;


            clearInterval(gameTimer);

            clearInterval(findTimer);


            if (gameMusic) {

                gameMusic.pause();

            }


            gameOverScreen.classList.add(
                "hidden"
            );

            gameScreen.classList.add(
                "hidden"
            );


            menuScreen.classList.remove(
                "hidden"
            );


            updateHighScoreDisplays();

        }
    );

}


// ============================================================
// LOCAL LEADERBOARD
// ============================================================

console.log("");
console.log("================================================");
console.log("🏆 LOCAL LEADERBOARD SYSTEM");
console.log("================================================");


const LEADERBOARD_STORAGE_KEY =
    "findWatsonLeaderboard";


function getLeaderboard() {

    console.log(
        "📦 Reading local leaderboard..."
    );


    const saved =
        localStorage.getItem(
            LEADERBOARD_STORAGE_KEY
        );


    if (!saved) {

        console.log(
            "ℹ️ No leaderboard exists yet"
        );

        return [];

    }


    try {

        const leaderboard =
            JSON.parse(saved);


        if (
            !Array.isArray(
                leaderboard
            )
        ) {

            console.warn(
                "⚠️ Leaderboard data wasn't an array"
            );

            return [];

        }


        console.log(
            "✅ Leaderboard loaded:",
            leaderboard
        );


        return leaderboard;

    }

    catch (error) {

        console.error(
            "❌ Could not parse leaderboard:",
            error
        );


        return [];

    }

}


// ============================================================
// SAVE LEADERBOARD
// ============================================================

function saveLeaderboard(
    leaderboard
) {

    console.log(
        "💾 Saving leaderboard:",
        leaderboard
    );


    localStorage.setItem(
        LEADERBOARD_STORAGE_KEY,
        JSON.stringify(
            leaderboard
        )
    );


    console.log(
        "✅ Leaderboard saved locally"
    );

}


// ============================================================
// GET DATE
// ============================================================

function getCurrentDate() {

    const now =
        new Date();


    const day =
        String(
            now.getDate()
        ).padStart(
            2,
            "0"
        );


    const month =
        String(
            now.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const year =
        now.getFullYear();


    return `${day}/${month}/${year}`;

}


// ============================================================
// OPEN LEADERBOARD
// ============================================================

if (leaderboardButton) {

    leaderboardButton.addEventListener(
        "click",
        function() {

            console.log("");
            console.log(
                "🏆 LEADERBOARD BUTTON CLICKED"
            );


            document
                .querySelectorAll(".screen")
                .forEach(
                    function(screen) {

                        screen.classList.add(
                            "hidden"
                        );

                    }
                );


            leaderboardScreen.classList.remove(
                "hidden"
            );


            loadLeaderboard();

        }
    );

}


// ============================================================
// BACK FROM LEADERBOARD
// ============================================================

if (leaderboardBackButton) {

    leaderboardBackButton.addEventListener(
        "click",
        function() {

            console.log(
                "← LEADERBOARD BACK CLICKED"
            );


            leaderboardScreen.classList.add(
                "hidden"
            );


            menuScreen.classList.remove(
                "hidden"
            );

        }
    );

}


// ============================================================
// LOAD / DISPLAY LEADERBOARD
// ============================================================

function loadLeaderboard() {

    console.log("");
    console.log(
        "📊 LOADING LOCAL LEADERBOARD"
    );


    if (!leaderboardList) {

        console.error(
            "❌ leaderboardList missing"
        );

        return;

    }


    const leaderboard =
        getLeaderboard();


    // Sort highest score first

    leaderboard.sort(
        function(a, b) {

            return b.score - a.score;

        }
    );


    // Save sorted version

    saveLeaderboard(
        leaderboard
    );


    leaderboardList.innerHTML =
        "";


    if (
        leaderboard.length === 0
    ) {

        leaderboardList.innerHTML = `

            <div class="leaderboard-empty">

                🏆 NO SCORES YET!

                <br><br>

                BE THE FIRST WATSON HUNTER!

            </div>

        `;


        console.log(
            "ℹ️ Leaderboard empty"
        );


        return;

    }


    const topTen =
        leaderboard.slice(
            0,
            10
        );


    console.log(
        "🏆 TOP 10:",
        topTen
    );


    topTen.forEach(
        function(player, index) {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "leaderboard-row";


            const rank =
                index + 1;


            row.innerHTML = `

                <div class="leaderboard-rank">
                    #${rank}
                </div>

                <div class="leaderboard-name">
                    ${escapeHTML(
                        player.name
                    )}
                </div>

                <div class="leaderboard-date">
                    ${escapeHTML(
                        player.date
                    )}
                </div>

                <div class="leaderboard-score">
                    ${Number(
                        player.score
                    ).toLocaleString()}
                </div>

            `;


            leaderboardList.appendChild(
                row
            );

        }
    );


    console.log(
        "✅ Leaderboard displayed"
    );

}


// ============================================================
// HTML ESCAPE
// ============================================================

function escapeHTML(text) {

    return String(text)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


// ============================================================
// ADD SCORE BUTTON
// ============================================================

if (addLeaderboardButton) {

    addLeaderboardButton.addEventListener(
        "click",
        function() {

            console.log("");
            console.log(
                "🏆 ADD TO LEADERBOARD CLICKED"
            );


            console.log(
                "Current score:",
                score
            );


            if (leaderboardScore) {

                leaderboardScore.textContent =
                    score.toLocaleString();

            }


            leaderboardNameInput.value =
                "";

            leaderboardNameError.textContent =
                "";


            leaderboardNameOverlay.classList.remove(
                "hidden"
            );


            setTimeout(
                function() {

                    leaderboardNameInput.focus();

                },
                100
            );

        }
    );


    console.log(
        "✅ Add leaderboard button ready"
    );

}


// ============================================================
// CANCEL SCORE
// ============================================================

if (cancelLeaderboardButton) {

    cancelLeaderboardButton.addEventListener(
        "click",
        function() {

            console.log(
                "❌ SCORE SUBMISSION CANCELLED"
            );


            leaderboardNameOverlay.classList.add(
                "hidden"
            );

        }
    );

}


// ============================================================
// SUBMIT SCORE
// ============================================================

if (submitLeaderboardButton) {

    submitLeaderboardButton.addEventListener(
        "click",
        submitLeaderboardScore
    );

}


// ============================================================
// ENTER KEY
// ============================================================

if (leaderboardNameInput) {

    leaderboardNameInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                submitLeaderboardScore();

            }

        }
    );

}


// ============================================================
// SUBMIT LEADERBOARD SCORE
// ============================================================

function submitLeaderboardScore() {

    console.log("");
    console.log("================================================");
    console.log("🏆 SUBMITTING LOCAL LEADERBOARD SCORE");
    console.log("================================================");


    const name =
        leaderboardNameInput.value.trim();


    console.log(
        "👤 Name entered:",
        name
    );

    console.log(
        "🎯 Score:",
        score
    );


    leaderboardNameError.textContent =
        "";


    // Name validation

    if (
        name.length < 2
    ) {

        console.warn(
            "❌ Name too short"
        );


        leaderboardNameError.textContent =
            "Please enter at least 2 characters.";


        return;

    }


    if (
        name.length > 20
    ) {

        console.warn(
            "❌ Name too long"
        );


        leaderboardNameError.textContent =
            "Name must be 20 characters or less.";


        return;

    }


    // Get existing leaderboard

    const leaderboard =
        getLeaderboard();


    // Check if same name already exists

    const existingIndex =
        leaderboard.findIndex(
            function(player) {

                return player.name.toLowerCase() ===
                    name.toLowerCase();

            }
        );


    console.log(
        "Existing player index:",
        existingIndex
    );


    // Existing player

    if (
        existingIndex !== -1
    ) {

        const existingScore =
            Number(
                leaderboard[
                    existingIndex
                ].score
            );


        console.log(
            "Existing score:",
            existingScore
        );


        if (
            score <=
            existingScore
        ) {

            console.log(
                "ℹ️ Existing score is higher/equal"
            );


            leaderboardNameError.textContent =
                `You already have a higher score: ${existingScore.toLocaleString()}`;


            return;

        }


        console.log(
            "🔥 New personal best!"
        );


        leaderboard[
            existingIndex
        ] = {

            name:
                name,

            date:
                getCurrentDate(),

            score:
                Number(score)

        };

    }

    else {

        console.log(
            "🆕 New leaderboard player"
        );


        leaderboard.push({

            name:
                name,

            date:
                getCurrentDate(),

            score:
                Number(score)

        });

    }


    // Sort

    leaderboard.sort(
        function(a, b) {

            return b.score - a.score;

        }
    );


    // Save

    saveLeaderboard(
        leaderboard
    );


    console.log(
        "✅ SCORE SAVED!"
    );


    // Find rank

    const rank =
        leaderboard.findIndex(
            function(player) {

                return (
                    player.name.toLowerCase() ===
                    name.toLowerCase()
                );

            }
        ) + 1;


    console.log(
        "🏆 Player rank:",
        rank
    );


    // Close prompt

    leaderboardNameOverlay.classList.add(
        "hidden"
    );


    // Show leaderboard

    document
        .querySelectorAll(".screen")
        .forEach(
            function(screen) {

                screen.classList.add(
                    "hidden"
                );

            }
        );


    leaderboardScreen.classList.remove(
        "hidden"
    );


    loadLeaderboard();

}


// ============================================================
// DEBUG COMMANDS
// ============================================================

// Open browser console and run:
//
// clearWatsonLeaderboard()
//
// to erase the local leaderboard.
//
// ============================================================

window.clearWatsonLeaderboard =
    function() {

        console.warn(
            "🗑️ CLEARING LOCAL LEADERBOARD..."
        );


        localStorage.removeItem(
            LEADERBOARD_STORAGE_KEY
        );


        console.log(
            "✅ Leaderboard cleared"
        );


        if (
            leaderboardScreen &&
            !leaderboardScreen.classList.contains(
                "hidden"
            )
        ) {

            loadLeaderboard();

        }

    };


// ============================================================
// DEBUG LEADERBOARD
// ============================================================

window.showWatsonLeaderboard =
    function() {

        console.log(
            "📊 CURRENT LEADERBOARD:"
        );

        console.table(
            getLeaderboard()
        );

    };


// ============================================================
// INITIALIZE
// ============================================================

console.log("");
console.log("================================================");
console.log("🔧 INITIALIZING FIND WATSON");
console.log("================================================");


updateHighScoreDisplays();


console.log(
    "🏆 Local high score:",
    getHighScore()
);


console.log(
    "🏆 Local leaderboard:",
    getLeaderboard()
);


console.log("");
console.log("================================================");
console.log("✅ FIND WATSON LOADED SUCCESSFULLY");
console.log("================================================");
console.log("");
