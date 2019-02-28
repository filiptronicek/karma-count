var leaderboard = document.getElementById('leaderboard');
var settingsbtn = document.getElementById('settings');
var commentKarma;
var postKarma;
var userName;
var userIcon;
var userUrl;
var usersloaded = [];
$('.switch').hide();

$('#settings').click(function() {
	console.log('Open settings');
	$('.switch').show();
});
setTimeout(function() {
	Reload();
}, 25000);
function Reload() {
	console.log('Reloading in 5 seconds');
	setTimeout(function() {
		document.title = 'Loading';
	}, 4500);
	setTimeout(function() {
		location.reload(true);
	}, 5000);
}

users = [
	'sloth_on_meth',
	'filiptronicek',
	'cigarkovic',
	'gallowboob',
	'tooshiftyforyou',
	'actually_crazy_irl',
	'haxpress'
];

function updateStats() {
	users.forEach(mainfunc);
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
			"'><br><br><img src='" +
			u.userIcon +
			"'><br><a href='" +
			u.userUrl +
			"'> u/" +
			u.userName +
			'</a><br>' +
			u.totalKarma.toLocaleString() +
			' karma';
	});
	document.title = 'Reddit karma counter';
}
