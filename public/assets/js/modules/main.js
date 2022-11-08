import dom from "../lib/DOM.js";
const { $, createElement, post, get } = dom;

import { config } from "../config/config.js";
const { save, data } = config;

import icons from "./svgIcons.js";
const { attachment: attachmentSvg, send: sendSvg } = icons;

import $card from "../lib/card.js";
import { createCard } from "./card.js";

const selection = (e) => {
  //console.log("time-0:", new Date());
  window.selectionMode.e = e;
  window.selectionMode.status = true;
  window.selectionMode.start = e.target.selectionStart;
  window.selectionMode.end = e.target.selectionEnd;
};

const selectionBlur = (e) => {
  window.selectionMode.status = false;
  //console.log("time:", new Date());
};

const moveCard = (map) => {
  let dom = document.querySelector(`[map='${map}']`);
  // console.log(
  //   window.innerWidth,
  //   window.innerHeight,
  //   pz.getTransform(),
  //   dom.getClientRects()[0]
  // );
  let { x: tx, y: ty, scale } = pz.getTransform();
  let { x: dx, y: dy, height, width } = dom.getClientRects()[0];
  let x = tx,
    y = ty;

  // if (tx < 0) {
  //   dx -= -tx;
  // }

  // if (ty < 0) {
  //   dy -= -ty;
  // }

  // dy += 80;

  if (window.innerWidth <= dx + width) {
    x = tx - (dx - window.innerWidth) - 20 - width;
  }
  if (window.innerHeight <= dy + height) {
    y = ty - (dy - window.innerHeight) - 20 - height;
  }
  pz.smoothMoveTo(x, y);
};

const main = createElement("main").setAttribute({
  class: "container",
});

const evulveDiv1_ = createElement("div");
const evulveDiv2_ = createElement("div").setAttribute({
  class: "container-row",
});

const postField = createElement("div");

const form = createElement("form").setAttribute({
  class: "postField",
});

const showFormBtn = createElement("div", "What's on your mind?");

const send = createElement("svg", sendSvg.childrens, sendSvg.attribute);

showFormBtn.onload = () => {
  $(showFormBtn).onclick = () => {
    const { name: user, picture: pic } = JSON.parse(
      window.localStorage["evulve.login"]
    );
    form.setChildren([
      createElement(
        "div",
        [
          createElement("img").setAttribute({
            src: `./assets/img/avature${pic}.png`,
          }),
          createElement("textarea").setAttribute({
            required: "",
            placeholder: "What's on your mind?",
            rows: "4",
            autocomplete: "off",
            spellcheck: "false",
          }),
        ],
        { class: "profile1" }
      ),
      createElement(
        "div",
        [
          createElement(
            "div",
            [
              createElement(
                "svg",
                attachmentSvg.childrens,
                attachmentSvg.attribute
              ),
              createElement("span", "Add attachment"),
            ],
            {
              class: "attachment",
            }
          ),
          createElement("button", send, {
            style: "background: none; border: none; outline: none; padding: 0;",
          }),
        ],
        {
          class: "attachmentSend",
        }
      ),
    ]);

    let divs = $(evulveDiv1_).querySelectorAll(".card");
    for (let card of divs) {
      let connect_ = connection[card.getAttribute("map")];
      if (connect_) {
        for (let x in connect_) {
          let svg = document.querySelector(`[mapId='${x}']`);
          svg.remove();
          const { start, end, color } = connect_[x];
          new Connector(start, end, document.querySelector("main"), color);
        }
      }
    }
  };
};

const setPostField = ({ name: user, picture: pic }) => {
  form.setChildren([
    createElement(
      "div",
      [
        createElement("img").setAttribute({
          src: `./assets/img/avature${pic}.png`,
        }),
        showFormBtn,
      ],
      { class: "profile1" }
    ),
  ]);

  postField.setChildren(form);
};

form.onload = () => {
  let textarea_ = $(form).querySelector("textarea");
  if (textarea_) {
    $(form).querySelector("textarea").onselect = selection;
    $(form).querySelector("textarea").onblur = selectionBlur;
    $(form).querySelector("textarea").onfocus = selectionBlur;
  }
  $(form).onsubmit = async (e) => {
    e.preventDefault();
    let textarea = e.target.querySelector("textarea");
    textarea.disabled = true;
    send.setChildren(sendSvg.runningchildrens);
    $(send).style.cursor = "no-drop";
    $(send).disabled = true;

    const { name: user, picture: pic } = JSON.parse(
      window.localStorage["evulve.login"]
    );

    let card = new $card({
      name: user,
      picture: pic,
      key: "0×55d3...3197955",
      content: textarea.value,
      type: "post",
    }).object;

    const { result } = JSON.parse(
      JSON.parse(
        await post(save, {
          type: 901,
          data: JSON.stringify({
            CARDMODEL: card,
          }),
        })
      ).messege
    );

    if (!result) {
      textarea.disabled = true;
      send.setChildren(sendSvg.childrens);
      return;
    }

    config.CARDS[card.id] = card;
    config.posts.unshift(card.id);
    form.setChildren([
      createElement(
        "div",
        [
          createElement("img").setAttribute({
            src: `./assets/img/avature${pic}.png`,
          }),
          showFormBtn,
        ],
        { class: "profile1" }
      ),
    ]);
    send.init();
    createCard(evulveDiv1_, evulveDiv2_, config.posts);
    moveCard(card.id);
  };
};

evulveDiv1_.append(postField);

main.append(evulveDiv1_, evulveDiv2_);

export {
  main,
  setPostField,
  evulveDiv1_,
  evulveDiv2_,
  postField,
  selection,
  selectionBlur,
  moveCard,
  createCard,
  post,
  data,
  config,
};
