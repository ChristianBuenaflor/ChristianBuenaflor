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



