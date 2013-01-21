(function() {
  var get = Ember.get, set = Ember.set;

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

  Ember.String.lpad = function(str, len, pad) {
    pad = pad || ' ';
    str = str.toString();
    while (str.length < len) { str = pad + str; }
    return str;
  };
  Ember.String.rpad = function(str, len, pad) {
    pad = pad || ' ';
    str = str.toString();
    while (str.length < len) { str = str + pad; }
    return str;
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
      return format.replace(/%([a-z%])/gi, function(_, s) {
        switch (s) {
          case 'Y':
            return get(date, 'year');
          case 'C':
            return parseInt(get(date, 'year') / 100);
          case 'y':
            return get(date, 'year') % 100;
          case 'm':
            return get(date, 'month') + 1;
          case 'B':
            return Ember.String.loc(Ember.Date.MONTHS[get(date, 'month')]);
          case 'b':
            return Ember.String.loc(Ember.Date.MONTHS_ABBR[get(date, 'month')]);
          case 'd':
            return get(date, 'day');
          case 'e':
            return Ember.String.lpad(get(date, 'day'), 2, '0');
          case 'j':
            return null;
          case 'H':
            return Ember.String.lpad(get(date, 'hour'), 2, '0');
          case 'k':
            return Ember.String.lpad(get(date, 'hour'), 2, ' ');
          case 'I':
            return Ember.String.lpad(twelvehour(get(date, 'hour')), 2, '0');
          case 'l':
            return Ember.String.lpad(twelvehour(get(date, 'hour')), 2, ' ');
          case 'P':
            return Ember.String.loc(get(date, 'hour') > 12 ? 'PM' : 'AM').toLowerCase();
          case 'p':
            return Ember.String.loc(get(date, 'hour') > 12 ? 'PM' : 'AM').toUpperCase();
          case 'M':
            return Ember.String.lpad(get(date, 'minute'), 2, '0');
          case 'S':
            return Ember.String.lpad(get(date, 'second'), 2, '0');
          case 'L':
            return Ember.String.lpad(get(date, 'millisecond'), 3, '0');
          case 'z':
            var tz = get(date, 'timezone');
            return tz === 0 ? 'GMT' : (tz < 0 ? tz : '+' + tz);
          case 'A':
            return Ember.String.loc(Ember.Date.WEEKDAYS[get(date, 'dayOfWeek')]);
          case 'a':
            return Ember.String.loc(Ember.Date.WEEKDAYS_ABBR[get(date, 'dayOfWeek')]);
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
      });
    }
  });

  var mappings = {
    'year': 'FullYear',
    'month': 'Month',
    'day': 'Date',
    'hour': 'Hours',
    'minute': 'Minutes',
    'second': 'Seconds',
    'millisecond': 'Milliseconds'
  }, definitions = {};

  for (var name in mappings) {
    var method = mappings[name],
        pluralName = name + 's';

    mappings[pluralName] = mappings[name];

    definitions[name] = Ember.computed(function(key, value) {
      var methodName = mappings[key];

      if (arguments.length === 2) {
        this['set' + methodName](value);
      }

      return this['get' + methodName]();
    }).property().volatile();
    definitions[pluralName] = Ember.alias(name);
  }

  Ember.Date.reopen(definitions);

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
