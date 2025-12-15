// Utils
const lockBody = (element) => {
  if (window.bodyScrollLockUpgrade) {
    window.bodyScrollLockUpgrade.disableBodyScroll(element, {
      reserveScrollBarGap: true,
    });
    document.documentElement.classList.add("is-locked");
    document.body.classList.add("is-locked");
  }
};

const unlockBody = () => {
  if (window.bodyScrollLockUpgrade) {
    window.bodyScrollLockUpgrade.clearAllBodyScrollLocks();
    document.documentElement.classList.remove("is-locked");
    document.body.classList.remove("is-locked");
  }
};

//Main
window.addEventListener("DOMContentLoaded", () => {
  initialLoader();
  authFormHandler();
  modalMenu();
  supportFormModal();
  supportFormSubmitHandler();
  overlayClickHandler();
  addToCartInit();
  cartPromoHandler();
  orderHandler();
  personalFormHandler();

  if (window.ymaps) {
    ymaps?.ready(initMap);
  }

  if (window.Swiper) {
    initTopSlider();
    initProductSlider();
    initDetailSlider();
  }
});

const initTopSlider = () => {
  const slider = document.querySelector(".top-slider .swiper");

  if (!slider) return;

  new window.Swiper(slider, {
    loop: true,
    autoplay: {
      delay: 5000,
    },
  });
};

const initProductSlider = () => {
  const sliderWrappers = document.querySelectorAll(".product-slider__wrapper");

  if (!sliderWrappers || sliderWrappers.length < 1) return;

  sliderWrappers.forEach((wrapper) => {
    const s = wrapper.querySelector(".swiper");
    const prevBtn = wrapper.querySelector(".product-slider__btn--prev");
    const nextBtn = wrapper.querySelector(".product-slider__btn--next");

    if (!s) return;

    const sw = new window.Swiper(s, {
      slidesPerView: 4,
      spaceBetween: 20,
      allowTouchMove: false,
      rewind: true,
    });

    if (!prevBtn || !nextBtn) return;

    prevBtn.addEventListener("click", () => {
      sw.slidePrev();
    });

    nextBtn.addEventListener("click", () => {
      sw.slideNext();
    });
  });
};

const initialLoader = () => {
  const loader = document.querySelector(".loader");
  const layout = document.querySelector(".layout");

  if (!loader || !layout) return;

  layout.classList.add("hidden");

  lockBody(loader);

  setTimeout(() => {
    loader.classList.add("slide-up");

    setTimeout(() => {
      loader.classList.add("hidden");
    }, 300);
    setTimeout(() => {
      layout.classList.remove("hidden");

      unlockBody();
    }, 400);
  }, 1300);
};

const modalMenu = () => {
  const openBtn = document.querySelector(".header-menu-btn");
  const closeBtn = document.querySelector(".modal-menu__close");
  const modalMenu = document.querySelector(".modal-menu__overlay");

  if (!openBtn || !closeBtn || !modalMenu) return;

  openBtn.addEventListener("click", () => {
    modalMenu.classList.add("overlay--active");
    lockBody(modalMenu.querySelector(".modal-menu"));
  });

  closeBtn.addEventListener("click", () => {
    modalMenu.classList.remove("overlay--active");
    unlockBody();
  });
};

const supportFormModal = () => {
  const openBtns = document.querySelectorAll(".question__btn");
  const supportOverlay = document.querySelector(".support-form__overlay");

  if (!openBtns || openBtns.length === 0 || !supportOverlay) return;

  const supportFormWrapper = supportOverlay.querySelector(".support-form");
  const formElement = supportOverlay.querySelector(".support-form__body");
  const closeButton = supportOverlay.querySelector(".support-form__close");

  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      supportOverlay.classList.add("overlay--active");
      formElement?.reset();
      if (supportFormWrapper) {
        lockBody(supportFormWrapper);
      }
    });
  });

  closeButton.addEventListener("click", () => {
    supportOverlay.classList.remove("overlay--active");
    formElement?.reset();
    unlockBody();
  });
};

const supportFormSubmitHandler = () => {
  const formElement = document.querySelector(".support-form__body");
  const supportOverlay = document.querySelector(".support-form__overlay");
  const closeBtn = document.querySelector(".support-form__close");
  const title = document.querySelector(".support-form__title");
  const successBlock = document.querySelector(".support-from__success");

  if (!formElement || !supportOverlay || !title || !successBlock || !closeBtn)
    return;

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    formElement.style.display = "none";
    title.style.display = "none";
    closeBtn.style.display = "none";
    successBlock.classList.add("support-from__success--active");

    window.setTimeout(() => {
      supportOverlay.classList.remove("overlay--active");
      formElement.reset();

      formElement.style.display = "grid";
      closeBtn.style.display = "flex";
      title.style.display = "block";
      successBlock.classList.remove("support-from__success--active");

      unlockBody();
    }, 3000);
  });
};

