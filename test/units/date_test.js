var get = Ember.get, set = Ember.set;

module("Ember.Date");

test("`D` helper returns given date object", function() {
  expect(1);

  var date = new Date();
  equal(Ember.D(date), date)
});

test("`D` returns new date object when no arguments given", function() {
  expect(1);

  var date = Ember.D();
  ok(date instanceof Date);
});

test("`D` returns new date object set with the given year", function() {
  expect(1);

  var date = Ember.D(2001);
  equal(date.getFullYear(), 2001);
});

test("`D` returns new date object set with the given month", function() {
  expect(1);

  var date = Ember.D(2001, 3);
  equal(date.getMonth(), 3);
});

test("`D` returns new date object set with the given day", function() {
  expect(1);

  var date = Ember.D(2001, 3, 14);
  equal(date.getDate(), 14);
});

test("`D` returns new date object set with the given hour", function() {
  expect(1);

  var date = Ember.D(2001, 3, 14, 9);
  equal(date.getHours(), 9);
});

test("`D` returns new date object set with the given minute", function() {
  expect(1);

  var date = Ember.D(2001, 3, 14, 9, 42);
  equal(date.getMinutes(), 42);
});

test("`D` returns new date object set with the given second", function() {
  expect(1);

  var date = Ember.D(2001, 3, 14, 9, 42, 23);
  equal(date.getSeconds(), 23);
});

test("`D` returns new date object set with the given millisecond", function() {
  expect(1);

  var date = Ember.D(2001, 3, 14, 9, 42, 23, 678);
  equal(date.getMilliseconds(), 678);
});

test("`D` returns new date object from a string", function() {
  expect(7);

  var date = Ember.D('2013/04/06 9:21');

  equal(date.getFullYear(), 2013);
  equal(date.getMonth(), 3);
  equal(date.getDate(), 6);
  equal(date.getHours(), 9);
  equal(date.getMinutes(), 21);
  equal(date.getSeconds(), 0);
  equal(date.getMilliseconds(), 0);
});

test("`timezone` returns a formatted integer where first 2 digits are hours and last 2 are minutes", function() {
  expect(1);

  var date = Ember.D(),
      timezone = date.get('timezone'),
      hours = timezone / 100,
      minutes = timezone % 100,
      actual = -hours * 60 + minutes,
      expected = date.getTimezoneOffset();

  equal(actual, expected);
});

test("`dayOfWeek` returns integer-based day of the week", function() {
  expect(1);

  var date = Ember.D();

  equal(date.get('dayOfWeek'), date.getDay());
});

test("`dayOfWeek` sets the date based on day of the week", function() {
  expect(8);

  var date = Ember.D(new Date(2013, 0, 13));

  // Ensure the date is on a Sunday
  equal(date.getDay(), 0);

  equal(date.set('dayOfWeek', 0).getDay(), 0);
  equal(date.set('dayOfWeek', 1).getDay(), 1);
  equal(date.set('dayOfWeek', 2).getDay(), 2);
  equal(date.set('dayOfWeek', 3).getDay(), 3);
  equal(date.set('dayOfWeek', 4).getDay(), 4);
  equal(date.set('dayOfWeek', 5).getDay(), 5);
  equal(date.set('dayOfWeek', 6).getDay(), 6);
});

test("`add` increments the date by milliseconds", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0, 1, 1, 1, 1, 10));

  date.add(13, 'millisecond');
  equal(date.getMilliseconds(), 23);
  date.add(4, 'milliseconds');
  equal(date.getMilliseconds(), 27);
});

test("`add` increments the date by seconds", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0, 1, 1, 1, 1));

  date.add(7, 'second');
  equal(date.getSeconds(), 8);
  date.add(11, 'seconds');
  equal(date.getSeconds(), 19);
});

test("`add` increments the date by minutes", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0, 1, 1, 1));

  date.add(7, 'minute');
  equal(date.getMinutes(), 8);
  date.add(11, 'minutes');
  equal(date.getMinutes(), 19);
});

