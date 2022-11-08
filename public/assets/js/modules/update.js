import dom from "../lib/DOM.js";
import { popupDiv } from "./home.js";
import svgIcons from "./svgIcons.js";
import { config } from "../config/config.js";
import { createCard, evulveDiv1_, evulveDiv2_, moveCard } from "./main.js";

const { post, $ } = dom;
const { data } = config;

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

const messeges = {
  post: "post a new idea.",
  evulation: "evulve a new idea.",
  comment: "comment on an idea.",
  react: "react on an idea.",
  reactRemove: "remove react from an idea.",
};

const deletePopup = (x) => {
  if (x)
    setTimeout(() => {
      x.style.opacity = "0";
      setTimeout(() => {
        x.remove();
      }, 301);
    }, 3000);
};

const createPopup = (array) => {
  const [type, user, pic, id] = array;

  const { name: user_ } = JSON.parse(window.localStorage["evulve.login"]);
  if (user == user_) {
    return;
  }
  const div = document.createElement("div");
  div.setAttribute("class", `popup popup-${type}`);

  const img = document.createElement("img");
  img.setAttribute("src", `./assets/img/avature${pic}.png`);

  const messege = document.createElement("div");
  messege.innerHTML = `<span class="username">${user}</span> ${messeges[type]}.`;

  const closeBtn = document.createElement("div");
  closeBtn.setAttribute("class", "closeBtn");
  closeBtn.innerHTML = svgIcons.closeBtn_;
  closeBtn.onclick = () => {
    div.remove();
  };

  div.appendChild(img);
  div.appendChild(messege);
  div.appendChild(closeBtn);

  $(popupDiv).appendChild(div);

  setTimeout(() => {
    div.style.opacity = "1";
  }, 301);

  deletePopup(div);

  messege.onclick = () => {
    //console.log(config.CARDS, config.CARDS_);
    config.CARDS = config.CARDS_;
    createCard(evulveDiv1_, evulveDiv2_, config.posts_);
    moveCard(id);
    // deletePopup(div);
  };
};

const update = async (status_) => {
  const {
    cards,
    posts,
    status,
    data: data_,
    result,
  } = JSON.parse(
    JSON.parse(
      await post(data, {
        type: 690,
        data: JSON.stringify({
          count: status_,
        }),
      })
    ).messege
  );

  if (result) {
    const Result = {};

    for (let x of cards) {
      const card = ArrayToCard(x);
      if (card.id) Result[card.id] = card;
    }
    config.posts_ = posts;
    config.CARDS_ = Result;
    for (let i = data_.length - 1; i >= 0; i--) {
      createPopup(data_[i]);
    }
    update(status);
  }
};

export { update };
