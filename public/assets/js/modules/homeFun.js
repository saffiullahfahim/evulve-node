const openSignIn = () => {
  let block = document.querySelector(".block");
  let enterContainer = document.querySelector(".enterContainer");
  let signInDiv = document.querySelector(".signInDiv");
  let signUpDiv = document.querySelector(".signUpDiv");

  signInDiv.querySelector(".error").style.display = "none";
  signInDiv.querySelector(".success").style.display = "none";

  signUpDiv.querySelector(".error").style.display = "none";
  signUpDiv.querySelector(".success").style.display = "none";

  let hide1 = signInDiv.querySelector(".hide");
  hide1.querySelector("input").required = false;
  hide1.style.display = "none";

  let hide2 = signUpDiv.querySelector(".hide");
  hide2.querySelector("input").required = false;
  hide2.style.display = "none";

  let inputs = enterContainer.querySelectorAll("input");
  for (let x of inputs) {
    x.disabled = false;
  }

  let buttons = enterContainer.querySelectorAll("button");
  for (let x of buttons) {
    x.disabled = false;
  }

  signInDiv.querySelector("form").reset();
  signUpDiv.querySelector("form").reset();

  block.classList.remove("hide");
  enterContainer.classList.remove("hide");
  setTimeout(function () {
    signInDiv.classList.add("scale");
    //signInDiv.style.transform = "scale(1)";
  }, 50);
  signUpDiv.classList.add("hide");
  signUpDiv.classList.remove("scale");
  signUpDiv.classList.remove("hide");
};

const closeSignIn = () => {
  let block = document.querySelector(".block");
  let enterContainer = document.querySelector(".enterContainer");
  let signInDiv = document.querySelector(".signInDiv");

  signInDiv.classList.remove("scale");
  setTimeout(function () {
    block.classList.add("hide");
    enterContainer.classList.add("hide");
  }, 350);
};

const openSignUp = () => {
  let block = document.querySelector(".block");
  let enterContainer = document.querySelector(".enterContainer");
  let signInDiv = document.querySelector(".signInDiv");
  let signUpDiv = document.querySelector(".signUpDiv");

  signInDiv.querySelector(".error").style.display = "none";
  signInDiv.querySelector(".success").style.display = "none";

  signUpDiv.querySelector(".error").style.display = "none";
  signUpDiv.querySelector(".success").style.display = "none";

  let hide1 = signInDiv.querySelector(".hide");
  hide1.querySelector("input").required = false;
  hide1.style.display = "none";

  let hide2 = signUpDiv.querySelector(".hide");
  hide2.querySelector("input").required = false;
  hide2.style.display = "none";

  let inputs = enterContainer.querySelectorAll("input");
  for (let x of inputs) {
    x.disabled = false;
  }

  let buttons = enterContainer.querySelectorAll("button");
  for (let x of buttons) {
    x.disabled = false;
    x.innerText = "Continue";
  }

  signInDiv.querySelector("form").reset();
  signUpDiv.querySelector("form").reset();

  block.classList.remove("hide");
  enterContainer.classList.remove("hide");
  setTimeout(function () {
    signUpDiv.classList.add("scale");
    //signInDiv.style.transform = "scale(1)";
  }, 50);
  signInDiv.classList.add("hide");
  signInDiv.classList.remove("scale");
  signInDiv.classList.remove("hide");
};

const closeSignUp = () => {
  let block = document.querySelector(".block");
  let enterContainer = document.querySelector(".enterContainer");
  let signUpDiv = document.querySelector(".signUpDiv");

  signUpDiv.classList.remove("scale");
  setTimeout(function () {
    block.classList.add("hide");
    enterContainer.classList.add("hide");
  }, 350);
};

export { openSignIn, openSignUp, closeSignIn, closeSignUp };
