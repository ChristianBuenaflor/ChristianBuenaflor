(function() {
    emailjs.init("50tquHhL0mvVBmoZl");
})();


// ---- mobile nav ----
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks
  .querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("open")),
  );

// ---- typing effect ----
const typedEl = document.getElementById("typed");
const lines = [
  "> initializing developer_profile...",
  "> stack: WordPress, ASP.NET, C#, MSSQL",
  "> status: accepting new projects",
];
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
if (reduceMotion) {
  typedEl.textContent = lines.join("  ·  ");
} else {
  let li = 0,
    ci = 0;
  function typeLine() {
    if (li >= lines.length) {
      typedEl.innerHTML += '<span class="cursor">&nbsp;</span>';
      return;
    }
    const line = lines[li];
    if (ci <= line.length) {
      typedEl.innerHTML =
        lines.slice(0, li).join("<br>") +
        (li > 0 ? "<br>" : "") +
        line.slice(0, ci) +
        '<span class="cursor">&nbsp;</span>';
      ci++;
      setTimeout(typeLine, 26);
    } else {
      li++;
      ci = 0;
      setTimeout(typeLine, 380);
    }
  }
  typeLine();
}

// ---- scroll reveal ----
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));


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
