function Slider(containerId, options) {
  const defaultOptions = {
    hideActions: false,
    onChange: null
  };
  
  this.options = {
    ...defaultOptions,
    ...options
  };

  const container = document.querySelector("#" + containerId.replace("#", ""));
  this.wrapper = setupSlider(container);
  this.Scroller = this.wrapper.querySelector(".SlideScroller");
  this.SlideItems = this.wrapper.querySelectorAll(".SlideItem");
  this.SlideItems[0].classList.add("current");
  this.ActiveSlide = this.SlideItems[0];

  // this.quoteMarkers = this.wrapper.querySelectorAll(".quote-marker");

  this.currentIndex = 0;

  if(!this.options.hideActions)
    this.addMovers();

  return this;
}

function setupSlider(container) {
  Array.from(container.children).forEach(node => node.classList.add("SlideItem"))

  const SliderContent = document.createElement("div");
  SliderContent.classList.add("Slider");

  container.classList.add("SlideScroller");
  container.parentNode.insertBefore(SliderContent, container);
  SliderContent.appendChild(container);

  const SlideContainer = document.createElement("div");
  SlideContainer.classList.add("SlideContainer");

  SliderContent.insertBefore(SlideContainer, container);
  SlideContainer.appendChild(container);

  return SliderContent;
}


Slider.prototype.scrollSliderTo = function (dir, from_marker) {
  var dir, to_idx;

  if (!from_marker) {
    dir = dir === 1 ? true : false;
    to_idx = -1;
  }
  else {
    to_idx = dir;
    dir = this.currentIndex < dir ? true : false;
  }

  if (dir) {
    if (to_idx == -1 && this.currentIndex >= this.SlideItems.length - 1)
      return;
    else if (to_idx == -1 && this.currentIndex === this.SlideItems.length - 2)
      this.nextMoverButton.classList.add('disabled');
    else if (to_idx === this.SlideItems.length - 1)
      this.nextMoverButton.classList.add('disabled');

    this.prevMoverButton.classList.remove('disabled');

    if (to_idx === -1)
      this.currentIndex += 1;
    else
      this.currentIndex = to_idx;
  } else {
    if (to_idx == -1 && this.currentIndex === 0)
      return;
    else if (to_idx == -1 && this.currentIndex === 1)
      this.prevMoverButton.classList.add('disabled');
    else if (to_idx == 0)
      this.prevMoverButton.classList.add('disabled');

    this.nextMoverButton.classList.remove('disabled');

    if (to_idx === -1)
      this.currentIndex -= 1;
    else
      this.currentIndex = to_idx;
  }

  this.setActiveSlide();
}

Slider.prototype.setActiveSlide = function () {
  const slideWidth = 100;
  this.Scroller.style.transform = `translateX(${this.currentIndex * -slideWidth}%)`;
  this.ActiveSlide.classList.remove('current');
  const newActiveSlide = this.SlideItems[this.currentIndex];
  newActiveSlide.classList.add('current');
  this.ActiveSlide = newActiveSlide;

  if (typeof this.options.onChange === 'function'){
    const newPercent = this.currentIndex * 100 / (this.SlideItems.length - 1);
    this.options.onChange(this.currentIndex, newPercent);
  }

  // document.querySelector(".quote-marker.active").classList.remove('active');
  // quoteMarkers[this.currentIndex].classList.add('active');
}


Slider.prototype.addMovers = function () {
  const moversHtml = `
    <div class="SlideMovers">
      <button aria-label="Previous" class="disabled">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      
      <button aria-label="Next">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
      </button>
    </div>
  `;

  const movers = new DOMParser().parseFromString(moversHtml, "text/html").body.firstChild;
  const moverButtons = movers.querySelectorAll("button");

  this.prevMoverButton = moverButtons[0];
  this.nextMoverButton = moverButtons[1];

  this.prevMoverButton.onclick = () => {
    this.scrollSliderTo(-1);
  }

  this.nextMoverButton.onclick = () => {
    this.scrollSliderTo(1);
  }

  this.wrapper.appendChild(movers);
}

export default Slider;