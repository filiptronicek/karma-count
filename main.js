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

$('#checkbox').change(function(ev) {
	if ($(this).is(':checked')) {
		if (typeof Storage !== 'undefined') {
			// Store
			localStorage.setItem('reload', true);
			console.log('Localstorage changed to ' + localStorage.getItem('reload'));

			// Retrieve
		} else {
		}
	} else {
		if (typeof Storage !== 'undefined') {
			// Store
			localStorage.setItem('reload', false);
			console.log('Localstorage changed to ' + localStorage.getItem('reload'));

			// Retrieve
		} else {
		}
	}

	setTimeout(function() {
		console.log('Shit just got updated');
		location.href = '';
	}, 100);
});
if (localStorage.getItem('reload') == 'true') {
	console.log('Auto-reload enabled: ' + localStorage.getItem('reload'));

	$('#checkbox').attr('checked', 'true');

	setTimeout(function() {
		Reload();
	}, 55000);
	function Reload() {
		console.log('Reloading in 5 seconds');
		leaderboard.innerHTML += '<link rel="icon" href="down.png"></link>';

		setTimeout(function() {
			document.title = 'Loading';
		}, 4500);
		setTimeout(function() {
			location.reload(true);
		}, 5000);
	}
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
btn.onclick = function() {
	modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};

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

function mainfunc(user) {
	$.getJSON('https://www.reddit.com/user/' + user + '/about.json', function(data) {
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
		.done(function() {
			return;
		})
		.fail(function() {
			console.log('error loading ' + user);
		})
		.always(function() {
			//console.log('completed loading ' + user);
		});
}

function loadData(usersloaded) {
	leaderboard.innerHTML = '';
	usersloaded.sort((a, b) => b.totalKarma - a.totalKarma).forEach((u) => {
		leaderboard.innerHTML +=
			"<div class='usr' id='" +
			u.userName +
			"'><a href='"+u.userUrl+"'><br><br><img src='" +
			u.userIcon +
			"'><br> u/" +
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
	leaderboard.innerHTML += '<link rel="icon" href="favicon.png"></link>';
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