test("`add` increments the date by hours", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0, 1, 1));

  date.add(7, 'hours');
  equal(date.getHours(), 8);
  date.add(11, 'hours');
  equal(date.getHours(), 19);
});

test("`add` increments the date by days", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0, 1));

  date.add(3, 'day');
  equal(date.getDate(), 4);
  date.add(14, 'days')
  equal(date.getDate(), 18);
});

test("`add` increments the date by months", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0));

  date.add(3, 'month');
  equal(date.getMonth(), 3);
  date.add(4, 'months')
  equal(date.getMonth(), 7);
});

test("`add` increments the date by years", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0));

  date.add(3, 'year');
  equal(date.getFullYear(), 2016);
  date.add(4, 'years')
  equal(date.getFullYear(), 2020);
});

test("`subtract` decrements the date by milliseconds", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0, 1, 1, 1, 1, 300));

  date.subtract(13, 'millisecond');
  equal(date.getMilliseconds(), 287);
  date.subtract(4, 'milliseconds');
  equal(date.getMilliseconds(), 283);
});

test("`subtract` decrements the date by seconds", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0, 1, 1, 1, 50));

  date.subtract(7, 'second');
  equal(date.getSeconds(), 43);
  date.subtract(11, 'seconds');
  equal(date.getSeconds(), 32);
});

test("`subtract` decrements the date by minutes", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0, 1, 1, 50));

  date.subtract(7, 'minute');
  equal(date.getMinutes(), 43);
  date.subtract(11, 'minutes');
  equal(date.getMinutes(), 32);
});

test("`subtract` decrements the date by days", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0, 30));

  date.subtract(3, 'day');
  equal(date.getDate(), 27);
  date.subtract(14, 'days')
  equal(date.getDate(), 13);
});

test("`subtract` decrements the date by months", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 12));

  date.subtract(3, 'month');
  equal(date.getMonth(), 9);
  date.subtract(4, 'months')
  equal(date.getMonth(), 5);
});

test("`subtract` decrements the date by years", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0));

  date.subtract(3, 'year');
  equal(date.getFullYear(), 2010);
  date.subtract(4, 'years')
  equal(date.getFullYear(), 2006);
});

test("`beginningOfDay` returns a date set at the start of the day", function() {
  expect(7);

  var oldDate = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567)),
      newDate = oldDate.beginningOfDay();

  equal(newDate.getFullYear(), 2013);
  equal(newDate.getMonth(), 0);
  equal(newDate.getDate(), 15);
  equal(newDate.getHours(), 0);
  equal(newDate.getMinutes(), 0);
  equal(newDate.getSeconds(), 0);
  equal(newDate.getMilliseconds(), 0);
});

test("`beginningOfWeek` returns a date set at the start of the week", function() {
  expect(7);

  var oldDate = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567)),
      newDate = oldDate.beginningOfWeek();

  equal(newDate.getFullYear(), 2013);
  equal(newDate.getMonth(), 0);
  equal(newDate.getDate(), 13);
  equal(newDate.getHours(), 0);
  equal(newDate.getMinutes(), 0);
  equal(newDate.getSeconds(), 0);
  equal(newDate.getMilliseconds(), 0);
});

test("`beginningOfMonth` returns a date set at the start of the month", function() {
  expect(7);

  var oldDate = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567)),
      newDate = oldDate.beginningOfMonth();

  equal(newDate.getFullYear(), 2013);
  equal(newDate.getMonth(), 0);
  equal(newDate.getDate(), 1);
  equal(newDate.getHours(), 0);
  equal(newDate.getMinutes(), 0);
  equal(newDate.getSeconds(), 0);
  equal(newDate.getMilliseconds(), 0);
});

