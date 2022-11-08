import { config } from "../config/config.js";

class CARD {
  #name;
  #picture;
  #timespan;
  #key;
  #heading;
  #content;
  #attachment;
  #view;
  #love;
  #comments;
  #evulve;
  #type;
  #from;
  #map;
  constructor({
    name,
    picture,
    key,
    heading,
    content,
    attachment,
    type,
    from,
    map,
  }) {
    this.#name = name;
    this.#picture = picture;
    this.#key = key;
    this.#heading = heading ? heading : "";
    this.#content = content;
    this.#attachment = attachment ? attachment : "";
    this.#timespan = config.date().toISOString();
    this.#view = [];
    this.#love = [];
    this.#comments = [];
    this.#evulve = [];
    this.#type = type;
    this.#map = map;
    this.#from = from ? from : "";
  }

  __timespan() {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let timespan = config.date();
    let date = String(timespan.getDate()).padStart(2, "0");
    let month = months[timespan.getMonth()];
    let hours = String(timespan.getHours()).padStart(2, "0");
    let minutes = String(timespan.getMinutes()).padStart(2, "0");
    return (
      date +
      " " +
      month +
      " " +
      timespan.getFullYear() +
      ", " +
      hours +
      ":" +
      minutes
    );
  }

  get name() {
    return this.#name;
  }

  get picture() {
    return this.#picture;
  }

  get key() {
    return this.#key;
  }

  get heading() {
    return this.#heading;
  }

  get content() {
    return this.#content;
  }

  get attachment() {
    return this.#attachment;
  }

  get timespan() {
    return this.#timespan;
  }

  get view() {
    return this.#view;
  }

  get type() {
    return this.#type;
  }

  get from() {
    return this.#from;
  }

  #addView() {
    this.#view += 1;
    return this.#view;
  }

  addView() {
    return this.#addView();
  }

  #removeView() {
    this.#view -= 1;
    if (this.#view < 0) this.#view = 0;
    return this.#view;
  }

  removeView() {
    return this.#removeView();
  }

  get love() {
    return this.#love;
  }

  #addLove() {
    this.#love += 1;
    return this.#love;
  }

  addLove() {
    return this.#addLove();
  }

  #removeLove() {
    this.#love -= 1;
    if (this.#love < 0) this.#love = 0;
    return this.#love;
  }

  removeLove() {
    return this.#removeLove();
  }

  get comments() {
    return this.#comments;
  }

  #appendComment(comment) {
    this.#comments.push(comment);
    return this.#comments;
  }

  appendComment(comment) {
    return this.#appendComment(comment);
  }

  get evulve() {
    return this.#evulve;
  }

  #appendEvulve(evulve) {
    this.#evulve.push(evulve);
    return this.#evulve;
  }

  appendEvulve(evulve) {
    return this.#appendEvulve(evulve);
  }

  get map() {
    return this.#map;
  }

  get object() {
    // let __comments = [];
    // for (let x of this.comments) {
    //   if (x.constructor.toString().indexOf("CARD") >= 0) {
    //     __comments.push(x.object);
    //   } else __comments.push(x);
    // }

    // let __evulve = [];
    // for (let x of this.evulve) {
    //   if (x.constructor.toString().indexOf("CARD") >= 0) {
    //     __evulve.push(x.object);
    //   } else __evulve.push(x);
    // }
    let result = {
      name: this.name,
      picture: this.picture,
      timespan: this.timespan,
      key: this.key,
      heading: this.heading,
      content: this.content,
      attachment: this.attachment,
      view: this.view,
      love: this.love,
      comments: [],
      evulve: [],
      type: this.type,
      from: this.from,
      id: window.btoa(this.#name + this.type + config.date().getTime()),
    };
    return result;
  }
}

export default CARD;
