window.addEventListener("DOMContentLoaded", () => {
  const inputsColor = document.querySelectorAll('input[name=product_color]');
  const formColorLabel = document.getElementById('productColorValue');
  inputsColor.forEach((input) => {
    input.addEventListener('change', (e) => {
      formColorLabel.innerText = e.target.dataset.nameDisplay;
    });
  });

  const inputsQuantity = document.querySelectorAll('.input-quantity');
  inputsQuantity.forEach((input) => {
    const inputField = input.querySelector('.input-quantity__field');
    const inputBtnIncrease = input.querySelector('.input-quantity__btn[data-action=increase]');
    const inputBtnDecrease = input.querySelector('.input-quantity__btn[data-action=decrease]');
    inputBtnIncrease.addEventListener('click', () => {
      const initialValue = inputField.value * 1;
      inputField.value = initialValue + 1;
    });
    inputBtnDecrease.addEventListener('click', () => {
      const initialValue = inputField.value * 1;
      if (initialValue > 1) inputField.value = initialValue - 1;
    });
  });

  const accordions = document.querySelectorAll('.accordion__item');
  accordions.forEach((accordion) => {
    const accordionTitle = accordion.querySelector('.accordion__item-title');
    accordionTitle.addEventListener('click', () => {
      accordion.classList.toggle('accordion__item_active');
      const title = accordion.querySelector('.accordion__item-title');
      if (accordion.classList.contains('accordion__item_active')) {
        title.setAttribute('aria-expanded', 'true');
      } else {
        title.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const lockScroll = () => {
    document.body.classList.add('lock-scroll');
  }

  const unlockScroll = () => {
    document.body.classList.remove('lock-scroll');
  }

  const mainWrap = document.querySelector('.main-grid');

  let currentEscHandler = null;

  const handleEscClick = (e, modalWindow) => {
    if (e.code === 'Escape') {
      closeModal(modalWindow);
    }
  }

  const showModal = (modalWindow, modalClose, modalTarget) => {
    lockScroll();
    activeModalTarget = modalTarget;
    mainWrap.setAttribute('inert', '');
    modalWindow.classList.add('show-modal');
    modalClose.focus();

    currentEscHandler = (e) => { handleEscClick(e, modalWindow) }
    window.addEventListener('keyup', currentEscHandler);
  }

  const closeModal = (modalWindow) => {
    unlockScroll();
    mainWrap.removeAttribute('inert');
    modalWindow.classList.remove('show-modal');
    activeModalTarget.focus();
    activeModalTarget = null;

    window.removeEventListener('keyup', currentEscHandler);
    currentEscHandler = null;
  }

  const modalTarget = document.querySelectorAll('.modal-target');
  let activeModalTarget = null;
  modalTarget.forEach((modalTarget) => {
    const modalWindow = document.querySelector('.modal');

    const modalClose = modalWindow.querySelector('.modal__close');
    modalClose.addEventListener('click', () => closeModal(modalWindow));

    modalTarget.addEventListener('click', () => {
      showModal(modalWindow, modalClose, modalTarget);
    });
  });

  const modalBackdrop = document.querySelectorAll('.modal-backdrop');
  modalBackdrop.forEach((modalBackdrop) => {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        const modalWindow = e.target.closest('.modal');
        closeModal(modalWindow);
      }
    });
  });
})