test("`beginningOfYear` returns a date set at the start of the year", function() {
  expect(7);

  var oldDate = Ember.D(new Date(2013, 1, 15, 13, 45, 32, 567)),
      newDate = oldDate.beginningOfYear();

  equal(newDate.getFullYear(), 2013);
  equal(newDate.getMonth(), 0);
  equal(newDate.getDate(), 1);
  equal(newDate.getHours(), 0);
  equal(newDate.getMinutes(), 0);
  equal(newDate.getSeconds(), 0);
  equal(newDate.getMilliseconds(), 0);
});

test("`endOfDay` returns a date set at the end of the day", function() {
  expect(7);

  var oldDate = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567)),
      newDate = oldDate.endOfDay();

  equal(newDate.getFullYear(), 2013);
  equal(newDate.getMonth(), 0);
  equal(newDate.getDate(), 15);
  equal(newDate.getHours(), 23);
  equal(newDate.getMinutes(), 59);
  equal(newDate.getSeconds(), 59);
  equal(newDate.getMilliseconds(), 999);
});

test("`endOfWeek` returns a date set at the end of the week", function() {
  expect(7);

  var oldDate = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567)),
      newDate = oldDate.endOfWeek();

  equal(newDate.getFullYear(), 2013);
  equal(newDate.getMonth(), 0);
  equal(newDate.getDate(), 19);
  equal(newDate.getHours(), 23);
  equal(newDate.getMinutes(), 59);
  equal(newDate.getSeconds(), 59);
  equal(newDate.getMilliseconds(), 999);
});

test("`endOfMonth` returns a date set at the end of the month", function() {
  expect(7);

  var oldDate = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567)),
      newDate = oldDate.endOfMonth();

  equal(newDate.getFullYear(), 2013);
  equal(newDate.getMonth(), 0);
  equal(newDate.getDate(), 31);
  equal(newDate.getHours(), 23);
  equal(newDate.getMinutes(), 59);
  equal(newDate.getSeconds(), 59);
  equal(newDate.getMilliseconds(), 999);
});

test("`endOfYear` returns a date set at the end of the year", function() {
  expect(7);

  var oldDate = Ember.D(new Date(2013, 1, 15, 13, 45, 32, 567)),
      newDate = oldDate.endOfYear();

  equal(newDate.getFullYear(), 2013);
  equal(newDate.getMonth(), 11);
  equal(newDate.getDate(), 31);
  equal(newDate.getHours(), 23);
  equal(newDate.getMinutes(), 59);
  equal(newDate.getSeconds(), 59);
  equal(newDate.getMilliseconds(), 999);
});

test("`copy` returns a copy of the date", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567)),
      copy = date.copy();

  copy.setDate(19);
  equal(date.getDate(), 15);
  equal(copy.getDate(), 19);
});

test("`isValid` returns true when is a valid date", function() {
  expect(1);

  var date = Ember.D(new Date());

  equal(date.get('isValid'), true);
});

test("`isValid` returns false when is a invalid date", function() {
  expect(1);

  var date = Ember.D(new Date('2013-13-13'));

  equal(date.get('isValid'), false);
});

module("Ember.Date - Formatting");

test("`fmt` returns the full year", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567));

  equal(date.fmt('%Y'), '2013');
});

test("`fmt` returns the first 2 digits of the year", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567));

  equal(date.fmt('%C'), '20');
});

test("`fmt` returns the last 2 digits of the year", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567));

  equal(date.fmt('%y'), '13');
});

test("`fmt` returns the month", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567));

  equal(date.fmt('%m'), '01');
});

test("`fmt` returns the name of the month", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567));

  equal(date.fmt('%B'), Ember.Date.MONTHS[0]);
});

test("`fmt` returns the short name of the month", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567));

  equal(date.fmt('%b'), Ember.Date.MONTHS_ABBR[0]);
});

test("`fmt` returns the day of the month", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567));

  equal(date.fmt('%d'), '15');
});

test("`fmt` returns the zero-padded day of the month", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 3, 13, 45, 32, 567));

  equal(date.fmt('%e'), '03');
});

