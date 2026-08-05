/* ==========================================
   ELEMENTS
========================================== */

const screens = document.querySelectorAll(".screen");

const intro = document.getElementById("intro");
const introText = document.getElementById("introText");

const site = document.getElementById("site");

const music = document.getElementById("music");
const musicControl = document.getElementById("musicControl");

const startBtn = document.getElementById("start");

const envelope = document.getElementById("envelope");

const letterText = document.getElementById("letterText");

const continueLetter = document.getElementById("continueLetter");

const ticket = document.getElementById("ticket");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const confirmDate = document.getElementById("confirmDate");


/* ==========================================
   INTRO TEXT
========================================== */

const introLines = [

"Иногда...",

"Я задумываюсь...",

"Почему...",

"Сколько бы\nмы ни переставали\nобщаться...",

"Жизнь...\nвсё равно\nснова\nсводит нас.",

"И если честно...",

"Я до сих пор\nне понял...", 

"Почему\nименно так.",

"Может быть...",

"Это просто\nсовпадение.",

"А может...",

"Некоторые встречи\nпроисходят\nне случайно.",

"За всё это время...",

"Ты научила меня\nмногому.",

"И я правда\nблагодарен тебе\nза это.",

"Есть вещи...",

"Которые сложно\nсказать\nобычным сообщением.",

"Поэтому...",

"Я решил\nсделать\nчто-то\nнемного другое.",

"Не просто\nнаписать тебе...", 

"А показать...", 

"То,\nо чём\nя давно\nдумал."

];


/* ==========================================
   LETTER
========================================== */

const letter=

`Привет, Настюш 🌸

Если честно...

Я долго думал,
как сделать что-нибудь,
что сможет подарить тебе улыбку.

И понял,
что обычного сообщения
будет недостаточно.

Поэтому решил
сделать для тебя
этот небольшой сайт.

Мне просто хотелось,
чтобы ты улыбнулась.

Если сейчас
ты улыбаешься...

значит,
всё было
не зря. ❤️`;


/* ==========================================
   HELPERS
========================================== */

function sleep(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}


/* ==========================================
   SHOW SCREEN
========================================== */

function showScreen(index){

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });

    screens[index].classList.add("active");

}


/* ==========================================
   START MUSIC
========================================== */

let musicStarted=false;

function playMusic(){

    if(musicStarted) return;

    musicStarted=true;

    music.volume=0;

    music.play().then(()=>{

        let volume=0;

        const fade=setInterval(()=>{

            volume+=0.02;

            music.volume=Math.min(volume,0.45);

            if(volume>=0.45){

                clearInterval(fade);

            }

        },120);

    }).catch(error=>{

        console.log("Музыка ждёт разрешения браузера");

    });

}


musicControl.onclick=()=>{

    if(music.paused){

        music.play();

    }else{

        music.pause();

    }

};


/* ==========================================
   INTRO
========================================== */

async function playIntro(){

    for(const line of introLines){

        introText.style.opacity = 0;

        await sleep(600);

        introText.innerHTML = line.replace(/\n/g,"<br>");

        introText.animate([
            {
                opacity:0,
                transform:"translateY(30px)",
                filter:"blur(10px)",
                offset:0
            },
            {
                opacity:1,
                transform:"translateY(0)",
                filter:"blur(0)",
                offset:0.15
            },
            {
                opacity:1,
                transform:"translateY(0)",
                filter:"blur(0)",
                offset:0.80
            },
            {
                opacity:0,
                transform:"translateY(-20px)",
                filter:"blur(8px)",
                offset:1
            }
        ],{
            duration:5555,
            easing:"ease-in-out",
            fill:"forwards"
        });

        await sleep(5555);

    }

    intro.style.opacity = "0";

    await sleep(1500);

    intro.remove();

    site.classList.remove("hidden");

    showScreen(0);

}


/* ==========================================
   START
========================================== */

window.onload=()=>{

    playIntro();

};


/* ==========================================
   START STORY
========================================== */

startBtn.onclick = () => {

    playMusic();

    showScreen(1);

};


/* ==========================================
   ENVELOPE
========================================== */

envelope.onclick=()=>{

    envelope.classList.add("open");

    setTimeout(()=>{

        showScreen(2);

        typeLetter();

    },1200);

};


/* ==========================================
   TYPE LETTER
========================================== */

async function typeLetter(){

    letterText.innerHTML="";

    for(const char of letter){

        letterText.innerHTML+=char;

        await sleep(30);

    }

    continueLetter.classList.add("show");

}
/* ==========================================
   CONTINUE AFTER LETTER
========================================== */

continueLetter.onclick = async () => {

    continueLetter.classList.remove("show");

    for (let i = 3; i <= 11; i++) {

        showScreen(i);

        await sleep(4200);

    }

    showScreen(12);

};


/* ==========================================
   TICKET
========================================== */

ticket.onclick = () => {

    ticket.classList.toggle("flip");

};


/* ==========================================
   NO BUTTON
========================================== */

let noCount = 0;

