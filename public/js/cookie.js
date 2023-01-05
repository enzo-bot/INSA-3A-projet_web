const assignementSeparator = "=";
const valuesSeparator = "; ";

const name = "wordle";
const mandatoryValues = {
    "expires": 0,
    "path": "/",
    "SameSite": "None",
    "Secure": undefined
};

const defaultLifetime = 90;
const day = 86400000;

const get = () => {
    var elements = decodeURIComponent(document.cookie).split(valuesSeparator);  
    var cookie = {};
    for (let e = 0; e < elements.length; e++)
    {
        const value = elements[e].split(assignementSeparator);
        if (!!value[1] && value[0].length > 0)
        {
            if (value[0] === name) value[1] = JSON.parse(value[1]);
            cookie[value[0]] = value[1];
        }
    }
    return cookie;
};

const write = (values, resetExpires = false, lifetime = defaultLifetime) => {
    let cookie = mandatoryValues;
    if (resetExpires) cookie.expires = (new Date(Date.now() + (lifetime * day))).toUTCString();
    console.log(values);
    var cookieString = name + assignementSeparator + JSON.stringify(values);
    for (let name in cookie)
        cookieString += valuesSeparator + name + (!!cookie[name] ? assignementSeparator + String(cookie[name]) : "");
    cookieString = encodeURIComponent(cookieString);
    document.cookie = cookieString;
};

export const isValid = () => !!get()[name];

export const setValue = (key, value) => {
    const values = get()[name];
    values[key] = value;
    write(values);
};

export const getValue = (key) => {
    const values = get()[name];
    if (!!values) return values[key];
};

export const reset = (lifetime = defaultLifetime) => write({}, true, lifetime);