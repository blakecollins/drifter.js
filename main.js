var x = document.getElementById('bg').offsetWidth;
var y = document.getElementById('bg').offsetHeight;
var i = 0;
var j = 0;
var spriteArray = [];
var animations = ['animationOne', 'animationTwo', 'animationThree', 'animationFour', 'animationFive'];
var animationDirections = ['still', 'up', 'down', 'left', 'right'];

function randomNumberX(x) {
    return Math.floor(Math.random() * x);
}

function randomNumberY(y) {
    return Math.floor(Math.random() * y);
}

function randomSize() {
    return Math.floor((Math.random() * 18) + 4);
}
function randomizer(value) {
    return Math.floor(Math.random() * value);
}

function randomQuandrants() {
    var quadrantArray = [];
    quadrantArray.push(Math.round(Math.random()));
    quadrantArray.push(Math.floor(Math.random() * (4 - 2) + 2));
    if(quadrantArray[0] === quadrantArray[1]) {
    	quadrantArray = randomQuandrants();
    }
    return quadrantArray;
}

function particleGenerator(size, x, y, quads) {
	console.log(quads)
    var particle = document.createElement("div");
    var animation = animations[randomizer(animations.length)];
    console.log(animation);
    particle.style.height = size + "px";
    particle.style.width = size + "px";
    particle.style.top = ((quads.filter(function(number){ return number === 0}).length > 0) ? y  + "px" : "unset");
    particle.style.right = ((quads.filter(function(number){ return number === 2}).length > 0) ? x  + "px" : "unset");
    particle.style.bottom = ((quads.filter(function(number){ return number === 1}).length > 0) ? y  + "px" : "unset");
    particle.style.left = ((quads.filter(function(number){ return number === 3}).length > 0) ? x  + "px" : "unset");
    particle.id = Date.now() + randomizer(x) + randomizer(y);
    particle.moveTop = randomizer(y) + "px";
    particle.moveRight = randomizer(x) + "px";
    particle.moveBottom = randomizer(y) + "px";
    particle.moveLeft = randomizer(x) + "px";
    particle.className = "particle " + animation;
    // console.log(particle.style.top, particle.style.right, particle.style.bottom, particle.style.left);
    // console.log(particle.style);
    return particle;
}

function arrayFillter() {
    var spriteArray = []
    for (var s = 0; s < 300; s++) {
        spriteArray.push(particleGenerator(randomSize(), randomizer(x), randomizer(y), randomQuandrants()))
    };
    return spriteArray;
}

function documentAppender(sprites) {
    var spriteIndex = randomizer(200);
    var sprite = sprites[spriteIndex];
    document.getElementById('bg').appendChild(sprite);
}

function spriteAnimator(sprite) {
    var id = sprite.id;
    setTimeout(function() {
        document.getElementById(id).style.top = sprite.moveTop;
        document.getElementById(id).style.bottom = sprite.moveBottom;
        document.getElementById(id).style.left = sprite.moveLeft;
        document.getElementById(id).style.right = sprite.moveRight;
    }, 100)
}


function spritePicker() {
    var spriteJar = arrayFillter();
    for (j; j < 100000; j++) {
        setTimeout(function() {
            documentAppender(spriteJar);
        }, 100 * j);
    }
}

spritePicker();