const overlayClickHandler = () => {
  const overlays = document.querySelectorAll(".overlay");

  if (!overlays || overlays.length === 0) return;

  overlays.forEach((ov) => {
    ov.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("overlay") &&
        e.target.classList.contains("overlay--active")
      ) {
        e.target.classList.remove("overlay--active");
        if (e.target.classList.contains("support-form__overlay")) {
          const formElement = e.target.querySelector(".support-form__body");
          formElement?.reset();
        }
        unlockBody();
      }
    });
  });
};

const addToCartHandler = (e) => {
  e.preventDefault();
};

const addToCartInit = () => {
  const cardBtns = document.querySelectorAll(".product-card__btn");

  if (!cardBtns || cardBtns.length === 0) return;

  cardBtns.forEach((btn) => {
    btn.addEventListener("click", addToCartHandler);
  });
};

const initDetailSlider = () => {
  const sliderEl = document.querySelector(".detail-media");

  if (!sliderEl) return;

  new window.Swiper(sliderEl, {
    loop: true,
    autoplay: {
      delay: 5000,
    },
    effect: "fade",
  });
};

const initMap = () => {
  const mapContainer = document.querySelector("#map");

  if (!mapContainer) return;

  const map = new ymaps.Map("map", {
    center: [59.978223, 30.316425],
    zoom: 14,
    controls: ["zoomControl"],
  });

  map.behaviors.disable("scrollZoom");

  const placemark = new ymaps.GeoObject({
    geometry: {
      type: "Point",
      coordinates: [59.978223, 30.316425],
    },
  });

  map.geoObjects.add(placemark);
};

const authFormHandler = () => {
  const profileLink = document.querySelector(".header-profile-btn");
  const authFormWrapper = document.querySelector(".support-form-auth");

  if (!profileLink || !authFormWrapper) return;

  const authForm = authFormWrapper.querySelector(".support-form-auth__body");

  const codeForm = authFormWrapper.querySelector(".support-form-auth__code");
  const closeBtn = authFormWrapper.querySelector(".support-form__close");

  profileLink.addEventListener("click", (e) => {
    e.preventDefault();

    const isUserAuth = window.localStorage.getItem("is-user-auth") || null;

    if (isUserAuth) {
      window.location.href = "./personal.html";
    } else {
      closeBtn.addEventListener("click", () => {
        authFormWrapper.classList.remove("support-form-auth--active");

        authForm.classList.remove("support-form-auth__body--hidden");
        authForm.reset();
        codeForm.classList.remove("support-form-auth__code--visible");
        codeForm.reset();
      });

      authFormWrapper.classList.add("support-form-auth--active");
    }
  });

  authForm.addEventListener("submit", (e) => {
    e.preventDefault();

    authForm.classList.add("support-form-auth__body--hidden");
    codeForm.classList.add("support-form-auth__code--visible");
  });

  codeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    authFormWrapper.classList.remove("support-form-auth--active");

    window.localStorage.setItem("is-user-auth", true);

    authForm.classList.remove("support-form-auth__body--hidden");
    authForm.reset();
    codeForm.classList.remove("support-form-auth__code--visible");
    codeForm.reset();
  });
};

const cartPromoHandler = () => {
  const promocodeForm = document.querySelector(".cart-promo");

  if (!promocodeForm) return;

  promocodeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const discountTitle = document.createElement("div");
    const discountPrice = document.createElement("div");
    const cartTotal = document.querySelector(".cart-total");
    const cartTotalAmount = document.querySelector(".cart-total__amount");

    discountTitle.classList.add("cart-total__discount-title");
    discountPrice.classList.add("cart-total__discount-price");

    discountTitle.innerHTML = "Скидка";
    discountPrice.innerHTML = "400 ₽";
    cartTotalAmount.innerHTML = "1000 ₽";

    cartTotal.insertAdjacentElement("afterbegin", discountPrice);
    cartTotal.insertAdjacentElement("afterbegin", discountTitle);
  });
};

const orderHandler = () => {
  const orderForm = document.querySelector(".cart-wrapper .personal-data-form");

  if (!orderForm) return;

  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const cartBlock = document.querySelector(".cart-block");
    const orderWrapperBlock = document.querySelector(".personal-data-block");
    const promocodeForm = document.querySelector(".cart-promo");
    const cartSuccess = document.querySelector(".cart-success");

    cartBlock.classList.add("cart-block--hidden");
    orderWrapperBlock.classList.add("personal-data-block--hidden");
    cartSuccess.classList.add("cart-success--active");

    setTimeout(() => {
      promocodeForm.reset();

      cartBlock.classList.remove("cart-block--hidden");
      orderWrapperBlock.classList.remove("personal-data-block--hidden");
      cartSuccess.classList.remove("cart-success--active");
    }, 3000);
  });
};

const personalFormHandler = () => {
  const personalDataForm = document.querySelector(
    ".personal-page .personal-data-form"
  );

  if (!personalDataForm) return;

  personalDataForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const success = personalDataForm.querySelector(
      ".personal-data-form__success"
    );

    success.classList.add("personal-data-form__success--active");

    setTimeout(() => {
      success.classList.remove("personal-data-form__success--active");
    }, 3000);
  });
};
