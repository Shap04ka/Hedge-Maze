//world variables
var deg = Math.PI/180;
var collectedCoins = 0;
var collectedKeys = 0;

function player(x,y,z,rx,ry){
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = rx;
    this.ry = ry;
}

var map = [
    // skybox and walls
    [0, -2500, 0, 90, 0, 0, 10000, 10000, "Patterns/sky.jpg"],   
    [0, 0, -5000, 0, 0, 0, 10000, 10000, "Patterns/sky.jpg"], 
    [0, 0, 5000, 0, 180, 0, 10000, 10000, "Patterns/sky.jpg"], 
    [5000, 0, 0, 0, 270, 0, 10000, 10000, "Patterns/sky.jpg"],
    [-5000, 0, 0, 0, 90, 0, 10000, 10000, "Patterns/sky.jpg"], 
    [0, 5000, 0, 90, 0, 0, 10000, 10000, "#101010"],                 

    [0, 0, -2500, 0, 0, 0, 5000, 200, "Patterns/brick.jpg", 0.5],   
    [0, 0, 2500, 0, 0, 0, 5000, 200, "Patterns/brick.jpg"], 
    [2500, 0, 0, 0, 90, 0, 5000, 200, "Patterns/brick.jpg"],         
    [-2500, 0, 0, 0, 90, 0, 5000, 200, "Patterns/brick.jpg"],     
    
    // floor
    [0, 100, 0, 90, 0, 0, 5000, 5000, "#6d5239"],
    
    // corridors
    [-1800, 0, -1800, 0, 0, 0, 1200, 200, "Patterns/hedge.jpg"],
    [0, 0, -1800, 0, 0, 0, 1200, 200, "Patterns/hedge.jpg"],
    [1800, 0, -1800, 0, 0, 0, 1200, 200, "Patterns/hedge.jpg"],
    
    [-1200, 0, -1200, 0, 0, 0, 600, 200, "Patterns/hedge.jpg"],
    [1200, 0, -1200, 0, 0, 0, 600, 200, "Patterns/hedge.jpg"],
    
    [-600, 0, -600, 0, 0, 0, 1200, 200, "Patterns/hedge.jpg"],
    [600, 0, -600, 0, 0, 0, 1200, 200, "Patterns/hedge.jpg"],
    
    [-1800, 0, 600, 0, 0, 0, 1200, 200, "Patterns/hedge.jpg"],
    [1800, 0, 600, 0, 0, 0, 1200, 200, "Patterns/hedge.jpg"],
    
    [-1200, 0, 1200, 0, 0, 0, 600, 200, "Patterns/hedge.jpg"],
    [0, 0, 1200, 0, 0, 0, 1200, 200, "Patterns/hedge.jpg"],
    [1200, 0, 1200, 0, 0, 0, 600, 200, "Patterns/hedge.jpg"],
    
    [-600, 0, 1800, 0, 0, 0, 1200, 200, "Patterns/hedge.jpg"],
    [600, 0, 1800, 0, 0, 0, 1200, 200, "Patterns/hedge.jpg"],

    [-1800, 0, -1200, 0, 90, 0, 1200, 200, "Patterns/hedge.jpg"],
    [-1200, 0, -1800, 0, 90, 0, 1200, 200, "Patterns/hedge.jpg"],
    [1200, 0, -1800, 0, 90, 0, 1200, 200, "Patterns/hedge.jpg"],
    [1800, 0, -1200, 0, 90, 0, 1200, 200, "Patterns/hedge.jpg"],
    
    [-600, 0, -600, 0, 90, 0, 1200, 200, "Patterns/hedge.jpg"],
    [600, 0, -600, 0, 90, 0, 1200, 200, "Patterns/hedge.jpg"],
    
    [-1800, 0, 0, 0, 90, 0, 1200, 200, "Patterns/hedge.jpg"],
    [1800, 0, 0, 0, 90, 0, 1200, 200, "Patterns/hedge.jpg"],
    
    [-1200, 0, 600, 0, 90, 0, 1200, 200, "Patterns/hedge.jpg"],
    [1200, 0, 600, 0, 90, 0, 1200, 200, "Patterns/hedge.jpg"],
    
    [-600, 0, 1200, 0, 90, 0, 1200, 200, "Patterns/hedge.jpg"],
    [600, 0, 1200, 0, 90, 0, 1200, 200, "Patterns/hedge.jpg"],
    
    [-1800, 0, 1800, 0, 90, 0, 1200, 200, "Patterns/hedge.jpg"],
    [1800, 0, 1800, 0, 90, 0, 1200, 200, "Patterns/hedge.jpg"],

    // starting house
    [0, 0, 400, 0, 0, 0, 800, 200, "#3A3A3A"],   
    [-400, 0, 0, 0, 90, 0, 800, 200, "#3A3A3A"],   
    [400, 0, 0, 0, 90, 0, 800, 200, "#3A3A3A"],   
    [-250, 0, -400, 0, 0, 0, 300, 200, "#3A3A3A"],
    [250, 0, -400, 0, 0, 0, 300, 200, "#3A3A3A"],
    [0, -100, 0, 90, 0, 0, 800, 800, "#1A1A1A"]   
];

