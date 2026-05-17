
document.addEventListener("DOMContentLoaded", () => {
  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  // инициализация .tabs как табов
  new ItcTabs('.tabs');
});
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});

document.addEventListener('DOMContentLoaded', function () {
  $('.articmodal-close').click(function (e) {
    $.arcticmodal('close');

  });
  $('.a1').click(function (e) {
    e.preventDefault();
    $('#popup-call').arcticmodal({
    });
  });
  $('.a2, .link').click(function (e) {
    e.preventDefault();
    $('#popup-call2').arcticmodal({
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parents('form').submit();
    })
    $.validator.addMethod(
      "regex",
      function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
      },
      "Please check your input."
    );
    function valEl(el) {

      el.validate({
        rules: {
          tel: {
            required: true,
            regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
          },
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          tel: {
            required: 'Заполните поле',
            regex: 'Телефон может содержать символы + - ()'
          },
          name: {
            required: 'Заполните поле',
          },
          text: {
            required: 'Заполните поле',
          },
          email: {
            required: 'Заполните поле',
            email: 'Неверный формат E-mail'
          }
        },
        submitHandler: function (form) {
          $('#loader').fadeIn();
          var $form = $(form);
          var $formId = $(form).attr('id');
          switch ($formId) {
            case 'popupResult':
              $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
                .always(function (response) {
                  setTimeout(function () {
                    $('#loader').fadeOut();
                  }, 800);
                  setTimeout(function () {
                    $.arcticmodal('close');
                    $('#popup-thank').arcticmodal({});
                    $form.trigger('reset');
                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                  }, 1100);

                });
              break;
          }
          return false;
        }
      })
    }

    $('.js-form').each(function () {
      valEl($(this));
    });
    $('[data-scroll]').on('click', function () {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'data-scroll')).offset().top
      }, 2000);
      event.preventDefault();
    })
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const swiper1 = new Swiper('.swiper1', {
    slidesPerView: 3,
    spaceBetween: 23,
    pagination: {
      el: ".swiper-pagination1",
    },
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 24,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 23,
        slidesPerView: 3
      }
    }
  });
 const swiper2 = new Swiper('.swiper2', {
    slidesPerView: 2,
    spaceBetween: 28,
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 24,
        loop: true,
        slidesPerView: 1,
        allowTouchMove: false
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2,
        allowTouchMove: false,
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2,
        allowTouchMove: false
      },
      1200: {
        spaceBetween: 28,
        slidesPerView: 2
      }
    }
  });
  const swiper4 = new Swiper('.swiper4', {
    slidesPerView: 3,
    spaceBetween: 28,
    navigation: {
      nextEl: '.swiper-button-next4',
      prevEl: '.swiper-button-prev4',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 24,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 28,
        slidesPerView: 3
      }
    }
  });
  const swiper5 = new Swiper('.swiper5', {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button-next5',
      prevEl: '.swiper-button-prev5',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      992: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      1200: {
        spaceBetween: 0,
        slidesPerView: 1
      }
    }
  });
  const swiper6 = new Swiper('.swiper6', {
    slidesPerView: 3,
    spaceBetween: 25,
    navigation: {
      nextEl: '.swiper-button-next6',
      prevEl: '.swiper-button-prev6',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 20,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 25,
        slidesPerView: 3
      }
    }
  });
  const swiper9 = new Swiper('.swiper9', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 1200,

    navigation: {
      nextEl: '.swiper-button-next9',
      prevEl: '.swiper-button-prev9',
    },

    on: {
      init: function () {
        playActiveVideo(this);
      },

      slideChangeTransitionEnd: function () {
        playActiveVideo(this);
      }
    }
  });

  function playActiveVideo(swiper) {

    const videos = document.querySelectorAll('.about__video');

    videos.forEach(video => {
      video.pause();
      video.currentTime = 0;
    });

    const activeSlide = swiper.slides[swiper.activeIndex];
    const activeVideo = activeSlide.querySelector('.about__video');

    if (activeVideo) {
      activeVideo.play();
    }
  }
});
document.addEventListener("DOMContentLoaded", () => {

  let swiper3;

  function initSwiper() {
    swiper3 = new Swiper('.swiper3', {
      slidesPerView: 3,
      spaceBetween: 30,
      allowTouchMove: false,
      loop: false,
      grid: {
        rows: 2
      },

      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          allowTouchMove: true,
           grid: {
            rows: 1
          },
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 10,
          allowTouchMove: true,
           grid: {
            rows: 1
          },
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 20,
          allowTouchMove: true,
           grid: {
            rows: 1
          },
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
          allowTouchMove: false
        }
      }
    });
  }

  initSwiper();

  Fancybox.bind('[data-fancybox="gallery3"]', {
    on: {
      closing: () => {

        // 💣 полностью убиваем старый swiper
        if (swiper3) {
          swiper3.destroy(true, true);
        }

        // 🧠 даём DOM чуть прийти в себя
        setTimeout(() => {
          initSwiper();
        }, 100);
      }
    }
  });

});
document.querySelectorAll('.catalog__item').forEach((item) => {
  new Swiper(item.querySelector('.catalog-swiper'), {
    slidesPerView: 1,
    spaceBetween: 0,

    navigation: {
      nextEl: item.querySelector('.swiper-button-next'),
      prevEl: item.querySelector('.swiper-button-prev'),
    },

    pagination: {
      el: item.querySelector('.swiper-pagination'),
      clickable: true,
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const note = document.getElementById("note1");
  const buttons = note.querySelectorAll(".note__close");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      note.style.display = "none";
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const overlay = document.querySelector('.overlay');

  // --- ОСНОВНОЕ МЕНЮ (бургер) ---
  const backBtn = document.querySelector('.back');
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.menu');

  // --- ВТОРОЕ МЕНЮ ---
  const menuBtn2 = document.querySelectorAll('.main__play');
  const menu2 = document.querySelector('.menu2');
  const closeBtn = document.querySelector('.close');

  // --- БУРГЕР (БЕЗ OVERLAY) ---
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();

      menuBtn.classList.toggle('active');
      menu.classList.toggle('active');

      if (menu.classList.contains('active')) {
        nav.classList.add('fix');
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        if (window.scrollY === 0 && !menu2?.classList.contains('active')) {
          nav.classList.remove('fix');
        }
      }
    });
  }

  // --- КНОПКА BACK (закрывает бургер) ---
  if (backBtn && menuBtn && menu) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();

      menuBtn.classList.remove('active');
      menu.classList.remove('active');

      document.body.style.overflow = '';

      if (window.scrollY === 0 && !menu2?.classList.contains('active')) {
        nav.classList.remove('fix');
      }
    });
  }

  // --- ОТКРЫТИЕ menu2 (С OVERLAY) ---
  if (menuBtn2.length && menu2) {
    menuBtn2.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        menu2.classList.add('active');
        overlay?.classList.add('active');

        nav.classList.add('fix');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  // --- ЗАКРЫТИЕ menu2 ---
  function closeMenu2() {
    if (!menu2) return;

    menu2.classList.remove('active');
    overlay?.classList.remove('active');

    document.body.style.overflow = '';

    if (window.scrollY === 0 && !menu?.classList.contains('active')) {
      nav.classList.remove('fix');
    }
  }

  if (closeBtn && menu2) {
    closeBtn.addEventListener('click', closeMenu2);
  }

  // --- КЛИК ПО OVERLAY (ЗАКРЫВАЕТ ТОЛЬКО menu2) ---
  if (overlay) {
    overlay.addEventListener('click', () => {
      closeMenu2();
    });
  }

  // --- СКРОЛЛ ---
  window.addEventListener('scroll', () => {
    const anyMenuOpen =
      menu?.classList.contains('active') ||
      menu2?.classList.contains('active');

    if (window.scrollY > 0 || anyMenuOpen) {
      nav.classList.add('fix');
    } else {
      nav.classList.remove('fix');
    }
  });
});
// Скролл по якорям
document.addEventListener("DOMContentLoaded", () => {

  const upBtn = document.querySelector('.up');

  // плавный скролл (оставил твой код)
  document.querySelectorAll('.go_to').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetSelector = link.getAttribute('href');
      const targetElement = document.querySelector(targetSelector);

      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // появление кнопки
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // ← тут регулируешь когда появится
      upBtn.classList.add('active');
    } else {
      upBtn.classList.remove('active');
    }
  });

});

// Замена <img class="svg"> на inline SVG
document.addEventListener("DOMContentLoaded", () => {
  const svgImages = document.querySelectorAll('img.svg');

  svgImages.forEach(img => {
    const imgURL = img.getAttribute('src');

    fetch(imgURL)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'image/svg+xml');
        let svg = xmlDoc.querySelector('svg');

        if (!svg) return;

        // Перенос ID
        if (img.id) {
          svg.setAttribute('id', img.id);
        }

        // Перенос классов
        const classes = img.getAttribute('class');
        if (classes) {
          svg.setAttribute('class', `${classes} replaced-svg`);
        }

        // Удаление некорректных xmlns
        svg.removeAttribute('xmlns:a');

        // Добавление viewBox, если его нет
        if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
          svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        }

        // Замена <img> на <svg>
        img.parentNode.replaceChild(svg, img);
      })
      .catch(error => {
        console.error(`Ошибка при загрузке SVG: ${imgURL}`, error);
      });
  });
});

