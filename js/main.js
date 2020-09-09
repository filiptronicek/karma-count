/*

  DOM

*/

const leaderboard = document.getElementById("profiles");

const settingsbtn = document.getElementById("settingsbtn");

const plusbtn = document.getElementById("new");

// Get the modal

const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal

const span = document.getElementsByClassName("close")[0];

let commentKarma;
let postKarma;
let userName;
let userIcon;
let userUrl;

let usersById;

let usersloaded = [];
let newUserCounterEach = 0;
let newUsr;

const date = new Date();
const month = date.getMonth();
if (month === 11 || month === 0 || month === 1) {
  const sf = new Snowflakes({
    count: 80,
    maxSize: 20,
    wind: false,
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
  "vexillologer",
];

/*

  Settings modal

*/

$("#checkbox").change((_ev) => {
  if ($(this).is(":checked")) {
    if (typeof Storage !== "undefined") {
      // Store

      localStorage.setItem("reload", true);

      console.log("Auto-reload changed to " + localStorage.getItem("reload"));
    }
  } else {
    if (typeof Storage !== "undefined") {
      // Store

      localStorage.setItem("reload", false);

      console.log("Auto-reload changed to " + localStorage.getItem("reload"));
    }
  }

  setTimeout(function () {
    console.log("Shit just got updated");

    location.href = "";
  }, 100);
});

if (localStorage.getItem("reload") === "true") {
  console.log("Auto-reload enabled: " + localStorage.getItem("reload"));

  $("#checkbox").attr("checked", "true");

  const Reload = () => {
    console.log("Reloading in 5 seconds");
    leaderboard.innerHTML += '<link rel="icon" href="img/down.png"></link>';

    setTimeout(() => {
      document.title = "Loading";
    }, 4500);
    setTimeout(() => {
      location.reload(true);
    }, 5000);
  };
  setTimeout(() => {
    Reload();
  }, 55000);
} else {
  console.log(`Auto-reload enabled: ${localStorage.getItem("reload")}`);
}

// Get the button that opens the modal
const btn = settingsbtn;

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function mainfunc(user) {
  $.getJSON(`https://www.reddit.com/user/${user}/about.json`, (data) => {
    commentKarma = data.data.comment_karma;
    postKarma = data.data.link_karma;

    totalKarma = commentKarma + postKarma;
    userName = user;
    userIcon = data.data.icon_img;
    userUrl = "https://reddit.com/u/" + userName;

    usersloaded.push({
      user,
      userName,
      userIcon,
      userUrl,
      totalKarma,
    });

    loadData(usersloaded);
  })
    .done(function () {
      return;
    })
    .fail(function () {
      console.log("error loading " + user);
    })
    .always(function () {
      // console.log('completed loading ' + user);
    });
}

// Karma API

function updateStats() {
  usersById.forEach(mainfunc);
}

updateStats();

function loadData(usersloaded) {
  leaderboard.innerHTML = "";
  usersloaded
    .sort((a, b) => b.totalKarma - a.totalKarma)
    .forEach((u) => {
      leaderboard.innerHTML += `<div class='usr' id='${u.userName}'><a href='${
        u.userUrl
      }'><br><br><img src='${u.userIcon}' alt='User icon of u/${
        u.userName
      }' height='256'><br> u/${
        u.userName
      }</a><br> ${u.totalKarma.toLocaleString()} karma`;
    });
  newUserCounterEach++;
  console.log("Users: " + newUserCounterEach);

  document.title = "Reddit karma";
  leaderboard.innerHTML += '<link rel="icon" href="img/favicon.png"></link>';
}

function addNew() {
  console.log("Clicked plus btn");
  newUsr = prompt("What is it?");
  console.log(newUsr);
  if (newUsr !== undefined || newUsr !== "") {
    usersById.push(newUsr);
    updateStats();
  }
}

$("#github").hover(() => {
  $(this).addClass("counterclockwise");
});

const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
};

if (isMobile.any()) {
  $("#github").hide();
}
