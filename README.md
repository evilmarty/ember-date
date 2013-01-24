Ember Date
==========

Extends the javascript date object with some Ember sauce. This allows using Ember's `get` and `set` methods, and some extra enhancements, just like any other Ember object.

## Getting started

1. Download [ember.js](http://emberjs.com)
2. Download [ember-date.js](https://raw.github.com/evilmarty/ember-date/dist/ember-date.js)
3. ???
4. You now have ember-powered dates!

## Usage

The date object will continue to have its original functionality, but you can also use Ember's `get` and `set` methods to access attributes of the date.

```javascript
var date = new Date();

// Original flavouring
date.getFullYear();
date.setFullYear(2015);

// Date sauce
date.get('year');
date.get('years'); // even plurals can be used!
date.set('year', 2015);
date.setProperties({year: 2020, month: 3}); // multi-action!
```

Some extra niceness is the easier manipulation to the date.

```javascript
date.add(2, 'days'); // incremented by 2 whole days!
date.subtract(1, 'day'); // too many? just go back 1
```

## Prototype extension

Ember Date by default will extend the base date object. To disable this simply set `Ember.EXTEND_PROTOTYPES` or `Ember.EXTEND_PROTOTYPES.Date`

To extend a date object manually simply pass it to `Ember.D`. If no arguments are given it will return the current date, extended. You can also pass year, month, day, etc as arguments to build an extended date object set to the specified date.

## Methods

### `timezone`
> Returns the date object timezone in the HHMM format.

### `dayOfWeek`
> Alias for `getDay`. Sets the day of the week.

### `add`
> Increments the date by the given interval.

### `subtract`
> Decrements the date by the given interval.

### `beginningOfDay`
> Returns a new date object set at the beginning of the day from the current date object.

### `beginningOfWeek`
> Returns a new date object set at the beginning of the week from the current date object.

### `beginningOfMonth`
> Returns a new date object set at the beginning of the month from the current date object.

### `beginningOfYear`
> Returns a new date object set at the beginning of the year from the current date object.

### `endOfDay`
> Returns a new date object set at the end of the day from the current date object.

### `endOfWeek`
> Returns a new date object set at the end of the week from the current date object.

### `endOfMonth`
> Returns a new date object set at the end of the month from the current date object.

### `endOfYear`
> Returns a new date object set at the end of the year from the current date object.

### `copy`
> Returns a new instance of the current date object.

### `fmt`
> Returns a string representation of the date based on the given format. For a list of available options refer to ruby's [Time#strftime](http://www.ruby-doc.org/core-1.9.3/Time.html#strtime)

## Internationalisation

Ember Date has basic support for localisation for textual representation, but not formatting. It uses passes months and days of the week to `Ember.String.loc` for localisation.
