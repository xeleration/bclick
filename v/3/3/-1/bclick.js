
/*===========================================
	bClick - The Addicting b-Click-ing Game	
=============================================
	  Copyright Cameron Samuels 2012-2016
=============================================
	This code includes:
		-My own created code
		-Code from Stack overflow (not mine)
        -Code from W3Schools
        -Code from MDN
		-Code from random sites
		-Code from Cookie Clicker
		-And ideas from friends and family
=============================================
	Use this code at your own risk!
===========================================*/

//atob = base64 to normal, btoa = normal to base64

/*==============
	Variables
==============*/

//var points = localStorage.points;

var numbers = [
    "", "Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Centillion"
];

var sounds = {
    click : new Audio('https://playbclick.com/assets/wav/click.wav'),
    unlock : new Audio('https://playbclick.com/assets/wav/unlock.wav'),
    restart : new Audio('https://playbclick.com/assets/wav/restart.wav')
}

/*=====================
	Helper Functions
=====================*/

function web(url) { window.location = url; }

function id(id) { return document.getElementById(id); }

function cls(name) { return document.getElementsByClassName(name); }

function get(what) { return localStorage[what];; }

function set(what, value) {
	localStorage.setItem(what, value);
}

function add(what, amount) {
	return parseFloat(what) + parseFloat(amount);
}

function subtract(what, amount) {
	return what = parseFloat(what) - parseFloat(amount);
}

function format(what, way) {
    if (way == 0) { return toGiant(what); }
    else if (way == 1) { return Math.round(what).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
}

function toggle(current, first, second) {
    return current == first ? second : first;
}

function ask(text) { return confirm(text); }

function poof(string, what) {
    var reg = new RegExp(what, 'g');
    return string.replace(reg, '');
}

function timeSince(date) {
    // var seconds = Math.floor((new Date().getTime() - date) / 1000);
    // var interval = Math.floor(seconds / 31536000);

    // if (interval > 1) { return interval + " years"; }
    // interval = Math.floor(seconds / 2592000);
    // if (interval > 1) { return interval + " months"; }
    // interval = Math.floor(seconds / 86400);
    // if (interval > 1) { return interval + " days"; }
    // interval = Math.floor(seconds / 3600);
    // if (interval > 1) { return interval + " hours"; }
    // interval = Math.floor(seconds / 60);
    // if (interval > 1) { return interval + " minutes"; }
    // return Math.floor(seconds) + " seconds";
    return (subtract(new Date().getTime(), date) / 1000);
}

function full(elem) {
    var elem = id(elem);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
}

var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
    any: function() { return (isMobile.Android() || isMobile.iOS() || isMobile.Windows()); }
};

/*============
    Numbers
============*/

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}

var format = {
    commas : function(num) {
        var newNum = Math.round(num);
        newNum = newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return newNum;
    },
    eg : function(num) {
        var num = toFixed(parseFloat(num));
        var length = num.toString().length;
        length = length - 1;
        var string = "1";
        for (i = 0; i < length; i++) {
            string = string + "0"; 
        }
        return string;
    },
    erg : function(num) {
        var round = num.toString();
        round = round.charAt(0) + "." + round.charAt(1);
        round = Math.round(parseFloat(round));
        var length = num.toString().length;
        length = length - 1;
        var string = round;
        for (i = 0; i < length; i++) {
            string = string + "0"; 
        }
        return string;
    },
    giant : function(num) {
        num = Math.round(num);
        var EG = format.eg(num);
        var length = EG.toString().length - 1;
        var groups = (length / 3);
        if (groups.toString().indexOf(".666") != -1 || groups.toString().indexOf(".333") != -1) {
            var groups = Math.floor(groups);
        }
        EG = "1";
        for (i = 0; i < groups; i++) {
            EG += "000";
        }
        if (EG == "1" || numbers[groups] == undefined) {
            return num;
        }
        else if (numbers[groups] != undefined && EG != "1") {
            return (num / EG).toFixed(1) + " " + numbers[groups];
        }
    },
    base64 : function(string) {
        return btoa(string);
    }
};
// function gradual(value, to) {
//     var step = 1.2;
    
