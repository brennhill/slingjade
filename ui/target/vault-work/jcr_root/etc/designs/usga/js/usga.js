/* Build #1714 */ 
(function(undefined) {
    var moment, VERSION = "2.9.0", globalScope = typeof global !== "undefined" && (typeof window === "undefined" || window === global.window) ? global : this, oldGlobalMoment, round = Math.round, hasOwnProperty = Object.prototype.hasOwnProperty, i, YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, locales = {}, momentProperties = [], hasModule = typeof module !== "undefined" && module && module.exports, aspNetJsonRegex = /^\/?Date\((\-?\d+)/i, aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, parseTokenOneOrTwoDigits = /\d\d?/, parseTokenOneToThreeDigits = /\d{1,3}/, parseTokenOneToFourDigits = /\d{1,4}/, parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, parseTokenDigits = /\d+/, parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, parseTokenT = /T/i, parseTokenOffsetMs = /[\+\-]?\d+/, parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, parseTokenOneDigit = /\d/, parseTokenTwoDigits = /\d\d/, parseTokenThreeDigits = /\d{3}/, parseTokenFourDigits = /\d{4}/, parseTokenSixDigits = /[+-]?\d{6}/, parseTokenSignedNumber = /[+-]?\d+/, isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, isoFormat = "YYYY-MM-DDTHH:mm:ssZ", isoDates = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/ ], [ "YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d{2}/ ], [ "YYYY-DDD", /\d{4}-\d{3}/ ] ], isoTimes = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], parseTimezoneChunker = /([\+\-]|\d\d)/gi, proxyGettersAndSetters = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), unitMillisecondFactors = {
        Milliseconds: 1,
        Seconds: 1e3,
        Minutes: 6e4,
        Hours: 36e5,
        Days: 864e5,
        Months: 2592e6,
        Years: 31536e6
    }, unitAliases = {
        ms: "millisecond",
        s: "second",
        m: "minute",
        h: "hour",
        d: "day",
        D: "date",
        w: "week",
        W: "isoWeek",
        M: "month",
        Q: "quarter",
        y: "year",
        DDD: "dayOfYear",
        e: "weekday",
        E: "isoWeekday",
        gg: "weekYear",
        GG: "isoWeekYear"
    }, camelFunctions = {
        dayofyear: "dayOfYear",
        isoweekday: "isoWeekday",
        isoweek: "isoWeek",
        weekyear: "weekYear",
        isoweekyear: "isoWeekYear"
    }, formatFunctions = {}, relativeTimeThresholds = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }, ordinalizeTokens = "DDD w W M D d".split(" "), paddedTokens = "M D H h m s w W".split(" "), formatTokenFunctions = {
        M: function() {
            return this.month() + 1;
        },
        MMM: function(format) {
            return this.localeData().monthsShort(this, format);
        },
        MMMM: function(format) {
            return this.localeData().months(this, format);
        },
        D: function() {
            return this.date();
        },
        DDD: function() {
            return this.dayOfYear();
        },
        d: function() {
            return this.day();
        },
        dd: function(format) {
            return this.localeData().weekdaysMin(this, format);
        },
        ddd: function(format) {
            return this.localeData().weekdaysShort(this, format);
        },
        dddd: function(format) {
            return this.localeData().weekdays(this, format);
        },
        w: function() {
            return this.week();
        },
        W: function() {
            return this.isoWeek();
        },
        YY: function() {
            return leftZeroFill(this.year() % 100, 2);
        },
        YYYY: function() {
            return leftZeroFill(this.year(), 4);
        },
        YYYYY: function() {
            return leftZeroFill(this.year(), 5);
        },
        YYYYYY: function() {
            var y = this.year(), sign = y >= 0 ? "+" : "-";
            return sign + leftZeroFill(Math.abs(y), 6);
        },
        gg: function() {
            return leftZeroFill(this.weekYear() % 100, 2);
        },
        gggg: function() {
            return leftZeroFill(this.weekYear(), 4);
        },
        ggggg: function() {
            return leftZeroFill(this.weekYear(), 5);
        },
        GG: function() {
            return leftZeroFill(this.isoWeekYear() % 100, 2);
        },
        GGGG: function() {
            return leftZeroFill(this.isoWeekYear(), 4);
        },
        GGGGG: function() {
            return leftZeroFill(this.isoWeekYear(), 5);
        },
        e: function() {
            return this.weekday();
        },
        E: function() {
            return this.isoWeekday();
        },
        a: function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), true);
        },
        A: function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), false);
        },
        H: function() {
            return this.hours();
        },
        h: function() {
            return this.hours() % 12 || 12;
        },
        m: function() {
            return this.minutes();
        },
        s: function() {
            return this.seconds();
        },
        S: function() {
            return toInt(this.milliseconds() / 100);
        },
        SS: function() {
            return leftZeroFill(toInt(this.milliseconds() / 10), 2);
        },
        SSS: function() {
            return leftZeroFill(this.milliseconds(), 3);
        },
        SSSS: function() {
            return leftZeroFill(this.milliseconds(), 3);
        },
        Z: function() {
            var a = this.utcOffset(), b = "+";
            if (a < 0) {
                a = -a;
                b = "-";
            }
            return b + leftZeroFill(toInt(a / 60), 2) + ":" + leftZeroFill(toInt(a) % 60, 2);
        },
        ZZ: function() {
            var a = this.utcOffset(), b = "+";
            if (a < 0) {
                a = -a;
                b = "-";
            }
            return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
        },
        z: function() {
            return this.zoneAbbr();
        },
        zz: function() {
            return this.zoneName();
        },
        x: function() {
            return this.valueOf();
        },
        X: function() {
            return this.unix();
        },
        Q: function() {
            return this.quarter();
        }
    }, deprecations = {}, lists = [ "months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin" ], updateInProgress = false;
    function dfl(a, b, c) {
        switch (arguments.length) {
          case 2:
            return a != null ? a : b;

          case 3:
            return a != null ? a : b != null ? b : c;

          default:
            throw new Error("Implement me");
        }
    }
    function hasOwnProp(a, b) {
        return hasOwnProperty.call(a, b);
    }
    function defaultParsingFlags() {
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false
        };
    }
    function printMsg(msg) {
        if (moment.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
            console.warn("Deprecation warning: " + msg);
        }
    }
    function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function() {
            if (firstTime) {
                printMsg(msg);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }
    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            printMsg(msg);
            deprecations[name] = true;
        }
    }
    function padToken(func, count) {
        return function(a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function(a) {
            return this.localeData().ordinal(func.call(this, a), period);
        };
    }
    function monthDiff(a, b) {
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
            adjust = (b - anchor) / (anchor2 - anchor);
        }
        return -(wholeMonthDiff + adjust);
    }
    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + "o"] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);
    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;
        if (meridiem == null) {
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            return hour;
        }
    }
    function Locale() {}
    function Moment(config, skipOverflow) {
        if (skipOverflow !== false) {
            checkOverflow(config);
        }
        copyConfig(this, config);
        this._d = new Date(+config._d);
        if (updateInProgress === false) {
            updateInProgress = true;
            moment.updateOffset(this);
            updateInProgress = false;
        }
    }
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration), years = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months = normalizedInput.month || 0, weeks = normalizedInput.week || 0, days = normalizedInput.day || 0, hours = normalizedInput.hour || 0, minutes = normalizedInput.minute || 0, seconds = normalizedInput.second || 0, milliseconds = normalizedInput.millisecond || 0;
        this._milliseconds = +milliseconds + seconds * 1e3 + minutes * 6e4 + hours * 36e5;
        this._days = +days + weeks * 7;
        this._months = +months + quarters * 3 + years * 12;
        this._data = {};
        this._locale = moment.localeData();
        this._bubble();
    }
    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }
        if (hasOwnProp(b, "toString")) {
            a.toString = b.toString;
        }
        if (hasOwnProp(b, "valueOf")) {
            a.valueOf = b.valueOf;
        }
        return a;
    }
    function copyConfig(to, from) {
        var i, prop, val;
        if (typeof from._isAMomentObject !== "undefined") {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== "undefined") {
            to._i = from._i;
        }
        if (typeof from._f !== "undefined") {
            to._f = from._f;
        }
        if (typeof from._l !== "undefined") {
            to._l = from._l;
        }
        if (typeof from._strict !== "undefined") {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== "undefined") {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== "undefined") {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== "undefined") {
            to._offset = from._offset;
        }
        if (typeof from._pf !== "undefined") {
            to._pf = from._pf;
        }
        if (typeof from._locale !== "undefined") {
            to._locale = from._locale;
        }
        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== "undefined") {
                    to[prop] = val;
                }
            }
        }
        return to;
    }
    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }
    function leftZeroFill(number, targetLength, forceSign) {
        var output = "" + Math.abs(number), sign = number >= 0;
        while (output.length < targetLength) {
            output = "0" + output;
        }
        return (sign ? forceSign ? "+" : "" : "-") + output;
    }
    function positiveMomentsDifference(base, other) {
        var res = {
            milliseconds: 0,
            months: 0
        };
        res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, "M").isAfter(other)) {
            --res.months;
        }
        res.milliseconds = +other - +base.clone().add(res.months, "M");
        return res;
    }
    function momentsDifference(base, other) {
        var res;
        other = makeAs(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }
        return res;
    }
    function createAdder(direction, name) {
        return function(val, period) {
            var dur, tmp;
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period).");
                tmp = val;
                val = period;
                period = tmp;
            }
            val = typeof val === "string" ? +val : val;
            dur = moment.duration(val, period);
            addOrSubtractDurationFromMoment(this, dur, direction);
            return this;
        };
    }
    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds, days = duration._days, months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;
        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            rawSetter(mom, "Date", rawGetter(mom, "Date") + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, "Month") + months * isAdding);
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months);
        }
    }
    function isArray(input) {
        return Object.prototype.toString.call(input) === "[object Array]";
    }
    function isDate(input) {
        return Object.prototype.toString.call(input) === "[object Date]" || input instanceof Date;
    }
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
        for (i = 0; i < len; i++) {
            if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }
    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, "$1");
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }
    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {}, normalizedProp, prop;
        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }
        return normalizedInput;
    }
    function makeList(field) {
        var count, setter;
        if (field.indexOf("week") === 0) {
            count = 7;
            setter = "day";
        } else if (field.indexOf("month") === 0) {
            count = 12;
            setter = "month";
        } else {
            return;
        }
        moment[field] = function(format, index) {
            var i, getter, method = moment._locale[field], results = [];
            if (typeof format === "number") {
                index = format;
                format = undefined;
            }
            getter = function(i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment._locale, m, format || "");
            };
            if (index != null) {
                return getter(index);
            } else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }
    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion, value = 0;
        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }
        return value;
    }
    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }
    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([ year, 11, 31 + dow - doy ]), dow, doy).week;
    }
    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }
    function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow = m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH : m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE : m._a[HOUR] < 0 || m._a[HOUR] > 24 || m._a[HOUR] === 24 && (m._a[MINUTE] !== 0 || m._a[SECOND] !== 0 || m._a[MILLISECOND] !== 0) ? HOUR : m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE : m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND : m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND : -1;
            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            m._pf.overflow = overflow;
        }
    }
    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) && m._pf.overflow < 0 && !m._pf.empty && !m._pf.invalidMonth && !m._pf.nullInput && !m._pf.invalidFormat && !m._pf.userInvalidated;
            if (m._strict) {
                m._isValid = m._isValid && m._pf.charsLeftOver === 0 && m._pf.unusedTokens.length === 0 && m._pf.bigHour === undefined;
            }
        }
        return m._isValid;
    }
    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace("_", "-") : key;
    }
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;
        while (i < names.length) {
            split = normalizeLocale(names[i]).split("-");
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split("-") : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join("-"));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }
    function loadLocale(name) {
        var oldLocale = null;
        if (!locales[name] && hasModule) {
            try {
                oldLocale = moment.locale();
                require("./locale/" + name);
                moment.locale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }
    function makeAs(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (moment.isMoment(input) || isDate(input) ? +input : +moment(input)) - +res;
            res._d.setTime(+res._d + diff);
            moment.updateOffset(res, false);
            return res;
        } else {
            return moment(input).local();
        }
    }
    extend(Locale.prototype, {
        set: function(config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === "function") {
                    this[i] = prop;
                } else {
                    this["_" + i] = prop;
                }
            }
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
        },
        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months: function(m) {
            return this._months[m.month()];
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort: function(m) {
            return this._monthsShort[m.month()];
        },
        monthsParse: function(monthName, format, strict) {
            var i, mom, regex;
            if (!this._monthsParse) {
                this._monthsParse = [];
                this._longMonthsParse = [];
                this._shortMonthsParse = [];
            }
            for (i = 0; i < 12; i++) {
                mom = moment.utc([ 2e3, i ]);
                if (strict && !this._longMonthsParse[i]) {
                    this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i");
                    this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i");
                }
                if (!strict && !this._monthsParse[i]) {
                    regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
                    this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
                }
                if (strict && format === "MMMM" && this._longMonthsParse[i].test(monthName)) {
                    return i;
                } else if (strict && format === "MMM" && this._shortMonthsParse[i].test(monthName)) {
                    return i;
                } else if (!strict && this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },
        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays: function(m) {
            return this._weekdays[m.day()];
        },
        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort: function(m) {
            return this._weekdaysShort[m.day()];
        },
        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin: function(m) {
            return this._weekdaysMin[m.day()];
        },
        weekdaysParse: function(weekdayName) {
            var i, mom, regex;
            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }
            for (i = 0; i < 7; i++) {
                if (!this._weekdaysParse[i]) {
                    mom = moment([ 2e3, 1 ]).day(i);
                    regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
                    this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
                }
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },
        _longDateFormat: {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY LT",
            LLLL: "dddd, MMMM D, YYYY LT"
        },
        longDateFormat: function(key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },
        isPM: function(input) {
            return (input + "").toLowerCase().charAt(0) === "p";
        },
        _meridiemParse: /[ap]\.?m?\.?/i,
        meridiem: function(hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? "pm" : "PM";
            } else {
                return isLower ? "am" : "AM";
            }
        },
        _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        calendar: function(key, mom, now) {
            var output = this._calendar[key];
            return typeof output === "function" ? output.apply(mom, [ now ]) : output;
        },
        _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        relativeTime: function(number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return typeof output === "function" ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
        },
        pastFuture: function(diff, output) {
            var format = this._relativeTime[diff > 0 ? "future" : "past"];
            return typeof format === "function" ? format(output) : format.replace(/%s/i, output);
        },
        ordinal: function(number) {
            return this._ordinal.replace("%d", number);
        },
        _ordinal: "%d",
        _ordinalParse: /\d{1,2}/,
        preparse: function(string) {
            return string;
        },
        postformat: function(string) {
            return string;
        },
        week: function(mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },
        _week: {
            dow: 0,
            doy: 6
        },
        firstDayOfWeek: function() {
            return this._week.dow;
        },
        firstDayOfYear: function() {
            return this._week.doy;
        },
        _invalidDate: "Invalid date",
        invalidDate: function() {
            return this._invalidDate;
        }
    });
    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
    }
    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;
        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }
        return function(mom) {
            var output = "";
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }
        format = expandFormat(format, m.localeData());
        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }
        return formatFunctions[format](m);
    }
    function expandFormat(format, locale) {
        var i = 5;
        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }
        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }
        return format;
    }
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
          case "Q":
            return parseTokenOneDigit;

          case "DDDD":
            return parseTokenThreeDigits;

          case "YYYY":
          case "GGGG":
          case "gggg":
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;

          case "Y":
          case "G":
          case "g":
            return parseTokenSignedNumber;

          case "YYYYYY":
          case "YYYYY":
          case "GGGGG":
          case "ggggg":
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;

          case "S":
            if (strict) {
                return parseTokenOneDigit;
            }

          case "SS":
            if (strict) {
                return parseTokenTwoDigits;
            }

          case "SSS":
            if (strict) {
                return parseTokenThreeDigits;
            }

          case "DDD":
            return parseTokenOneToThreeDigits;

          case "MMM":
          case "MMMM":
          case "dd":
          case "ddd":
          case "dddd":
            return parseTokenWord;

          case "a":
          case "A":
            return config._locale._meridiemParse;

          case "x":
            return parseTokenOffsetMs;

          case "X":
            return parseTokenTimestampMs;

          case "Z":
          case "ZZ":
            return parseTokenTimezone;

          case "T":
            return parseTokenT;

          case "SSSS":
            return parseTokenDigits;

          case "MM":
          case "DD":
          case "YY":
          case "GG":
          case "gg":
          case "HH":
          case "hh":
          case "mm":
          case "ss":
          case "ww":
          case "WW":
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;

          case "M":
          case "D":
          case "d":
          case "H":
          case "h":
          case "m":
          case "s":
          case "w":
          case "W":
          case "e":
          case "E":
            return parseTokenOneOrTwoDigits;

          case "Do":
            return strict ? config._locale._ordinalParse : config._locale._ordinalParseLenient;

          default:
            a = new RegExp(regexpEscape(unescapeFormat(token.replace("\\", "")), "i"));
            return a;
        }
    }
    function utcOffsetFromString(string) {
        string = string || "";
        var possibleTzMatches = string.match(parseTokenTimezone) || [], tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [], parts = (tzChunk + "").match(parseTimezoneChunker) || [ "-", 0, 0 ], minutes = +(parts[1] * 60) + toInt(parts[2]);
        return parts[0] === "+" ? minutes : -minutes;
    }
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;
        switch (token) {
          case "Q":
            if (input != null) {
                datePartArray[MONTH] = (toInt(input) - 1) * 3;
            }
            break;

          case "M":
          case "MM":
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;

          case "MMM":
          case "MMMM":
            a = config._locale.monthsParse(input, token, config._strict);
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;

          case "D":
          case "DD":
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;

          case "Do":
            if (input != null) {
                datePartArray[DATE] = toInt(parseInt(input.match(/\d{1,2}/)[0], 10));
            }
            break;

          case "DDD":
          case "DDDD":
            if (input != null) {
                config._dayOfYear = toInt(input);
            }
            break;

          case "YY":
            datePartArray[YEAR] = moment.parseTwoDigitYear(input);
            break;

          case "YYYY":
          case "YYYYY":
          case "YYYYYY":
            datePartArray[YEAR] = toInt(input);
            break;

          case "a":
          case "A":
            config._meridiem = input;
            break;

          case "h":
          case "hh":
            config._pf.bigHour = true;

          case "H":
          case "HH":
            datePartArray[HOUR] = toInt(input);
            break;

          case "m":
          case "mm":
            datePartArray[MINUTE] = toInt(input);
            break;

          case "s":
          case "ss":
            datePartArray[SECOND] = toInt(input);
            break;

          case "S":
          case "SS":
          case "SSS":
          case "SSSS":
            datePartArray[MILLISECOND] = toInt(("0." + input) * 1e3);
            break;

          case "x":
            config._d = new Date(toInt(input));
            break;

          case "X":
            config._d = new Date(parseFloat(input) * 1e3);
            break;

          case "Z":
          case "ZZ":
            config._useUTC = true;
            config._tzm = utcOffsetFromString(input);
            break;

          case "dd":
          case "ddd":
          case "dddd":
            a = config._locale.weekdaysParse(input);
            if (a != null) {
                config._w = config._w || {};
                config._w["d"] = a;
            } else {
                config._pf.invalidWeekday = input;
            }
            break;

          case "w":
          case "ww":
          case "W":
          case "WW":
          case "d":
          case "e":
          case "E":
            token = token.substr(0, 1);

          case "gggg":
          case "GGGG":
          case "GGGGG":
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = toInt(input);
            }
            break;

          case "gg":
          case "GG":
            config._w = config._w || {};
            config._w[token] = moment.parseTwoDigitYear(input);
        }
    }
    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;
        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
            week = dfl(w.W, 1);
            weekday = dfl(w.E, 1);
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;
            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
            week = dfl(w.w, 1);
            if (w.d != null) {
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                weekday = w.e + dow;
            } else {
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
    function dateFromConfig(config) {
        var i, date, input = [], currentDate, yearToUse;
        if (config._d) {
            return;
        }
        currentDate = currentDateArray(config);
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }
        if (config._dayOfYear) {
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);
            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }
            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }
        for (;i < 7; i++) {
            config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
        }
        if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }
        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }
        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }
    function dateFromObject(config) {
        var normalizedInput;
        if (config._d) {
            return;
        }
        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [ normalizedInput.year, normalizedInput.month, normalizedInput.day || normalizedInput.date, normalizedInput.hour, normalizedInput.minute, normalizedInput.second, normalizedInput.millisecond ];
        dateFromConfig(config);
    }
    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [ now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() ];
        } else {
            return [ now.getFullYear(), now.getMonth(), now.getDate() ];
        }
    }
    function makeDateFromStringAndFormat(config) {
        if (config._f === moment.ISO_8601) {
            parseISO(config);
            return;
        }
        config._a = [];
        config._pf.empty = true;
        var string = "" + config._i, i, parsedInput, tokens, token, skipped, stringLength = string.length, totalParsedInputLength = 0;
        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                } else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }
        if (config._pf.bigHour === true && config._a[HOUR] <= 12) {
            config._pf.bigHour = undefined;
        }
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
        dateFromConfig(config);
        checkOverflow(config);
    }
    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    function makeDateFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore;
        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }
        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);
            if (!isValid(tempConfig)) {
                continue;
            }
            currentScore += tempConfig._pf.charsLeftOver;
            currentScore += tempConfig._pf.unusedTokens.length * 10;
            tempConfig._pf.score = currentScore;
            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }
        extend(config, bestMoment || tempConfig);
    }
    function parseISO(config) {
        var i, l, string = config._i, match = isoRegex.exec(string);
        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    config._f = isoDates[i][0] + (match[6] || " ");
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += "Z";
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }
    function makeDateFromString(config) {
        parseISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            moment.createFromInputFallback(config);
        }
    }
    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }
    function makeDateFromInput(config) {
        var input = config._i, matched;
        if (input === undefined) {
            config._d = new Date();
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === "string") {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function(obj) {
                return parseInt(obj, 10);
            });
            dateFromConfig(config);
        } else if (typeof input === "object") {
            dateFromObject(config);
        } else if (typeof input === "number") {
            config._d = new Date(input);
        } else {
            moment.createFromInputFallback(config);
        }
    }
    function makeDate(y, m, d, h, M, s, ms) {
        var date = new Date(y, m, d, h, M, s, ms);
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }
    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }
    function parseWeekday(input, locale) {
        if (typeof input === "string") {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            } else {
                input = locale.weekdaysParse(input);
                if (typeof input !== "number") {
                    return null;
                }
            }
        }
        return input;
    }
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }
    function relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = moment.duration(posNegDuration).abs(), seconds = round(duration.as("s")), minutes = round(duration.as("m")), hours = round(duration.as("h")), days = round(duration.as("d")), months = round(duration.as("M")), years = round(duration.as("y")), args = seconds < relativeTimeThresholds.s && [ "s", seconds ] || minutes === 1 && [ "m" ] || minutes < relativeTimeThresholds.m && [ "mm", minutes ] || hours === 1 && [ "h" ] || hours < relativeTimeThresholds.h && [ "hh", hours ] || days === 1 && [ "d" ] || days < relativeTimeThresholds.d && [ "dd", days ] || months === 1 && [ "M" ] || months < relativeTimeThresholds.M && [ "MM", months ] || years === 1 && [ "y" ] || [ "yy", years ];
        args[2] = withoutSuffix;
        args[3] = +posNegDuration > 0;
        args[4] = locale;
        return substituteTimeAgo.apply({}, args);
    }
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek, daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(), adjustedMoment;
        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }
        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }
        adjustedMoment = moment(mom).add(daysToDayOfWeek, "d");
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;
        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;
        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }
    function makeMoment(config) {
        var input = config._i, format = config._f, res;
        config._locale = config._locale || moment.localeData(config._l);
        if (input === null || format === undefined && input === "") {
            return moment.invalid({
                nullInput: true
            });
        }
        if (typeof input === "string") {
            config._i = input = config._locale.preparse(input);
        }
        if (moment.isMoment(input)) {
            return new Moment(input, true);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }
        res = new Moment(config);
        if (res._nextDay) {
            res.add(1, "d");
            res._nextDay = undefined;
        }
        return res;
    }
    moment = function(input, format, locale, strict) {
        var c;
        if (typeof locale === "boolean") {
            strict = locale;
            locale = undefined;
        }
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = locale;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();
        return makeMoment(c);
    };
    moment.suppressDeprecationWarnings = false;
    moment.createFromInputFallback = deprecate("moment construction falls back to js Date. This is " + "discouraged and will be removed in upcoming major " + "release. Please refer to " + "https://github.com/moment/moment/issues/1407 for more info.", function(config) {
        config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
    });
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return moment();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }
    moment.min = function() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isBefore", args);
    };
    moment.max = function() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isAfter", args);
    };
    moment.utc = function(input, format, locale, strict) {
        var c;
        if (typeof locale === "boolean") {
            strict = locale;
            locale = undefined;
        }
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();
        return makeMoment(c).utc();
    };
    moment.unix = function(input) {
        return moment(input * 1e3);
    };
    moment.duration = function(input, key) {
        var duration = input, match = null, sign, ret, parseIso, diffRes;
        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === "number") {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = match[1] === "-" ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = match[1] === "-" ? -1 : 1;
            parseIso = function(inp) {
                var res = inp && parseFloat(inp.replace(",", "."));
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        } else if (duration == null) {
            duration = {};
        } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
            diffRes = momentsDifference(moment(duration.from), moment(duration.to));
            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }
        ret = new Duration(duration);
        if (moment.isDuration(input) && hasOwnProp(input, "_locale")) {
            ret._locale = input._locale;
        }
        return ret;
    };
    moment.version = VERSION;
    moment.defaultFormat = isoFormat;
    moment.ISO_8601 = function() {};
    moment.momentProperties = momentProperties;
    moment.updateOffset = function() {};
    moment.relativeTimeThreshold = function(threshold, limit) {
        if (relativeTimeThresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return relativeTimeThresholds[threshold];
        }
        relativeTimeThresholds[threshold] = limit;
        return true;
    };
    moment.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", function(key, value) {
        return moment.locale(key, value);
    });
    moment.locale = function(key, values) {
        var data;
        if (key) {
            if (typeof values !== "undefined") {
                data = moment.defineLocale(key, values);
            } else {
                data = moment.localeData(key);
            }
            if (data) {
                moment.duration._locale = moment._locale = data;
            }
        }
        return moment._locale._abbr;
    };
    moment.defineLocale = function(name, values) {
        if (values !== null) {
            values.abbr = name;
            if (!locales[name]) {
                locales[name] = new Locale();
            }
            locales[name].set(values);
            moment.locale(name);
            return locales[name];
        } else {
            delete locales[name];
            return null;
        }
    };
    moment.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", function(key) {
        return moment.localeData(key);
    });
    moment.localeData = function(key) {
        var locale;
        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }
        if (!key) {
            return moment._locale;
        }
        if (!isArray(key)) {
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [ key ];
        }
        return chooseLocale(key);
    };
    moment.isMoment = function(obj) {
        return obj instanceof Moment || obj != null && hasOwnProp(obj, "_isAMomentObject");
    };
    moment.isDuration = function(obj) {
        return obj instanceof Duration;
    };
    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }
    moment.normalizeUnits = function(units) {
        return normalizeUnits(units);
    };
    moment.invalid = function(flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        } else {
            m._pf.userInvalidated = true;
        }
        return m;
    };
    moment.parseZone = function() {
        return moment.apply(null, arguments).parseZone();
    };
    moment.parseTwoDigitYear = function(input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
    };
    moment.isDate = isDate;
    extend(moment.fn = Moment.prototype, {
        clone: function() {
            return moment(this);
        },
        valueOf: function() {
            return +this._d - (this._offset || 0) * 6e4;
        },
        unix: function() {
            return Math.floor(+this / 1e3);
        },
        toString: function() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },
        toDate: function() {
            return this._offset ? new Date(+this) : this._d;
        },
        toISOString: function() {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                if ("function" === typeof Date.prototype.toISOString) {
                    return this.toDate().toISOString();
                } else {
                    return formatMoment(m, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
                }
            } else {
                return formatMoment(m, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
            }
        },
        toArray: function() {
            var m = this;
            return [ m.year(), m.month(), m.date(), m.hours(), m.minutes(), m.seconds(), m.milliseconds() ];
        },
        isValid: function() {
            return isValid(this);
        },
        isDSTShifted: function() {
            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }
            return false;
        },
        parsingFlags: function() {
            return extend({}, this._pf);
        },
        invalidAt: function() {
            return this._pf.overflow;
        },
        utc: function(keepLocalTime) {
            return this.utcOffset(0, keepLocalTime);
        },
        local: function(keepLocalTime) {
            if (this._isUTC) {
                this.utcOffset(0, keepLocalTime);
                this._isUTC = false;
                if (keepLocalTime) {
                    this.subtract(this._dateUtcOffset(), "m");
                }
            }
            return this;
        },
        format: function(inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.localeData().postformat(output);
        },
        add: createAdder(1, "add"),
        subtract: createAdder(-1, "subtract"),
        diff: function(input, units, asFloat) {
            var that = makeAs(input, this), zoneDiff = (that.utcOffset() - this.utcOffset()) * 6e4, anchor, diff, output, daysAdjust;
            units = normalizeUnits(units);
            if (units === "year" || units === "month" || units === "quarter") {
                output = monthDiff(this, that);
                if (units === "quarter") {
                    output = output / 3;
                } else if (units === "year") {
                    output = output / 12;
                }
            } else {
                diff = this - that;
                output = units === "second" ? diff / 1e3 : units === "minute" ? diff / 6e4 : units === "hour" ? diff / 36e5 : units === "day" ? (diff - zoneDiff) / 864e5 : units === "week" ? (diff - zoneDiff) / 6048e5 : diff;
            }
            return asFloat ? output : absRound(output);
        },
        from: function(time, withoutSuffix) {
            return moment.duration({
                to: this,
                from: time
            }).locale(this.locale()).humanize(!withoutSuffix);
        },
        fromNow: function(withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },
        calendar: function(time) {
            var now = time || moment(), sod = makeAs(now, this).startOf("day"), diff = this.diff(sod, "days", true), format = diff < -6 ? "sameElse" : diff < -1 ? "lastWeek" : diff < 0 ? "lastDay" : diff < 1 ? "sameDay" : diff < 2 ? "nextDay" : diff < 7 ? "nextWeek" : "sameElse";
            return this.format(this.localeData().calendar(format, this, moment(now)));
        },
        isLeapYear: function() {
            return isLeapYear(this.year());
        },
        isDST: function() {
            return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
        },
        day: function(input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.localeData());
                return this.add(input - day, "d");
            } else {
                return day;
            }
        },
        month: makeAccessor("Month", true),
        startOf: function(units) {
            units = normalizeUnits(units);
            switch (units) {
              case "year":
                this.month(0);

              case "quarter":
              case "month":
                this.date(1);

              case "week":
              case "isoWeek":
              case "day":
                this.hours(0);

              case "hour":
                this.minutes(0);

              case "minute":
                this.seconds(0);

              case "second":
                this.milliseconds(0);
            }
            if (units === "week") {
                this.weekday(0);
            } else if (units === "isoWeek") {
                this.isoWeekday(1);
            }
            if (units === "quarter") {
                this.month(Math.floor(this.month() / 3) * 3);
            }
            return this;
        },
        endOf: function(units) {
            units = normalizeUnits(units);
            if (units === undefined || units === "millisecond") {
                return this;
            }
            return this.startOf(units).add(1, units === "isoWeek" ? "week" : units).subtract(1, "ms");
        },
        isAfter: function(input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== "undefined" ? units : "millisecond");
            if (units === "millisecond") {
                input = moment.isMoment(input) ? input : moment(input);
                return +this > +input;
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return inputMs < +this.clone().startOf(units);
            }
        },
        isBefore: function(input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== "undefined" ? units : "millisecond");
            if (units === "millisecond") {
                input = moment.isMoment(input) ? input : moment(input);
                return +this < +input;
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return +this.clone().endOf(units) < inputMs;
            }
        },
        isBetween: function(from, to, units) {
            return this.isAfter(from, units) && this.isBefore(to, units);
        },
        isSame: function(input, units) {
            var inputMs;
            units = normalizeUnits(units || "millisecond");
            if (units === "millisecond") {
                input = moment.isMoment(input) ? input : moment(input);
                return +this === +input;
            } else {
                inputMs = +moment(input);
                return +this.clone().startOf(units) <= inputMs && inputMs <= +this.clone().endOf(units);
            }
        },
        min: deprecate("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(other) {
            other = moment.apply(null, arguments);
            return other < this ? this : other;
        }),
        max: deprecate("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(other) {
            other = moment.apply(null, arguments);
            return other > this ? this : other;
        }),
        zone: deprecate("moment().zone is deprecated, use moment().utcOffset instead. " + "https://github.com/moment/moment/issues/1779", function(input, keepLocalTime) {
            if (input != null) {
                if (typeof input !== "string") {
                    input = -input;
                }
                this.utcOffset(input, keepLocalTime);
                return this;
            } else {
                return -this.utcOffset();
            }
        }),
        utcOffset: function(input, keepLocalTime) {
            var offset = this._offset || 0, localAdjust;
            if (input != null) {
                if (typeof input === "string") {
                    input = utcOffsetFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                if (!this._isUTC && keepLocalTime) {
                    localAdjust = this._dateUtcOffset();
                }
                this._offset = input;
                this._isUTC = true;
                if (localAdjust != null) {
                    this.add(localAdjust, "m");
                }
                if (offset !== input) {
                    if (!keepLocalTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this, moment.duration(input - offset, "m"), 1, false);
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }
                return this;
            } else {
                return this._isUTC ? offset : this._dateUtcOffset();
            }
        },
        isLocal: function() {
            return !this._isUTC;
        },
        isUtcOffset: function() {
            return this._isUTC;
        },
        isUtc: function() {
            return this._isUTC && this._offset === 0;
        },
        zoneAbbr: function() {
            return this._isUTC ? "UTC" : "";
        },
        zoneName: function() {
            return this._isUTC ? "Coordinated Universal Time" : "";
        },
        parseZone: function() {
            if (this._tzm) {
                this.utcOffset(this._tzm);
            } else if (typeof this._i === "string") {
                this.utcOffset(utcOffsetFromString(this._i));
            }
            return this;
        },
        hasAlignedHourOffset: function(input) {
            if (!input) {
                input = 0;
            } else {
                input = moment(input).utcOffset();
            }
            return (this.utcOffset() - input) % 60 === 0;
        },
        daysInMonth: function() {
            return daysInMonth(this.year(), this.month());
        },
        dayOfYear: function(input) {
            var dayOfYear = round((moment(this).startOf("day") - moment(this).startOf("year")) / 864e5) + 1;
            return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
        },
        quarter: function(input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        },
        weekYear: function(input) {
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return input == null ? year : this.add(input - year, "y");
        },
        isoWeekYear: function(input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add(input - year, "y");
        },
        week: function(input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, "d");
        },
        isoWeek: function(input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, "d");
        },
        weekday: function(input) {
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, "d");
        },
        isoWeekday: function(input) {
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },
        isoWeeksInYear: function() {
            return weeksInYear(this.year(), 1, 4);
        },
        weeksInYear: function() {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        },
        get: function(units) {
            units = normalizeUnits(units);
            return this[units]();
        },
        set: function(units, value) {
            var unit;
            if (typeof units === "object") {
                for (unit in units) {
                    this.set(unit, units[unit]);
                }
            } else {
                units = normalizeUnits(units);
                if (typeof this[units] === "function") {
                    this[units](value);
                }
            }
            return this;
        },
        locale: function(key) {
            var newLocaleData;
            if (key === undefined) {
                return this._locale._abbr;
            } else {
                newLocaleData = moment.localeData(key);
                if (newLocaleData != null) {
                    this._locale = newLocaleData;
                }
                return this;
            }
        },
        lang: deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }),
        localeData: function() {
            return this._locale;
        },
        _dateUtcOffset: function() {
            return -Math.round(this._d.getTimezoneOffset() / 15) * 15;
        }
    });
    function rawMonthSetter(mom, value) {
        var dayOfMonth;
        if (typeof value === "string") {
            value = mom.localeData().monthsParse(value);
            if (typeof value !== "number") {
                return mom;
            }
        }
        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
        return mom;
    }
    function rawGetter(mom, unit) {
        return mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]();
    }
    function rawSetter(mom, unit, value) {
        if (unit === "Month") {
            return rawMonthSetter(mom, value);
        } else {
            return mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
        }
    }
    function makeAccessor(unit, keepTime) {
        return function(value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this;
            } else {
                return rawGetter(this, unit);
            }
        };
    }
    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor("Milliseconds", false);
    moment.fn.second = moment.fn.seconds = makeAccessor("Seconds", false);
    moment.fn.minute = moment.fn.minutes = makeAccessor("Minutes", false);
    moment.fn.hour = moment.fn.hours = makeAccessor("Hours", true);
    moment.fn.date = makeAccessor("Date", true);
    moment.fn.dates = deprecate("dates accessor is deprecated. Use date instead.", makeAccessor("Date", true));
    moment.fn.year = makeAccessor("FullYear", true);
    moment.fn.years = deprecate("years accessor is deprecated. Use year instead.", makeAccessor("FullYear", true));
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;
    moment.fn.toJSON = moment.fn.toISOString;
    moment.fn.isUTC = moment.fn.isUtc;
    function daysToYears(days) {
        return days * 400 / 146097;
    }
    function yearsToDays(years) {
        return years * 146097 / 400;
    }
    extend(moment.duration.fn = Duration.prototype, {
        _bubble: function() {
            var milliseconds = this._milliseconds, days = this._days, months = this._months, data = this._data, seconds, minutes, hours, years = 0;
            data.milliseconds = milliseconds % 1e3;
            seconds = absRound(milliseconds / 1e3);
            data.seconds = seconds % 60;
            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;
            hours = absRound(minutes / 60);
            data.hours = hours % 24;
            days += absRound(hours / 24);
            years = absRound(daysToYears(days));
            days -= absRound(yearsToDays(years));
            months += absRound(days / 30);
            days %= 30;
            years += absRound(months / 12);
            months %= 12;
            data.days = days;
            data.months = months;
            data.years = years;
        },
        abs: function() {
            this._milliseconds = Math.abs(this._milliseconds);
            this._days = Math.abs(this._days);
            this._months = Math.abs(this._months);
            this._data.milliseconds = Math.abs(this._data.milliseconds);
            this._data.seconds = Math.abs(this._data.seconds);
            this._data.minutes = Math.abs(this._data.minutes);
            this._data.hours = Math.abs(this._data.hours);
            this._data.months = Math.abs(this._data.months);
            this._data.years = Math.abs(this._data.years);
            return this;
        },
        weeks: function() {
            return absRound(this.days() / 7);
        },
        valueOf: function() {
            return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
        },
        humanize: function(withSuffix) {
            var output = relativeTime(this, !withSuffix, this.localeData());
            if (withSuffix) {
                output = this.localeData().pastFuture(+this, output);
            }
            return this.localeData().postformat(output);
        },
        add: function(input, val) {
            var dur = moment.duration(input, val);
            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;
            this._bubble();
            return this;
        },
        subtract: function(input, val) {
            var dur = moment.duration(input, val);
            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;
            this._bubble();
            return this;
        },
        get: function(units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + "s"]();
        },
        as: function(units) {
            var days, months;
            units = normalizeUnits(units);
            if (units === "month" || units === "year") {
                days = this._days + this._milliseconds / 864e5;
                months = this._months + daysToYears(days) * 12;
                return units === "month" ? months : months / 12;
            } else {
                days = this._days + Math.round(yearsToDays(this._months / 12));
                switch (units) {
                  case "week":
                    return days / 7 + this._milliseconds / 6048e5;

                  case "day":
                    return days + this._milliseconds / 864e5;

                  case "hour":
                    return days * 24 + this._milliseconds / 36e5;

                  case "minute":
                    return days * 24 * 60 + this._milliseconds / 6e4;

                  case "second":
                    return days * 24 * 60 * 60 + this._milliseconds / 1e3;

                  case "millisecond":
                    return Math.floor(days * 24 * 60 * 60 * 1e3) + this._milliseconds;

                  default:
                    throw new Error("Unknown unit " + units);
                }
            }
        },
        lang: moment.fn.lang,
        locale: moment.fn.locale,
        toIsoString: deprecate("toIsoString() is deprecated. Please use toISOString() instead " + "(notice the capitals)", function() {
            return this.toISOString();
        }),
        toISOString: function() {
            var years = Math.abs(this.years()), months = Math.abs(this.months()), days = Math.abs(this.days()), hours = Math.abs(this.hours()), minutes = Math.abs(this.minutes()), seconds = Math.abs(this.seconds() + this.milliseconds() / 1e3);
            if (!this.asSeconds()) {
                return "P0D";
            }
            return (this.asSeconds() < 0 ? "-" : "") + "P" + (years ? years + "Y" : "") + (months ? months + "M" : "") + (days ? days + "D" : "") + (hours || minutes || seconds ? "T" : "") + (hours ? hours + "H" : "") + (minutes ? minutes + "M" : "") + (seconds ? seconds + "S" : "");
        },
        localeData: function() {
            return this._locale;
        },
        toJSON: function() {
            return this.toISOString();
        }
    });
    moment.duration.fn.toString = moment.duration.fn.toISOString;
    function makeDurationGetter(name) {
        moment.duration.fn[name] = function() {
            return this._data[name];
        };
    }
    for (i in unitMillisecondFactors) {
        if (hasOwnProp(unitMillisecondFactors, i)) {
            makeDurationGetter(i.toLowerCase());
        }
    }
    moment.duration.fn.asMilliseconds = function() {
        return this.as("ms");
    };
    moment.duration.fn.asSeconds = function() {
        return this.as("s");
    };
    moment.duration.fn.asMinutes = function() {
        return this.as("m");
    };
    moment.duration.fn.asHours = function() {
        return this.as("h");
    };
    moment.duration.fn.asDays = function() {
        return this.as("d");
    };
    moment.duration.fn.asWeeks = function() {
        return this.as("weeks");
    };
    moment.duration.fn.asMonths = function() {
        return this.as("M");
    };
    moment.duration.fn.asYears = function() {
        return this.as("y");
    };
    moment.locale("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(number) {
            var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
            return number + output;
        }
    });
    function makeGlobal(shouldDeprecate) {
        if (typeof ender !== "undefined") {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate("Accessing Moment through the global scope is " + "deprecated, and will be removed in an upcoming " + "release.", moment);
        } else {
            globalScope.moment = moment;
        }
    }
    if (hasModule) {
        module.exports = moment;
    } else if (typeof define === "function" && define.amd) {
        define(function(require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                globalScope.moment = oldGlobalMoment;
            }
            return moment;
        });
        makeGlobal(true);
    } else {
        makeGlobal();
    }
}).call(this);

(function(root, factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "moment" ], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("moment"));
    } else {
        factory(root.moment);
    }
})(this, function(moment) {
    "use strict";
    if (moment.tz !== undefined) {
        return moment;
    }
    var VERSION = "0.3.0", zones = {}, links = {}, momentVersion = moment.version.split("."), major = +momentVersion[0], minor = +momentVersion[1];
    if (major < 2 || major === 2 && minor < 6) {
        logError("Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js " + moment.version + ". See momentjs.com");
    }
    function charCodeToInt(charCode) {
        if (charCode > 96) {
            return charCode - 87;
        } else if (charCode > 64) {
            return charCode - 29;
        }
        return charCode - 48;
    }
    function unpackBase60(string) {
        var i = 0, parts = string.split("."), whole = parts[0], fractional = parts[1] || "", multiplier = 1, num, out = 0, sign = 1;
        if (string.charCodeAt(0) === 45) {
            i = 1;
            sign = -1;
        }
        for (i; i < whole.length; i++) {
            num = charCodeToInt(whole.charCodeAt(i));
            out = 60 * out + num;
        }
        for (i = 0; i < fractional.length; i++) {
            multiplier = multiplier / 60;
            num = charCodeToInt(fractional.charCodeAt(i));
            out += num * multiplier;
        }
        return out * sign;
    }
    function arrayToInt(array) {
        for (var i = 0; i < array.length; i++) {
            array[i] = unpackBase60(array[i]);
        }
    }
    function intToUntil(array, length) {
        for (var i = 0; i < length; i++) {
            array[i] = Math.round((array[i - 1] || 0) + array[i] * 6e4);
        }
        array[length - 1] = Infinity;
    }
    function mapIndices(source, indices) {
        var out = [], i;
        for (i = 0; i < indices.length; i++) {
            out[i] = source[indices[i]];
        }
        return out;
    }
    function unpack(string) {
        var data = string.split("|"), offsets = data[2].split(" "), indices = data[3].split(""), untils = data[4].split(" ");
        arrayToInt(offsets);
        arrayToInt(indices);
        arrayToInt(untils);
        intToUntil(untils, indices.length);
        return {
            name: data[0],
            abbrs: mapIndices(data[1].split(" "), indices),
            offsets: mapIndices(offsets, indices),
            untils: untils
        };
    }
    function Zone(packedString) {
        if (packedString) {
            this._set(unpack(packedString));
        }
    }
    Zone.prototype = {
        _set: function(unpacked) {
            this.name = unpacked.name;
            this.abbrs = unpacked.abbrs;
            this.untils = unpacked.untils;
            this.offsets = unpacked.offsets;
        },
        _index: function(timestamp) {
            var target = +timestamp, untils = this.untils, i;
            for (i = 0; i < untils.length; i++) {
                if (target < untils[i]) {
                    return i;
                }
            }
        },
        parse: function(timestamp) {
            var target = +timestamp, offsets = this.offsets, untils = this.untils, max = untils.length - 1, offset, offsetNext, offsetPrev, i;
            for (i = 0; i < max; i++) {
                offset = offsets[i];
                offsetNext = offsets[i + 1];
                offsetPrev = offsets[i ? i - 1 : i];
                if (offset < offsetNext && tz.moveAmbiguousForward) {
                    offset = offsetNext;
                } else if (offset > offsetPrev && tz.moveInvalidForward) {
                    offset = offsetPrev;
                }
                if (target < untils[i] - offset * 6e4) {
                    return offsets[i];
                }
            }
            return offsets[max];
        },
        abbr: function(mom) {
            return this.abbrs[this._index(mom)];
        },
        offset: function(mom) {
            return this.offsets[this._index(mom)];
        }
    };
    function normalizeName(name) {
        return (name || "").toLowerCase().replace(/\//g, "_");
    }
    function addZone(packed) {
        var i, zone, zoneName;
        if (typeof packed === "string") {
            packed = [ packed ];
        }
        for (i = 0; i < packed.length; i++) {
            zone = new Zone(packed[i]);
            zoneName = normalizeName(zone.name);
            zones[zoneName] = zone;
            upgradeLinksToZones(zoneName);
        }
    }
    function getZone(name) {
        return zones[normalizeName(name)] || null;
    }
    function getNames() {
        var i, out = [];
        for (i in zones) {
            if (zones.hasOwnProperty(i) && zones[i]) {
                out.push(zones[i].name);
            }
        }
        return out.sort();
    }
    function addLink(aliases) {
        var i, alias;
        if (typeof aliases === "string") {
            aliases = [ aliases ];
        }
        for (i = 0; i < aliases.length; i++) {
            alias = aliases[i].split("|");
            pushLink(alias[0], alias[1]);
            pushLink(alias[1], alias[0]);
        }
    }
    function upgradeLinksToZones(zoneName) {
        if (!links[zoneName]) {
            return;
        }
        var i, zone = zones[zoneName], linkNames = links[zoneName];
        for (i = 0; i < linkNames.length; i++) {
            copyZoneWithName(zone, linkNames[i]);
        }
        links[zoneName] = null;
    }
    function copyZoneWithName(zone, name) {
        var linkZone = zones[normalizeName(name)] = new Zone();
        linkZone._set(zone);
        linkZone.name = name;
    }
    function pushLink(zoneName, linkName) {
        zoneName = normalizeName(zoneName);
        if (zones[zoneName]) {
            copyZoneWithName(zones[zoneName], linkName);
        } else {
            links[zoneName] = links[zoneName] || [];
            links[zoneName].push(linkName);
        }
    }
    function loadData(data) {
        addZone(data.zones);
        addLink(data.links);
        tz.dataVersion = data.version;
    }
    function zoneExists(name) {
        if (!zoneExists.didShowError) {
            zoneExists.didShowError = true;
            logError("moment.tz.zoneExists('" + name + "') has been deprecated in favor of !moment.tz.zone('" + name + "')");
        }
        return !!getZone(name);
    }
    function needsOffset(m) {
        return !!(m._a && m._tzm === undefined);
    }
    function logError(message) {
        if (typeof console !== "undefined" && typeof console.error === "function") {
            console.error(message);
        }
    }
    function tz(input) {
        var args = Array.prototype.slice.call(arguments, 0, -1), name = arguments[arguments.length - 1], zone = getZone(name), out = moment.utc.apply(null, args);
        if (zone && !moment.isMoment(input) && needsOffset(out)) {
            out.add(zone.parse(out), "minutes");
        }
        out.tz(name);
        return out;
    }
    tz.version = VERSION;
    tz.dataVersion = "";
    tz._zones = zones;
    tz._links = links;
    tz.add = addZone;
    tz.link = addLink;
    tz.load = loadData;
    tz.zone = getZone;
    tz.zoneExists = zoneExists;
    tz.names = getNames;
    tz.Zone = Zone;
    tz.unpack = unpack;
    tz.unpackBase60 = unpackBase60;
    tz.needsOffset = needsOffset;
    tz.moveInvalidForward = true;
    tz.moveAmbiguousForward = false;
    var fn = moment.fn;
    moment.tz = tz;
    moment.defaultZone = null;
    moment.updateOffset = function(mom, keepTime) {
        var offset;
        if (mom._z === undefined) {
            mom._z = moment.defaultZone;
        }
        if (mom._z) {
            offset = mom._z.offset(mom);
            if (Math.abs(offset) < 16) {
                offset = offset / 60;
            }
            if (mom.utcOffset !== undefined) {
                mom.utcOffset(-offset, keepTime);
            } else {
                mom.zone(offset, keepTime);
            }
        }
    };
    fn.tz = function(name) {
        if (name) {
            this._z = getZone(name);
            if (this._z) {
                moment.updateOffset(this);
            } else {
                logError("Moment Timezone has no data for " + name + ". See http://momentjs.com/timezone/docs/#/data-loading/.");
            }
            return this;
        }
        if (this._z) {
            return this._z.name;
        }
    };
    function abbrWrap(old) {
        return function() {
            if (this._z) {
                return this._z.abbr(this);
            }
            return old.call(this);
        };
    }
    function resetZoneWrap(old) {
        return function() {
            this._z = null;
            return old.apply(this, arguments);
        };
    }
    fn.zoneName = abbrWrap(fn.zoneName);
    fn.zoneAbbr = abbrWrap(fn.zoneAbbr);
    fn.utc = resetZoneWrap(fn.utc);
    moment.tz.setDefault = function(name) {
        if (major < 2 || major === 2 && minor < 9) {
            logError("Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js " + moment.version + ".");
        }
        moment.defaultZone = name ? getZone(name) : null;
        return moment;
    };
    var momentProperties = moment.momentProperties;
    if (Object.prototype.toString.call(momentProperties) === "[object Array]") {
        momentProperties.push("_z");
        momentProperties.push("_a");
    } else if (momentProperties) {
        momentProperties._z = null;
    }
    loadData({
        version: "2014j",
        zones: [ "Africa/Abidjan|GMT|0|0|", "Africa/Addis_Ababa|EAT|-30|0|", "Africa/Algiers|CET|-10|0|", "Africa/Bangui|WAT|-10|0|", "Africa/Blantyre|CAT|-20|0|", "Africa/Cairo|EET EEST|-20 -30|0101010101010101010101010101010|1Cby0 Fb0 c10 8n0 8Nd0 gL0 e10 mn0 1o10 jz0 gN0 pb0 1qN0 dX0 e10 xz0 1o10 bb0 e10 An0 1o10 5z0 e10 FX0 1o10 2L0 e10 IL0 1C10 Lz0", "Africa/Casablanca|WET WEST|0 -10|01010101010101010101010101010101010101010|1Cco0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uo0 e00 DA0 11A0 rA0 e00 Jc0 WM0 m00 gM0 M00 WM0 jc0 e00 RA0 11A0 dA0 e00 Uo0 11A0 800 gM0 Xc0", "Africa/Ceuta|CET CEST|-10 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Africa/Johannesburg|SAST|-20|0|", "Africa/Tripoli|EET CET CEST|-20 -10 -20|0120|1IlA0 TA0 1o00", "Africa/Windhoek|WAST WAT|-20 -10|01010101010101010101010|1C1c0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0", "America/Adak|HAST HADT|a0 90|01010101010101010101010|1BR00 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Anchorage|AKST AKDT|90 80|01010101010101010101010|1BQX0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Anguilla|AST|40|0|", "America/Araguaina|BRT BRST|30 20|010|1IdD0 Lz0", "America/Argentina/Buenos_Aires|ART|30|0|", "America/Asuncion|PYST PYT|30 40|01010101010101010101010|1C430 1a10 1fz0 1a10 1fz0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0", "America/Atikokan|EST|50|0|", "America/Bahia|BRT BRST|30 20|010|1FJf0 Rb0", "America/Bahia_Banderas|MST CDT CST|70 50 60|01212121212121212121212|1C1l0 1nW0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0", "America/Belem|BRT|30|0|", "America/Belize|CST|60|0|", "America/Boa_Vista|AMT|40|0|", "America/Bogota|COT|50|0|", "America/Boise|MST MDT|70 60|01010101010101010101010|1BQV0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Campo_Grande|AMST AMT|30 40|01010101010101010101010|1BIr0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10", "America/Cancun|CST CDT|60 50|01010101010101010101010|1C1k0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0", "America/Caracas|VET|4u|0|", "America/Cayenne|GFT|30|0|", "America/Chicago|CST CDT|60 50|01010101010101010101010|1BQU0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Chihuahua|MST MDT|70 60|01010101010101010101010|1C1l0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0", "America/Creston|MST|70|0|", "America/Dawson|PST PDT|80 70|01010101010101010101010|1BQW0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Detroit|EST EDT|50 40|01010101010101010101010|1BQT0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Eirunepe|AMT ACT|40 50|01|1KLE0", "America/Glace_Bay|AST ADT|40 30|01010101010101010101010|1BQS0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Godthab|WGT WGST|30 20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "America/Goose_Bay|AST ADT|40 30|01010101010101010101010|1BQQ1 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Grand_Turk|EST EDT AST|50 40 40|0101010101012|1BQT0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Guayaquil|ECT|50|0|", "America/Guyana|GYT|40|0|", "America/Havana|CST CDT|50 40|01010101010101010101010|1BQR0 1wo0 U00 1zc0 U00 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0", "America/La_Paz|BOT|40|0|", "America/Lima|PET|50|0|", "America/Metlakatla|PST|80|0|", "America/Miquelon|PMST PMDT|30 20|01010101010101010101010|1BQR0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Montevideo|UYST UYT|20 30|01010101010101010101010|1BQQ0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10", "America/Noronha|FNT|20|0|", "America/North_Dakota/Beulah|MST MDT CST CDT|70 60 60 50|01232323232323232323232|1BQV0 1zb0 Oo0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Paramaribo|SRT|30|0|", "America/Port-au-Prince|EST EDT|50 40|0101010101010101010|1GI70 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Santa_Isabel|PST PDT|80 70|01010101010101010101010|1C1m0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0", "America/Santiago|CLST CLT|30 40|01010101010101010101010|1C1f0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 1wn0 Rd0 1wn0 Rd0 1wn0 Rd0 1zb0 Op0 1zb0 Rd0 1wn0 Rd0", "America/Sao_Paulo|BRST BRT|20 30|01010101010101010101010|1BIq0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10", "America/Scoresbysund|EGT EGST|10 0|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "America/St_Johns|NST NDT|3u 2u|01010101010101010101010|1BQPv 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "Antarctica/Casey|CAST AWST|-b0 -80|0101|1BN30 40P0 KL0", "Antarctica/Davis|DAVT DAVT|-50 -70|0101|1BPw0 3Wn0 KN0", "Antarctica/DumontDUrville|DDUT|-a0|0|", "Antarctica/Macquarie|AEDT MIST|-b0 -b0|01|1C140", "Antarctica/Mawson|MAWT|-50|0|", "Antarctica/McMurdo|NZDT NZST|-d0 -c0|01010101010101010101010|1C120 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00", "Antarctica/Rothera|ROTT|30|0|", "Antarctica/Syowa|SYOT|-30|0|", "Antarctica/Troll|UTC CEST|0 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Antarctica/Vostok|VOST|-60|0|", "Asia/Aden|AST|-30|0|", "Asia/Almaty|ALMT|-60|0|", "Asia/Amman|EET EEST|-20 -30|010101010101010101010|1BVy0 1qM0 11A0 1o00 11A0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0", "Asia/Anadyr|ANAT ANAST ANAT|-c0 -c0 -b0|0120|1BWe0 1qN0 WM0", "Asia/Aqtau|AQTT|-50|0|", "Asia/Ashgabat|TMT|-50|0|", "Asia/Baku|AZT AZST|-40 -50|01010101010101010101010|1BWo0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Asia/Bangkok|ICT|-70|0|", "Asia/Beirut|EET EEST|-20 -30|01010101010101010101010|1BWm0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0", "Asia/Bishkek|KGT|-60|0|", "Asia/Brunei|BNT|-80|0|", "Asia/Calcutta|IST|-5u|0|", "Asia/Chita|YAKT YAKST YAKT IRKT|-90 -a0 -a0 -80|01023|1BWh0 1qM0 WM0 8Hz0", "Asia/Choibalsan|CHOT|-80|0|", "Asia/Chongqing|CST|-80|0|", "Asia/Dacca|BDT|-60|0|", "Asia/Damascus|EET EEST|-20 -30|01010101010101010101010|1C0m0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0", "Asia/Dili|TLT|-90|0|", "Asia/Dubai|GST|-40|0|", "Asia/Dushanbe|TJT|-50|0|", "Asia/Gaza|EET EEST|-20 -30|01010101010101010101010|1BVW1 SKX 1xd1 MKX 1AN0 1a00 1fA0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0", "Asia/Hebron|EET EEST|-20 -30|0101010101010101010101010|1BVy0 Tb0 1xd1 MKX bB0 cn0 1cN0 1a00 1fA0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0", "Asia/Hong_Kong|HKT|-80|0|", "Asia/Hovd|HOVT|-70|0|", "Asia/Irkutsk|IRKT IRKST IRKT|-80 -90 -90|01020|1BWi0 1qM0 WM0 8Hz0", "Asia/Istanbul|EET EEST|-20 -30|01010101010101010101010|1BWp0 1qM0 Xc0 1qo0 WM0 1qM0 11A0 1o00 1200 1nA0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Asia/Jakarta|WIB|-70|0|", "Asia/Jayapura|WIT|-90|0|", "Asia/Jerusalem|IST IDT|-20 -30|01010101010101010101010|1BVA0 17X0 1kp0 1dz0 1c10 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0", "Asia/Kabul|AFT|-4u|0|", "Asia/Kamchatka|PETT PETST PETT|-c0 -c0 -b0|0120|1BWe0 1qN0 WM0", "Asia/Karachi|PKT|-50|0|", "Asia/Kashgar|XJT|-60|0|", "Asia/Kathmandu|NPT|-5J|0|", "Asia/Khandyga|VLAT VLAST VLAT YAKT YAKT|-a0 -b0 -b0 -a0 -90|010234|1BWg0 1qM0 WM0 17V0 7zD0", "Asia/Krasnoyarsk|KRAT KRAST KRAT|-70 -80 -80|01020|1BWj0 1qM0 WM0 8Hz0", "Asia/Kuala_Lumpur|MYT|-80|0|", "Asia/Magadan|MAGT MAGST MAGT MAGT|-b0 -c0 -c0 -a0|01023|1BWf0 1qM0 WM0 8Hz0", "Asia/Makassar|WITA|-80|0|", "Asia/Manila|PHT|-80|0|", "Asia/Nicosia|EET EEST|-20 -30|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Asia/Novokuznetsk|KRAT NOVST NOVT NOVT|-70 -70 -60 -70|01230|1BWj0 1qN0 WM0 8Hz0", "Asia/Novosibirsk|NOVT NOVST NOVT|-60 -70 -70|01020|1BWk0 1qM0 WM0 8Hz0", "Asia/Omsk|OMST OMSST OMST|-60 -70 -70|01020|1BWk0 1qM0 WM0 8Hz0", "Asia/Oral|ORAT|-50|0|", "Asia/Pyongyang|KST|-90|0|", "Asia/Qyzylorda|QYZT|-60|0|", "Asia/Rangoon|MMT|-6u|0|", "Asia/Sakhalin|SAKT SAKST SAKT|-a0 -b0 -b0|01020|1BWg0 1qM0 WM0 8Hz0", "Asia/Samarkand|UZT|-50|0|", "Asia/Singapore|SGT|-80|0|", "Asia/Srednekolymsk|MAGT MAGST MAGT SRET|-b0 -c0 -c0 -b0|01023|1BWf0 1qM0 WM0 8Hz0", "Asia/Tbilisi|GET|-40|0|", "Asia/Tehran|IRST IRDT|-3u -4u|01010101010101010101010|1BTUu 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0", "Asia/Thimbu|BTT|-60|0|", "Asia/Tokyo|JST|-90|0|", "Asia/Ulaanbaatar|ULAT|-80|0|", "Asia/Ust-Nera|MAGT MAGST MAGT VLAT VLAT|-b0 -c0 -c0 -b0 -a0|010234|1BWf0 1qM0 WM0 17V0 7zD0", "Asia/Vladivostok|VLAT VLAST VLAT|-a0 -b0 -b0|01020|1BWg0 1qM0 WM0 8Hz0", "Asia/Yakutsk|YAKT YAKST YAKT|-90 -a0 -a0|01020|1BWh0 1qM0 WM0 8Hz0", "Asia/Yekaterinburg|YEKT YEKST YEKT|-50 -60 -60|01020|1BWl0 1qM0 WM0 8Hz0", "Asia/Yerevan|AMT AMST|-40 -50|01010|1BWm0 1qM0 WM0 1qM0", "Atlantic/Azores|AZOT AZOST|10 0|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Atlantic/Canary|WET WEST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Atlantic/Cape_Verde|CVT|10|0|", "Atlantic/South_Georgia|GST|20|0|", "Atlantic/Stanley|FKST FKT|30 40|010|1C6R0 U10", "Australia/ACT|AEDT AEST|-b0 -a0|01010101010101010101010|1C140 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0", "Australia/Adelaide|ACDT ACST|-au -9u|01010101010101010101010|1C14u 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0", "Australia/Brisbane|AEST|-a0|0|", "Australia/Darwin|ACST|-9u|0|", "Australia/Eucla|ACWST|-8J|0|", "Australia/LHI|LHDT LHST|-b0 -au|01010101010101010101010|1C130 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu", "Australia/Perth|AWST|-80|0|", "Chile/EasterIsland|EASST EAST|50 60|01010101010101010101010|1C1f0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 1wn0 Rd0 1wn0 Rd0 1wn0 Rd0 1zb0 Op0 1zb0 Rd0 1wn0 Rd0", "Eire|GMT IST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Etc/GMT+1|GMT+1|10|0|", "Etc/GMT+10|GMT+10|a0|0|", "Etc/GMT+11|GMT+11|b0|0|", "Etc/GMT+12|GMT+12|c0|0|", "Etc/GMT+2|GMT+2|20|0|", "Etc/GMT+3|GMT+3|30|0|", "Etc/GMT+4|GMT+4|40|0|", "Etc/GMT+5|GMT+5|50|0|", "Etc/GMT+6|GMT+6|60|0|", "Etc/GMT+7|GMT+7|70|0|", "Etc/GMT+8|GMT+8|80|0|", "Etc/GMT+9|GMT+9|90|0|", "Etc/GMT-1|GMT-1|-10|0|", "Etc/GMT-10|GMT-10|-a0|0|", "Etc/GMT-11|GMT-11|-b0|0|", "Etc/GMT-12|GMT-12|-c0|0|", "Etc/GMT-13|GMT-13|-d0|0|", "Etc/GMT-14|GMT-14|-e0|0|", "Etc/GMT-2|GMT-2|-20|0|", "Etc/GMT-3|GMT-3|-30|0|", "Etc/GMT-4|GMT-4|-40|0|", "Etc/GMT-5|GMT-5|-50|0|", "Etc/GMT-6|GMT-6|-60|0|", "Etc/GMT-7|GMT-7|-70|0|", "Etc/GMT-8|GMT-8|-80|0|", "Etc/GMT-9|GMT-9|-90|0|", "Etc/UCT|UCT|0|0|", "Etc/UTC|UTC|0|0|", "Europe/Belfast|GMT BST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Europe/Kaliningrad|EET EEST FET|-20 -30 -30|01020|1BWo0 1qM0 WM0 8Hz0", "Europe/Minsk|EET EEST FET MSK|-20 -30 -30 -30|01023|1BWo0 1qM0 WM0 8Hy0", "Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0", "Europe/Samara|SAMT SAMST SAMT|-40 -40 -30|0120|1BWm0 1qN0 WM0", "Europe/Simferopol|EET EEST MSK MSK|-20 -30 -40 -30|01010101023|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11z0 1nW0", "Europe/Volgograd|MSK MSK|-30 -40|01010|1BWn0 1qM0 WM0 8Hz0", "HST|HST|a0|0|", "Indian/Chagos|IOT|-60|0|", "Indian/Christmas|CXT|-70|0|", "Indian/Cocos|CCT|-6u|0|", "Indian/Kerguelen|TFT|-50|0|", "Indian/Mahe|SCT|-40|0|", "Indian/Maldives|MVT|-50|0|", "Indian/Mauritius|MUT|-40|0|", "Indian/Reunion|RET|-40|0|", "Kwajalein|MHT|-c0|0|", "MET|MET MEST|-10 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "NZ-CHAT|CHADT CHAST|-dJ -cJ|01010101010101010101010|1C120 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00", "Pacific/Apia|SST SDT WSDT WSST|b0 a0 -e0 -d0|01012323232323232323232|1Dbn0 1ff0 1a00 CI0 AQ0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00", "Pacific/Bougainville|PGT BST|-a0 -b0|01|1NwE0", "Pacific/Chuuk|CHUT|-a0|0|", "Pacific/Efate|VUT|-b0|0|", "Pacific/Enderbury|PHOT|-d0|0|", "Pacific/Fakaofo|TKT TKT|b0 -d0|01|1Gfn0", "Pacific/Fiji|FJST FJT|-d0 -c0|01010101010101010101010|1BWe0 1o00 Rc0 1wo0 Ao0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 xA0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1SM0", "Pacific/Funafuti|TVT|-c0|0|", "Pacific/Galapagos|GALT|60|0|", "Pacific/Gambier|GAMT|90|0|", "Pacific/Guadalcanal|SBT|-b0|0|", "Pacific/Guam|ChST|-a0|0|", "Pacific/Kiritimati|LINT|-e0|0|", "Pacific/Kosrae|KOST|-b0|0|", "Pacific/Marquesas|MART|9u|0|", "Pacific/Midway|SST|b0|0|", "Pacific/Nauru|NRT|-c0|0|", "Pacific/Niue|NUT|b0|0|", "Pacific/Norfolk|NFT|-bu|0|", "Pacific/Noumea|NCT|-b0|0|", "Pacific/Palau|PWT|-90|0|", "Pacific/Pohnpei|PONT|-b0|0|", "Pacific/Port_Moresby|PGT|-a0|0|", "Pacific/Rarotonga|CKT|a0|0|", "Pacific/Tahiti|TAHT|a0|0|", "Pacific/Tarawa|GILT|-c0|0|", "Pacific/Tongatapu|TOT|-d0|0|", "Pacific/Wake|WAKT|-c0|0|", "Pacific/Wallis|WFT|-c0|0|" ],
        links: [ "Africa/Abidjan|Africa/Accra", "Africa/Abidjan|Africa/Bamako", "Africa/Abidjan|Africa/Banjul", "Africa/Abidjan|Africa/Bissau", "Africa/Abidjan|Africa/Conakry", "Africa/Abidjan|Africa/Dakar", "Africa/Abidjan|Africa/Freetown", "Africa/Abidjan|Africa/Lome", "Africa/Abidjan|Africa/Monrovia", "Africa/Abidjan|Africa/Nouakchott", "Africa/Abidjan|Africa/Ouagadougou", "Africa/Abidjan|Africa/Sao_Tome", "Africa/Abidjan|Africa/Timbuktu", "Africa/Abidjan|America/Danmarkshavn", "Africa/Abidjan|Atlantic/Reykjavik", "Africa/Abidjan|Atlantic/St_Helena", "Africa/Abidjan|Etc/GMT", "Africa/Abidjan|Etc/GMT+0", "Africa/Abidjan|Etc/GMT-0", "Africa/Abidjan|Etc/GMT0", "Africa/Abidjan|Etc/Greenwich", "Africa/Abidjan|GMT", "Africa/Abidjan|GMT+0", "Africa/Abidjan|GMT-0", "Africa/Abidjan|GMT0", "Africa/Abidjan|Greenwich", "Africa/Abidjan|Iceland", "Africa/Addis_Ababa|Africa/Asmara", "Africa/Addis_Ababa|Africa/Asmera", "Africa/Addis_Ababa|Africa/Dar_es_Salaam", "Africa/Addis_Ababa|Africa/Djibouti", "Africa/Addis_Ababa|Africa/Juba", "Africa/Addis_Ababa|Africa/Kampala", "Africa/Addis_Ababa|Africa/Khartoum", "Africa/Addis_Ababa|Africa/Mogadishu", "Africa/Addis_Ababa|Africa/Nairobi", "Africa/Addis_Ababa|Indian/Antananarivo", "Africa/Addis_Ababa|Indian/Comoro", "Africa/Addis_Ababa|Indian/Mayotte", "Africa/Algiers|Africa/Tunis", "Africa/Bangui|Africa/Brazzaville", "Africa/Bangui|Africa/Douala", "Africa/Bangui|Africa/Kinshasa", "Africa/Bangui|Africa/Lagos", "Africa/Bangui|Africa/Libreville", "Africa/Bangui|Africa/Luanda", "Africa/Bangui|Africa/Malabo", "Africa/Bangui|Africa/Ndjamena", "Africa/Bangui|Africa/Niamey", "Africa/Bangui|Africa/Porto-Novo", "Africa/Blantyre|Africa/Bujumbura", "Africa/Blantyre|Africa/Gaborone", "Africa/Blantyre|Africa/Harare", "Africa/Blantyre|Africa/Kigali", "Africa/Blantyre|Africa/Lubumbashi", "Africa/Blantyre|Africa/Lusaka", "Africa/Blantyre|Africa/Maputo", "Africa/Cairo|Egypt", "Africa/Casablanca|Africa/El_Aaiun", "Africa/Ceuta|Arctic/Longyearbyen", "Africa/Ceuta|Atlantic/Jan_Mayen", "Africa/Ceuta|CET", "Africa/Ceuta|Europe/Amsterdam", "Africa/Ceuta|Europe/Andorra", "Africa/Ceuta|Europe/Belgrade", "Africa/Ceuta|Europe/Berlin", "Africa/Ceuta|Europe/Bratislava", "Africa/Ceuta|Europe/Brussels", "Africa/Ceuta|Europe/Budapest", "Africa/Ceuta|Europe/Busingen", "Africa/Ceuta|Europe/Copenhagen", "Africa/Ceuta|Europe/Gibraltar", "Africa/Ceuta|Europe/Ljubljana", "Africa/Ceuta|Europe/Luxembourg", "Africa/Ceuta|Europe/Madrid", "Africa/Ceuta|Europe/Malta", "Africa/Ceuta|Europe/Monaco", "Africa/Ceuta|Europe/Oslo", "Africa/Ceuta|Europe/Paris", "Africa/Ceuta|Europe/Podgorica", "Africa/Ceuta|Europe/Prague", "Africa/Ceuta|Europe/Rome", "Africa/Ceuta|Europe/San_Marino", "Africa/Ceuta|Europe/Sarajevo", "Africa/Ceuta|Europe/Skopje", "Africa/Ceuta|Europe/Stockholm", "Africa/Ceuta|Europe/Tirane", "Africa/Ceuta|Europe/Vaduz", "Africa/Ceuta|Europe/Vatican", "Africa/Ceuta|Europe/Vienna", "Africa/Ceuta|Europe/Warsaw", "Africa/Ceuta|Europe/Zagreb", "Africa/Ceuta|Europe/Zurich", "Africa/Ceuta|Poland", "Africa/Johannesburg|Africa/Maseru", "Africa/Johannesburg|Africa/Mbabane", "Africa/Tripoli|Libya", "America/Adak|America/Atka", "America/Adak|US/Aleutian", "America/Anchorage|America/Juneau", "America/Anchorage|America/Nome", "America/Anchorage|America/Sitka", "America/Anchorage|America/Yakutat", "America/Anchorage|US/Alaska", "America/Anguilla|America/Antigua", "America/Anguilla|America/Aruba", "America/Anguilla|America/Barbados", "America/Anguilla|America/Blanc-Sablon", "America/Anguilla|America/Curacao", "America/Anguilla|America/Dominica", "America/Anguilla|America/Grenada", "America/Anguilla|America/Guadeloupe", "America/Anguilla|America/Kralendijk", "America/Anguilla|America/Lower_Princes", "America/Anguilla|America/Marigot", "America/Anguilla|America/Martinique", "America/Anguilla|America/Montserrat", "America/Anguilla|America/Port_of_Spain", "America/Anguilla|America/Puerto_Rico", "America/Anguilla|America/Santo_Domingo", "America/Anguilla|America/St_Barthelemy", "America/Anguilla|America/St_Kitts", "America/Anguilla|America/St_Lucia", "America/Anguilla|America/St_Thomas", "America/Anguilla|America/St_Vincent", "America/Anguilla|America/Tortola", "America/Anguilla|America/Virgin", "America/Argentina/Buenos_Aires|America/Argentina/Catamarca", "America/Argentina/Buenos_Aires|America/Argentina/ComodRivadavia", "America/Argentina/Buenos_Aires|America/Argentina/Cordoba", "America/Argentina/Buenos_Aires|America/Argentina/Jujuy", "America/Argentina/Buenos_Aires|America/Argentina/La_Rioja", "America/Argentina/Buenos_Aires|America/Argentina/Mendoza", "America/Argentina/Buenos_Aires|America/Argentina/Rio_Gallegos", "America/Argentina/Buenos_Aires|America/Argentina/Salta", "America/Argentina/Buenos_Aires|America/Argentina/San_Juan", "America/Argentina/Buenos_Aires|America/Argentina/San_Luis", "America/Argentina/Buenos_Aires|America/Argentina/Tucuman", "America/Argentina/Buenos_Aires|America/Argentina/Ushuaia", "America/Argentina/Buenos_Aires|America/Buenos_Aires", "America/Argentina/Buenos_Aires|America/Catamarca", "America/Argentina/Buenos_Aires|America/Cordoba", "America/Argentina/Buenos_Aires|America/Jujuy", "America/Argentina/Buenos_Aires|America/Mendoza", "America/Argentina/Buenos_Aires|America/Rosario", "America/Atikokan|America/Cayman", "America/Atikokan|America/Coral_Harbour", "America/Atikokan|America/Jamaica", "America/Atikokan|America/Panama", "America/Atikokan|EST", "America/Atikokan|Jamaica", "America/Belem|America/Fortaleza", "America/Belem|America/Maceio", "America/Belem|America/Recife", "America/Belem|America/Santarem", "America/Belize|America/Costa_Rica", "America/Belize|America/El_Salvador", "America/Belize|America/Guatemala", "America/Belize|America/Managua", "America/Belize|America/Regina", "America/Belize|America/Swift_Current", "America/Belize|America/Tegucigalpa", "America/Belize|Canada/East-Saskatchewan", "America/Belize|Canada/Saskatchewan", "America/Boa_Vista|America/Manaus", "America/Boa_Vista|America/Porto_Velho", "America/Boa_Vista|Brazil/West", "America/Boise|America/Cambridge_Bay", "America/Boise|America/Denver", "America/Boise|America/Edmonton", "America/Boise|America/Inuvik", "America/Boise|America/Ojinaga", "America/Boise|America/Shiprock", "America/Boise|America/Yellowknife", "America/Boise|Canada/Mountain", "America/Boise|MST7MDT", "America/Boise|Navajo", "America/Boise|US/Mountain", "America/Campo_Grande|America/Cuiaba", "America/Cancun|America/Merida", "America/Cancun|America/Mexico_City", "America/Cancun|America/Monterrey", "America/Cancun|Mexico/General", "America/Chicago|America/Indiana/Knox", "America/Chicago|America/Indiana/Tell_City", "America/Chicago|America/Knox_IN", "America/Chicago|America/Matamoros", "America/Chicago|America/Menominee", "America/Chicago|America/North_Dakota/Center", "America/Chicago|America/North_Dakota/New_Salem", "America/Chicago|America/Rainy_River", "America/Chicago|America/Rankin_Inlet", "America/Chicago|America/Resolute", "America/Chicago|America/Winnipeg", "America/Chicago|CST6CDT", "America/Chicago|Canada/Central", "America/Chicago|US/Central", "America/Chicago|US/Indiana-Starke", "America/Chihuahua|America/Mazatlan", "America/Chihuahua|Mexico/BajaSur", "America/Creston|America/Dawson_Creek", "America/Creston|America/Hermosillo", "America/Creston|America/Phoenix", "America/Creston|MST", "America/Creston|US/Arizona", "America/Dawson|America/Ensenada", "America/Dawson|America/Los_Angeles", "America/Dawson|America/Tijuana", "America/Dawson|America/Vancouver", "America/Dawson|America/Whitehorse", "America/Dawson|Canada/Pacific", "America/Dawson|Canada/Yukon", "America/Dawson|Mexico/BajaNorte", "America/Dawson|PST8PDT", "America/Dawson|US/Pacific", "America/Dawson|US/Pacific-New", "America/Detroit|America/Fort_Wayne", "America/Detroit|America/Indiana/Indianapolis", "America/Detroit|America/Indiana/Marengo", "America/Detroit|America/Indiana/Petersburg", "America/Detroit|America/Indiana/Vevay", "America/Detroit|America/Indiana/Vincennes", "America/Detroit|America/Indiana/Winamac", "America/Detroit|America/Indianapolis", "America/Detroit|America/Iqaluit", "America/Detroit|America/Kentucky/Louisville", "America/Detroit|America/Kentucky/Monticello", "America/Detroit|America/Louisville", "America/Detroit|America/Montreal", "America/Detroit|America/Nassau", "America/Detroit|America/New_York", "America/Detroit|America/Nipigon", "America/Detroit|America/Pangnirtung", "America/Detroit|America/Thunder_Bay", "America/Detroit|America/Toronto", "America/Detroit|Canada/Eastern", "America/Detroit|EST5EDT", "America/Detroit|US/East-Indiana", "America/Detroit|US/Eastern", "America/Detroit|US/Michigan", "America/Eirunepe|America/Porto_Acre", "America/Eirunepe|America/Rio_Branco", "America/Eirunepe|Brazil/Acre", "America/Glace_Bay|America/Halifax", "America/Glace_Bay|America/Moncton", "America/Glace_Bay|America/Thule", "America/Glace_Bay|Atlantic/Bermuda", "America/Glace_Bay|Canada/Atlantic", "America/Havana|Cuba", "America/Metlakatla|Pacific/Pitcairn", "America/Noronha|Brazil/DeNoronha", "America/Santiago|Antarctica/Palmer", "America/Santiago|Chile/Continental", "America/Sao_Paulo|Brazil/East", "America/St_Johns|Canada/Newfoundland", "Antarctica/McMurdo|Antarctica/South_Pole", "Antarctica/McMurdo|NZ", "Antarctica/McMurdo|Pacific/Auckland", "Asia/Aden|Asia/Baghdad", "Asia/Aden|Asia/Bahrain", "Asia/Aden|Asia/Kuwait", "Asia/Aden|Asia/Qatar", "Asia/Aden|Asia/Riyadh", "Asia/Aqtau|Asia/Aqtobe", "Asia/Ashgabat|Asia/Ashkhabad", "Asia/Bangkok|Asia/Ho_Chi_Minh", "Asia/Bangkok|Asia/Phnom_Penh", "Asia/Bangkok|Asia/Saigon", "Asia/Bangkok|Asia/Vientiane", "Asia/Calcutta|Asia/Colombo", "Asia/Calcutta|Asia/Kolkata", "Asia/Chongqing|Asia/Chungking", "Asia/Chongqing|Asia/Harbin", "Asia/Chongqing|Asia/Macao", "Asia/Chongqing|Asia/Macau", "Asia/Chongqing|Asia/Shanghai", "Asia/Chongqing|Asia/Taipei", "Asia/Chongqing|PRC", "Asia/Chongqing|ROC", "Asia/Dacca|Asia/Dhaka", "Asia/Dubai|Asia/Muscat", "Asia/Hong_Kong|Hongkong", "Asia/Istanbul|Europe/Istanbul", "Asia/Istanbul|Turkey", "Asia/Jakarta|Asia/Pontianak", "Asia/Jerusalem|Asia/Tel_Aviv", "Asia/Jerusalem|Israel", "Asia/Kashgar|Asia/Urumqi", "Asia/Kathmandu|Asia/Katmandu", "Asia/Kuala_Lumpur|Asia/Kuching", "Asia/Makassar|Asia/Ujung_Pandang", "Asia/Nicosia|EET", "Asia/Nicosia|Europe/Athens", "Asia/Nicosia|Europe/Bucharest", "Asia/Nicosia|Europe/Chisinau", "Asia/Nicosia|Europe/Helsinki", "Asia/Nicosia|Europe/Kiev", "Asia/Nicosia|Europe/Mariehamn", "Asia/Nicosia|Europe/Nicosia", "Asia/Nicosia|Europe/Riga", "Asia/Nicosia|Europe/Sofia", "Asia/Nicosia|Europe/Tallinn", "Asia/Nicosia|Europe/Tiraspol", "Asia/Nicosia|Europe/Uzhgorod", "Asia/Nicosia|Europe/Vilnius", "Asia/Nicosia|Europe/Zaporozhye", "Asia/Pyongyang|Asia/Seoul", "Asia/Pyongyang|ROK", "Asia/Samarkand|Asia/Tashkent", "Asia/Singapore|Singapore", "Asia/Tehran|Iran", "Asia/Thimbu|Asia/Thimphu", "Asia/Tokyo|Japan", "Asia/Ulaanbaatar|Asia/Ulan_Bator", "Atlantic/Canary|Atlantic/Faeroe", "Atlantic/Canary|Atlantic/Faroe", "Atlantic/Canary|Atlantic/Madeira", "Atlantic/Canary|Europe/Lisbon", "Atlantic/Canary|Portugal", "Atlantic/Canary|WET", "Australia/ACT|Australia/Canberra", "Australia/ACT|Australia/Currie", "Australia/ACT|Australia/Hobart", "Australia/ACT|Australia/Melbourne", "Australia/ACT|Australia/NSW", "Australia/ACT|Australia/Sydney", "Australia/ACT|Australia/Tasmania", "Australia/ACT|Australia/Victoria", "Australia/Adelaide|Australia/Broken_Hill", "Australia/Adelaide|Australia/South", "Australia/Adelaide|Australia/Yancowinna", "Australia/Brisbane|Australia/Lindeman", "Australia/Brisbane|Australia/Queensland", "Australia/Darwin|Australia/North", "Australia/LHI|Australia/Lord_Howe", "Australia/Perth|Australia/West", "Chile/EasterIsland|Pacific/Easter", "Eire|Europe/Dublin", "Etc/UCT|UCT", "Etc/UTC|Etc/Universal", "Etc/UTC|Etc/Zulu", "Etc/UTC|UTC", "Etc/UTC|Universal", "Etc/UTC|Zulu", "Europe/Belfast|Europe/Guernsey", "Europe/Belfast|Europe/Isle_of_Man", "Europe/Belfast|Europe/Jersey", "Europe/Belfast|Europe/London", "Europe/Belfast|GB", "Europe/Belfast|GB-Eire", "Europe/Moscow|W-SU", "HST|Pacific/Honolulu", "HST|Pacific/Johnston", "HST|US/Hawaii", "Kwajalein|Pacific/Kwajalein", "Kwajalein|Pacific/Majuro", "NZ-CHAT|Pacific/Chatham", "Pacific/Chuuk|Pacific/Truk", "Pacific/Chuuk|Pacific/Yap", "Pacific/Guam|Pacific/Saipan", "Pacific/Midway|Pacific/Pago_Pago", "Pacific/Midway|Pacific/Samoa", "Pacific/Midway|US/Samoa", "Pacific/Pohnpei|Pacific/Ponape" ]
    });
    return moment;
});

(function(root, factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "moment" ], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("moment"));
    } else {
        factory(root.moment);
    }
})(this, function(moment) {
    "use strict";
    if (moment.tz !== undefined) {
        return moment;
    }
    var VERSION = "0.3.0", zones = {}, links = {}, momentVersion = moment.version.split("."), major = +momentVersion[0], minor = +momentVersion[1];
    if (major < 2 || major === 2 && minor < 6) {
        logError("Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js " + moment.version + ". See momentjs.com");
    }
    function charCodeToInt(charCode) {
        if (charCode > 96) {
            return charCode - 87;
        } else if (charCode > 64) {
            return charCode - 29;
        }
        return charCode - 48;
    }
    function unpackBase60(string) {
        var i = 0, parts = string.split("."), whole = parts[0], fractional = parts[1] || "", multiplier = 1, num, out = 0, sign = 1;
        if (string.charCodeAt(0) === 45) {
            i = 1;
            sign = -1;
        }
        for (i; i < whole.length; i++) {
            num = charCodeToInt(whole.charCodeAt(i));
            out = 60 * out + num;
        }
        for (i = 0; i < fractional.length; i++) {
            multiplier = multiplier / 60;
            num = charCodeToInt(fractional.charCodeAt(i));
            out += num * multiplier;
        }
        return out * sign;
    }
    function arrayToInt(array) {
        for (var i = 0; i < array.length; i++) {
            array[i] = unpackBase60(array[i]);
        }
    }
    function intToUntil(array, length) {
        for (var i = 0; i < length; i++) {
            array[i] = Math.round((array[i - 1] || 0) + array[i] * 6e4);
        }
        array[length - 1] = Infinity;
    }
    function mapIndices(source, indices) {
        var out = [], i;
        for (i = 0; i < indices.length; i++) {
            out[i] = source[indices[i]];
        }
        return out;
    }
    function unpack(string) {
        var data = string.split("|"), offsets = data[2].split(" "), indices = data[3].split(""), untils = data[4].split(" ");
        arrayToInt(offsets);
        arrayToInt(indices);
        arrayToInt(untils);
        intToUntil(untils, indices.length);
        return {
            name: data[0],
            abbrs: mapIndices(data[1].split(" "), indices),
            offsets: mapIndices(offsets, indices),
            untils: untils
        };
    }
    function Zone(packedString) {
        if (packedString) {
            this._set(unpack(packedString));
        }
    }
    Zone.prototype = {
        _set: function(unpacked) {
            this.name = unpacked.name;
            this.abbrs = unpacked.abbrs;
            this.untils = unpacked.untils;
            this.offsets = unpacked.offsets;
        },
        _index: function(timestamp) {
            var target = +timestamp, untils = this.untils, i;
            for (i = 0; i < untils.length; i++) {
                if (target < untils[i]) {
                    return i;
                }
            }
        },
        parse: function(timestamp) {
            var target = +timestamp, offsets = this.offsets, untils = this.untils, max = untils.length - 1, offset, offsetNext, offsetPrev, i;
            for (i = 0; i < max; i++) {
                offset = offsets[i];
                offsetNext = offsets[i + 1];
                offsetPrev = offsets[i ? i - 1 : i];
                if (offset < offsetNext && tz.moveAmbiguousForward) {
                    offset = offsetNext;
                } else if (offset > offsetPrev && tz.moveInvalidForward) {
                    offset = offsetPrev;
                }
                if (target < untils[i] - offset * 6e4) {
                    return offsets[i];
                }
            }
            return offsets[max];
        },
        abbr: function(mom) {
            return this.abbrs[this._index(mom)];
        },
        offset: function(mom) {
            return this.offsets[this._index(mom)];
        }
    };
    function normalizeName(name) {
        return (name || "").toLowerCase().replace(/\//g, "_");
    }
    function addZone(packed) {
        var i, zone, zoneName;
        if (typeof packed === "string") {
            packed = [ packed ];
        }
        for (i = 0; i < packed.length; i++) {
            zone = new Zone(packed[i]);
            zoneName = normalizeName(zone.name);
            zones[zoneName] = zone;
            upgradeLinksToZones(zoneName);
        }
    }
    function getZone(name) {
        return zones[normalizeName(name)] || null;
    }
    function getNames() {
        var i, out = [];
        for (i in zones) {
            if (zones.hasOwnProperty(i) && zones[i]) {
                out.push(zones[i].name);
            }
        }
        return out.sort();
    }
    function addLink(aliases) {
        var i, alias;
        if (typeof aliases === "string") {
            aliases = [ aliases ];
        }
        for (i = 0; i < aliases.length; i++) {
            alias = aliases[i].split("|");
            pushLink(alias[0], alias[1]);
            pushLink(alias[1], alias[0]);
        }
    }
    function upgradeLinksToZones(zoneName) {
        if (!links[zoneName]) {
            return;
        }
        var i, zone = zones[zoneName], linkNames = links[zoneName];
        for (i = 0; i < linkNames.length; i++) {
            copyZoneWithName(zone, linkNames[i]);
        }
        links[zoneName] = null;
    }
    function copyZoneWithName(zone, name) {
        var linkZone = zones[normalizeName(name)] = new Zone();
        linkZone._set(zone);
        linkZone.name = name;
    }
    function pushLink(zoneName, linkName) {
        zoneName = normalizeName(zoneName);
        if (zones[zoneName]) {
            copyZoneWithName(zones[zoneName], linkName);
        } else {
            links[zoneName] = links[zoneName] || [];
            links[zoneName].push(linkName);
        }
    }
    function loadData(data) {
        addZone(data.zones);
        addLink(data.links);
        tz.dataVersion = data.version;
    }
    function zoneExists(name) {
        if (!zoneExists.didShowError) {
            zoneExists.didShowError = true;
            logError("moment.tz.zoneExists('" + name + "') has been deprecated in favor of !moment.tz.zone('" + name + "')");
        }
        return !!getZone(name);
    }
    function needsOffset(m) {
        return !!(m._a && m._tzm === undefined);
    }
    function logError(message) {
        if (typeof console !== "undefined" && typeof console.error === "function") {
            console.error(message);
        }
    }
    function tz(input) {
        var args = Array.prototype.slice.call(arguments, 0, -1), name = arguments[arguments.length - 1], zone = getZone(name), out = moment.utc.apply(null, args);
        if (zone && !moment.isMoment(input) && needsOffset(out)) {
            out.add(zone.parse(out), "minutes");
        }
        out.tz(name);
        return out;
    }
    tz.version = VERSION;
    tz.dataVersion = "";
    tz._zones = zones;
    tz._links = links;
    tz.add = addZone;
    tz.link = addLink;
    tz.load = loadData;
    tz.zone = getZone;
    tz.zoneExists = zoneExists;
    tz.names = getNames;
    tz.Zone = Zone;
    tz.unpack = unpack;
    tz.unpackBase60 = unpackBase60;
    tz.needsOffset = needsOffset;
    tz.moveInvalidForward = true;
    tz.moveAmbiguousForward = false;
    var fn = moment.fn;
    moment.tz = tz;
    moment.defaultZone = null;
    moment.updateOffset = function(mom, keepTime) {
        var offset;
        if (mom._z === undefined) {
            mom._z = moment.defaultZone;
        }
        if (mom._z) {
            offset = mom._z.offset(mom);
            if (Math.abs(offset) < 16) {
                offset = offset / 60;
            }
            if (mom.utcOffset !== undefined) {
                mom.utcOffset(-offset, keepTime);
            } else {
                mom.zone(offset, keepTime);
            }
        }
    };
    fn.tz = function(name) {
        if (name) {
            this._z = getZone(name);
            if (this._z) {
                moment.updateOffset(this);
            } else {
                logError("Moment Timezone has no data for " + name + ". See http://momentjs.com/timezone/docs/#/data-loading/.");
            }
            return this;
        }
        if (this._z) {
            return this._z.name;
        }
    };
    function abbrWrap(old) {
        return function() {
            if (this._z) {
                return this._z.abbr(this);
            }
            return old.call(this);
        };
    }
    function resetZoneWrap(old) {
        return function() {
            this._z = null;
            return old.apply(this, arguments);
        };
    }
    fn.zoneName = abbrWrap(fn.zoneName);
    fn.zoneAbbr = abbrWrap(fn.zoneAbbr);
    fn.utc = resetZoneWrap(fn.utc);
    moment.tz.setDefault = function(name) {
        if (major < 2 || major === 2 && minor < 9) {
            logError("Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js " + moment.version + ".");
        }
        moment.defaultZone = name ? getZone(name) : null;
        return moment;
    };
    var momentProperties = moment.momentProperties;
    if (Object.prototype.toString.call(momentProperties) === "[object Array]") {
        momentProperties.push("_z");
        momentProperties.push("_a");
    } else if (momentProperties) {
        momentProperties._z = null;
    }
    return moment;
});

(function(factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery", "jquery.ui.widget", "jquery.iframe-transport", "jquery.fileupload" ], factory);
    } else {
        var $ = window.jQuery;
        factory($);
        $(function() {
            if ($.fn.cloudinary_fileupload !== undefined) {
                $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload();
            }
        });
    }
})(function($) {
    "use strict";
    var CF_SHARED_CDN = "d3jpl91pxevbkh.cloudfront.net";
    var OLD_AKAMAI_SHARED_CDN = "cloudinary-a.akamaihd.net";
    var AKAMAI_SHARED_CDN = "res.cloudinary.com";
    var SHARED_CDN = AKAMAI_SHARED_CDN;
    function utf8_encode(argString) {
        if (argString === null || typeof argString === "undefined") {
            return "";
        }
        var string = argString + "";
        var utftext = "", start, end, stringl = 0;
        start = end = 0;
        stringl = string.length;
        for (var n = 0; n < stringl; n++) {
            var c1 = string.charCodeAt(n);
            var enc = null;
            if (c1 < 128) {
                end++;
            } else if (c1 > 127 && c1 < 2048) {
                enc = String.fromCharCode(c1 >> 6 | 192, c1 & 63 | 128);
            } else {
                enc = String.fromCharCode(c1 >> 12 | 224, c1 >> 6 & 63 | 128, c1 & 63 | 128);
            }
            if (enc !== null) {
                if (end > start) {
                    utftext += string.slice(start, end);
                }
                utftext += enc;
                start = end = n + 1;
            }
        }
        if (end > start) {
            utftext += string.slice(start, stringl);
        }
        return utftext;
    }
    function crc32(str) {
        str = utf8_encode(str);
        var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
        var crc = 0;
        var x = 0;
        var y = 0;
        crc = crc ^ -1;
        for (var i = 0, iTop = str.length; i < iTop; i++) {
            y = (crc ^ str.charCodeAt(i)) & 255;
            x = "0x" + table.substr(y * 9, 8);
            crc = crc >>> 8 ^ x;
        }
        crc = crc ^ -1;
        if (crc < 0) {
            crc += 4294967296;
        }
        return crc;
    }
    function option_consume(options, option_name, default_value) {
        var result = options[option_name];
        delete options[option_name];
        return typeof result == "undefined" ? default_value : result;
    }
    function build_array(arg) {
        if (!arg) {
            return [];
        } else if ($.isArray(arg)) {
            return arg;
        } else {
            return [ arg ];
        }
    }
    function present(value) {
        return typeof value != "undefined" && ("" + value).length > 0;
    }
    function process_base_transformations(options) {
        var transformations = build_array(options.transformation);
        var all_named = true;
        for (var i = 0; i < transformations.length; i++) {
            all_named = all_named && typeof transformations[i] == "string";
        }
        if (all_named) {
            return [];
        }
        delete options.transformation;
        var base_transformations = [];
        for (var i = 0; i < transformations.length; i++) {
            var transformation = transformations[i];
            if (typeof transformation == "string") {
                base_transformations.push("t_" + transformation);
            } else {
                base_transformations.push(generate_transformation_string($.extend({}, transformation)));
            }
        }
        return base_transformations;
    }
    function process_size(options) {
        var size = option_consume(options, "size");
        if (size) {
            var split_size = size.split("x");
            options.width = split_size[0];
            options.height = split_size[1];
        }
    }
    function process_html_dimensions(options) {
        var width = options.width, height = options.height;
        var has_layer = options.overlay || options.underlay;
        var crop = options.crop;
        var use_as_html_dimensions = !has_layer && !options.angle && crop != "fit" && crop != "limit" && crop != "lfill";
        if (use_as_html_dimensions) {
            if (width && !options.html_width && width !== "auto" && parseFloat(width) >= 1) options.html_width = width;
            if (height && !options.html_height && parseFloat(height) >= 1) options.html_height = height;
        }
        if (!crop && !has_layer) {
            delete options.width;
            delete options.height;
        }
    }
    var TRANSFORMATION_PARAM_NAME_MAPPING = {
        angle: "a",
        background: "b",
        border: "bo",
        color: "co",
        color_space: "cs",
        crop: "c",
        default_image: "d",
        delay: "dl",
        density: "dn",
        dpr: "dpr",
        effect: "e",
        fetch_format: "f",
        flags: "fl",
        gravity: "g",
        height: "h",
        opacity: "o",
        overlay: "l",
        page: "pg",
        prefix: "p",
        quality: "q",
        radius: "r",
        transformation: "t",
        underlay: "u",
        width: "w",
        x: "x",
        y: "y"
    };
    var TRANSFORMATION_PARAM_VALUE_MAPPING = {
        angle: function(angle) {
            return build_array(angle).join(".");
        },
        background: function(background) {
            return background.replace(/^#/, "rgb:");
        },
        border: function(border) {
            if ($.isPlainObject(border)) {
                var border_width = "" + (border.width || 2);
                var border_color = (border.color || "black").replace(/^#/, "rgb:");
                border = border_width + "px_solid_" + border_color;
            }
            return border;
        },
        color: function(color) {
            return color.replace(/^#/, "rgb:");
        },
        dpr: function(dpr) {
            dpr = dpr.toString();
            if (dpr === "auto") {
                return "1.0";
            } else if (dpr.match(/^\d+$/)) {
                return dpr + ".0";
            } else {
                return dpr;
            }
        },
        effect: function(effect) {
            return build_array(effect).join(":");
        },
        flags: function(flags) {
            return build_array(flags).join(".");
        },
        transformation: function(transformation) {
            return build_array(transformation).join(".");
        }
    };
    function generate_transformation_string(options) {
        var base_transformations = process_base_transformations(options);
        process_size(options);
        process_html_dimensions(options);
        var params = [];
        for (var param in TRANSFORMATION_PARAM_NAME_MAPPING) {
            var value = option_consume(options, param);
            if (!present(value)) continue;
            if (TRANSFORMATION_PARAM_VALUE_MAPPING[param]) {
                value = TRANSFORMATION_PARAM_VALUE_MAPPING[param](value);
            }
            if (!present(value)) continue;
            params.push(TRANSFORMATION_PARAM_NAME_MAPPING[param] + "_" + value);
        }
        params.sort();
        var raw_transformation = option_consume(options, "raw_transformation");
        if (present(raw_transformation)) params.push(raw_transformation);
        var transformation = params.join(",");
        if (present(transformation)) base_transformations.push(transformation);
        return base_transformations.join("/");
    }
    function absolutize(url) {
        if (!url.match(/^https?:\//)) {
            var prefix = document.location.protocol + "//" + document.location.host;
            if (url[0] == "?") {
                prefix += document.location.pathname;
            } else if (url[0] != "/") {
                prefix += document.location.pathname.replace(/\/[^\/]*$/, "/");
            }
            url = prefix + url;
        }
        return url;
    }
    function cloudinary_url(public_id, options) {
        options = options || {};
        var type = option_consume(options, "type", "upload");
        if (type == "fetch") {
            options.fetch_format = options.fetch_format || option_consume(options, "format");
        }
        var transformation = generate_transformation_string(options);
        var resource_type = option_consume(options, "resource_type", "image");
        var version = option_consume(options, "version");
        var format = option_consume(options, "format");
        var cloud_name = option_consume(options, "cloud_name", $.cloudinary.config().cloud_name);
        if (!cloud_name) throw "Unknown cloud_name";
        var private_cdn = option_consume(options, "private_cdn", $.cloudinary.config().private_cdn);
        var secure_distribution = option_consume(options, "secure_distribution", $.cloudinary.config().secure_distribution);
        var cname = option_consume(options, "cname", $.cloudinary.config().cname);
        var cdn_subdomain = option_consume(options, "cdn_subdomain", $.cloudinary.config().cdn_subdomain);
        var shorten = option_consume(options, "shorten", $.cloudinary.config().shorten);
        var secure = option_consume(options, "secure", window.location.protocol == "https:");
        var protocol = option_consume(options, "protocol", $.cloudinary.config().protocol);
        var trust_public_id = option_consume(options, "trust_public_id");
        if (type == "fetch") {
            public_id = absolutize(public_id);
        }
        if (public_id.match(/^https?:/)) {
            if (type == "upload" || type == "asset") return public_id;
            public_id = encodeURIComponent(public_id).replace(/%3A/g, ":").replace(/%2F/g, "/");
        } else {
            public_id = encodeURIComponent(decodeURIComponent(public_id)).replace(/%3A/g, ":").replace(/%2F/g, "/");
            if (format) {
                if (!trust_public_id) public_id = public_id.replace(/\.(jpg|jpeg|png|gif|webp)$/, "");
                public_id = public_id + "." + format;
            }
        }
        var prefix = secure ? "https://" : window.location.protocol === "file:" ? "file://" : "http://";
        prefix = protocol ? protocol + "//" : prefix;
        if (cloud_name.match(/^\//) && !secure) {
            prefix = "/res" + cloud_name;
        } else {
            var shared_domain = !private_cdn;
            if (secure) {
                if (!secure_distribution || secure_distribution == OLD_AKAMAI_SHARED_CDN) {
                    secure_distribution = private_cdn ? cloud_name + "-res.cloudinary.com" : SHARED_CDN;
                }
                shared_domain = shared_domain || secure_distribution == SHARED_CDN;
                prefix += secure_distribution;
            } else {
                var subdomain = cdn_subdomain ? "a" + (crc32(public_id) % 5 + 1) + "." : "";
                var host = cname || (private_cdn ? cloud_name + "-res.cloudinary.com" : "res.cloudinary.com");
                prefix += subdomain + host;
            }
            if (shared_domain) prefix += "/" + cloud_name;
        }
        if (shorten && resource_type == "image" && type == "upload") {
            resource_type = "iu";
            type = undefined;
        }
        if (public_id.search("/") >= 0 && !public_id.match(/^v[0-9]+/) && !public_id.match(/^https?:\//) && !present(version)) {
            version = 1;
        }
        var url = [ prefix, resource_type, type, transformation, version ? "v" + version : "", public_id ].join("/").replace(/([^:])\/+/g, "$1/");
        return url;
    }
    function default_stoppoints(width) {
        return 10 * Math.ceil(width / 10);
    }
    function prepare_html_url(public_id, options) {
        if ($.cloudinary.config("dpr") && !options.dpr) {
            options.dpr = $.cloudinary.config("dpr");
        }
        var url = cloudinary_url(public_id, options);
        var width = option_consume(options, "html_width");
        var height = option_consume(options, "html_height");
        if (width) options.width = width;
        if (height) options.height = height;
        return url;
    }
    function get_config(name, options, default_value) {
        var value = options[name] || $.cloudinary.config(name);
        if (typeof value == "undefined") value = default_value;
        return value;
    }
    var cloudinary_config = null;
    var responsive_config = null;
    var responsive_resize_initialized = false;
    var device_pixel_ratio_cache = {};
    $.cloudinary = {
        CF_SHARED_CDN: CF_SHARED_CDN,
        OLD_AKAMAI_SHARED_CDN: OLD_AKAMAI_SHARED_CDN,
        AKAMAI_SHARED_CDN: AKAMAI_SHARED_CDN,
        SHARED_CDN: SHARED_CDN,
        config: function(new_config, new_value) {
            if (!cloudinary_config) {
                cloudinary_config = {};
                $('meta[name^="cloudinary_"]').each(function() {
                    cloudinary_config[$(this).attr("name").replace("cloudinary_", "")] = $(this).attr("content");
                });
            }
            if (typeof new_value != "undefined") {
                cloudinary_config[new_config] = new_value;
            } else if (typeof new_config == "string") {
                return cloudinary_config[new_config];
            } else if (new_config) {
                cloudinary_config = new_config;
            }
            return cloudinary_config;
        },
        url: function(public_id, options) {
            options = $.extend({}, options);
            return cloudinary_url(public_id, options);
        },
        url_internal: cloudinary_url,
        transformation_string: function(options) {
            options = $.extend({}, options);
            return generate_transformation_string(options);
        },
        image: function(public_id, options) {
            options = $.extend({}, options);
            var url = prepare_html_url(public_id, options);
            var img = $("<img/>").data("src-cache", url).attr(options).cloudinary_update(options);
            return img;
        },
        facebook_profile_image: function(public_id, options) {
            return $.cloudinary.image(public_id, $.extend({
                type: "facebook"
            }, options));
        },
        twitter_profile_image: function(public_id, options) {
            return $.cloudinary.image(public_id, $.extend({
                type: "twitter"
            }, options));
        },
        twitter_name_profile_image: function(public_id, options) {
            return $.cloudinary.image(public_id, $.extend({
                type: "twitter_name"
            }, options));
        },
        gravatar_image: function(public_id, options) {
            return $.cloudinary.image(public_id, $.extend({
                type: "gravatar"
            }, options));
        },
        fetch_image: function(public_id, options) {
            return $.cloudinary.image(public_id, $.extend({
                type: "fetch"
            }, options));
        },
        sprite_css: function(public_id, options) {
            options = $.extend({
                type: "sprite"
            }, options);
            if (!public_id.match(/.css$/)) options.format = "css";
            return $.cloudinary.url(public_id, options);
        },
        responsive: function(options) {
            responsive_config = $.extend(responsive_config || {}, options);
            $("img.cld-responsive, img.cld-hidpi").cloudinary_update(responsive_config);
            var responsive_resize = get_config("responsive_resize", responsive_config, true);
            if (responsive_resize && !responsive_resize_initialized) {
                responsive_config.resizing = responsive_resize_initialized = true;
                var timeout = null;
                $(window).on("resize", function() {
                    var debounce = get_config("responsive_debounce", responsive_config, 100);
                    function reset() {
                        if (timeout) {
                            clearTimeout(timeout);
                            timeout = null;
                        }
                    }
                    function run() {
                        $("img.cld-responsive").cloudinary_update(responsive_config);
                    }
                    function wait() {
                        reset();
                        setTimeout(function() {
                            reset();
                            run();
                        }, debounce);
                    }
                    if (debounce) {
                        wait();
                    } else {
                        run();
                    }
                });
            }
        },
        calc_stoppoint: function(element, width) {
            var stoppoints = $(element).data("stoppoints") || $.cloudinary.config().stoppoints || default_stoppoints;
            if (typeof stoppoints === "function") {
                return stoppoints(width);
            }
            if (typeof stoppoints === "string") {
                stoppoints = $.map(stoppoints.split(","), function(val) {
                    return parseInt(val);
                });
            }
            var i = stoppoints.length - 2;
            while (i >= 0 && stoppoints[i] >= width) {
                i--;
            }
            return stoppoints[i + 1];
        },
        device_pixel_ratio: function() {
            var dpr = window.devicePixelRatio || 1;
            var dpr_string = device_pixel_ratio_cache[dpr];
            if (!dpr_string) {
                dpr_string = dpr.toString();
                if (dpr_string.match(/^\d+$/)) dpr_string += ".0";
                device_pixel_ratio_cache[dpr] = dpr_string;
            }
            return dpr_string;
        }
    };
    $.fn.cloudinary = function(options) {
        this.filter("img").each(function() {
            var img_options = $.extend({
                width: $(this).attr("width"),
                height: $(this).attr("height"),
                src: $(this).attr("src")
            }, $(this).data(), options);
            var public_id = option_consume(img_options, "source", option_consume(img_options, "src"));
            var url = prepare_html_url(public_id, img_options);
            $(this).data("src-cache", url).attr({
                width: img_options.width,
                height: img_options.height
            });
        }).cloudinary_update(options);
        return this;
    };
    $.fn.cloudinary_update = function(options) {
        options = options || {};
        var responsive_use_stoppoints = get_config("responsive_use_stoppoints", options, "resize");
        var exact = responsive_use_stoppoints === false || responsive_use_stoppoints == "resize" && !options.resizing;
        this.filter("img").each(function() {
            if (options.responsive) {
                $(this).addClass("cld-responsive");
            }
            var attrs = {};
            var src = $(this).data("src-cache") || $(this).data("src");
            if (!src) return;
            var responsive = $(this).hasClass("cld-responsive") && src.match(/\bw_auto\b/);
            if (responsive) {
                var container = $(this).parent()[0];
                var containerWidth = container ? container.clientWidth : 0;
                if (containerWidth == 0) {
                    return;
                }
                var requestedWidth = exact ? containerWidth : $.cloudinary.calc_stoppoint(this, containerWidth);
                var currentWidth = $(this).data("width") || 0;
                if (requestedWidth > currentWidth) {
                    $(this).data("width", requestedWidth);
                } else {
                    requestedWidth = currentWidth;
                }
                src = src.replace(/\bw_auto\b/g, "w_" + requestedWidth);
                attrs.width = null;
                attrs.height = null;
            }
            attrs.src = src.replace(/\bdpr_(1\.0|auto)\b/g, "dpr_" + $.cloudinary.device_pixel_ratio());
            $(this).attr(attrs);
        });
        return this;
    };
    var webp = null;
    $.fn.webpify = function(options, webp_options) {
        var that = this;
        options = options || {};
        webp_options = webp_options || options;
        if (!webp) {
            webp = $.Deferred();
            var webp_canary = new Image();
            webp_canary.onerror = webp.reject;
            webp_canary.onload = webp.resolve;
            webp_canary.src = "data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA";
        }
        $(function() {
            webp.done(function() {
                $(that).cloudinary($.extend({}, webp_options, {
                    format: "webp"
                }));
            }).fail(function() {
                $(that).cloudinary(options);
            });
        });
        return this;
    };
    $.fn.fetchify = function(options) {
        return this.cloudinary($.extend(options, {
            type: "fetch"
        }));
    };
    if (!$.fn.fileupload) {
        return;
    }
    $.cloudinary.delete_by_token = function(delete_token, options) {
        options = options || {};
        var url = options.url;
        if (!url) {
            var cloud_name = options.cloud_name || $.cloudinary.config().cloud_name;
            url = "https://api.cloudinary.com/v1_1/" + cloud_name + "/delete_by_token";
        }
        var dataType = $.support.xhrFileUpload ? "json" : "iframe json";
        return $.ajax({
            url: url,
            method: "POST",
            data: {
                token: delete_token
            },
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            },
            dataType: dataType
        });
    };
    $.fn.cloudinary_fileupload = function(options) {
        var initializing = !this.data("blueimpFileupload");
        if (initializing) {
            options = $.extend({
                maxFileSize: 2e7,
                dataType: "json",
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                }
            }, options);
        }
        this.fileupload(options);
        if (initializing) {
            this.bind("fileuploaddone", function(e, data) {
                if (data.result.error) return;
                data.result.path = [ "v", data.result.version, "/", data.result.public_id, data.result.format ? "." + data.result.format : "" ].join("");
                if (data.cloudinaryField && data.form.length > 0) {
                    var upload_info = [ data.result.resource_type, data.result.type, data.result.path ].join("/") + "#" + data.result.signature;
                    var multiple = $(e.target).prop("multiple");
                    var add_field = function() {
                        $("<input></input>").attr({
                            type: "hidden",
                            name: data.cloudinaryField
                        }).val(upload_info).appendTo(data.form);
                    };
                    if (multiple) {
                        add_field();
                    } else {
                        var field = $(data.form).find('input[name="' + data.cloudinaryField + '"]');
                        if (field.length > 0) {
                            field.val(upload_info);
                        } else {
                            add_field();
                        }
                    }
                }
                $(e.target).trigger("cloudinarydone", data);
            });
            this.bind("fileuploadstart", function(e) {
                $(e.target).trigger("cloudinarystart");
            });
            this.bind("fileuploadstop", function(e) {
                $(e.target).trigger("cloudinarystop");
            });
            this.bind("fileuploadprogress", function(e, data) {
                $(e.target).trigger("cloudinaryprogress", data);
            });
            this.bind("fileuploadprogressall", function(e, data) {
                $(e.target).trigger("cloudinaryprogressall", data);
            });
            this.bind("fileuploadfail", function(e, data) {
                $(e.target).trigger("cloudinaryfail", data);
            });
            this.bind("fileuploadalways", function(e, data) {
                $(e.target).trigger("cloudinaryalways", data);
            });
            if (!this.fileupload("option").url) {
                var cloud_name = options.cloud_name || $.cloudinary.config().cloud_name;
                var upload_url = "https://api.cloudinary.com/v1_1/" + cloud_name + "/upload";
                this.fileupload("option", "url", upload_url);
            }
        }
        return this;
    };
    $.fn.cloudinary_upload_url = function(remote_url) {
        this.fileupload("option", "formData").file = remote_url;
        this.fileupload("add", {
            files: [ remote_url ]
        });
        delete this.fileupload("option", "formData").file;
    };
    $.fn.unsigned_cloudinary_upload = function(upload_preset, upload_params, options) {
        options = options || {};
        upload_params = $.extend({}, upload_params) || {};
        if (upload_params.cloud_name) {
            options.cloud_name = upload_params.cloud_name;
            delete upload_params.cloud_name;
        }
        for (var key in upload_params) {
            var value = upload_params[key];
            if ($.isPlainObject(value)) {
                upload_params[key] = $.map(value, function(v, k) {
                    return k + "=" + v;
                }).join("|");
            } else if ($.isArray(value)) {
                if (value.length > 0 && $.isArray(value[0])) {
                    upload_params[key] = $.map(value, function(array_value) {
                        return array_value.join(",");
                    }).join("|");
                } else {
                    upload_params[key] = value.join(",");
                }
            }
        }
        if (!upload_params.callback) {
            upload_params.callback = "/cloudinary_cors.html";
        }
        upload_params.upload_preset = upload_preset;
        options.formData = upload_params;
        if (options.cloudinary_field) {
            options.cloudinaryField = options.cloudinary_field;
            delete options.cloudinary_field;
        }
        var html_options = options.html || {};
        html_options["class"] = "cloudinary_fileupload " + (html_options["class"] || "");
        if (options.multiple) html_options.multiple = true;
        this.attr(html_options).cloudinary_fileupload(options);
        return this;
    };
    $.cloudinary.unsigned_upload_tag = function(upload_preset, upload_params, options) {
        return $("<input/>").attr({
            type: "file",
            name: "file"
        }).unsigned_cloudinary_upload(upload_preset, upload_params, options);
    };
});

(function(factory) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], factory);
    } else if (typeof exports === "object") {
        factory(require("jquery"));
    } else {
        factory(jQuery);
    }
})(function($) {
    var pluses = /\+/g;
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }
    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }
    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
        }
        try {
            s = decodeURIComponent(s.replace(pluses, " "));
            return config.json ? JSON.parse(s) : s;
        } catch (e) {}
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }
    var config = $.cookie = function(key, value, options) {
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === "number") {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e5);
            }
            return document.cookie = [ encode(key), "=", stringifyCookieValue(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : "" ].join("");
        }
        var result = key ? undefined : {};
        var cookies = document.cookie ? document.cookie.split("; ") : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split("=");
            var name = decode(parts.shift());
            var cookie = parts.join("=");
            if (key && key === name) {
                result = read(cookie, value);
                break;
            }
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    };
    config.defaults = {};
    $.removeCookie = function(key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }
        $.cookie(key, "", $.extend({}, options, {
            expires: -1
        }));
        return !$.cookie(key);
    };
});

(function(undefined) {
    var __m4 = function() {
        var can = window.can || {};
        if (typeof GLOBALCAN === "undefined" || GLOBALCAN !== false) {
            window.can = can;
        }
        can.k = function() {};
        can.isDeferred = function(obj) {
            return obj && typeof obj.then === "function" && typeof obj.pipe === "function";
        };
        var cid = 0;
        can.cid = function(object, name) {
            if (!object._cid) {
                cid++;
                object._cid = (name || "") + cid;
            }
            return object._cid;
        };
        can.VERSION = "@EDGE";
        can.simpleExtend = function(d, s) {
            for (var prop in s) {
                d[prop] = s[prop];
            }
            return d;
        };
        can.frag = function(item) {
            var frag;
            if (!item || typeof item === "string") {
                frag = can.buildFragment(item == null ? "" : "" + item, document.body);
                if (!frag.childNodes.length) {
                    frag.appendChild(document.createTextNode(""));
                }
                return frag;
            } else if (item.nodeType === 11) {
                return item;
            } else if (typeof item.nodeType === "number") {
                frag = document.createDocumentFragment();
                frag.appendChild(item);
                return frag;
            } else if (typeof item.length === "number") {
                frag = document.createDocumentFragment();
                can.each(item, function(item) {
                    frag.appendChild(can.frag(item));
                });
                return frag;
            } else {
                frag = can.buildFragment("" + item, document.body);
                if (!frag.childNodes.length) {
                    frag.appendChild(document.createTextNode(""));
                }
                return frag;
            }
        };
        can.__reading = function() {};
        return can;
    }();
    var __m5 = function(can) {
        var setImmediate = window.setImmediate || function(cb) {
            return setTimeout(cb, 0);
        }, attr = {
            MutationObserver: window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
            map: {
                "class": "className",
                value: "value",
                innerText: "innerText",
                textContent: "textContent",
                checked: true,
                disabled: true,
                readonly: true,
                required: true,
                src: function(el, val) {
                    if (val == null || val === "") {
                        el.removeAttribute("src");
                        return null;
                    } else {
                        el.setAttribute("src", val);
                        return val;
                    }
                },
                style: function(el, val) {
                    return el.style.cssText = val || "";
                }
            },
            defaultValue: [ "input", "textarea" ],
            set: function(el, attrName, val) {
                var oldValue;
                if (!attr.MutationObserver) {
                    oldValue = attr.get(el, attrName);
                }
                var tagName = el.nodeName.toString().toLowerCase(), prop = attr.map[attrName], newValue;
                if (typeof prop === "function") {
                    newValue = prop(el, val);
                } else if (prop === true) {
                    newValue = el[attrName] = true;
                    if (attrName === "checked" && el.type === "radio") {
                        if (can.inArray(tagName, attr.defaultValue) >= 0) {
                            el.defaultChecked = true;
                        }
                    }
                } else if (prop) {
                    newValue = el[prop] = val;
                    if (prop === "value" && can.inArray(tagName, attr.defaultValue) >= 0) {
                        el.defaultValue = val;
                    }
                } else {
                    el.setAttribute(attrName, val);
                    newValue = val;
                }
                if (!attr.MutationObserver && newValue !== oldValue) {
                    attr.trigger(el, attrName, oldValue);
                }
            },
            trigger: function(el, attrName, oldValue) {
                if (can.data(can.$(el), "canHasAttributesBindings")) {
                    return setImmediate(function() {
                        can.trigger(el, {
                            type: "attributes",
                            attributeName: attrName,
                            target: el,
                            oldValue: oldValue,
                            bubbles: false
                        }, []);
                    });
                }
            },
            get: function(el, attrName) {
                var prop = attr.map[attrName];
                if (typeof prop === "string" && el[prop]) {
                    return el[prop];
                }
                return el.getAttribute(attrName);
            },
            remove: function(el, attrName) {
                var oldValue;
                if (!attr.MutationObserver) {
                    oldValue = attr.get(el, attrName);
                }
                var setter = attr.map[attrName];
                if (typeof setter === "function") {
                    setter(el, undefined);
                }
                if (setter === true) {
                    el[attrName] = false;
                } else if (typeof setter === "string") {
                    el[setter] = "";
                } else {
                    el.removeAttribute(attrName);
                }
                if (!attr.MutationObserver && oldValue != null) {
                    attr.trigger(el, attrName, oldValue);
                }
            },
            has: function() {
                var el = document.createElement("div");
                if (el.hasAttribute) {
                    return function(el, name) {
                        return el.hasAttribute(name);
                    };
                } else {
                    return function(el, name) {
                        return el.getAttribute(name) !== null;
                    };
                }
            }()
        };
        return attr;
    }(__m4);
    var __m6 = function(can) {
        can.addEvent = function(event, handler) {
            var allEvents = this.__bindEvents || (this.__bindEvents = {}), eventList = allEvents[event] || (allEvents[event] = []);
            eventList.push({
                handler: handler,
                name: event
            });
            return this;
        };
        can.listenTo = function(other, event, handler) {
            var idedEvents = this.__listenToEvents;
            if (!idedEvents) {
                idedEvents = this.__listenToEvents = {};
            }
            var otherId = can.cid(other);
            var othersEvents = idedEvents[otherId];
            if (!othersEvents) {
                othersEvents = idedEvents[otherId] = {
                    obj: other,
                    events: {}
                };
            }
            var eventsEvents = othersEvents.events[event];
            if (!eventsEvents) {
                eventsEvents = othersEvents.events[event] = [];
            }
            eventsEvents.push(handler);
            can.bind.call(other, event, handler);
        };
        can.stopListening = function(other, event, handler) {
            var idedEvents = this.__listenToEvents, iterIdedEvents = idedEvents, i = 0;
            if (!idedEvents) {
                return this;
            }
            if (other) {
                var othercid = can.cid(other);
                (iterIdedEvents = {})[othercid] = idedEvents[othercid];
                if (!idedEvents[othercid]) {
                    return this;
                }
            }
            for (var cid in iterIdedEvents) {
                var othersEvents = iterIdedEvents[cid], eventsEvents;
                other = idedEvents[cid].obj;
                if (!event) {
                    eventsEvents = othersEvents.events;
                } else {
                    (eventsEvents = {})[event] = othersEvents.events[event];
                }
                for (var eventName in eventsEvents) {
                    var handlers = eventsEvents[eventName] || [];
                    i = 0;
                    while (i < handlers.length) {
                        if (handler && handler === handlers[i] || !handler) {
                            can.unbind.call(other, eventName, handlers[i]);
                            handlers.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                    if (!handlers.length) {
                        delete othersEvents.events[eventName];
                    }
                }
                if (can.isEmptyObject(othersEvents.events)) {
                    delete idedEvents[cid];
                }
            }
            return this;
        };
        can.removeEvent = function(event, fn, __validate) {
            if (!this.__bindEvents) {
                return this;
            }
            var events = this.__bindEvents[event] || [], i = 0, ev, isFunction = typeof fn === "function";
            while (i < events.length) {
                ev = events[i];
                if (__validate ? __validate(ev, event, fn) : isFunction && ev.handler === fn || !isFunction && (ev.cid === fn || !fn)) {
                    events.splice(i, 1);
                } else {
                    i++;
                }
            }
            return this;
        };
        can.dispatch = function(event, args) {
            var events = this.__bindEvents;
            if (!events) {
                return;
            }
            if (typeof event === "string") {
                event = {
                    type: event
                };
            }
            var eventName = event.type, handlers = (events[eventName] || []).slice(0), passed = [ event ];
            if (args) {
                passed.push.apply(passed, args);
            }
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i].handler.apply(this, passed);
            }
            return event;
        };
        can.one = function(event, handler) {
            var one = function() {
                can.unbind.call(this, event, one);
                return handler.apply(this, arguments);
            };
            can.bind.call(this, event, one);
            return this;
        };
        can.event = {
            on: function() {
                if (arguments.length === 0 && can.Control && this instanceof can.Control) {
                    return can.Control.prototype.on.call(this);
                } else {
                    return can.addEvent.apply(this, arguments);
                }
            },
            off: function() {
                if (arguments.length === 0 && can.Control && this instanceof can.Control) {
                    return can.Control.prototype.off.call(this);
                } else {
                    return can.removeEvent.apply(this, arguments);
                }
            },
            bind: can.addEvent,
            unbind: can.removeEvent,
            delegate: function(selector, event, handler) {
                return can.addEvent.call(this, event, handler);
            },
            undelegate: function(selector, event, handler) {
                return can.removeEvent.call(this, event, handler);
            },
            trigger: can.dispatch,
            one: can.one,
            addEvent: can.addEvent,
            removeEvent: can.removeEvent,
            listenTo: can.listenTo,
            stopListening: can.stopListening,
            dispatch: can.dispatch
        };
        return can.event;
    }(__m4);
    var __m7 = function(can) {
        var isArrayLike = function(obj) {
            var length = obj.length;
            return typeof arr !== "function" && (length === 0 || typeof length === "number" && length > 0 && length - 1 in obj);
        };
        can.each = function(elements, callback, context) {
            var i = 0, key, len, item;
            if (elements) {
                if (isArrayLike(elements)) {
                    if (can.List && elements instanceof can.List) {
                        for (len = elements.attr("length"); i < len; i++) {
                            item = elements.attr(i);
                            if (callback.call(context || item, item, i, elements) === false) {
                                break;
                            }
                        }
                    } else {
                        for (len = elements.length; i < len; i++) {
                            item = elements[i];
                            if (callback.call(context || item, item, i, elements) === false) {
                                break;
                            }
                        }
                    }
                } else if (typeof elements === "object") {
                    if (can.Map && elements instanceof can.Map || elements === can.route) {
                        var keys = can.Map.keys(elements);
                        for (i = 0, len = keys.length; i < len; i++) {
                            key = keys[i];
                            item = elements.attr(key);
                            if (callback.call(context || item, item, key, elements) === false) {
                                break;
                            }
                        }
                    } else {
                        for (key in elements) {
                            if (elements.hasOwnProperty(key) && callback.call(context || elements[key], elements[key], key, elements) === false) {
                                break;
                            }
                        }
                    }
                }
            }
            return elements;
        };
        return can;
    }(__m4);
    var __m8 = function(can) {
        can.inserted = function(elems) {
            elems = can.makeArray(elems);
            var inDocument = false, doc = can.$(document.contains ? document : document.body), children;
            for (var i = 0, elem; (elem = elems[i]) !== undefined; i++) {
                if (!inDocument) {
                    if (elem.getElementsByTagName) {
                        if (can.has(doc, elem).length) {
                            inDocument = true;
                        } else {
                            return;
                        }
                    } else {
                        continue;
                    }
                }
                if (inDocument && elem.getElementsByTagName) {
                    children = can.makeArray(elem.getElementsByTagName("*"));
                    can.trigger(elem, "inserted", [], false);
                    for (var j = 0, child; (child = children[j]) !== undefined; j++) {
                        can.trigger(child, "inserted", [], false);
                    }
                }
            }
        };
        can.appendChild = function(el, child) {
            var children;
            if (child.nodeType === 11) {
                children = can.makeArray(child.childNodes);
            } else {
                children = [ child ];
            }
            el.appendChild(child);
            can.inserted(children);
        };
        can.insertBefore = function(el, child, ref) {
            var children;
            if (child.nodeType === 11) {
                children = can.makeArray(child.childNodes);
            } else {
                children = [ child ];
            }
            el.insertBefore(child, ref);
            can.inserted(children);
        };
    }(__m4);
    var __m2 = function($, can, attr, event) {
        var isBindableElement = function(node) {
            return node.nodeName && (node.nodeType === 1 || node.nodeType === 9) || node == window;
        };
        $.extend(can, $, {
            trigger: function(obj, event, args, bubbles) {
                if (isBindableElement(obj)) {
                    $.event.trigger(event, args, obj, !bubbles);
                } else if (obj.trigger) {
                    obj.trigger(event, args);
                } else {
                    if (typeof event === "string") {
                        event = {
                            type: event
                        };
                    }
                    event.target = event.target || obj;
                    if (args) {
                        if (args.length && typeof args === "string") {
                            args = [ args ];
                        } else if (!args.length) {
                            args = [ args ];
                        }
                    }
                    if (!args) {
                        args = [];
                    }
                    can.dispatch.call(obj, event, args);
                }
            },
            event: can.event,
            addEvent: can.addEvent,
            removeEvent: can.removeEvent,
            buildFragment: function(elems, context) {
                var ret;
                elems = [ elems ];
                context = context || document;
                context = !context.nodeType && context[0] || context;
                context = context.ownerDocument || context;
                ret = $.buildFragment(elems, context);
                return ret.cacheable ? $.clone(ret.fragment) : ret.fragment || ret;
            },
            $: $,
            each: can.each,
            bind: function(ev, cb) {
                if (this.bind && this.bind !== can.bind) {
                    this.bind(ev, cb);
                } else if (isBindableElement(this)) {
                    $.event.add(this, ev, cb);
                } else {
                    can.addEvent.call(this, ev, cb);
                }
                return this;
            },
            unbind: function(ev, cb) {
                if (this.unbind && this.unbind !== can.unbind) {
                    this.unbind(ev, cb);
                } else if (isBindableElement(this)) {
                    $.event.remove(this, ev, cb);
                } else {
                    can.removeEvent.call(this, ev, cb);
                }
                return this;
            },
            delegate: function(selector, ev, cb) {
                if (this.delegate) {
                    this.delegate(selector, ev, cb);
                } else if (isBindableElement(this)) {
                    $(this).delegate(selector, ev, cb);
                } else {
                    can.bind.call(this, ev, cb);
                }
                return this;
            },
            undelegate: function(selector, ev, cb) {
                if (this.undelegate) {
                    this.undelegate(selector, ev, cb);
                } else if (isBindableElement(this)) {
                    $(this).undelegate(selector, ev, cb);
                } else {
                    can.unbind.call(this, ev, cb);
                }
                return this;
            },
            proxy: function(fn, context) {
                return function() {
                    return fn.apply(context, arguments);
                };
            },
            attr: attr
        });
        can.on = can.bind;
        can.off = can.unbind;
        $.each([ "append", "filter", "addClass", "remove", "data", "get", "has" ], function(i, name) {
            can[name] = function(wrapped) {
                return wrapped[name].apply(wrapped, can.makeArray(arguments).slice(1));
            };
        });
        var oldClean = $.cleanData;
        $.cleanData = function(elems) {
            $.each(elems, function(i, elem) {
                if (elem) {
                    can.trigger(elem, "removed", [], false);
                }
            });
            oldClean(elems);
        };
        var oldDomManip = $.fn.domManip, cbIndex;
        $.fn.domManip = function(args, cb1, cb2) {
            for (var i = 1; i < arguments.length; i++) {
                if (typeof arguments[i] === "function") {
                    cbIndex = i;
                    break;
                }
            }
            return oldDomManip.apply(this, arguments);
        };
        $(document.createElement("div")).append(document.createElement("div"));
        $.fn.domManip = cbIndex === 2 ? function(args, table, callback) {
            return oldDomManip.call(this, args, table, function(elem) {
                var elems;
                if (elem.nodeType === 11) {
                    elems = can.makeArray(elem.childNodes);
                }
                var ret = callback.apply(this, arguments);
                can.inserted(elems ? elems : [ elem ]);
                return ret;
            });
        } : function(args, callback) {
            return oldDomManip.call(this, args, function(elem) {
                var elems;
                if (elem.nodeType === 11) {
                    elems = can.makeArray(elem.childNodes);
                }
                var ret = callback.apply(this, arguments);
                can.inserted(elems ? elems : [ elem ]);
                return ret;
            });
        };
        if (!can.attr.MutationObserver) {
            var oldAttr = $.attr;
            $.attr = function(el, attrName) {
                var oldValue, newValue;
                if (arguments.length >= 3) {
                    oldValue = oldAttr.call(this, el, attrName);
                }
                var res = oldAttr.apply(this, arguments);
                if (arguments.length >= 3) {
                    newValue = oldAttr.call(this, el, attrName);
                }
                if (newValue !== oldValue) {
                    can.attr.trigger(el, attrName, oldValue);
                }
                return res;
            };
            var oldRemove = $.removeAttr;
            $.removeAttr = function(el, attrName) {
                var oldValue = oldAttr.call(this, el, attrName), res = oldRemove.apply(this, arguments);
                if (oldValue != null) {
                    can.attr.trigger(el, attrName, oldValue);
                }
                return res;
            };
            $.event.special.attributes = {
                setup: function() {
                    can.data(can.$(this), "canHasAttributesBindings", true);
                },
                teardown: function() {
                    $.removeData(this, "canHasAttributesBindings");
                }
            };
        } else {
            $.event.special.attributes = {
                setup: function() {
                    var self = this;
                    var observer = new can.attr.MutationObserver(function(mutations) {
                        mutations.forEach(function(mutation) {
                            var copy = can.simpleExtend({}, mutation);
                            can.trigger(self, copy, []);
                        });
                    });
                    observer.observe(this, {
                        attributes: true,
                        attributeOldValue: true
                    });
                    can.data(can.$(this), "canAttributesObserver", observer);
                },
                teardown: function() {
                    can.data(can.$(this), "canAttributesObserver").disconnect();
                    $.removeData(this, "canAttributesObserver");
                }
            };
        }
        (function() {
            var text = "<-\n>", frag = can.buildFragment(text, document);
            if (text !== frag.childNodes[0].nodeValue) {
                var oldBuildFragment = can.buildFragment;
                can.buildFragment = function(content, context) {
                    var res = oldBuildFragment(content, context);
                    if (res.childNodes.length === 1 && res.childNodes[0].nodeType === 3) {
                        res.childNodes[0].nodeValue = content;
                    }
                    return res;
                };
            }
        })();
        $.event.special.inserted = {};
        $.event.special.removed = {};
        return can;
    }(jQuery, __m4, __m5, __m6, __m7, __m8);
    var __m10 = function(can) {
        var isFunction = can.isFunction, makeArray = can.makeArray, hookupId = 1;
        var makeRenderer = function(textRenderer) {
            var renderer = function() {
                return $view.frag(textRenderer.apply(this, arguments));
            };
            renderer.render = function() {
                return textRenderer.apply(textRenderer, arguments);
            };
            return renderer;
        };
        var checkText = function(text, url) {
            if (!text.length) {
                throw "can.view: No template or empty template:" + url;
            }
        };
        var getRenderer = function(obj, async) {
            if (isFunction(obj)) {
                var def = can.Deferred();
                return def.resolve(obj);
            }
            var url = typeof obj === "string" ? obj : obj.url, suffix = obj.engine && "." + obj.engine || url.match(/\.[\w\d]+$/), type, el, id;
            if (url.match(/^#/)) {
                url = url.substr(1);
            }
            if (el = document.getElementById(url)) {
                suffix = "." + el.type.match(/\/(x\-)?(.+)/)[2];
            }
            if (!suffix && !$view.cached[url]) {
                url += suffix = $view.ext;
            }
            if (can.isArray(suffix)) {
                suffix = suffix[0];
            }
            id = $view.toId(url);
            if (url.match(/^\/\//)) {
                url = url.substr(2);
                url = !window.steal ? url : steal.config().root.mapJoin("" + steal.id(url));
            }
            if (window.require) {
                if (require.toUrl) {
                    url = require.toUrl(url);
                }
            }
            type = $view.types[suffix];
            if ($view.cached[id]) {
                return $view.cached[id];
            } else if (el) {
                return $view.registerView(id, el.innerHTML, type);
            } else {
                var d = new can.Deferred();
                can.ajax({
                    async: async,
                    url: url,
                    dataType: "text",
                    error: function(jqXHR) {
                        checkText("", url);
                        d.reject(jqXHR);
                    },
                    success: function(text) {
                        checkText(text, url);
                        $view.registerView(id, text, type, d);
                    }
                });
                return d;
            }
        };
        var getDeferreds = function(data) {
            var deferreds = [];
            if (can.isDeferred(data)) {
                return [ data ];
            } else {
                for (var prop in data) {
                    if (can.isDeferred(data[prop])) {
                        deferreds.push(data[prop]);
                    }
                }
            }
            return deferreds;
        };
        var usefulPart = function(resolved) {
            return can.isArray(resolved) && resolved[1] === "success" ? resolved[0] : resolved;
        };
        var $view = can.view = can.template = function(view, data, helpers, callback) {
            if (isFunction(helpers)) {
                callback = helpers;
                helpers = undefined;
            }
            return $view.renderAs("fragment", view, data, helpers, callback);
        };
        can.extend($view, {
            frag: function(result, parentNode) {
                return $view.hookup($view.fragment(result), parentNode);
            },
            fragment: function(result) {
                if (typeof result !== "string" && result.nodeType === 11) {
                    return result;
                }
                var frag = can.buildFragment(result, document.body);
                if (!frag.childNodes.length) {
                    frag.appendChild(document.createTextNode(""));
                }
                return frag;
            },
            toId: function(src) {
                return can.map(src.toString().split(/\/|\./g), function(part) {
                    if (part) {
                        return part;
                    }
                }).join("_");
            },
            toStr: function(txt) {
                return txt == null ? "" : "" + txt;
            },
            hookup: function(fragment, parentNode) {
                var hookupEls = [], id, func;
                can.each(fragment.childNodes ? can.makeArray(fragment.childNodes) : fragment, function(node) {
                    if (node.nodeType === 1) {
                        hookupEls.push(node);
                        hookupEls.push.apply(hookupEls, can.makeArray(node.getElementsByTagName("*")));
                    }
                });
                can.each(hookupEls, function(el) {
                    if (el.getAttribute && (id = el.getAttribute("data-view-id")) && (func = $view.hookups[id])) {
                        func(el, parentNode, id);
                        delete $view.hookups[id];
                        el.removeAttribute("data-view-id");
                    }
                });
                return fragment;
            },
            hookups: {},
            hook: function(cb) {
                $view.hookups[++hookupId] = cb;
                return " data-view-id='" + hookupId + "'";
            },
            cached: {},
            cachedRenderers: {},
            cache: true,
            register: function(info) {
                this.types["." + info.suffix] = info;
                can[info.suffix] = $view[info.suffix] = function(id, text) {
                    var renderer, renderFunc;
                    if (!text) {
                        renderFunc = function() {
                            if (!renderer) {
                                if (info.fragRenderer) {
                                    renderer = info.fragRenderer(null, id);
                                } else {
                                    renderer = makeRenderer(info.renderer(null, id));
                                }
                            }
                            return renderer.apply(this, arguments);
                        };
                        renderFunc.render = function() {
                            var textRenderer = info.renderer(null, id);
                            return textRenderer.apply(textRenderer, arguments);
                        };
                        return renderFunc;
                    }
                    var registeredRenderer = function() {
                        if (!renderer) {
                            if (info.fragRenderer) {
                                renderer = info.fragRenderer(id, text);
                            } else {
                                renderer = info.renderer(id, text);
                            }
                        }
                        return renderer.apply(this, arguments);
                    };
                    if (info.fragRenderer) {
                        return $view.preload(id, registeredRenderer);
                    } else {
                        return $view.preloadStringRenderer(id, registeredRenderer);
                    }
                };
            },
            types: {},
            ext: ".ejs",
            registerScript: function(type, id, src) {
                return "can.view.preloadStringRenderer('" + id + "'," + $view.types["." + type].script(id, src) + ");";
            },
            preload: function(id, renderer) {
                var def = $view.cached[id] = new can.Deferred().resolve(function(data, helpers) {
                    return renderer.call(data, data, helpers);
                });
                def.__view_id = id;
                $view.cachedRenderers[id] = renderer;
                return renderer;
            },
            preloadStringRenderer: function(id, stringRenderer) {
                return this.preload(id, makeRenderer(stringRenderer));
            },
            render: function(view, data, helpers, callback) {
                return can.view.renderAs("string", view, data, helpers, callback);
            },
            renderTo: function(format, renderer, data, helpers) {
                return (format === "string" && renderer.render ? renderer.render : renderer)(data, helpers);
            },
            renderAs: function(format, view, data, helpers, callback) {
                if (isFunction(helpers)) {
                    callback = helpers;
                    helpers = undefined;
                }
                var deferreds = getDeferreds(data);
                var reading, deferred, dataCopy, async, response;
                if (deferreds.length) {
                    deferred = new can.Deferred();
                    dataCopy = can.extend({}, data);
                    deferreds.push(getRenderer(view, true));
                    can.when.apply(can, deferreds).then(function(resolved) {
                        var objs = makeArray(arguments), renderer = objs.pop(), result;
                        if (can.isDeferred(data)) {
                            dataCopy = usefulPart(resolved);
                        } else {
                            for (var prop in data) {
                                if (can.isDeferred(data[prop])) {
                                    dataCopy[prop] = usefulPart(objs.shift());
                                }
                            }
                        }
                        result = can.view.renderTo(format, renderer, dataCopy, helpers);
                        deferred.resolve(result, dataCopy);
                        if (callback) {
                            callback(result, dataCopy);
                        }
                    }, function() {
                        deferred.reject.apply(deferred, arguments);
                    });
                    return deferred;
                } else {
                    reading = can.__clearReading();
                    async = isFunction(callback);
                    deferred = getRenderer(view, async);
                    if (reading) {
                        can.__setReading(reading);
                    }
                    if (async) {
                        response = deferred;
                        deferred.then(function(renderer) {
                            callback(data ? can.view.renderTo(format, renderer, data, helpers) : renderer);
                        });
                    } else {
                        if (deferred.state() === "resolved" && deferred.__view_id) {
                            var currentRenderer = $view.cachedRenderers[deferred.__view_id];
                            return data ? can.view.renderTo(format, currentRenderer, data, helpers) : currentRenderer;
                        } else {
                            deferred.then(function(renderer) {
                                response = data ? can.view.renderTo(format, renderer, data, helpers) : renderer;
                            });
                        }
                    }
                    return response;
                }
            },
            registerView: function(id, text, type, def) {
                var info = typeof type === "object" ? type : $view.types[type || $view.ext], renderer;
                if (info.fragRenderer) {
                    renderer = info.fragRenderer(id, text);
                } else {
                    renderer = makeRenderer(info.renderer(id, text));
                }
                def = def || new can.Deferred();
                if ($view.cache) {
                    $view.cached[id] = def;
                    def.__view_id = id;
                    $view.cachedRenderers[id] = renderer;
                }
                return def.resolve(renderer);
            }
        });
        return can;
    }(__m2);
    var __m9 = function(can) {
        var attr = can.view.attr = function(attributeName, attrHandler) {
            if (attrHandler) {
                if (typeof attributeName === "string") {
                    attributes[attributeName] = attrHandler;
                } else {
                    regExpAttributes.push({
                        match: attributeName,
                        handler: attrHandler
                    });
                }
            } else {
                var cb = attributes[attributeName];
                if (!cb) {
                    for (var i = 0, len = regExpAttributes.length; i < len; i++) {
                        var attrMatcher = regExpAttributes[i];
                        if (attrMatcher.match.test(attributeName)) {
                            cb = attrMatcher.handler;
                            break;
                        }
                    }
                }
                return cb;
            }
        };
        var attributes = {}, regExpAttributes = [], automaticCustomElementCharacters = /[-\:]/;
        var tag = can.view.tag = function(tagName, tagHandler) {
            if (tagHandler) {
                if (window.html5) {
                    window.html5.elements += " " + tagName;
                    window.html5.shivDocument();
                }
                tags[tagName.toLowerCase()] = tagHandler;
            } else {
                var cb = tags[tagName.toLowerCase()];
                if (!cb && automaticCustomElementCharacters.test(tagName)) {
                    cb = function() {};
                }
                return cb;
            }
        };
        var tags = {};
        can.view.callbacks = {
            _tags: tags,
            _attributes: attributes,
            _regExpAttributes: regExpAttributes,
            tag: tag,
            attr: attr,
            tagHandler: function(el, tagName, tagData) {
                var helperTagCallback = tagData.options.attr("tags." + tagName), tagCallback = helperTagCallback || tags[tagName];
                var scope = tagData.scope, res;
                if (tagCallback) {
                    var reads = can.__clearReading();
                    res = tagCallback(el, tagData);
                    can.__setReading(reads);
                } else {
                    res = scope;
                }
                if (res && tagData.subtemplate) {
                    if (scope !== res) {
                        scope = scope.add(res);
                    }
                    var result = tagData.subtemplate(scope, tagData.options);
                    var frag = typeof result === "string" ? can.view.frag(result) : result;
                    can.appendChild(el, frag);
                }
            }
        };
        return can.view.callbacks;
    }(__m2, __m10);
    var __m13 = function(can) {
        var strUndHash = /_|-/, strColons = /\=\=/, strWords = /([A-Z]+)([A-Z][a-z])/g, strLowUp = /([a-z\d])([A-Z])/g, strDash = /([a-z\d])([A-Z])/g, strReplacer = /\{([^\}]+)\}/g, strQuote = /"/g, strSingleQuote = /'/g, strHyphenMatch = /-+(.)?/g, strCamelMatch = /[a-z][A-Z]/g, getNext = function(obj, prop, add) {
            var result = obj[prop];
            if (result === undefined && add === true) {
                result = obj[prop] = {};
            }
            return result;
        }, isContainer = function(current) {
            return /^f|^o/.test(typeof current);
        }, convertBadValues = function(content) {
            var isInvalid = content === null || content === undefined || isNaN(content) && "" + content === "NaN";
            return "" + (isInvalid ? "" : content);
        };
        can.extend(can, {
            esc: function(content) {
                return convertBadValues(content).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(strQuote, "&#34;").replace(strSingleQuote, "&#39;");
            },
            getObject: function(name, roots, add) {
                var parts = name ? name.split(".") : [], length = parts.length, current, r = 0, i, container, rootsLength;
                roots = can.isArray(roots) ? roots : [ roots || window ];
                rootsLength = roots.length;
                if (!length) {
                    return roots[0];
                }
                for (r; r < rootsLength; r++) {
                    current = roots[r];
                    container = undefined;
                    for (i = 0; i < length && isContainer(current); i++) {
                        container = current;
                        current = getNext(container, parts[i]);
                    }
                    if (container !== undefined && current !== undefined) {
                        break;
                    }
                }
                if (add === false && current !== undefined) {
                    delete container[parts[i - 1]];
                }
                if (add === true && current === undefined) {
                    current = roots[0];
                    for (i = 0; i < length && isContainer(current); i++) {
                        current = getNext(current, parts[i], true);
                    }
                }
                return current;
            },
            capitalize: function(s, cache) {
                return s.charAt(0).toUpperCase() + s.slice(1);
            },
            camelize: function(str) {
                return convertBadValues(str).replace(strHyphenMatch, function(match, chr) {
                    return chr ? chr.toUpperCase() : "";
                });
            },
            hyphenate: function(str) {
                return convertBadValues(str).replace(strCamelMatch, function(str, offset) {
                    return str.charAt(0) + "-" + str.charAt(1).toLowerCase();
                });
            },
            underscore: function(s) {
                return s.replace(strColons, "/").replace(strWords, "$1_$2").replace(strLowUp, "$1_$2").replace(strDash, "_").toLowerCase();
            },
            sub: function(str, data, remove) {
                var obs = [];
                str = str || "";
                obs.push(str.replace(strReplacer, function(whole, inside) {
                    var ob = can.getObject(inside, data, remove === true ? false : undefined);
                    if (ob === undefined || ob === null) {
                        obs = null;
                        return "";
                    }
                    if (isContainer(ob) && obs) {
                        obs.push(ob);
                        return "";
                    }
                    return "" + ob;
                }));
                return obs === null ? obs : obs.length <= 1 ? obs[0] : obs;
            },
            replacer: strReplacer,
            undHash: strUndHash
        });
        return can;
    }(__m2);
    var __m12 = function(can) {
        var initializing = 0;
        var getDescriptor = function(newProps, name) {
            var descriptor = Object.getOwnPropertyDescriptor(newProps, name);
            if (descriptor && (descriptor.get || descriptor.set)) {
                return descriptor;
            }
            return null;
        }, inheritGetterSetter = function(newProps, oldProps, addTo) {
            addTo = addTo || newProps;
            var descriptor;
            for (var name in newProps) {
                if (descriptor = getDescriptor(newProps, name)) {
                    this._defineProperty(addTo, oldProps, name, descriptor);
                } else {
                    can.Construct._overwrite(addTo, oldProps, name, newProps[name]);
                }
            }
        }, simpleInherit = function(newProps, oldProps, addTo) {
            addTo = addTo || newProps;
            for (var name in newProps) {
                can.Construct._overwrite(addTo, oldProps, name, newProps[name]);
            }
        };
        can.Construct = function() {
            if (arguments.length) {
                return can.Construct.extend.apply(can.Construct, arguments);
            }
        };
        can.extend(can.Construct, {
            constructorExtends: true,
            newInstance: function() {
                var inst = this.instance(), args;
                if (inst.setup) {
                    args = inst.setup.apply(inst, arguments);
                }
                if (inst.init) {
                    inst.init.apply(inst, args || arguments);
                }
                return inst;
            },
            _inherit: Object.getOwnPropertyDescriptor ? inheritGetterSetter : simpleInherit,
            _defineProperty: function(what, oldProps, propName, descriptor) {
                Object.defineProperty(what, propName, descriptor);
            },
            _overwrite: function(what, oldProps, propName, val) {
                what[propName] = val;
            },
            setup: function(base, fullName) {
                this.defaults = can.extend(true, {}, base.defaults, this.defaults);
            },
            instance: function() {
                initializing = 1;
                var inst = new this();
                initializing = 0;
                return inst;
            },
            extend: function(name, staticProperties, instanceProperties) {
                var fullName = name, klass = staticProperties, proto = instanceProperties;
                if (typeof fullName !== "string") {
                    proto = klass;
                    klass = fullName;
                    fullName = null;
                }
                if (!proto) {
                    proto = klass;
                    klass = null;
                }
                proto = proto || {};
                var _super_class = this, _super = this.prototype, parts, current, _fullName, _shortName, propName, shortName, namespace, prototype;
                prototype = this.instance();
                can.Construct._inherit(proto, _super, prototype);
                function Constructor() {
                    if (!initializing) {
                        return this.constructor !== Constructor && arguments.length && Constructor.constructorExtends ? Constructor.extend.apply(Constructor, arguments) : Constructor.newInstance.apply(Constructor, arguments);
                    }
                }
                for (propName in _super_class) {
                    if (_super_class.hasOwnProperty(propName)) {
                        Constructor[propName] = _super_class[propName];
                    }
                }
                can.Construct._inherit(klass, _super_class, Constructor);
                if (fullName) {
                    parts = fullName.split(".");
                    shortName = parts.pop();
                    current = can.getObject(parts.join("."), window, true);
                    namespace = current;
                    _fullName = can.underscore(fullName.replace(/\./g, "_"));
                    _shortName = can.underscore(shortName);
                    current[shortName] = Constructor;
                }
                can.extend(Constructor, {
                    constructor: Constructor,
                    prototype: prototype,
                    namespace: namespace,
                    _shortName: _shortName,
                    fullName: fullName,
                    _fullName: _fullName
                });
                if (shortName !== undefined) {
                    Constructor.shortName = shortName;
                }
                Constructor.prototype.constructor = Constructor;
                var t = [ _super_class ].concat(can.makeArray(arguments)), args = Constructor.setup.apply(Constructor, t);
                if (Constructor.init) {
                    Constructor.init.apply(Constructor, args || t);
                }
                return Constructor;
            }
        });
        can.Construct.prototype.setup = function() {};
        can.Construct.prototype.init = function() {};
        return can.Construct;
    }(__m13);
    var __m11 = function(can) {
        var bind = function(el, ev, callback) {
            can.bind.call(el, ev, callback);
            return function() {
                can.unbind.call(el, ev, callback);
            };
        }, isFunction = can.isFunction, extend = can.extend, each = can.each, slice = [].slice, paramReplacer = /\{([^\}]+)\}/g, special = can.getObject("$.event.special", [ can ]) || {}, delegate = function(el, selector, ev, callback) {
            can.delegate.call(el, selector, ev, callback);
            return function() {
                can.undelegate.call(el, selector, ev, callback);
            };
        }, binder = function(el, ev, callback, selector) {
            return selector ? delegate(el, can.trim(selector), ev, callback) : bind(el, ev, callback);
        }, basicProcessor;
        var Control = can.Control = can.Construct({
            setup: function() {
                can.Construct.setup.apply(this, arguments);
                if (can.Control) {
                    var control = this, funcName;
                    control.actions = {};
                    for (funcName in control.prototype) {
                        if (control._isAction(funcName)) {
                            control.actions[funcName] = control._action(funcName);
                        }
                    }
                }
            },
            _shifter: function(context, name) {
                var method = typeof name === "string" ? context[name] : name;
                if (!isFunction(method)) {
                    method = context[method];
                }
                return function() {
                    context.called = name;
                    return method.apply(context, [ this.nodeName ? can.$(this) : this ].concat(slice.call(arguments, 0)));
                };
            },
            _isAction: function(methodName) {
                var val = this.prototype[methodName], type = typeof val;
                return methodName !== "constructor" && (type === "function" || type === "string" && isFunction(this.prototype[val])) && !!(special[methodName] || processors[methodName] || /[^\w]/.test(methodName));
            },
            _action: function(methodName, options) {
                paramReplacer.lastIndex = 0;
                if (options || !paramReplacer.test(methodName)) {
                    var convertedName = options ? can.sub(methodName, this._lookup(options)) : methodName;
                    if (!convertedName) {
                        return null;
                    }
                    var arr = can.isArray(convertedName), name = arr ? convertedName[1] : convertedName, parts = name.split(/\s+/g), event = parts.pop();
                    return {
                        processor: processors[event] || basicProcessor,
                        parts: [ name, parts.join(" "), event ],
                        delegate: arr ? convertedName[0] : undefined
                    };
                }
            },
            _lookup: function(options) {
                return [ options, window ];
            },
            processors: {},
            defaults: {}
        }, {
            setup: function(element, options) {
                var cls = this.constructor, pluginname = cls.pluginName || cls._fullName, arr;
                this.element = can.$(element);
                if (pluginname && pluginname !== "can_control") {
                    this.element.addClass(pluginname);
                }
                arr = can.data(this.element, "controls");
                if (!arr) {
                    arr = [];
                    can.data(this.element, "controls", arr);
                }
                arr.push(this);
                this.options = extend({}, cls.defaults, options);
                this.on();
                return [ this.element, this.options ];
            },
            on: function(el, selector, eventName, func) {
                if (!el) {
                    this.off();
                    var cls = this.constructor, bindings = this._bindings, actions = cls.actions, element = this.element, destroyCB = can.Control._shifter(this, "destroy"), funcName, ready;
                    for (funcName in actions) {
                        if (actions.hasOwnProperty(funcName)) {
                            ready = actions[funcName] || cls._action(funcName, this.options, this);
                            if (ready) {
                                bindings.control[funcName] = ready.processor(ready.delegate || element, ready.parts[2], ready.parts[1], funcName, this);
                            }
                        }
                    }
                    can.bind.call(element, "removed", destroyCB);
                    bindings.user.push(function(el) {
                        can.unbind.call(el, "removed", destroyCB);
                    });
                    return bindings.user.length;
                }
                if (typeof el === "string") {
                    func = eventName;
                    eventName = selector;
                    selector = el;
                    el = this.element;
                }
                if (func === undefined) {
                    func = eventName;
                    eventName = selector;
                    selector = null;
                }
                if (typeof func === "string") {
                    func = can.Control._shifter(this, func);
                }
                this._bindings.user.push(binder(el, eventName, func, selector));
                return this._bindings.user.length;
            },
            off: function() {
                var el = this.element[0], bindings = this._bindings;
                if (bindings) {
                    each(bindings.user || [], function(value) {
                        value(el);
                    });
                    each(bindings.control || {}, function(value) {
                        value(el);
                    });
                }
                this._bindings = {
                    user: [],
                    control: {}
                };
            },
            destroy: function() {
                if (this.element === null) {
                    return;
                }
                var Class = this.constructor, pluginName = Class.pluginName || Class._fullName, controls;
                this.off();
                if (pluginName && pluginName !== "can_control") {
                    this.element.removeClass(pluginName);
                }
                controls = can.data(this.element, "controls");
                controls.splice(can.inArray(this, controls), 1);
                can.trigger(this, "destroyed");
                this.element = null;
            }
        });
        var processors = can.Control.processors;
        basicProcessor = function(el, event, selector, methodName, control) {
            return binder(el, event, can.Control._shifter(control, methodName), selector);
        };
        each([ "change", "click", "contextmenu", "dblclick", "keydown", "keyup", "keypress", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "reset", "resize", "scroll", "select", "submit", "focusin", "focusout", "mouseenter", "mouseleave", "touchstart", "touchmove", "touchcancel", "touchend", "touchleave", "inserted", "removed" ], function(v) {
            processors[v] = basicProcessor;
        });
        return Control;
    }(__m2, __m12);
    var __m16 = function(can) {
        can.bindAndSetup = function() {
            can.addEvent.apply(this, arguments);
            if (!this._init) {
                if (!this._bindings) {
                    this._bindings = 1;
                    if (this._bindsetup) {
                        this._bindsetup();
                    }
                } else {
                    this._bindings++;
                }
            }
            return this;
        };
        can.unbindAndTeardown = function(ev, handler) {
            can.removeEvent.apply(this, arguments);
            if (this._bindings === null) {
                this._bindings = 0;
            } else {
                this._bindings--;
            }
            if (!this._bindings && this._bindteardown) {
                this._bindteardown();
            }
            return this;
        };
        return can;
    }(__m2);
    var __m17 = function(can) {
        var bubble = can.bubble = {
            event: function(map, eventName) {
                return map.constructor._bubbleRule(eventName, map);
            },
            childrenOf: function(parentMap, eventName) {
                parentMap._each(function(child, prop) {
                    if (child && child.bind) {
                        bubble.toParent(child, parentMap, prop, eventName);
                    }
                });
            },
            teardownChildrenFrom: function(parentMap, eventName) {
                parentMap._each(function(child) {
                    bubble.teardownFromParent(parentMap, child, eventName);
                });
            },
            toParent: function(child, parent, prop, eventName) {
                can.listenTo.call(parent, child, eventName, function() {
                    var args = can.makeArray(arguments), ev = args.shift();
                    args[0] = (can.List && parent instanceof can.List ? parent.indexOf(child) : prop) + (args[0] ? "." + args[0] : "");
                    ev.triggeredNS = ev.triggeredNS || {};
                    if (ev.triggeredNS[parent._cid]) {
                        return;
                    }
                    ev.triggeredNS[parent._cid] = true;
                    can.trigger(parent, ev, args);
                });
            },
            teardownFromParent: function(parent, child, eventName) {
                if (child && child.unbind) {
                    can.stopListening.call(parent, child, eventName);
                }
            },
            isBubbling: function(parent, eventName) {
                return parent._bubbleBindings && parent._bubbleBindings[eventName];
            },
            bind: function(parent, eventName) {
                if (!parent._init) {
                    var bubbleEvent = bubble.event(parent, eventName);
                    if (bubbleEvent) {
                        if (!parent._bubbleBindings) {
                            parent._bubbleBindings = {};
                        }
                        if (!parent._bubbleBindings[bubbleEvent]) {
                            parent._bubbleBindings[bubbleEvent] = 1;
                            bubble.childrenOf(parent, bubbleEvent);
                        } else {
                            parent._bubbleBindings[bubbleEvent]++;
                        }
                    }
                }
            },
            unbind: function(parent, eventName) {
                var bubbleEvent = bubble.event(parent, eventName);
                if (bubbleEvent) {
                    if (parent._bubbleBindings) {
                        parent._bubbleBindings[bubbleEvent]--;
                    }
                    if (parent._bubbleBindings && !parent._bubbleBindings[bubbleEvent]) {
                        delete parent._bubbleBindings[bubbleEvent];
                        bubble.teardownChildrenFrom(parent, bubbleEvent);
                        if (can.isEmptyObject(parent._bubbleBindings)) {
                            delete parent._bubbleBindings;
                        }
                    }
                }
            },
            add: function(parent, child, prop) {
                if (child instanceof can.Map && parent._bubbleBindings) {
                    for (var eventName in parent._bubbleBindings) {
                        if (parent._bubbleBindings[eventName]) {
                            bubble.teardownFromParent(parent, child, eventName);
                            bubble.toParent(child, parent, prop, eventName);
                        }
                    }
                }
            },
            removeMany: function(parent, children) {
                for (var i = 0, len = children.length; i < len; i++) {
                    bubble.remove(parent, children[i]);
                }
            },
            remove: function(parent, child) {
                if (child instanceof can.Map && parent._bubbleBindings) {
                    for (var eventName in parent._bubbleBindings) {
                        if (parent._bubbleBindings[eventName]) {
                            bubble.teardownFromParent(parent, child, eventName);
                        }
                    }
                }
            },
            set: function(parent, prop, value, current) {
                if (can.Map.helpers.isObservable(value)) {
                    bubble.add(parent, value, prop);
                }
                if (can.Map.helpers.isObservable(current)) {
                    bubble.remove(parent, current);
                }
                return value;
            }
        };
        return bubble;
    }(__m2);
    var __m18 = function(can) {
        var batchNum = 1, transactions = 0, batchEvents = [], stopCallbacks = [];
        can.batch = {
            start: function(batchStopHandler) {
                transactions++;
                if (batchStopHandler) {
                    stopCallbacks.push(batchStopHandler);
                }
            },
            stop: function(force, callStart) {
                if (force) {
                    transactions = 0;
                } else {
                    transactions--;
                }
                if (transactions === 0) {
                    var items = batchEvents.slice(0), callbacks = stopCallbacks.slice(0), i, len;
                    batchEvents = [];
                    stopCallbacks = [];
                    batchNum++;
                    if (callStart) {
                        can.batch.start();
                    }
                    for (i = 0, len = items.length; i < len; i++) {
                        can.dispatch.apply(items[i][0], items[i][1]);
                    }
                    for (i = 0, len = callbacks.length; i < callbacks.length; i++) {
                        callbacks[i]();
                    }
                }
            },
            trigger: function(item, event, args) {
                if (!item._init) {
                    if (transactions === 0) {
                        return can.dispatch.call(item, event, args);
                    } else {
                        event = typeof event === "string" ? {
                            type: event
                        } : event;
                        event.batchNum = batchNum;
                        batchEvents.push([ item, [ event, args ] ]);
                    }
                }
            }
        };
    }(__m4);
    var __m15 = function(can, bind, bubble) {
        var madeMap = null;
        var teardownMap = function() {
            for (var cid in madeMap) {
                if (madeMap[cid].added) {
                    delete madeMap[cid].obj._cid;
                }
            }
            madeMap = null;
        };
        var getMapFromObject = function(obj) {
            return madeMap && madeMap[obj._cid] && madeMap[obj._cid].instance;
        };
        var serializeMap = null;
        var Map = can.Map = can.Construct.extend({
            setup: function() {
                can.Construct.setup.apply(this, arguments);
                if (can.Map) {
                    if (!this.defaults) {
                        this.defaults = {};
                    }
                    this._computes = [];
                    for (var prop in this.prototype) {
                        if (prop !== "define" && prop !== "constructor" && (typeof this.prototype[prop] !== "function" || this.prototype[prop].prototype instanceof can.Construct)) {
                            this.defaults[prop] = this.prototype[prop];
                        } else if (this.prototype[prop].isComputed) {
                            this._computes.push(prop);
                        }
                    }
                    if (this.helpers.define) {
                        this.helpers.define(this);
                    }
                }
                if (can.List && !(this.prototype instanceof can.List)) {
                    this.List = Map.List.extend({
                        Map: this
                    }, {});
                }
            },
            _bubble: bubble,
            _bubbleRule: function(eventName) {
                return (eventName === "change" || eventName.indexOf(".") >= 0) && "change";
            },
            _computes: [],
            bind: can.bindAndSetup,
            on: can.bindAndSetup,
            unbind: can.unbindAndTeardown,
            off: can.unbindAndTeardown,
            id: "id",
            helpers: {
                define: null,
                attrParts: function(attr, keepKey) {
                    if (keepKey) {
                        return [ attr ];
                    }
                    return typeof attr === "object" ? attr : ("" + attr).split(".");
                },
                addToMap: function(obj, instance) {
                    var teardown;
                    if (!madeMap) {
                        teardown = teardownMap;
                        madeMap = {};
                    }
                    var hasCid = obj._cid;
                    var cid = can.cid(obj);
                    if (!madeMap[cid]) {
                        madeMap[cid] = {
                            obj: obj,
                            instance: instance,
                            added: !hasCid
                        };
                    }
                    return teardown;
                },
                isObservable: function(obj) {
                    return obj instanceof can.Map || obj && obj === can.route;
                },
                canMakeObserve: function(obj) {
                    return obj && !can.isDeferred(obj) && (can.isArray(obj) || can.isPlainObject(obj));
                },
                serialize: function(map, how, where) {
                    var cid = can.cid(map), firstSerialize = false;
                    if (!serializeMap) {
                        firstSerialize = true;
                        serializeMap = {
                            attr: {},
                            serialize: {}
                        };
                    }
                    serializeMap[how][cid] = where;
                    map.each(function(val, name) {
                        var result, isObservable = Map.helpers.isObservable(val), serialized = isObservable && serializeMap[how][can.cid(val)];
                        if (serialized) {
                            result = serialized;
                        } else {
                            if (how === "serialize") {
                                result = Map.helpers._serialize(map, name, val);
                            } else {
                                result = Map.helpers._getValue(map, name, val, how);
                            }
                        }
                        if (result !== undefined) {
                            where[name] = result;
                        }
                    });
                    can.__reading(map, "__keys");
                    if (firstSerialize) {
                        serializeMap = null;
                    }
                    return where;
                },
                _serialize: function(map, name, val) {
                    return Map.helpers._getValue(map, name, val, "serialize");
                },
                _getValue: function(map, name, val, how) {
                    if (Map.helpers.isObservable(val)) {
                        return val[how]();
                    } else {
                        return val;
                    }
                }
            },
            keys: function(map) {
                var keys = [];
                can.__reading(map, "__keys");
                for (var keyName in map._data) {
                    keys.push(keyName);
                }
                return keys;
            }
        }, {
            setup: function(obj) {
                if (obj instanceof can.Map) {
                    obj = obj.serialize();
                }
                this._data = {};
                can.cid(this, ".map");
                this._init = 1;
                this._computedBindings = {};
                var defaultValues = this._setupDefaults(obj);
                this._setupComputes(defaultValues);
                var teardownMapping = obj && can.Map.helpers.addToMap(obj, this);
                var data = can.extend(can.extend(true, {}, defaultValues), obj);
                this.attr(data);
                if (teardownMapping) {
                    teardownMapping();
                }
                this.bind("change", can.proxy(this._changes, this));
                delete this._init;
            },
            _setupComputes: function() {
                var computes = this.constructor._computes;
                for (var i = 0, len = computes.length, prop; i < len; i++) {
                    prop = computes[i];
                    this[prop] = this[prop].clone(this);
                    this._computedBindings[prop] = {
                        count: 0
                    };
                }
            },
            _setupDefaults: function() {
                return this.constructor.defaults || {};
            },
            _bindsetup: function() {},
            _bindteardown: function() {},
            _changes: function(ev, attr, how, newVal, oldVal) {
                can.batch.trigger(this, {
                    type: attr,
                    batchNum: ev.batchNum,
                    target: ev.target
                }, [ newVal, oldVal ]);
            },
            _triggerChange: function(attr, how, newVal, oldVal) {
                if (bubble.isBubbling(this, "change")) {
                    can.batch.trigger(this, {
                        type: "change",
                        target: this
                    }, [ attr, how, newVal, oldVal ]);
                } else {
                    can.batch.trigger(this, attr, [ newVal, oldVal ]);
                }
                if (how === "remove" || how === "add") {
                    can.batch.trigger(this, {
                        type: "__keys",
                        target: this
                    });
                }
            },
            _each: function(callback) {
                var data = this.__get();
                for (var prop in data) {
                    if (data.hasOwnProperty(prop)) {
                        callback(data[prop], prop);
                    }
                }
            },
            attr: function(attr, val) {
                var type = typeof attr;
                if (type !== "string" && type !== "number") {
                    return this._attrs(attr, val);
                } else if (arguments.length === 1) {
                    can.__reading(this, attr);
                    return this._get(attr);
                } else {
                    this._set(attr, val);
                    return this;
                }
            },
            each: function() {
                return can.each.apply(undefined, [ this ].concat(can.makeArray(arguments)));
            },
            removeAttr: function(attr) {
                var isList = can.List && this instanceof can.List, parts = can.Map.helpers.attrParts(attr), prop = parts.shift(), current = isList ? this[prop] : this._data[prop];
                if (parts.length && current) {
                    return current.removeAttr(parts);
                } else {
                    if (typeof attr === "string" && !!~attr.indexOf(".")) {
                        prop = attr;
                    }
                    this._remove(prop, current);
                    return current;
                }
            },
            _remove: function(prop, current) {
                if (prop in this._data) {
                    delete this._data[prop];
                    if (!(prop in this.constructor.prototype)) {
                        delete this[prop];
                    }
                    this._triggerChange(prop, "remove", undefined, current);
                }
            },
            _get: function(attr) {
                attr = "" + attr;
                var dotIndex = attr.indexOf(".");
                if (dotIndex >= 0) {
                    var value = this.__get(attr);
                    if (value !== undefined) {
                        return value;
                    }
                    var first = attr.substr(0, dotIndex), second = attr.substr(dotIndex + 1), current = this.__get(first);
                    return current && current._get ? current._get(second) : undefined;
                } else {
                    return this.__get(attr);
                }
            },
            __get: function(attr) {
                if (attr) {
                    if (this._computedBindings[attr]) {
                        return this[attr]();
                    } else {
                        return this._data[attr];
                    }
                } else {
                    return this._data;
                }
            },
            __type: function(value, prop) {
                if (!(value instanceof can.Map) && can.Map.helpers.canMakeObserve(value)) {
                    var cached = getMapFromObject(value);
                    if (cached) {
                        return cached;
                    }
                    if (can.isArray(value)) {
                        var List = can.List;
                        return new List(value);
                    } else {
                        var Map = this.constructor.Map || can.Map;
                        return new Map(value);
                    }
                }
                return value;
            },
            _set: function(attr, value, keepKey) {
                attr = "" + attr;
                var dotIndex = attr.indexOf("."), current;
                if (!keepKey && dotIndex >= 0) {
                    var first = attr.substr(0, dotIndex), second = attr.substr(dotIndex + 1);
                    current = this._init ? undefined : this.__get(first);
                    if (Map.helpers.isObservable(current)) {
                        current._set(second, value);
                    } else {
                        throw "can.Map: Object does not exist";
                    }
                } else {
                    if (this.__convert) {
                        value = this.__convert(attr, value);
                    }
                    current = this._init ? undefined : this.__get(attr);
                    this.__set(attr, this.__type(value, attr), current);
                }
            },
            __set: function(prop, value, current) {
                if (value !== current) {
                    var changeType = current !== undefined || this.__get().hasOwnProperty(prop) ? "set" : "add";
                    this.___set(prop, this.constructor._bubble.set(this, prop, value, current));
                    this._triggerChange(prop, changeType, value, current);
                    if (current) {
                        this.constructor._bubble.teardownFromParent(this, current);
                    }
                }
            },
            ___set: function(prop, val) {
                if (this._computedBindings[prop]) {
                    this[prop](val);
                } else {
                    this._data[prop] = val;
                }
                if (typeof this.constructor.prototype[prop] !== "function" && !this._computedBindings[prop]) {
                    this[prop] = val;
                }
            },
            bind: function(eventName, handler) {
                var computedBinding = this._computedBindings && this._computedBindings[eventName];
                if (computedBinding) {
                    if (!computedBinding.count) {
                        computedBinding.count = 1;
                        var self = this;
                        computedBinding.handler = function(ev, newVal, oldVal) {
                            can.batch.trigger(self, {
                                type: eventName,
                                batchNum: ev.batchNum,
                                target: self
                            }, [ newVal, oldVal ]);
                        };
                        this[eventName].bind("change", computedBinding.handler);
                    } else {
                        computedBinding.count++;
                    }
                }
                this.constructor._bubble.bind(this, eventName);
                return can.bindAndSetup.apply(this, arguments);
            },
            unbind: function(eventName, handler) {
                var computedBinding = this._computedBindings && this._computedBindings[eventName];
                if (computedBinding) {
                    if (computedBinding.count === 1) {
                        computedBinding.count = 0;
                        this[eventName].unbind("change", computedBinding.handler);
                        delete computedBinding.handler;
                    } else {
                        computedBinding.count--;
                    }
                }
                this.constructor._bubble.unbind(this, eventName);
                return can.unbindAndTeardown.apply(this, arguments);
            },
            serialize: function() {
                return can.Map.helpers.serialize(this, "serialize", {});
            },
            _attrs: function(props, remove) {
                if (props === undefined) {
                    return Map.helpers.serialize(this, "attr", {});
                }
                props = can.simpleExtend({}, props);
                var prop, self = this, newVal;
                can.batch.start();
                this.each(function(curVal, prop) {
                    if (prop === "_cid") {
                        return;
                    }
                    newVal = props[prop];
                    if (newVal === undefined) {
                        if (remove) {
                            self.removeAttr(prop);
                        }
                        return;
                    }
                    if (self.__convert) {
                        newVal = self.__convert(prop, newVal);
                    }
                    if (Map.helpers.isObservable(newVal)) {
                        self.__set(prop, self.__type(newVal, prop), curVal);
                    } else if (Map.helpers.isObservable(curVal) && Map.helpers.canMakeObserve(newVal)) {
                        curVal.attr(newVal, remove);
                    } else if (curVal !== newVal) {
                        self.__set(prop, self.__type(newVal, prop), curVal);
                    }
                    delete props[prop];
                });
                for (prop in props) {
                    if (prop !== "_cid") {
                        newVal = props[prop];
                        this._set(prop, newVal, true);
                    }
                }
                can.batch.stop();
                return this;
            },
            compute: function(prop) {
                if (can.isFunction(this.constructor.prototype[prop])) {
                    return can.compute(this[prop], this);
                } else {
                    var reads = prop.split("."), last = reads.length - 1, options = {
                        args: []
                    };
                    return can.compute(function(newVal) {
                        if (arguments.length) {
                            can.compute.read(this, reads.slice(0, last)).value.attr(reads[last], newVal);
                        } else {
                            return can.compute.read(this, reads, options).value;
                        }
                    }, this);
                }
            }
        });
        Map.prototype.on = Map.prototype.bind;
        Map.prototype.off = Map.prototype.unbind;
        return Map;
    }(__m2, __m16, __m17, __m12, __m18);
    var __m19 = function(can, Map, bubble) {
        var splice = [].splice, spliceRemovesProps = function() {
            var obj = {
                0: "a",
                length: 1
            };
            splice.call(obj, 0, 1);
            return !obj[0];
        }();
        var list = Map.extend({
            Map: Map
        }, {
            setup: function(instances, options) {
                this.length = 0;
                can.cid(this, ".map");
                this._init = 1;
                this._computedBindings = {};
                this._setupComputes();
                instances = instances || [];
                var teardownMapping;
                if (can.isDeferred(instances)) {
                    this.replace(instances);
                } else {
                    teardownMapping = instances.length && can.Map.helpers.addToMap(instances, this);
                    this.push.apply(this, can.makeArray(instances || []));
                }
                if (teardownMapping) {
                    teardownMapping();
                }
                this.bind("change", can.proxy(this._changes, this));
                can.simpleExtend(this, options);
                delete this._init;
            },
            _triggerChange: function(attr, how, newVal, oldVal) {
                Map.prototype._triggerChange.apply(this, arguments);
                var index = +attr;
                if (!~attr.indexOf(".") && !isNaN(index)) {
                    if (how === "add") {
                        can.batch.trigger(this, how, [ newVal, index ]);
                        can.batch.trigger(this, "length", [ this.length ]);
                    } else if (how === "remove") {
                        can.batch.trigger(this, how, [ oldVal, index ]);
                        can.batch.trigger(this, "length", [ this.length ]);
                    } else {
                        can.batch.trigger(this, how, [ newVal, index ]);
                    }
                }
            },
            __get: function(attr) {
                if (attr) {
                    if (this[attr] && this[attr].isComputed && can.isFunction(this.constructor.prototype[attr])) {
                        return this[attr]();
                    } else {
                        return this[attr];
                    }
                } else {
                    return this;
                }
            },
            ___set: function(attr, val) {
                this[attr] = val;
                if (+attr >= this.length) {
                    this.length = +attr + 1;
                }
            },
            _remove: function(prop, current) {
                if (isNaN(+prop)) {
                    delete this[prop];
                    this._triggerChange(prop, "remove", undefined, current);
                } else {
                    this.splice(prop, 1);
                }
            },
            _each: function(callback) {
                var data = this.__get();
                for (var i = 0; i < data.length; i++) {
                    callback(data[i], i);
                }
            },
            serialize: function() {
                return Map.helpers.serialize(this, "serialize", []);
            },
            splice: function(index, howMany) {
                var args = can.makeArray(arguments), added = [], i, len;
                for (i = 2, len = args.length; i < len; i++) {
                    args[i] = this.__type(args[i], i);
                    added.push(args[i]);
                }
                if (howMany === undefined) {
                    howMany = args[1] = this.length - index;
                }
                var removed = splice.apply(this, args);
                if (!spliceRemovesProps) {
                    for (i = this.length; i < removed.length + this.length; i++) {
                        delete this[i];
                    }
                }
                can.batch.start();
                if (howMany > 0) {
                    bubble.removeMany(this, removed);
                    this._triggerChange("" + index, "remove", undefined, removed);
                }
                if (args.length > 2) {
                    for (i = 0, len = added.length; i < len; i++) {
                        bubble.set(this, i, added[i]);
                    }
                    this._triggerChange("" + index, "add", added, removed);
                }
                can.batch.stop();
                return removed;
            },
            _attrs: function(items, remove) {
                if (items === undefined) {
                    return Map.helpers.serialize(this, "attr", []);
                }
                items = can.makeArray(items);
                can.batch.start();
                this._updateAttrs(items, remove);
                can.batch.stop();
            },
            _updateAttrs: function(items, remove) {
                var len = Math.min(items.length, this.length);
                for (var prop = 0; prop < len; prop++) {
                    var curVal = this[prop], newVal = items[prop];
                    if (Map.helpers.isObservable(curVal) && Map.helpers.canMakeObserve(newVal)) {
                        curVal.attr(newVal, remove);
                    } else if (curVal !== newVal) {
                        this._set(prop, newVal);
                    } else {}
                }
                if (items.length > this.length) {
                    this.push.apply(this, items.slice(this.length));
                } else if (items.length < this.length && remove) {
                    this.splice(items.length);
                }
            }
        }), getArgs = function(args) {
            return args[0] && can.isArray(args[0]) ? args[0] : can.makeArray(args);
        };
        can.each({
            push: "length",
            unshift: 0
        }, function(where, name) {
            var orig = [][name];
            list.prototype[name] = function() {
                var args = [], len = where ? this.length : 0, i = arguments.length, res, val;
                while (i--) {
                    val = arguments[i];
                    args[i] = bubble.set(this, i, this.__type(val, i));
                }
                res = orig.apply(this, args);
                if (!this.comparator || args.length) {
                    this._triggerChange("" + len, "add", args, undefined);
                }
                return res;
            };
        });
        can.each({
            pop: "length",
            shift: 0
        }, function(where, name) {
            list.prototype[name] = function() {
                var args = getArgs(arguments), len = where && this.length ? this.length - 1 : 0;
                var res = [][name].apply(this, args);
                this._triggerChange("" + len, "remove", undefined, [ res ]);
                if (res && res.unbind) {
                    bubble.remove(this, res);
                }
                return res;
            };
        });
        can.extend(list.prototype, {
            indexOf: function(item, fromIndex) {
                this.attr("length");
                return can.inArray(item, this, fromIndex);
            },
            join: function() {
                return [].join.apply(this.attr(), arguments);
            },
            reverse: function() {
                var list = can.makeArray([].reverse.call(this));
                this.replace(list);
            },
            slice: function() {
                var temp = Array.prototype.slice.apply(this, arguments);
                return new this.constructor(temp);
            },
            concat: function() {
                var args = [];
                can.each(can.makeArray(arguments), function(arg, i) {
                    args[i] = arg instanceof can.List ? arg.serialize() : arg;
                });
                return new this.constructor(Array.prototype.concat.apply(this.serialize(), args));
            },
            forEach: function(cb, thisarg) {
                return can.each(this, cb, thisarg || this);
            },
            replace: function(newList) {
                if (can.isDeferred(newList)) {
                    newList.then(can.proxy(this.replace, this));
                } else {
                    this.splice.apply(this, [ 0, this.length ].concat(can.makeArray(newList || [])));
                }
                return this;
            },
            filter: function(callback, thisArg) {
                var filteredList = new can.List(), self = this, filtered;
                this.each(function(item, index, list) {
                    filtered = callback.call(thisArg | self, item, index, self);
                    if (filtered) {
                        filteredList.push(item);
                    }
                });
                return filteredList;
            }
        });
        can.List = Map.List = list;
        return can.List;
    }(__m2, __m15, __m17);
    var __m20 = function(can, bind) {
        var stack = [];
        can.__read = function(func, self) {
            stack.push({});
            var value = func.call(self);
            return {
                value: value,
                observed: stack.pop()
            };
        };
        can.__reading = function(obj, event) {
            if (stack.length) {
                stack[stack.length - 1][obj._cid + "|" + event] = {
                    obj: obj,
                    event: event + ""
                };
            }
        };
        can.__clearReading = function() {
            if (stack.length) {
                var ret = stack[stack.length - 1];
                stack[stack.length - 1] = {};
                return ret;
            }
        };
        can.__setReading = function(o) {
            if (stack.length) {
                stack[stack.length - 1] = o;
            }
        };
        can.__addReading = function(o) {
            if (stack.length) {
                can.simpleExtend(stack[stack.length - 1], o);
            }
        };
        var getValueAndBind = function(func, context, oldObserved, onchanged) {
            var info = can.__read(func, context), newObserveSet = info.observed;
            bindNewSet(oldObserved, newObserveSet, onchanged);
            unbindOldSet(oldObserved, onchanged);
            return info;
        };
        var bindNewSet = function(oldObserved, newObserveSet, onchanged) {
            for (var name in newObserveSet) {
                bindOrPreventUnbinding(oldObserved, newObserveSet, name, onchanged);
            }
        };
        var bindOrPreventUnbinding = function(oldObserved, newObserveSet, name, onchanged) {
            if (oldObserved[name]) {
                delete oldObserved[name];
            } else {
                var obEv = newObserveSet[name];
                obEv.obj.bind(obEv.event, onchanged);
            }
        };
        var unbindOldSet = function(oldObserved, onchanged) {
            for (var name in oldObserved) {
                var obEv = oldObserved[name];
                obEv.obj.unbind(obEv.event, onchanged);
            }
        };
        var updateOnChange = function(compute, newValue, oldValue, batchNum) {
            if (newValue !== oldValue) {
                can.batch.trigger(compute, batchNum ? {
                    type: "change",
                    batchNum: batchNum
                } : "change", [ newValue, oldValue ]);
            }
        };
        var setupComputeHandlers = function(compute, func, context, setCachedValue) {
            var readInfo, onchanged, batchNum;
            return {
                on: function(updater) {
                    if (!onchanged) {
                        onchanged = function(ev) {
                            if (compute.bound && (ev.batchNum === undefined || ev.batchNum !== batchNum)) {
                                var oldValue = readInfo.value;
                                readInfo = getValueAndBind(func, context, readInfo.observed, onchanged);
                                updater(readInfo.value, oldValue, ev.batchNum);
                                batchNum = batchNum = ev.batchNum;
                            }
                        };
                    }
                    readInfo = getValueAndBind(func, context, {}, onchanged);
                    setCachedValue(readInfo.value);
                    compute.hasDependencies = !can.isEmptyObject(readInfo.observed);
                },
                off: function(updater) {
                    for (var name in readInfo.observed) {
                        var ob = readInfo.observed[name];
                        ob.obj.unbind(ob.event, onchanged);
                    }
                }
            };
        };
        var setupSingleBindComputeHandlers = function(compute, func, context, setCachedValue) {
            var readInfo, oldValue, onchanged, batchNum;
            return {
                on: function(updater) {
                    if (!onchanged) {
                        onchanged = function(ev) {
                            if (compute.bound && (ev.batchNum === undefined || ev.batchNum !== batchNum)) {
                                var reads = can.__clearReading();
                                var newValue = func.call(context);
                                can.__setReading(reads);
                                updater(newValue, oldValue, ev.batchNum);
                                oldValue = newValue;
                                batchNum = batchNum = ev.batchNum;
                            }
                        };
                    }
                    readInfo = getValueAndBind(func, context, {}, onchanged);
                    oldValue = readInfo.value;
                    setCachedValue(readInfo.value);
                    compute.hasDependencies = !can.isEmptyObject(readInfo.observed);
                },
                off: function(updater) {
                    for (var name in readInfo.observed) {
                        var ob = readInfo.observed[name];
                        ob.obj.unbind(ob.event, onchanged);
                    }
                }
            };
        };
        var isObserve = function(obj) {
            return obj instanceof can.Map || obj && obj.__get;
        }, k = function() {};
        can.compute = function(getterSetter, context, eventName, bindOnce) {
            if (getterSetter && getterSetter.isComputed) {
                return getterSetter;
            }
            var computed, on = k, off = k, value, get = function() {
                return value;
            }, set = function(newVal) {
                value = newVal;
            }, setCached = set, args = [], updater = function(newValue, oldValue, batchNum) {
                setCached(newValue);
                updateOnChange(computed, newValue, oldValue, batchNum);
            }, form;
            for (var i = 0, arglen = arguments.length; i < arglen; i++) {
                args[i] = arguments[i];
            }
            computed = function(newVal) {
                if (arguments.length) {
                    var old = value;
                    var setVal = set.call(context, newVal, old);
                    if (computed.hasDependencies) {
                        return get.call(context);
                    }
                    if (setVal === undefined) {
                        value = get.call(context);
                    } else {
                        value = setVal;
                    }
                    updateOnChange(computed, value, old);
                    return value;
                } else {
                    if (stack.length && computed.canReadForChangeEvent !== false) {
                        can.__reading(computed, "change");
                        if (!computed.bound) {
                            can.compute.temporarilyBind(computed);
                        }
                    }
                    if (computed.bound) {
                        return value;
                    } else {
                        return get.call(context);
                    }
                }
            };
            if (typeof getterSetter === "function") {
                set = getterSetter;
                get = getterSetter;
                computed.canReadForChangeEvent = eventName === false ? false : true;
                var handlers = bindOnce ? setupSingleBindComputeHandlers(computed, getterSetter, context || this, setCached) : setupComputeHandlers(computed, getterSetter, context || this, setCached);
                on = handlers.on;
                off = handlers.off;
            } else if (context) {
                if (typeof context === "string") {
                    var propertyName = context, isObserve = getterSetter instanceof can.Map;
                    if (isObserve) {
                        computed.hasDependencies = true;
                        var handler;
                        get = function() {
                            return getterSetter.attr(propertyName);
                        };
                        set = function(newValue) {
                            getterSetter.attr(propertyName, newValue);
                        };
                        on = function(update) {
                            handler = function(ev, newVal, oldVal) {
                                update(newVal, oldVal, ev.batchNum);
                            };
                            getterSetter.bind(eventName || propertyName, handler);
                            value = can.__read(get).value;
                        };
                        off = function(update) {
                            getterSetter.unbind(eventName || propertyName, handler);
                        };
                    } else {
                        get = function() {
                            return getterSetter[propertyName];
                        };
                        set = function(newValue) {
                            getterSetter[propertyName] = newValue;
                        };
                        on = function(update) {
                            handler = function() {
                                update(get(), value);
                            };
                            can.bind.call(getterSetter, eventName || propertyName, handler);
                            value = can.__read(get).value;
                        };
                        off = function(update) {
                            can.unbind.call(getterSetter, eventName || propertyName, handler);
                        };
                    }
                } else {
                    if (typeof context === "function") {
                        value = getterSetter;
                        set = context;
                        context = eventName;
                        form = "setter";
                    } else {
                        value = getterSetter;
                        var options = context, oldUpdater = updater;
                        context = options.context || options;
                        get = options.get || get;
                        set = options.set || function() {
                            return value;
                        };
                        if (options.fn) {
                            var fn = options.fn, data;
                            get = function() {
                                return fn.call(context, value);
                            };
                            if (fn.length === 0) {
                                data = setupComputeHandlers(computed, fn, context, setCached);
                            } else if (fn.length === 1) {
                                data = setupComputeHandlers(computed, function() {
                                    return fn.call(context, value);
                                }, context, setCached);
                            } else {
                                updater = function(newVal) {
                                    if (newVal !== undefined) {
                                        oldUpdater(newVal, value);
                                    }
                                };
                                data = setupComputeHandlers(computed, function() {
                                    var res = fn.call(context, value, function(newVal) {
                                        oldUpdater(newVal, value);
                                    });
                                    return res !== undefined ? res : value;
                                }, context, setCached);
                            }
                            on = data.on;
                            off = data.off;
                        } else {
                            updater = function() {
                                var newVal = get.call(context);
                                oldUpdater(newVal, value);
                            };
                        }
                        on = options.on || on;
                        off = options.off || off;
                    }
                }
            } else {
                value = getterSetter;
            }
            can.cid(computed, "compute");
            return can.simpleExtend(computed, {
                isComputed: true,
                _bindsetup: function() {
                    this.bound = true;
                    var oldReading = can.__clearReading();
                    on.call(this, updater);
                    can.__setReading(oldReading);
                },
                _bindteardown: function() {
                    off.call(this, updater);
                    this.bound = false;
                },
                bind: can.bindAndSetup,
                unbind: can.unbindAndTeardown,
                clone: function(context) {
                    if (context) {
                        if (form === "setter") {
                            args[2] = context;
                        } else {
                            args[1] = context;
                        }
                    }
                    return can.compute.apply(can, args);
                }
            });
        };
        var computes, unbindComputes = function() {
            for (var i = 0, len = computes.length; i < len; i++) {
                computes[i].unbind("change", k);
            }
            computes = null;
        };
        can.compute.temporarilyBind = function(compute) {
            compute.bind("change", k);
            if (!computes) {
                computes = [];
                setTimeout(unbindComputes, 10);
            }
            computes.push(compute);
        };
        can.compute.truthy = function(compute) {
            return can.compute(function() {
                var res = compute();
                if (typeof res === "function") {
                    res = res();
                }
                return !!res;
            });
        };
        can.compute.async = function(initialValue, asyncComputer, context) {
            return can.compute(initialValue, {
                fn: asyncComputer,
                context: context
            });
        };
        can.compute.read = function(parent, reads, options) {
            options = options || {};
            var cur = parent, type, prev, foundObs;
            for (var i = 0, readLength = reads.length; i < readLength; i++) {
                prev = cur;
                if (prev && prev.isComputed) {
                    if (options.foundObservable) {
                        options.foundObservable(prev, i);
                    }
                    prev = cur = prev();
                }
                if (isObserve(prev)) {
                    if (!foundObs && options.foundObservable) {
                        options.foundObservable(prev, i);
                    }
                    foundObs = 1;
                    if (typeof prev[reads[i]] === "function" && prev.constructor.prototype[reads[i]] === prev[reads[i]]) {
                        if (options.returnObserveMethods) {
                            cur = cur[reads[i]];
                        } else if (reads[i] === "constructor" && prev instanceof can.Construct || prev[reads[i]].prototype instanceof can.Construct) {
                            cur = prev[reads[i]];
                        } else {
                            cur = prev[reads[i]].apply(prev, options.args || []);
                        }
                    } else {
                        cur = cur.attr(reads[i]);
                    }
                } else {
                    if (cur == null) {
                        cur = undefined;
                    } else {
                        cur = prev[reads[i]];
                    }
                }
                type = typeof cur;
                if (cur && cur.isComputed && (!options.isArgument && i < readLength - 1)) {
                    if (!foundObs && options.foundObservable) {
                        options.foundObservable(prev, i + 1);
                    }
                    cur = cur();
                } else if (i < reads.length - 1 && type === "function" && options.executeAnonymousFunctions && !(can.Construct && cur.prototype instanceof can.Construct)) {
                    cur = cur();
                }
                if (i < reads.length - 1 && (cur === null || type !== "function" && type !== "object")) {
                    if (options.earlyExit) {
                        options.earlyExit(prev, i, cur);
                    }
                    return {
                        value: undefined,
                        parent: prev
                    };
                }
            }
            if (typeof cur === "function" && !(can.Construct && cur.prototype instanceof can.Construct) && !(can.route && cur === can.route)) {
                if (options.isArgument) {
                    if (!cur.isComputed && options.proxyMethods !== false) {
                        cur = can.proxy(cur, prev);
                    }
                } else {
                    if (cur.isComputed && !foundObs && options.foundObservable) {
                        options.foundObservable(cur, i);
                    }
                    cur = cur.call(prev);
                }
            }
            if (cur === undefined) {
                if (options.earlyExit) {
                    options.earlyExit(prev, i - 1);
                }
            }
            return {
                value: cur,
                parent: prev
            };
        };
        can.compute.set = function(parent, key, value) {
            if (isObserve(parent)) {
                return parent.attr(key, value);
            }
            if (parent[key] && parent[key].isComputed) {
                return parent[key](value);
            }
            if (typeof parent === "object") {
                parent[key] = value;
            }
        };
        return can.compute;
    }(__m2, __m16, __m18);
    var __m14 = function(can) {
        can.Observe = can.Map;
        can.Observe.startBatch = can.batch.start;
        can.Observe.stopBatch = can.batch.stop;
        can.Observe.triggerBatch = can.batch.trigger;
        return can;
    }(__m2, __m15, __m19, __m20);
    var __m22 = function(can) {
        var escapeReg = /(\\)?\./g, escapeDotReg = /\\\./g, getNames = function(attr) {
            var names = [], last = 0;
            attr.replace(escapeReg, function(first, second, index) {
                if (!second) {
                    names.push(attr.slice(last, index).replace(escapeDotReg, "."));
                    last = index + first.length;
                }
            });
            names.push(attr.slice(last).replace(escapeDotReg, "."));
            return names;
        };
        var Scope = can.Construct.extend({
            read: can.compute.read
        }, {
            init: function(context, parent) {
                this._context = context;
                this._parent = parent;
                this.__cache = {};
            },
            attr: function(key, value) {
                var previousReads = can.__clearReading(), res = this.read(key, {
                    isArgument: true,
                    returnObserveMethods: true,
                    proxyMethods: false
                });
                if (arguments.length === 2) {
                    var lastIndex = key.lastIndexOf("."), readKey = lastIndex !== -1 ? key.substring(0, lastIndex) : ".", obj = this.read(readKey, {
                        isArgument: true,
                        returnObserveMethods: true,
                        proxyMethods: false
                    }).value;
                    if (lastIndex !== -1) {
                        key = key.substring(lastIndex + 1, key.length);
                    }
                    can.compute.set(obj, key, value);
                }
                can.__setReading(previousReads);
                return res.value;
            },
            add: function(context) {
                if (context !== this._context) {
                    return new this.constructor(context, this);
                } else {
                    return this;
                }
            },
            computeData: function(key, options) {
                options = options || {
                    args: []
                };
                var self = this, rootObserve, rootReads, computeData = {
                    compute: can.compute(function(newVal) {
                        if (arguments.length) {
                            if (rootObserve.isComputed) {
                                rootObserve(newVal);
                            } else if (rootReads.length) {
                                var last = rootReads.length - 1;
                                var obj = rootReads.length ? can.compute.read(rootObserve, rootReads.slice(0, last)).value : rootObserve;
                                can.compute.set(obj, rootReads[last], newVal);
                            }
                        } else {
                            if (rootObserve) {
                                return can.compute.read(rootObserve, rootReads, options).value;
                            }
                            var data = self.read(key, options);
                            rootObserve = data.rootObserve;
                            rootReads = data.reads;
                            computeData.scope = data.scope;
                            computeData.initialValue = data.value;
                            computeData.reads = data.reads;
                            computeData.root = rootObserve;
                            return data.value;
                        }
                    })
                };
                return computeData;
            },
            compute: function(key, options) {
                return this.computeData(key, options).compute;
            },
            read: function(attr, options) {
                var stopLookup;
                if (attr.substr(0, 2) === "./") {
                    stopLookup = true;
                    attr = attr.substr(2);
                } else if (attr.substr(0, 3) === "../") {
                    return this._parent.read(attr.substr(3), options);
                } else if (attr === "..") {
                    return {
                        value: this._parent._context
                    };
                } else if (attr === "." || attr === "this") {
                    return {
                        value: this._context
                    };
                }
                var names = attr.indexOf("\\.") === -1 ? attr.split(".") : getNames(attr), context, scope = this, defaultObserve, defaultReads = [], defaultPropertyDepth = -1, defaultComputeReadings, defaultScope, currentObserve, currentReads;
                while (scope) {
                    context = scope._context;
                    if (context !== null) {
                        var data = can.compute.read(context, names, can.simpleExtend({
                            foundObservable: function(observe, nameIndex) {
                                currentObserve = observe;
                                currentReads = names.slice(nameIndex);
                            },
                            earlyExit: function(parentValue, nameIndex) {
                                if (nameIndex > defaultPropertyDepth) {
                                    defaultObserve = currentObserve;
                                    defaultReads = currentReads;
                                    defaultPropertyDepth = nameIndex;
                                    defaultScope = scope;
                                    defaultComputeReadings = can.__clearReading();
                                }
                            },
                            executeAnonymousFunctions: true
                        }, options));
                        if (data.value !== undefined) {
                            return {
                                scope: scope,
                                rootObserve: currentObserve,
                                value: data.value,
                                reads: currentReads
                            };
                        }
                    }
                    can.__clearReading();
                    if (!stopLookup) {
                        scope = scope._parent;
                    } else {
                        scope = null;
                    }
                }
                if (defaultObserve) {
                    can.__setReading(defaultComputeReadings);
                    return {
                        scope: defaultScope,
                        rootObserve: defaultObserve,
                        reads: defaultReads,
                        value: undefined
                    };
                } else {
                    return {
                        names: names,
                        value: undefined
                    };
                }
            }
        });
        can.view.Scope = Scope;
        return Scope;
    }(__m2, __m12, __m15, __m19, __m10, __m20);
    var __m24 = function(can) {
        var selectsCommentNodes = function() {
            return can.$(document.createComment("~")).length === 1;
        }();
        var elements = {
            tagToContentPropMap: {
                option: "textContent" in document.createElement("option") ? "textContent" : "innerText",
                textarea: "value"
            },
            attrMap: can.attr.map,
            attrReg: /([^\s=]+)[\s]*=[\s]*/,
            defaultValue: can.attr.defaultValue,
            tagMap: {
                "": "span",
                colgroup: "col",
                table: "tbody",
                tr: "td",
                ol: "li",
                ul: "li",
                tbody: "tr",
                thead: "tr",
                tfoot: "tr",
                select: "option",
                optgroup: "option"
            },
            reverseTagMap: {
                col: "colgroup",
                tr: "tbody",
                option: "select",
                td: "tr",
                th: "tr",
                li: "ul"
            },
            getParentNode: function(el, defaultParentNode) {
                return defaultParentNode && el.parentNode.nodeType === 11 ? defaultParentNode : el.parentNode;
            },
            setAttr: can.attr.set,
            getAttr: can.attr.get,
            removeAttr: can.attr.remove,
            contentText: function(text) {
                if (typeof text === "string") {
                    return text;
                }
                if (!text && text !== 0) {
                    return "";
                }
                return "" + text;
            },
            after: function(oldElements, newFrag) {
                var last = oldElements[oldElements.length - 1];
                if (last.nextSibling) {
                    can.insertBefore(last.parentNode, newFrag, last.nextSibling);
                } else {
                    can.appendChild(last.parentNode, newFrag);
                }
            },
            replace: function(oldElements, newFrag) {
                elements.after(oldElements, newFrag);
                if (can.remove(can.$(oldElements)).length < oldElements.length && !selectsCommentNodes) {
                    can.each(oldElements, function(el) {
                        if (el.nodeType === 8) {
                            el.parentNode.removeChild(el);
                        }
                    });
                }
            }
        };
        can.view.elements = elements;
        return elements;
    }(__m2, __m10);
    var __m23 = function(can, elements, viewCallbacks) {
        var newLine = /(\r|\n)+/g, notEndTag = /\//, clean = function(content) {
            return content.split("\\").join("\\\\").split("\n").join("\\n").split('"').join('\\"').split("	").join("\\t");
        }, getTag = function(tagName, tokens, i) {
            if (tagName) {
                return tagName;
            } else {
                while (i < tokens.length) {
                    if (tokens[i] === "<" && !notEndTag.test(tokens[i + 1])) {
                        return elements.reverseTagMap[tokens[i + 1]] || "span";
                    }
                    i++;
                }
            }
            return "";
        }, bracketNum = function(content) {
            return --content.split("{").length - --content.split("}").length;
        }, myEval = function(script) {
            eval(script);
        }, attrReg = /([^\s]+)[\s]*=[\s]*$/, startTxt = "var ___v1ew = [];", finishTxt = "return ___v1ew.join('')", put_cmd = "___v1ew.push(\n", insert_cmd = put_cmd, htmlTag = null, quote = null, beforeQuote = null, rescan = null, getAttrName = function() {
            var matches = beforeQuote.match(attrReg);
            return matches && matches[1];
        }, status = function() {
            return quote ? "'" + getAttrName() + "'" : htmlTag ? 1 : 0;
        }, top = function(stack) {
            return stack[stack.length - 1];
        }, Scanner;
        can.view.Scanner = Scanner = function(options) {
            can.extend(this, {
                text: {},
                tokens: []
            }, options);
            this.text.options = this.text.options || "";
            this.tokenReg = [];
            this.tokenSimple = {
                "<": "<",
                ">": ">",
                '"': '"',
                "'": "'"
            };
            this.tokenComplex = [];
            this.tokenMap = {};
            for (var i = 0, token; token = this.tokens[i]; i++) {
                if (token[2]) {
                    this.tokenReg.push(token[2]);
                    this.tokenComplex.push({
                        abbr: token[1],
                        re: new RegExp(token[2]),
                        rescan: token[3]
                    });
                } else {
                    this.tokenReg.push(token[1]);
                    this.tokenSimple[token[1]] = token[0];
                }
                this.tokenMap[token[0]] = token[1];
            }
            this.tokenReg = new RegExp("(" + this.tokenReg.slice(0).concat([ "<", ">", '"', "'" ]).join("|") + ")", "g");
        };
        Scanner.prototype = {
            helpers: [],
            scan: function(source, name) {
                var tokens = [], last = 0, simple = this.tokenSimple, complex = this.tokenComplex;
                source = source.replace(newLine, "\n");
                if (this.transform) {
                    source = this.transform(source);
                }
                source.replace(this.tokenReg, function(whole, part) {
                    var offset = arguments[arguments.length - 2];
                    if (offset > last) {
                        tokens.push(source.substring(last, offset));
                    }
                    if (simple[whole]) {
                        tokens.push(whole);
                    } else {
                        for (var i = 0, token; token = complex[i]; i++) {
                            if (token.re.test(whole)) {
                                tokens.push(token.abbr);
                                if (token.rescan) {
                                    tokens.push(token.rescan(part));
                                }
                                break;
                            }
                        }
                    }
                    last = offset + part.length;
                });
                if (last < source.length) {
                    tokens.push(source.substr(last));
                }
                var content = "", buff = [ startTxt + (this.text.start || "") ], put = function(content, bonus) {
                    buff.push(put_cmd, '"', clean(content), '"' + (bonus || "") + ");");
                }, endStack = [], lastToken, startTag = null, magicInTag = false, specialStates = {
                    attributeHookups: [],
                    tagHookups: [],
                    lastTagHookup: ""
                }, popTagHookup = function() {
                    specialStates.lastTagHookup = specialStates.tagHookups.pop() + specialStates.tagHookups.length;
                }, tagName = "", tagNames = [], popTagName = false, bracketCount, specialAttribute = false, i = 0, token, tmap = this.tokenMap, attrName;
                htmlTag = quote = beforeQuote = null;
                for (;(token = tokens[i++]) !== undefined; ) {
                    if (startTag === null) {
                        switch (token) {
                          case tmap.left:
                          case tmap.escapeLeft:
                          case tmap.returnLeft:
                            magicInTag = htmlTag && 1;

                          case tmap.commentLeft:
                            startTag = token;
                            if (content.length) {
                                put(content);
                            }
                            content = "";
                            break;

                          case tmap.escapeFull:
                            magicInTag = htmlTag && 1;
                            rescan = 1;
                            startTag = tmap.escapeLeft;
                            if (content.length) {
                                put(content);
                            }
                            rescan = tokens[i++];
                            content = rescan.content || rescan;
                            if (rescan.before) {
                                put(rescan.before);
                            }
                            tokens.splice(i, 0, tmap.right);
                            break;

                          case tmap.commentFull:
                            break;

                          case tmap.templateLeft:
                            content += tmap.left;
                            break;

                          case "<":
                            if (tokens[i].indexOf("!--") !== 0) {
                                htmlTag = 1;
                                magicInTag = 0;
                            }
                            content += token;
                            break;

                          case ">":
                            htmlTag = 0;
                            var emptyElement = content.substr(content.length - 1) === "/" || content.substr(content.length - 2) === "--", attrs = "";
                            if (specialStates.attributeHookups.length) {
                                attrs = "attrs: ['" + specialStates.attributeHookups.join("','") + "'], ";
                                specialStates.attributeHookups = [];
                            }
                            if (tagName + specialStates.tagHookups.length !== specialStates.lastTagHookup && tagName === top(specialStates.tagHookups)) {
                                if (emptyElement) {
                                    content = content.substr(0, content.length - 1);
                                }
                                buff.push(put_cmd, '"', clean(content), '"', ",can.view.pending({tagName:'" + tagName + "'," + attrs + "scope: " + (this.text.scope || "this") + this.text.options);
                                if (emptyElement) {
                                    buff.push("}));");
                                    content = "/>";
                                    popTagHookup();
                                } else if (tokens[i] === "<" && tokens[i + 1] === "/" + tagName) {
                                    buff.push("}));");
                                    content = token;
                                    popTagHookup();
                                } else {
                                    buff.push(",subtemplate: function(" + this.text.argNames + "){\n" + startTxt + (this.text.start || ""));
                                    content = "";
                                }
                            } else if (magicInTag || !popTagName && elements.tagToContentPropMap[tagNames[tagNames.length - 1]] || attrs) {
                                var pendingPart = ",can.view.pending({" + attrs + "scope: " + (this.text.scope || "this") + this.text.options + '}),"';
                                if (emptyElement) {
                                    put(content.substr(0, content.length - 1), pendingPart + '/>"');
                                } else {
                                    put(content, pendingPart + '>"');
                                }
                                content = "";
                                magicInTag = 0;
                            } else {
                                content += token;
                            }
                            if (emptyElement || popTagName) {
                                tagNames.pop();
                                tagName = tagNames[tagNames.length - 1];
                                popTagName = false;
                            }
                            specialStates.attributeHookups = [];
                            break;

                          case "'":
                          case '"':
                            if (htmlTag) {
                                if (quote && quote === token) {
                                    quote = null;
                                    var attr = getAttrName();
                                    if (viewCallbacks.attr(attr)) {
                                        specialStates.attributeHookups.push(attr);
                                    }
                                    if (specialAttribute) {
                                        content += token;
                                        put(content);
                                        buff.push(finishTxt, "}));\n");
                                        content = "";
                                        specialAttribute = false;
                                        break;
                                    }
                                } else if (quote === null) {
                                    quote = token;
                                    beforeQuote = lastToken;
                                    attrName = getAttrName();
                                    if (tagName === "img" && attrName === "src" || attrName === "style") {
                                        put(content.replace(attrReg, ""));
                                        content = "";
                                        specialAttribute = true;
                                        buff.push(insert_cmd, "can.view.txt(2,'" + getTag(tagName, tokens, i) + "'," + status() + ",this,function(){", startTxt);
                                        put(attrName + "=" + token);
                                        break;
                                    }
                                }
                            }

                          default:
                            if (lastToken === "<") {
                                tagName = token.substr(0, 3) === "!--" ? "!--" : token.split(/\s/)[0];
                                var isClosingTag = false, cleanedTagName;
                                if (tagName.indexOf("/") === 0) {
                                    isClosingTag = true;
                                    cleanedTagName = tagName.substr(1);
                                }
                                if (isClosingTag) {
                                    if (top(tagNames) === cleanedTagName) {
                                        tagName = cleanedTagName;
                                        popTagName = true;
                                    }
                                    if (top(specialStates.tagHookups) === cleanedTagName) {
                                        put(content.substr(0, content.length - 1));
                                        buff.push(finishTxt + "}}) );");
                                        content = "><";
                                        popTagHookup();
                                    }
                                } else {
                                    if (tagName.lastIndexOf("/") === tagName.length - 1) {
                                        tagName = tagName.substr(0, tagName.length - 1);
                                    }
                                    if (tagName !== "!--" && viewCallbacks.tag(tagName)) {
                                        if (tagName === "content" && elements.tagMap[top(tagNames)]) {
                                            token = token.replace("content", elements.tagMap[top(tagNames)]);
                                        }
                                        specialStates.tagHookups.push(tagName);
                                    }
                                    tagNames.push(tagName);
                                }
                            }
                            content += token;
                            break;
                        }
                    } else {
                        switch (token) {
                          case tmap.right:
                          case tmap.returnRight:
                            switch (startTag) {
                              case tmap.left:
                                bracketCount = bracketNum(content);
                                if (bracketCount === 1) {
                                    buff.push(insert_cmd, "can.view.txt(0,'" + getTag(tagName, tokens, i) + "'," + status() + ",this,function(){", startTxt, content);
                                    endStack.push({
                                        before: "",
                                        after: finishTxt + "}));\n"
                                    });
                                } else {
                                    last = endStack.length && bracketCount === -1 ? endStack.pop() : {
                                        after: ";"
                                    };
                                    if (last.before) {
                                        buff.push(last.before);
                                    }
                                    buff.push(content, ";", last.after);
                                }
                                break;

                              case tmap.escapeLeft:
                              case tmap.returnLeft:
                                bracketCount = bracketNum(content);
                                if (bracketCount) {
                                    endStack.push({
                                        before: finishTxt,
                                        after: "}));\n"
                                    });
                                }
                                var escaped = startTag === tmap.escapeLeft ? 1 : 0, commands = {
                                    insert: insert_cmd,
                                    tagName: getTag(tagName, tokens, i),
                                    status: status(),
                                    specialAttribute: specialAttribute
                                };
                                for (var ii = 0; ii < this.helpers.length; ii++) {
                                    var helper = this.helpers[ii];
                                    if (helper.name.test(content)) {
                                        content = helper.fn(content, commands);
                                        if (helper.name.source === /^>[\s]*\w*/.source) {
                                            escaped = 0;
                                        }
                                        break;
                                    }
                                }
                                if (typeof content === "object") {
                                    if (content.startTxt && content.end && specialAttribute) {
                                        buff.push(insert_cmd, "can.view.toStr( ", content.content, "() ) );");
                                    } else {
                                        if (content.startTxt) {
                                            buff.push(insert_cmd, "can.view.txt(\n" + (typeof status() === "string" || (content.escaped != null ? content.escaped : escaped)) + ",\n'" + tagName + "',\n" + status() + ",\nthis,\n");
                                        } else if (content.startOnlyTxt) {
                                            buff.push(insert_cmd, "can.view.onlytxt(this,\n");
                                        }
                                        buff.push(content.content);
                                        if (content.end) {
                                            buff.push("));");
                                        }
                                    }
                                } else if (specialAttribute) {
                                    buff.push(insert_cmd, content, ");");
                                } else {
                                    buff.push(insert_cmd, "can.view.txt(\n" + (typeof status() === "string" || escaped) + ",\n'" + tagName + "',\n" + status() + ",\nthis,\nfunction(){ " + (this.text.escape || "") + "return ", content, bracketCount ? startTxt : "}));\n");
                                }
                                if (rescan && rescan.after && rescan.after.length) {
                                    put(rescan.after.length);
                                    rescan = null;
                                }
                                break;
                            }
                            startTag = null;
                            content = "";
                            break;

                          case tmap.templateLeft:
                            content += tmap.left;
                            break;

                          default:
                            content += token;
                            break;
                        }
                    }
                    lastToken = token;
                }
                if (content.length) {
                    put(content);
                }
                buff.push(";");
                var template = buff.join(""), out = {
                    out: (this.text.outStart || "") + template + " " + finishTxt + (this.text.outEnd || "")
                };
                myEval.call(out, "this.fn = (function(" + this.text.argNames + "){" + out.out + "});\r\n//# sourceURL=" + name + ".js");
                return out;
            }
        };
        can.view.pending = function(viewData) {
            var hooks = can.view.getHooks();
            return can.view.hook(function(el) {
                can.each(hooks, function(fn) {
                    fn(el);
                });
                viewData.templateType = "legacy";
                if (viewData.tagName) {
                    viewCallbacks.tagHandler(el, viewData.tagName, viewData);
                }
                can.each(viewData && viewData.attrs || [], function(attributeName) {
                    viewData.attributeName = attributeName;
                    var callback = viewCallbacks.attr(attributeName);
                    if (callback) {
                        callback(el, viewData);
                    }
                });
            });
        };
        can.view.tag("content", function(el, tagData) {
            return tagData.scope;
        });
        can.view.Scanner = Scanner;
        return Scanner;
    }(__m10, __m24, __m9);
    var __m27 = function(can) {
        var canExpando = true;
        try {
            document.createTextNode("")._ = 0;
        } catch (ex) {
            canExpando = false;
        }
        var nodeMap = {}, textNodeMap = {}, expando = "ejs_" + Math.random(), _id = 0, id = function(node, localMap) {
            var _textNodeMap = localMap || textNodeMap;
            var id = readId(node, _textNodeMap);
            if (id) {
                return id;
            } else {
                if (canExpando || node.nodeType !== 3) {
                    ++_id;
                    return node[expando] = (node.nodeName ? "element_" : "obj_") + _id;
                } else {
                    ++_id;
                    _textNodeMap["text_" + _id] = node;
                    return "text_" + _id;
                }
            }
        }, readId = function(node, textNodeMap) {
            if (canExpando || node.nodeType !== 3) {
                return node[expando];
            } else {
                for (var textNodeID in textNodeMap) {
                    if (textNodeMap[textNodeID] === node) {
                        return textNodeID;
                    }
                }
            }
        }, splice = [].splice, push = [].push, itemsInChildListTree = function(list) {
            var count = 0;
            for (var i = 0, len = list.length; i < len; i++) {
                var item = list[i];
                if (item.nodeType) {
                    count++;
                } else {
                    count += itemsInChildListTree(item);
                }
            }
            return count;
        }, replacementMap = function(replacements, idMap) {
            var map = {};
            for (var i = 0, len = replacements.length; i < len; i++) {
                var node = nodeLists.first(replacements[i]);
                map[id(node, idMap)] = replacements[i];
            }
            return map;
        };
        var nodeLists = {
            id: id,
            update: function(nodeList, newNodes) {
                var oldNodes = nodeLists.unregisterChildren(nodeList);
                newNodes = can.makeArray(newNodes);
                var oldListLength = nodeList.length;
                splice.apply(nodeList, [ 0, oldListLength ].concat(newNodes));
                if (nodeList.replacements) {
                    nodeLists.nestReplacements(nodeList);
                } else {
                    nodeLists.nestList(nodeList);
                }
                return oldNodes;
            },
            nestReplacements: function(list) {
                var index = 0, idMap = {}, rMap = replacementMap(list.replacements, idMap), rCount = list.replacements.length;
                while (index < list.length && rCount) {
                    var node = list[index], replacement = rMap[readId(node, idMap)];
                    if (replacement) {
                        list.splice(index, itemsInChildListTree(replacement), replacement);
                        rCount--;
                    }
                    index++;
                }
                list.replacements = [];
            },
            nestList: function(list) {
                var index = 0;
                while (index < list.length) {
                    var node = list[index], childNodeList = nodeMap[id(node)];
                    if (childNodeList) {
                        if (childNodeList !== list) {
                            list.splice(index, itemsInChildListTree(childNodeList), childNodeList);
                        }
                    } else {
                        nodeMap[id(node)] = list;
                    }
                    index++;
                }
            },
            last: function(nodeList) {
                var last = nodeList[nodeList.length - 1];
                if (last.nodeType) {
                    return last;
                } else {
                    return nodeLists.last(last);
                }
            },
            first: function(nodeList) {
                var first = nodeList[0];
                if (first.nodeType) {
                    return first;
                } else {
                    return nodeLists.first(first);
                }
            },
            register: function(nodeList, unregistered, parent) {
                nodeList.unregistered = unregistered;
                nodeList.parentList = parent;
                if (parent === true) {
                    nodeList.replacements = [];
                } else if (parent) {
                    parent.replacements.push(nodeList);
                    nodeList.replacements = [];
                } else {
                    nodeLists.nestList(nodeList);
                }
                return nodeList;
            },
            unregisterChildren: function(nodeList) {
                var nodes = [];
                can.each(nodeList, function(node) {
                    if (node.nodeType) {
                        if (!nodeList.replacements) {
                            delete nodeMap[id(node)];
                        }
                        nodes.push(node);
                    } else {
                        push.apply(nodes, nodeLists.unregister(node));
                    }
                });
                return nodes;
            },
            unregister: function(nodeList) {
                var nodes = nodeLists.unregisterChildren(nodeList);
                if (nodeList.unregistered) {
                    var unregisteredCallback = nodeList.unregistered;
                    delete nodeList.unregistered;
                    delete nodeList.replacements;
                    unregisteredCallback();
                }
                return nodes;
            },
            nodeMap: nodeMap
        };
        can.view.nodeLists = nodeLists;
        return nodeLists;
    }(__m2, __m24);
    var __m28 = function(can) {
        function makeMap(str) {
            var obj = {}, items = str.split(",");
            for (var i = 0; i < items.length; i++) {
                obj[items[i]] = true;
            }
            return obj;
        }
        var alphaNumericHU = "-:A-Za-z0-9_", attributeNames = "[a-zA-Z_:][" + alphaNumericHU + ":.]*", spaceEQspace = "\\s*=\\s*", dblQuote2dblQuote = '"((?:\\\\.|[^"])*)"', quote2quote = "'((?:\\\\.|[^'])*)'", attributeEqAndValue = "(?:" + spaceEQspace + "(?:" + "(?:\"[^\"]*\")|(?:'[^']*')|[^>\\s]+))?", matchStash = "\\{\\{[^\\}]*\\}\\}\\}?", stash = "\\{\\{([^\\}]*)\\}\\}\\}?", startTag = new RegExp("^<([" + alphaNumericHU + "]+)" + "(" + "(?:\\s*" + "(?:(?:" + "(?:" + attributeNames + ")?" + attributeEqAndValue + ")|" + "(?:" + matchStash + ")+)" + ")*" + ")\\s*(\\/?)>"), endTag = new RegExp("^<\\/([" + alphaNumericHU + "]+)[^>]*>"), attr = new RegExp("(?:" + "(?:(" + attributeNames + ")|" + stash + ")" + "(?:" + spaceEQspace + "(?:" + "(?:" + dblQuote2dblQuote + ")|(?:" + quote2quote + ")|([^>\\s]+)" + ")" + ")?)", "g"), mustache = new RegExp(stash, "g"), txtBreak = /<|\{\{/;
        var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");
        var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");
        var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
        var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
        var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
        var special = makeMap("script,style");
        var HTMLParser = function(html, handler) {
            function parseStartTag(tag, tagName, rest, unary) {
                tagName = tagName.toLowerCase();
                if (block[tagName]) {
                    while (stack.last() && inline[stack.last()]) {
                        parseEndTag("", stack.last());
                    }
                }
                if (closeSelf[tagName] && stack.last() === tagName) {
                    parseEndTag("", tagName);
                }
                unary = empty[tagName] || !!unary;
                handler.start(tagName, unary);
                if (!unary) {
                    stack.push(tagName);
                }
                HTMLParser.parseAttrs(rest, handler);
                handler.end(tagName, unary);
            }
            function parseEndTag(tag, tagName) {
                var pos;
                if (!tagName) {
                    pos = 0;
                } else {
                    for (pos = stack.length - 1; pos >= 0; pos--) {
                        if (stack[pos] === tagName) {
                            break;
                        }
                    }
                }
                if (pos >= 0) {
                    for (var i = stack.length - 1; i >= pos; i--) {
                        if (handler.close) {
                            handler.close(stack[i]);
                        }
                    }
                    stack.length = pos;
                }
            }
            function parseMustache(mustache, inside) {
                if (handler.special) {
                    handler.special(inside);
                }
            }
            var index, chars, match, stack = [], last = html;
            stack.last = function() {
                return this[this.length - 1];
            };
            while (html) {
                chars = true;
                if (!stack.last() || !special[stack.last()]) {
                    if (html.indexOf("<!--") === 0) {
                        index = html.indexOf("-->");
                        if (index >= 0) {
                            if (handler.comment) {
                                handler.comment(html.substring(4, index));
                            }
                            html = html.substring(index + 3);
                            chars = false;
                        }
                    } else if (html.indexOf("</") === 0) {
                        match = html.match(endTag);
                        if (match) {
                            html = html.substring(match[0].length);
                            match[0].replace(endTag, parseEndTag);
                            chars = false;
                        }
                    } else if (html.indexOf("<") === 0) {
                        match = html.match(startTag);
                        if (match) {
                            html = html.substring(match[0].length);
                            match[0].replace(startTag, parseStartTag);
                            chars = false;
                        }
                    } else if (html.indexOf("{{") === 0) {
                        match = html.match(mustache);
                        if (match) {
                            html = html.substring(match[0].length);
                            match[0].replace(mustache, parseMustache);
                        }
                    }
                    if (chars) {
                        index = html.search(txtBreak);
                        var text = index < 0 ? html : html.substring(0, index);
                        html = index < 0 ? "" : html.substring(index);
                        if (handler.chars && text) {
                            handler.chars(text);
                        }
                    }
                } else {
                    html = html.replace(new RegExp("([\\s\\S]*?)</" + stack.last() + "[^>]*>"), function(all, text) {
                        text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
                        if (handler.chars) {
                            handler.chars(text);
                        }
                        return "";
                    });
                    parseEndTag("", stack.last());
                }
                if (html === last) {
                    throw "Parse Error: " + html;
                }
                last = html;
            }
            parseEndTag();
            handler.done();
        };
        HTMLParser.parseAttrs = function(rest, handler) {
            (rest != null ? rest : "").replace(attr, function(text, name, special, dblQuote, singleQuote, val) {
                if (special) {
                    handler.special(special);
                }
                if (name || dblQuote || singleQuote || val) {
                    var value = arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : arguments[5] ? arguments[5] : fillAttrs[name.toLowerCase()] ? name : "";
                    handler.attrStart(name || "");
                    var last = mustache.lastIndex = 0, res = mustache.exec(value), chars;
                    while (res) {
                        chars = value.substring(last, mustache.lastIndex - res[0].length);
                        if (chars.length) {
                            handler.attrValue(chars);
                        }
                        handler.special(res[1]);
                        last = mustache.lastIndex;
                        res = mustache.exec(value);
                    }
                    chars = value.substr(last, value.length);
                    if (chars) {
                        handler.attrValue(chars);
                    }
                    handler.attrEnd(name || "");
                }
            });
        };
        can.view.parser = HTMLParser;
        return HTMLParser;
    }(__m10);
    var __m26 = function(can, elements, view, nodeLists, parser) {
        elements = elements || can.view.elements;
        nodeLists = nodeLists || can.view.NodeLists;
        parser = parser || can.view.parser;
        var setup = function(el, bind, unbind) {
            var tornDown = false, teardown = function() {
                if (!tornDown) {
                    tornDown = true;
                    unbind(data);
                    can.unbind.call(el, "removed", teardown);
                }
                return true;
            }, data = {
                teardownCheck: function(parent) {
                    return parent ? false : teardown();
                }
            };
            can.bind.call(el, "removed", teardown);
            bind(data);
            return data;
        }, listen = function(el, compute, change) {
            return setup(el, function() {
                compute.bind("change", change);
            }, function(data) {
                compute.unbind("change", change);
                if (data.nodeList) {
                    nodeLists.unregister(data.nodeList);
                }
            });
        }, getAttributeParts = function(newVal) {
            var attrs = {}, attr;
            parser.parseAttrs(newVal, {
                attrStart: function(name) {
                    attrs[name] = "";
                    attr = name;
                },
                attrValue: function(value) {
                    attrs[attr] += value;
                },
                attrEnd: function() {}
            });
            return attrs;
        }, splice = [].splice, isNode = function(obj) {
            return obj && obj.nodeType;
        }, addTextNodeIfNoChildren = function(frag) {
            if (!frag.childNodes.length) {
                frag.appendChild(document.createTextNode(""));
            }
        };
        var live = {
            list: function(el, compute, render, context, parentNode, nodeList) {
                var masterNodeList = nodeList || [ el ], indexMap = [], add = function(ev, items, index) {
                    var frag = document.createDocumentFragment(), newNodeLists = [], newIndicies = [];
                    can.each(items, function(item, key) {
                        var itemNodeList = [];
                        if (nodeList) {
                            nodeLists.register(itemNodeList, null, true);
                        }
                        var itemIndex = can.compute(key + index), itemHTML = render.call(context, item, itemIndex, itemNodeList), gotText = typeof itemHTML === "string", itemFrag = can.frag(itemHTML);
                        itemFrag = gotText ? can.view.hookup(itemFrag) : itemFrag;
                        var childNodes = can.makeArray(itemFrag.childNodes);
                        if (nodeList) {
                            nodeLists.update(itemNodeList, childNodes);
                            newNodeLists.push(itemNodeList);
                        } else {
                            newNodeLists.push(nodeLists.register(childNodes));
                        }
                        frag.appendChild(itemFrag);
                        newIndicies.push(itemIndex);
                    });
                    var masterListIndex = index + 1;
                    if (!masterNodeList[masterListIndex]) {
                        elements.after(masterListIndex === 1 ? [ text ] : [ nodeLists.last(masterNodeList[masterListIndex - 1]) ], frag);
                    } else {
                        var el = nodeLists.first(masterNodeList[masterListIndex]);
                        can.insertBefore(el.parentNode, frag, el);
                    }
                    splice.apply(masterNodeList, [ masterListIndex, 0 ].concat(newNodeLists));
                    splice.apply(indexMap, [ index, 0 ].concat(newIndicies));
                    for (var i = index + newIndicies.length, len = indexMap.length; i < len; i++) {
                        indexMap[i](i);
                    }
                }, remove = function(ev, items, index, duringTeardown, fullTeardown) {
                    if (!duringTeardown && data.teardownCheck(text.parentNode)) {
                        return;
                    }
                    if (index < 0) {
                        index = indexMap.length + index;
                    }
                    var removedMappings = masterNodeList.splice(index + 1, items.length), itemsToRemove = [];
                    can.each(removedMappings, function(nodeList) {
                        var nodesToRemove = nodeLists.unregister(nodeList);
                        [].push.apply(itemsToRemove, nodesToRemove);
                    });
                    indexMap.splice(index, items.length);
                    for (var i = index, len = indexMap.length; i < len; i++) {
                        indexMap[i](i);
                    }
                    if (!fullTeardown) {
                        can.remove(can.$(itemsToRemove));
                    }
                }, text = document.createTextNode(""), list, teardownList = function(fullTeardown) {
                    if (list && list.unbind) {
                        list.unbind("add", add).unbind("remove", remove);
                    }
                    remove({}, {
                        length: masterNodeList.length - 1
                    }, 0, true, fullTeardown);
                }, updateList = function(ev, newList, oldList) {
                    teardownList();
                    list = newList || [];
                    if (list.bind) {
                        list.bind("add", add).bind("remove", remove);
                    }
                    add({}, list, 0);
                };
                parentNode = elements.getParentNode(el, parentNode);
                var data = setup(parentNode, function() {
                    if (can.isFunction(compute)) {
                        compute.bind("change", updateList);
                    }
                }, function() {
                    if (can.isFunction(compute)) {
                        compute.unbind("change", updateList);
                    }
                    teardownList(true);
                });
                if (!nodeList) {
                    live.replace(masterNodeList, text, data.teardownCheck);
                } else {
                    elements.replace(masterNodeList, text);
                    nodeLists.update(masterNodeList, [ text ]);
                    nodeList.unregistered = data.teardownCheck;
                }
                updateList({}, can.isFunction(compute) ? compute() : compute);
            },
            html: function(el, compute, parentNode, nodeList) {
                var data;
                parentNode = elements.getParentNode(el, parentNode);
                data = listen(parentNode, compute, function(ev, newVal, oldVal) {
                    var attached = nodeLists.first(nodes).parentNode;
                    if (attached) {
                        makeAndPut(newVal);
                    }
                    data.teardownCheck(nodeLists.first(nodes).parentNode);
                });
                var nodes = nodeList || [ el ], makeAndPut = function(val) {
                    var isString = !isNode(val), frag = can.frag(val), oldNodes = can.makeArray(nodes);
                    addTextNodeIfNoChildren(frag);
                    if (isString) {
                        frag = can.view.hookup(frag, parentNode);
                    }
                    oldNodes = nodeLists.update(nodes, frag.childNodes);
                    elements.replace(oldNodes, frag);
                };
                data.nodeList = nodes;
                if (!nodeList) {
                    nodeLists.register(nodes, data.teardownCheck);
                } else {
                    nodeList.unregistered = data.teardownCheck;
                }
                makeAndPut(compute());
            },
            replace: function(nodes, val, teardown) {
                var oldNodes = nodes.slice(0), frag = can.frag(val);
                nodeLists.register(nodes, teardown);
                if (typeof val === "string") {
                    frag = can.view.hookup(frag, nodes[0].parentNode);
                }
                nodeLists.update(nodes, frag.childNodes);
                elements.replace(oldNodes, frag);
                return nodes;
            },
            text: function(el, compute, parentNode, nodeList) {
                var parent = elements.getParentNode(el, parentNode);
                var data = listen(parent, compute, function(ev, newVal, oldVal) {
                    if (typeof node.nodeValue !== "unknown") {
                        node.nodeValue = can.view.toStr(newVal);
                    }
                    data.teardownCheck(node.parentNode);
                });
                var node = document.createTextNode(can.view.toStr(compute()));
                if (nodeList) {
                    nodeList.unregistered = data.teardownCheck;
                    data.nodeList = nodeList;
                    nodeLists.update(nodeList, [ node ]);
                    elements.replace([ el ], node);
                } else {
                    data.nodeList = live.replace([ el ], node, data.teardownCheck);
                }
            },
            setAttributes: function(el, newVal) {
                var attrs = getAttributeParts(newVal);
                for (var name in attrs) {
                    can.attr.set(el, name, attrs[name]);
                }
            },
            attributes: function(el, compute, currentValue) {
                var oldAttrs = {};
                var setAttrs = function(newVal) {
                    var newAttrs = getAttributeParts(newVal), name;
                    for (name in newAttrs) {
                        var newValue = newAttrs[name], oldValue = oldAttrs[name];
                        if (newValue !== oldValue) {
                            can.attr.set(el, name, newValue);
                        }
                        delete oldAttrs[name];
                    }
                    for (name in oldAttrs) {
                        elements.removeAttr(el, name);
                    }
                    oldAttrs = newAttrs;
                };
                listen(el, compute, function(ev, newVal) {
                    setAttrs(newVal);
                });
                if (arguments.length >= 3) {
                    oldAttrs = getAttributeParts(currentValue);
                } else {
                    setAttrs(compute());
                }
            },
            attributePlaceholder: "__!!__",
            attributeReplace: /__!!__/g,
            attribute: function(el, attributeName, compute) {
                listen(el, compute, function(ev, newVal) {
                    elements.setAttr(el, attributeName, hook.render());
                });
                var wrapped = can.$(el), hooks;
                hooks = can.data(wrapped, "hooks");
                if (!hooks) {
                    can.data(wrapped, "hooks", hooks = {});
                }
                var attr = elements.getAttr(el, attributeName), parts = attr.split(live.attributePlaceholder), goodParts = [], hook;
                goodParts.push(parts.shift(), parts.join(live.attributePlaceholder));
                if (hooks[attributeName]) {
                    hooks[attributeName].computes.push(compute);
                } else {
                    hooks[attributeName] = {
                        render: function() {
                            var i = 0, newAttr = attr ? attr.replace(live.attributeReplace, function() {
                                return elements.contentText(hook.computes[i++]());
                            }) : elements.contentText(hook.computes[i++]());
                            return newAttr;
                        },
                        computes: [ compute ],
                        batchNum: undefined
                    };
                }
                hook = hooks[attributeName];
                goodParts.splice(1, 0, compute());
                elements.setAttr(el, attributeName, goodParts.join(""));
            },
            specialAttribute: function(el, attributeName, compute) {
                listen(el, compute, function(ev, newVal) {
                    elements.setAttr(el, attributeName, getValue(newVal));
                });
                elements.setAttr(el, attributeName, getValue(compute()));
            },
            simpleAttribute: function(el, attributeName, compute) {
                listen(el, compute, function(ev, newVal) {
                    elements.setAttr(el, attributeName, newVal);
                });
                elements.setAttr(el, attributeName, compute());
            }
        };
        live.attr = live.simpleAttribute;
        live.attrs = live.attributes;
        var newLine = /(\r|\n)+/g;
        var getValue = function(val) {
            var regexp = /^["'].*["']$/;
            val = val.replace(elements.attrReg, "").replace(newLine, "");
            return regexp.test(val) ? val.substr(1, val.length - 2) : val;
        };
        can.view.live = live;
        return live;
    }(__m2, __m24, __m10, __m27, __m28);
    var __m25 = function(can, elements, live) {
        var pendingHookups = [], tagChildren = function(tagName) {
            var newTag = elements.tagMap[tagName] || "span";
            if (newTag === "span") {
                return "@@!!@@";
            }
            return "<" + newTag + ">" + tagChildren(newTag) + "</" + newTag + ">";
        }, contentText = function(input, tag) {
            if (typeof input === "string") {
                return input;
            }
            if (!input && input !== 0) {
                return "";
            }
            var hook = input.hookup && function(el, id) {
                input.hookup.call(input, el, id);
            } || typeof input === "function" && input;
            if (hook) {
                if (tag) {
                    return "<" + tag + " " + can.view.hook(hook) + "></" + tag + ">";
                } else {
                    pendingHookups.push(hook);
                }
                return "";
            }
            return "" + input;
        }, contentEscape = function(txt, tag) {
            return typeof txt === "string" || typeof txt === "number" ? can.esc(txt) : contentText(txt, tag);
        }, withinTemplatedSectionWithinAnElement = false, emptyHandler = function() {};
        var lastHookups;
        can.extend(can.view, {
            live: live,
            setupLists: function() {
                var old = can.view.lists, data;
                can.view.lists = function(list, renderer) {
                    data = {
                        list: list,
                        renderer: renderer
                    };
                    return Math.random();
                };
                return function() {
                    can.view.lists = old;
                    return data;
                };
            },
            getHooks: function() {
                var hooks = pendingHookups.slice(0);
                lastHookups = hooks;
                pendingHookups = [];
                return hooks;
            },
            onlytxt: function(self, func) {
                return contentEscape(func.call(self));
            },
            txt: function(escape, tagName, status, self, func) {
                var tag = elements.tagMap[tagName] || "span", setupLiveBinding = false, value, listData, compute, unbind = emptyHandler, attributeName;
                if (withinTemplatedSectionWithinAnElement) {
                    value = func.call(self);
                } else {
                    if (typeof status === "string" || status === 1) {
                        withinTemplatedSectionWithinAnElement = true;
                    }
                    var listTeardown = can.view.setupLists();
                    unbind = function() {
                        compute.unbind("change", emptyHandler);
                    };
                    compute = can.compute(func, self, false);
                    compute.bind("change", emptyHandler);
                    listData = listTeardown();
                    value = compute();
                    withinTemplatedSectionWithinAnElement = false;
                    setupLiveBinding = compute.hasDependencies;
                }
                if (listData) {
                    unbind();
                    return "<" + tag + can.view.hook(function(el, parentNode) {
                        live.list(el, listData.list, listData.renderer, self, parentNode);
                    }) + "></" + tag + ">";
                }
                if (!setupLiveBinding || typeof value === "function") {
                    unbind();
                    return (withinTemplatedSectionWithinAnElement || escape === 2 || !escape ? contentText : contentEscape)(value, status === 0 && tag);
                }
                var contentProp = elements.tagToContentPropMap[tagName];
                if (status === 0 && !contentProp) {
                    return "<" + tag + can.view.hook(escape && typeof value !== "object" ? function(el, parentNode) {
                        live.text(el, compute, parentNode);
                        unbind();
                    } : function(el, parentNode) {
                        live.html(el, compute, parentNode);
                        unbind();
                    }) + ">" + tagChildren(tag) + "</" + tag + ">";
                } else if (status === 1) {
                    pendingHookups.push(function(el) {
                        live.attributes(el, compute, compute());
                        unbind();
                    });
                    return compute();
                } else if (escape === 2) {
                    attributeName = status;
                    pendingHookups.push(function(el) {
                        live.specialAttribute(el, attributeName, compute);
                        unbind();
                    });
                    return compute();
                } else {
                    attributeName = status === 0 ? contentProp : status;
                    (status === 0 ? lastHookups : pendingHookups).push(function(el) {
                        live.attribute(el, attributeName, compute);
                        unbind();
                    });
                    return live.attributePlaceholder;
                }
            }
        });
        return can;
    }(__m10, __m24, __m26, __m13);
    var __m21 = function(can) {
        can.view.ext = ".mustache";
        var SCOPE = "scope", HASH = "___h4sh", CONTEXT_OBJ = "{scope:" + SCOPE + ",options:options}", SPECIAL_CONTEXT_OBJ = "{scope:" + SCOPE + ",options:options, special: true}", ARG_NAMES = SCOPE + ",options", argumentsRegExp = /((([^'"\s]+?=)?('.*?'|".*?"))|.*?)\s/g, literalNumberStringBooleanRegExp = /^(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false|null|undefined)|((.+?)=(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false)|(.+))))$/, makeLookupLiteral = function(type) {
            return '{get:"' + type.replace(/"/g, '\\"') + '"}';
        }, isLookup = function(obj) {
            return obj && typeof obj.get === "string";
        }, isObserveLike = function(obj) {
            return obj instanceof can.Map || obj && !!obj._get;
        }, isArrayLike = function(obj) {
            return obj && obj.splice && typeof obj.length === "number";
        }, makeConvertToScopes = function(original, scope, options) {
            var originalWithScope = function(ctx, opts) {
                return original(ctx || scope, opts);
            };
            return function(updatedScope, updatedOptions) {
                if (updatedScope !== undefined && !(updatedScope instanceof can.view.Scope)) {
                    updatedScope = scope.add(updatedScope);
                }
                if (updatedOptions !== undefined && !(updatedOptions instanceof can.view.Options)) {
                    updatedOptions = options.add(updatedOptions);
                }
                return originalWithScope(updatedScope, updatedOptions || options);
            };
        };
        var Mustache = function(options, helpers) {
            if (this.constructor !== Mustache) {
                var mustache = new Mustache(options);
                return function(data, options) {
                    return mustache.render(data, options);
                };
            }
            if (typeof options === "function") {
                this.template = {
                    fn: options
                };
                return;
            }
            can.extend(this, options);
            this.template = this.scanner.scan(this.text, this.name);
        };
        can.Mustache = window.Mustache = Mustache;
        Mustache.prototype.render = function(data, options) {
            if (!(data instanceof can.view.Scope)) {
                data = new can.view.Scope(data || {});
            }
            if (!(options instanceof can.view.Options)) {
                options = new can.view.Options(options || {});
            }
            options = options || {};
            return this.template.fn.call(data, data, options);
        };
        can.extend(Mustache.prototype, {
            scanner: new can.view.Scanner({
                text: {
                    start: "",
                    scope: SCOPE,
                    options: ",options: options",
                    argNames: ARG_NAMES
                },
                tokens: [ [ "returnLeft", "{{{", "{{[{&]" ], [ "commentFull", "{{!}}", "^[\\s\\t]*{{!.+?}}\\n" ], [ "commentLeft", "{{!", "(\\n[\\s\\t]*{{!|{{!)" ], [ "escapeFull", "{{}}", "(^[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}$)", function(content) {
                    return {
                        before: /^\n.+?\n$/.test(content) ? "\n" : "",
                        content: content.match(/\{\{(.+?)\}\}/)[1] || ""
                    };
                } ], [ "escapeLeft", "{{" ], [ "returnRight", "}}}" ], [ "right", "}}" ] ],
                helpers: [ {
                    name: /^>[\s]*\w*/,
                    fn: function(content, cmd) {
                        var templateName = can.trim(content.replace(/^>\s?/, "")).replace(/["|']/g, "");
                        return "can.Mustache.renderPartial('" + templateName + "'," + ARG_NAMES + ")";
                    }
                }, {
                    name: /^\s*data\s/,
                    fn: function(content, cmd) {
                        var attr = content.match(/["|'](.*)["|']/)[1];
                        return "can.proxy(function(__){" + "can.data(can.$(__),'" + attr + "', this.attr('.')); }, " + SCOPE + ")";
                    }
                }, {
                    name: /\s*\(([\$\w]+)\)\s*->([^\n]*)/,
                    fn: function(content) {
                        var quickFunc = /\s*\(([\$\w]+)\)\s*->([^\n]*)/, parts = content.match(quickFunc);
                        return "can.proxy(function(__){var " + parts[1] + "=can.$(__);with(" + SCOPE + ".attr('.')){" + parts[2] + "}}, this);";
                    }
                }, {
                    name: /^.*$/,
                    fn: function(content, cmd) {
                        var mode = false, result = {
                            content: "",
                            startTxt: false,
                            startOnlyTxt: false,
                            end: false
                        };
                        content = can.trim(content);
                        if (content.length && (mode = content.match(/^([#^/]|else$)/))) {
                            mode = mode[0];
                            switch (mode) {
                              case "#":
                              case "^":
                                if (cmd.specialAttribute) {
                                    result.startOnlyTxt = true;
                                } else {
                                    result.startTxt = true;
                                    result.escaped = 0;
                                }
                                break;

                              case "/":
                                result.end = true;
                                result.content += 'return ___v1ew.join("");}}])';
                                return result;
                            }
                            content = content.substring(1);
                        }
                        if (mode !== "else") {
                            var args = [], hashes = [], i = 0, m;
                            result.content += "can.Mustache.txt(\n" + (cmd.specialAttribute ? SPECIAL_CONTEXT_OBJ : CONTEXT_OBJ) + ",\n" + (mode ? '"' + mode + '"' : "null") + ",";
                            (can.trim(content) + " ").replace(argumentsRegExp, function(whole, arg) {
                                if (i && (m = arg.match(literalNumberStringBooleanRegExp))) {
                                    if (m[2]) {
                                        args.push(m[0]);
                                    } else {
                                        hashes.push(m[4] + ":" + (m[6] ? m[6] : makeLookupLiteral(m[5])));
                                    }
                                } else {
                                    args.push(makeLookupLiteral(arg));
                                }
                                i++;
                            });
                            result.content += args.join(",");
                            if (hashes.length) {
                                result.content += ",{" + HASH + ":{" + hashes.join(",") + "}}";
                            }
                        }
                        if (mode && mode !== "else") {
                            result.content += ",[\n\n";
                        }
                        switch (mode) {
                          case "^":
                          case "#":
                            result.content += "{fn:function(" + ARG_NAMES + "){var ___v1ew = [];";
                            break;

                          case "else":
                            result.content += 'return ___v1ew.join("");}},\n{inverse:function(' + ARG_NAMES + "){\nvar ___v1ew = [];";
                            break;

                          default:
                            result.content += ")";
                            break;
                        }
                        if (!mode) {
                            result.startTxt = true;
                            result.end = true;
                        }
                        return result;
                    }
                } ]
            })
        });
        var helpers = can.view.Scanner.prototype.helpers;
        for (var i = 0; i < helpers.length; i++) {
            Mustache.prototype.scanner.helpers.unshift(helpers[i]);
        }
        Mustache.txt = function(scopeAndOptions, mode, name) {
            var scope = scopeAndOptions.scope, options = scopeAndOptions.options, args = [], helperOptions = {
                fn: function() {},
                inverse: function() {}
            }, hash, context = scope.attr("."), getHelper = true, helper;
            for (var i = 3; i < arguments.length; i++) {
                var arg = arguments[i];
                if (mode && can.isArray(arg)) {
                    helperOptions = can.extend.apply(can, [ helperOptions ].concat(arg));
                } else if (arg && arg[HASH]) {
                    hash = arg[HASH];
                    for (var prop in hash) {
                        if (isLookup(hash[prop])) {
                            hash[prop] = Mustache.get(hash[prop].get, scopeAndOptions, false, true);
                        }
                    }
                } else if (arg && isLookup(arg)) {
                    args.push(Mustache.get(arg.get, scopeAndOptions, false, true, true));
                } else {
                    args.push(arg);
                }
            }
            if (isLookup(name)) {
                var get = name.get;
                name = Mustache.get(name.get, scopeAndOptions, args.length, false);
                getHelper = get === name;
            }
            helperOptions.fn = makeConvertToScopes(helperOptions.fn, scope, options);
            helperOptions.inverse = makeConvertToScopes(helperOptions.inverse, scope, options);
            if (mode === "^") {
                var tmp = helperOptions.fn;
                helperOptions.fn = helperOptions.inverse;
                helperOptions.inverse = tmp;
            }
            if (helper = getHelper && (typeof name === "string" && Mustache.getHelper(name, options)) || can.isFunction(name) && !name.isComputed && {
                fn: name
            }) {
                can.extend(helperOptions, {
                    context: context,
                    scope: scope,
                    contexts: scope,
                    hash: hash
                });
                args.push(helperOptions);
                return function() {
                    return helper.fn.apply(context, args) || "";
                };
            }
            return function() {
                var value;
                if (can.isFunction(name) && name.isComputed) {
                    value = name();
                } else {
                    value = name;
                }
                var validArgs = args.length ? args : [ value ], valid = true, result = [], i, argIsObserve, arg;
                if (mode) {
                    for (i = 0; i < validArgs.length; i++) {
                        arg = validArgs[i];
                        argIsObserve = typeof arg !== "undefined" && isObserveLike(arg);
                        if (isArrayLike(arg)) {
                            if (mode === "#") {
                                valid = valid && !!(argIsObserve ? arg.attr("length") : arg.length);
                            } else if (mode === "^") {
                                valid = valid && !(argIsObserve ? arg.attr("length") : arg.length);
                            }
                        } else {
                            valid = mode === "#" ? valid && !!arg : mode === "^" ? valid && !arg : valid;
                        }
                    }
                }
                if (valid) {
                    if (mode === "#") {
                        if (isArrayLike(value)) {
                            var isObserveList = isObserveLike(value);
                            for (i = 0; i < value.length; i++) {
                                result.push(helperOptions.fn(isObserveList ? value.attr("" + i) : value[i]));
                            }
                            return result.join("");
                        } else {
                            return helperOptions.fn(value || {}) || "";
                        }
                    } else if (mode === "^") {
                        return helperOptions.inverse(value || {}) || "";
                    } else {
                        return "" + (value != null ? value : "");
                    }
                }
                return "";
            };
        };
        Mustache.get = function(key, scopeAndOptions, isHelper, isArgument, isLookup) {
            var context = scopeAndOptions.scope.attr("."), options = scopeAndOptions.options || {};
            if (isHelper) {
                if (Mustache.getHelper(key, options)) {
                    return key;
                }
                if (scopeAndOptions.scope && can.isFunction(context[key])) {
                    return context[key];
                }
            }
            var computeData = scopeAndOptions.scope.computeData(key, {
                isArgument: isArgument,
                args: [ context, scopeAndOptions.scope ]
            }), compute = computeData.compute;
            can.compute.temporarilyBind(compute);
            var initialValue = computeData.initialValue, helperObj = Mustache.getHelper(key, options);
            if (!isLookup && (initialValue === undefined || computeData.scope !== scopeAndOptions.scope) && Mustache.getHelper(key, options)) {
                return key;
            }
            if (!compute.hasDependencies) {
                return initialValue;
            } else {
                return compute;
            }
        };
        Mustache.resolve = function(value) {
            if (isObserveLike(value) && isArrayLike(value) && value.attr("length")) {
                return value;
            } else if (can.isFunction(value)) {
                return value();
            } else {
                return value;
            }
        };
        can.view.Options = can.view.Scope.extend({
            init: function(data, parent) {
                if (!data.helpers && !data.partials && !data.tags) {
                    data = {
                        helpers: data
                    };
                }
                can.view.Scope.prototype.init.apply(this, arguments);
            }
        });
        Mustache._helpers = {};
        Mustache.registerHelper = function(name, fn) {
            this._helpers[name] = {
                name: name,
                fn: fn
            };
        };
        Mustache.getHelper = function(name, options) {
            var helper;
            if (options) {
                helper = options.attr("helpers." + name);
            }
            return helper ? {
                fn: helper
            } : this._helpers[name];
        };
        Mustache.render = function(partial, scope, options) {
            if (!can.view.cached[partial]) {
                var reads = can.__clearReading();
                if (scope.attr("partial")) {
                    partial = scope.attr("partial");
                }
                can.__setReading(reads);
            }
            return can.view.render(partial, scope, options);
        };
        Mustache.safeString = function(str) {
            return {
                toString: function() {
                    return str;
                }
            };
        };
        Mustache.renderPartial = function(partialName, scope, options) {
            var partial = options.attr("partials." + partialName);
            if (partial) {
                return partial.render ? partial.render(scope, options) : partial(scope, options);
            } else {
                return can.Mustache.render(partialName, scope, options);
            }
        };
        can.each({
            "if": function(expr, options) {
                var value;
                if (can.isFunction(expr)) {
                    value = can.compute.truthy(expr)();
                } else {
                    value = !!Mustache.resolve(expr);
                }
                if (value) {
                    return options.fn(options.contexts || this);
                } else {
                    return options.inverse(options.contexts || this);
                }
            },
            unless: function(expr, options) {
                return Mustache._helpers["if"].fn.apply(this, [ can.isFunction(expr) ? can.compute(function() {
                    return !expr();
                }) : !expr, options ]);
            },
            each: function(expr, options) {
                var resolved = Mustache.resolve(expr), result = [], keys, key, i;
                if (can.view.lists && (resolved instanceof can.List || expr && expr.isComputed && resolved === undefined)) {
                    return can.view.lists(expr, function(item, index) {
                        return options.fn(options.scope.add({
                            "@index": index
                        }).add(item));
                    });
                }
                expr = resolved;
                if (!!expr && isArrayLike(expr)) {
                    for (i = 0; i < expr.length; i++) {
                        result.push(options.fn(options.scope.add({
                            "@index": i
                        }).add(expr[i])));
                    }
                    return result.join("");
                } else if (isObserveLike(expr)) {
                    keys = can.Map.keys(expr);
                    for (i = 0; i < keys.length; i++) {
                        key = keys[i];
                        result.push(options.fn(options.scope.add({
                            "@key": key
                        }).add(expr[key])));
                    }
                    return result.join("");
                } else if (expr instanceof Object) {
                    for (key in expr) {
                        result.push(options.fn(options.scope.add({
                            "@key": key
                        }).add(expr[key])));
                    }
                    return result.join("");
                }
            },
            "with": function(expr, options) {
                var ctx = expr;
                expr = Mustache.resolve(expr);
                if (!!expr) {
                    return options.fn(ctx);
                }
            },
            log: function(expr, options) {
                if (typeof console !== "undefined" && console.log) {
                    if (!options) {
                        console.log(expr.context);
                    } else {
                        console.log(expr, options.context);
                    }
                }
            },
            "@index": function(offset, options) {
                if (!options) {
                    options = offset;
                    offset = 0;
                }
                var index = options.scope.attr("@index");
                return "" + ((can.isFunction(index) ? index() : index) + offset);
            }
        }, function(fn, name) {
            Mustache.registerHelper(name, fn);
        });
        can.view.register({
            suffix: "mustache",
            contentType: "x-mustache-template",
            script: function(id, src) {
                return "can.Mustache(function(" + ARG_NAMES + ") { " + new Mustache({
                    text: src,
                    name: id
                }).template.out + " })";
            },
            renderer: function(id, text) {
                return Mustache({
                    text: text,
                    name: id
                });
            }
        });
        can.mustache.registerHelper = can.proxy(can.Mustache.registerHelper, can.Mustache);
        can.mustache.safeString = can.Mustache.safeString;
        return can;
    }(__m2, __m22, __m10, __m23, __m20, __m25);
    var __m29 = function(can) {
        var isContentEditable = function() {
            var values = {
                "": true,
                "true": true,
                "false": false
            };
            var editable = function(el) {
                if (!el || !el.getAttribute) {
                    return;
                }
                var attr = el.getAttribute("contenteditable");
                return values[attr];
            };
            return function(el) {
                var val = editable(el);
                if (typeof val === "boolean") {
                    return val;
                } else {
                    return !!editable(el.parentNode);
                }
            };
        }(), removeCurly = function(value) {
            if (value[0] === "{" && value[value.length - 1] === "}") {
                return value.substr(1, value.length - 2);
            }
            return value;
        };
        can.view.attr("can-value", function(el, data) {
            var attr = removeCurly(el.getAttribute("can-value")), value = data.scope.computeData(attr, {
                args: []
            }).compute, trueValue, falseValue;
            if (el.nodeName.toLowerCase() === "input") {
                if (el.type === "checkbox") {
                    if (can.attr.has(el, "can-true-value")) {
                        trueValue = el.getAttribute("can-true-value");
                    } else {
                        trueValue = true;
                    }
                    if (can.attr.has(el, "can-false-value")) {
                        falseValue = el.getAttribute("can-false-value");
                    } else {
                        falseValue = false;
                    }
                }
                if (el.type === "checkbox" || el.type === "radio") {
                    new Checked(el, {
                        value: value,
                        trueValue: trueValue,
                        falseValue: falseValue
                    });
                    return;
                }
            }
            if (el.nodeName.toLowerCase() === "select" && el.multiple) {
                new Multiselect(el, {
                    value: value
                });
                return;
            }
            if (isContentEditable(el)) {
                new Content(el, {
                    value: value
                });
                return;
            }
            new Value(el, {
                value: value
            });
        });
        var special = {
            enter: function(data, el, original) {
                return {
                    event: "keyup",
                    handler: function(ev) {
                        if (ev.keyCode === 13) {
                            return original.call(this, ev);
                        }
                    }
                };
            }
        };
        can.view.attr(/can-[\w\.]+/, function(el, data) {
            var attributeName = data.attributeName, event = attributeName.substr("can-".length), handler = function(ev) {
                var attr = removeCurly(el.getAttribute(attributeName)), scopeData = data.scope.read(attr, {
                    returnObserveMethods: true,
                    isArgument: true
                });
                return scopeData.value.call(scopeData.parent, data.scope._context, can.$(this), ev);
            };
            if (special[event]) {
                var specialData = special[event](data, el, handler);
                handler = specialData.handler;
                event = specialData.event;
            }
            can.bind.call(el, event, handler);
        });
        var Value = can.Control.extend({
            init: function() {
                if (this.element[0].nodeName.toUpperCase() === "SELECT") {
                    setTimeout(can.proxy(this.set, this), 1);
                } else {
                    this.set();
                }
            },
            "{value} change": "set",
            set: function() {
                if (!this.element) {
                    return;
                }
                var val = this.options.value();
                this.element[0].value = val == null ? "" : val;
            },
            change: function() {
                if (!this.element) {
                    return;
                }
                this.options.value(this.element[0].value);
            }
        }), Checked = can.Control.extend({
            init: function() {
                this.isCheckbox = this.element[0].type.toLowerCase() === "checkbox";
                this.check();
            },
            "{value} change": "check",
            check: function() {
                if (this.isCheckbox) {
                    var value = this.options.value(), trueValue = this.options.trueValue || true;
                    this.element[0].checked = value === trueValue;
                } else {
                    var setOrRemove = this.options.value() == this.element[0].value ? "set" : "remove";
                    can.attr[setOrRemove](this.element[0], "checked", true);
                }
            },
            change: function() {
                if (this.isCheckbox) {
                    this.options.value(this.element[0].checked ? this.options.trueValue : this.options.falseValue);
                } else {
                    if (this.element[0].checked) {
                        this.options.value(this.element[0].value);
                    }
                }
            }
        }), Multiselect = Value.extend({
            init: function() {
                this.delimiter = ";";
                this.set();
            },
            set: function() {
                var newVal = this.options.value();
                if (typeof newVal === "string") {
                    newVal = newVal.split(this.delimiter);
                    this.isString = true;
                } else if (newVal) {
                    newVal = can.makeArray(newVal);
                }
                var isSelected = {};
                can.each(newVal, function(val) {
                    isSelected[val] = true;
                });
                can.each(this.element[0].childNodes, function(option) {
                    if (option.value) {
                        option.selected = !!isSelected[option.value];
                    }
                });
            },
            get: function() {
                var values = [], children = this.element[0].childNodes;
                can.each(children, function(child) {
                    if (child.selected && child.value) {
                        values.push(child.value);
                    }
                });
                return values;
            },
            change: function() {
                var value = this.get(), currentValue = this.options.value();
                if (this.isString || typeof currentValue === "string") {
                    this.isString = true;
                    this.options.value(value.join(this.delimiter));
                } else if (currentValue instanceof can.List) {
                    currentValue.attr(value, true);
                } else {
                    this.options.value(value);
                }
            }
        }), Content = can.Control.extend({
            init: function() {
                this.set();
                this.on("blur", "setValue");
            },
            "{value} change": "set",
            set: function() {
                var val = this.options.value();
                this.element[0].innerHTML = typeof val === "undefined" ? "" : val;
            },
            setValue: function() {
                this.options.value(this.element[0].innerHTML);
            }
        });
    }(__m2, __m21, __m11);
    var __m1 = function(can, viewCallbacks) {
        var ignoreAttributesRegExp = /^(dataViewId|class|id)$/i, paramReplacer = /\{([^\}]+)\}/g;
        var Component = can.Component = can.Construct.extend({
            setup: function() {
                can.Construct.setup.apply(this, arguments);
                if (can.Component) {
                    var self = this, scope = this.prototype.scope;
                    this.Control = ComponentControl.extend(this.prototype.events);
                    if (!scope || typeof scope === "object" && !(scope instanceof can.Map)) {
                        this.Map = can.Map.extend(scope || {});
                    } else if (scope.prototype instanceof can.Map) {
                        this.Map = scope;
                    }
                    this.attributeScopeMappings = {};
                    can.each(this.Map ? this.Map.defaults : {}, function(val, prop) {
                        if (val === "@") {
                            self.attributeScopeMappings[prop] = prop;
                        }
                    });
                    if (this.prototype.template) {
                        if (typeof this.prototype.template === "function") {
                            var temp = this.prototype.template;
                            this.renderer = function() {
                                return can.view.frag(temp.apply(null, arguments));
                            };
                        } else {
                            this.renderer = can.view.mustache(this.prototype.template);
                        }
                    }
                    can.view.tag(this.prototype.tag, function(el, options) {
                        new self(el, options);
                    });
                }
            }
        }, {
            setup: function(el, hookupOptions) {
                var initalScopeData = {}, component = this, twoWayBindings = {}, scopePropertyUpdating, componentScope, frag;
                can.each(this.constructor.attributeScopeMappings, function(val, prop) {
                    initalScopeData[prop] = el.getAttribute(can.hyphenate(val));
                });
                can.each(can.makeArray(el.attributes), function(node, index) {
                    var name = can.camelize(node.nodeName.toLowerCase()), value = node.value;
                    if (component.constructor.attributeScopeMappings[name] || ignoreAttributesRegExp.test(name) || viewCallbacks.attr(node.nodeName)) {
                        return;
                    }
                    if (value[0] === "{" && value[value.length - 1] === "}") {
                        value = value.substr(1, value.length - 2);
                    } else {
                        if (hookupOptions.templateType !== "legacy") {
                            initalScopeData[name] = value;
                            return;
                        }
                    }
                    var computeData = hookupOptions.scope.computeData(value, {
                        args: []
                    }), compute = computeData.compute;
                    var handler = function(ev, newVal) {
                        scopePropertyUpdating = name;
                        componentScope.attr(name, newVal);
                        scopePropertyUpdating = null;
                    };
                    compute.bind("change", handler);
                    initalScopeData[name] = compute();
                    if (!compute.hasDependencies) {
                        compute.unbind("change", handler);
                    } else {
                        can.bind.call(el, "removed", function() {
                            compute.unbind("change", handler);
                        });
                        twoWayBindings[name] = computeData;
                    }
                });
                if (this.constructor.Map) {
                    componentScope = new this.constructor.Map(initalScopeData);
                } else if (this.scope instanceof can.Map) {
                    componentScope = this.scope;
                } else if (can.isFunction(this.scope)) {
                    var scopeResult = this.scope(initalScopeData, hookupOptions.scope, el);
                    if (scopeResult instanceof can.Map) {
                        componentScope = scopeResult;
                    } else if (scopeResult.prototype instanceof can.Map) {
                        componentScope = new scopeResult(initalScopeData);
                    } else {
                        componentScope = new (can.Map.extend(scopeResult))(initalScopeData);
                    }
                }
                var handlers = {};
                can.each(twoWayBindings, function(computeData, prop) {
                    handlers[prop] = function(ev, newVal) {
                        if (scopePropertyUpdating !== prop) {
                            computeData.compute(newVal);
                        }
                    };
                    componentScope.bind(prop, handlers[prop]);
                });
                can.bind.call(el, "removed", function() {
                    can.each(handlers, function(handler, prop) {
                        componentScope.unbind(prop, handlers[prop]);
                    });
                });
                if (!can.isEmptyObject(this.constructor.attributeScopeMappings) || hookupOptions.templateType !== "legacy") {
                    can.bind.call(el, "attributes", function(ev) {
                        var camelized = can.camelize(ev.attributeName);
                        if (!twoWayBindings[camelized] && !ignoreAttributesRegExp.test(camelized)) {
                            componentScope.attr(camelized, el.getAttribute(ev.attributeName));
                        }
                    });
                }
                this.scope = componentScope;
                can.data(can.$(el), "scope", this.scope);
                var renderedScope = hookupOptions.scope.add(this.scope), options = {
                    helpers: {}
                };
                can.each(this.helpers || {}, function(val, prop) {
                    if (can.isFunction(val)) {
                        options.helpers[prop] = function() {
                            return val.apply(componentScope, arguments);
                        };
                    }
                });
                this._control = new this.constructor.Control(el, {
                    scope: this.scope
                });
                if (this.constructor.renderer) {
                    if (!options.tags) {
                        options.tags = {};
                    }
                    options.tags.content = function contentHookup(el, rendererOptions) {
                        var subtemplate = hookupOptions.subtemplate || rendererOptions.subtemplate;
                        if (subtemplate) {
                            delete options.tags.content;
                            can.view.live.replace([ el ], subtemplate(rendererOptions.scope, rendererOptions.options));
                            options.tags.content = contentHookup;
                        }
                    };
                    frag = this.constructor.renderer(renderedScope, hookupOptions.options.add(options));
                } else {
                    if (hookupOptions.templateType === "legacy") {
                        frag = can.view.frag(hookupOptions.subtemplate ? hookupOptions.subtemplate(renderedScope, hookupOptions.options.add(options)) : "");
                    } else {
                        frag = hookupOptions.subtemplate ? hookupOptions.subtemplate(renderedScope, hookupOptions.options.add(options)) : document.createDocumentFragment();
                    }
                }
                can.appendChild(el, frag);
            }
        });
        var ComponentControl = can.Control.extend({
            _lookup: function(options) {
                return [ options.scope, options, window ];
            },
            _action: function(methodName, options, controlInstance) {
                var hasObjectLookup, readyCompute;
                paramReplacer.lastIndex = 0;
                hasObjectLookup = paramReplacer.test(methodName);
                if (!controlInstance && hasObjectLookup) {
                    return;
                } else if (!hasObjectLookup) {
                    return can.Control._action.apply(this, arguments);
                } else {
                    readyCompute = can.compute(function() {
                        var delegate;
                        var name = methodName.replace(paramReplacer, function(matched, key) {
                            var value;
                            if (key === "scope") {
                                delegate = options.scope;
                                return "";
                            }
                            key = key.replace(/^scope\./, "");
                            value = can.compute.read(options.scope, key.split("."), {
                                isArgument: true
                            }).value;
                            if (value === undefined) {
                                value = can.getObject(key);
                            }
                            if (typeof value === "string") {
                                return value;
                            } else {
                                delegate = value;
                                return "";
                            }
                        });
                        var parts = name.split(/\s+/g), event = parts.pop();
                        return {
                            processor: this.processors[event] || this.processors.click,
                            parts: [ name, parts.join(" "), event ],
                            delegate: delegate || undefined
                        };
                    }, this);
                    var handler = function(ev, ready) {
                        controlInstance._bindings.control[methodName](controlInstance.element);
                        controlInstance._bindings.control[methodName] = ready.processor(ready.delegate || controlInstance.element, ready.parts[2], ready.parts[1], methodName, controlInstance);
                    };
                    readyCompute.bind("change", handler);
                    controlInstance._bindings.readyComputes[methodName] = {
                        compute: readyCompute,
                        handler: handler
                    };
                    return readyCompute();
                }
            }
        }, {
            setup: function(el, options) {
                this.scope = options.scope;
                return can.Control.prototype.setup.call(this, el, options);
            },
            off: function() {
                if (this._bindings) {
                    can.each(this._bindings.readyComputes || {}, function(value) {
                        value.compute.unbind("change", value.handler);
                    });
                }
                can.Control.prototype.off.apply(this, arguments);
                this._bindings.readyComputes = {};
            }
        });
        if (window.jQuery && jQuery.fn) {
            jQuery.fn.scope = function(attr) {
                if (attr) {
                    return this.data("scope").attr(attr);
                } else {
                    return this.data("scope");
                }
            };
        }
        can.scope = function(el, attr) {
            el = can.$(el);
            if (attr) {
                return can.data(el, "scope").attr(attr);
            } else {
                return can.data(el, "scope");
            }
        };
        return Component;
    }(__m2, __m9, __m11, __m14, __m21, __m29);
    var __m31 = function(can) {
        var digitTest = /^\d+$/, keyBreaker = /([^\[\]]+)|(\[\])/g, paramTest = /([^?#]*)(#.*)?$/, prep = function(str) {
            return decodeURIComponent(str.replace(/\+/g, " "));
        };
        can.extend(can, {
            deparam: function(params) {
                var data = {}, pairs, lastPart;
                if (params && paramTest.test(params)) {
                    pairs = params.split("&");
                    can.each(pairs, function(pair) {
                        var parts = pair.split("="), key = prep(parts.shift()), value = prep(parts.join("=")), current = data;
                        if (key) {
                            parts = key.match(keyBreaker);
                            for (var j = 0, l = parts.length - 1; j < l; j++) {
                                if (!current[parts[j]]) {
                                    current[parts[j]] = digitTest.test(parts[j + 1]) || parts[j + 1] === "[]" ? [] : {};
                                }
                                current = current[parts[j]];
                            }
                            lastPart = parts.pop();
                            if (lastPart === "[]") {
                                current.push(value);
                            } else {
                                current[lastPart] = value;
                            }
                        }
                    });
                }
                return data;
            }
        });
        return can;
    }(__m2, __m13);
    var __m30 = function(can) {
        var matcher = /\:([\w\.]+)/g, paramsMatcher = /^(?:&[^=]+=[^&]*)+/, makeProps = function(props) {
            var tags = [];
            can.each(props, function(val, name) {
                tags.push((name === "className" ? "class" : name) + '="' + (name === "href" ? val : can.esc(val)) + '"');
            });
            return tags.join(" ");
        }, matchesData = function(route, data) {
            var count = 0, i = 0, defaults = {};
            for (var name in route.defaults) {
                if (route.defaults[name] === data[name]) {
                    defaults[name] = 1;
                    count++;
                }
            }
            for (;i < route.names.length; i++) {
                if (!data.hasOwnProperty(route.names[i])) {
                    return -1;
                }
                if (!defaults[route.names[i]]) {
                    count++;
                }
            }
            return count;
        }, location = window.location, wrapQuote = function(str) {
            return (str + "").replace(/([.?*+\^$\[\]\\(){}|\-])/g, "\\$1");
        }, each = can.each, extend = can.extend, stringify = function(obj) {
            if (obj && typeof obj === "object") {
                if (obj instanceof can.Map) {
                    obj = obj.attr();
                } else {
                    obj = can.isFunction(obj.slice) ? obj.slice() : can.extend({}, obj);
                }
                can.each(obj, function(val, prop) {
                    obj[prop] = stringify(val);
                });
            } else if (obj !== undefined && obj !== null && can.isFunction(obj.toString)) {
                obj = obj.toString();
            }
            return obj;
        }, removeBackslash = function(str) {
            return str.replace(/\\/g, "");
        }, timer, curParams, lastHash, changingData, onRouteDataChange = function(ev, attr, how, newval) {
            changingData = 1;
            clearTimeout(timer);
            timer = setTimeout(function() {
                changingData = 0;
                var serialized = can.route.data.serialize(), path = can.route.param(serialized, true);
                can.route._call("setURL", path);
                can.batch.trigger(eventsObject, "__url", [ path, lastHash ]);
                lastHash = path;
            }, 10);
        }, eventsObject = can.extend({}, can.event);
        can.route = function(url, defaults) {
            var root = can.route._call("root");
            if (root.lastIndexOf("/") === root.length - 1 && url.indexOf("/") === 0) {
                url = url.substr(1);
            }
            defaults = defaults || {};
            var names = [], res, test = "", lastIndex = matcher.lastIndex = 0, next, querySeparator = can.route._call("querySeparator"), matchSlashes = can.route._call("matchSlashes");
            while (res = matcher.exec(url)) {
                names.push(res[1]);
                test += removeBackslash(url.substring(lastIndex, matcher.lastIndex - res[0].length));
                next = "\\" + (removeBackslash(url.substr(matcher.lastIndex, 1)) || querySeparator + (matchSlashes ? "" : "|/"));
                test += "([^" + next + "]" + (defaults[res[1]] ? "*" : "+") + ")";
                lastIndex = matcher.lastIndex;
            }
            test += url.substr(lastIndex).replace("\\", "");
            can.route.routes[url] = {
                test: new RegExp("^" + test + "($|" + wrapQuote(querySeparator) + ")"),
                route: url,
                names: names,
                defaults: defaults,
                length: url.split("/").length
            };
            return can.route;
        };
        extend(can.route, {
            param: function(data, _setRoute) {
                var route, matches = 0, matchCount, routeName = data.route, propCount = 0;
                delete data.route;
                each(data, function() {
                    propCount++;
                });
                each(can.route.routes, function(temp, name) {
                    matchCount = matchesData(temp, data);
                    if (matchCount > matches) {
                        route = temp;
                        matches = matchCount;
                    }
                    if (matchCount >= propCount) {
                        return false;
                    }
                });
                if (can.route.routes[routeName] && matchesData(can.route.routes[routeName], data) === matches) {
                    route = can.route.routes[routeName];
                }
                if (route) {
                    var cpy = extend({}, data), res = route.route.replace(matcher, function(whole, name) {
                        delete cpy[name];
                        return data[name] === route.defaults[name] ? "" : encodeURIComponent(data[name]);
                    }).replace("\\", ""), after;
                    each(route.defaults, function(val, name) {
                        if (cpy[name] === val) {
                            delete cpy[name];
                        }
                    });
                    after = can.param(cpy);
                    if (_setRoute) {
                        can.route.attr("route", route.route);
                    }
                    return res + (after ? can.route._call("querySeparator") + after : "");
                }
                return can.isEmptyObject(data) ? "" : can.route._call("querySeparator") + can.param(data);
            },
            deparam: function(url) {
                var root = can.route._call("root");
                if (root.lastIndexOf("/") === root.length - 1 && url.indexOf("/") === 0) {
                    url = url.substr(1);
                }
                var route = {
                    length: -1
                }, querySeparator = can.route._call("querySeparator"), paramsMatcher = can.route._call("paramsMatcher");
                each(can.route.routes, function(temp, name) {
                    if (temp.test.test(url) && temp.length > route.length) {
                        route = temp;
                    }
                });
                if (route.length > -1) {
                    var parts = url.match(route.test), start = parts.shift(), remainder = url.substr(start.length - (parts[parts.length - 1] === querySeparator ? 1 : 0)), obj = remainder && paramsMatcher.test(remainder) ? can.deparam(remainder.slice(1)) : {};
                    obj = extend(true, {}, route.defaults, obj);
                    each(parts, function(part, i) {
                        if (part && part !== querySeparator) {
                            obj[route.names[i]] = decodeURIComponent(part);
                        }
                    });
                    obj.route = route.route;
                    return obj;
                }
                if (url.charAt(0) !== querySeparator) {
                    url = querySeparator + url;
                }
                return paramsMatcher.test(url) ? can.deparam(url.slice(1)) : {};
            },
            data: new can.Map({}),
            map: function(data) {
                var appState;
                if (data.prototype instanceof can.Map) {
                    appState = new data();
                } else {
                    appState = data;
                }
                can.route.data = appState;
            },
            routes: {},
            ready: function(val) {
                if (val !== true) {
                    can.route._setup();
                    can.route.setState();
                }
                return can.route;
            },
            url: function(options, merge) {
                if (merge) {
                    options = can.extend({}, can.route.deparam(can.route._call("matchingPartOfURL")), options);
                }
                return can.route._call("root") + can.route.param(options);
            },
            link: function(name, options, props, merge) {
                return "<a " + makeProps(extend({
                    href: can.route.url(options, merge)
                }, props)) + ">" + name + "</a>";
            },
            current: function(options) {
                can.__reading(eventsObject, "__url");
                return this._call("matchingPartOfURL") === can.route.param(options);
            },
            bindings: {
                hashchange: {
                    paramsMatcher: paramsMatcher,
                    querySeparator: "&",
                    matchSlashes: false,
                    bind: function() {
                        can.bind.call(window, "hashchange", setState);
                    },
                    unbind: function() {
                        can.unbind.call(window, "hashchange", setState);
                    },
                    matchingPartOfURL: function() {
                        return location.href.split(/#!?/)[1] || "";
                    },
                    setURL: function(path) {
                        location.hash = "#!" + path;
                        return path;
                    },
                    root: "#!"
                }
            },
            defaultBinding: "hashchange",
            currentBinding: null,
            _setup: function() {
                if (!can.route.currentBinding) {
                    can.route._call("bind");
                    can.route.bind("change", onRouteDataChange);
                    can.route.currentBinding = can.route.defaultBinding;
                }
            },
            _teardown: function() {
                if (can.route.currentBinding) {
                    can.route._call("unbind");
                    can.route.unbind("change", onRouteDataChange);
                    can.route.currentBinding = null;
                }
                clearTimeout(timer);
                changingData = 0;
            },
            _call: function() {
                var args = can.makeArray(arguments), prop = args.shift(), binding = can.route.bindings[can.route.currentBinding || can.route.defaultBinding], method = binding[prop];
                if (method.apply) {
                    return method.apply(binding, args);
                } else {
                    return method;
                }
            }
        });
        each([ "bind", "unbind", "on", "off", "delegate", "undelegate", "removeAttr", "compute", "_get", "__get", "each" ], function(name) {
            can.route[name] = function() {
                if (!can.route.data[name]) {
                    return;
                }
                return can.route.data[name].apply(can.route.data, arguments);
            };
        });
        can.route.attr = function(attr, val) {
            var type = typeof attr, newArguments;
            if (val === undefined) {
                newArguments = arguments;
            } else if (type !== "string" && type !== "number") {
                newArguments = [ stringify(attr), val ];
            } else {
                newArguments = [ attr, stringify(val) ];
            }
            return can.route.data.attr.apply(can.route.data, newArguments);
        };
        var setState = can.route.setState = function() {
            var hash = can.route._call("matchingPartOfURL");
            var oldParams = curParams;
            curParams = can.route.deparam(hash);
            if (!changingData || hash !== lastHash) {
                can.batch.start();
                for (var attr in oldParams) {
                    if (!curParams[attr]) {
                        can.route.removeAttr(attr);
                    }
                }
                can.route.attr(curParams);
                can.batch.trigger(eventsObject, "__url", [ hash, lastHash ]);
                can.batch.stop();
            }
        };
        return can.route;
    }(__m2, __m15, __m19, __m31);
    var __m32 = function(can) {
        can.Control.processors.route = function(el, event, selector, funcName, controller) {
            selector = selector || "";
            if (!can.route.routes[selector]) {
                if (selector[0] === "/") {
                    selector = selector.substring(1);
                }
                can.route(selector);
            }
            var batchNum, check = function(ev, attr, how) {
                if (can.route.attr("route") === selector && (ev.batchNum === undefined || ev.batchNum !== batchNum)) {
                    batchNum = ev.batchNum;
                    var d = can.route.attr();
                    delete d.route;
                    if (can.isFunction(controller[funcName])) {
                        controller[funcName](d);
                    } else {
                        controller[controller[funcName]](d);
                    }
                }
            };
            can.route.bind("change", check);
            return function() {
                can.route.unbind("change", check);
            };
        };
        return can;
    }(__m2, __m30, __m11);
    var __m34 = function(can, elements) {
        var processNodes = function(nodes, paths, location) {
            var frag = document.createDocumentFragment();
            for (var i = 0, len = nodes.length; i < len; i++) {
                var node = nodes[i];
                frag.appendChild(processNode(node, paths, location.concat(i)));
            }
            return frag;
        }, keepsTextNodes = function() {
            var testFrag = document.createDocumentFragment();
            var div = document.createElement("div");
            div.appendChild(document.createTextNode(""));
            div.appendChild(document.createTextNode(""));
            testFrag.appendChild(div);
            var cloned = testFrag.cloneNode(true);
            return cloned.childNodes[0].childNodes.length === 2;
        }(), clonesWork = function() {
            var a = document.createElement("a");
            a.innerHTML = "<xyz></xyz>";
            var clone = a.cloneNode(true);
            return clone.innerHTML === "<xyz></xyz>";
        }();
        var cloneNode = clonesWork ? function(el) {
            return el.cloneNode(true);
        } : function(node) {
            var copy;
            if (node.nodeType === 1) {
                copy = document.createElement(node.nodeName);
            } else if (node.nodeType === 3) {
                copy = document.createTextNode(node.nodeValue);
            } else if (node.nodeType === 8) {
                copy = document.createComment(node.nodeValue);
            } else if (node.nodeType === 11) {
                copy = document.createDocumentFragment();
            }
            if (node.attributes) {
                var attributes = can.makeArray(node.attributes);
                can.each(attributes, function(node) {
                    if (node && node.specified) {
                        copy.setAttribute(node.nodeName, node.nodeValue);
                    }
                });
            }
            if (node.childNodes) {
                can.each(node.childNodes, function(child) {
                    copy.appendChild(cloneNode(child));
                });
            }
            return copy;
        };
        function processNode(node, paths, location) {
            var callback, loc = location, nodeType = typeof node, el, p, i, len;
            var getCallback = function() {
                if (!callback) {
                    callback = {
                        path: location,
                        callbacks: []
                    };
                    paths.push(callback);
                    loc = [];
                }
                return callback;
            };
            if (nodeType === "object") {
                if (node.tag) {
                    el = document.createElement(node.tag);
                    if (node.attrs) {
                        for (var attrName in node.attrs) {
                            var value = node.attrs[attrName];
                            if (typeof value === "function") {
                                getCallback().callbacks.push({
                                    callback: value
                                });
                            } else {
                                el.setAttribute(attrName, value);
                            }
                        }
                    }
                    if (node.attributes) {
                        for (i = 0, len = node.attributes.length; i < len; i++) {
                            getCallback().callbacks.push({
                                callback: node.attributes[i]
                            });
                        }
                    }
                    if (node.children && node.children.length) {
                        if (callback) {
                            p = callback.paths = [];
                        } else {
                            p = paths;
                        }
                        el.appendChild(processNodes(node.children, p, loc));
                    }
                } else if (node.comment) {
                    el = document.createComment(node.comment);
                    if (node.callbacks) {
                        for (i = 0, len = node.attributes.length; i < len; i++) {
                            getCallback().callbacks.push({
                                callback: node.callbacks[i]
                            });
                        }
                    }
                }
            } else if (nodeType === "string") {
                el = document.createTextNode(node);
            } else if (nodeType === "function") {
                if (keepsTextNodes) {
                    el = document.createTextNode("");
                    getCallback().callbacks.push({
                        callback: node
                    });
                } else {
                    el = document.createComment("~");
                    getCallback().callbacks.push({
                        callback: function() {
                            var el = document.createTextNode("");
                            elements.replace([ this ], el);
                            return node.apply(el, arguments);
                        }
                    });
                }
            }
            return el;
        }
        function hydratePath(el, pathData, args) {
            var path = pathData.path, callbacks = pathData.callbacks, paths = pathData.paths, callbackData, child = el;
            for (var i = 0, len = path.length; i < len; i++) {
                child = child.childNodes[path[i]];
            }
            for (i = 0, len = callbacks.length; i < len; i++) {
                callbackData = callbacks[i];
                callbackData.callback.apply(child, args);
            }
            if (paths && paths.length) {
                for (i = paths.length - 1; i >= 0; i--) {
                    hydratePath(child, paths[i], args);
                }
            }
        }
        function makeTarget(nodes) {
            var paths = [];
            var frag = processNodes(nodes, paths, []);
            return {
                paths: paths,
                clone: frag,
                hydrate: function() {
                    var cloned = cloneNode(this.clone);
                    var args = can.makeArray(arguments);
                    for (var i = paths.length - 1; i >= 0; i--) {
                        hydratePath(cloned, paths[i], args);
                    }
                    return cloned;
                }
            };
        }
        makeTarget.keepsTextNodes = keepsTextNodes;
        can.view.target = makeTarget;
        return makeTarget;
    }(__m2, __m24);
    var __m36 = function() {
        return {
            isArrayLike: function(obj) {
                return obj && obj.splice && typeof obj.length === "number";
            },
            isObserveLike: function(obj) {
                return obj instanceof can.Map || obj && !!obj._get;
            },
            emptyHandler: function() {},
            jsonParse: function(str) {
                if (str[0] === "'") {
                    return str.substr(1, str.length - 2);
                } else if (str === "undefined") {
                    return undefined;
                } else if (window.JSON) {
                    return JSON.parse(str);
                } else {
                    return eval("(" + str + ")");
                }
            },
            mixins: {
                last: function() {
                    return this.stack[this.stack.length - 1];
                },
                add: function(chars) {
                    this.last().add(chars);
                },
                subSectionDepth: function() {
                    return this.stack.length - 1;
                }
            }
        };
    }(__m2);
    var __m38 = function(can, utils, live) {
        live = live || can.view.live;
        var resolve = function(value) {
            if (utils.isObserveLike(value) && utils.isArrayLike(value) && value.attr("length")) {
                return value;
            } else if (can.isFunction(value)) {
                return value();
            } else {
                return value;
            }
        };
        var helpers = {
            each: function(items, options) {
                var resolved = resolve(items), result = [], keys, key, i;
                if (resolved instanceof can.List || items && items.isComputed && resolved === undefined) {
                    return function(el) {
                        var cb = function(item, index, parentNodeList) {
                            return options.fn(options.scope.add({
                                "@index": index
                            }).add(item), options.options, parentNodeList);
                        };
                        live.list(el, items, cb, options.context, el.parentNode, options.nodeList);
                    };
                }
                var expr = resolved;
                if (!!expr && utils.isArrayLike(expr)) {
                    for (i = 0; i < expr.length; i++) {
                        result.push(options.fn(options.scope.add({
                            "@index": i
                        }).add(expr[i])));
                    }
                } else if (utils.isObserveLike(expr)) {
                    keys = can.Map.keys(expr);
                    for (i = 0; i < keys.length; i++) {
                        key = keys[i];
                        result.push(options.fn(options.scope.add({
                            "@key": key
                        }).add(expr[key])));
                    }
                } else if (expr instanceof Object) {
                    for (key in expr) {
                        result.push(options.fn(options.scope.add({
                            "@key": key
                        }).add(expr[key])));
                    }
                }
                return result;
            },
            "@index": function(offset, options) {
                if (!options) {
                    options = offset;
                    offset = 0;
                }
                var index = options.scope.attr("@index");
                return "" + ((can.isFunction(index) ? index() : index) + offset);
            },
            "if": function(expr, options) {
                var value;
                if (can.isFunction(expr)) {
                    value = can.compute.truthy(expr)();
                } else {
                    value = !!resolve(expr);
                }
                if (value) {
                    return options.fn(options.scope || this);
                } else {
                    return options.inverse(options.scope || this);
                }
            },
            unless: function(expr, options) {
                return helpers["if"].apply(this, [ can.isFunction(expr) ? can.compute(function() {
                    return !expr();
                }) : !expr, options ]);
            },
            "with": function(expr, options) {
                var ctx = expr;
                expr = resolve(expr);
                if (!!expr) {
                    return options.fn(ctx);
                }
            },
            log: function(expr, options) {
                if (typeof console !== "undefined" && console.log) {
                    if (!options) {
                        console.log(expr.context);
                    } else {
                        console.log(expr, options.context);
                    }
                }
            },
            data: function(attr) {
                var data = arguments.length === 2 ? this : arguments[1];
                return function(el) {
                    can.data(can.$(el), attr, data || this.context);
                };
            }
        };
        return {
            registerHelper: function(name, callback) {
                helpers[name] = callback;
            },
            getHelper: function(name, options) {
                var helper = options.attr("helpers." + name);
                if (!helper) {
                    helper = helpers[name];
                }
                if (helper) {
                    return {
                        fn: helper
                    };
                }
            }
        };
    }(__m2, __m36, __m26);
    var __m37 = function(can, utils, mustacheHelpers, live, elements, Scope, nodeLists) {
        live = live || can.view.live;
        elements = elements || can.view.elements;
        Scope = Scope || can.view.Scope;
        nodeLists = nodeLists || can.view.nodeLists;
        var argumentsRegExp = /((([^'"\s]+?=)?('.*?'|".*?"))|.*?)\s/g, literalNumberStringBooleanRegExp = /^(?:(?:('.*?'|".*?")|([0-9]+\.?[0-9]*|true|false|null|undefined))|(?:(.+?)=(?:(?:('.*?'|".*?")|([0-9]+\.?[0-9]*|true|false|null|undefined))|(.+))))$/, mustacheLineBreakRegExp = /(?:(?:^|(\r?)\n)(\s*)(\{\{([^\}]*)\}\}\}?)([^\S\n\r]*)($|\r?\n))|(\{\{([^\}]*)\}\}\}?)/g, isLookup = function(obj) {
            return obj && typeof obj.get === "string";
        }, getItemsFragContent = function(items, isObserveList, helperOptions, options) {
            var frag = document.createDocumentFragment();
            for (var i = 0, len = items.length; i < len; i++) {
                append(frag, helperOptions.fn(isObserveList ? items.attr("" + i) : items[i], options));
            }
            return frag;
        }, append = function(frag, content) {
            if (content) {
                frag.appendChild(typeof content === "string" ? document.createTextNode(content) : content);
            }
        }, getItemsStringContent = function(items, isObserveList, helperOptions, options) {
            var txt = "";
            for (var i = 0, len = items.length; i < len; i++) {
                txt += helperOptions.fn(isObserveList ? items.attr("" + i) : items[i], options);
            }
            return txt;
        }, getKeyComputeData = function(key, scope, isArgument) {
            var data = scope.computeData(key, {
                isArgument: isArgument,
                args: [ scope.attr("."), scope ]
            });
            can.compute.temporarilyBind(data.compute);
            return data;
        }, getKeyArgValue = function(key, scope) {
            var data = getKeyComputeData(key, scope, true);
            if (!data.compute.hasDependencies) {
                return data.initialValue;
            } else {
                return data.compute;
            }
        }, convertToScopes = function(helperOptions, scope, options, nodeList, truthyRenderer, falseyRenderer) {
            if (truthyRenderer) {
                helperOptions.fn = makeRendererConvertScopes(truthyRenderer, scope, options, nodeList);
            }
            if (falseyRenderer) {
                helperOptions.inverse = makeRendererConvertScopes(falseyRenderer, scope, options, nodeList);
            }
        }, makeRendererConvertScopes = function(renderer, parentScope, parentOptions, nodeList) {
            var rendererWithScope = function(ctx, opts, parentNodeList) {
                return renderer(ctx || parentScope, opts, parentNodeList);
            };
            return function(newScope, newOptions, parentNodeList) {
                var reads = can.__clearReading();
                if (newScope !== undefined && !(newScope instanceof can.view.Scope)) {
                    newScope = parentScope.add(newScope);
                }
                if (newOptions !== undefined && !(newOptions instanceof core.Options)) {
                    newOptions = parentOptions.add(newOptions);
                }
                var result = rendererWithScope(newScope, newOptions || parentOptions, parentNodeList || nodeList);
                can.__setReading(reads);
                return result;
            };
        };
        var core = {
            expressionData: function(expression) {
                var args = [], hashes = {}, i = 0;
                (can.trim(expression) + " ").replace(argumentsRegExp, function(whole, arg) {
                    var m;
                    if (i && (m = arg.match(literalNumberStringBooleanRegExp))) {
                        if (m[1] || m[2]) {
                            args.push(utils.jsonParse(m[1] || m[2]));
                        } else {
                            hashes[m[3]] = m[6] ? {
                                get: m[6]
                            } : utils.jsonParse(m[4] || m[5]);
                        }
                    } else {
                        args.push({
                            get: arg
                        });
                    }
                    i++;
                });
                return {
                    name: args.shift(),
                    args: args,
                    hash: hashes
                };
            },
            makeEvaluator: function(scope, options, nodeList, mode, exprData, truthyRenderer, falseyRenderer, stringOnly) {
                var args = [], hash = {}, helperOptions = {
                    fn: function() {},
                    inverse: function() {}
                }, context = scope.attr("."), name = exprData.name, helper, looksLikeAHelper = exprData.args.length || !can.isEmptyObject(exprData.hash), initialValue;
                for (var i = 0, len = exprData.args.length; i < len; i++) {
                    var arg = exprData.args[i];
                    if (arg && isLookup(arg)) {
                        args.push(getKeyArgValue(arg.get, scope, true));
                    } else {
                        args.push(arg);
                    }
                }
                for (var prop in exprData.hash) {
                    if (isLookup(exprData.hash[prop])) {
                        hash[prop] = getKeyArgValue(exprData.hash[prop].get, scope);
                    } else {
                        hash[prop] = exprData.hash[prop];
                    }
                }
                if (isLookup(name)) {
                    if (looksLikeAHelper) {
                        helper = mustacheHelpers.getHelper(name.get, options);
                        if (!helper && typeof context[name.get] === "function") {
                            helper = {
                                fn: context[name.get]
                            };
                        }
                    }
                    if (!helper) {
                        var get = name.get;
                        var computeData = getKeyComputeData(name.get, scope, false), compute = computeData.compute;
                        initialValue = computeData.initialValue;
                        if (computeData.reads && computeData.reads.length === 1 && computeData.root instanceof can.Map && !can.isFunction(computeData.root[computeData.reads[0]])) {
                            compute = can.compute(computeData.root, computeData.reads[0]);
                        }
                        if (computeData.compute.hasDependencies) {
                            name = compute;
                        } else {
                            name = initialValue;
                        }
                        if (!looksLikeAHelper && initialValue === undefined) {
                            helper = mustacheHelpers.getHelper(get, options);
                        } else if (typeof initialValue === "function") {
                            helper = {
                                fn: initialValue
                            };
                        }
                    }
                }
                if (mode === "^") {
                    var temp = truthyRenderer;
                    truthyRenderer = falseyRenderer;
                    falseyRenderer = temp;
                }
                if (helper) {
                    convertToScopes(helperOptions, scope, options, nodeList, truthyRenderer, falseyRenderer);
                    can.simpleExtend(helperOptions, {
                        context: context,
                        scope: scope,
                        contexts: scope,
                        hash: hash,
                        nodeList: nodeList
                    });
                    args.push(helperOptions);
                    return function() {
                        return helper.fn.apply(context, args) || "";
                    };
                }
                if (!mode) {
                    if (name && name.isComputed) {
                        return name;
                    } else {
                        return function() {
                            return "" + (name != null ? name : "");
                        };
                    }
                } else if (mode === "#" || mode === "^") {
                    convertToScopes(helperOptions, scope, options, nodeList, truthyRenderer, falseyRenderer);
                    return function() {
                        var value;
                        if (can.isFunction(name) && name.isComputed) {
                            value = name();
                        } else {
                            value = name;
                        }
                        if (utils.isArrayLike(value)) {
                            var isObserveList = utils.isObserveLike(value);
                            if (isObserveList ? value.attr("length") : value.length) {
                                return (stringOnly ? getItemsStringContent : getItemsFragContent)(value, isObserveList, helperOptions, options);
                            } else {
                                return helperOptions.inverse(scope, options);
                            }
                        } else {
                            return value ? helperOptions.fn(value || scope, options) : helperOptions.inverse(scope, options);
                        }
                    };
                } else {}
            },
            makeLiveBindingPartialRenderer: function(partialName, state) {
                partialName = can.trim(partialName);
                return function(scope, options, parentSectionNodeList) {
                    var partial = options.attr("partials." + partialName), res;
                    if (partial) {
                        res = partial.render ? partial.render(scope, options) : partial(scope, options);
                    } else {
                        res = can.view.render(partialName, scope, options);
                    }
                    res = can.frag(res);
                    var nodeList = [ this ];
                    nodeLists.register(nodeList, null, state.directlyNested ? parentSectionNodeList || true : true);
                    nodeLists.update(nodeList, res.childNodes);
                    elements.replace([ this ], res);
                };
            },
            makeStringBranchRenderer: function(mode, expression) {
                var exprData = expressionData(expression), fullExpression = mode + expression;
                return function branchRenderer(scope, options, truthyRenderer, falseyRenderer) {
                    var evaluator = scope.__cache[fullExpression];
                    if (mode || !evaluator) {
                        evaluator = makeEvaluator(scope, options, null, mode, exprData, truthyRenderer, falseyRenderer, true);
                        if (!mode) {
                            scope.__cache[fullExpression] = evaluator;
                        }
                    }
                    var res = evaluator();
                    return res == null ? "" : "" + res;
                };
            },
            makeLiveBindingBranchRenderer: function(mode, expression, state) {
                var exprData = expressionData(expression);
                return function branchRenderer(scope, options, parentSectionNodeList, truthyRenderer, falseyRenderer) {
                    var nodeList = [ this ];
                    nodeList.expression = expression;
                    nodeLists.register(nodeList, null, state.directlyNested ? parentSectionNodeList || true : true);
                    var evaluator = makeEvaluator(scope, options, nodeList, mode, exprData, truthyRenderer, falseyRenderer, state.tag);
                    var compute = can.compute(evaluator, null, false, true);
                    compute.bind("change", can.k);
                    var value = compute();
                    if (typeof value === "function") {
                        var old = can.__clearReading();
                        value(this);
                        can.__setReading(old);
                    } else if (compute.hasDependencies) {
                        if (state.attr) {
                            live.simpleAttribute(this, state.attr, compute);
                        } else if (state.tag) {
                            live.attributes(this, compute);
                        } else if (state.text && typeof value !== "object") {
                            live.text(this, compute, this.parentNode, nodeList);
                        } else {
                            live.html(this, compute, this.parentNode, nodeList);
                        }
                    } else {
                        if (state.attr) {
                            can.attr.set(this, state.attr, value);
                        } else if (state.tag) {
                            live.setAttributes(this, value);
                        } else if (state.text && typeof value === "string") {
                            this.nodeValue = value;
                        } else if (value) {
                            elements.replace([ this ], can.frag(value));
                        }
                    }
                    compute.unbind("change", can.k);
                };
            },
            splitModeFromExpression: function(expression, state) {
                expression = can.trim(expression);
                var mode = expression.charAt(0);
                if ("#/{&^>!".indexOf(mode) >= 0) {
                    expression = can.trim(expression.substr(1));
                } else {
                    mode = null;
                }
                if (mode === "{" && state.node) {
                    mode = null;
                }
                return {
                    mode: mode,
                    expression: expression
                };
            },
            cleanLineEndings: function(template) {
                return template.replace(mustacheLineBreakRegExp, function(whole, returnBefore, spaceBefore, special, expression, spaceAfter, returnAfter, spaceLessSpecial, spaceLessExpression, matchIndex) {
                    spaceAfter = spaceAfter || "";
                    returnBefore = returnBefore || "";
                    spaceBefore = spaceBefore || "";
                    var modeAndExpression = splitModeFromExpression(expression || spaceLessExpression, {});
                    if (spaceLessSpecial || ">{".indexOf(modeAndExpression.mode) >= 0) {
                        return whole;
                    } else if ("^#!/".indexOf(modeAndExpression.mode) >= 0) {
                        return special + (matchIndex !== 0 && returnAfter.length ? returnBefore + "\n" : "");
                    } else {
                        return spaceBefore + special + spaceAfter + (spaceBefore.length || matchIndex !== 0 ? returnBefore + "\n" : "");
                    }
                });
            },
            Options: can.view.Scope.extend({
                init: function(data, parent) {
                    if (!data.helpers && !data.partials && !data.tags) {
                        data = {
                            helpers: data
                        };
                    }
                    can.view.Scope.prototype.init.apply(this, arguments);
                }
            })
        };
        var makeEvaluator = core.makeEvaluator, expressionData = core.expressionData, splitModeFromExpression = core.splitModeFromExpression;
        return core;
    }(__m2, __m36, __m38, __m26, __m24, __m22, __m27);
    var __m35 = function(can, target, utils, mustacheCore) {
        var decodeHTML = function() {
            var el = document.createElement("div");
            return function(html) {
                if (html.indexOf("&") === -1) {
                    return html.replace(/\r\n/g, "\n");
                }
                el.innerHTML = html;
                return el.childNodes.length === 0 ? "" : el.childNodes[0].nodeValue;
            };
        }();
        var HTMLSectionBuilder = function() {
            this.stack = [ new HTMLSection() ];
        };
        can.extend(HTMLSectionBuilder.prototype, utils.mixins);
        can.extend(HTMLSectionBuilder.prototype, {
            startSubSection: function(process) {
                var newSection = new HTMLSection(process);
                this.stack.push(newSection);
                return newSection;
            },
            endSubSectionAndReturnRenderer: function() {
                if (this.last().isEmpty()) {
                    this.stack.pop();
                    return null;
                } else {
                    var htmlSection = this.endSection();
                    return can.proxy(htmlSection.compiled.hydrate, htmlSection.compiled);
                }
            },
            startSection: function(process) {
                var newSection = new HTMLSection(process);
                this.last().add(newSection.targetCallback);
                this.stack.push(newSection);
            },
            endSection: function() {
                this.last().compile();
                return this.stack.pop();
            },
            inverse: function() {
                this.last().inverse();
            },
            compile: function() {
                var compiled = this.stack.pop().compile();
                return function(scope, options) {
                    if (!(scope instanceof can.view.Scope)) {
                        scope = new can.view.Scope(scope || {});
                    }
                    if (!(options instanceof mustacheCore.Options)) {
                        options = new mustacheCore.Options(options || {});
                    }
                    return compiled.hydrate(scope, options);
                };
            },
            push: function(chars) {
                this.last().push(chars);
            },
            pop: function() {
                return this.last().pop();
            }
        });
        var HTMLSection = function(process) {
            this.data = "targetData";
            this.targetData = [];
            this.targetStack = [];
            var self = this;
            this.targetCallback = function(scope, options, sectionNode) {
                process.call(this, scope, options, sectionNode, can.proxy(self.compiled.hydrate, self.compiled), self.inverseCompiled && can.proxy(self.inverseCompiled.hydrate, self.inverseCompiled));
            };
        };
        can.extend(HTMLSection.prototype, {
            inverse: function() {
                this.inverseData = [];
                this.data = "inverseData";
            },
            push: function(data) {
                this.add(data);
                this.targetStack.push(data);
            },
            pop: function() {
                return this.targetStack.pop();
            },
            add: function(data) {
                if (typeof data === "string") {
                    data = decodeHTML(data);
                }
                if (this.targetStack.length) {
                    this.targetStack[this.targetStack.length - 1].children.push(data);
                } else {
                    this[this.data].push(data);
                }
            },
            compile: function() {
                this.compiled = target(this.targetData);
                if (this.inverseData) {
                    this.inverseCompiled = target(this.inverseData);
                    delete this.inverseData;
                }
                delete this.targetData;
                delete this.targetStack;
                return this.compiled;
            },
            children: function() {
                if (this.targetStack.length) {
                    return this.targetStack[this.targetStack.length - 1].children;
                } else {
                    return this[this.data];
                }
            },
            isEmpty: function() {
                return !this.targetData.length;
            }
        });
        return HTMLSectionBuilder;
    }(__m2, __m34, __m36, __m37);
    var __m39 = function(can, live, utils) {
        live = live || can.view.live;
        var TextSectionBuilder = function() {
            this.stack = [ new TextSection() ];
        }, emptyHandler = function() {};
        can.extend(TextSectionBuilder.prototype, utils.mixins);
        can.extend(TextSectionBuilder.prototype, {
            startSection: function(process) {
                var subSection = new TextSection();
                this.last().add({
                    process: process,
                    truthy: subSection
                });
                this.stack.push(subSection);
            },
            endSection: function() {
                this.stack.pop();
            },
            inverse: function() {
                this.stack.pop();
                var falseySection = new TextSection();
                this.last().last().falsey = falseySection;
                this.stack.push(falseySection);
            },
            compile: function(state) {
                var renderer = this.stack[0].compile();
                return function(scope, options) {
                    var compute = can.compute(function() {
                        return renderer(scope, options);
                    }, this, false, true);
                    compute.bind("change", emptyHandler);
                    var value = compute();
                    if (compute.hasDependencies) {
                        if (state.attr) {
                            live.simpleAttribute(this, state.attr, compute);
                        } else {
                            live.attributes(this, compute);
                        }
                        compute.unbind("change", emptyHandler);
                    } else {
                        if (state.attr) {
                            can.attr.set(this, state.attr, value);
                        } else {
                            live.setAttributes(this, value);
                        }
                    }
                };
            }
        });
        var passTruthyFalsey = function(process, truthy, falsey) {
            return function(scope, options) {
                return process.call(this, scope, options, truthy, falsey);
            };
        };
        var TextSection = function() {
            this.values = [];
        };
        can.extend(TextSection.prototype, {
            add: function(data) {
                this.values.push(data);
            },
            last: function() {
                return this.values[this.values.length - 1];
            },
            compile: function() {
                var values = this.values, len = values.length;
                for (var i = 0; i < len; i++) {
                    var value = this.values[i];
                    if (typeof value === "object") {
                        values[i] = passTruthyFalsey(value.process, value.truthy && value.truthy.compile(), value.falsey && value.falsey.compile());
                    }
                }
                return function(scope, options) {
                    var txt = "", value;
                    for (var i = 0; i < len; i++) {
                        value = values[i];
                        txt += typeof value === "string" ? value : value.call(this, scope, options);
                    }
                    return txt;
                };
            }
        });
        return TextSectionBuilder;
    }(__m2, __m26, __m36);
    var __m33 = function(can, parser, target, HTMLSectionBuilder, TextSectionBuilder, mustacheCore, mustacheHelpers, viewCallbacks) {
        parser = parser || can.view.parser;
        viewCallbacks = viewCallbacks || can.view.callbacks;
        function stache(template) {
            template = mustacheCore.cleanLineEndings(template);
            var section = new HTMLSectionBuilder(), state = {
                node: null,
                attr: null,
                sectionElementStack: [],
                text: false
            }, makeRendererAndUpdateSection = function(section, mode, stache) {
                if (mode === ">") {
                    section.add(mustacheCore.makeLiveBindingPartialRenderer(stache, state));
                } else if (mode === "/") {
                    section.endSection();
                    if (section instanceof HTMLSectionBuilder) {
                        state.sectionElementStack.pop();
                    }
                } else if (mode === "else") {
                    section.inverse();
                } else {
                    var makeRenderer = section instanceof HTMLSectionBuilder ? mustacheCore.makeLiveBindingBranchRenderer : mustacheCore.makeStringBranchRenderer;
                    if (mode === "{" || mode === "&") {
                        section.add(makeRenderer(null, stache, copyState()));
                    } else if (mode === "#" || mode === "^") {
                        section.startSection(makeRenderer(mode, stache, copyState()));
                        if (section instanceof HTMLSectionBuilder) {
                            state.sectionElementStack.push("section");
                        }
                    } else {
                        section.add(makeRenderer(null, stache, copyState({
                            text: true
                        })));
                    }
                }
            }, copyState = function(overwrites) {
                var cur = {
                    tag: state.node && state.node.tag,
                    attr: state.attr && state.attr.name,
                    directlyNested: state.sectionElementStack[state.sectionElementStack.length - 1] === "section"
                };
                return overwrites ? can.simpleExtend(cur, overwrites) : cur;
            }, addAttributesCallback = function(node, callback) {
                if (!node.attributes) {
                    node.attributes = [];
                }
                node.attributes.push(callback);
            };
            parser(template, {
                start: function(tagName, unary) {
                    state.node = {
                        tag: tagName,
                        children: []
                    };
                },
                end: function(tagName, unary) {
                    var isCustomTag = viewCallbacks.tag(tagName);
                    if (unary) {
                        section.add(state.node);
                        if (isCustomTag) {
                            addAttributesCallback(state.node, function(scope, options) {
                                viewCallbacks.tagHandler(this, tagName, {
                                    scope: scope,
                                    options: options,
                                    subtemplate: null,
                                    templateType: "stache"
                                });
                            });
                        }
                    } else {
                        section.push(state.node);
                        state.sectionElementStack.push("element");
                        if (isCustomTag) {
                            section.startSubSection();
                        }
                    }
                    state.node = null;
                },
                close: function(tagName) {
                    var isCustomTag = viewCallbacks.tag(tagName), renderer;
                    if (isCustomTag) {
                        renderer = section.endSubSectionAndReturnRenderer();
                    }
                    var oldNode = section.pop();
                    if (isCustomTag) {
                        addAttributesCallback(oldNode, function(scope, options) {
                            viewCallbacks.tagHandler(this, tagName, {
                                scope: scope,
                                options: options,
                                subtemplate: renderer,
                                templateType: "stache"
                            });
                        });
                    }
                    state.sectionElementStack.pop();
                },
                attrStart: function(attrName) {
                    if (state.node.section) {
                        state.node.section.add(attrName + '="');
                    } else {
                        state.attr = {
                            name: attrName,
                            value: ""
                        };
                    }
                },
                attrEnd: function(attrName) {
                    if (state.node.section) {
                        state.node.section.add('" ');
                    } else {
                        if (!state.node.attrs) {
                            state.node.attrs = {};
                        }
                        state.node.attrs[state.attr.name] = state.attr.section ? state.attr.section.compile(copyState()) : state.attr.value;
                        var attrCallback = viewCallbacks.attr(attrName);
                        if (attrCallback) {
                            if (!state.node.attributes) {
                                state.node.attributes = [];
                            }
                            state.node.attributes.push(function(scope, options) {
                                attrCallback(this, {
                                    attributeName: attrName,
                                    scope: scope,
                                    options: options
                                });
                            });
                        }
                        state.attr = null;
                    }
                },
                attrValue: function(value) {
                    var section = state.node.section || state.attr.section;
                    if (section) {
                        section.add(value);
                    } else {
                        state.attr.value += value;
                    }
                },
                chars: function(text) {
                    section.add(text);
                },
                special: function(text) {
                    var firstAndText = mustacheCore.splitModeFromExpression(text, state), mode = firstAndText.mode, expression = firstAndText.expression;
                    if (expression === "else") {
                        (state.attr && state.attr.section ? state.attr.section : section).inverse();
                        return;
                    }
                    if (mode === "!") {
                        return;
                    }
                    if (state.node && state.node.section) {
                        makeRendererAndUpdateSection(state.node.section, mode, expression);
                        if (state.node.section.subSectionDepth() === 0) {
                            state.node.attributes.push(state.node.section.compile(copyState()));
                            delete state.node.section;
                        }
                    } else if (state.attr) {
                        if (!state.attr.section) {
                            state.attr.section = new TextSectionBuilder();
                            if (state.attr.value) {
                                state.attr.section.add(state.attr.value);
                            }
                        }
                        makeRendererAndUpdateSection(state.attr.section, mode, expression);
                    } else if (state.node) {
                        if (!state.node.attributes) {
                            state.node.attributes = [];
                        }
                        if (!mode) {
                            state.node.attributes.push(mustacheCore.makeLiveBindingBranchRenderer(null, expression, copyState()));
                        } else if (mode === "#" || mode === "^") {
                            if (!state.node.section) {
                                state.node.section = new TextSectionBuilder();
                            }
                            makeRendererAndUpdateSection(state.node.section, mode, expression);
                        } else {
                            throw mode + " is currently not supported within a tag.";
                        }
                    } else {
                        makeRendererAndUpdateSection(section, mode, expression);
                    }
                },
                comment: function(text) {
                    section.add({
                        comment: text
                    });
                },
                done: function() {}
            });
            return section.compile();
        }
        var escMap = {
            "\n": "\\n",
            "\r": "\\r",
            "\u2028": "\\u2028",
            "\u2029": "\\u2029"
        };
        var esc = function(string) {
            return ("" + string).replace(/["'\\\n\r\u2028\u2029]/g, function(character) {
                if ("'\"\\".indexOf(character) >= 0) {
                    return "\\" + character;
                } else {
                    return escMap[character];
                }
            });
        };
        can.view.register({
            suffix: "stache",
            contentType: "x-stache-template",
            fragRenderer: function(id, text) {
                return stache(text);
            },
            script: function(id, src) {
                return 'can.stache("' + esc(src) + '")';
            }
        });
        can.view.ext = ".stache";
        can.extend(can.stache, mustacheHelpers);
        can.extend(stache, mustacheHelpers);
        can.stache.safeString = stache.safeString = function(text) {
            return {
                toString: function() {
                    return text;
                }
            };
        };
        return stache;
    }(__m2, __m28, __m34, __m35, __m39, __m37, __m38, __m9);
    var __m40 = function(can, Construct) {
        var isFunction = can.isFunction, fnTest = /xyz/.test(function() {
            return this.xyz;
        }) ? /\b_super\b/ : /.*/, getset = [ "get", "set" ], getSuper = function(base, name, fn) {
            return function() {
                var tmp = this._super, ret;
                this._super = base[name];
                ret = fn.apply(this, arguments);
                this._super = tmp;
                return ret;
            };
        };
        can.Construct._defineProperty = function(addTo, base, name, descriptor) {
            var _super = Object.getOwnPropertyDescriptor(base, name);
            if (_super) {
                can.each(getset, function(method) {
                    if (isFunction(_super[method]) && isFunction(descriptor[method])) {
                        descriptor[method] = getSuper(_super, method, descriptor[method]);
                    } else if (!isFunction(descriptor[method])) {
                        descriptor[method] = _super[method];
                    }
                });
            }
            Object.defineProperty(addTo, name, descriptor);
        };
        can.Construct._overwrite = function(addTo, base, name, val) {
            addTo[name] = isFunction(val) && isFunction(base[name]) && fnTest.test(val) ? getSuper(base, name, val) : val;
        };
        return can;
    }(__m2, __m12);
    var __m41 = function(can, Construct) {
        var isFunction = can.isFunction, isArray = can.isArray, makeArray = can.makeArray, proxy = function(funcs) {
            var args = makeArray(arguments), self;
            funcs = args.shift();
            if (!isArray(funcs)) {
                funcs = [ funcs ];
            }
            self = this;
            return function class_cb() {
                var cur = args.concat(makeArray(arguments)), isString, length = funcs.length, f = 0, func;
                for (;f < length; f++) {
                    func = funcs[f];
                    if (!func) {
                        continue;
                    }
                    isString = typeof func === "string";
                    cur = (isString ? self[func] : func).apply(self, cur || []);
                    if (f < length - 1) {
                        cur = !isArray(cur) || cur._use_call ? [ cur ] : cur;
                    }
                }
                return cur;
            };
        };
        can.Construct.proxy = can.Construct.prototype.proxy = proxy;
        var correctedClasses = [ can.Map, can.Control, can.Model ], i = 0;
        for (;i < correctedClasses.length; i++) {
            if (correctedClasses[i]) {
                correctedClasses[i].proxy = proxy;
            }
        }
        return can;
    }(__m2, __m12);
    var __m42 = function(can) {
        can.Map.helpers.define = function(Map) {
            var define = Map.prototype.define;
            Map.defaultGenerators = {};
            for (var prop in define) {
                if ("value" in define[prop]) {
                    if (typeof define[prop].value === "function") {
                        Map.defaultGenerators[prop] = define[prop].value;
                    } else {
                        Map.defaults[prop] = define[prop].value;
                    }
                }
                if (typeof define[prop].Value === "function") {
                    (function(Constructor) {
                        Map.defaultGenerators[prop] = function() {
                            return new Constructor();
                        };
                    })(define[prop].Value);
                }
            }
        };
        var oldSetupDefaults = can.Map.prototype._setupDefaults;
        can.Map.prototype._setupDefaults = function(obj) {
            var defaults = oldSetupDefaults.call(this), propsCommittedToAttr = {}, Map = this.constructor, originalGet = this._get;
            this._get = function(originalProp) {
                prop = originalProp.indexOf(".") !== -1 ? originalProp.substr(0, originalProp.indexOf(".")) : prop;
                if (prop in defaults && !(prop in propsCommittedToAttr)) {
                    this.attr(prop, defaults[prop]);
                    propsCommittedToAttr[prop] = true;
                }
                return originalGet.apply(this, arguments);
            };
            for (var prop in Map.defaultGenerators) {
                if (!obj || !(prop in obj)) {
                    defaults[prop] = Map.defaultGenerators[prop].call(this);
                }
            }
            this._get = originalGet;
            return defaults;
        };
        var proto = can.Map.prototype, oldSet = proto.__set;
        proto.__set = function(prop, value, current, success, error) {
            var errorCallback = function(errors) {
                var stub = error && error.call(self, errors);
                if (stub !== false) {
                    can.trigger(self, "error", [ prop, errors ], true);
                }
                return false;
            }, self = this, define = this.define && this.define[prop], setter = define && define.set, getter = define && define.get;
            if (setter) {
                can.batch.start();
                var setterCalled = false, setValue = setter.call(this, value, function(value) {
                    oldSet.call(self, prop, value, current, success, errorCallback);
                    setterCalled = true;
                }, errorCallback);
                if (getter) {
                    can.batch.stop();
                    return;
                } else if (setValue === undefined && !setterCalled && setter.length >= 2) {
                    can.batch.stop();
                    return;
                } else {
                    if (!setterCalled) {
                        oldSet.call(self, prop, setter.length === 0 && setValue === undefined ? value : setValue, current, success, errorCallback);
                    }
                    can.batch.stop();
                    return this;
                }
            } else {
                oldSet.call(self, prop, value, current, success, errorCallback);
            }
            return this;
        };
        var converters = {
            date: function(str) {
                var type = typeof str;
                if (type === "string") {
                    str = Date.parse(str);
                    return isNaN(str) ? null : new Date(str);
                } else if (type === "number") {
                    return new Date(str);
                } else {
                    return str;
                }
            },
            number: function(val) {
                return +val;
            },
            "boolean": function(val) {
                if (val === "false" || val === "0" || !val) {
                    return false;
                }
                return true;
            },
            "*": function(val) {
                return val;
            },
            string: function(val) {
                return "" + val;
            }
        };
        var oldType = proto.__type;
        proto.__type = function(value, prop) {
            var def = this.define && this.define[prop], type = def && def.type, Type = def && def.Type, newValue = value;
            if (typeof type === "string") {
                type = converters[type];
            }
            if (type || Type) {
                if (type) {
                    newValue = type.call(this, newValue, prop);
                }
                if (Type && !(newValue instanceof Type)) {
                    newValue = new Type(newValue);
                }
                return newValue;
            }
            return oldType.call(this, newValue, prop);
        };
        var oldRemove = proto._remove;
        proto._remove = function(prop, current) {
            var remove = this.define && this.define[prop] && this.define[prop].remove, res;
            if (remove) {
                can.batch.start();
                res = remove.call(this, current);
                if (res === false) {
                    can.batch.stop();
                    return;
                } else {
                    res = oldRemove.call(this, prop, current);
                    can.batch.stop();
                    return res;
                }
            }
            return oldRemove.call(this, prop, current);
        };
        var oldSetupComputes = proto._setupComputes;
        proto._setupComputes = function(defaultsValues) {
            oldSetupComputes.apply(this, arguments);
            for (var attr in this.define) {
                var def = this.define[attr], get = def.get;
                if (get) {
                    this[attr] = can.compute.async(defaultsValues[attr], get, this);
                    this._computedBindings[attr] = {
                        count: 0
                    };
                }
            }
        };
        var oldSingleSerialize = can.Map.helpers._serialize;
        can.Map.helpers._serialize = function(map, name, val) {
            return serializeProp(map, name, val);
        };
        var serializeProp = function(map, attr, val) {
            var serializer = map.define && map.define[attr] && map.define[attr].serialize;
            if (serializer === undefined) {
                return oldSingleSerialize.apply(this, arguments);
            } else if (serializer !== false) {
                return typeof serializer === "function" ? serializer.call(map, val, attr) : oldSingleSerialize.apply(this, arguments);
            }
        };
        var oldSerialize = proto.serialize;
        proto.serialize = function(property) {
            var serialized = oldSerialize.apply(this, arguments);
            if (property) {
                return serialized;
            }
            var serializer, val;
            for (var attr in this.define) {
                if (!(attr in serialized)) {
                    serializer = this.define && this.define[attr] && this.define[attr].serialize;
                    if (serializer) {
                        val = serializeProp(this, attr, this.attr(attr));
                        if (val !== undefined) {
                            serialized[attr] = val;
                        }
                    }
                }
            }
            return serialized;
        };
        return can.Map;
    }(__m2, __m14);
    var __m43 = function($, can) {
        var convert, modify, isTemplate, isHTML, isDOM, getCallback, noHookup = {
            val: true,
            text: true
        };
        convert = function(func_name) {
            var old = $.fn[func_name];
            $.fn[func_name] = function() {
                var args = can.makeArray(arguments), callbackNum, callback, self = this, result;
                if (can.isDeferred(args[0])) {
                    args[0].done(function(res) {
                        modify.call(self, [ res ], old);
                    });
                    return this;
                } else if (isTemplate(args)) {
                    if (callbackNum = getCallback(args)) {
                        callback = args[callbackNum];
                        args[callbackNum] = function(result) {
                            modify.call(self, [ result ], old);
                            callback.call(self, result);
                        };
                        can.view.apply(can.view, args);
                        return this;
                    }
                    result = can.view.apply(can.view, args);
                    if (!can.isDeferred(result)) {
                        args = [ result ];
                    } else {
                        result.done(function(res) {
                            modify.call(self, [ res ], old);
                        });
                        return this;
                    }
                }
                return noHookup[func_name] ? old.apply(this, args) : modify.call(this, args, old);
            };
        };
        modify = function(args, old) {
            var res;
            for (var hasHookups in can.view.hookups) {
                break;
            }
            if (hasHookups && args[0] && isHTML(args[0])) {
                args[0] = can.view.frag(args[0]).childNodes;
            }
            res = old.apply(this, args);
            return res;
        };
        isTemplate = function(args) {
            var secArgType = typeof args[1];
            return typeof args[0] === "string" && (secArgType === "object" || secArgType === "function") && !isDOM(args[1]);
        };
        isDOM = function(arg) {
            return arg.nodeType || arg[0] && arg[0].nodeType;
        };
        isHTML = function(arg) {
            if (isDOM(arg)) {
                return true;
            } else if (typeof arg === "string") {
                arg = can.trim(arg);
                return arg.substr(0, 1) === "<" && arg.substr(arg.length - 1, 1) === ">" && arg.length >= 3;
            } else {
                return false;
            }
        };
        getCallback = function(args) {
            return typeof args[3] === "function" ? 3 : typeof args[2] === "function" && 2;
        };
        $.fn.hookup = function() {
            can.view.frag(this);
            return this;
        };
        can.each([ "prepend", "append", "after", "before", "text", "html", "replaceWith", "val" ], function(func) {
            convert(func);
        });
        return can;
    }(jQuery, __m2, __m10);
    var __m44 = function(can) {
        var isArray = can.isArray;
        can.Object = {};
        var same = can.Object.same = function(a, b, compares, aParent, bParent, deep) {
            var aType = typeof a, aArray = isArray(a), comparesType = typeof compares, compare;
            if (comparesType === "string" || compares === null) {
                compares = compareMethods[compares];
                comparesType = "function";
            }
            if (comparesType === "function") {
                return compares(a, b, aParent, bParent);
            }
            compares = compares || {};
            if (a === null || b === null) {
                return a === b;
            }
            if (a instanceof Date || b instanceof Date) {
                return a === b;
            }
            if (deep === -1) {
                return aType === "object" || a === b;
            }
            if (aType !== typeof b || aArray !== isArray(b)) {
                return false;
            }
            if (a === b) {
                return true;
            }
            if (aArray) {
                if (a.length !== b.length) {
                    return false;
                }
                for (var i = 0; i < a.length; i++) {
                    compare = compares[i] === undefined ? compares["*"] : compares[i];
                    if (!same(a[i], b[i], a, b, compare)) {
                        return false;
                    }
                }
                return true;
            } else if (aType === "object" || aType === "function") {
                var bCopy = can.extend({}, b);
                for (var prop in a) {
                    compare = compares[prop] === undefined ? compares["*"] : compares[prop];
                    if (!same(a[prop], b[prop], compare, a, b, deep === false ? -1 : undefined)) {
                        return false;
                    }
                    delete bCopy[prop];
                }
                for (prop in bCopy) {
                    if (compares[prop] === undefined || !same(undefined, b[prop], compares[prop], a, b, deep === false ? -1 : undefined)) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        };
        can.Object.subsets = function(checkSet, sets, compares) {
            var len = sets.length, subsets = [];
            for (var i = 0; i < len; i++) {
                var set = sets[i];
                if (can.Object.subset(checkSet, set, compares)) {
                    subsets.push(set);
                }
            }
            return subsets;
        };
        can.Object.subset = function(subset, set, compares) {
            compares = compares || {};
            for (var prop in set) {
                if (!same(subset[prop], set[prop], compares[prop], subset, set)) {
                    return false;
                }
            }
            return true;
        };
        var compareMethods = {
            "null": function() {
                return true;
            },
            i: function(a, b) {
                return ("" + a).toLowerCase() === ("" + b).toLowerCase();
            },
            eq: function(a, b) {
                return a === b;
            },
            similar: function(a, b) {
                return a == b;
            }
        };
        compareMethods.eqeq = compareMethods.similar;
        return can.Object;
    }(__m2);
    window["can"] = __m4;
})();

(function(undefined) {
    var __m1 = function(can) {
        var validate = function(attrNames, options, proc) {
            if (!proc) {
                proc = options;
                options = {};
            }
            options = options || {};
            attrNames = typeof attrNames === "string" ? [ attrNames ] : can.makeArray(attrNames);
            if (options.testIf && !options.testIf.call(this)) {
                return;
            }
            var self = this;
            can.each(attrNames, function(attrName) {
                if (!self.validations[attrName]) {
                    self.validations[attrName] = [];
                }
                self.validations[attrName].push(function(newVal) {
                    var res = proc.call(this, newVal, attrName);
                    return res === undefined ? undefined : options.message || res;
                });
            });
        };
        var old = can.Map.prototype.__set;
        can.Map.prototype.__set = function(prop, value, current, success, error) {
            var self = this, validations = self.constructor.validations, errorCallback = function(errors) {
                var stub = error && error.call(self, errors);
                if (stub !== false) {
                    can.trigger(self, "error", [ prop, errors ], true);
                }
                return false;
            };
            old.call(self, prop, value, current, success, errorCallback);
            if (validations && validations[prop]) {
                var errors = self.errors(prop);
                if (errors) {
                    errorCallback(errors);
                }
            }
            return this;
        };
        can.each([ can.Map, can.Model ], function(clss) {
            if (clss === undefined) {
                return;
            }
            var oldSetup = clss.setup;
            can.extend(clss, {
                setup: function(superClass) {
                    oldSetup.apply(this, arguments);
                    if (!this.validations || superClass.validations === this.validations) {
                        this.validations = {};
                    }
                },
                validate: validate,
                validationMessages: {
                    format: "is invalid",
                    inclusion: "is not a valid option (perhaps out of range)",
                    lengthShort: "is too short",
                    lengthLong: "is too long",
                    presence: "can't be empty",
                    range: "is out of range",
                    numericality: "must be a number"
                },
                validateFormatOf: function(attrNames, regexp, options) {
                    validate.call(this, attrNames, options, function(value) {
                        if (typeof value !== "undefined" && value !== null && value !== "" && String(value).match(regexp) === null) {
                            return this.constructor.validationMessages.format;
                        }
                    });
                },
                validateInclusionOf: function(attrNames, inArray, options) {
                    validate.call(this, attrNames, options, function(value) {
                        if (typeof value === "undefined") {
                            return;
                        }
                        for (var i = 0; i < inArray.length; i++) {
                            if (inArray[i] === value) {
                                return;
                            }
                        }
                        return this.constructor.validationMessages.inclusion;
                    });
                },
                validateLengthOf: function(attrNames, min, max, options) {
                    validate.call(this, attrNames, options, function(value) {
                        if ((typeof value === "undefined" || value === null) && min > 0 || typeof value !== "undefined" && value !== null && value.length < min) {
                            return this.constructor.validationMessages.lengthShort + " (min=" + min + ")";
                        } else if (typeof value !== "undefined" && value !== null && value.length > max) {
                            return this.constructor.validationMessages.lengthLong + " (max=" + max + ")";
                        }
                    });
                },
                validatePresenceOf: function(attrNames, options) {
                    validate.call(this, attrNames, options, function(value) {
                        if (typeof value === "undefined" || value === "" || value === null) {
                            return this.constructor.validationMessages.presence;
                        }
                    });
                },
                validateRangeOf: function(attrNames, low, hi, options) {
                    validate.call(this, attrNames, options, function(value) {
                        if ((typeof value === "undefined" || value === null) && low > 0 || typeof value !== "undefined" && value !== null && (value < low || value > hi)) {
                            return this.constructor.validationMessages.range + " [" + low + "," + hi + "]";
                        }
                    });
                },
                validatesNumericalityOf: function(attrNames) {
                    validate.call(this, attrNames, function(value) {
                        var res = !isNaN(parseFloat(value)) && isFinite(value);
                        if (!res) {
                            return this.constructor.validationMessages.numericality;
                        }
                    });
                }
            });
        });
        can.extend(can.Map.prototype, {
            errors: function(attrs, newVal) {
                if (attrs) {
                    attrs = can.isArray(attrs) ? attrs : [ attrs ];
                }
                var errors = {}, self = this, addErrors = function(attr, funcs) {
                    can.each(funcs, function(func) {
                        var res = func.call(self, isTest ? self.__convert ? self.__convert(attr, newVal) : newVal : self.attr(attr));
                        if (res) {
                            if (!errors[attr]) {
                                errors[attr] = [];
                            }
                            errors[attr].push(res);
                        }
                    });
                }, validations = this.constructor.validations || {}, isTest = attrs && attrs.length === 1 && arguments.length === 2;
                can.each(attrs || validations, function(funcs, attr) {
                    if (typeof attr === "number") {
                        attr = funcs;
                        funcs = validations[attr];
                    }
                    addErrors(attr, funcs || []);
                });
                return can.isEmptyObject(errors) ? null : isTest ? errors[attrs[0]] : errors;
            }
        });
        return can.Map;
    }(window.can, undefined);
})();

window.usga = window.usga || {};

(function(usga, $) {
    var ua = window.navigator.userAgent.toLowerCase();
    var appName = window.navigator.appName;
    var checkIE = function() {
        var re;
        var rv = false;
        if (appName == "Microsoft Internet Explorer") {
            re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})", "i");
            if (!!re.exec(ua)) {
                rv = parseFloat(RegExp.$1);
            }
        } else if (appName == "Netscape") {
            re = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})", "i");
            if (!!re.exec(ua)) {
                rv = parseFloat(RegExp.$1);
            }
        }
        return rv;
    };
    var checkSafari = function() {
        return /^((?!chrome).)*safari/i.test(ua);
    };
    var isTouchAvailable = function() {
        var isAvailable = "ontouchstart" in window;
        if (window.navigator.msPointerEnabled) {
            isAvailable = navigator.msMaxTouchPoints > 0;
        }
        return isAvailable;
    };
    var getUrlHash = function() {
        return can.deparam(document.location.hash.substr(1));
    };
    var createUrlHash = function(params) {
        var hash = "#";
        if (usga.isObject(params)) {
            hash = hash.concat(can.param(params));
        }
        return hash;
    };
    var shortUrl = function(url, limit) {
        if (url) {
            var shortUrl = "" + url;
            limit = limit || 30;
            shortUrl = shortUrl.replace(/^(?:[^\:]+\:\/\/)*(.*)$/, "$1").replace(/(\/|#|\?)*$/, "");
            if (shortUrl.length > limit) {
                shortUrl = (shortUrl.substr(0, limit) + "...").replace(/(\?|#|\/)\.\.\./, "...");
            }
            return shortUrl;
        }
        return "";
    };
    var trimHostFromUrl = function(url) {
        if (url) {
            url = url.replace(/^(?:[^\:]+\:\/\/)*(.*)$/, "$1").replace(location.host, "").replace(/^\/+/, "/");
            return url;
        }
        return url;
    };
    $.extend(usga, {
        $: $,
        domReady: false,
        windowLoad: false,
        device: {
            ios: ua.match(/i(pod|pad|phone)/),
            android: ua.match(/android/),
            mobile: ua.search(/(i(pod|pad|phone)|android)/) !== -1
        },
        browser: {
            ie: checkIE(),
            safari: checkSafari()
        },
        supports: {
            touch: isTouchAvailable()
        },
        url: {
            query: can.deparam(document.location.search.substr(1)),
            getHash: getUrlHash,
            createHash: createUrlHash,
            "short": shortUrl,
            trimHost: trimHostFromUrl
        },
        setDtm: function(props) {
            window.digitalData = window.digitalData || {};
            window.digitalData = $.extend(true, window.digitalData, props);
        },
        trackDtm: function(event, props, onDtmTrack) {
            if (window._satellite) {
                this.setDtm(props);
                window._satellite.track(event);
                if ($.isFunction(onDtmTrack)) {
                    setTimeout(function() {
                        onDtmTrack(event, props, window.digitalData);
                    }, 1e3);
                }
            }
        },
        log: function() {
            var console = window.console;
            if (console && typeof console.log === "function") {
                console.log.apply(console, arguments);
            }
        },
        getArgs: function(args, start, count) {
            start = start || 0;
            var end = count ? start + count : args.length;
            return Array.prototype.slice.call(args, start, end);
        },
        cutText: function(text, len, appendix) {
            if (!text || text === null) {
                text = "";
            }
            text = "" + text;
            if (!len || isNaN(+len) || +len < 1) {
                len = 80;
            }
            if (appendix === undefined) {
                appendix = " ...";
            }
            if (text.length <= len) {
                return text;
            }
            var cutText = text.substr(0, len + 1), lastDelimIndex = cutText.lastIndexOf(" ");
            if (lastDelimIndex >= 0) {
                cutText = cutText.substr(0, lastDelimIndex);
            }
            if (cutText) {
                cutText += appendix;
            }
            return cutText;
        },
        quote: function(text) {
            return text.replace("\\", "\\\\").replace("'", "\\'");
        },
        stripTags: function(text) {
            if (false === (text && typeof text === "string")) {
                text = text ? "" + text : "";
            }
            return text.replace(/<[^>]+>/gi, "");
        },
        trimDamInUrl: function(url) {
            if (false === (url && typeof url === "string")) {
                url = url ? "" + url : "";
            }
            return url.replace(/^\/*content\/dam\/*/, "");
        },
        getMomentInNewYorkTimezone: function(strDate) {
            if (!strDate || typeof strDate !== "string" || !moment(strDate).isValid()) {
                return moment().tz("America/New_York");
            }
            return moment(new Date(strDate)).tz("America/New_York");
        },
        isObject: function(obj) {
            var type = typeof obj;
            return type === "function" || type === "object" && !!obj;
        },
        keys: function(obj) {
            if (!usga.isObject(obj)) {
                return [];
            }
            if (Object.keys) {
                return Object.keys(obj);
            }
            var keys = [];
            for (var key in obj) {
                if (usga.has(obj, key)) {
                    keys.push(key);
                }
            }
            return keys;
        },
        values: function(obj) {
            var keys = usga.keys(obj), length = keys.length, values = Array(length);
            for (var i = 0; i < length; i++) {
                values[i] = obj[keys[i]];
            }
            return values;
        },
        findWhere: function(items, properties) {
            var found = false;
            if (!usga.isObject(properties)) {
                properties = {};
            }
            if ($.isArray(items)) {
                $.each(items, function(index, item) {
                    var obj = item, result = true;
                    if (!usga.isObject(obj)) {
                        return true;
                    }
                    var keys = usga.keys(properties), length = keys.length;
                    for (var i = 0; i < length; i++) {
                        var key = keys[i].replace(/^\!/, ""), testKey = keys[i], negative = false;
                        if (testKey.substr(0, 1) === "!") {
                            negative = true;
                        }
                        if (negative) {
                            result = $.isArray(properties[testKey]) ? $.inArray(obj[key], properties[testKey]) === -1 : obj[key] !== properties[testKey];
                        } else {
                            result = obj[key] !== undefined && ($.isArray(properties[testKey]) ? $.inArray(obj[key], properties[testKey]) !== -1 : obj[key] === properties[key]);
                        }
                    }
                    if (result) {
                        found = index;
                        return false;
                    }
                });
            }
            return found;
        },
        has: function(obj, key) {
            return obj !== null && hasOwnProperty.call(obj, key);
        },
        reduce: function(array, callback, initialValue) {
            if (this === null) {
                return initialValue;
            }
            if (typeof callback !== "function") {
                return initialValue;
            }
            var t = usga.values(array), len = t.length >>> 0, k = 0, value = initialValue;
            for (;k < len; k++) {
                if (k in t) {
                    value = callback(value, t[k]);
                }
            }
            return value;
        },
        sum: function(array) {
            return usga.reduce(array, function(p, v) {
                return p + v;
            }, 0);
        },
        replaceURLWithHTMLLinks: function(text, newWindow) {
            var exp = /(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/gi, template = '<a href="$1">$1</a>';
            if (newWindow) {
                template = '<a href="$1" target="_blank">$1</a>';
            }
            return text.replace(exp, template);
        },
        replaceTwitterUsernameWithHTMLLinks: function(text, newWindow) {
            var exp = /(^|\s)@([a-z0-9_]+)/gi, template = '$1<a href="http://www.twitter.com/$2">@$2</a>';
            if (newWindow) {
                template = '$1<a href="http://www.twitter.com/$2" target="_blank">@$2</a>';
            }
            return text.replace(exp, template);
        },
        replaceHashtagsWithHTMLLinks: function(text, newWindow, network) {
            var exp = /(^|\s)#([a-z0-9_]+)/gi, socialUrl = network === "twitter" ? "http://www.twitter.com/search?q=$2" : "https://www.facebook.com/hashtag/$2", template = '$1<a href="' + socialUrl + '">#$2</a>';
            if (newWindow) {
                template = '$1<a href="' + socialUrl + '" target="_blank">#$2</a>';
            }
            return text.replace(exp, template);
        },
        scrollTo: function(element, speed) {
            var $element = $(element);
            if ($element.length) {
                speed = speed || 500;
                var top = $element.offset().top;
                $("html, body").animate({
                    scrollTop: top
                }, speed);
            }
        }
    });
    var $html = $("html");
    if (usga.browser.ie) {
        $html.addClass("ie ie" + usga.browser.ie);
    }
    if (usga.device.ios) {
        $html.addClass("ios");
    }
    if (usga.supports.touch) {
        $html.addClass("touch");
    } else {
        $html.addClass("no-touch");
    }
    $(function() {
        usga.domReady = true;
    });
    $(window).load(function() {
        usga.windowLoad = true;
    });
})(window.usga, window.jQuery);

window.usga = window.usga || {};

(function(usga, $) {
    var isProd = usga.isProd !== undefined ? $.isFunction(usga.isProd) ? usga.isProd() : !!usga.isProd : true;
    usga.config = {
        cloudName: isProd ? "usga" : "usga",
        gigyaApiKey: isProd ? "3_2XjOryTsvLPQvhvmmwB8TY-OB_6VT05LD5NVNZjYl1TTvIhq_2kEmKcC9MG1LbVw" : "3_5B0rrVdH06F8hPSY0XgLXrpXMRDgP6M5v5lF60lKTkALovXxebE6I0IvdNBV0w2g",
        gigyaBaseServiceUrl: isProd ? "//account.usga.org" : "//staging.account.usga.org",
        teamApproachMemberInfoWebserviceUrl: isProd ? "https://members.usga.org/data/endpoints/MemberInfo.asmx" : "https://members.usga.org/qa/data/endpoints/MemberInfo.asmx",
        pipCheckOutUrl: isProd ? "https://members.usga.org/signup_membership/" : "https://members.usga.org/qa/signup_2015/signup.aspx",
        clubhouseHomeUrl: isProd ? "https://www.usga.org/clubhouse/" : "/clubhouse.html",
        defaultJoinFlowUrl: isProd ? "/clubhouse/campaigns/members-join.html" : "/clubhouse/campaigns/members-join.html",
        defaultRenewFlowUrl: isProd ? "/clubhouse/campaigns/members-renew.html" : "/clubhouse/campaigns/members-renew.html",
        defaultReacquisitionUrl: isProd ? "/clubhouse/campaigns/members-renew-offer.html" : "/clubhouse/campaigns/members-renew-offer.html",
        alternateJoinUrl: isProd ? "/clubhouse/campaigns/members-renew-guest.html" : "/clubhouse/campaigns/members-renew-guest.html",
        attivioSearchUrl: isProd ? "//search.usga.org/usga/json" : "//209.48.25.21:17000/usga/json",
        eventsPhpApiUrl: isProd ? "https://membersclubhouse.usga.org/api/" : "//events-usgamc.mngd.org/api/"
    };
})(window.usga, window.jQuery);

window.usga = window.usga || {};

(function(usga, $, UA) {
    var gigyaConfig, gigyaLoaded = false, gigyaReady = false, gigyaLoggedIn = false, gigyaCallbacks = {}, gigyaUser = null, connectedMember = null, redirectionUrl = "";
    var addCallback = function(type, callback) {
        var callbacks = gigyaCallbacks[type];
        if (!callbacks) {
            callbacks = gigyaCallbacks[type] = [];
        }
        callbacks.push(callback);
    };
    var executeCallbacks = function(type) {
        var callbacks = gigyaCallbacks[type];
        if (callbacks) {
            var args = usga.getArgs(arguments, 1);
            $.each(callbacks, function(i, callback) {
                executeCallback.apply(null, [ callback ].concat(args));
            });
        }
    };
    var executeCallback = function(callback) {
        if (typeof callback === "function") {
            var args = usga.getArgs(arguments, 1);
            callback.apply(null, args);
        }
    };
    var onGigyaEvent = function(event, data) {
        if (event === "gigya-loaded") {
            gigyaLoaded = true;
            setTimeout(getGigyaAccountInfo, 10);
        } else if (~[ "login-successful", "register-successful", "register-fan-successful", "login-connect-successful", "connect-account-successful" ].indexOf(event)) {
            var expDate = data.memberExpDate ? new Date(data.memberExpDate) : false;
            if (expDate && moment(expDate).isValid() && moment() < moment(expDate).add(1, "month")) {
                $.cookie.raw = true;
                $.cookie("__LoggedIn__", data.akamaiToken, {
                    expires: 30,
                    path: "/",
                    domain: "usga.org"
                });
            }
            var timeout = 10;
            if ((event === "register-successful" || event === "register-fan-successful") && usga.browser.safari) {
                timeout = 1e3;
            }
            setTimeout(getGigyaAccountInfo, timeout);
        } else if (event === "logout") {
            me.resetDtm();
            setLoginSessionState(true);
            $.cookie("__LoggedIn__", null, {
                path: "/"
            });
            $.removeCookie("__LoggedIn__", {
                path: "/"
            });
            setGigyaUser(null);
            executeCallbacks("logout");
        } else if (event === "connect-member-id") {
            connectedMember = data;
            executeCallbacks("connect-member-id");
        } else if (event === "close-popup") {
            executeCallbacks("close-popup");
        }
    };
    var inSsoContext = function() {
        return usga.url.query.show === "sso";
    };
    var setLoginSessionState = function(remove) {
        if (remove) {
            $.removeCookie("sessionLogin", {
                path: "/"
            });
        } else {
            $.cookie("sessionLogin", true, {
                path: "/"
            });
        }
    };
    var getLoginSessionState = function() {
        return $.cookie("sessionLogin") !== undefined;
    };
    var getGigyaAccountInfo = function() {
        if (!UA) return;
        UA.gigya.accounts.getAccountInfo({
            callback: function(response) {
                var user = response.status == "OK" ? response : null;
                setGigyaUser(user);
                if (!isAemAuthEnv() && me.isUserOnProtectedContentPage() && !me.isUserHasAccessToProtectedContent()) {
                    document.location.href = usga.config.clubhouseHomeUrl;
                }
                if (user) {
                    executeCallbacks("login", gigyaUser);
                    if (redirectionUrl && me.isUserHasAccessToProtectedContent()) {
                        document.location.href = redirectionUrl;
                    }
                    if (inSsoContext() && !me.isUserHasAccessToProtectedContent()) {
                        me.openMembershipExpiredDialog();
                    }
                    me.setDtm();
                    if (!getLoginSessionState()) {
                        setLoginSessionState();
                        me.trackDtm();
                    }
                } else {
                    if (!gigyaReady && inSsoContext()) {
                        if (usga.url.query.target) {
                            me.setRedirectionUrl(usga.url.query.target);
                        }
                        me.openNotLoggedInDialog();
                    }
                }
                if (!gigyaReady) {
                    gigyaReady = true;
                    executeCallbacks("ready", gigyaUser);
                }
            },
            include: "profile,data",
            extraProfileFields: "address,phones"
        });
    };
    var getGigyaDataStore = function(userId, callback) {
        if (!UA) return;
        UA.gigya.ds.get({
            type: "Member",
            oid: userId,
            callback: function(response) {
                if (response.status == "OK") {
                    executeCallback(callback, response);
                } else {
                    console.warn("DataStore object can not be retrieved.");
                    executeCallback(callback);
                }
            }
        });
    };
    var getProfileMailingAddress = function(userId) {
        if (!UA) {
            usga.log("usga.Gigya: UA is not available");
            return;
        }
        var d = $.Deferred(), pending = $.Deferred();
        pending.promise().then(function(profile) {
            if (profile) {
                UA.gigya.ds.get({
                    oid: userId,
                    type: "Member",
                    callback: function(response) {
                        if (!usga.isObject(response)) {
                            usga.log("usga.Gigya: wrong ds response");
                            d.resolve(false);
                        }
                        if (response.status === "OK") {
                            var address = response.data && response.data !== null && response.data.address && response.data.address !== null && response.data.address.shipping && response.data.address.billing !== null && usga.isObject(response.data.address.shipping) ? response.data.address.shipping : {};
                            profile.address1 = profile.address && profile.address !== null ? profile.address : "";
                            profile.address2 = address.address2 && address.address2 !== null ? address.address2 : "";
                            d.resolve(profile);
                        } else {
                            usga.log("usga.Gigya: " + response.errorMessage);
                            d.resolve(false);
                        }
                    }
                });
            } else {
                d.resolve(false);
            }
        });
        UA.gigya.accounts.getAccountInfo({
            callback: function(response) {
                if (!usga.isObject(response)) {
                    usga.log("usga.Gigya: wrong info response");
                    pending.resolve(false);
                }
                if (response.status == "OK") {
                    pending.resolve(response.profile && response.profile !== null && usga.isObject(response.profile) ? response.profile : {});
                } else {
                    usga.log("usga.Gigya: " + response.errorMessage);
                    pending.resolve(false);
                }
            },
            include: "profile",
            extraProfileFields: "address"
        });
        return d.promise();
    };
    var setProfileMailingAddress = function(userId, updatedAddress) {
        if (!UA) {
            usga.log("usga.Gigya: UA is not available");
            return;
        }
        var d = $.Deferred(), serializedData = JSON.stringify(updatedAddress), xhr = $.ajax({
            url: usga.config.gigyaBaseServiceUrl.replace(/\/+$/, "") + "/Services/SetProfileData.ashx",
            method: "post",
            dataType: "jsonp",
            data: {
                uid: userId,
                apiKey: usga.config.gigyaApiKey,
                data: serializedData
            }
        });
        xhr.done(function(response) {
            if (!usga.isObject(response)) {
                usga.log("usga.Gigya: wrong response");
                d.resolve(false);
            }
            if (response.status === "success") {
                d.resolve(true);
            } else {
                usga.log("usga.Gigya: " + response.error);
                d.resolve(false);
            }
        });
        xhr.fail(function(xhr, textStatus) {
            usga.log("usga.Gigya: " + textStatus);
            d.resolve(false);
        });
        return d.promise();
    };
    var setGigyaUser = function(user) {
        gigyaUser = user;
        gigyaLoggedIn = !!user;
        executeCallbacks("user", user);
    };
    var executeGigyaDisplay = function(action, options) {
        if (!UA) return;
        UA.display($.extend(options, {
            action: action
        }));
    };
    var isAemAuthEnv = function() {
        return window.CQ !== undefined;
    };
    var me = usga.Gigya = {
        init: function(config) {
            if (!UA) return;
            gigyaConfig = $.extend({}, config, {
                eventHandler: onGigyaEvent
            });
            UA.init(gigyaConfig);
        },
        isReady: function() {
            return gigyaReady;
        },
        setDtm: function() {
            var loginState = "User not logged in";
            if (gigyaUser) {
                if (this.isFederatedUserOutsideRenewalWindow()) {
                    loginState = "Federated User outside renewal window";
                } else if (this.isExpiringFederatedUserWithinRenewalWindow()) {
                    loginState = "Federated User within renewal window";
                } else if (this.isExpiredFederatedUser()) {
                    loginState = "Expired Federated User";
                } else if (this.isLapsedFederatedUser()) {
                    loginState = "Lapsed Federated User";
                } else if (this.isFan()) {
                    loginState = "Logged In Fan Account";
                } else if (this.isProspect()) {
                    loginState = "Logged in Prospect Account";
                }
            }
            usga.setDtm({
                user: {
                    loginstate: loginState,
                    id: gigyaUser ? gigyaUser.UID : "",
                    level: gigyaUser && gigyaUser.data ? gigyaUser.data.memberLevel : ""
                }
            });
        },
        resetDtm: function() {
            $.extend(window.digitalData, {
                user: null
            });
        },
        trackDtm: function() {
            usga.trackDtm("userlogin", {});
        },
        isLoggedIn: function() {
            return gigyaLoggedIn;
        },
        isMember: function() {
            if (gigyaUser) {
                var data = gigyaUser.data;
                return !!data.memberExpDate;
            }
        },
        isMembershipActual: function() {
            if (gigyaUser) {
                var data = gigyaUser.data;
                var expDate = data.memberExpDate;
                if (expDate) {
                    return moment().add(1, "month") < moment(new Date(expDate));
                }
            }
        },
        isMembershipActualOrInGracePeriod: function() {
            if (gigyaUser) {
                var data = gigyaUser.data;
                var expDate = data.memberExpDate;
                if (expDate) {
                    return moment() < moment(new Date(expDate)).add(1, "month");
                }
            }
        },
        isExpiredMember: function() {
            return this.isMember() && !this.isMembershipActual();
        },
        isUserState: function(state) {
            var isUserState = false;
            if (gigyaUser) {
                var data = gigyaUser.data;
                if (data.memberExpDate) {
                    var now = moment(), expDate = new Date(data.memberExpDate);
                    switch (state) {
                      case "standard-active":
                        isUserState = now.add(45, "day") < moment(expDate);
                        break;

                      case "standard-expiring":
                        isUserState = now.add(45, "day") >= moment(expDate);
                        break;

                      case "standard-expired":
                        isUserState = moment(expDate).add(30, "day") < now;
                        break;

                      case "standard-in-grace":
                        isUserState = moment(expDate).add(30, "day") >= now && moment(expDate) < now;
                        break;

                      default:
                        isUserState = false;
                        break;
                    }
                }
            }
            return isUserState;
        },
        isExpiringFederatedUserWithinRenewalWindow: function() {
            if (gigyaUser && this.isMember()) {
                if (gigyaUser.data.memberExpDate) {
                    var expDate = new Date(gigyaUser.data.memberExpDate);
                    return moment().add(6, "M") > moment(expDate) && moment() < moment(expDate);
                }
            }
        },
        isFederatedUserOutsideRenewalWindow: function() {
            if (gigyaUser && this.isMember() && !this.isExpiredMember()) {
                var expDate = gigyaUser.data.memberExpDate;
                if (expDate) {
                    return moment().add(6, "M") < moment(new Date(expDate));
                }
            }
        },
        isExpiredFederatedUser: function() {
            if (gigyaUser && this.isExpiredMember()) {
                var expDate = gigyaUser.data.memberExpDate;
                if (expDate) {
                    return moment() < moment(new Date(expDate)).add(6, "M");
                }
            }
        },
        isLapsedFederatedUser: function() {
            if (gigyaUser && this.isExpiredMember()) {
                return !this.isExpiredFederatedUser();
            }
        },
        isFan: function() {
            if (gigyaUser) {
                var data = gigyaUser.data;
                return !data.memberId && !data.memberExpDate;
            }
        },
        isProspect: function() {
            if (gigyaUser) {
                var data = gigyaUser.data;
                return data.memberId && !data.memberExpDate;
            }
        },
        getUser: function(callback) {
            if (gigyaReady) {
                executeCallback(callback, gigyaUser);
            } else {
                this.onReady(callback);
            }
        },
        getDataStore: function(callback) {
            me.getUser(function(user) {
                if (user) {
                    getGigyaDataStore(user.UID, callback);
                } else {
                    executeCallback(callback);
                }
            });
        },
        getProfileMailingAddress: function() {
            if (gigyaUser) {
                return getProfileMailingAddress(gigyaUser.UID);
            }
            return $.when(false);
        },
        setProfileMailingAddress: function(updatedAddress) {
            if (gigyaUser) {
                return setProfileMailingAddress(gigyaUser.UID, updatedAddress);
            }
            return $.when(false);
        },
        getConnectedMember: function() {
            return connectedMember;
        },
        login: function(options) {
            executeGigyaDisplay("sign-in", options);
        },
        logout: function() {
            if (UA) {
                UA.logout();
            }
        },
        register: function(options) {
            executeGigyaDisplay("register", options);
        },
        campaignRegister: function() {
            this.register({
                campaign: true
            });
        },
        campaignLogin: function() {
            this.login({
                campaign: true
            });
        },
        profile: function(options) {
            executeGigyaDisplay("profile", options);
        },
        connect: function(options) {
            executeGigyaDisplay("connect-member-id", options);
        },
        connectAccount: function(options) {
            executeGigyaDisplay("connect-account", options);
        },
        isUserOnProtectedContentPage: function() {
            return document.location.href.indexOf("/clubhouse/protected/") != -1;
        },
        isUserHasAccessToProtectedContent: function() {
            return this.isLoggedIn() && this.isMember() && this.isMembershipActualOrInGracePeriod();
        },
        showProtectedContentModal: function(selector, disableClose) {
            if (!this.protectedContentModal && $("#protectedContentModal").length) {
                this.protectedContentModal = new usga.ProtectedContentModal("#protectedContentModal");
            }
            if (this.protectedContentModal) {
                this.protectedContentModal.open(selector, disableClose);
            }
        },
        openNotLoggedInDialog: function() {
            this.showProtectedContentModal(".sign-in");
        },
        openNonMemberDialog: function() {
            this.showProtectedContentModal(".non-member");
        },
        openMembershipExpiredDialog: function() {
            this.showProtectedContentModal(".expired");
        },
        setRedirectionUrl: function(url) {
            redirectionUrl = url;
        },
        onReady: function(callback) {
            if (gigyaReady) {
                executeCallback(callback, gigyaUser);
            } else {
                addCallback("ready", callback);
            }
        },
        onLogin: function(callback) {
            addCallback("login", callback);
        },
        onLogout: function(callback) {
            addCallback("logout", callback);
        },
        onUser: function(callback) {
            addCallback("user", callback);
            if (gigyaReady) {
                executeCallback(callback, gigyaUser);
            }
        },
        onConnectMemberId: function(callback) {
            addCallback("connect-member-id", callback);
        },
        onClosePopup: function(callback) {
            addCallback("close-popup", callback);
        }
    };
})(window.usga, window.jQuery, window.UA);

usga = window.usga || {};

usga.BaseModule = can.Control.extend({
    biggerMaxWidth: 1170,
    bigMaxWidth: 960,
    mediumMaxWidth: 767,
    smallMaxWidth: 480,
    resizeTimeout: 100,
    offsetVisible: 50,
    lazyLoading: true,
    domReady: false,
    loaded: false,
    hasProtectedContent: false,
    setup: function(element, options) {
        var result = this._super(element, options);
        this.$element = this.element;
        return result;
    },
    init: function() {
        this.screenSize = this.getScreenSize();
        if (this.onDocumentReady) {
            if (usga.domReady) {
                this.onDocumentReady();
            } else {
                this.on(document, "ready", this.proxy(this.onDocumentReady));
            }
        }
        if (this.onWindowLoad) {
            if (usga.windowLoad) {
                this.onWindowLoad();
            } else {
                this.on(window, "load", this.proxy(this.onWindowLoad));
            }
        }
        if (this.onWindowScroll || this.onFirstShow) {
            this.on(window, "scroll", this.proxy(this._onWindowScroll));
        }
        if (this.onWindowResize || this.onLayout) {
            this.on(window, "resize", this.proxy(this._onWindowResize));
        }
        if (this.hasProtectedContent) {
            usga.Gigya.onUser(this.proxy(this.onUserLogged));
        }
        if (this.onFirstShow) {
            if (this.lazyLoading) {
                this.checkModuleVisible();
            } else {
                this.loaded = true;
                this.onFirstShow();
            }
        } else {
            this.loaded = true;
        }
    },
    getViewportSize: function() {
        var e = window, a = "inner";
        if (!("innerWidth" in window)) {
            a = "client";
            e = document.documentElement || document.body;
        }
        var bs = document.body.style;
        return {
            width: bs.width ? parseInt(bs.width) : e[a + "Width"],
            height: bs.height ? parseInt(bs.height) : e[a + "Height"]
        };
    },
    getScreenSize: function() {
        var vSize = this.getViewportSize();
        var size;
        if (vSize.width <= this.smallMaxWidth) {
            size = "small";
        } else if (vSize.width <= this.mediumMaxWidth) {
            size = "medium";
        } else if (vSize.width <= this.bigMaxWidth) {
            size = "big";
        } else if (vSize.width <= this.biggerMaxWidth) {
            size = "bigger";
        } else {
            size = "infinity";
        }
        return size;
    },
    isDomReady: function() {
        return usga.domReady;
    },
    isSmallScreen: function() {
        return this.getScreenSize() == "small";
    },
    isMediumScreen: function() {
        return this.getScreenSize() == "medium";
    },
    isBigScreen: function() {
        return this.getScreenSize() == "big";
    },
    isBiggerScreen: function() {
        return this.getScreenSize() == "bigger";
    },
    isInfinityScreen: function() {
        return this.getScreenSize() == "infinity";
    },
    checkModuleVisible: function() {
        var windowScrollTop = $(window).scrollTop();
        var offset = this.$element.offset();
        if (offset && windowScrollTop + $(window).height() >= offset.top - this.offsetVisible) {
            this.loaded = true;
            this.onFirstShow();
        }
    },
    applyCloudinaryConfig: function(images, cfg) {
        var config = can.extend({}, cfg);
        if (!config.quality) {
            config.quality = 70;
            if (config.width > 1200) {
                config.quality = 50;
            }
        }
        images.cloudinary(config);
    },
    trigger: function(eventName) {
        can.event.trigger.call(this, eventName, usga.getArgs(arguments, 1));
    },
    bind: function(eventName, handler) {
        can.event.bind.call(this, eventName, handler);
    },
    unbind: function(eventName, handler) {
        can.event.unbind.call(this, eventName, handler);
    },
    updateProtectedLinks: function() {
        var protectedLinks = this.element.find("a[href*='/protected/'], a.protected__link");
        protectedLinks.off("click");
        if (usga.Gigya.isUserHasAccessToProtectedContent()) {
            protectedLinks.removeClass("locked").addClass("unlocked");
        } else {
            protectedLinks.removeClass("unlocked").addClass("locked");
        }
        protectedLinks.filter(".locked").click(this.onProtectedLinkClick);
    },
    _onWindowResize: function() {
        if (this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(this.proxy(this.onResizeTimer), this.resizeTimeout);
    },
    onResizeTimer: function() {
        this.resizeTimer = null;
        if (this.onFirstShow && this.lazyLoading && !this.loaded) {
            this.checkModuleVisible();
        }
        var screenSize = this.getScreenSize();
        if (this.screenSize !== screenSize) {
            this.screenSize = screenSize;
            if (this.onLayout && this.loaded) {
                this.onLayout(this.screenSize);
            }
        }
        if (this.onWindowResize) {
            this.onWindowResize();
        }
    },
    _onWindowScroll: function() {
        if (this.onFirstShow && this.lazyLoading && !this.loaded) {
            this.checkModuleVisible();
        }
        if (this.onWindowScroll) {
            this.onWindowScroll();
        }
    },
    onUserLogged: function(user) {
        this.updateProtectedLinks();
    },
    onProtectedLinkClick: function(evt) {
        evt.preventDefault();
        if (!usga.Gigya.isLoggedIn()) {
            usga.Gigya.openNotLoggedInDialog();
        } else if (!usga.Gigya.isMember()) {
            usga.Gigya.openNonMemberDialog();
        } else if (!usga.Gigya.isMembershipActualOrInGracePeriod()) {
            usga.Gigya.openMembershipExpiredDialog();
        }
        usga.Gigya.setRedirectionUrl($(this).attr("href"));
    }
});

usga.BaseCloudinaryModule = usga.BaseModule.extend({
    getCloudinaryConfigParameterFromCss: function(image, name) {
        var param = image.css(name);
        if (param && param != "auto" && param != "none") {
            return parseInt(param.replace("px", ""));
        }
    },
    getImageAttr: function(image, name, isNumeric) {
        var val = image.attr(name);
        if (val) {
            if (isNumeric) {
                val = parseInt(val);
            }
            return val;
        }
    },
    applyCloudinary: function(container) {
        container = container || this.$element;
        var images = container.find("img[data-src]");
        var image, config, width, height, curWidth, curHeight, quality, crop;
        var dpr = $.cloudinary.device_pixel_ratio();
        for (var i = 0; i < images.length; i++) {
            image = $(images[i]);
            width = this.getCloudinaryConfigParameterFromCss(image, "max-width");
            height = this.getCloudinaryConfigParameterFromCss(image, "max-height");
            curWidth = this.getImageAttr(image, "width", true);
            curHeight = this.getImageAttr(image, "height", true);
            if (width != curWidth || height != curHeight) {
                image.removeAttr("height");
                image.removeAttr("width");
                quality = width > 1170 ? 50 : 70;
                dpr = width < 1170 ? dpr : null;
                config = {
                    width: width,
                    height: height,
                    crop: this.getImageAttr(image, "data-crop") || "fill",
                    quality: this.getImageAttr(image, "data-quality") || quality
                };
                if (width < 1170 && dpr > 1) {
                    config.dpr = Math.ceil(dpr * 2) / 2;
                }
                image.cloudinary(config);
            }
        }
    },
    onFirstShow: function() {
        this.applyCloudinary();
    },
    onLayout: function() {
        this.applyCloudinary();
    }
});

usga.VariableSlider = usga.BaseCloudinaryModule.extend({
    sliderSelector: "",
    getSliderConfig: function() {},
    initSlider: function() {
        var config = this.getSliderConfig();
        if (config) {
            this.slider = this.$element.find(this.sliderSelector).bxSlider(config);
        }
    },
    reinitSlider: function() {
        var config = this.getSliderConfig();
        if (!can.Object.same(config, this.lastConfig)) {
            this.lastConfig = config;
            if (!config && this.slider) {
                this.slider.destroySlider();
            } else if (config && !this.slider) {
                this.initSlider();
            } else if (config && this.slider) {
                this.slider.reloadSlider(config);
            }
        }
    },
    onFirstShow: function() {
        this._super();
        this.$element.removeClass("loading");
        this.initSlider();
    },
    onLayout: function(screen) {
        this._super();
        this.reinitSlider();
    }
});

usga.Paginator = can.Map.extend({
    count: 0,
    offset: 0,
    limit: 10,
    next: function() {
        this.attr("offset", this.offset + this.limit);
    },
    prev: function() {
        this.attr("offset", this.offset - this.limit);
    },
    canNext: function() {
        return this.attr("offset") < this.attr("count") - this.attr("limit");
    },
    canPrev: function() {
        return this.attr("offset") > 0;
    },
    page: function(newVal) {
        if (newVal === undefined) {
            return Math.floor(this.attr("offset") / this.attr("limit")) + 1;
        } else {
            this.attr("offset", (parseInt(newVal, 10) - 1) * this.attr("limit"));
        }
    },
    pageCount: function() {
        return this.attr("count") ? Math.ceil(this.attr("count") / this.attr("limit")) : null;
    }
});

usga.BaseModal = usga.BaseModule.extend({
    init: function() {
        this._super();
        this.element.appendTo($("body"));
    },
    open: function() {
        this.$element.show();
    },
    close: function(causedByWorkflow) {
        this.$element.hide();
        this.onClose(causedByWorkflow);
    },
    onClose: function() {}
});

can.Component.extend({
    tag: "cloudinary-image",
    template: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=" data-src="{{src}}" data-crop="{{crop}}" alt="{{alt}}">',
    scope: {
        define: {
            src: {
                set: function(value) {
                    if (!value) return "";
                    if (this.stripPrefix && value.indexOf(this.stripPrefix) === 0) {
                        value = value.substr(this.stripPrefix.length);
                    }
                    return value;
                }
            }
        },
        stripPrefix: "/content/dam"
    }
});

usga.BaseSearchModule = usga.BaseCloudinaryModule.extend({
    KEYS: {
        ENTER: 13
    },
    defaults: {
        baseUrl: usga.embed ? "http://www.usga.org" : location.protocol + "//" + location.host,
        baseSearchPageUrl: "",
        searchPageUrl: "/search-results.html#q={query}{type}",
        template: "",
        attivioSearchQueryData: {
            q: ""
        }
    },
    getResultsUrl: function(baseSearchPageUrl, searchPageUrl, queryText, type) {
        var typeParam = "";
        if (type) {
            typeParam = "&type=" + type;
        }
        return baseSearchPageUrl + can.sub(searchPageUrl, {
            query: usga.BaseSearchModule.prepareQueryText(queryText),
            type: typeParam
        });
    },
    navigateToUrl: function(url) {
        var pathName = location.pathname, newPath = usga.url.trimHost(url);
        location.href = url;
        if (pathName && pathName !== "/" && newPath.indexOf(pathName) === 0) {
            setTimeout(function() {
                location.reload(true);
            }, 0);
        }
    },
    prepareQueryText: function(text) {
        if (!text || typeof text !== "string") {
            return "";
        }
        return encodeURIComponent(text);
    }
}, {
    hasProtectedContent: true,
    init: function(element, options) {
        this._super();
    },
    _renderTemplate: function() {
        if (this.options.template && $(this.options.template)[0]) {
            return can.view(this.options.template, this.context, {
                "protected": this.proxy(this._handleByProtectedHelper),
                pages: this.proxy(this._handleByPagesHelper),
                activePageLink: this.proxy(this._handleByActivePageLinkHelper),
                activeType: this.proxy(this._handleByActiveTypeHelper)
            });
        }
        return "";
    },
    _handleByProtectedHelper: function(options) {
        if (options.context.isProtected) {
            $(options.nodeList[0]).addClass("protected__link");
        }
    },
    _handleByPagesHelper: function(options) {
        if (this.context && this.context.paginator) {
            var page = this.context.paginator.page(), pageCount = this.context.paginator.pageCount(), links = [], links2 = [], rendered = [];
            for (var i = 0; i < pageCount; i++) {
                links.push({
                    page: i + 1
                });
            }
            var left = page - 3;
            if (left < 1) {
                left = 1;
            }
            links2 = links.slice(left - 1, left + 4);
            for (var i2 = 0, len2 = links2.length; i2 < len2; i2++) {
                rendered.push(options.fn(links2[i2]));
            }
            return rendered;
        }
    },
    _handleByActiveTypeHelper: function(options) {
        if (this.context && "type" in this.context) {
            var $el = $(options.nodeList), typeVal = this.context.type || "";
            $el.find("a[data-type]").removeClass("active");
            $el.find(can.sub('a[data-type="{type}"]', {
                type: typeVal
            })).addClass("active");
        }
    },
    _handleByActivePageLinkHelper: function(pageVal, options) {
        var $el = $(options.nodeList[0]), $parent = $el.parent();
        if (this.context.paginator && this.context.paginator.page() === pageVal) {
            $parent.find("[data-page]").removeClass("active");
            $el.addClass("active");
        }
    },
    _getQueryText: function() {
        return this.$query.val().trim().replace(/\s+/g, " ");
    },
    getResultsUrl: function(typeName) {
        var typeParam = "";
        if (typeName) {
            typeParam = "&type=" + typeName;
        }
        return this.options.baseSearchPageUrl + can.sub(this.options.searchPageUrl, {
            query: usga.BaseSearchModule.prepareQueryText(this._getQueryText()),
            type: typeParam
        });
    },
    _makeRequest: function(term, additionalData) {
        return $.ajax({
            url: usga.config.attivioSearchUrl,
            data: $.extend({}, this.options.attivioSearchQueryData, {
                q: usga.quote(term)
            }, additionalData || {}),
            dataType: "jsonp"
        });
    },
    _getSynonyms: function(data) {
        if (usga.isObject(data) && data.feedback) {
            for (var i = 0, len = data.feedback.length; i < len; i++) {
                var item = data.feedback[i];
                if (item.name && item.name === "synonyms.expansion" && item.message) {
                    var match = item.message.match(/=>\s*\[([^\]]+)\]$/);
                    if (match[1]) {
                        return {
                            label: match[1]
                        };
                    }
                }
            }
        }
        return false;
    },
    _getPredictiveDocumentsCount: function(data) {
        if (usga.isObject(data) && data.documents && $.isArray(data.documents)) {
            return data.documents.length;
        }
        return 0;
    },
    _getDocumentsCount: function(data) {
        var facetCountsVal = this._getFacetCounts(data);
        return usga.reduce(facetCountsVal, function(p, o) {
            return p + o.count;
        }, 0);
    },
    _getFacetBucket: function(data) {
        if (usga.isObject(data) && data.facets) {
            var bucket = null;
            for (var i = 0, len = data.facets.length; i < len; i++) {
                var facet = data.facets[i];
                if (facet.field && facet.field === "concepts" && $.isArray(facet.buckets)) {
                    return facet.buckets[0];
                }
            }
        }
        return false;
    },
    _getFacetCounts: function(data) {
        var counts = {};
        if (usga.isObject(data) && data.facets) {
            for (var i = 0, len = data.facets.length; i < len; i++) {
                var facet = data.facets[i];
                if (facet.field === "contentType") {
                    if ($.isArray(facet.buckets)) {
                        var buckets = $.merge([], facet.buckets);
                        for (var i2 = 0, len2 = buckets.length; i2 < len2; i2++) {
                            var documentType = this._plainDocumentType(buckets[i2].label);
                            if (documentType.match(/rules/i)) {
                                documentType = "rules";
                            }
                            if (!counts[documentType]) {
                                counts[documentType] = {
                                    count: 0,
                                    label: buckets[i2].label || "",
                                    type: documentType
                                };
                            }
                            counts[documentType].count += buckets[i2].count || 0;
                        }
                    }
                }
            }
        }
        $.each(usga.keys(counts), function(key, item) {
            if (!item.count || item.count === null) {
                delete counts[key];
            }
        });
        return counts;
    },
    _getDocuments: function(data) {
        return usga.isObject(data) && data.documents ? data.documents : [];
    },
    _plainDocumentType: function(type) {
        return type.toLowerCase().replace(/[^a-z\s]/g, "").replace(/\s+/g, "_");
    },
    _getDocumentType: function(doc) {
        var type = this._getDocumentProperty(doc, "contentType", true);
        if (!type || type === null) {
            type = "all";
        } else if (type && typeof type !== "string") {
            type = "" + type;
        }
        if (type) {
            return {
                name: this._plainDocumentType(type),
                label: type
            };
        } else {
            return null;
        }
    },
    _getDocumentProperty: function(document, property, getFirstItem, doJoin, joinStr) {
        if (!document || !usga.isObject(document) || !document[property]) {
            return undefined;
        }
        if ($.isArray(document[property])) {
            if (getFirstItem) {
                return document[property][0];
            } else if (doJoin) {
                return document[property].join(joinStr || "");
            }
        }
        return document[property];
    },
    _prepareRenderItem: function(document, doNotStripTags) {
        var item = {}, title = this._getDocumentProperty(document, "title", true), text = this._getDocumentProperty(document, "text", true) || "", uri = this._getDocumentProperty(document, "uri", true), imageUrl = this._getDocumentProperty(document, "imageUrl", true), type = this._getDocumentProperty(document, "contentType", true), contentType = this._getDocumentType(document), isProtected = "" + this._getDocumentProperty(document, "protected", true) === "true", defaultTitle = "Title";
        item.title = doNotStripTags ? title || defaultTitle : usga.stripTags(title || defaultTitle);
        item.text = doNotStripTags ? text || "" : usga.stripTags(text);
        item.uri = uri;
        if (uri && uri.search(/^[^:]+:\/\//) !== 0) {
            item.uri = this.options.baseUrl.replace(/\/$/, "") + "/" + uri.replace(/^\//g, "");
        }
        item.shortUrl = usga.url.short(item.uri);
        if (imageUrl) {
            item.imageUrl = usga.trimDamInUrl(imageUrl);
        }
        item.type = type;
        item.isProtected = isProtected;
        return item;
    },
    _trackDtmFullSearch: function(q, documentCount) {
        usga.trackDtm("user-full-search", {
            search: {
                term: q,
                results: documentCount
            }
        });
    },
    _trackDtmTypedSearch: function(q, documentCount, type) {
        usga.trackDtm("user-search-filter-" + (type || "all"), {
            search: {
                term: q,
                results: documentCount
            }
        });
    }
});

var usga = window.usga || {};

usga.PartnerModal = usga.BaseCloudinaryModule.extend({
    defaults: {
        autoShow: false,
        activatorSelector: "[data-partner-modal]"
    }
}, {
    init: function(element, options) {
        this._super(element, options);
        this.$element.each(function() {
            var $container = $(this), $el = $container, partner, insertedModalClassName;
            if (!$container.hasClass("modal")) {
                $el = $container.find("modal");
            }
            partner = $el.data("partner");
            insertedModalClassName = "partner-modal-" + partner;
            $("body > ." + insertedModalClassName).remove();
            $el.addClass(insertedModalClassName);
            if (!options.autoShow) {
                $el.css("display", "none");
            }
            $("body").append($el);
        });
        $("body").on("click", options.activatorSelector, this.proxy(this.onActivatorClick)).on("click", ".modal_partner .modal__body__close", this.proxy(this.onCloseClick));
    },
    onActivatorClick: function(event) {
        var $el = $(event.currentTarget);
        $("body").find('[data-partner="' + $el.data("partner-modal") + '"]').toggle(true);
        event.preventDefault();
    },
    onCloseClick: function(event) {
        var $el = $(event.currentTarget);
        $el.closest(".modal_partner").toggle(false);
    }
});

usga.ProtectedContentModal = usga.BaseModal.extend({
    init: function(element, options) {
        this._super(element, options);
        this.$dialogs = this.$element.find(".modal__body__content");
    },
    open: function(selector, isCloseDisabled) {
        this.$dialogs.hide().filter(selector).show();
        this.$element.find(".modal__body__close").toggle(!isCloseDisabled);
        this.$element.show();
        if (this.isSmallScreen()) {
            usga.scrollTo($("body"));
        }
    },
    ".modal__body__close click": function() {
        this.close();
    },
    ".button.sign-in-button click": function() {
        this.close(true);
        usga.Gigya.login();
    },
    ".button.register-button click": function() {
        this.close(true);
        usga.Gigya.register();
    },
    ".button.connect-button click": function() {
        this.close(true);
        usga.Gigya.connect();
    }
});

usga.NavSearch = usga.BaseSearchModule.extend({
    defaults: {
        template: "#nav-search-results-template",
        typesLimits: {
            all: 2,
            news: 2,
            photos_videos: 4
        },
        attivioSearchQueryData: {
            predictive: true
        }
    }
}, {
    $search: null,
    $query: null,
    $results: null,
    context: null,
    _stats: {
        total: 0,
        type: {}
    },
    init: function(element, options) {
        this._super();
        this.$search = this.$element.find(".nav-search");
        this.$query = this.$search.find(".nav-search__form__field input");
        this.$results = this.$search.find(".nav-search__result");
        this.context = new can.Map({
            suggestion: "",
            results: {},
            resultLinks: {},
            categories: {}
        });
        this.$results.append(this._renderTemplate());
        this.applyCloudinary(this.$results);
    },
    navigateToSearch: function(type) {
        if (this._getQueryText()) {
            this.navigate(this.getResultsUrl(type || ""));
        }
    },
    navigate: function(url) {
        var pathName = location.pathname, newPath = usga.url.trimHost(url);
        location.href = url;
        if (pathName && pathName !== "/" && newPath.indexOf(pathName) === 0) {
            setTimeout(function() {
                location.reload(true);
            }, 0);
        }
    },
    _trackDtm: function(autocompleteTerm, data) {
        usga.trackDtm("user-predictive-search", {
            search: {
                term: autocompleteTerm,
                results: this._stats.total
            }
        });
    },
    _setStats: function(documents) {
        var stats = {
            total: 0,
            type: {}
        };
        for (var i = 0, len = documents.length; i < len; i++) {
            var document = documents[i], type = this._getDocumentType(document), typeName = type.name;
            if (typeName.match(/rules/i)) {
                typeName = "rules";
            }
            if (!type || [ "courses", "store" ].indexOf(typeName) !== -1) {
                continue;
            }
            if (!stats.type[typeName]) {
                stats.type[typeName] = 0;
            }
            stats.type[typeName] += 1;
            stats.total += 1;
        }
        this._stats = stats;
    },
    autoComplete: function() {
        var autocompleteTerm = this._getQueryText();
        if (autocompleteTerm) {
            this.makeAutocompleteRequest(autocompleteTerm).done(this.proxy(function(data) {
                var documents = this._getDocuments(data);
                this._setStats(documents);
                this._trackDtm(autocompleteTerm);
            })).done(this.proxy(this.setRenderItems)).done(this.proxy(function() {
                this.updateProtectedLinks();
                this.$results.toggle(true);
            }));
        }
    },
    makeAutocompleteRequest: function(term) {
        return this._makeRequest(term);
    },
    clearResults: function() {
        can.batch.start();
        this.context.attr("suggestion", "");
        this.context.attr("results", {});
        this.context.attr("resultLinks", {});
        this.context.attr("categories", {});
        can.batch.stop();
    },
    _hasToSetRenderAllItem: function(items) {
        return this.options.typesLimits && this.options.typesLimits.all && (!items.all || items.all && items.all.length < this.options.typesLimits.all);
    },
    _setRenderItem: function(document, typeName, items) {
        if (this._hasToSetRenderAllItem(items)) {
            typeName = "all";
        } else if (this.options.typesLimits) {
            if (false === (this.options.typesLimits[typeName] && (!items[typeName] || items[typeName] && items[typeName].length < this.options.typesLimits[typeName]))) {
                return false;
            }
        }
        if (!items[typeName]) {
            items[typeName] = [];
        }
        items[typeName].push(this._prepareRenderItem(document));
        return true;
    },
    setRenderItems: function(data) {
        var facetBucket = this._getFacetBucket(data) || this._getSynonyms(data), documents = this._getDocuments(data), categories = {}, items = {}, maxRenderItems = !this.options.typesLimits || !usga.isObject(this.options.typesLimits) || usga.sum(this.options.typesLimits), stats = {};
        can.batch.start();
        if (facetBucket) {
            if (this._getQueryText() !== facetBucket.label) {
                this.context.attr("suggestion", facetBucket.label);
            }
        }
        for (var i = 0, len = documents.length, q = 0; i < len; i++) {
            var document = documents[i], type = this._getDocumentType(document), typeName = type.name;
            if (typeName.match(/rules/i)) {
                typeName = "rules";
            }
            if (!type || [ "courses", "store" ].indexOf(typeName) !== -1) {
                continue;
            }
            if (!categories[typeName]) {
                categories[typeName] = type.label;
            }
            if (this._setRenderItem(document, typeName, items)) {
                q++;
            }
            if (false === (maxRenderItems !== true && q < maxRenderItems)) {
                break;
            }
        }
        this.context.attr("categories", categories);
        this.context.attr("resultLinks.all", this.getResultsUrl("all"));
        this.context.categories.each(this.proxy(function(label, type) {
            this.context.attr("resultLinks." + type, this.getResultsUrl(type));
        }));
        this.context.attr("results", items);
        can.batch.stop();
        this.applyCloudinary();
    },
    toggleSearch: function(state) {
        this.$search.toggle(state);
        this.toggleResults(false);
        if (state) {
            this.$search.find(".nav-search__form__field input:text:visible:first").focus();
        }
        if (this._getQueryText()) {
            this.$results.toggle(true);
            this.autoComplete();
        }
    },
    toggleResults: function(state) {
        this.$results.toggle(state);
    },
    onQueryTyping: function(event) {
        switch (event.keyCode) {
          case usga.NavSearch.KEYS.ENTER:
            event.preventDefault();
            this.navigateToSearch();
            break;

          default:
            this.onQueryTyped();
            break;
        }
    },
    onQueryTyped: function() {
        this.$results.toggle(false);
        this.clearResults();
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
            this.changeTimeout = null;
        }
        this.changeTimeout = setTimeout(this.proxy(this.autoComplete), 1e3);
    },
    ".nav-search__form__btn click": function($el, event) {
        event.preventDefault();
        if (this._getQueryText()) {
            this.navigateToSearch();
        }
    },
    ".nav-search__form__field input keydown": function($el, event) {
        this.onQueryTyping(event);
    },
    '.nav-search__suggest__text[data-words!=""] click': function($el, event) {
        event.preventDefault();
        this.$query.val($el.data("words"));
        this.navigateToSearch("all");
    },
    ".nav-search__category-title click": function($link, event) {
        event.preventDefault();
        var type = $link.data("type");
        this._trackDtmTypedSearch(this._getQueryText(), this._stats.type[type], $link.data("type"));
        setTimeout(this.proxy(this.navigate, $link[0].href), 1e3);
    },
    ".nav-search__all-results click": function($link, event) {
        event.preventDefault();
        this._trackDtmTypedSearch(this._getQueryText(), this._stats.total, "all");
        setTimeout(this.proxy(this.navigate, $link[0].href), 1e3);
    },
    ".nav-search__more.all click": function($link, event) {
        event.preventDefault();
        this._trackDtmTypedSearch(this._getQueryText(), this._stats.total, "all");
        setTimeout(this.proxy(this.navigate, $link[0].href), 1e3);
    }
});

(function() {
    var getAuthorizationData = function() {
        if (usga.Gigya.isLoggedIn()) {
            var d = $.Deferred();
            usga.Gigya.getDataStore(function(ds) {
                var obj = {};
                if (ds && usga.isObject(ds) && ds.data && usga.isObject(ds.data) && ds.data.membership && usga.isObject(ds.data.membership)) {
                    obj = ds.data.membership;
                }
                return d.resolve(obj);
            });
            return d.promise();
        } else {
            return $.when(false);
        }
    };
    usga.Navigation = usga.BaseCloudinaryModule.extend({
        MAIN_MENU_ANIMATABLE_CLASS: "animatable",
        MAIN_MENU_ACTIVE_CLASS: "active",
        MAIN_MENU_SUB_VISIBLE_CLASS: "main-menu__item_sub_mod1",
        SUB_MAIN_MENU_SUB_VISIBLE_CLASS: "sub-main-menu__item_sub_mod1",
        MAIN_MENU_ACTIVE_PAGE_MENU_ITEM_CLASS: "active-page-item",
        MAIN_MENU_ACTIVE_PAGE_ITEM_SUBMENU_CLASS: "active-page-item-submenu",
        defaults: {
            submenuDissapearDelay: 1e3,
            moreMenuDissapearDelay: 2e3,
            sticky: true,
            cover: false,
            baseUrl: location.protocol + "//" + location.host,
            baseSearchPageUrl: "",
            highlightActiveItem: true,
            showActivePageSubMenu: false
        }
    }, {
        minIndent: 0,
        flyClass: "navigation_scroll",
        invokableAction: false,
        navSearch: null,
        menuLayoutDelay: 550,
        init: function() {
            if (this.options.sticky) {
                this.$element.addClass("navigation_fixed");
            }
            this.$mainMenuContainer = this.$element.find(".main-menu");
            this.$mainMenu = this.$element.find(".main-menu__inner");
            this.$secondaryMenu = this.$element.find(".secondary_main-menu");
            this.$dropdown = this.$mainMenu.find("li.main-menu__dropdown");
            this.minIndent = this.getMinStickyIndent();
            this.navSearch = new usga.NavSearch(this.$element, {
                baseUrl: this.options.baseUrl,
                baseSearchPageUrl: this.options.baseSearchPageUrl
            });
            this._super();
            this.setInitialClasses();
            this.highlightActivePageMenuItem();
            this.showActivePageSubMenu();
            usga.Gigya.onReady(this.proxy(this.onGigyaActionsReady));
            $("body").on("click", this.proxy(this.onOutsideClick));
        },
        isPageHasLiveLeaderboardTicker: function() {
            return $("body").hasClass("leaderboard-live-ticker");
        },
        isMainMenu: function(el) {
            return this.$mainMenu.has(el).length !== 0;
        },
        inSubMoreMenu: function($el) {
            var $more = this.getSubMoreMenu($el), isIn = $more.length !== 0 && !$el.is(".sub-main-menu__more-menu") && $more.has($el);
            if (isIn) {
                var parents = $el.parentsUntil(".sub-main-menu__more-menu");
                isIn = parents.filter(".sub-main-menu__item__submenu").length > 0;
            }
            return isIn;
        },
        isSubMoreMenu: function($el) {
            return $el.is(".sub-main-menu__more-menu") || $el.closest(".sub-main-menu__more-menu").length !== 0;
        },
        isMoreMenu: function(el) {
            return this.$dropdown.has(el).length !== 0;
        },
        isSubMenu: function($el) {
            return $el.is(".sub-main-menu__item_sub") || $el.closest(".sub-main-menu__item_sub").length !== 0;
        },
        isSubMenuItem: function($item) {
            return $item.is(".main-menu__item_sub, .sub-main-menu__item_sub");
        },
        isGigyaAction: function(action) {
            return [ "login", "sign-in", "logout", "register", "sign-up", "profile", "campaignRegister", "campaignLogin" ].indexOf(action) !== -1;
        },
        hasLink: function($element) {
            var $link = $element.is("a") ? $element : $element.find(">a"), href = $link[0].href;
            return href && href.search(/^javascript/i) === -1 && href.search(/#$/) === -1;
        },
        isFlyPosition: function() {
            if (!this.isSmallScreen()) {
                if (this.options.sticky) {
                    return $(window).scrollTop() >= this.minIndent && $(window).scrollTop() > 0;
                }
            } else {
                return false;
            }
        },
        isSubMoreMenuApplicable: function(containerWidth, $items) {
            for (var i = 0, len = $items.length, calcWidth = 0; i < len; i++) {
                var $item = $($items[i]);
                calcWidth += Math.ceil($item.outerWidth(true));
                if (calcWidth > containerWidth) {
                    return true;
                }
            }
            return false;
        },
        hasActiveMainMenuItem: function() {
            return this.$element.find(".main-menu__inner > li.main-menu__item.active").length === 1;
        },
        hasHoveringMenuItemOnFirstLevel: function() {
            return this.$element.find(".main-menu__inner > li.main-menu__item.mouse-on").length !== 0;
        },
        isMainMenuScrolled: function() {
            return this.$element.hasClass(this.flyClass);
        },
        isSearchActive: function() {
            return this.$element.find(".secondary_main-menu__item__link.search").hasClass("search-active");
        },
        isHamburgerOpened: function() {
            return this.$element.find(".navigation__toggle").hasClass("navigation__toggle_mod1");
        },
        getMinStickyIndent: function() {
            var min = this.element.find(".main-menu").outerHeight();
            if ($("body").hasClass("leaderboard-live") && $("#leaderBoardTicker").length > 0) {
                min += $("#leaderBoardTicker").outerHeight();
            }
            return min;
        },
        getOpenedHamburgerHeight: function() {
            if (!this.isHamburgerOpened()) {
                return 0;
            }
            return this.$element.height() + this.$element.find(".navigation__box").height();
        },
        setInitialClasses: function() {
            if (this.options.highlightActiveItem) {
                this.$element.find("li.active").addClass(usga.Navigation.MAIN_MENU_ACTIVE_PAGE_MENU_ITEM_CLASS);
                var activeSubMenu = null, activeSecondLevelItem = this.$element.find("li.sub-main-menu__item_active"), activeThirdLevelItem = this.$element.find("li.sub-main-menu__item__submenu__item_active");
                if (activeThirdLevelItem.length > 0) {
                    activeThirdLevelItem.addClass(usga.Navigation.MAIN_MENU_ACTIVE_CLASS).addClass(usga.Navigation.MAIN_MENU_ACTIVE_PAGE_MENU_ITEM_CLASS);
                    var activeSecondLevelSubMenu = activeThirdLevelItem.closest(".sub-main-menu__item_sub");
                    activeSubMenu = activeThirdLevelItem.closest(".main-menu__item_sub");
                    if (activeSubMenu.length > 0) {
                        activeSubMenu.addClass(this.options.showActivePageSubMenu ? usga.Navigation.MAIN_MENU_ACTIVE_PAGE_ITEM_SUBMENU_CLASS : usga.Navigation.MAIN_MENU_ACTIVE_PAGE_MENU_ITEM_CLASS);
                    }
                    if (activeSecondLevelSubMenu.length > 0) {
                        activeSecondLevelSubMenu.addClass(usga.Navigation.MAIN_MENU_ACTIVE_CLASS).addClass(usga.Navigation.MAIN_MENU_ACTIVE_PAGE_MENU_ITEM_CLASS);
                    }
                }
                if (activeSecondLevelItem.length > 0) {
                    activeSecondLevelItem.addClass(usga.Navigation.MAIN_MENU_ACTIVE_CLASS).addClass(usga.Navigation.MAIN_MENU_ACTIVE_PAGE_MENU_ITEM_CLASS);
                    activeSubMenu = activeSecondLevelItem.closest(".main-menu__item_sub");
                    if (activeSubMenu.length > 0) {
                        activeSubMenu.addClass(this.options.showActivePageSubMenu ? usga.Navigation.MAIN_MENU_ACTIVE_PAGE_ITEM_SUBMENU_CLASS : usga.Navigation.MAIN_MENU_ACTIVE_PAGE_MENU_ITEM_CLASS);
                    }
                }
            } else {
                this.$element.find(".sub-main-menu__item__submenu__item_active, .sub-main-menu__item_active, .active").removeClass("sub-main-menu__item__submenu__item_active").removeClass("sub-main-menu__item_active").removeClass("active");
            }
        },
        layoutMenuItems: function() {
            this.toggleFlyMode();
            if (usga.supports.touch) {
                this.closeMoreMenu();
                this.closeSubMenus(true, true);
                this.closeSecondarySubmenus();
                this.removeActiveStateFromMenuItemsOnFirstLevel();
                this.highlightActivePageMenuItem();
                this.showActivePageSubMenu();
            }
            if (!this.isSmallScreen()) {
                if (!usga.supports.touch && this.isHamburgerOpened()) {
                    if (this.getOpenedHamburgerHeight() < $(window).height()) {
                        this.closeHamburgerMenu();
                    }
                }
            }
            if (this.isSmallScreen() || this.isMediumScreen()) {
                return;
            }
            var collection = [], showDropdown = false, paddingLeft = parseInt(this.$mainMenuContainer.css("padding-left")), menuContainerWidth = this.$mainMenuContainer.width(), $items = null;
            this.$dropdown.addClass("hide");
            this.restoreMainMenuItems();
            this.$dropdown.find("ul:first li:first").siblings().addBack().remove();
            $items = this.$mainMenu.find(">li").not(".main-menu__dropdown");
            $items.each(function() {
                var $item = $(this);
                if ($item.position().left - paddingLeft + $item.width() > menuContainerWidth) {
                    showDropdown = true;
                    return false;
                }
            });
            if (showDropdown) {
                this.$dropdown.removeClass("hide");
                var dropdownWidth = this.$dropdown.find(">a").width();
                this.$mainMenu.append(this.$dropdown.find("ul>li"));
                $items = this.$mainMenu.find(">li").not(".main-menu__dropdown");
                $items.each(function() {
                    var $item = $(this);
                    if ($item.position().left - paddingLeft + $item.width() > menuContainerWidth - dropdownWidth) {
                        collection.push(this);
                    }
                });
            }
            if (collection.length > 0) {
                var $collection = $(collection);
                this.backupMainMenuItems($collection);
                this.$dropdown.find(">ul").empty().append($collection);
                $collection.filter(".main-menu__item_sub").each(function() {
                    $(this).find("a:first")[0].href = "#";
                    $(this).find(".sub-main-menu__item_sub").each(function() {
                        $(this).find("a:first")[0].href = "#";
                    });
                });
                this.$dropdown.find(".active").each(function() {
                    $(this).removeClass(usga.Navigation.MAIN_MENU_ACTIVE_CLASS);
                });
                if (this.$dropdown.hasClass("mouse-on")) {
                    this.$dropdown.addClass("open");
                }
            } else {
                this.$dropdown.addClass("hide");
            }
            var openedMainSubMenu = this.$element.find("ul:first li:first").siblings("li").addBack().filter(".main-menu__item_sub." + usga.Navigation.MAIN_MENU_SUB_VISIBLE_CLASS + ":not(.main-menu__dropdown)");
            if (openedMainSubMenu.length !== 0) {
                this.putSubMenuItemsToSubMoreMenu(openedMainSubMenu);
            }
            if (!this.isSmallScreen() && !this.isMainMenuScrolled()) {
                if (!this.hasActiveMainMenuItem() && !this.hasHoveringMenuItemOnFirstLevel()) {
                    this.highlightActivePageMenuItem();
                    this.showActivePageSubMenu();
                }
            }
        },
        toggleOverlay: function(state) {
            var $overlay = $("body > .nav-overlay");
            if (!$overlay.length) {
                $overlay = $('<div class="nav-overlay"></div>').toggleClass("visible", false);
                $("body").append($overlay);
            }
            $overlay.toggleClass("visible", state);
        },
        toggleFlyMode: function() {
            if (!this.isSmallScreen() && !this.isMediumScreen()) {
                if (this.options.sticky) {
                    var flyPosition = this.isFlyPosition();
                    if (this.menuTimeout) {
                        clearTimeout(this.menuTimeout);
                        this.menuTimeout = undefined;
                    }
                    if (flyPosition) {
                        this.$element.addClass(this.flyClass);
                        $("body").addClass("scroll");
                    } else if (!flyPosition) {
                        this.$element.removeClass(this.flyClass);
                        $("body").removeClass("scroll");
                        if (!this.hasActiveMainMenuItem() && !this.hasHoveringMenuItemOnFirstLevel()) {
                            this.highlightActivePageMenuItem();
                            this.showActivePageSubMenu();
                        }
                    }
                }
            }
        },
        toggleNavigationBox: function($el) {
            var prevState = $el.hasClass("search-active"), newState = !prevState;
            this.navSearch.toggleSearch(newState);
            this.toggleOverlay(newState);
            $el.removeClass("search-" + (prevState ? "" : "in") + "active").addClass("search-" + (newState ? "" : "in") + "active");
            this.$element.find(".navigation__box").removeClass("active");
            this.$element.find(".navigation__toggle").removeClass("navigation__toggle_mod1");
            this.$element.removeClass("hamburger-mode");
        },
        setMouseHoverState: function($el, state) {
            if (!usga.supports.touch) {
                this.$element.find("mouse-on").removeClass("mouse-on");
                $el.toggleClass("mouse-on", state);
            }
        },
        removeActiveStateFromMenuItemsOnFirstLevel: function() {
            this.$element.find(".main-menu__inner > li.main-menu__item").removeClass(usga.Navigation.MAIN_MENU_ACTIVE_CLASS);
        },
        highlightActivePageMenuItem: function() {
            if (!this.isHamburgerOpened()) {
                var activeMenuItem = this.findActivePageMenuItem(true);
                activeMenuItem.addClass(usga.Navigation.MAIN_MENU_ACTIVE_CLASS);
                if (this.isPageHasLiveLeaderboardTicker()) {
                    activeMenuItem = this.findActivePageMenuItem(true, ":not(.sub-main-menu__item_sub)");
                    activeMenuItem.addClass(usga.Navigation.MAIN_MENU_ACTIVE_CLASS);
                }
            }
        },
        unhighlightActivePageMenuItem: function() {
            this.$element.find(".main-menu__inner > li." + usga.Navigation.MAIN_MENU_ACTIVE_PAGE_MENU_ITEM_CLASS).removeClass(usga.Navigation.MAIN_MENU_ACTIVE_CLASS);
        },
        findActivePageMenuItem: function(notWithinMoreMenu, exclude) {
            var element = this.$element.find("." + usga.Navigation.MAIN_MENU_ACTIVE_PAGE_MENU_ITEM_CLASS + (exclude ? exclude : ""));
            if (notWithinMoreMenu && this.isMoreMenu(element)) {
                return $([]);
            }
            return element[0] ? $(element[0]) : element;
        },
        showActivePageSubMenu: function() {
            if (this.$element.find("." + usga.Navigation.MAIN_MENU_ACTIVE_PAGE_ITEM_SUBMENU_CLASS).length === 0) {
                return;
            }
            if (!this.isHamburgerOpened() && !this.isSearchActive() && !this.isMainMenuScrolled() && this.options.showActivePageSubMenu) {
                var $submenu = this.$element.find("." + usga.Navigation.MAIN_MENU_ACTIVE_PAGE_ITEM_SUBMENU_CLASS + ":not(.sub-main-menu__item_sub):first");
                this.closeSubMenus(true);
                $submenu.addClass(usga.Navigation.MAIN_MENU_SUB_VISIBLE_CLASS);
                if (!this.isMoreMenu($submenu) && !this.isHamburgerOpened()) {
                    this.putSubMenuItemsToSubMoreMenu($submenu);
                }
            }
            if (this.isHamburgerOpened()) {
                this.$element.find(".sub-main-menu__item_sub." + usga.Navigation.MAIN_MENU_ACTIVE_PAGE_MENU_ITEM_CLASS).addClass(usga.Navigation.SUB_MAIN_MENU_SUB_VISIBLE_CLASS);
            }
        },
        hideActivePageSubMenu: function() {
            this.$element.find("." + usga.Navigation.MAIN_MENU_ACTIVE_PAGE_ITEM_SUBMENU_CLASS).removeClass(usga.Navigation.MAIN_MENU_SUB_VISIBLE_CLASS);
        },
        updateMenuItemsAccordingToAuthorizationState: function() {
            getAuthorizationData().done(this.proxy(function(membership) {
                var menuItems = this.$element.find(".sub-main-menu__item__submenu__item:has(a[data-role])"), autoRenew = usga.isObject(membership) && membership.autorenew;
                this.$element.toggleClass("login", usga.Gigya.isLoggedIn());
                menuItems.toggle(false);
                if (!usga.Gigya.isLoggedIn() || usga.Gigya.isFan() || usga.Gigya.isProspect()) {
                    menuItems.filter(":has([data-role~=default])").toggle(true);
                } else if (autoRenew) {
                    menuItems.filter(":has([data-role~=user-has-autorenew])").toggle(true);
                } else if (usga.Gigya.isExpiringFederatedUserWithinRenewalWindow() || usga.Gigya.isExpiredFederatedUser()) {
                    menuItems.filter(":has([data-role~=expired-federated]), :has([data-role~=expiring-federated-within-renewal-window])").toggle(true);
                } else if (usga.Gigya.isLapsedFederatedUser()) {
                    menuItems.filter(":has([data-role~=lapsed-federated])").toggle(true);
                } else if (usga.Gigya.isFederatedUserOutsideRenewalWindow()) {
                    menuItems.filter(":has([data-role~=federated-outside-renewal-window])").toggle(true);
                }
            }));
        },
        invokeAction: function(name) {
            if (this.isGigyaAction(name)) {
                var gigya = usga.Gigya;
                var gigyaActionMap = {
                    "sign-in": "login",
                    "sign-up": "register"
                };
                var action = gigya[name] || gigya[gigyaActionMap[name]];
                if (action) {
                    action.apply(gigya);
                }
            }
        },
        putSubMenuItemsToSubMoreMenu: function($submenu) {
            var $container = $submenu.find(".sub-main-menu__inner:first"), $moreContainer, containerWidth = Math.floor($container.width()), moreWidth, $items, $more = $submenu.find(".sub-main-menu__more-menu");
            $container.css("whiteSpace", "nowrap");
            if ($more.length === 0) {
                $more = this.createSubMoreMenu();
                $container.append($more);
            }
            $moreContainer = $more.find(".sub-main-menu__item__submenu");
            this.restoreSubMenuItems($submenu);
            $moreContainer.find("li:first").siblings().addBack().remove();
            $more.css("visibility", "hidden");
            moreWidth = $more.outerWidth(true);
            $items = $container.find("li:first").siblings(":not(.sub-main-menu__more-menu)").addBack();
            if (this.isSubMoreMenuApplicable(containerWidth, $items)) {
                var $movingItems, moveIndex, width = containerWidth - moreWidth;
                for (var i = 0, len = $items.length, calcWidth = 0; i < len; i++) {
                    var $item = $($items[i]);
                    calcWidth += Math.ceil($item.outerWidth(true));
                    if (calcWidth > width) {
                        moveIndex = i;
                        break;
                    }
                }
                if (moveIndex) {
                    $movingItems = $items.filter(":gt(" + (moveIndex - 1) + ")");
                    this.backupSubMenuItems($submenu, $movingItems);
                    $moreContainer.append($movingItems);
                    $moreContainer.find("li:first").siblings().addBack().each(function() {
                        var isSubMenu = $(this).hasClass("sub-main-menu__item_sub");
                        if (isSubMenu) {
                            $(this).find("a:first").attr("href", "#").prop("href", "#");
                        }
                        $(this).removeClass().addClass("sub-main-menu__item");
                        if (isSubMenu) {
                            $(this).addClass("sub-main-menu__item_sub");
                        }
                        $(this).find("a:first").removeClass().addClass("sub-main-menu__item__link");
                    });
                    $more.css("visibility", "");
                }
            } else {
                $more.remove();
            }
        },
        backupSubMenuItems: function($submenu, $items) {
            var $clonedItems = $items.clone(true, true);
            $submenu.data("cloned-items", $clonedItems);
        },
        restoreSubMenuItems: function($submenu) {
            var $more = $submenu.find(".sub-main-menu__more-menu"), $clonedItems = $submenu.data("cloned-items");
            if ($clonedItems) {
                if ($more.length > 0) {
                    $more.before($clonedItems);
                } else {
                    $submenu.find(".sub-main-menu__inner:first").append($clonedItems);
                }
            }
            $submenu.data("cloned-items", null);
        },
        createSubMoreMenu: function() {
            var $more = $("<li/>").addClass("sub-main-menu__item").addClass("sub-main-menu__item_sub").addClass("sub-main-menu__more-menu");
            $more.append($("<a />").addClass("sub-main-menu__item__link sub-main-menu__item__link__more-menu").prop("href", "#").html("More"));
            $more.append($("<ul />").addClass("sub-main-menu__item__submenu"));
            return $more;
        },
        getSubMoreMenu: function($el) {
            var $found = $el.is(".sub-main-menu__more-menu") ? $el : undefined;
            if (!$found) {
                $found = $el.closest(".sub-main-menu__more-menu").first();
            }
            return $found;
        },
        openHamburgerMenu: function() {
            this.$element.toggleClass("hamburger-mode", true);
            this.$element.find(".navigation__box").toggleClass("active", true);
            $el.toggleClass("navigation__toggle_mod1", true);
        },
        closeHamburgerMenu: function() {
            this.$element.find(".navigation__toggle").removeClass("navigation__toggle_mod1");
            this.$element.find(".navigation__box").removeClass("active");
            this.$element.removeClass("hamburger-mode");
            this.toggleOverlay(this.isSearchActive());
        },
        showSubMenu: function($menu, event) {
            if (this.isMoreMenu($menu)) {
                this.closeMoreMenuSubMenus($menu);
            } else {
                this.closeMoreMenu();
                if (event && this.isSubMenu($(event.target))) {
                    var subMenu = this.getSubMenu($(event.target)), subMoreMenu = subMenu.closest(".sub-main-menu__more-menu"), temporaryClass = "submenu-" + new Date().valueOf();
                    subMenu.addClass(temporaryClass);
                    subMoreMenu.addClass(temporaryClass);
                    this.closeSubMenus(this.isMoreMenu($menu), false, "." + temporaryClass);
                    subMenu.removeClass(temporaryClass);
                    subMoreMenu.removeClass(temporaryClass);
                } else {
                    this.closeSubMenus(this.isMoreMenu($menu), false);
                }
            }
            this.removeActiveStateFromMenuItemsOnFirstLevel();
            $menu.addClass(usga.Navigation.MAIN_MENU_SUB_VISIBLE_CLASS);
            if (!this.isMoreMenu($(event.target)) && !this.isSubMoreMenu($(event.target)) && !this.inSubMoreMenu($(event.target)) && !this.isHamburgerOpened()) {
                this.putSubMenuItemsToSubMoreMenu($menu);
            }
            if (!$menu.hasClass(usga.Navigation.MAIN_MENU_ACTIVE_PAGE_MENU_ITEM_CLASS)) {
                this.unhighlightActivePageMenuItem();
            }
            if (!$menu.hasClass(usga.Navigation.MAIN_MENU_ACTIVE_PAGE_ITEM_SUBMENU_CLASS)) {
                this.hideActivePageSubMenu();
            }
        },
        closeSubMenus: function(skipPreActivated, hideAll, skipSubMenu) {
            this.$mainMenu.find("." + usga.Navigation.MAIN_MENU_SUB_VISIBLE_CLASS + (skipPreActivated && !hideAll ? ":not(." + usga.Navigation.MAIN_MENU_ACTIVE_PAGE_ITEM_SUBMENU_CLASS + ")" : "")).removeClass(usga.Navigation.MAIN_MENU_SUB_VISIBLE_CLASS);
            this.$mainMenu.find("." + usga.Navigation.SUB_MAIN_MENU_SUB_VISIBLE_CLASS + skipSubMenu ? ":not(" + skipSubMenu + ")" : "").removeClass(usga.Navigation.SUB_MAIN_MENU_SUB_VISIBLE_CLASS);
            if (!skipPreActivated) {
                this.highlightActivePageMenuItem();
                this.showActivePageSubMenu();
            }
        },
        getSubMenu: function($el) {
            var $found = $el.is(".sub-main-menu__item_sub") ? $el : undefined;
            if (!$found) {
                $found = $el.closest(".sub-main-menu__item_sub").first();
            }
            return $found;
        },
        showSecondarySubmenu: function($menu) {
            this.closeSecondarySubmenus();
            $menu.toggleClass("secondary_main-menu__item_sub_mod1", true);
        },
        closeSecondarySubmenus: function() {
            if (this.secondarySubMenuTimer) {
                clearInterval(this.secondarySubMenuTimer);
                this.secondarySubMenuTimer = null;
            }
            this.$secondaryMenu.find(".secondary_main-menu__item_sub").toggleClass("secondary_main-menu__item_sub_mod1", false);
        },
        toggleTertiaryMenu: function($item, evt, state) {
            evt.preventDefault();
            if ($item.hasClass("sub-main-menu__more-menu")) {
                $item.find("." + usga.Navigation.SUB_MAIN_MENU_SUB_VISIBLE_CLASS).removeClass(usga.Navigation.SUB_MAIN_MENU_SUB_VISIBLE_CLASS);
            }
            if (state) {
                $item.siblings("." + usga.Navigation.SUB_MAIN_MENU_SUB_VISIBLE_CLASS).removeClass(usga.Navigation.SUB_MAIN_MENU_SUB_VISIBLE_CLASS);
            }
            $item.toggleClass(usga.Navigation.SUB_MAIN_MENU_SUB_VISIBLE_CLASS, state);
        },
        openMoreMenu: function($more, event) {
            $more.find(".sub-main-menu__inner").css("whiteSpace", "");
            $more.addClass("open");
            this.onMoreMenuOpen($more, event);
        },
        closeMoreMenu: function($more, event) {
            this.$dropdown.removeClass("open");
            this.highlightActivePageMenuItem();
            this.showActivePageSubMenu();
        },
        backupMainMenuItems: function($items) {
            var $mainmenu = this.$element.find("ul:first"), $clonedItems = $items.clone();
            $mainmenu.data("cloned-items", $clonedItems);
        },
        restoreMainMenuItems: function() {
            var $mainmenu = this.$element.find("ul:first"), $clonedItems = $mainmenu.data("cloned-items");
            if ($clonedItems) {
                this.$dropdown.before($clonedItems);
            }
            $mainmenu.data("cloned-items", null);
        },
        openActivePageItemSubmenuInMoreMenu: function($more, event) {
            $more.find("." + usga.Navigation.MAIN_MENU_ACTIVE_PAGE_ITEM_SUBMENU_CLASS).addClass(usga.Navigation.MAIN_MENU_SUB_VISIBLE_CLASS);
        },
        closeMoreMenuSubMenus: function($moreItemSubmenu) {
            this.$dropdown.find("." + usga.Navigation.MAIN_MENU_SUB_VISIBLE_CLASS).removeClass(usga.Navigation.MAIN_MENU_SUB_VISIBLE_CLASS);
            if ($moreItemSubmenu) {
                $moreItemSubmenu.find("." + usga.Navigation.SUB_MAIN_MENU_SUB_VISIBLE_CLASS).removeClass(usga.Navigation.SUB_MAIN_MENU_SUB_VISIBLE_CLASS);
            }
        },
        removeActiveStateFromMenuItemsInMoreMenu: function() {
            var $items = this.$dropdown.find(".main-menu__dropdown_menu > li");
            $items.filter("." + usga.Navigation.MAIN_MENU_ACTIVE_CLASS).removeClass(usga.Navigation.MAIN_MENU_ACTIVE_CLASS);
            $items.filter("." + usga.Navigation.MAIN_MENU_SUB_VISIBLE_CLASS).removeClass(usga.Navigation.MAIN_MENU_SUB_VISIBLE_CLASS);
        },
        checkDoubleTap: function(element) {
            var elementUid, key;
            if (!this._elementUidTap) {
                this._elementUidTap = 1;
            }
            if (!element.data("element-uid-tap")) {
                element.data("element-uid-tap", this._elementUidTap);
                this._elementUidTap++;
            }
            elementUid = element.data("element-uid-tap");
            key = "_lastTap" + elementUid;
            if (usga.supports.touch) {
                if (this[key]) {
                    if (new Date().valueOf() - this[key] <= 600) {
                        return true;
                    }
                }
                this[key] = new Date().valueOf();
            }
            return false;
        },
        onDocumentReady: function() {
            var $navSpacer = this.$element.next(".navigation-spacer");
            if (this.options.sticky) {
                if (!$navSpacer.length) {
                    $navSpacer = $('<div class="navigation-spacer"></div>').insertAfter(this.$element);
                }
                if (this.options.cover || $("body > .wrapper").hasClass("top-nav-overflow")) {
                    $navSpacer.addClass("navigation-spacer_cover");
                }
            } else {
                $navSpacer.remove();
            }
            usga.Gigya.onUser(this.proxy(this.updateMenuItemsAccordingToAuthorizationState));
            this.layoutMenuItems();
            this.$element.addClass(usga.Navigation.MAIN_MENU_ANIMATABLE_CLASS);
        },
        onWindowLoad: function() {
            this.layoutMenuItems();
        },
        onGigyaActionsReady: function() {
            if (this.invokableAction) {
                this.invokeAction(this.invokableAction);
                this.invokableAction = false;
            }
        },
        onWindowScroll: function() {
            if (usga.device.touch && this.options.sticky && this.isFlyPosition()) {
                this.closeSubMenus(true, true);
                this.closeMoreMenu();
            } else if (!(this.isSmallScreen() || this.isMediumScreen())) {
                if (this.options.sticky) {
                    this.toggleFlyMode();
                    if (this.isFlyPosition() && !this.hasHoveringMenuItemOnFirstLevel()) {
                        this.unhighlightActivePageMenuItem();
                        this.hideActivePageSubMenu();
                    }
                }
            }
            if (this.menuTimeout) {
                clearTimeout(this.menuTimeout);
                this.menuTimeout = undefined;
            }
            this.menuTimeout = window.setTimeout(this.proxy(function() {
                clearTimeout(this.menuTimeout);
                this.menuTimeout = undefined;
                this.layoutMenuItems();
            }), this.menuLayoutDelay);
        },
        onWindowResize: function() {
            if (this.resizeTimeOut) {
                window.clearTimeout(this.resizeTimeOut);
                this.resizeTimeOut = null;
            }
            this.resizeTimeOut = window.setTimeout($.proxy(this.layoutMenuItems, this), this.menuLayoutDelay);
        },
        onMoreMenuOpen: function($more, event, withinMoreMenu) {
            this.unhighlightActivePageMenuItem();
            this.hideActivePageSubMenu();
            if (!withinMoreMenu) {
                this.openActivePageItemSubmenuInMoreMenu($more, event);
            }
        },
        onOutsideClick: function(event) {
            if (!($(event.target).closest(".navigation__box").length !== 0 || $(event.target).is(".navigation__box"))) {
                if (!this.$element.hasClass("hamburger-mode")) {
                    this.removeActiveStateFromMenuItemsInMoreMenu();
                    this.closeSubMenus();
                    this.closeMoreMenu(this.$dropdown);
                }
            }
            if ($(event.target).is(".nav-overlay") && this.isHamburgerOpened()) {
                this.closeHamburgerMenu();
            }
        },
        onSubMenuItemWithSubMenuClick: function(element, evt) {
            var target = $(evt.target);
            if (element.hasClass("sub-main-menu__item_sub")) {
                if (!usga.supports.touch && this.hasLink(element)) {
                    return true;
                }
                if (this.checkDoubleTap(element)) {
                    return true;
                }
                this.toggleTertiaryMenu(element, evt, !element.hasClass(usga.Navigation.SUB_MAIN_MENU_SUB_VISIBLE_CLASS));
            }
        },
        onSubMenuItemWithSubMenuHover: function(on, element, evt) {
            if (this.isHamburgerOpened() || this.isMoreMenu($(evt.target))) {
                return true;
            }
            if (element.hasClass("sub-main-menu__item_sub")) {
                this.toggleTertiaryMenu(element, evt, on);
            }
        },
        ".navigation__toggle click": function($el) {
            var newState = !$el.hasClass("navigation__toggle_mod1");
            if (newState) {
                this.$element.removeClass(this.flyClass);
                var mainSubMenus = this.$element.find("ul:first li:first").siblings("li").addBack().filter(".main-menu__item_sub:not(.main-menu__dropdown)");
                if (mainSubMenus.length !== 0) {
                    mainSubMenus.each(this.proxy(function(i, el) {
                        this.restoreSubMenuItems($(el));
                        $(el).find(".sub-main-menu__more-menu").remove();
                    }));
                }
            }
            this.closeSecondarySubmenus();
            this.removeActiveStateFromMenuItemsInMoreMenu();
            this.restoreMainMenuItems();
            this.$dropdown.find("ul:first li:first").siblings().addBack().remove();
            this.$element.find(".sub-main-menu__more-menu").remove();
            this.$element.toggleClass("hamburger-mode", newState);
            this.$element.find(".navigation__box").toggleClass("active", newState);
            $el.toggleClass("navigation__toggle_mod1", newState);
            this.highlightActivePageMenuItem();
            this.showActivePageSubMenu();
            this.toggleOverlay(this.$element.hasClass("hamburger-mode"));
            this.element.find(".navigation__search").removeClass("search-active").addClass("search-inactive");
            this.element.find(".secondary_main-menu__item__link.search").removeClass("search-active").addClass("search-inactive");
            this.navSearch.toggleSearch(false);
            if (!newState) {
                this.layoutMenuItems();
            }
        },
        "a[data-action] click": function($el, event) {
            var action = $(event.currentTarget).data("action");
            event.preventDefault();
            if (!this.isGigyaAction(action) || usga.Gigya.isReady()) {
                this.invokeAction(action);
            } else {
                this.invokableAction = action;
            }
        },
        ".navigation__search click": function($el, event) {
            this.element.find(".secondary_main-menu__item__link.search").removeClass("search-inactive").addClass("search-active");
            this.toggleNavigationBox($el);
        },
        ".main-menu__item__link click": function($el, evt) {
            var $item = $el.parent();
            if (this.isSubMenuItem($item) && this.checkDoubleTap($el)) {
                return true;
            }
            if (!this.isSubMenuItem($item) || !usga.supports.touch && this.hasLink($el) && !this.isHamburgerOpened()) {
                return;
            } else {
                evt.preventDefault();
            }
            if (this.isSmallScreen() || this.isMediumScreen()) {
                this.closeSecondarySubmenus();
                evt.preventDefault();
            }
            if (this.isHamburgerOpened() && (usga.device.ios || usga.device.android) && !(this.isSmallScreen() || this.isMediumScreen())) {
                evt.preventDefault();
                this.$mainMenu.find(".sub-main-menu__item__submenu").removeClass(usga.Navigation.SUB_MAIN_MENU_SUB_VISIBLE_CLASS);
            }
            if ($item.hasClass(usga.Navigation.MAIN_MENU_SUB_VISIBLE_CLASS)) {
                if (usga.supports.touch) {
                    this.removeActiveStateFromMenuItemsOnFirstLevel();
                }
                if (this.isMoreMenu($el)) {
                    this.closeSubMenus(true, true);
                } else {
                    this.closeSubMenus(!usga.supports.touch);
                }
            } else {
                this.showSubMenu($item, evt);
            }
        },
        ".main-menu__inner > li.main-menu__item:not(.main-menu__item_sub) mouseenter": function($el, evt) {
            this.setMouseHoverState($el, true);
            if (!this.isSmallScreen() && !this.isMediumScreen() && !this.isMoreMenu($(evt.target)) && $(evt.target).closest(".main-menu__item_sub").length === 0) {
                if (this.subMenuTimer) {
                    clearInterval(this.subMenuTimer);
                    this.subMenuTimer = null;
                }
                this.closeMoreMenu();
                this.closeSubMenus();
                this.removeActiveStateFromMenuItemsOnFirstLevel();
                this.hideActivePageSubMenu();
                this.unhighlightActivePageMenuItem();
                if (!$el.hasClass("main-menu__dropdown") && !$el.hasClass("main-menu__item_sub")) {
                    $el.addClass(usga.Navigation.MAIN_MENU_ACTIVE_CLASS);
                }
            }
        },
        ".main-menu__item:not(.main-menu__item_sub).active mouseleave": function($el, evt) {
            this.setMouseHoverState($el, false);
            if (!this.isSmallScreen() && !this.isMoreMenu($(evt.target)) && $(evt.target).closest(".main-menu__item_sub").length === 0) {
                $el.removeClass(usga.Navigation.MAIN_MENU_ACTIVE_CLASS);
                this.highlightActivePageMenuItem();
                this.showActivePageSubMenu();
            }
        },
        ".main-menu__item_sub mouseenter": function($el, evt) {
            this.setMouseHoverState($el, true);
            if (!(this.isSmallScreen() || this.isMediumScreen()) && !this.isMoreMenu($(evt.target)) && !this.inSubMoreMenu($(evt.target))) {
                if (this.moreMenuTimer) {
                    clearTimeout(this.moreMenuTimer);
                    this.moreMenuTimer = null;
                }
                if (usga.device.ios || usga.device.android) {
                    return;
                }
                if (this.subMenuTimer) {
                    clearInterval(this.subMenuTimer);
                    this.subMenuTimer = null;
                }
                this.showSubMenu($el, evt);
            }
        },
        ".main-menu__item_sub mouseleave": function($el, evt) {
            this.setMouseHoverState($el, false);
            if (!(this.isSmallScreen() || this.isMediumScreen()) && !this.isMoreMenu($(evt.target))) {
                if (this.subMenuTimer) {
                    clearInterval(this.subMenuTimer);
                    this.subMenuTimer = null;
                }
                if (usga.device.ios || usga.device.android) {
                    return;
                }
                this.subMenuTimer = setTimeout(this.proxy(this.closeSubMenus), !this.isMoreMenu($(evt.relatedTarget)) ? this.options.moreMenuDissapearDelay : this.options.submenuDissapearDelay);
            }
        },
        ".sub-main-menu__item mouseenter": function(element, evt) {
            if (this.subMenuTimer) {
                clearTimeout(this.subMenuTimer);
                this.subMenuTimer = null;
            }
            if (element.is(".sub-main-menu__item_sub") && !this.inSubMoreMenu($(evt.target))) {
                this.onSubMenuItemWithSubMenuHover(true, element, evt);
                evt.stopPropagation();
            }
        },
        ".sub-main-menu__item mouseleave": function(element, evt) {
            if (element.is(".sub-main-menu__item_sub") && !this.inSubMoreMenu($(evt.target))) {
                if (this.subMenuTimer) {
                    clearTimeout(this.subMenuTimer);
                    this.subMenuTimer = null;
                }
                this.subMenuTimer = setTimeout(this.proxy(function() {
                    this.onSubMenuItemWithSubMenuHover(false, element, evt);
                }), this.options.submenuDissapearDelay);
            }
        },
        ".sub-main-menu__item click": function(element, evt) {
            var target = $(evt.target);
            if (target.is("li.sub-main-menu__item__submenu__item") || target.is("a.sub-main-menu__item__submenu__item__link")) {
                return;
            }
            this.onSubMenuItemWithSubMenuClick(element, evt);
            evt.stopPropagation();
        },
        ".main-menu__dropdown-toggle click": function($el, event) {
            var $more = $el.parent();
            event.preventDefault();
            this.closeSubMenus(true, true);
            if ($more.hasClass("open")) {
                this.closeMoreMenu();
            } else {
                this.openMoreMenu($more, event);
            }
        },
        ".main-menu__dropdown mouseenter": function($el, event) {
            this.setMouseHoverState($el, true);
            if (this.subMenuTimer) {
                clearTimeout(this.subMenuTimer);
            }
            if (this.moreMenuTimer) {
                clearTimeout(this.moreMenuTimer);
                this.moreMenuTimer = null;
            }
            if (usga.device.ios || usga.device.android) {
                return;
            }
            var $target = $(event.target), withinMoreMenu = $el.hasClass("open");
            $el.find(".sub-main-menu__inner").css("whiteSpace", "");
            $el.addClass("open");
            $el.find(".sub-main-menu__more-menu").remove();
            if (!(this.isMoreMenu($target) && ($target.hasClass("main-menu__item_sub") || $target.closest(".main-menu__item_sub").length > 0))) {
                this.closeSubMenus(true);
                this.closeMoreMenuSubMenus();
            }
            this.onMoreMenuOpen($el, event, withinMoreMenu);
        },
        ".main-menu__dropdown mouseleave": function($el, evt) {
            this.setMouseHoverState($el, false);
            if (usga.device.ios || usga.device.android) {
                return;
            }
            if (this.moreMenuTimer) {
                clearTimeout(this.moreMenuTimer);
                this.moreMenuTimer = null;
            }
            var delay = this.options.submenuDissapearDelay;
            if (!this.isMoreMenu($(evt.relatedTarget))) {
                delay = this.options.moreMenuDissapearDelay;
            }
            this.moreMenuTimer = setTimeout(this.proxy(function() {
                $el.removeClass("open");
                this.closeSubMenus();
            }), delay);
        },
        ".main-menu__dropdown .main-menu__item mouseenter": function($el, evt) {
            if (this.isMoreMenu($(evt.target))) {
                if (this.moreMenuTimer) {
                    clearTimeout(this.moreMenuTimer);
                    this.moreMenuTimer = null;
                }
            }
        },
        ".main-menu__dropdown .main-menu__item_sub mouseleave": function($el, evt) {
            if (this.moreMenuTimer) {
                clearTimeout(this.moreMenuTimer);
                this.moreMenuTimer = null;
            }
            var delay = this.options.submenuDissapearDelay;
            if (!this.isMoreMenu($(evt.relatedTarget))) {
                delay = this.options.moreMenuDissapearDelay;
            }
            this.moreMenuTimer = setTimeout(this.proxy(this.closeSubMenus), delay);
        },
        ".secondary_main-menu__item__link click": function($el) {
            var parent = $el.parent(), newState = false;
            if (parent.hasClass("secondary_main-menu__item_sub") && (this.isSmallScreen() || this.isMediumScreen())) {
                newState = !parent.hasClass("secondary_main-menu__item_sub_mod1");
                this.closeSubMenus(true, true);
                this.closeSecondarySubmenus();
                parent.toggleClass("secondary_main-menu__item_sub_mod1", newState);
            }
        },
        ".secondary_main-menu__item_sub mouseenter": function($el) {
            if (!(this.isSmallScreen() || this.isMediumScreen()) && !this.isSearchActive()) {
                this.showSecondarySubmenu($el);
            }
        },
        ".secondary_main-menu__item_sub mouseleave": function($el, event) {
            if (!(this.isSmallScreen() || this.isMediumScreen()) && !this.isSearchActive()) {
                if (this.secondarySubMenuTimer) {
                    this.closeSecondarySubmenus();
                } else {
                    var delay = this.options.submenuDissapearDelay;
                    this.secondarySubMenuTimer = setTimeout(this.proxy(this.closeSecondarySubmenus), delay);
                }
            }
        },
        ".secondary_main-menu__item_sub .secondary_main-menu__item__submenu:first mouseenter": function($el) {
            if (!(this.isSmallScreen() || this.isMediumScreen()) && !this.isSearchActive()) {
                this.showSecondarySubmenu($el.closest(".secondary_main-menu__item_sub"));
            }
        },
        ".secondary_main-menu__item_sub .secondary_main-menu__item__submenu:first mouseleave": function($el) {
            if (!(this.isSmallScreen() || this.isMediumScreen()) && !this.isSearchActive()) {
                if (this.secondarySubMenuTimer) {
                    this.closeSecondarySubmenus();
                } else {
                    var delay = !$el.find(".secondary_main-menu__item__submenu:gt(0)")[0] ? 10 : this.options.submenuDissapearDelay;
                    this.secondarySubMenuTimer = setTimeout(this.proxy(this.closeSecondarySubmenus), delay);
                }
            }
        },
        ".secondary_main-menu__item__link.search click": function($el, event) {
            var isHamburgerOpened = this.isHamburgerOpened();
            this.closeSubMenus();
            this.closeSecondarySubmenus();
            this.element.find(".navigation__search").removeClass("search-inactive").addClass("search-active");
            this.toggleNavigationBox($el);
            if (isHamburgerOpened) {
                usga.scrollTo(this.$element);
            }
            if (this.moreMenuTimer) {
                clearTimeout(this.moreMenuTimer);
                this.moreMenuTimer = null;
            }
            if ($el.hasClass("search-active")) {
                this.hideActivePageSubMenu();
            } else {
                this.showActivePageSubMenu();
            }
        }
    });
})();

usga.Footer = usga.BaseCloudinaryModule.extend({
    socialApiLoaded: false,
    onDocumentReady: function() {
        this.$element.find(".footer__list__item_gmod1 :link").each(function(i, link) {
            var newHref = $(link).data("href") || $(link).attr("href");
            if (usga.device.ios && $(link).data("href-ios")) {
                newHref = $(link).data("href-ios");
            } else if (usga.device.android && $(link).data("href-android")) {
                newHref = $(link).data("href-android");
            }
            $(link).attr("href", newHref);
        });
    },
    loadSocialAPI: function() {
        if (!this.socialApiLoaded && !this.isSmallScreen()) {
            this.socialApiLoaded = true;
            $.getScript("//apis.google.com/js/platform.js");
            $.getScript("//platform.linkedin.com/in.js");
        }
    },
    onFirstShow: function() {
        this._super();
        this.loadSocialAPI();
    },
    onLayout: function() {
        this._super();
        if (this.loaded) {
            this.loadSocialAPI();
        }
    }
});