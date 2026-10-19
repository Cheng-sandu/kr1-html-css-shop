
document.addEventListener('DOMContentLoaded', () => {
  const modal      = document.getElementById('orderModal');
  const modalTitle = document.getElementById('orderModalTitle');
  const form       = document.getElementById('orderForm');
  const productField = document.getElementById('productField');
  const topicSelect  = document.getElementById('topic');
  const openButtons  = document.querySelectorAll('.btn-order');
  const closeElements = modal.querySelectorAll('[data-close-modal]');

  openButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const product = btn.dataset.product || '';

      productField.value = product;
      if (product) {
        topicSelect.value = product;
        if (topicSelect.value !== product) {
          topicSelect.value = 'Другое';
        }
      }

      openModal();
    });
  });

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    const firstInput = form.querySelector('input, select, textarea');
    if (firstInput) firstInput.focus();
  }

  closeElements.forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Отправка заявки:', data);

    showSuccess();

    setTimeout(() => {
      closeModal();
      form.reset();
      productField.value = '';
      form.style.display = '';
      const oldSuccess = modal.querySelector('.form-success');
      if (oldSuccess) oldSuccess.remove();
    }, 2500);
  });

  function showSuccess() {
    const old = modal.querySelector('.form-success');
    if (old) old.remove();

    const msg = document.createElement('div');
    msg.className = 'form-success';
    msg.textContent = 'Форма успешно отправлена!';

    form.style.display = 'none';
    form.parentNode.insertBefore(msg, form.nextSibling);
  }
});