import dom from "../lib/DOM.js";
const { $, createElement, post } = dom;

import { config } from "../config/config.js";
const { save, __timespan } = config;

import { openSignIn } from "./homeFun.js";

import $card from "../lib/card.js";

import icons from "./svgIcons.js";
import {
  evulveDiv1_,
  evulveDiv2_,
  postField,
  selection,
  selectionBlur,
  moveCard,
} from "./main.js";

import { scoreSet } from "./profile.js";

let scoreCount = 0;
let connection;

const {
  key: keySvg,
  reply: replySvg,
  view,
  comment,
  react,
  evulve: evulveSvg,
  attachment: attachmentSvg,
  send: sendSvg,
} = icons;

const color = ["#E2A6E4", "#7E7FDF", "#B041FF"];
let colorCode = 0;

const createPost = (card, evulveDiv1, evulveDiv2, queue) => {
  const { CARDS, __timespan } = config;

  let {
    name: user,
    picture: pic,
    timespan,
    key: keyValue,
    content,
    view: views,
    love,
    comments,
    evulve: evulves,
    id: map,
  } = CARDS[card];

  timespan = __timespan(timespan);

  if (window.localStorage["evulve.login"]) {
    let clientUser = JSON.parse(window.localStorage["evulve.login"]).name;
    if (user == clientUser) scoreCount++;
  }

  const CardCotainer = createElement("div").setAttribute({
    class: "card post",
    map: map,
  });

  const top = createElement("div").setAttribute({
    class: "top",
  });

  const profile = createElement("div").setAttribute({
    class: "profile",
  });

  profile.append(
    createElement("img").setAttribute({
      src: `./assets/img/avature${pic}.png`,
      alt: "img",
    }),
    createElement(
      "div",
      [
        createElement("div", user, {
          class: "name",
        }),
        createElement("div", timespan, {
          class: "date",
        }),
      ],
      {
        class: "nameDate",
      }
    )
  );

  const key = createElement(
    "div",
    createElement(
      "div",
      [
        createElement("svg", keySvg.childrens, keySvg.attribute),
        createElement("div", keyValue),
      ],
      { class: "key" }
    ),
    {
      class: "keyDiv",
    }
  );

  top.append(profile, key);

  const middle = createElement("div").setAttribute({
    class: "middle",
  });

  const contentDiv = createElement("div", "", {
    class: "content",
  });

  let moreBtn = "";
  let content_ = content;
  if (content.length > 217) {
    content_ = content.substr(0, 217) + "...";
    moreBtn = createElement("div", "More", {
      class: "moreLessButton",
    });

    let moreBtnEnable = true;
    moreBtn.onload = () => {
      $(moreBtn).onclick = () => {
        if (moreBtnEnable) {
          $(moreBtn).innerText = "Less";
          $(contentDiv).innerText = content;
        } else {
          $(moreBtn).innerText = "More";
          $(contentDiv).innerText = content_;
        }
        moreBtnEnable = !moreBtnEnable;
      };
    };
  }
  contentDiv.setChildren(content_);

  middle.append(contentDiv, moreBtn);

  const bottom = createElement("div").setAttribute({
    class: "bottom",
  });

  const replyBtn = createElement(
    "div",
    [
      createElement("svg", replySvg.childrens, replySvg.attribute),
      createElement("div", "Reply"),
    ],
    {
      class: "flex-middle reply",
    }
  );

  if (window.localStorage["evulve.login"]) {
    let clientUser = JSON.parse(window.localStorage["evulve.login"]).name;

    if (views.indexOf(clientUser) < 0) {
      views.push(clientUser);
      CARDS[card].view = views;
      post(save, {
        type: 845,
        data: JSON.stringify({
          user: clientUser,
          id: card,
        }),
      });
    }
  }

  const reactBtn = createElement("svg", react.childrens, react.attribute);
  const reactStatus = createElement("div", love.length);
  if (window.localStorage["evulve.login"]) {
    let clientUser = JSON.parse(window.localStorage["evulve.login"]).name;
    let reactBtnEnable = true;
    if (love.indexOf(clientUser) >= 0) {
      reactBtn.setChildren(react.redChidrens);
      reactBtnEnable = false;
      scoreCount++;
    }

    reactBtn.onload = () => {
      $(reactBtn).onclick = () => {
        if (reactBtnEnable) {
          scoreCount++;
          scoreSet(scoreCount);
          love.push(clientUser);
          CARDS[card].love = love;
        } else {
          scoreCount--;
          scoreSet(scoreCount);
          let reactIndex = love.indexOf(clientUser);
          love = [...love.slice(0, reactIndex), ...love.slice(reactIndex + 1)];
          CARDS[card].love = love;
        }
        createCard(evulveDiv1, evulveDiv2, config.posts);
        reactBtnEnable = !reactBtnEnable;

        post(save, {
          type: 762,
          data: JSON.stringify({
            user: clientUser,
            id: card,
            picture: pic,
          }),
        });
      };
    };
  } else {
    reactBtn.onload = () => {
      $(reactBtn).onclick = openSignIn;
    };
  }

  let statusEvulveClass = evulves.length ? "statusEvulve2" : "statusEvulve";

  let evulve;
  let multipleEvulve = "";
  if (evulves.length) {
    let evulve2 = createElement(
      "div",
      [
        createElement("svg", evulveSvg.childrens, evulveSvg.attribute),
        createElement("div", "Evulve This"),
      ],
      {
        class: "evulveM",
      }
    );

    multipleEvulve = createElement("div", evulve2, {
      class: "multipleEvulve",
    });

    evulve = createElement(
      "div",
      [
        createElement("div", "Evulve"),
        createElement("svg", evulveSvg.childrens2, evulveSvg.attribute),
        multipleEvulve,
      ],
      {
        class: "evulve",
      }
    );

    evulve.onload = () => {
      let multipleEvulveShow = false;
      let timeout;
      $(evulve).onmouseover = () => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = undefined;
        }
        multipleEvulveShow = true;
        $(multipleEvulve).setAttribute("style", "display: flex !important");
      };

      $(evulve).onmouseout = () => {
        multipleEvulveShow = false;
        timeout = setTimeout(() => {
          if (!multipleEvulveShow) $(multipleEvulve).removeAttribute("style");
        }, 100);
      };

      $(evulve).touchstart = () => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = undefined;
        }
        multipleEvulveShow = true;
        $(multipleEvulve).setAttribute("style", "display: flex !important");
      };

      $(evulve).touchend = () => {
        multipleEvulveShow = false;
        timeout = setTimeout(() => {
          if (!multipleEvulveShow) $(multipleEvulve).removeAttribute("style");
        }, 100);
      };
    };

    multipleEvulve.onload = () => {
      if (!window.localStorage["evulve.login"]) {
        $(multipleEvulve).onclick = openSignIn;
        return;
      }
      $(multipleEvulve).onclick = () => {
        const { name: user, picture: pic } = JSON.parse(
          window.localStorage["evulve.login"]
        );

        let card_ = new $card({
          name: user,
          picture: pic,
          key: "0×55d3...3197955",
          content: content,
          type: "evulation",
          from: "post",
        }).object;

        post(save, {
          type: 901,
          data: JSON.stringify({
            CARDMODEL: card_,
            id: card,
          }),
        });

        CARDS[card].evulve.push(card_.id);
        CARDS[card_.id] = card_;

        createCard(evulveDiv1, evulveDiv2, config.posts);
        moveCard(card_.id);
      };
    };

    CARDS[card].evulve.forEach((value, index) => {
      CARDS[value].$evulve_ = evulve;
      CARDS[value].$color_ = color[colorCode];
    });

    colorCode++;

    if (colorCode == color.length - 1) {
      colorCode = 0;
    }

    queue.push(CARDS[card].evulve);
  } else {
    evulve = createElement(
      "div",
      [
        createElement("svg", evulveSvg.childrens, evulveSvg.attribute),
        createElement("div", "Evulve This"),
      ],
      {
        class: "evulve",
      }
    );
    evulve.onload = () => {
      if (!window.localStorage["evulve.login"]) {
        $(evulve).onclick = openSignIn;
        return;
      }
      $(evulve).onclick = () => {
        const { name: user, picture: pic } = JSON.parse(
          window.localStorage["evulve.login"]
        );

        let card_ = new $card({
          name: user,
          picture: pic,
          key: "0×55d3...3197955",
          content: content,
          type: "evulation",
          from: "post",
        }).object;

        post(save, {
          type: 901,
          data: JSON.stringify({
            CARDMODEL: card_,
            id: card,
          }),
        });

        CARDS[card].evulve.push(card_.id);
        CARDS[card_.id] = card_;

        createCard(evulveDiv1, evulveDiv2, config.posts);
        moveCard(card_.id);
      };
    };
  }

  bottom.append(
    replyBtn,
    createElement(
      "div",
      [
        createElement(
          "div",
          [
            createElement("svg", view.childrens, view.attribute),
            createElement("div", views.length),
          ],
          {
            class: "flex-middle status",
          }
        ),
        createElement(
          "div",
          [
            createElement("svg", comment.childrens, comment.attribute),
            createElement("div", comments.length),
          ],
          {
            class: "flex-middle status",
          }
        ),
        createElement("div", [reactBtn, reactStatus], {
          class: "flex-middle status",
        }),
        evulve,
      ],
      {
        class: statusEvulveClass,
      }
    )
  );

  const replyForm = createElement("form").setAttribute({
    class: "replyForm",
  });

  const send = createElement("svg", sendSvg.childrens, sendSvg.attribute);

  replyForm.onload = () => {
    //console.log(replyForm);
    let input_ = $(replyForm).querySelector("input");
    if (input_) {
      $(replyForm).querySelector("input").onselect = selection;
      $(replyForm).querySelector("input").onblur = selectionBlur;
      $(replyForm).querySelector("input").onfocus = selectionBlur;
    }
    $(replyForm).onsubmit = async (e) => {
      e.preventDefault();
      let input = e.target.querySelector("input");
      input.disabled = true;
      send.setChildren(sendSvg.runningchildrens);
      $(send).style.cursor = "no-drop";

      const { name: user, picture: pic } = JSON.parse(
        window.localStorage["evulve.login"]
      );

      let card_ = new $card({
        name: user,
        picture: pic,
        key: "0×55d3...3197955",
        content: input.value,
        type: "comment",
      }).object;

      const { result } = JSON.parse(
        JSON.parse(
          await post(save, {
            type: 901,
            data: JSON.stringify({
              CARDMODEL: card_,
              id: card,
            }),
          })
        ).messege
      );

      if (!result) {
        input.disabled = true;
        send.setChildren(sendSvg.childrens);
        return;
      }

      CARDS[card].comments.push(card_.id);
      CARDS[card_.id] = card_;

      createCard(evulveDiv1, evulveDiv2, config.posts);

      moveCard(card.id);
    };
  };

  CardCotainer.append(top, middle, bottom, replyForm);

  replyBtn.onload = () => {
    if (!window.localStorage["evulve.login"]) {
      $(replyBtn).onclick = openSignIn;
      return;
    }
    $(replyBtn).onclick = () => {
      const { name: user, picture: pic } = JSON.parse(
        window.localStorage["evulve.login"]
      );
      $(replyBtn).classList.add("replyActive");
      replyForm.setChildren([
        createElement(
          "div",
          [
            createElement("img").setAttribute({
              src: `./assets/img/avature${pic}.png`,
            }),
            createElement("input").setAttribute({
              autocomplete: "off",
              spellcheck: "false",
              required: "",
              placeholder: "Reply",
              type: "text",
              value: "",
            }),
          ],
          { class: "profile" }
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
              style:
                "background: none; border: none; outline: none; padding: 0;",
            }),
          ],
          {
            class: "attachmentSend",
          }
        ),
      ]);
      $(replyForm).style.display = "flex";
    };
  };
  evulveDiv1.append(CardCotainer);

  createComments__(CARDS[card].comments, evulveDiv1, evulveDiv2, queue);
};

