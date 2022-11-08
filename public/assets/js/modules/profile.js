import dom from "../lib/DOM.js";
const { $, createElement } = dom;

import { header } from "./header.js";
import icons from "./svgIcons.js";
const { array: arraySvg, signOut: signOutSvg } = icons;

const logo = createElement("div", "EVULVE", { class: "logo" });
const profile = createElement("div").setAttribute({ class: "profile" });

const signOut = createElement("div").setAttribute({
  class: "signout",
});

const signOutBtn = createElement(
  "div",
  [
    createElement("svg", signOutSvg.childrens, signOutSvg.attribute),
    createElement("div", "Sign Out"),
  ],
  {
    class: "item",
  }
);

signOut.setChildren(signOutBtn);

signOutBtn.onload = () => {
  $(signOutBtn).onclick = () => {
    delete window.localStorage["evulve.login"];
    window.location.reload();
  };
};

let arrayCon = false;
profile.onload = () => {
  $(profile).onclick = () => {
    if (arrayCon) {
      $(signOut).style.display = "none";
      array.setChildren(arraySvg.childrens);
    } else {
      $(signOut).style.display = "flex";
      array.setChildren(arraySvg.upchildrens);
    }
    arrayCon = !arrayCon;
  };
};

const array = createElement("svg", arraySvg.childrens, arraySvg.attribute);

let score = createElement("div", "Clout score: 0", {
  class: "point",
});
const setProfile = ({ name: user, picture: pic }) => {
  header.setChildren([
    logo,
    profile.setChildren([
      createElement("img").setAttribute({
        class: "img",
        src: `./assets/img/avature${pic}.png`,
      }),
      createElement(
        "div",
        [
          createElement("div", user, {
            class: "name",
          }),
          score,
        ],
        {
          class: "namePoint",
        }
      ),
      array,
    ]),
    signOut,
  ]);
};

const scoreSet = (scoreCount) => {
  score.setChildren(`Clout score: ${scoreCount}`);
};

export { setProfile, scoreSet };
