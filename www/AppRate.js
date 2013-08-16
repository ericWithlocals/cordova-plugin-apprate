// Generated by CoffeeScript 1.6.3
var AppRate, channel;

channel = require("cordova/channel");

AppRate = function() {
  var rate, rate_reset, rate_stop, thisObj;
  thisObj = this;
  thisObj.app_id_ios = "123456789";
  thisObj.app_id_android = "com.company.YourAppID";
  thisObj.app_id_blackberry = "123456789";
  thisObj.rate_count_max = 3;
  thisObj.rate_app_counter = parseInt(window.localStorage.getItem("rate_app_counter") || 0);
  thisObj.rate_app = parseInt(window.localStorage.getItem("rate_app") || 1);
  rate = function(buttonIndex) {
    switch (buttonIndex) {
      case 1:
        rate_stop();
        if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent.toLowerCase())) {
          return window.open("itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=" + thisObj.app_id_ios);
        } else if (/(Android)/i.test(navigator.userAgent.toLowerCase())) {
          return window.open("market://details?id=" + thisObj.app_id_android);
        } else if (/(BlackBerry)/i.test(navigator.userAgent.toLowerCase())) {
          return window.open("http://appworld.blackberry.com/webstore/content/" + thisObj.app_id_blackberry);
        }
        break;
      case 2:
        return rate_reset();
      case 3:
        return rate_stop();
    }
  };
  rate_stop = function() {
    window.localStorage.setItem("rate_app", 0);
    return window.localStorage.setItem("rate_app_counter", thisObj.rate_count_max);
  };
  rate_reset = function() {
    return window.localStorage.setItem("rate_app_counter", 0);
  };
  return channel.onCordovaReady.subscribe(function() {
    if (navigator.notification) {
      if (thisObj.rate_app_counter === thisObj.rate_count_max && thisObj.rate_app !== 0) {
        return navigator.notification.confirm("Нам очень важно знать ваше мнение, пожалуйста оцените приложение. Это займет всего пару минут. \nСпасибо!", rate, "Оцените приложение", ["Оценить сейчас", "Напомнить позже", "Нет спасибо"]);
      } else if (thisObj.rate_app_counter < thisObj.rate_count_max) {
        thisObj.rate_app_counter++;
        return window.localStorage.setItem("rate_app_counter", thisObj.rate_app_counter);
      }
    }
  });
};

module.exports = new AppRate();