const createComments__ = (comments, evulveDiv1, evulveDiv2, queue) => {
  comments.sort((a, b) => {
    let x = new Date(config.CARDS[a].timespan).getTime();
    let y = new Date(config.CARDS[b].timespan).getTime();
    return y - x;
  });

  comments.forEach((card, index) => {
    createComment(card, evulveDiv1, evulveDiv2, queue);
  });
};

const createComment = (card, evulveDiv1, evulveDiv2, queue) => {
  const { CARDS, __timespan } = config;

  let {
    name: user,
    picture: pic,
    timespan,
    key: keyValue,
    content,
    view: views,
    love,
    comments,
    evulve: evulves,
    id: map,
  } = CARDS[card];

  timespan = __timespan(timespan);

  if (window.localStorage["evulve.login"]) {
    let clientUser = JSON.parse(window.localStorage["evulve.login"]).name;
    if (user == clientUser) scoreCount++;
  }

  const CardCotainer = createElement("div").setAttribute({
    class: "card",
    map: map,
  });

  const top = createElement("div").setAttribute({
    class: "top",
  });

  const profile = createElement("div").setAttribute({
    class: "profile",
  });

  profile.append(
    createElement("img").setAttribute({
      src: `./assets/img/avature${pic}.png`,
      alt: "img",
    }),
    createElement(
      "div",
      [
        createElement("div", user, {
          class: "name",
        }),
        createElement("div", timespan, {
          class: "date",
        }),
      ],
      {
        class: "nameDate",
      }
    )
  );

  const key = createElement(
    "div",
    createElement(
      "div",
      [
        createElement("svg", keySvg.childrens, keySvg.attribute),
        createElement("div", keyValue),
      ],
      { class: "key" }
    ),
    {
      class: "keyDiv",
    }
  );

  top.append(profile, key);

  const middle = createElement("div").setAttribute({
    class: "middle",
  });

  const contentDiv = createElement("div", "", {
    class: "content",
  });

  let moreBtn = "";
  let content_ = content;
  if (content.length > 217) {
    content_ = content.substr(0, 217) + "...";
    moreBtn = createElement("div", "More", {
      class: "moreLessButton",
    });

    let moreBtnEnable = true;
    moreBtn.onload = () => {
      $(moreBtn).onclick = () => {
        if (moreBtnEnable) {
          $(moreBtn).innerText = "Less";
          $(contentDiv).innerText = content;
        } else {
          $(moreBtn).innerText = "More";
          $(contentDiv).innerText = content_;
        }
        moreBtnEnable = !moreBtnEnable;
      };
    };
  }
  contentDiv.setChildren(content_);

  middle.append(contentDiv, moreBtn);

  const bottom = createElement("div").setAttribute({
    class: "bottom",
  });

  const replyBtn = createElement(
    "div",
    [
      createElement("svg", replySvg.childrens, replySvg.attribute),
      createElement("div", "Reply"),
    ],
    {
      class: "flex-middle reply",
    }
  );

  if (window.localStorage["evulve.login"]) {
    let clientUser = JSON.parse(window.localStorage["evulve.login"]).name;

    if (views.indexOf(clientUser) < 0) {
      views.push(clientUser);
      CARDS[card].view = views;
      post(save, {
        type: 845,
        data: JSON.stringify({
          user: clientUser,
          id: card,
        }),
      });
    }
  }

  const reactBtn = createElement("svg", react.childrens, react.attribute);
  const reactStatus = createElement("div", love.length);
  if (window.localStorage["evulve.login"]) {
    let clientUser = JSON.parse(window.localStorage["evulve.login"]).name;

    let reactBtnEnable = true;
    if (love.indexOf(clientUser) >= 0) {
      reactBtn.setChildren(react.redChidrens);
      reactBtnEnable = false;
      scoreCount++;
    }

    reactBtn.onload = () => {
      $(reactBtn).onclick = () => {
        if (reactBtnEnable) {
          scoreCount++;
          scoreSet(scoreCount);
          love.push(clientUser);
          CARDS[card].love = love;
        } else {
          scoreCount--;
          scoreSet(scoreCount);
          let reactIndex = love.indexOf(clientUser);
          love = [...love.slice(0, reactIndex), ...love.slice(reactIndex + 1)];
          CARDS[card].love = love;
        }
        createCard(evulveDiv1, evulveDiv2, config.posts);
        reactBtnEnable = !reactBtnEnable;

        post(save, {
          type: 762,
          data: JSON.stringify({
            user: clientUser,
            id: card,
            picture: pic,
          }),
        });
      };
    };
  } else {
    reactBtn.onload = () => {
      $(reactBtn).onclick = openSignIn;
    };
  }

  let statusEvulveClass = evulves.length ? "statusEvulve2" : "statusEvulve";

  let evulve;
  if (evulves.length) {
    let evulve2 = createElement(
      "div",
      [
        createElement("svg", evulveSvg.childrens, evulveSvg.attribute),
        createElement("div", "Evulve This"),
      ],
      {
        class: "evulveM",
      }
    );

    let multipleEvulve = createElement("div", evulve2, {
      class: "multipleEvulve",
    });

    evulve = createElement(
      "div",
      [
        createElement("div", "Evulve"),
        createElement("svg", evulveSvg.childrens2, evulveSvg.attribute),
        multipleEvulve,
      ],
      {
        class: "evulve",
      }
    );

    evulve.onload = () => {
      let multipleEvulveShow = false;
      let timeout;
      $(evulve).onmouseover = () => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = undefined;
        }
        multipleEvulveShow = true;
        $(multipleEvulve).setAttribute("style", "display: flex !important");
      };

      $(evulve).onmouseout = () => {
        multipleEvulveShow = false;
        timeout = setTimeout(() => {
          if (!multipleEvulveShow) $(multipleEvulve).removeAttribute("style");
        }, 100);
      };

      $(evulve).touchstart = () => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = undefined;
        }
        multipleEvulveShow = true;
        $(multipleEvulve).setAttribute("style", "display: flex !important");
      };

      $(evulve).touchend = () => {
        multipleEvulveShow = false;
        timeout = setTimeout(() => {
          if (!multipleEvulveShow) $(multipleEvulve).removeAttribute("style");
        }, 100);
      };
    };

    multipleEvulve.onload = () => {
      if (!window.localStorage["evulve.login"]) {
        $(multipleEvulve).onclick = openSignIn;
        return;
      }
      $(multipleEvulve).onclick = () => {
        const { name: user, picture: pic } = JSON.parse(
          window.localStorage["evulve.login"]
        );

        let card_ = new $card({
          name: user,
          picture: pic,
          key: "0×55d3...3197955",
          content: content,
          type: "evulation",
          from: "comment",
        }).object;

        post(save, {
          type: 901,
          data: JSON.stringify({
            CARDMODEL: card_,
            id: card,
          }),
        });

        CARDS[card].evulve.push(card_.id);
        CARDS[card_.id] = card_;

        createCard(evulveDiv1, evulveDiv2, config.posts);
        moveCard(card_.id);
      };
    };

    CARDS[card].evulve.forEach((value, index) => {
      CARDS[value].$evulve_ = evulve;
      CARDS[value].$color_ = color[colorCode];
    });

    colorCode++;

    if (colorCode == color.length - 1) {
      colorCode = 0;
    }

    queue.push(CARDS[card].evulve);
  } else {
    evulve = createElement(
      "div",
      [
        createElement("svg", evulveSvg.childrens, evulveSvg.attribute),
        createElement("div", "Evulve This"),
      ],
      {
        class: "evulve",
      }
    );
    evulve.onload = () => {
      if (!window.localStorage["evulve.login"]) {
        $(evulve).onclick = openSignIn;
        return;
      }
      $(evulve).onclick = () => {
        const { name: user, picture: pic } = JSON.parse(
          window.localStorage["evulve.login"]
        );

        let card_ = new $card({
          name: user,
          picture: pic,
          key: "0×55d3...3197955",
          content: content,
          type: "evulation",
          from: "comment",
        }).object;

        post(save, {
          type: 901,
          data: JSON.stringify({
            CARDMODEL: card_,
            id: card,
          }),
        });

        CARDS[card].evulve.push(card_.id);
        CARDS[card_.id] = card_;

        createCard(evulveDiv1, evulveDiv2, config.posts);
        moveCard(card_.id);
      };
    };
  }

  bottom.append(
    replyBtn,
    createElement(
      "div",
      [
        createElement(
          "div",
          [
            createElement("svg", view.childrens, view.attribute),
            createElement("div", views.length),
          ],
          {
            class: "flex-middle status",
          }
        ),
        createElement(
          "div",
          [
            createElement("svg", comment.childrens, comment.attribute),
            createElement("div", comments.length),
          ],
          {
            class: "flex-middle status",
          }
        ),
        createElement("div", [reactBtn, reactStatus], {
          class: "flex-middle status",
        }),
        evulve,
      ],
      {
        class: statusEvulveClass,
      }
    )
  );

  const replyForm = createElement("form").setAttribute({
    class: "replyForm",
  });

  const send = createElement("svg", sendSvg.childrens, sendSvg.attribute);

  replyForm.onload = () => {
    let input_ = $(replyForm).querySelector("input");
    if (input_) {
      $(replyForm).querySelector("input").onselect = selection;
      $(replyForm).querySelector("input").onblur = selectionBlur;
      $(replyForm).querySelector("input").onfocus = selectionBlur;
    }
    $(replyForm).onsubmit = async (e) => {
      e.preventDefault();
      let input = e.target.querySelector("input");
      input.disabled = true;
      send.setChildren(sendSvg.runningchildrens);
      $(send).style.cursor = "no-drop";

      const { name: user, picture: pic } = JSON.parse(
        window.localStorage["evulve.login"]
      );

      let card_ = new $card({
        name: user,
        picture: pic,
        key: "0×55d3...3197955",
        content: input.value,
        type: "comment",
      }).object;

      const { result } = JSON.parse(
        JSON.parse(
          await post(save, {
            type: 901,
            data: JSON.stringify({
              CARDMODEL: card_,
              id: card,
            }),
          })
        ).messege
      );

      if (!result) {
        input.disabled = true;
        send.setChildren(sendSvg.childrens);
        return;
      }

      CARDS[card].comments.push(card_.id);
      CARDS[card_.id] = card_;

      createCard(evulveDiv1, evulveDiv2, config.posts);

      moveCard(card_.id);
    };
  };

  CardCotainer.append(top, middle, bottom, replyForm);

  replyBtn.onload = () => {
    if (!window.localStorage["evulve.login"]) {
      $(replyBtn).onclick = openSignIn;
      return;
    }
    $(replyBtn).onclick = () => {
      const { name: user, picture: pic } = JSON.parse(
        window.localStorage["evulve.login"]
      );
      $(replyBtn).classList.add("replyActive");
      replyForm.setChildren([
        createElement(
          "div",
          [
            createElement("img").setAttribute({
              src: `./assets/img/avature${pic}.png`,
            }),
            createElement("input").setAttribute({
              autocomplete: "off",
              spellcheck: "false",
              required: "",
              placeholder: "Reply",
              type: "text",
              value: "",
            }),
          ],
          { class: "profile" }
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
              style:
                "background: none; border: none; outline: none; padding: 0;",
            }),
          ],
          {
            class: "attachmentSend",
          }
        ),
      ]);
      $(replyForm).style.display = "flex";
    };
  };
  evulveDiv1.append(CardCotainer);

  createComments__(CARDS[card].comments, evulveDiv1, evulveDiv2, queue);
};

