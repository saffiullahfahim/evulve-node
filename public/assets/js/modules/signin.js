import dom from "../lib/DOM.js";
const { $, createElement, post } = dom;
import { config } from "../config/config.js";
const { gas } = config;
import icons from "./svgIcons.js";
const { closeIcon, checkbox } = icons;

import { openSignUp, closeSignIn } from "./homeFun.js";

import { setProfile } from "./profile.js";

// configaration
let codeSended = false;
let rememberBtnClick = false;
let HASH;

const signIn = createElement("section").setAttribute({
  class: "enterDiv signInDiv",
});

const closeBtn = createElement("svg", closeIcon.childrens, closeIcon.attribute);
const logo = createElement("div", "EVULVE", { class: "logo" });
const heading = createElement("div", "Sign In", { class: "heading" });
const form = createElement("form").setAttribute({
  class: "enterForm",
  name: "form",
});

closeBtn.onload = () => {
  $(closeBtn).onclick = () => {
    codeSended = false;
    closeSignIn();
  };
};

const userName = createElement("input").setAttribute({
  autocomplete: "off",
  spellcheck: "false",
  required: "",
  placeholder: "Username or Phone Number",
  type: "text",
  value: "",
  name: "userName",
});

const code = createElement("input").setAttribute({
  autocomplete: "off",
  spellcheck: "false",
  // required: "",
  placeholder: "Verification Code",
  type: "text",
  value: "",
  name: "code",
});

const rememberBtn = createElement(
  "svg",
  checkbox.childrens,
  checkbox.attribute
);

rememberBtn.onload = () => {
  $(rememberBtn).onclick = () => {
    if (rememberBtnClick) {
      rememberBtn.setChildren(checkbox.childrens);
    } else {
      rememberBtn.setChildren(checkbox.checkedChildrens);
    }
    rememberBtnClick = !rememberBtnClick;
  };
};

const codeSection = createElement("div").setAttribute({ class: "hide" });
codeSection.append(
  createElement("div", code, { class: "form-input" }),
  createElement(
    "div",
    createElement(
      "div",
      [rememberBtn, createElement("div", "Remember for 30 days")],
      { class: "remember" }
    ),
    { class: "rememberForgot" }
  )
);

const button = createElement("button", "Continue", {
  class: "button",
  type: "submit",
});

const signUpSpan = createElement("span", "Sign Up for free");
signUpSpan.onload = () => {
  $(signUpSpan).onclick = () => {
    openSignUp();
  };
};

const error = createElement("div", "Error found!", { class: "error message" });
const success = createElement("div", "Success!", { class: "success message" });

form.append(
  createElement("div", userName, { class: "form-input" }),
  codeSection,
  button,
  error,
  success,
  createElement("div", ["Don't have an account? ", signUpSpan], {
    class: "footer",
  })
);

const showError = (err) => {
  $(success).style.display = "none";
  $(error).style.display = "flex";
  $(error).innerText = err;
};

const showSuccess = (suc) => {
  $(error).style.display = "none";
  $(success).style.display = "flex";
  $(success).innerText = suc;
};

const sendCode = async () => {
  $(error).style.display = "none";
  $(success).style.display = "none";
  $(button).disabled = true;
  $(button).innerText = "Processing...";
  $(userName).disabled = true;

  let result = JSON.parse(
    await post(gas, {
      type: 2,
      data: JSON.stringify({
        user: $(userName).value.trim(),
      }),
    })
  );

  if (result.result) {
    result = JSON.parse(result.message);
  }

  let { result: res, message, hash } = result;

  $(button).disabled = false;
  $(userName).disabled = false;
  if (res) {
    $(button).innerText = "Sign In";
    $(codeSection).style.display = "block";
    $(code).required = true;
    showSuccess(message);
    HASH = hash;
    codeSended = true;
  } else {
    $(button).innerText = "Continue";
    showError(message);
  }
};

const SingIn = async () => {
  $(error).style.display = "none";
  $(success).style.display = "none";
  $(button).disabled = true;
  $(button).innerText = "Processing...";
  $(userName).disabled = true;
  $(code).disabled = true;

  let result = JSON.parse(
    await post(gas, {
      type: 3,
      data: JSON.stringify({
        user: $(userName).value.trim(),
        hash: HASH,
        code: $(code).value,
      }),
    })
  );

  if (result.result) {
    result = JSON.parse(result.message);
  }

  let { result: res, message, data } = result;

  $(button).disabled = false;
  $(userName).disabled = false;
  $(code).disabled = true;
  if (res) {
    $(form).reset();
    $(button).innerText = "Continue";
    $(codeSection).style.display = "none";
    $(code).required = false;
    closeSignIn();
    HASH = undefined;
    codeSended = false;
    if (rememberBtnClick) {
      window.localStorage["evulve.login"] = JSON.stringify(data);
    } else {
      window.localStorage["evulve.login"] = JSON.stringify(data);
      window.localStorage["evulve.login.tem"] = true;
    }
    window.location.reload();
    setProfile(data);
  } else {
    $(button).innerText = "Sign In";
    showError(message);
  }
};

form.onload = () => {
  $(form).onsubmit = (e) => {
    e.preventDefault();
    if (!codeSended) {
      sendCode();
    } else {
      SingIn();
    }
  };
};

signIn.append(closeBtn, logo, heading, form);

export { signIn };
