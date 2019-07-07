var leaderboard = document.getElementById('profiles');
var settingsbtn = document.getElementById('settingsbtn');
var plusbtn = document.getElementById('new');

var commentKarma;
var postKarma;
var userName;
var userIcon;
var userUrl;
var usersById;
var usersloaded = [];
var newUserCounterEach = 0;
var newUsr;

usersById = [
	'sloth_on_meth',
	'filiptronicek',
	'cigarkovic',
	'gallowboob',
	'tooshiftyforyou',
	'haxpress',
	'blokensie'
];
//Settings modal

$('#checkbox').change(function (ev) {
	if ($(this).is(':checked')) {
		if (typeof Storage !== 'undefined') {
			// Store
			localStorage.setItem('reload', true);
			console.log('Localstorage changed to ' + localStorage.getItem('reload'));

			// Retrieve
		} else {}
	} else {
		if (typeof Storage !== 'undefined') {
			// Store
			localStorage.setItem('reload', false);
			console.log('Localstorage changed to ' + localStorage.getItem('reload'));

			// Retrieve
		}
	}

	setTimeout(function () {
		console.log('Shit just got updated');
		location.href = '';
	}, 100);
});
if (localStorage.getItem('reload') === 'true') {
	console.log('Auto-reload enabled: ' + localStorage.getItem('reload'));

	$('#checkbox').attr('checked', 'true');

	var Reload = function () {
		console.log('Reloading in 5 seconds');
		leaderboard.innerHTML += '<link rel="icon" href="img/down.png"></link>';

		setTimeout(function () {
			document.title = 'Loading';
		}, 4500);
		setTimeout(function () {
			location.reload(true);
		}, 5000);
	};
	setTimeout(function () {
		Reload();
	}, 55000);
} else {
	console.log('Auto-reload enabled: ' + localStorage.getItem('reload'));
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = settingsbtn;

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
	modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};

function mainfunc(user) {
	$.getJSON('https://www.reddit.com/user/' + user + '/about.json', function (data) {
			commentKarma = data.data.comment_karma;
			postKarma = data.data.link_karma;
			totalKarma = commentKarma + postKarma;
			userName = user;
			userIcon = data.data.icon_img;
			userUrl = 'https://reddit.com/u/' + userName;

			usersloaded.push({
				user,
				userName,
				userIcon,
				userUrl,
				totalKarma
			});

			loadData(usersloaded);
		})
		.done(function () {
			return;
		})
		.fail(function () {
			console.log('error loading ' + user);
		})
		.always(function () {
			//console.log('completed loading ' + user);
		});
}
//Karma API

function updateStats() {
	usersById.forEach(mainfunc);
}
/*
function updaat{
	document.body.innerHTML = '';
	users.forEach(mainfunc);
	setTimeout(updaat, 10000);
}
*/
updateStats();

function loadData(usersloaded) {
	leaderboard.innerHTML = '';
	usersloaded.sort((a, b) => b.totalKarma - a.totalKarma).forEach((u) => {
		leaderboard.innerHTML +=
			"<div class='usr' id='" +
			u.userName +
			"'><a href='" +
			u.userUrl +
			"'><br><br><img src='" +
			u.userIcon +
			"' height='256'><br> u/" +
			u.userName +
			'</a><br>' +
			u.totalKarma.toLocaleString() +
			' karma';
	});
	newUserCounterEach++;
	console.log('Users: ' + newUserCounterEach);

	/*	if (newUserCounterEach == usersById.length) {
		console.log('Completed loading');
		leaderboard.innerHTML +=
			"<div class='usr' id='new' onClick='addNew()'><br><br><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z'/></svg><br> <br>";
	}
	*/
	document.title = 'Reddit karma';
	leaderboard.innerHTML += '<link rel="icon" href="img/favicon.png"></link>';
}

function addNew() {
	console.log('Clicked plus btn');
	newUsr = prompt('What is it?');
	console.log(newUsr);
	if (newUsr != undefined || newUsr != '') {
		usersById.push(newUsr);
		updateStats();
	}
}
$(document).ready(function () {
	$('#github').hover(
		function () {
			$('#github').addClass('clockwise');
		},
		function () {
			$('#github').removeClass('clockwise');
		},
		function () {
			$('#github').removeClass('counterclockwise');
		}
	);
});

