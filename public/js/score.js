import * as cookie from './cookie.js';
import * as timer from './timer.js';
import { maxRows } from "./common.js";

const totalCookie = "total";
const bestCookie = "best";

export var current = 0;
export var total = cookie.getValue(totalCookie) ?? 0;
export var best = cookie.getValue(bestCookie) ?? 0;

const perfectCharWeight = 15;
const correctCharWeight = 5;
const timeWeight = .25;

export const scoreId = "wordle-score";
export const totalId = totalCookie;
export const bestId  = bestCookie;

const totalElement = document.getElementById(totalId);
const bestElement  = document.getElementById(bestId);

export const compute = (rows, wordLength, perfectChars, correctChars) => {
    current = Math.round(
        ((maxRows / ((rows ** 2) + 1)) * ((perfectChars * perfectCharWeight) + (correctChars * correctCharWeight)) * wordLength )
        - (timer.minutes * timer.minutesToSecondsFactor + timer.seconds) * timeWeight
    );
}

export const register = () => {
    total += current;
    cookie.setValue(totalCookie, total);
    totalElement.innerHTML = total;
    if (current > best)
    {
        best = current;
        cookie.setValue(bestCookie, best);
        bestElement.innerHTML = best;
    }
}