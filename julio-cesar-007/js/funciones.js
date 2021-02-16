'use strict';

function $(selector) {
  return document.querySelector(selector);
}

function setEvent(element, nameEvent, nameFunction) {
  return element.addEventListener(nameEvent, nameFunction, false);
}

function setProperty(custom, value) {
  return document.documentElement.style.setProperty(custom, value);
}

function returnABC() {
  return [
            'A', 'B', 'C',
            'D', 'E', 'F',
            'G', 'H', 'I',
            'J', 'K', 'L',
            'M', 'N', 'Ñ',
            'O', 'P', 'Q',
            'R', 'S', 'T',
            'U', 'V', 'W',
            'X', 'Y', 'Z'
         ];
}

function disabledButtons(disabled) {
  $('.encrypted__button--code').disabled   = !disabled;
  $('.encrypted__button--decode').disabled = disabled;
  $('.encrypted__number').disabled = !disabled;
  $('.encrypted__text--code').disabled = !disabled;
}

function setLetter(numberEncrypt, letter, abd) {
  let letterABC = abd[abd.indexOf(letter) + numberEncrypt];

  if (numberEncrypt < 0)
    letterABC = abd[abd.lastIndexOf(letter) + numberEncrypt];

  return letterABC;
}

function validateNumber(event) {
  const numbers = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
  const textLength = $('.encrypted__number');

  if ( event.keyCode === 45 )
    $('.encrypted__number').value = '-';

  if ( !numbers.includes(event.keyCode) )
      event.preventDefault();
}

function encryptAndDecrypt(scaleA, scaleB, disabled, textareaA, textareaB) {
  let newMessaje = '';
  let numberEncrypt = $('.encrypted__number').value;
  const messajeEncryptOrDecrypt = $(textareaA).value.toUpperCase().split('');

  if ( (numberEncrypt.length > 0) && (messajeEncryptOrDecrypt.length > 0) ) {
    numberEncrypt = parseInt(numberEncrypt);
    setProperty('--code',  scaleA);
    setProperty('--decode', scaleB);
    disabledButtons(disabled);

    if (disabled)
      numberEncrypt = -numberEncrypt;

    for (let index in messajeEncryptOrDecrypt) {
      let abc = returnABC();
      let letter = messajeEncryptOrDecrypt[index];

      if ( !abc.includes(letter) ) {
        newMessaje += letter;
      }
      else {
        let letterABC = setLetter(numberEncrypt, letter, abc);

        while (letterABC === undefined) {
          abc = abc.concat(abc);
          letterABC = setLetter(numberEncrypt, letter, abc);
        }

        newMessaje += letterABC;
      }
    }

    $(textareaB).value = newMessaje;

  }
  else
    alert('Debes ingresar un número de encryptación, y un mensaje para nuestros guerreros. ⤜(ʘ_ʘ)⤏');
}

function encryptMessaje() {
  encryptAndDecrypt('scale(100%)', 'scale(0)', false, '.encrypted__text--decode', '.encrypted__text--code');
}

function decryptMessaje() {
  encryptAndDecrypt('scale(0)', 'scale(100%)', true, '.encrypted__text--code', '.encrypted__text--decode');
}

function startEvent(event) {
  setEvent($('.encrypted__button--code'),   'click', encryptMessaje);
  setEvent($('.encrypted__button--decode'), 'click', decryptMessaje);
  setEvent($('.encrypted__number'), 'keypress', validateNumber);
  disabledButtons(true);
}

setEvent(window, 'DOMContentLoaded', startEvent);