$('#github').hover(function () {
	$(this).addClass('counterclockwise');
});
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
	}
};
if (isMobile.any()) {
	$('#github').hide();
}
(function () {
	// Theme switch
	var themeSwitch = document.getElementById('themeSwitch');
	if (themeSwitch) {
		initTheme(); // if user has already selected a specific theme -> apply it
		themeSwitch.addEventListener('change', function (event) {
			resetTheme(); // update color theme
		});

		function initTheme() {
			var darkThemeSelected =
				localStorage.getItem('themeSwitch') !== null && localStorage.getItem('themeSwitch') === 'dark';
			// update checkbox
			themeSwitch.checked = darkThemeSelected;
			// update body data-theme attribute
			darkThemeSelected
				?
				document.body.setAttribute('data-theme', 'dark') :
				document.body.removeAttribute('data-theme');
		}

		function resetTheme() {
			if (themeSwitch.checked) {
				// dark theme has been selected
				document.body.setAttribute('data-theme', 'dark');
				localStorage.setItem('themeSwitch', 'dark');
			} else {
				document.body.removeAttribute('data-theme');
				localStorage.removeItem('themeSwitch');
			}
		}
	}

	// Main Header component JS
	var mainHeader = document.getElementsByClassName('js-main-header')[0];
	if (mainHeader) {
		var trigger = mainHeader.getElementsByClassName('js-main-header__nav-trigger')[0],
			nav = mainHeader.getElementsByClassName('js-main-header__nav')[0];
		//detect click on nav trigger
		trigger.addEventListener('click', function (event) {
			event.preventDefault();
			var ariaExpanded = !Util.hasClass(nav, 'main-header__nav--is-visible');
			//show nav and update button aria value
			Util.toggleClass(nav, 'main-header__nav--is-visible', ariaExpanded);
			trigger.setAttribute('aria-expanded', ariaExpanded);
			if (ariaExpanded) {
				//opening menu -> move focus to first element inside nav
				nav.querySelectorAll('[href], input:not([disabled]), button:not([disabled])')[0].focus();
			}
		});
	}
})();
// Utility function
function Util() {}

/* 
	class manipulation functions
*/
Util.hasClass = function (el, className) {
	if (el.classList) return el.classList.contains(className);
	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

Util.addClass = function (el, className) {
	var classList = className.split(' ');
	if (el.classList) el.classList.add(classList[0]);
	else if (!Util.hasClass(el, classList[0])) el.className += ' ' + classList[0];
	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function (el, className) {
	var classList = className.split(' ');
	if (el.classList) el.classList.remove(classList[0]);
	else if (Util.hasClass(el, classList[0])) {
		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
		el.className = el.className.replace(reg, ' ');
	}
	if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function (el, className, bool) {
	if (bool) Util.addClass(el, className);
	else Util.removeClass(el, className);
};

Util.setAttributes = function (el, attrs) {
	for (var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
};

/* 
  DOM manipulation
*/
Util.getChildrenByClassName = function (el, className) {
	var children = el.children,
		childrenByClass = [];
	for (var i = 0; i < el.children.length; i++) {
		if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
	}
	return childrenByClass;
};

/* 
	Animate height of an element
*/
Util.setHeight = function (start, to, element, duration, cb) {
	var change = to - start,
		currentTime = null;

	var animateHeight = function (timestamp) {
		if (!currentTime) currentTime = timestamp;
		var progress = timestamp - currentTime;
		var val = parseInt(progress / duration * change + start);
		element.setAttribute('style', 'height:' + val + 'px;');
		if (progress < duration) {
			window.requestAnimationFrame(animateHeight);
		} else {
			cb();
		}
	};

	//set the height of the element before starting animation -> fix bug on Safari
	element.setAttribute('style', 'height:' + start + 'px;');
	window.requestAnimationFrame(animateHeight);
};

/* 
	Smooth Scroll
*/

Util.scrollTo = function (final, duration, cb) {
	var start = window.scrollY || document.documentElement.scrollTop,
		currentTime = null;

	var animateScroll = function (timestamp) {
		if (!currentTime) currentTime = timestamp;
		var progress = timestamp - currentTime;
		if (progress > duration) progress = duration;
		var val = Math.easeInOutQuad(progress, start, final - start, duration);
		window.scrollTo(0, val);
		if (progress < duration) {
			window.requestAnimationFrame(animateScroll);
		} else {
			cb && cb();
		}
	};

	window.requestAnimationFrame(animateScroll);
};

/* 
  Focus utility classes
*/

//Move focus to an element
Util.moveFocus = function (element) {
	if (!element) element = document.getElementsByTagName('body')[0];
	element.focus();
	if (document.activeElement !== element) {
		element.setAttribute('tabindex', '-1');
		element.focus();
	}
};

/* 
  Misc
*/

Util.getIndexInArray = function (array, el) {
	return Array.prototype.indexOf.call(array, el);
};

Util.cssSupports = function (property, value) {
	if ('CSS' in window) {
		return CSS.supports(property, value);
	} else {
		var jsProperty = property.replace(/-([a-z])/g, function (g) {
			return g[1].toUpperCase();
		});
		return jsProperty in document.body.style;
	}
};

/* 
	Polyfills
*/
//Closest() method
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
	Element.prototype.closest = function (s) {
		var el = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1);
		return null;
	};
}

//Custom Event() constructor
if (typeof window.CustomEvent !== 'function') {
	function CustomEvent(event, params) {
		params = params || {
			bubbles: false,
			cancelable: false,
			detail: undefined
		};
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;

	window.CustomEvent = CustomEvent;
}

/* 
	Animation curves
*/
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d / 2;
	if (t < 1) return c / 2 * t * t + b;
	t--;
	return -c / 2 * (t * (t - 2) - 1) + b;
};