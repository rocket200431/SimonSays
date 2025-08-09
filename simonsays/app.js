let game = [];
let user = [];

let start = false;
let level = 0;

let btnColors = ["yellow", "green", "red", "purple"];


document.body.addEventListener('keypress', function () {
    if (!start) {
        start = true;
        levelup();
    }
});

function levelup() {
    user = []; // reset user input for the new level
    level++;
    document.querySelector('h2').textContent = `Level ${level}`;

    let btnIdx = Math.floor(Math.random() * 4);
    let randClr = btnColors[btnIdx];
    game.push(randClr);
    flashSequence();
}

function flashSequence() {
    let i = 0;

    let interval = setInterval(() => {
        if (i >= game.length) {
            clearInterval(interval);
            return;
        }

        let clr = game[i];
        let btn = document.querySelector("." + clr);
        btn.classList.add("flash");
        setTimeout(() => {
            btn.classList.remove("flash");
        }, 100);

        i++;
    }, 500);
}

function btnFlash(clr) {
    let btn = document.querySelector("." + clr);
    btn.classList.add("pressed");
    setTimeout(() => {
        btn.classList.remove("pressed");
    }, 100);
}

// Handle button clicks
let allBtns = document.querySelectorAll('.btn');

for (let btn of allBtns) {
    btn.addEventListener('click', function () {
        let clickedColor = btn.classList[1]; // red, green, etc.
        user.push(clickedColor);

        btnFlash(clickedColor);

        // Check user input step-by-step
        let idx = user.length - 1;
        if (user[idx] !== game[idx]) {
            // Wrong answer
           
            setTimeout(()=>{
                document.querySelector('h2').innerHTML = `Game Over! Your score is : ${level} <br>Tap to restart`;
                document. body.classList.add('game-over');
                setTimeout(() => {
                document.body.classList.remove("game-over");
                  }, 100);

                 startOver();
            },500)
           
        } else {
            if (user.length === game.length) {
                // Right full sequence
                setTimeout(() => {
                    levelup();
                }, 1000);
            }
        }
    });
}

function startOver() {
    game = [];
    user = [];
    start = false;
    level = 0;
}
