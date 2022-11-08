import dom from "../lib/DOM.js";
const { $, createElement } = dom;

import { header } from "./header.js";
import { main, setPostField } from "./main.js";
import { signIn } from "./signin.js";
import { singUp } from "./signup.js";
import { setProfile } from "./profile.js";

const home = createElement("div");
const block = createElement("div").setAttribute({ class: "block hide" });
const enter = createElement("div").setAttribute({
  class: "enterContainer hide",
});

const popupDiv = createElement("div").setAttribute({
  id: "popupdiv",
});

home.append(header, block, enter.append(signIn, singUp), main, popupDiv);
home.onload = () => {
  if (window.localStorage["evulve.login"]) {
    setProfile(JSON.parse(window.localStorage["evulve.login"]));
    setPostField(JSON.parse(window.localStorage["evulve.login"]));
  }
};
export { home, popupDiv };
