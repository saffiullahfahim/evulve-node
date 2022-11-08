import dom from "../lib/DOM.js";
const { $, createElement, post } = dom;
import { config } from "../config/config.js";
const { gas } = config;
import icons from "./svgIcons.js";
const { closeIcon } = icons;

import { openSignIn, closeSignUp } from "./homeFun.js";

const singUp = createElement("section").setAttribute({
  class: "enterDiv signUpDiv",
});

const closeBtn = createElement("svg", closeIcon.childrens, closeIcon.attribute);
const logo = createElement("div", "EVULVE", { class: "logo" });
const heading = createElement("div", "Sign Up", { class: "heading" });
const form = createElement("form").setAttribute({
  class: "enterForm",
  name: "form",
});

closeBtn.onload = () => {
  $(closeBtn).onclick = () => {
    closeSignUp();
  };
};

const userName = createElement("input").setAttribute({
  autocomplete: "off",
  spellcheck: "false",
  required: "",
  placeholder: "Username",
  type: "text",
  value: "",
  name: "userName",
});

const phone = createElement("input").setAttribute({
  autocomplete: "off",
  spellcheck: "false",
  required: "",
  placeholder: "Phone Number",
  type: "text",
  value: "",
  name: "phone",
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

const codeSection = createElement("div").setAttribute({ class: "hide" });
codeSection.append(createElement("div", code, { class: "form-input" }));

const button = createElement("button", "Continue", {
  class: "button",
  type: "submit",
});

const signInSpan = createElement("span", "Sign In");
signInSpan.onload = () => {
  $(signInSpan).onclick = () => {
    openSignIn();
  };
};

const error = createElement("div", "Error found!", { class: "error message" });
const success = createElement("div", "Success!", { class: "success message" });

form.append(
  createElement("div", userName, { class: "form-input" }),
  createElement("div", phone, { class: "form-input" }),
  codeSection,
  button,
  error,
  success,
  createElement("div", ["Already have an account? ", signInSpan], {
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

let codeSended = false;
let HASH;

const sendCode = async () => {
  $(error).style.display = "none";
  $(success).style.display = "none";
  $(button).disabled = true;
  $(button).innerText = "Processing...";
  $(userName).disabled = true;
  $(phone).disabled = true;

  let result = JSON.parse(
    await post(gas, {
      type: 0,
      data: JSON.stringify({
        user: $(userName).value.trim(),
        phone: $(phone).value,
      }),
    })
  );

  if (result.result) {
    result = JSON.parse(result.message);
  }

  let { result: res, message, hash } = result;

  $(button).disabled = false;
  $(userName).disabled = false;
  $(phone).disabled = false;
  if (res) {
    $(button).innerText = "Sign Up";
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

const SingUp = async () => {
  $(error).style.display = "none";
  $(success).style.display = "none";
  $(button).disabled = true;
  $(button).innerText = "Processing...";
  $(userName).disabled = true;
  $(phone).disabled = true;
  $(code).disabled = true;

  let result = JSON.parse(
    await post(gas, {
      type: 1,
      data: JSON.stringify({
        user: $(userName).value.trim(),
        phone: $(phone).value,
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
  $(phone).disabled = false;
  $(code).disabled = true;
  if (res) {
    $(form).reset();
    $(button).innerText = "Continue";
    $(codeSection).style.display = "none";
    $(code).required = false;
    window.localStorage["evulve.login"] = JSON.stringify(data);
    window.localStorage["evulve.login.tem"] = true;
    window.location.reload();
    // showSuccess(message);
    // HASH = undefined;
    // codeSended = false;
  } else {
    $(button).innerText = "Sign Up";
    showError(message);
  }
};

form.onload = () => {
  $(form).onsubmit = (e) => {
    e.preventDefault();
    if (!codeSended) {
      sendCode();
    } else {
      SingUp();
    }
  };
};

singUp.append(closeBtn, logo, heading, form);

export { singUp };