const createEvulvePost = (card, evulveDiv1, evulveDiv2, queue) => {
  const { CARDS, __timespan } = config;

  let {
    name: user,
    picture: pic,
    timespan,
    key: keyValue,
    content,
    view: views,
    love,
    comments,
    evulve: evulves,
    type,
    from,
    id: map,
    $evulve_,
    $color_,
  } = CARDS[card];

  timespan = __timespan(timespan);

  if (from == "post") from = "evulation";

  if (window.localStorage["evulve.login"]) {
    let clientUser = JSON.parse(window.localStorage["evulve.login"]).name;
    if (user == clientUser) scoreCount++;
  }

  const CardCotainer = createElement("div").setAttribute({
    class: "card evulation- " + from,
    map: map,
  });

  const top = createElement("div").setAttribute({
    class: "top",
  });

  const profile = createElement("div").setAttribute({
    class: "profile",
  });

  profile.append(
    createElement("img").setAttribute({
      src: `./assets/img/avature${pic}.png`,
      alt: "img",
    }),
    createElement(
      "div",
      [
        createElement("div", user, {
          class: "name",
        }),
        createElement("div", timespan, {
          class: "date",
        }),
      ],
      {
        class: "nameDate",
      }
    )
  );

  const evulation = createElement(
    "div",
    [
      createElement("svg", evulveSvg.childrens, evulveSvg.attribute),
      createElement("div", "Evolution"),
    ],
    {
      class: "evulve",
    }
  );

  //$evulve_.onload = () => {
  evulation.onload = () => {
    if ($evulve_ !== undefined)
      new Connector(
        $($evulve_),
        $(evulation),
        document.querySelector("main"),
        $color_
      );
  };
  // };
  const key = createElement(
    "div",
    [
      evulation,
      createElement(
        "div",
        [
          createElement("svg", keySvg.childrens, keySvg.attribute),
          createElement("div", keyValue),
        ],
        { class: "key" }
      ),
    ],
    {
      class: "keyDiv",
    }
  );

  top.append(key, profile);

  const middle = createElement("div").setAttribute({
    class: "middle",
  });

  const contentDiv = createElement("div", "", {
    class: "content",
  });

  let moreBtn = "";
  let content_ = content;
  if (content.length > 217 && type) {
    content_ = content.substr(0, 217) + "...";
    moreBtn = createElement("div", "More", {
      class: "moreLessButton",
    });

    let moreBtnEnable = true;
    moreBtn.onload = () => {
      $(moreBtn).onclick = () => {
        if (moreBtnEnable) {
          $(moreBtn).innerText = "Less";
          $(contentDiv).innerText = content;
        } else {
          $(moreBtn).innerText = "More";
          $(contentDiv).innerText = content_;
        }
        moreBtnEnable = !moreBtnEnable;
      };
    };
  }
  contentDiv.setChildren(content_);

  middle.append(contentDiv, moreBtn);

  const bottom = createElement("div").setAttribute({
    class: "bottom",
  });

  const replyBtn = createElement(
    "div",
    [
      createElement("svg", replySvg.childrens, replySvg.attribute),
      createElement("div", "Reply"),
    ],
    {
      class: "flex-middle reply",
    }
  );

  if (window.localStorage["evulve.login"]) {
    let clientUser = JSON.parse(window.localStorage["evulve.login"]).name;

    if (views.indexOf(clientUser) < 0) {
      views.push(clientUser);
      CARDS[card].view = views;
      post(save, {
        type: 845,
        data: JSON.stringify({
          user: clientUser,
          id: card,
        }),
      });
    }
  }

  const reactBtn = createElement("svg", react.childrens, react.attribute);
  const reactStatus = createElement("div", love.length);
  if (window.localStorage["evulve.login"]) {
    let clientUser = JSON.parse(window.localStorage["evulve.login"]).name;

    let reactBtnEnable = true;
    if (love.indexOf(clientUser) >= 0) {
      reactBtn.setChildren(react.redChidrens);
      reactBtnEnable = false;
      scoreCount++;
    }

    reactBtn.onload = () => {
      $(reactBtn).onclick = () => {
        if (reactBtnEnable) {
          scoreCount++;
          scoreSet(scoreCount);
          love.push(clientUser);
          CARDS[card].love = love;
        } else {
          scoreCount--;
          scoreSet(scoreCount);
          let reactIndex = love.indexOf(clientUser);
          love = [...love.slice(0, reactIndex), ...love.slice(reactIndex + 1)];
          CARDS[card].love = love;
        }
        createCard(evulveDiv1, evulveDiv2, config.posts);
        reactBtnEnable = !reactBtnEnable;

        post(save, {
          type: 762,
          data: JSON.stringify({
            user: clientUser,
            id: card,
            picture: pic,
          }),
        });
      };
    };
  } else {
    reactBtn.onload = () => {
      $(reactBtn).onclick = openSignIn;
    };
  }

  let statusEvulveClass = evulves.length ? "statusEvulve2" : "statusEvulve";

  let evulve;
  if (evulves.length) {
    let evulve2 = createElement(
      "div",
      [
        createElement("svg", evulveSvg.childrens, evulveSvg.attribute),
        createElement("div", "Evulve This"),
      ],
      {
        class: "evulveM",
      }
    );

    let multipleEvulve = createElement("div", evulve2, {
      class: "multipleEvulve",
    });

    evulve = createElement(
      "div",
      [
        createElement("div", "Evulve"),
        createElement("svg", evulveSvg.childrens2, evulveSvg.attribute),
        multipleEvulve,
      ],
      {
        class: "evulve",
      }
    );

    evulve.onload = () => {
      let multipleEvulveShow = false;
      let timeout;
      $(evulve).onmouseover = () => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = undefined;
        }
        multipleEvulveShow = true;
        $(multipleEvulve).setAttribute("style", "display: flex !important");
      };

      $(evulve).onmouseout = () => {
        multipleEvulveShow = false;
        timeout = setTimeout(() => {
          if (!multipleEvulveShow) $(multipleEvulve).removeAttribute("style");
        }, 100);
      };

      $(evulve).touchstart = () => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = undefined;
        }
        multipleEvulveShow = true;
        $(multipleEvulve).setAttribute("style", "display: flex !important");
      };

      $(evulve).touchend = () => {
        multipleEvulveShow = false;
        timeout = setTimeout(() => {
          if (!multipleEvulveShow) $(multipleEvulve).removeAttribute("style");
        }, 100);
      };
    };

    multipleEvulve.onload = () => {
      if (!window.localStorage["evulve.login"]) {
        $(multipleEvulve).onclick = openSignIn;
        return;
      }
      $(multipleEvulve).onclick = () => {
        const { name: user, picture: pic } = JSON.parse(
          window.localStorage["evulve.login"]
        );
        if (type == "") type == undefined;

        let card_ = new $card({
          name: user,
          picture: pic,
          key: "0×55d3...3197955",
          content: content,
          type: "evulation",
          from: from,
        }).object;

        post(save, {
          type: 901,
          data: JSON.stringify({
            CARDMODEL: card_,
            id: card,
          }),
        });

        CARDS[card].evulve.push(card_.id);
        CARDS[card_.id] = card_;

        createCard(evulveDiv1, evulveDiv2, config.posts);
        moveCard(card_.id);
      };
    };

    CARDS[card].evulve.forEach((value, index) => {
      CARDS[value].$evulve_ = evulve;
      CARDS[value].$color_ = color[colorCode];
    });

    colorCode++;

    if (colorCode == color.length - 1) {
      colorCode = 0;
    }

    queue.push(CARDS[card].evulve);
  } else {
    evulve = createElement(
      "div",
      [
        createElement("svg", evulveSvg.childrens, evulveSvg.attribute),
        createElement("div", "Evulve This"),
      ],
      {
        class: "evulve",
      }
    );
    evulve.onload = () => {
      if (!window.localStorage["evulve.login"]) {
        $(evulve).onclick = openSignIn;
        return;
      }
      $(evulve).onclick = () => {
        const { name: user, picture: pic } = JSON.parse(
          window.localStorage["evulve.login"]
        );
        if (type == "") type == undefined;

        let card_ = new $card({
          name: user,
          picture: pic,
          key: "0×55d3...3197955",
          content: content,
          type: "evulation",
          from: from,
        }).object;

        post(save, {
          type: 901,
          data: JSON.stringify({
            CARDMODEL: card_,
            id: card,
          }),
        });

        CARDS[card].evulve.push(card_.id);
        CARDS[card_.id] = card_;

        createCard(evulveDiv1, evulveDiv2, config.posts);
        moveCard(card_.id);
      };
    };
  }

  bottom.append(
    replyBtn,
    createElement(
      "div",
      [
        createElement(
          "div",
          [
            createElement("svg", view.childrens, view.attribute),
            createElement("div", views.length),
          ],
          {
            class: "flex-middle status",
          }
        ),
        createElement(
          "div",
          [
            createElement("svg", comment.childrens, comment.attribute),
            createElement("div", comments.length),
          ],
          {
            class: "flex-middle status",
          }
        ),
        createElement("div", [reactBtn, reactStatus], {
          class: "flex-middle status",
        }),
        evulve,
      ],
      {
        class: statusEvulveClass,
      }
    )
  );

  const replyForm = createElement("form").setAttribute({
    class: "replyForm",
  });

  const send = createElement("svg", sendSvg.childrens, sendSvg.attribute);

  replyForm.onload = () => {
    //console.log(replyForm);
    let input_ = $(replyForm).querySelector("input");
    if (input_) {
      $(replyForm).querySelector("input").onselect = selection;
      $(replyForm).querySelector("input").onblur = selectionBlur;
      $(replyForm).querySelector("input").onfocus = selectionBlur;
    }
    $(replyForm).onsubmit = async (e) => {
      e.preventDefault();
      let input = e.target.querySelector("input");
      input.disabled = true;
      send.setChildren(sendSvg.runningchildrens);
      $(send).style.cursor = "no-drop";

      const { name: user, picture: pic } = JSON.parse(
        window.localStorage["evulve.login"]
      );

      let card_ = new $card({
        name: user,
        picture: pic,
        key: "0×55d3...3197955",
        content: input.value,
        type: "comment",
      }).object;

      const { result } = JSON.parse(
        JSON.parse(
          await post(save, {
            type: 901,
            data: JSON.stringify({
              CARDMODEL: card_,
              id: card,
            }),
          })
        ).messege
      );

      if (!result) {
        input.disabled = true;
        send.setChildren(sendSvg.childrens);
        return;
      }

      CARDS[card].comments.push(card_.id);
      CARDS[card_.id] = card_;

      createCard(evulveDiv1, evulveDiv2, config.posts);

      moveCard(card.id);
    };
  };

  CardCotainer.append(top, middle, bottom, replyForm);

  replyBtn.onload = () => {
    if (!window.localStorage["evulve.login"]) {
      $(replyBtn).onclick = openSignIn;
      return;
    }
    $(replyBtn).onclick = () => {
      const { name: user, picture: pic } = JSON.parse(
        window.localStorage["evulve.login"]
      );
      $(replyBtn).classList.add("replyActive");
      replyForm.setChildren([
        createElement(
          "div",
          [
            createElement("img").setAttribute({
              src: `./assets/img/avature${pic}.png`,
            }),
            createElement("input").setAttribute({
              autocomplete: "off",
              spellcheck: "false",
              required: "",
              placeholder: "Reply",
              type: "text",
              value: "",
            }),
          ],
          { class: "profile" }
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
              style:
                "background: none; border: none; outline: none; padding: 0;",
            }),
          ],
          {
            class: "attachmentSend",
          }
        ),
      ]);
      $(replyForm).style.display = "flex";
    };
  };
  evulveDiv1.append(CardCotainer);

  createComments__(CARDS[card].comments, evulveDiv1, evulveDiv2, queue);
};

