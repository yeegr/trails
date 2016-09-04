'use strict';

import Moment from 'moment';
import 'moment/locale/zh-cn';

export function setBackgroundImage(path) {
    const url = (path.indexOf('http://') === 0) ? path : window.assetUri + path;

    return {
        backgroundImage: 'url(' + url + ')'
    }
};

export function formatTime(dt) {
    var tmp = isNumeric(dt) ? (dt * 1000) : dt,
        fmt = arguments[1] ? arguments[1] : 'll';
    return Moment(tmp).locale('zh-cn').format(fmt);
};

export function formatDuration(seconds) {
    if (isNumeric(seconds)) {
        var lang = window.lang,
            h = Math.floor(seconds / 3600),
            j = Math.round(seconds / 3600),
            d = (h > 24) ? Math.floor(h / 24) : 0,
            m = Math.floor((seconds - h * 3600) / 60),
            r = h.toString() + lang.hours + m.toString() + lang.minutes;
        return r;
    }
};

export function formatFromNow(timestamp) {
    return Moment(timestamp * 1000).locale('zh-cn').fromNow();
};

export function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export function phoneLink(phoneNumber) {
    return "tel:" + phoneNumber;
}

 export function createMarkup(html) {
    return {
        __html: html
    }
};