var coins = [
    [1500, 30, -1500, 0, 0, 0, 50, 50, "Patterns/boquet.png"],
    [-1500, 30, -1500, 0, 0, 0, 50, 50, "Patterns/boquet.png"],
    [0, 30, -2150, 0, 0, 0, 50, 50, "Patterns/boquet.png"],
    [-2100, 30, 1200, 0, 0, 0, 50, 50, "Patterns/boquet.png"],
    [2100, 30, 1200, 0, 0, 0, 50, 50, "Patterns/boquet.png"],
    [0, 30, 300, 0, 0, 0, 50, 50, "Patterns/boquet.png"]
];

var keys = [
    [-1500, 30, -2150, 0, 0, 0, 50, 50, "Patterns/sapling.png"],
    [1500, 30, -2150, 0, 0, 0, 50, 50, "Patterns/sapling.png"],
    [-900, 30, 0, 0, 0, 0, 50, 50, "Patterns/sapling.png"],
    [900, 30, 0, 0, 0, 0, 50, 50, "Patterns/sapling.png"],
    [-1500, 30, 2150, 0, 0, 0, 50, 50, "Patterns/sapling.png"],
    [1500, 30, 2150, 0, 0, 0, 50, 50, "Patterns/sapling.png"]
];

// Pristine copies of the collectible layouts, used to restore them on reset
var initialCoins = JSON.parse(JSON.stringify(coins));
var initialKeys = JSON.parse(JSON.stringify(keys));
    
//variables for movement
var PressLeft = 0;
var PressRight = 0;
var PressForward = 0;
var PressBack = 0;
var PressUp = 0;
var MouseX = 0;
var MouseY = 0;
var lock = false;

var container = document.getElementById("container");

// Глобальные переменные звуков и игрового интервала
var coinSound = null;
var keySound = null;
var gameInterval = null; 

//when the key is pressed
document.addEventListener("keydown", (event) => {
    if (event.key == "a"){ PressLeft = 1; }
    if (event.key == "d"){ PressRight = 1; }
    if (event.key == "w"){ PressForward = 5; }
    if (event.key == "s"){ PressBack = 1; }
    if (event.keyCode == 32){ PressUp = 1; }
});

document.addEventListener("DOMContentLoaded", function() {
    var menu1 = document.getElementById("menu1");
    var menu2 = document.getElementById("menu2");
    var menu3 = document.getElementById("menu3");
    var btnStart = document.getElementById("button1");
    var btnInstruction = document.getElementById("button2");
    var btnBack = document.getElementById("button3");
    var btnPlayAgain = document.getElementById("button4");

    btnStart.onclick = function(e) {
        menu1.style.display = "none";
        e.stopPropagation(); 
        
        if (!coinSound) {
            coinSound = new Audio("Patterns/flap.mp3");
            keySound = new Audio("Patterns/shovel.mp3");
            coinSound.volume = 0.5;
            keySound.volume = 0.5;
        }

        if(!gameInterval) {
            gameInterval = setInterval(Repeat, 10);
        }
    };

    btnInstruction.onclick = function(e) {
        menu1.style.display = "none";
        menu2.style.display = "block";
        e.stopPropagation();
    };

    btnBack.onclick = function(e) {
        menu2.style.display = "none";
        menu1.style.display = "block";
        e.stopPropagation();
    };

    btnPlayAgain.onclick = function(e) {
        e.stopPropagation();
        resetGame();
        menu3.style.display = "none";

        if (!gameInterval) {
            gameInterval = setInterval(Repeat, 10);
        }
    };
});

