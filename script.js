var mouse = document.getElementById("mouse");
var start = false;
var timer = 0;
var checka = false;
var checkb = false;
var checkc = false;
var checkd = false;
var checke = false;
var t = document.getElementById("timer");
t.innerHTML = "0.000";
var help = document.getElementById("help");
help.innerHTML = "Click to start the game. Herd the Squares to the goal using your mouse. Try to finish as fast as possible. If 3 get close to each other they will form a mob and ignore your mouse for 5 seconds. Works best in fullscreen";
var win = document.getElementById("win");

var blocka = document.getElementById("block1");
blocka.style.left = '' + (screen.width/2+150) + 'px';
blocka.style.top = '' + screen.height/4 + 'px';
var a = {
  direction: "right", 
  mobtimer: 0
};

var blockb = document.getElementById("block2");
blockb.style.left = '' + (screen.width*3/4+150) + 'px';
blockb.style.top = '' + screen.height/4 + 'px';
var b = {
  direction: "right",
  mobtimer: 0
};

var blockc = document.getElementById("block3");
blockc.style.left = '' + (screen.width*5/8+150) + 'px';
blockc.style.top = '' + screen.height/2 + 'px';
var c = {
  direction: "right",
  mobtimer: 0
};

var blockd = document.getElementById("block4");
blockd.style.left = '' + (screen.width/2+150) + 'px';
blockd.style.top = '' + (screen.height*3/4) + 'px';
var d = {
  direction: "right",
  mobtimer: 0
};

var blocke = document.getElementById("block5");
blocke.style.left = '' + (screen.width*3/4+150) + 'px';
blocke.style.top = '' + (screen.height*3/4) + 'px';
var e = {
  direction: "right",
  mobtimer: 0
};

var leftgoal = document.getElementById("leftgoal");
var gc = {goalcounter: 4};

var blockaX = parseInt(blocka.style.left);
var blockaY = parseInt(blocka.style.top);
var blockbX = parseInt(blockb.style.left);
var blockbY = parseInt(blockb.style.top);
var blockcX = parseInt(blockc.style.left);
var blockcY = parseInt(blockc.style.top);
var blockdX = parseInt(blockc.style.left);
var blockdY = parseInt(blockc.style.top);
var blockeX = parseInt(blockc.style.left);
var blockeY = parseInt(blockc.style.top);

function mouse_position(e) {
  mouse.style.left = '' + (e.clientX-25) + 'px';
  mouse.style.top = '' + (e.clientY-40) + 'px';
}

document.onclick = function start_game() {
  start = true;
  console.log("h");
}

function update_timer() {
  t.innerHTML = ((Date.now()-timer)/1000).toFixed(3);
}

function run(block1, x) {
  var mLeft = parseInt(mouse.style.left);
  var mTop = parseInt(mouse.style.top);
  var bLeft = parseInt(block1.style.left);
  var bTop = parseInt(block1.style.top);

  if(mLeft-bLeft >= -75 && mLeft-bLeft < 0 && mTop-bTop >= -90 && mTop-bTop <= 65) {
    block1.style.left = '' + (bLeft + 5) + 'px';
    if(x.direction == "up") {
      x.direction = "upright";
    } else if(x.direction == "down") {
      x.direction = "downright";
    } else x.direction = "right";
  }
  if(mLeft-bLeft > 0 && mLeft-bLeft <= 75 && mTop-bTop >= -90 && mTop-bTop <= 65) {
    block1.style.left = '' + bLeft - 5 + 'px';
    if(x.direction == "up") {
      x.direction = "upleft";
    } else if(x.direction == "down") {
      x.direction = "downleft";
    } else x.direction = "left";
  }
  
  if(mTop-bTop >= -100 && mTop-bTop < 0 && mLeft-bLeft >= -65 && mLeft-bLeft <= 65) {
    block1.style.top = '' + (bTop + 5) + 'px';
    if(x.direction == "right") {
      x.direction = "downright";
    } else if(x.direction == "left") {
      x.direction = "downleft";
    } else x.direction = "down";
  }
  if(mTop-bTop > 0 && mTop-bTop <= 75 && mLeft-bLeft >= -65 && mLeft-bLeft <= 65) {
    block1.style.top = '' + bTop - 5 + 'px';
    if(x.direction == "right") {
      x.direction = "upright";
    } else if(x.direction == "left") {
      x.direction = "upleft";
    } else x.direction = "up";
  }
}

