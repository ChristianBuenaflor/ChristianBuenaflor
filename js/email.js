// Contact form function

// Initialize EmailJS with your public key
emailjs.init('50tquHhL0mvVBmoZl');

// DOM elements
const form = document.getElementById('contactForm');
const toastContainer = document.getElementById('toastContainer');

// --- Toast helper ---
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = document.createElement('span');
  icon.className = 'toast-icon';
  icon.textContent = type === 'success' ? '✓' : '✕';

  const msgWrapper = document.createElement('div');
  msgWrapper.className = 'toast-message';
  msgWrapper.innerHTML = `
    <strong>${type === 'success' ? 'Message sent!' : 'Something went wrong'}</strong>
    <span>${message}</span>
  `;

  toast.appendChild(icon);
  toast.appendChild(msgWrapper);
  toastContainer.appendChild(toast);

  // Trigger entrance animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto‑remove after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

// --- Form submission ---
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    showToast('All fields are required.', 'error');
    return;
  }

  // Prepare data for EmailJS
  const templateParams = {
    name,
    email,
    subject,
    message,
    time: new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  };

  // Disable submit button and show sending state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  try {
    // Send email via EmailJS
    const response = await emailjs.send(
      'service_mjeveyk',
      'template_58x6vq2',
      templateParams
    );

    // Success
    showToast('Your message has been sent. I’ll get back to you soon.', 'success');
    form.reset();
  } catch (error) {
    // Error
    console.error('EmailJS error:', error);
    showToast('Failed to send. Please try again later or email me directly.', 'error');
  } finally {
    // Re‑enable button
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});