const noTexts = [

    "🤔 Подумаю",

    "Правда? 🥺",

    "Ну не мучай меня 😅",

    "Хахаха 😂",

    "Не поймаешь 😝",

    "Кажется,\nэта кнопка\nстесняется 🙈"

];

noBtn.onclick = () => {

    noCount++;

    if(noCount < noTexts.length){

        noBtn.innerHTML =
        noTexts[noCount];

    }

    const x =
    Math.random()*220-110;

    const y =
    Math.random()*140-70;

    noBtn.style.transform =
    `translate(${x}px,${y}px)`;

    if(noCount==2){

        createHearts(10);

    }

    if(noCount==4){

        yesBtn.animate([

            {
                transform:"scale(1)"
            },

            {
                transform:"scale(1.08)"
            },

            {
                transform:"scale(1)"
            }

        ],{

            duration:700,

            iterations:3

        });

    }

    if(noCount>=6){

        noBtn.innerHTML =
        "Ладно ❤️";

        noBtn.style.opacity=".6";

    }

};


/* ==========================================
   YES
========================================== */

yesBtn.onclick = () => {

    createHearts(35);

    createPetalExplosion();

    setTimeout(()=>{

        showScreen(13);

    },900);

};


/* ==========================================
   DATE
========================================== */

confirmDate.onclick = () => {

    createHearts(60);

    createPetalExplosion();

    setTimeout(()=>{

        showScreen(13);

    },1000);

};


/* ==========================================
   PETALS
========================================== */

const petals =
document.getElementById("petals");

function createPetal(){

    const petal =
    document.createElement("div");

    petal.className="petal";

    petal.innerHTML="🌸";

    petal.style.left =
    Math.random()*100+"%";

    petal.style.animationDuration =
    (8+Math.random()*8)+"s";

    petal.style.fontSize =
    (14+Math.random()*18)+"px";

    petals.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },17000);

}

setInterval(()=>{

    createPetal();

},220);


/* ==========================================
   PETAL EXPLOSION
========================================== */

function createPetalExplosion(){

    for(let i=0;i<50;i++){

        setTimeout(()=>{

            createPetal();

        },i*25);

    }

}
/* ==========================================
   HEARTS
========================================== */

const hearts =
document.getElementById("hearts");

function createHeart(){

    const heart =
    document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left =
    Math.random()*100+"%";

    heart.style.animationDuration =
    (2+Math.random()*2)+"s";

    heart.style.fontSize =
    (18+Math.random()*24)+"px";

    hearts.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },4000);

}

function createHearts(count){

    for(let i=0;i<count;i++){

        setTimeout(()=>{

            createHeart();

        },i*70);

    }

}

/* ==========================================
   SPARKLES
========================================== */

const sparkles =
document.getElementById("sparkles");

function createSparkle(){

    const spark =
    document.createElement("div");

    spark.className="sparkle";

    spark.style.left =
    Math.random()*100+"%";

    spark.style.top =
    Math.random()*100+"%";

    spark.style.animationDuration =
    (2+Math.random()*2)+"s";

    sparkles.appendChild(spark);

    setTimeout(()=>{

        spark.remove();

    },3000);

}

setInterval(()=>{

    createSparkle();

},350);

/* ==========================================
   STARS
========================================== */

const stars =
document.getElementById("stars");

for(let i=0;i<35;i++){

    const star =
    document.createElement("div");

    star.className="star";

    star.innerHTML="✦";

    star.style.left =
    Math.random()*100+"%";

    star.style.top =
    Math.random()*100+"%";

    star.style.animationDelay =
    Math.random()*3+"s";

    star.style.fontSize =
    (6+Math.random()*10)+"px";

    stars.appendChild(star);

}

/* ==========================================
   PARALLAX
========================================== */

document.addEventListener("mousemove",e=>{

    const x =
    (e.clientX/window.innerWidth-.5)*20;

    const y =
    (e.clientY/window.innerHeight-.5)*20;

    document.body.style.backgroundPosition =
    `${x}px ${y}px`;

});

/* ==========================================
   FINAL EFFECT
========================================== */

function finalAnimation(){

    createHearts(80);

    createPetalExplosion();

    for(let i=0;i<50;i++){

        setTimeout(()=>{

            createSparkle();

        },i*80);

    }

}

/* ==========================================
   FINAL SCREEN
========================================== */

const observer =
new MutationObserver(()=>{

    if(screens[11].classList.contains("active")){

        finalAnimation();

    }

});

observer.observe(

    screens[11],

    {

        attributes:true,

        attributeFilter:["class"]

    }

);

/* ==========================================
   KEYBOARD
========================================== */

document.addEventListener("keydown",e=>{

    if(e.code==="Space"){

        e.preventDefault();

        if(music.paused){

            music.play();

        }else{

            music.pause();

        }

    }

});

/* ==========================================
   AUTO PETALS
========================================== */

setInterval(()=>{

    if(Math.random()>0.35){

        createPetal();

    }

},500);

/* ==========================================
   RESIZE
========================================== */

window.addEventListener("resize",()=>{

    noBtn.style.transform="translate(0,0)";

});

/* ==========================================
   END
========================================== */

console.log(
"🌸 Маленькая история загружена ❤️"
);