function auto_move(block1, x) {
  var bLeft = parseInt(block1.style.left);
  var bTop = parseInt(block1.style.top);
  if(bTop < 0) {
    bTop = 0;
    x.direction = "down";
  }
  else if(bTop > (screen.height-50)) {
    bTop = screen.height-50; 
    x.direction = "up";
  }
  if(bLeft < 0) {
    bLeft = 0;
    x.direction = "right";
  }
  else if(bLeft > screen.width-50) {
    bLeft = screen.width-50;
    x.direction = "left";
  }
  
  if(x.direction == "up") {
    block1.style.top = '' + bTop - 4 + 'px';
  } else if(x.direction == "upright") {
    block1.style.top = '' + bTop - 4 + 'px';
    block1.style.left = '' + (bLeft + 4) + 'px';
  } else if(x.direction == "upleft") {
    block1.style.top = '' + bTop - 4 + 'px';
    block1.style.left = '' + (bLeft - 4) + 'px';
  } else if(x.direction == "right") {
    block1.style.left = '' + (bLeft + 4) + 'px';
  } else if(x.direction == "left") {
    block1.style.left = '' + (bLeft - 4) + 'px';
  } else if(x.direction == "down") {
    block1.style.top = '' + (bTop + 4) + 'px';
  } else if(x.direction == "downright") {
    block1.style.top = '' + (bTop + 4) + 'px';
    block1.style.left = '' + (bLeft + 4) + 'px';
  } else if(x.direction == "downleft") {
    block1.style.top = '' + (bTop + 4) + 'px';
    block1.style.left = '' + (bLeft - 4) + 'px';
  }

  var random = parseInt(Math.random()*80);
  if(random == 1) {
    random = parseInt(Math.random()*12);
    if(random == 0) x.direction = "up";
    else if(random == 1) x.direction = "upright";
    else if(random == 2) x.direction = "upleft";
    else if(random == 3) x.direction = "right";
    else if(random == 4) x.direction = "down";
    else if(random == 5) x.direction = "downright";
    else if(random == 6) x.direction = "downleft";
    else if(random == 7) x.direction = "right";
    else if(random == 8) x.direction = "downright";
    else if(random == 9) x.direction = "upright";
    else if(random == 10) x.direction = "right";
    else if(random == 11) x.direction = "upright";
  }
}

function bounce(blockx, blocky, x, y) {
  var blockxX = parseInt(blockx.style.left);
  var blockxY = parseInt(blockx.style.top);
  var blockyX = parseInt(blocky.style.left);
  var blockyY = parseInt(blocky.style.top);

  if(blockxX-blockyX >= -50 && blockxX-blockyX < 0 && blockxY-blockyY >= -35 && blockxY-blockyY < 35) {
    x.direction = "left";
    y.direction = "right";
  } else if(blockxX-blockyX > 0 && blockxX-blockyX <= 50 && blockxY-blockyY >= -35 && blockxY-blockyY < 35) {
    x.direction = "right";
    y.direction = "left";
  }

  if(blockxY-blockyY >= -50 && blockxY-blockyY < 0 && blockxX-blockyX >= -35 && blockxX-blockyX < 35) {
    x.direction = "up";
    y.direction = "down";
  } else if(blockxY-blockyY > 0 && blockxY-blockyY <= 50 && blockxX-blockyX >= -35 && blockxX-blockyX < 35) {
    x.direction = "down";
    y.direction = "up";
  }
}

