let start = document.getElementById("play");
let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let amandpm = document.getElementById("amorpm");
let time = document.getElementById("time");
let stop = document.getElementById("stop");
var audio = new Audio("static/alarm-clock.mp3");

let i; // Declare the interval ID variable

setInterval(() => {
    let a = new Date();
    let h = a.getHours();
    let aorp = null;
    if (h < 12) {
        aorp = 'AM';
    } else {
        aorp = 'PM';
    }
    if (h > 12) {
        h = h - 12;
        if (h == 0) {
            h = 12;
        }
    } else if (h == 0) {
        h = 12;
    }
    let m = a.getMinutes();
    if (m < 10) {
        m = '0' + m;
    }
    let s = a.getSeconds();
    if (s < 10) {
        s = '0' + s;
    }

    time.innerHTML = (`<h1>WATCH</h1>  <center><h1>${h} : ${m} : ${s} ${aorp}</h1></center>`);
}, 1000);

function setAlarm(hour, minet, pmoram) {
    hour = Number.parseInt(hour);
    minet = Number.parseInt(minet);

    if (hour) {
        let min = minet;
        if (min < 10) {
            min = '0' + min;
        }
        alert(`Your alarm is successfully set at ${hour}:${min} ${pmoram}`);
        i = setInterval(() => {
            let a = new Date();
            let h = a.getHours();
            let aorp = null;
            if (h < 12) {
                aorp = 'AM';
            } else {
                aorp = 'PM';
            }
            if (h > 12) {
                h = h - 12;
                if (h == 0) {
                    h = 12;
                }
            } else if (h == 0) {
                h = 12;
            }
            let m = a.getMinutes();
            if (hour == h && minet == m && aorp == pmoram) {
                console.log("Alarm ringing");
                audio.play();
            }
        }, 1000);
    } else {
        alert("Please enter a valid time");
    }
}

stop.addEventListener('click', () => {
    audio.pause();
    clearInterval(i);
    console.log(i);
});

start.addEventListener('click', () => {
    let hour = input1.value;
    let minet = input2.value;
    let pmoram = amandpm.value;
    setAlarm(hour, minet, pmoram);
});

// Add event listeners to the "Active" buttons
let actionButtons = document.querySelectorAll('.action-btn[data-time]');

actionButtons.forEach(button => {
    button.addEventListener('click', () => {
        let time = button.getAttribute('data-time');
        let [hour, minet] = time.split(':');
        let pmoram = time.includes('PM') ? 'PM' : 'AM';
        setAlarm(hour, minet, pmoram);
    });
});
