/**
 * A more intuitive wrapper for JavaScript's interval functions.

 * <h3>Example usage:<h3>
 * <ol>
 *	<li>var interval = new DGE.Interval(function() {</li>
 *	<li>&nbsp;&nbsp;// do something interesting</li>
 *	<li>}, 100);</li>
 *	<li></li>
 *	<li>interval.start();</li>
 * </ol>

 * @param {Function} fn The function to execute each interval.
 * @param {Number} delay The number of milliseconds between intervals.
 * @namespace DGE
 * @class Interval
 * @constructor
 */
DGE.Interval = function(fn, delay) {

	var fns = [];
	var handle = null;

	if (fn !== undefined) {
		if (fn.length) {
			fns = fn;
		} else {
			fns = [fn];
		}
	}

	if (delay === undefined) delay = DGE.Interval.defaults.delay;

	/**
	 * Adds an event to call each interval.
	 * @param {Function} fn The new function.
	 * @return {Object} this (for chaining).
	 * @method add
	 */
	this.add = function(fn) {
		fns.push(fn);
		return this;
	};

	/**
	 * Sets the interval frequency.
	 * @param {Number} newDelay The milliseconds between calls to fn.
	 * @return {Object} this (for chaining).
	 * @method setDelay
	 */
	this.setDelay = function(newDelay) {

		if (delay == newDelay) return;

		delay = newDelay;
		if (handle) this.start();

		return this;

	};

	/**
	 * Starts (or restarts) the interval.
	 * @return {Object} this (for chaining).
	 * @method start
	 */
	this.start = function() {

		var that = this;

		this.stop();

		handle = setInterval(function() {
			for (var i = 0; i < fns.length; i++) {
				fns[i].apply(that);
			}
		}, delay);

		this._active = true;

		return this;

	};

	/**
	 * Stops the interval if it's active.
	 * @return {Object} this (for chaining).
	 * @method stop
	 */
	this.stop = function() {

		if (handle) {
			clearInterval(handle);
			handle = null;
		}

		this._active = false;

		return;

	};

};

/**
 * Read-only: true if the interval is active, false if it isn't.
 * @property _active
 * @default false
 * @final
 * @static
 * @type Number
 */
DGE.Interval.prototype._active = false;

/**
 * An object comprised of the DGE.Interval defaults, including:
 * <ul>
 *	<li>{Number} delay The delay to use for a new DGE.Interval object if one isn't given. (default: 10)</li>
 * </ul>
 * @property defaults
 * @default Object
 * @static
 * @type Object
 */
DGE.Interval.defaults = {
	delay : 10
};

/**
 * Formats the passed frames per second into milliseconds (JS only works with ms).
 * @param {Number} fps The frames per second.
 * @return {Number} The number of milliseconds to equal the passed frames per second.
 * @method formatFPS
 * @static
 */
DGE.Interval.formatFPS = function(fps) {
	return Math.ceil(1000 / fps);
};
