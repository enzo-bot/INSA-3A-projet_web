const assignementSeparator = "=";
const valuesSeparator = "; ";

const mandatoryValues = {
    "expires": 0,
    "SameSite": "None",
    "path": "/"
};

const defaultLifetime = 90;
const day = 86400000;

const get = () => {
    var cookiesArray = decodeURIComponent(document.cookie).split(valuesSeparator);
    var cookies = {};
    for (let e = 0; e < cookiesArray.length; e++)
    {
        const cookie = cookiesArray[e].split(assignementSeparator);
        if (!!cookie[1] && cookie[0].length > 0)
            cookies[cookie[0]] = cookie[1];
    }
    return cookies;
};

const write = (cookies, resetMandatoryValues = false, lifetime = defaultLifetime) => {
    if (resetMandatoryValues)
    {
        mandatoryValues.expires = (new Date(Date.now() + (lifetime * day))).toUTCString();
        for (let value in mandatoryValues) cookies[value] = mandatoryValues[value];
    }
    document.cookie = "";
    for (let name in cookies)
        document.cookie += valuesSeparator + name + assignementSeparator + String(cookies.value);
};

export const setValue = (name, value) => {
    const cookies = get();
    cookies[name] = value;
    write(cookies);
};

export const getValue = (name) => {
    return get()[name];
};

export const isValid = () => {
    const expires = getValue('expires');
    return !!expires && Date.now() > new Date(expires);
}

export const reset = (lifetime = defaultLifetime) => write({}, true, lifetime);