function mob(blockx, blocky, blockz, x, y, z) {
  var blockxX = parseInt(blockx.style.left);
  var blockxY = parseInt(blockx.style.top);
  var blockyX = parseInt(blocky.style.left);
  var blockyY = parseInt(blocky.style.top);
  var blockzX = parseInt(blockz.style.left);
  var blockzY = parseInt(blockz.style.top);

  if(blockxX-blockyX > -250 && blockxX-blockyX < 250 && blockxY-blockyY > -250 && blockxY-blockyY < 250 && blockxX-blockzX > -250 && blockxX-blockzX < 250 && blockxY-blockzY > -250 && blockxY-blockzY < 250 && blockyX-blockzX > -250 && blockyX-blockzX < 250 && blockyY-blockzY > -250 && blockyY-blockzY < 250) {
    x.mobtimer = Date.now()+5000;
    y.mobtimer = Date.now()+5000;
    z.mobtimer = Date.now()+5000;
  }
}

function updategoal(x) {
  x.goalcounter = x.goalcounter-1;
}

var checktostart = setInterval(function() {
  if(start) {
    clearInterval(checktostart);
    timer = Date.now();
    help.innerHTML = "";
    var timerinterval = setInterval(function() {update_timer()}, 1);
    
    var mobcheckabc = setInterval(function() {
      if(a.mobtimer-Date.now() <= 0 && b.mobtimer-Date.now() <= 0 && c.mobtimer-Date.now() <= 0) mob(blocka, blockb, blockc, a, b, c);
    }, 10);
    var mobcheckabd = setInterval(function() {
      if(a.mobtimer-Date.now() <= 0 && b.mobtimer-Date.now() <= 0 && d.mobtimer-Date.now() <= 0) mob(blocka, blockb, blockd, a, b, d);
    }, 10);
    var mobcheckacd = setInterval(function() {
      if(a.mobtimer-Date.now() <= 0 && c.mobtimer-Date.now() <= 0 && d.mobtimer-Date.now() <= 0) mob(blocka, blockc, blockd, a, c, d);
    }, 10);
    var mobcheckbcd = setInterval(function() {
      if(b.mobtimer-Date.now() <= 0 && c.mobtimer-Date.now() <= 0 && d.mobtimer-Date.now() <= 0) mob(blockb, blockc, blockd, b, c, d);
    }, 10);
    var mobcheckabe = setInterval(function() {
      if(a.mobtimer-Date.now() <= 0 && b.mobtimer-Date.now() <= 0 && e.mobtimer-Date.now() <= 0) mob(blocka, blockb, blocke, a, b, e);
    }, 10);
    var mobcheckace = setInterval(function() {
      if(a.mobtimer-Date.now() <= 0 && c.mobtimer-Date.now() <= 0 && e.mobtimer-Date.now() <= 0) mob(blocka, blockc, blocke, a, c, e);
    }, 10);
    var mobcheckade = setInterval(function() {
      if(a.mobtimer-Date.now() <= 0 && d.mobtimer-Date.now() <= 0 && e.mobtimer-Date.now() <= 0) mob(blocka, blockd, blocke, a, d, e);
    }, 10);
    var mobcheckbce = setInterval(function() {
      if(b.mobtimer-Date.now() <= 0 && c.mobtimer-Date.now() <= 0 && e.mobtimer-Date.now() <= 0) mob(blockb, blockc, blocke, b, c, e);
    }, 10);
    var mobcheckbde = setInterval(function() {
      if(b.mobtimer-Date.now() <= 0 && d.mobtimer-Date.now() <= 0 && e.mobtimer-Date.now() <= 0) mob(blockb, blockd, blocke, b, d, e);
    }, 10);
    var mobcheckcde = setInterval(function() {
      if(c.mobtimer-Date.now() <= 0 && d.mobtimer-Date.now() <= 0 && e.mobtimer-Date.now() <= 0) mob(blockc, blockd, blocke, c, d, e);
    }, 10);
  
    var runIntervala = setInterval(function() {
      if(a.mobtimer-Date.now() > 0) {
        blocka.style.background = "url(block2.png)";
      } else {
        run(blocka, a)
        blocka.style.background = "url(block1.png)";
      }
    }, 10);
    var moveIntervala = setInterval(function() {auto_move(blocka, a)}, 10);
    var runIntervalb = setInterval(function() {
      if(b.mobtimer-Date.now() > 0) {
        blockb.style.background = "url(block2.png)";
      } else {
        run(blockb, b)
        blockb.style.background = "url(block1.png)";
      }
    }, 10);
    var moveIntervalb = setInterval(function() {auto_move(blockb, b)}, 10);
    var runIntervalc = setInterval(function() {
      if(c.mobtimer-Date.now() > 0) {
        blockc.style.background = "url(block2.png)";
      } else {
        run(blockc, c)
        blockc.style.background = "url(block1.png)";
      }
    }, 10);
    var moveIntervalc = setInterval(function() {auto_move(blockc, c)}, 10);
    var runIntervald = setInterval(function() {
      if(d.mobtimer-Date.now() > 0) {
        blockd.style.background = "url(block2.png)";
      } else {
        run(blockd, d)
        blockd.style.background = "url(block1.png)";
      }
    }, 10);
    var moveIntervald = setInterval(function() {auto_move(blockd, d)}, 10);
    var runIntervale = setInterval(function() {
      if(e.mobtimer-Date.now() > 0) {
        blocke.style.background = "url(block2.png)";
      } else {
        run(blocke, e)
        blocke.style.background = "url(block1.png)";
      }
    }, 10);
    var moveIntervale = setInterval(function() {auto_move(blocke, e)}, 10);
  
    var bounceab = setInterval(function() {bounce(blocka, blockb, a, b)}, 10);
    var bounceac = setInterval(function() {bounce(blocka, blockc, a, c)}, 10);
    var bouncebc = setInterval(function() {bounce(blockb, blockc, b, c)}, 10);
    var bouncead = setInterval(function() {bounce(blocka, blockd, a, d)}, 10);
    var bouncebd = setInterval(function() {bounce(blockb, blockd, b, d)}, 10);
    var bouncecd = setInterval(function() {bounce(blockc, blockd, c, d)}, 10);
    var bounceae = setInterval(function() {bounce(blocka, blocke, a, e)}, 10);
    var bouncebe = setInterval(function() {bounce(blockb, blocke, b, e)}, 10);
    var bouncece = setInterval(function() {bounce(blockc, blocke, c, e)}, 10);
    var bouncede = setInterval(function() {bounce(blockd, blocke, d, e)}, 10);
  
    var stopconda = setInterval(function() {
      blockaX = parseInt(blocka.style.left);
      blockaY = parseInt(blocka.style.top);
      if(blockaX < 300 && blockaX > 50 && blockaY < 500 && blockaY > 250) {
        checka = true;
        if(checka && checkb && checkc && checkd && checke) {
          clearInterval(timerinterval);
          win.innerHTML = "You Win!";
        }
        blocka.style.left = "75px";
        blocka.style.top = "275px";
        blocka.style.background = "url(block1.png)";
        clearInterval(mobcheckabc);
        clearInterval(mobcheckabd);
        clearInterval(mobcheckacd);
        clearInterval(mobcheckabe);
        clearInterval(mobcheckace);
        clearInterval(mobcheckade);
        clearInterval(bounceab);
        clearInterval(bounceac);
        clearInterval(bouncead);
        clearInterval(bounceae);
        updategoal(gc);
        clearInterval(runIntervala);
        clearInterval(moveIntervala);
        clearInterval(stopconda);
      }
    }, 10);
  
    var stopcondb = setInterval(function() {
      blockbX = parseInt(blockb.style.left);
      blockbY = parseInt(blockb.style.top);
      if(blockbX < 300 && blockbX > 50 && blockbY < 500 && blockbY > 250) {
        checkb = true;
        if(checka && checkb && checkc && checkd && checke) {
          clearInterval(timerinterval);
          win.innerHTML = "You Win!";
        }
        blockb.style.left = "275px";
        blockb.style.top = "275px";
        blockb.style.background = "url(block1.png)";
        clearInterval(mobcheckabc);
        clearInterval(mobcheckabd);
        clearInterval(mobcheckbcd);
        clearInterval(mobcheckabe);
        clearInterval(mobcheckbce);
        clearInterval(mobcheckbde);
        clearInterval(bounceab);
        clearInterval(bouncebc);
        clearInterval(bouncebd);
        clearInterval(bouncebe);
        updategoal(gc);
        clearInterval(runIntervalb);
        clearInterval(moveIntervalb);
        clearInterval(stopcondb);
      }
    }, 10);
  
    var stopcondc = setInterval(function() {
      blockcX = parseInt(blockc.style.left);
      blockcY = parseInt(blockc.style.top);
      if(blockcX < 300 && blockcX > 50 && blockcY < 500 && blockcY > 250) {
        checkc = true;
        if(checka && checkb && checkc && checkd && checke) {
          clearInterval(timerinterval);
          win.innerHTML = "You Win!";
        }
        blockc.style.left = "175px";
        blockc.style.top = "375px";
        blockc.style.background = "url(block1.png)";
        clearInterval(mobcheckabc);
        clearInterval(mobcheckacd);
        clearInterval(mobcheckbcd);
        clearInterval(mobcheckace);
        clearInterval(mobcheckbce);
        clearInterval(mobcheckcde);
        clearInterval(bounceac);
        clearInterval(bouncebc);
        clearInterval(bouncecd);
        clearInterval(bouncece);
        updategoal(gc);
        clearInterval(runIntervalc);
        clearInterval(moveIntervalc);
        clearInterval(stopcondc);
      }
    }, 10);
  
    var stopcondd = setInterval(function() {
      blockdX = parseInt(blockd.style.left);
      blockdY = parseInt(blockd.style.top);
      if(blockdX < 300 && blockdX > 50 && blockdY < 500 && blockdY > 250) {
        checkd = true;
        if(checka && checkb && checkc && checkd && checke) {
          clearInterval(timerinterval);
          win.innerHTML = "You Win!";
        }
        blockd.style.left = "75px";
        blockd.style.top = "475px";
        blockd.style.background = "url(block1.png)";
        clearInterval(mobcheckabd);
        clearInterval(mobcheckacd);
        clearInterval(mobcheckbcd);
        clearInterval(mobcheckade);
        clearInterval(mobcheckbde);
        clearInterval(mobcheckcde);
        clearInterval(bouncead);
        clearInterval(bouncebd);
        clearInterval(bouncecd);
        clearInterval(bouncede);
        updategoal(gc);
        clearInterval(runIntervald);
        clearInterval(moveIntervald);
        clearInterval(stopcondd);
      }
    }, 10);

    var stopconde = setInterval(function() {
      blockeX = parseInt(blocke.style.left);
      blockeY = parseInt(blocke.style.top);
      if(blockeX < 300 && blockeX > 50 && blockeY < 500 && blockeY > 250) {
        checke = true;
        if(checka && checkb && checkc && checkd && checke) {
          clearInterval(timerinterval);
          win.innerHTML = "You Win!";
        }
        blocke.style.left = "275px";
        blocke.style.top = "475px";
        blocke.style.background = "url(block1.png)";
        clearInterval(mobcheckabe);
        clearInterval(mobcheckace);
        clearInterval(mobcheckade);
        clearInterval(mobcheckbce);
        clearInterval(mobcheckbde);
        clearInterval(mobcheckcde);
        clearInterval(bounceae);
        clearInterval(bouncebe);
        clearInterval(bouncece);
        clearInterval(bouncede);
        updategoal(gc);
        clearInterval(runIntervale);
        clearInterval(moveIntervale);
        clearInterval(stopconde);
      }
    }, 10);
  }
}, 10);
