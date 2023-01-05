export var minutes = 0;
export var seconds = 0;

export const minutesToSecondsFactor = 60;

export const timeId = "time";

export const time = document.getElementById(timeId);

export var started = false;

var interval = undefined;
const intervalTime = 1000;

const updateDisplay = () => {
    time.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const increment = () => {
    seconds++;
    if (seconds === minutesToSecondsFactor)
    {
        minutes++;
        seconds = 0;
    }
    updateDisplay();   
};

export const reset = () => {
    seconds = 0;
    minutes = 0;
    updateDisplay();
}

export const stop = () => {
    if (started)
    {
        if (!!interval) clearInterval(interval);
        started = false;
    }
};

export const start = () => {
    if (started)
    {
        stop();
        reset();
    }
    interval = setInterval(increment, intervalTime);
    started = true;
};