//if the key is released
document.addEventListener("keyup", (event) => {
    if (event.key == "a"){ PressLeft = 0; }
    if (event.key == "d"){ PressRight = 0; }
    if (event.key == "w"){ PressForward = 0; }
    if (event.key == "s"){ PressBack = 0; }
    if (event.keyCode == 32){ PressUp = 0; }
});

//if the mouse is pressed
container.onclick = function(){
    container.requestPointerLock();
}

//locked mouse listener
document.addEventListener("pointerlockchange", (event) => {
    lock = !lock;
})

//mouse movement listener
document.addEventListener("mousemove", (event) => {
    MouseX = event.movementX;
    MouseY = event.movementY;
})

var pawn = new player(0,0,0,0,0);
var world = document.getElementById("world");

function update(){
    // 1. Расчет желаемого смещения
    dx = (PressRight - PressLeft) * Math.cos(pawn.ry * deg) - (PressForward - PressBack) * Math.sin(pawn.ry * deg);
    dz = -(PressRight - PressLeft) * Math.sin(pawn.ry * deg) - (PressForward - PressBack) * Math.cos(pawn.ry * deg);
    dy = -PressUp;
    drx = MouseY * 0.5;
    dry = - MouseX * 0.5;
    MouseX = MouseY = 0;
    
    if (lock) {
        pawn.rx = pawn.rx + drx;
        pawn.ry = pawn.ry + dry;
    }
    
    // Уменьшенный радиус игрока (чтобы не застревать в узких дверях домика)
    var playerRadius = 20; 

    // 2. Проверка коллизии по оси X
    pawn.x += dx;
    for (let i = 0; i < map.length; i++) {
        // Пропускаем скайбокс, пол, потолок (все элементы, наклоненные по RotateX на 90 градусов)
        if (map[i][3] === 90 || map[i][3] === 270) continue; 
        
        if (checkWallCollision(pawn.x, pawn.z, map[i], playerRadius)) {
            pawn.x -= dx; // Отмена шага по X
            break;
        }
    }

    // 3. Проверка коллизии по оси Z
    pawn.z += dz;
    for (let i = 0; i < map.length; i++) {
        // Точно так же пропускаем горизонтальные перекрытия (пол/потолок)
        if (map[i][3] === 90 || map[i][3] === 270) continue;
        
        if (checkWallCollision(pawn.x, pawn.z, map[i], playerRadius)) {
            pawn.z -= dz; // Отмена шага по Z
            break;
        }
    }

    // Свободное перемещение по вертикали
    pawn.y = pawn.y + dy;
    
    // Рендеринг трансформаций мира
    world.style.transform = "translateZ(600px)" + 
        "rotateX(" + (-pawn.rx) + "deg)" + 
        "rotateY(" + (-pawn.ry) + "deg)" + "translate3d(" + (-pawn.x) + "px," + (-pawn.y) + "px," + (-pawn.z) + "px)";
}

function checkWallCollision(px, pz, wall, radius) {
    var wx = wall[0];
    var wz = wall[2];
    var wRotY = wall[4];
    var wWidth = wall[6];
    
    // Минимальная толщина для плоской стены (всего 10 пикселей барьера)
    var wallThickness = 10; 

    // Горизонтальные стены лабиринта (RotateY = 0)
    if (wRotY === 0 || wRotY === 180) {
        var minX = wx - wWidth / 2 - radius;
        var maxX = wx + wWidth / 2 + radius;
        var minZ = wz - wallThickness - radius;
        var maxZ = wz + wallThickness + radius;
        
        return (px > minX && px < maxX && pz > minZ && pz < maxZ);
    }
    
    // Вертикальные стены лабиринта (RotateY = 90)
    if (wRotY === 90 || wRotY === 270) {
        var minX = wx - wallThickness - radius;
        var maxX = wx + wallThickness + radius;
        var minZ = wz - wWidth / 2 - radius;
        var maxZ = wz + wWidth / 2 + radius;
        
        return (px > minX && px < maxX && pz > minZ && pz < maxZ);
    }

    return false;
}

function CreateNewWorld(){
    CreateSquares(map,map);
}

