(function() {
  var get = Ember.get, set = Ember.set, loc = Ember.String.loc;

  var add = function(date, i, gran) {
    var val = get(date, gran);
    set(date, gran, val + i);
  };

  var subtract = function(date, i, gran) {
    var val = get(date, gran);
    set(date, gran, val - i);
  };

  var twelvehour = function(hours) {
    return hours > 12 ? hours - 12 : hours;
  };

  var lpad = function(str, len, pad) {
    pad = pad || ' ';
    str = str.toString();
    while (str.length < len) { str = pad + str; }
    return str;
  };

  var rpad = function(str, len, pad) {
    pad = pad || ' ';
    str = str.toString();
    while (str.length < len) { str = str + pad; }
    return str;
  };

  Ember.String.lpad = lpad;
  Ember.String.rpad = rpad;

  var fmt = function(date, s) {
    switch (s) {
      case 'Y':
        return get(date, 'year');
      case 'C':
        return parseInt(get(date, 'year') / 100);
      case 'y':
        return get(date, 'year') % 100;
      case 'm':
        return lpad(get(date, 'month') + 1, 2, '0');
      case 'B':
        return loc(Ember.Date.MONTHS[get(date, 'month')]);
      case 'b':
        return loc(Ember.Date.MONTHS_ABBR[get(date, 'month')]);
      case 'd':
        return get(date, 'day');
      case 'e':
        return date.fmt('%0d');
      case 'j':
        return null;
      case 'H':
        return lpad(get(date, 'hour'), 2, '0');
      case 'k':
        return date.fmt('%_H')
      case 'I':
        return lpad(twelvehour(get(date, 'hour')), 2, '0');
      case 'l':
        return date.fmt('%_I');
      case 'P':
        return loc(get(date, 'hour') > 12 ? 'PM' : 'AM').toLowerCase();
      case 'p':
        return date.fmt('%^P');
      case 'M':
        return lpad(get(date, 'minute'), 2, '0');
      case 'S':
        return lpad(get(date, 'second'), 2, '0');
      case 'L':
        return lpad(get(date, 'millisecond'), 3, '0');
      case 'z':
        var tz = get(date, 'timezone');
        return tz === 0 ? 'GMT' : (tz < 0 ? tz : '+' + tz);
      case 'A':
        return loc(Ember.Date.WEEKDAYS[get(date, 'dayOfWeek')]);
      case 'a':
        return loc(Ember.Date.WEEKDAYS_ABBR[get(date, 'dayOfWeek')]);
      case 'u':
        var dow = get(date, 'dayOfWeek');
        if (dow === 0) { dow = 7; }
        return dow;
      case 'w':
        return get(date, 'dayOfWeek');
      case 's':
        return date.getTime();

      case 'n':
        return "\n";
      case 't':
        return "\t";
      case '%':
        return '%';

      case 'c':
        return date.fmt(date, '%a %b %e %T %Y');
      case 'D':
      case 'x':
        return date.fmt(date, '%m/%d/%y');
      case 'F':
        return date.fmt(date, '%Y-%m-%d');
      case 'v':
        return date.fmt(date, '%e-%^b-%Y');
      case 'R':
        return date.fmt(date, '%I:%M:%S %p');
      case 'T':
      case 'X':
        return date.fmt(date, '%H:%M');
    }
  };

  var stripRegexp = /^[0 ]+/;
  var mod = function(s, m, w) {
    var i;

    s = s.toString();
    if (!w) { w = 2; }

    for (i = 0; i < m.length; ++i) {
      switch (m[i]) {
        case '^':
          s = s.toUpperCase();
          break;
        case '0':
          s = lpad(s.replace(stripRegexp, ''), w, '0');
          break;
        case '_':
          s = lpad(s.replace(stripRegexp, ''), w, ' ');
          break;
        case '-':
          s = s.replace(stripRegexp, '');
          break;
      }
    }
    return s;
  };

  var propertyMethod = function(method) {
    return Ember.computed(function(name, value) {
      if (arguments.length === 2) {
        this['set' + method](value);
      }

      return this['get' + method]();
    }).property().volatile();
  };

  Ember.Date = Ember.Mixin.create(Ember.Observable, Ember.Copyable, {
    timezone: Ember.computed(function() {
      var offset = this.getTimezoneOffset(),
          hours = Math.ceil(offset / -60),
          minutes = offset % -60;

      return hours * 100 + minutes;
    }).property(),

    dayOfWeek: Ember.computed(function(name, value) {
      var dow = this.getDay();

      if (arguments.length === 2) {
        this.add(value - dow, 'day');
        dow = this.getDay();
      }

      return dow;
    }).property(),

    time: Ember.computed(function(name, value) {
      if (arguments.length === 2) {
        this.setTime(value);
      }

      return this.getTime();
    }).property().volatile(),

    add: function(i, gran) {
      add(this, i, gran);
      return this;
    },

    subtract: function(i, gran) {
      subtract(this, i, gran);
      return this;
    },

    beginningOfDay: function() {
      return this.copy().setProperties({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
    },

    beginningOfWeek: function() {
      var date = this.beginningOfDay();
      set(date, 'dayOfWeek', 0);
      return date;
    },

    beginningOfMonth: function() {
      var date = this.beginningOfDay();
      set(date, 'day', 1);
      return date;
    },

    beginningOfYear: function() {
      var date = this.beginningOfMonth();
      set(date, 'month', 0);
      return date;
    },

    endOfDay: function() {
      return this.copy().setProperties({
        hour: 23,
        minute: 59,
        second: 59,
        millisecond: 999
      });
    },

    endOfWeek: function() {
      var date = this.endOfDay();
      set(date, 'dayOfWeek', 6);
      return date;
    },

    endOfMonth: function() {
      var date = this.endOfDay();
      add(date, 1, 'month');
      set(date, 'day', 0);
      return date;
    },

    endOfYear: function() {
      var date = this.copy();
      set(date, 'month', 11);
      return date.endOfMonth();
    },

    get: function(key) {
      if (key === 'timezoneOffset') {
        return this.getTimezoneOffset();
      } else {
        return this._super(key);
      }
    },

    copy: function() {
      return Ember.D(new Date(this));
    },

    fmt: function(format) {
      var date = this;

      format = format.toString();
      return format.replace(/%([^a-z1-9]*)([1-9][0-9]*)?([a-z%])/gi, function(_, m, w, s) {
        return mod(fmt(date, s), m, w);
      });
    },


    year: propertyMethod('FullYear'),
    month: propertyMethod('Month'),
    day: propertyMethod('Date'),
    hour: propertyMethod('Hours'),
    minute: propertyMethod('Minutes'),
    second: propertyMethod('Seconds'),
    millisecond: propertyMethod('Milliseconds'),

    years: Ember.computed.alias('year'),
    months: Ember.computed.alias('month'),
    days: Ember.computed.alias('day'),
    hours: Ember.computed.alias('hour'),
    minutes: Ember.computed.alias('minute'),
    seconds: Ember.computed.alias('second'),
    milliseconds: Ember.computed.alias('millisecond')
  });

  Ember.Date.MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  Ember.Date.MONTHS_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  Ember.Date.WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  Ember.Date.WEEKDAYS_ABBR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  var methods = ['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds', 'Milliseconds'];
  var getDate = function() {
    var date = arguments[0], i, m, v;

    if (!(date instanceof Date)) {
      date = new Date();
      for (i = 0; i < arguments.length; ++i) {
        v = arguments[i];
        if ((m = methods[i]) && v !== null && v !== undefined) {
          date['set' + m](v);
        }
      }
    }

    return date;
  };

  Ember.D = function() {
    return Ember.Date.apply(getDate.apply(null, arguments));
  };

  if (Ember.EXTEND_PROTOTYPES === true || Ember.EXTEND_PROTOTYPES.Date) {
    Ember.Date.apply(Date.prototype);

    Ember.D = function(date) {
      return getDate.apply(null, arguments);
    };
  }
})();
