/*

  DOM

*/
// @ts-ignore
const leaderboard = document.getElementById("profiles");
// @ts-ignore
const settingsbtn = document.getElementById("settingsbtn");
// @ts-ignore
const plusbtn = document.getElementById("new");

// Get the modal
// @ts-ignore
const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
// @ts-ignore
const span = document.getElementsByClassName("close")[0];

let commentKarma;
let postKarma;
let userName;
let userIcon;
let userUrl;
// @ts-ignore
let usersById;
// @ts-ignore
let usersloaded = [];
let newUserCounterEach = 0;
let newUsr;

const date = new Date();
const month = date.getMonth();
if (month == 11 || month == 0 || month == 1) {
  // @ts-ignore
  const sf = new Snowflakes({
    count: 80,
    maxSize: 20,
    wind: false
  });
}

usersById = [
  "sloth_on_meth",
  "filiptronicek",
  "cigarkovic",
  "gallowboob",
  "tooshiftyforyou",
  "haxpress",
  "blokensie",
  "ilovegaming123456",
  "Trony55",
  "vexillologer"
];

/*

  Settings modal

*/
// @ts-ignore
$("#checkbox").change(function(ev) {
  // @ts-ignore
  if ($(this).is(":checked")) {
    // @ts-ignore
    if (typeof Storage !== "undefined") {
      // Store
      // @ts-ignore
      localStorage.setItem("reload", true);
      // @ts-ignore
      console.log("Auto-reload changed to " + localStorage.getItem("reload"));
    }
  } else {
    // @ts-ignore
    if (typeof Storage !== "undefined") {
      // Store
      // @ts-ignore
      localStorage.setItem("reload", false);
      // @ts-ignore
      console.log("Auto-reload changed to " + localStorage.getItem("reload"));
    }
  }

  setTimeout(function() {
    console.log("Shit just got updated");
    // @ts-ignore
    location.href = "";
  }, 100);
});
// @ts-ignore
if (localStorage.getItem("reload") === "true") {
  // @ts-ignore
  console.log("Auto-reload enabled: " + localStorage.getItem("reload"));

  // @ts-ignore
  $("#checkbox").attr("checked", "true");

  var Reload = function() {
    console.log("Reloading in 5 seconds");
    leaderboard.innerHTML += '<link rel="icon" href="img/down.png"></link>';

    setTimeout(function() {
      // @ts-ignore
      document.title = "Loading";
    }, 4500);
    setTimeout(function() {
      // @ts-ignore
      location.reload(true);
    }, 5000);
  };
  setTimeout(function() {
    Reload();
  }, 55000);
} else {
  // @ts-ignore
  console.log("Auto-reload enabled: " + localStorage.getItem("reload"));
}


// Get the button that opens the modal
var btn = settingsbtn;



// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
// @ts-ignore
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// @ts-ignore
function mainfunc(user) {
  // @ts-ignore
  $.getJSON("https://www.reddit.com/user/" + user + "/about.json", function(
    // @ts-ignore
    data
  ) {
    commentKarma = data.data.comment_karma;
    postKarma = data.data.link_karma;
    // @ts-ignore
    totalKarma = commentKarma + postKarma;
    userName = user;
    userIcon = data.data.icon_img;
    userUrl = "https://reddit.com/u/" + userName;

    usersloaded.push({
      user,
      userName,
      userIcon,
      userUrl,
      // @ts-ignore
      totalKarma
    });

    // @ts-ignore
    loadData(usersloaded);
  })
    .done(function() {
      return;
    })
    .fail(function() {
      console.log("error loading " + user);
    })
    .always(function() {
      //console.log('completed loading ' + user);
    });
}
//Karma API

function updateStats() {
  // @ts-ignore
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

/**
 * @param {any[]} usersloaded
 */
function loadData(usersloaded) {
  leaderboard.innerHTML = "";
  usersloaded
    .sort((a, b) => b.totalKarma - a.totalKarma)
    .forEach(u => {
      leaderboard.innerHTML +=
        "<div class='usr' id='" +
        u.userName +
        "'><a href='" +
        u.userUrl +
        "'><br><br><img src='" +
        u.userIcon +
        "' alt='User icon of u/" +
        u.userName +
        "' height='256'><br> u/" +
        u.userName +
        "</a><br>" +
        u.totalKarma.toLocaleString() +
        " karma";
    });
  newUserCounterEach++;
  console.log("Users: " + newUserCounterEach);

  // @ts-ignore
  document.title = "Reddit karma";
  leaderboard.innerHTML += '<link rel="icon" href="img/favicon.png"></link>';
}

function addNew() {
  console.log("Clicked plus btn");
  // @ts-ignore
  newUsr = prompt("What is it?");
  console.log(newUsr);
  if (newUsr != undefined || newUsr != "") {
    usersById.push(newUsr);
    updateStats();
  }
}

// @ts-ignore
$("#github").hover(function() {
  // @ts-ignore
  $(this).addClass("counterclockwise");
});
var isMobile = {
  Android: function() {
    // @ts-ignore
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    // @ts-ignore
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    // @ts-ignore
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    // @ts-ignore
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    // @ts-ignore
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  }
};
if (isMobile.any()) {
  // @ts-ignore
  $("#github").hide();
}
