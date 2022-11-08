import dom from "../lib/DOM.js";
const { $, createElement } = dom;

import { openSignIn, openSignUp } from "./homeFun.js";

const header = createElement("header").setAttribute({ class: "header" });
const logo = createElement("div", "EVULVE", { class: "logo" });
const nav = createElement("nav").setAttribute({ class: "nav2" });

const signInBtn = createElement("div", "Sign In");
const signUpBtn = createElement("div", "Sign Up");
signInBtn.onload = () => {
  $(signInBtn).onclick = () => {
    openSignIn();
  };
};

signUpBtn.onload = () => {
  $(signUpBtn).onclick = () => {
    openSignUp();
  };
};

nav.append(signInBtn, signUpBtn);

header.append(logo, nav);
export { header };
