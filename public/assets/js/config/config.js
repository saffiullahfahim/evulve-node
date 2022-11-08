const localEnv = true;
const testEnv = false;

const config = {
  date(date = "") {
    if (date) return new Date(new Date(date).getTime() - this.serverTimeDiff);
    return new Date(new Date().getTime() - this.serverTimeDiff);
  },

  __timespan(time) {
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

    // console.log(config);
    let timespan = config.date(time);
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
  },

  test_data: "/assets/js/config/data.txt",
  gas: "https://script.google.com/macros/s/AKfycbzGqc2kH2lNB307HltH5MrVo1pTIjgWfE6w9EhaLCMaWBaOpeRg1SOF0C05azgu9JGL/exec",
  save: "https://script.google.com/macros/s/AKfycbyQQ33UhQPphzhsGw_mBwSpq3a6pfTnvJ5FsgVg2jV0nakZ4OOsAQqC4gsdcBBN2rdX/exec",
  data: "https://script.google.com/macros/s/AKfycbyQQ33UhQPphzhsGw_mBwSpq3a6pfTnvJ5FsgVg2jV0nakZ4OOsAQqC4gsdcBBN2rdX/exec",
  _save:
    "https://script.google.com/macros/s/AKfycbwJFChk7E4SHRZXI9xZTbNHpyFhywuHt61kbLDxa4z54nXyGNw5n54KyPs4mHDtxmuN2w/exec",
  _data:
    "https://script.google.com/macros/s/AKfycbwJFChk7E4SHRZXI9xZTbNHpyFhywuHt61kbLDxa4z54nXyGNw5n54KyPs4mHDtxmuN2w/exec",
};

if (localEnv) {
  config.data = config._data;
  config.save = config._save;

  if (testEnv) {
    config.data = config.test_data;
    config.save = config.data;
  }
}

export { config };