const createEvulve = (Queue, evulveDiv) => {
  const { CARDS } = config;
  const evulveDiv1 = createElement("div");
  const evulveDiv2 = createElement("div").setAttribute({
    class: "container-row",
  });

  evulveDiv.append(evulveDiv1, evulveDiv2);

  // console.log(CARDS);
  if (Queue.length) {
    let queue = [];
    // Queue.sort((a, b) => {
    //   let x = new Date(a.timespan).getTime();
    //   let y = new Date(b.timespan).getTime();
    //   //console.log(a, b);
    //   return y - x;
    // });
    Queue.forEach((card, index) => {
      Queue[index].sort((a, b) => {
        let x = new Date(CARDS[a].timespan).getTime();
        let y = new Date(CARDS[b].timespan).getTime();
        // console.log(x, y);
        return y - x;
      });
      Queue[index].forEach((card, i) => {
        createEvulvePost(card, evulveDiv1, evulveDiv2, queue);
      });
    });
    //console.log(queue);
    createEvulve(queue, evulveDiv2);
  } else {
    scoreSet(scoreCount);
  }
};

const createCard = (evulveDiv1, evulveDiv2, posts) => {
  scoreCount = 0;
  colorCode = 0;
  connection = {};
  let connectors = document.querySelectorAll(`[connector="evulve"]`);
  if (connectors)
    connectors.forEach((v) => {
      v.remove();
    });
  evulveDiv1_.setChildren(postField);
  evulveDiv2_.setChildren([]);
  let queue = [];

  posts.sort((a, b) => {
    let x = new Date(config.CARDS[a].timespan).getTime();
    let y = new Date(config.CARDS[b].timespan).getTime();
    return y - x;
  });

  posts.forEach((card) => {
    //console.log(card);
    createPost(card, evulveDiv1_, evulveDiv2_, queue);
  });

  //console.log(window.config = config);

  if (queue.length) createEvulve(queue, evulveDiv2_);
  else scoreSet(scoreCount);
};

export { createCard };
