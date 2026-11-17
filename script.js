const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
const formError = document.querySelector('#form-error');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navigation.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }
});

document.querySelectorAll('[data-package]').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('#package').value = link.dataset.package;
  });
});

document.querySelector('#name').addEventListener('input', () => {
  formError.hidden = true;
});

document.querySelector('#plan-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const name = String(data.get('name')).trim();
  if (!name) {
    formError.hidden = false;
    return;
  }

  const details = [
    `Hello Araali! My name is ${name}.`,
    `I'm interested in: ${data.get('package') || 'a trip planned with your help'}.`,
    `Travelers: ${data.get('travelers')}.`,
    data.get('message') ? `A little more about my trip: ${String(data.get('message')).trim()}` : '',
  ].filter(Boolean).join('\n');

  const whatsappUrl = `https://wa.me/256778097500?text=${encodeURIComponent(details)}`;
  const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  if (!opened) window.location.href = whatsappUrl;
});

document.querySelector('#year').textContent = new Date().getFullYear();
