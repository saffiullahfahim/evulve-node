import dom from "./lib/DOM.js";
import {
  createCard,
  evulveDiv1_,
  evulveDiv2_,
  post,
  data,
  config,
} from "./modules/main.js";
import { home } from "./modules/home.js";
import { update } from "./modules/update.js";

window.addEventListener("keydown", (event) => {
  if (
    event.ctrlKey &&
    (event.which == "61" ||
      event.which == "107" ||
      event.which == "173" ||
      event.which == "109" ||
      event.which == "187" ||
      event.which == "189")
  ) {
    event.preventDefault();
  }
});

const selectionMode = {
  status: false,
};

window.selectionMode = selectionMode;

const MainLoad = () => {
  let pz = panzoom(document.querySelector("main"), {
    zoomSpeed: 0.3,
    // autocenter: true,
    smoothScroll: false,
    pinchSpeed: 1.5,
    onTouch: function (e) {
      if (e.touches.length === 1) {
        //console.log(e)
        return false;
      }
      return true; // tells the library to not preventDefault.
    },
    minZoom: 0.1,
  });
  pz.on("transform", () => {
    let { status, e, start, end } = window.selectionMode;
    if (status == true) {
      e.target.focus();
      e.target.setSelectionRange(start, end);
      window.selectionMode.status = true;
      //console.log(window.selectionMode)
    }
  });

  window.pz = pz;
};

const ArrayToCard = (array) => {
  const CARDMODEL = {
    name: "",
    picture: 0,
    timespan: "",
    key: "",
    heading: "",
    content: "",
    attachment: "",
    view: [],
    love: [],
    comments: [],
    evulve: [],
    type: "",
    id: "",
    row: "",
    from: "",
  };
  let index = 0;
  for (let x in CARDMODEL) {
    if (CARDMODEL[x].constructor.toString().indexOf("Array") >= 0) {
      if (array[index]) array[index] = array[index].split(",");
      else array[index] = [];
    }
    CARDMODEL[x] = array[index];
    index++;
  }

  return CARDMODEL;
};

window.onload = async () => {
  const {
    time: serverTime,
    cards,
    posts,
    status,
  } = JSON.parse(
    JSON.parse(
      await post(data, {
        type: 921,
        data: JSON.stringify({}),
      })
    ).messege
  );

  const Result = {};

  for (let x of cards) {
    const card = ArrayToCard(x);
    if (card.id) Result[card.id] = card;
  }

  config.CARDS = Result;
  config.posts = posts;

  config.serverTimeDiff = new Date(serverTime).getTime() - new Date().getTime();

  // console.log((window.config = config));

  dom.render("root", home);
  let start = new Date();

  createCard(evulveDiv1_, evulveDiv2_, config.posts);

  if (window.localStorage["evulve.login.tem"]) {
    delete window.localStorage["evulve.login"];
    delete window.localStorage["evulve.login.tem"];
  }
  MainLoad();

  if (window.localStorage["evulve.login"]) {
    update(status);
  }
};

document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
});