//     while(get(value) < to) {
//         set(value, Math.max(get(value) * step, to));
//         step += 0.1;
//     }
// }

/*=============
    General
=============*/

function hideMsg() {
    id("message").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function msg(title, text) {
    if (!Notification) {
        id("messageTitle").innerHTML = title;
        id("messageText").innerHTML = text;
        id("message").style.display = "block";
        setTimeout(hideMsg, 3000);
        return;
    }

    if (Notification.permission !== "granted") {
        id("messageTitle").innerHTML = title;
        id("messageText").innerHTML = text;
        id("message").style.display = "block";
        setTimeout(hideMsg, 3000);
        Notification.requestPermission();
    }
    else {
        var notification = new Notification(title, {
        icon: 'https://playbclick.com/icon.png',
        body: text,
        });
    }
}

// var msg = {
//     alert : function(title, text) {

//     },
//     confirm : function(title, text) {

//     },
//     prompt : function(title, text, placeholder) {
//         id("promptTitle").innerHTML = title;
//         id("promptText").innerHTML = text;
//         window.location.hash = 'prompt';
//         return id('promptInput').value;
//     }
// };

// function hideTut() {
//     id("tutorial").style.display = "none";
// }

// function tut(title, text) {
//     id("tutorialTitle").innerHTML = title;
//     id("tutorialText").innerHTML = text;
//     id("tutorial").style.display = "block";
// }

// var tutorial = {
//     start : function() {
//         tut("Welcome To bClick!", "Follow this tutorial to be successful in the bClick major!");
//     },
//     finish : function() {
//         hideTut();
//         id("body").style.opacity = "1";
//     },
//     steps : {
//         1 : { 
//             text : "This is your username. Choose one now and click change.",
//             object : "UsernameInput"
//         },
//         2 : {
//             text : "This is the unlock button. If you click it, you will be spending your points on a B. Unlock one now.",
//             object : "bUnlock"
//         },
//         3 : {
//             text : "This is the B. If you click it, you will get points. Click it now.",
//             object : "bButton"
//         },
//         4 : {
//             text : "This is the arrows. You can change which B to use. Change to the next B.",
//             object : "arrowGroup"
//         },
//         5 : {
//             text : "As you can see, you need 50 points to unlock it.",
//             object : "bUnlock"
//         },
//         6 : {
//             text : "Lets get more points by clicking the previous B. Go back and click on!",
//             object : "bSection"
//         },
//         7 : {
//             text : "Once you get 50 points, unlock the second B.",
//             object : "bSection"
//         },
//         8 : {
//             text : "Now you have 2 B's. How about we get some interest. Get 20 points.",
//             object : "bSection"
//         },
//         9 : {
//             text : "This is the bank. You can deposit points to get interest. Every second, you get points based on your interest.",
//             object : "bankSection"
//         },
//         10 : {
//             text : "Type 20 in the text box, and click deposit.",
//             object : "Deposit"
//         },
//         11 : {
//             text : "As you can see you get 1 point interest.",
//             object : "Interest"
//         },
//         12 : {
//             text : "If you scroll down in the settings panel, you will see achievements. Green means achieved.",
//             object : "achievementsGroup"
//         },
//         13 : {
//             text : "Every achievement you earn, you will get multiplied points every time you click.",
//             object : "achievementsGroup"
//         },
//         14 : {
//             text : "Up on top of settings, there are buttons to reset. Soft reset keeps achievements, where hard reset deletes everything.",
//             object : "resetDiv"
//         },
//         15 : {
//             text : "As you progress you will be able to submit your score to let people see. DONT SUBMIT YET!",
//             object : "ScoreSubmit"
//         },
//         16 : {
//             text : "This is all you need to know! You are all set!!!",
//             object : "body"
//         },
//     },
//     step : 0,
//     previousBorder : '',
//     update : function() {
//         tut("Tutorial Step " + tutorial.step + " of 16", tutorial.steps[tutorial.step].text);
//         if (tutorial.step > 0) {
//             tutorial.previousBorder = id(tutorial.steps[tutorial.step].object).style.border;
//             var object = id(tutorial.steps[tutorial.step].object);
//             object.style.width = parseFloat(object.style.width) - 8;
//             object.style.height = parseFloat(object.style.height) - 8;
//             id(tutorial.steps[tutorial.step].object).style.border = '4px red solid';
//             if (tutorial.step != 1) {
//                 var object = id(tutorial.steps[tutorial.step - 1].object);
//                 object.style.width = parseFloat(object.style.width) + 8;
//                 object.style.height = parseFloat(object.style.height) + 8;
//                 id(tutorial.steps[tutorial.step - 1].object).style.border = tutorial.previousBorder;
//             }
//         }

//     },
//     next : function() {
//         if (tutorial.step < 16) {
//             tutorial.step++;
//             tutorial.update();
//         } else if (tutorial.step == 16) {
//             id(tutorial.steps[tutorial.step].object).style.border = tutorial.previousBorder;
//             tutorial.step = 0;
//             tutorial.finish();
//         }

//     }
// };

/*====================
	Core Functions
====================*/

function Earn(amount) {
	if (get("points") < Math.pow(10, 308)) { set('points', add(get("points"), amount)); } 
	else { set('points', format.eg(Math.pow(10, 308))); }
	achievements.check();
}
 
 function Purchase(amount) {
    set('points', subtract(get('points'), amount));
 }

function ClickB(name, worth) {
    var name = name;
    if (get(name) == 'true') {
        if (get('clicks') == undefined) { set('clicks', 0); }
        else { set('clicks', add(get('clicks'), 1)); }
        Earn(parseFloat(worth) * get("multiplier"));
        sounds.click.play();
    }
    else { msg("Not Unlocked!", "This B is not unlocked. Press the unlock button below the B to unlock it."); }
}

function UnlockB(name, cost) {
    if (get(name) == 'false') {  
        if (get("points") >= cost) {
            set(name, true);
            msg("Unlocked B!", "You have unlocked the " + name + " B.");
            if (get("unlocked") == undefined) { set("unlocked", 1); }
            else { set('unlocked', add(get("unlocked"), 1)); } 
            Purchase(cost);
            sounds.unlock.play();  
        }
        else { msg("Insufficient Points!", "Earn more points to do this task."); }
    }
    else { msg("Already Unlocked!", "Click the B button to get points."); }
}

/*===================
    Achievements
===================*/

var achievements = {
    list : {
        spaces : [
            "Earn 1 Thousand Points",
            "Earn 1 Million Points",
            "Earn 1 Billion Points",
            "Earn 1 Trillion Points",
            "Earn 1 Quadrillion Points",
            "Unlock 3 B's",
            "Unlock 5 B's",
            "Unlock 10 B's",
            "Unlock 16 B's",
            "Click 50 Times",
            "Click 500 Times",
            "Click 1,500  Times",
            "Click 2,500  Times",
            "Click 5,000  Times",
            "Have 1 Thousand Interest",
            "Have 1 Million Interest",
            "Have 1 Billion Interest",
            "Have 1 Trillion Interest",
            "Have 1 Quadrillion Interest"
        ],
        id : []
    },
    achieve : function(id) {
        set(id, true);
        set('multiplier', parseFloat(get('multiplier')) * 2);
        msg("Earned the " + achievements.list.spaces[achievements.list.id.indexOf(id)] + " Achievement!", "Your earning multiplier is now " + Math.round(get("multiplier")));    
    },
    check : function() {
        var obj = achievements;
        for (i = 0; i < obj.list.spaces.length; i++) {
            var amount = obj.list.spaces[i].toString().replace(',', '').split(' ')[1];
            if (amount == '1') {
                switch (obj.list.spaces[i].toString().split(' ')[2]) {
                    case "Thousand" : amount = 1000; break;
                    case "Million" : amount = Math.pow(10, 6); break;
                    case "Billion" : amount = Math.pow(10, 9); break;
                    case "Trillion" : amount = Math.pow(10, 12); break;
                    case "Quadrillion" : amount = Math.pow(10, 15); break;
                    default:
                }
            }
            var type;
            switch (obj.list.spaces[i].charAt(0)) {
                case "E" : type = "points"; break;
                case "U" : type = "unlocked"; break;
                case "C" : type = "clicks"; break;
                case "H" : type = 'interest'; break;
                default:
            }
            if (parseFloat(get(type)) >= parseFloat(amount) && get(obj.list.id[i]) != "true") {
                achievements.achieve(obj.list.id[i]);
            }
            // alert(type + ";" + amount);   
        }
    }
}

for (i = 0; i < achievements.list.spaces.length; i++) {
    var string = poof(achievements.list.spaces[i], "'"); string = poof(string, ","); string = poof(string, " ");
    achievements.list.id.push(string);
}
var text = id("AchievementsList");
for (i = 0; i < achievements.list.spaces.length; i++) {
    text.innerHTML = text.innerHTML + "<div class='achieveItem' id='" + achievements.list.id[i] + "''>" + achievements.list.spaces[i] + "</div>";
}

/*==================
	Refreshing
==================*/

var refresh = {
    numbers : function() {
        
            //points = localStorage.points;
            if (get('points') >= Math.pow(10, 306)) { set('points', format.eg(Math.pow(10, 307))); id('Points').innerHTML = "Points: Infinity"; document.title = "Infinity Points - bClick";} 
            else { id('Points').innerHTML = 'Points: ' + format.giant(get('points')); document.title = format.giant(get('points')) + " Points - bClick";}

            if (get('interest') >= Math.pow(10, 307)) { set('interest', format.eg(Math.pow(10, 308))); id('Interest').innerHTML = "Interest: Infinity"; } 
            else { id('Interest').innerHTML = 'Interest: ' + format.giant(get('interest')); }

            if (get('deposited') >= Math.pow(10, 307)) { set('deposited', format.eg(Math.pow(10, 308))); id('Deposited').innerHTML = "Deposited: Infinity"; } 
            else { id('Deposited').innerHTML = 'Deposited: ' + format.giant(get('deposited')); }
    },
    B : function() {
        b.refresh();
    },
    achievements : function() {
        achievements.check();
        var group = id("achivementsGroup");
        var text = id("AchievementsList");
        for (i = 0; i < achievements.list.spaces.length; i++) {
            var item = id(achievements.list.id[i]);
            if (get(achievements.list.id[i]) == "true") {
                item.style.background = "#0F0";
            }
        }
    },
    settings : function() {
    },
    events : function() {
        if (!isMobile.any()) {
            var all = document.querySelectorAll('[ontouchend]');
            for (i = 0; i < all.length; i++) {
                var ontouchend = all[i].getAttribute('ontouchend');
                all[i].setAttribute('onclick', ontouchend, false);
            }
        }
    },
    all : function() {
        refresh.numbers(); refresh.B(); refresh.achievements(); refresh.settings(); refresh.events();; 
        window.requestAnimationFrame(refresh.all);
    }
}; 

/*=============
    Saves
=============*/

var data = {
    reset : {
        soft : function() {
            sounds.restart.play();
            set('points', 0);
            set('interest', 0);
            set('deposited', 0);
            
            set('clicks', 0);
            set('unlocked', 0);

            for (i = 0; i < b.list.list.length; i++) {
                var item = b.list.list[i];
                localStorage.setItem(item, false);
            }

            localStorage.played328 = true;
            setTimeout('location.reload()', 2000);
        },
        hard : function() {
            for (i = 0; i < achievements.list.id.length; i++) {
                localStorage.removeItem(achievements.list.id[i]);
            }
            set('multiplier', 1);
            data.reset.soft();
        }
    },
    load : function() {
        if (get("played328") == undefined) {
            // set("played328Tut", "false");
            data.reset.hard();   
        }
        else if (get("lastPlay") != undefined) {
            set('points', add(get('points'), ((get('interest') * 0.05) * timeSince(get('lastPlay')))));
            alert('While you were away, you earned ' + ((get('interest') * 0.05) * timeSince(get('lastPlay'))) + ' points!');
        }
        // if (get("played328Tut") == "false") {
        //     tutorial.start();
        // }
    },
    b64 : {
        import : function() {
            var saveCode = prompt('Import your game save code here.');
            if (saveCode != null && saveCode != undefined && saveCode != '') {
                saveCode = atob(saveCode);
                saveCode = saveCode.split(';');
                set('points', saveCode[0]);
                set('interest', saveCode[1]);
                set('deposited', saveCode[2]);
                set('clicks', saveCode[3]);
                set('multiplier', saveCode[4]);
                set('handrawn', saveCode[5]);
                set('lowercase', saveCode[6]);
                set('regular', saveCode[7]);
                set('saw', saveCode[8]);
                set('spiky', saveCode[9]);
                set('electric', saveCode[10]);
                set('thin', saveCode[11]);
                set('curved', saveCode[12]);
                set('shark', saveCode[13]);
                set('fancy', saveCode[14]);
                set('lightning', saveCode[15]);
                set('awesome', saveCode[16]);
                set('golden', saveCode[17]);
                set('pattern', saveCode[18]);
                set('gradient', saveCode[19]);
                set('disco', saveCode[20]);
            } else if (saveCode != null) {
                alert('Invalid save code!');
            }
        },
        export : function() {
            var saveCode = get('points') + ';' + get('interest') +';' + get('deposited') + ';' + get('clicks') + ';' + get('multiplier') + ';' + get('handrawn') + ';' + 
            get('lowercase') + ';' + get('regular') + ';' + get('saw') + ';' + get('spiky') + ';' + get('electric') + ';' + 
            get('thin') + ';' + get('curved') + ';' + get('shark') + ';' + get('fancy') + ';' + get('lightning') + ';' +
            get('awesome') + ';' + get('golden') + ';' + get('pattern') + ';' + get('gradient') + ';' + get('disco');
            prompt('This is your game save code. Import it on another computer.', format.base64(saveCode));
        }
    }
}

function ConfirmHR() {
    if (ask("Reset Everything?") == true) data.reset.hard();
}

function ConfirmSR() {
  if (ask("Reset Progress but not Achievements?") == true) data.reset.soft();
}

/*==============
	Winning
==============*/

function ChangeUsername() {
    set('username', prompt('Enter your new username'));
    if (get("username") == undefined && get("username") == null && get("username") == '') {
        set('username', prompt('Error! Enter a username'));
    }
    else {
        msg("Username Changed!", "Your username has been changed to " + get('username') + ".");
    }
}

function SubmitScore() {  
    if (get("username") == undefined) {
        set('username', prompt('Enter a username'));
    } else {
        if (get("username") != undefined && get("username") != null && get("username") != '') {
            id('winFrame').setAttribute('src', "https://playbclick.com/pages/win/win.php?username=" + get("username") + "&points=" + toFixed(get('points')));
        }
        else {
            set('username', prompt('Error! Enter a username'));
        }
    }
}

function SeeWinners() {
    web("https://playbclick.com/pages/win/leaderboards.php");
}

/*=========
    B's
=========*/

set("bPosition", 0);

var b = {
    vars : {
        button : function() { return id("bButton") },
        unlock : function() { return id("bUnlock") },
        section : function() { return id("bSection") },
        unlocked : function() { return id("bUnlocked") }
    },
    list : {
        b : {
            handrawn : { worth : 1, cost : 0, color : "#FFF" },
            lowercase : { worth : 10, cost : 50, color : "#999" },
            regular : { worth : 100, cost : 1000, color : "#333" },
            saw : { worth : 250, cost : 10000, color : "#F00" },
            spiky : { worth : 500, cost : 25000, color : "#FF0080" },
            electric : { worth : 1000, cost : 100000, color : "#FFA500" },
            thin : { worth : 2500, cost : 500000, color : "#FF0" },
            curved : { worth : 5000, cost : 2500000, color : "#0F0" },
            shark : { worth : 10000, cost : 10000000, color : "#060" },
            fancy : { worth : 25000, cost : 50000000, color : "#6CF" },
            lightning : { worth : 100000, cost : 250000000, color : "#06C" },
            awesome : { worth : 1000000, cost : 1000000000, color : "#909" },
            golden : { worth : Math.pow(10, 9), cost : Math.pow(10, 12), color : "#FFD700" },
            pattern : { worth : Math.pow(10, 11), cost : Math.pow(10, 15), color : " patternB" },
            gradient : { worth : Math.pow(10, 13), cost : Math.pow(10, 18), color : " gradientB" },
            disco : { worth : Math.pow(10, 15), cost : Math.pow(10, 21), color : " discoB" }
        },        
        list : [
            "handrawn", 
            "lowercase", "regular", 
            "saw", "spiky", 
            "electric", "thin", 
            "curved", "shark", 
            "fancy", "lightning", 
            "awesome", "golden", 
            "pattern", "gradient", 
            "disco"
        ]
    },
    refresh : function() {
        b.vars.button().setAttribute("ontouchend", "ClickB('" + b.list.list[get("bPosition")] + "', " + b.list.b[b.list.list[get("bPosition")]]['worth'] + ")", false);
        b.vars.unlock().setAttribute("ontouchend", "UnlockB('" + b.list.list[get("bPosition")] + "', " + b.list.b[b.list.list[get("bPosition")]]["cost"] + ")", false);
        b.vars.button().style.backgroundImage = "url('https://playbclick.com/assets/b/325/" + b.list.list[get("bPosition")] + ".png')";
        if (localStorage.getItem(b.list.list[get("bPosition")]) == 'false') {
            b.vars.unlock().innerHTML = "Unlock<br />(" + format.giant(b.list.b[b.list.list[get("bPosition")]]["cost"]) + ")";
        } else {
            b.vars.unlock().innerHTML = "Unlocked!";
        }
        var color = b.list.b[b.list.list[get("bPosition")]]["color"];
        if (color.toString().charAt(0) != " ") {
            b.vars.section().style.backgroundColor = color;
            b.vars.section().className = "section";
        } else {
            b.vars.section().className = "section " + color;
        }
        
    },
    loop : {
        next : function() {
            if (get("bPosition") == 15){
                set("bPosition", 0);
            }
            else {
                set("bPosition", add(get("bPosition"), 1));
            }
            b.refresh();
        },
        previous : function() {
            if (get("bPosition") == 0){
                set("bPosition", 15);
            }
            else {
                set("bPosition", subtract(get("bPosition"), 1));
            }
            b.refresh();
        }
    }
}

/*===========
    Bank
===========*/

var bank = {
    collect : function() {
        Earn(get('interest'));
        localStorage.lastPlay = new Date().getTime();
    },
    deposit : function(amount) {
        amount = parseFloat(amount);
        if (get('points') >= amount) {
            set('deposited', add(get('deposited'), amount));
            set('interest', parseFloat(get("deposited")) * 0.1);
            Purchase(amount); 
        }
        else { msg("Insufficient Points!", "Earn more points to do this task."); } },
    withdraw : function(amount) {
        amount = parseFloat(amount);
        set('deposited', subtract(get('deposited'), amount));
        set('interest', parseFloat(get('deposited')) * 0.1);
        Earn(amount); 
    }
}

/*============
    Other
============*/

function bColorChange() {
    id("bButton").style.backgroundColor = (id("bButton").style.backgroundColor != "#DDD" ? "#AAA" : "#DDD");
}

function Minimize(list, button) {
    id(list).style.display = (id(list).style.display != 'none' ? 'none' : '' );
    id(button).innerText = (id(button).innerText != '+' ? '+' : '-' );
}

data.load();
refresh.all();
setInterval(bank.collect, 1000);
setInterval('msg("bClick Summary", "You have " + format.giant(get("points")) + " Points")', 300000);
setInterval('SubmitScore()', 30000);