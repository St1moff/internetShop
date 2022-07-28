import vars from '../_vars';

if (vars.$stepper) {
  
  const $stepperInput = vars.$stepper.querySelector('.stepper__input'),
    $stepperMinus = vars.$stepper.querySelector('.stepper__btn--minus'),
    $stepperPlus = vars.$stepper.querySelector('.stepper__btn--plus');

  $stepperInput.addEventListener('keydown', (e => {
    if (e.currentTarget.value <= 1) {
      $stepperMinus.classList.add('stepper__btn--disabled')
      $stepperPlus.classList.remove('stepper__btn--disabled')
    } else {
      $stepperMinus.classList.remove('stepper__btn--disabled')
    }
    if (e.currentTarget.value > 9998) {
      $stepperMinus.classList.remove('stepper__btn--disabled')
      $stepperPlus.classList.add('stepper__btn--disabled')
    } else {
      $stepperPlus.classList.remove('stepper__btn--disabled')
    }
  }))

  $stepperPlus.addEventListener('click', (e) => {
    $stepperMinus.classList.remove('stepper__btn--disabled');
    let currentValue = parseInt($stepperInput.value);
    currentValue++;
    $stepperInput.value = currentValue

    if ($stepperInput.value > 9998) {
      $stepperInput.value = 9999;
      $stepperMinus.classList.remove('stepper__btn--disabled')
      $stepperPlus.classList.add('stepper__btn--disabled')
    } else {
      $stepperPlus.classList.remove('stepper__btn--disabled')
    }
  })


  $stepperMinus.addEventListener('click', (e) => {
    $stepperPlus.classList.remove('stepper__btn--disabled')
    let currentValue = parseInt($stepperInput.value);
    currentValue--;
    $stepperInput.value = currentValue
    console.log(currentValue)
    if ($stepperInput.value <= 1) {
      $stepperMinus.classList.add('stepper__btn--disabled')
      $stepperPlus.classList.remove('stepper__btn--disabled')
    } else {
      $stepperMinus.classList.remove('stepper__btn--disabled')
    }
  })
}