test("`fmt` returns the zero-padded hour", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 5, 45, 32, 567));

  equal(date.fmt('%H'), '05');
});

test("`fmt` returns the space-padded hour", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 5, 45, 32, 567));

  equal(date.fmt('%k'), ' 5');
});

test("`fmt` returns the zero-padded 12-hour formatted hour", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567));

  equal(date.fmt('%I'), '01');
});

test("`fmt` returns the space-padded 12-hour formatted hour", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567));

  equal(date.fmt('%l'), ' 1');
});

test("`fmt` returns the lowercased meridiem", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567));

  equal(date.fmt('%P'), 'pm');
  date.set('hour', 3);
  equal(date.fmt('%P'), 'am');
});

test("`fmt` returns the uppercased meridiem", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0, 15, 13, 45, 32, 567));

  equal(date.fmt('%p'), 'PM');
  date.set('hour', 3);
  equal(date.fmt('%p'), 'AM');
});

test("`fmt` returns the zero-padded minutes", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 5, 7, 32, 567));

  equal(date.fmt('%M'), '07');
});

test("`fmt` returns the zero-padded seconds", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 5, 45, 7, 567));

  equal(date.fmt('%S'), '07');
});

test("`fmt` returns the zero-padded milliseconds", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 5, 45, 32, 3));

  equal(date.fmt('%L'), '003');
});

test("`fmt` returns the day of the week, starting from Monday", function() {
  expect(2);

  var date = Ember.D(new Date(2013, 0, 15, 5, 45, 7, 567));

  equal(date.fmt('%u'), '2');
  date.set('dayOfWeek', 0);
  equal(date.fmt('%u'), '7');
});

test("`fmt` returns the day of the week, starting from Sunday", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 5, 45, 7, 567));

  equal(date.fmt('%w'), '2');
});

test("`fmt` returns the timestamp", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 5, 45, 7, 567));

  equal(date.fmt('%s'), date.getTime().toString());
});

test("`fmt` returns a new line", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 5, 45, 7, 567));

  equal(date.fmt('%n'), "\n");
});

test("`fmt` returns a tab", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 5, 45, 7, 567));

  equal(date.fmt('%t'), "\t");
});

test("`fmt` returns a percentage sign", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 5, 45, 7, 567));

  equal(date.fmt('%%'), '%');
});

test("`fmt` returns a string representation of the date when nothing is given", function() {
  expect(1);

  var date = Ember.D(new Date(2013, 0, 15, 5, 45, 7, 567));

  equal(date.fmt(), date.toString());
});

var view;

var appendView = function() {
  Ember.run(function() { view.appendTo('#qunit-fixture'); });
};

module("Ember.Date - Handlebars helper", {
  teardown: function() {
    Ember.run(function() {
      if (view) {
        view.destroy();
      }
    });
  }
});

test("`{{date}}` handlebars helper without format", function() {
  var date = new Date;

  view = Ember.View.create({
    controller: Ember.Object.create({createdAt: date}),
    template: Ember.Handlebars.compile('{{date createdAt}}')
  });

  appendView();

  equal(view.$().text(), date.toString());
});

test("`{{date}}` handlebars helper with format", function() {
  var date = new Date;

  view = Ember.View.create({
    controller: Ember.Object.create({createdAt: date}),
    template: Ember.Handlebars.compile('{{date createdAt "%Y"}}')
  });

  appendView();

  equal(view.$().text(), date.getFullYear());
});

test("`{{date}}` handlebars helper updates when variable changes", function() {
  var first = new Date(2013, 0, 15, 5, 45, 7, 567),
      second = new Date(2014, 0, 15, 5, 45, 7, 567);

  view = Ember.View.create({
    controller: Ember.Object.create({createdAt: first}),
    template: Ember.Handlebars.compile('{{date createdAt "%Y"}}')
  });

  appendView();

  Ember.run(function() {
    view.controller.set('createdAt', second);
  });

  equal(view.$().text(), second.getFullYear());
});
