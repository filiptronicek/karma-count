var leaderboard = document.getElementById('leaderboard');
var commentKarma;
var postKarma;
var userName;
var userIcon;
var userUrl;
var usersloaded = [];
var userskarma = [];
var usersIcon = [];
users = [ 'Sloth_on_meth', 'filiptronicek', 'cigarkovic', 'gallowboob', 'TooShiftyForYou', 'actually_crazy_irl', '' ];

function updateStats() {
	leaderboard.innerHTML = '';

	users.forEach(mainfunc);
}
updateStats();

function mainfunc(user) {
	$.getJSON('https://www.reddit.com/user/' + user + '/about.json', function(data) {
		commentKarma = data.data.comment_karma;
		postKarma = data.data.link_karma;
		totalKarma = commentKarma + postKarma;
		userName = user;
		userIcon = data.data.icon_img;
		userUrl = 'https://reddit.com/u/' + userName;
		leaderboard.innerHTML +=
			"<div class='usr' id='" +
			userName +
			"'><br><br><img src='" +
			userIcon +
			"'><br><a href='" +
			userUrl +
			"'> u/" +
			userName +
			'</a><br>' +
			totalKarma.toLocaleString() +
			' karma';

		usersloaded.push(user);
		userskarma.push(totalKarma);
		usersIcon.push(userIcon);

		console.log(user);
		console.log(usersIcon);
		userskarma.sort(function(a, b) {
			return a - b;
		});
		console.log(userskarma);

		//setTimeout(function(){ updateStats(); }, 10000);
	})
		.done(function() {
			return;
		})
		.fail(function() {
			console.log('error');
		})
		.always(function() {
			console.log('complete');
		});
}

/*setTimeout(function() {
	location.href = '';
}, 10000);
*/
