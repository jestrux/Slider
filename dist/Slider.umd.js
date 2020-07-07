(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Slider = factory());
}(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function Slider(containerId, options) {
    var defaultOptions = {
      cycle: false,
      hideActions: false,
      showActionsOnHover: false,
      slideDuration: 2000,
      onChange: null
    };
    this.options = _objectSpread2(_objectSpread2({}, defaultOptions), options);
    var container = document.querySelector("#" + containerId.replace("#", ""));
    this.wrapper = setupSlider(container);
    this.Scroller = this.wrapper.querySelector(".SlideScroller");
    this.SlideItems = this.wrapper.querySelectorAll(".SlideItem");
    this.SlideItems[0].classList.add("current");
    this.ActiveSlide = this.SlideItems[0]; // this.quoteMarkers = this.wrapper.querySelectorAll(".quote-marker");

    if (this.options.showActionsOnHover) this.wrapper.classList.add("show-actions-on-hover");
    this.currentIndex = 0;
    if (!this.options.hideActions) this.addMovers();
    return this;
  }

  function setupSlider(container) {
    Array.from(container.children).forEach(function (node) {
      return node.classList.add("SlideItem");
    });
    var SliderContent = document.createElement("div");
    SliderContent.classList.add("Slider");
    container.classList.add("SlideScroller");
    container.parentNode.insertBefore(SliderContent, container);
    SliderContent.appendChild(container);
    var SlideContainer = document.createElement("div");
    SlideContainer.classList.add("SlideContainer");
    SliderContent.insertBefore(SlideContainer, container);
    SlideContainer.appendChild(container);
    return SliderContent;
  }

  Slider.prototype.scrollSliderBack = function () {
    if (this.currentIndex > 0) this.currentIndex -= 1;else if (this.options.cycle) this.currentIndex = this.SlideItems.length - 1;else return;
    this.updateUI();
    if (this.slideshowTimer) this.play();
  };

  Slider.prototype.scrollSliderForward = function (fromAutoPlay) {
    if (this.currentIndex < this.SlideItems.length - 1) this.currentIndex += 1;else if (this.options.cycle) this.currentIndex = 0;else return;
    this.updateUI();

    if (fromAutoPlay !== true) {
      if (this.slideshowTimer) {
        clearInterval(this.slideshowTimer);
        this.play();
      }
    }
  };

  Slider.prototype.updateUI = function () {
    this.setActiveSlide();
    if (this.options.hideActions) return;

    if (!this.options.cycle) {
      if (this.currentIndex === 0) this.prevMoverButton.classList.add('disabled');else this.prevMoverButton.classList.remove('disabled');
      if (this.currentIndex === this.SlideItems.length - 1) this.nextMoverButton.classList.add('disabled');else this.nextMoverButton.classList.remove('disabled');
    } else {
      this.prevMoverButton.classList.remove('disabled');
      this.nextMoverButton.classList.remove('disabled');
    }
  };

  Slider.prototype.setActiveSlide = function () {
    var slideWidth = 100;
    this.Scroller.style.transform = "translateX(".concat(this.currentIndex * -slideWidth, "%)");
    this.ActiveSlide.classList.remove('current');
    var newActiveSlide = this.SlideItems[this.currentIndex];
    newActiveSlide.classList.add('current');
    this.ActiveSlide = newActiveSlide;

    if (typeof this.options.onChange === 'function') {
      var newPercent = this.currentIndex * 100 / (this.SlideItems.length - 1);
      this.options.onChange(this.currentIndex, newPercent);
    } // document.querySelector(".quote-marker.active").classList.remove('active');
    // quoteMarkers[this.currentIndex].classList.add('active');

  };

  Slider.prototype.addMovers = function () {
    var moversHtml = "\n    <div class=\"SlideMovers\">\n      <button aria-label=\"Previous\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/></svg>\n      </button>\n      \n      <button aria-label=\"Next\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/></svg>\n      </button>\n    </div>\n  ";
    var movers = new DOMParser().parseFromString(moversHtml, "text/html").body.firstChild;
    var moverButtons = movers.querySelectorAll("button");
    this.prevMoverButton = moverButtons[0];
    this.nextMoverButton = moverButtons[1];
    this.prevMoverButton.onclick = this.scrollSliderBack.bind(this);
    this.nextMoverButton.onclick = this.scrollSliderForward.bind(this);
    if (!this.options.cycle) this.prevMoverButton.classList.add("disabled");
    this.wrapper.appendChild(movers);
  };

  Slider.prototype.play = function (duration) {
    var _this = this;

    if (duration) this.options.slideDuration = duration;else duration = this.options.slideDuration;
    this.options.cycle = true;
    this.slideshowTimer = setInterval(function () {
      _this.scrollSliderForward(true);
    }, duration);
  };

  return Slider;

})));