function CreateSquares(squares,string){
    for(let i = 0; i < squares.length; i++){
        let newElement = document.createElement("div");
        newElement.className = string + " square";
        newElement.id = string + i;
        newElement.style.width = squares[i][6] + "px";
        newElement.style.height = squares[i][7] + "px";
        newElement.style.background = squares[i][8];
        newElement.style.backgroundImage = "url(" + squares[i][8] + ")";
        if(squares[i][9] !== undefined) {
            newElement.style.opacity = squares[i][9];
        }
        newElement.style.transform =
            "translate3d(" + (600 - squares[i][6]/2 + squares[i][0]) + "px," +
            (400 - squares[i][7]/2 + squares[i][1]) + "px," + 
            squares[i][2] + "px)" + 
            "rotateX(" + squares[i][3] + "deg)" + 
            "rotateY(" + squares[i][4] + "deg)" + 
            "rotateZ(" + squares[i][5] + "deg)";
            
        world.append(newElement);
    }
}

function interact(squares, string, objectSound){
    if (!objectSound) return; 
    
    for (i = 0; i < squares.length; i++){
        let dis = (squares[i][0] - pawn.x)**2 + (squares[i][1] - pawn.y)**2 + (squares[i][2] - pawn.z)**2;
        let is = (squares[i][6])**2;
        
        if (dis < is){
            objectSound.currentTime = 0;
            objectSound.play().catch(function(error) {
                console.log("Ошибка воспроизведения:", error);
            });

            document.getElementById(string + i).style.display = "none";
            squares[i][1] = 1000000;
            
            if (string === "coin") {
                collectedCoins++;
                document.getElementById("coin-count").innerText = collectedCoins;
            } else if (string === "key") {
                collectedKeys++;
                document.getElementById("key-count").innerText = collectedKeys;

                if (collectedKeys === keys.length) {
                    winGame();
                }
            }
        }
    }
}

function rotate(squares,string,ra){
    for (i = 0; i < squares.length; i++){
        squares[i][4] = squares[i][4] + ra;
        let el = document.getElementById(string + i);
        if(el) {
            el.style.transform = "translate3d(" + (600 - squares[i][6]/2 + squares[i][0]) + "px," +
                (400 - squares[i][7]/2 + squares[i][1]) + "px," + 
                squares[i][2] + "px)" + 
                "rotateX(" + squares[i][3] + "deg)" + 
                "rotateY(" + squares[i][4] + "deg)" + 
                "rotateZ(" + squares[i][5] + "deg)";
        }
    }
}

function winGame(){
    clearInterval(gameInterval);
    gameInterval = null;

    if (lock) {
        document.exitPointerLock();
    }

    document.getElementById("menu3").style.display = "flex";
}

function refreshSquareElement(squares, string, i){
    let el = document.getElementById(string + i);
    if(!el) return;
    el.style.display = "";
    el.style.transform =
        "translate3d(" + (600 - squares[i][6]/2 + squares[i][0]) + "px," +
        (400 - squares[i][7]/2 + squares[i][1]) + "px," +
        squares[i][2] + "px)" +
        "rotateX(" + squares[i][3] + "deg)" +
        "rotateY(" + squares[i][4] + "deg)" +
        "rotateZ(" + squares[i][5] + "deg)";
}

function resetGame(){
    // Reset player to the starting position/orientation
    pawn.x = 0; pawn.y = 0; pawn.z = 0;
    pawn.rx = 0; pawn.ry = 0;
    world.style.transform = "translateZ(600px)rotateX(0deg)rotateY(0deg)translate3d(0px,0px,0px)";

    // Reset counters
    collectedCoins = 0;
    collectedKeys = 0;
    document.getElementById("coin-count").innerText = collectedCoins;
    document.getElementById("key-count").innerText = collectedKeys;

    // Restore collectible layouts and put their elements back on screen
    coins = JSON.parse(JSON.stringify(initialCoins));
    keys = JSON.parse(JSON.stringify(initialKeys));
    for (let i = 0; i < coins.length; i++) refreshSquareElement(coins, "coin", i);
    for (let i = 0; i < keys.length; i++) refreshSquareElement(keys, "key", i);
}

CreateNewWorld();
CreateSquares(coins,"coin");
CreateSquares(keys,"key");

function Repeat(){
    update();
    interact(coins,"coin",coinSound);
    interact(keys,"key",keySound);
    rotate(coins,"coin",0.5);
    rotate(keys,"key",0.5);
}