// ---- project data ----
const projects = [
  {
    title: "Human Resource Information System",
    tag: "Web Application",
    desc: "A comprehensive HR management platform built with ReactJS, designed to streamline employee data management and HR processes.",
    stack: ["ReactJS", "JavaScript", "Font Awesome", "Bootstrap", "Axios"],
    icon: '<i class="bi bi-person-bounding-box"></i>',
    attachments: [
      {
        type: "image",
        src: "/image/projects/HRIS.png",
        alt: "Human Resource Management System"
      }
    ]
  },
  {
    title: "Learning Management System",
    tag: "Web Application",
    desc: "A robust learning management system built with ReactJS, providing a seamless platform for online education and training.",
    stack: ["ReactJS", "JavaScript", "Font Awesome", "Bootstrap", "Axios"],
    icon: '<i class="bi bi-journal-bookmark"></i>',
    attachments: [
      {
        type: "image",
        src: "/image/projects/LMS.png",
        alt: "Learning Management System"
      }
    ]
  },
  {
    title: "School Attendance Monitoring System",
    tag: "Web Application",
    desc: "A web-based attendance monitoring system built with ReactJS, designed to efficiently track and manage student attendance records.",
    stack: ["ReactJS", "JavaScript", "Font Awesome", "Bootstrap", "Axios"],
    icon: '<i class="bi bi-people"></i>',
    attachments: [
      {
        type: "image",
        src: "/image/projects/SAS.png",
        alt: "School Attendance Monitoring System"
      }
    ]
  },
  {
    title: "Baptism and Birthday Celebration Website",
    tag: "Static Website",
    desc: "A static website for organizing and promoting baptism and birthday celebrations.",
    stack: ["HTML", "CSS", "JavaScript"],
    icon: '<i class="bi bi-book"></i>',
    attachments: [
      {
        src: "",
        url: "https://christianbuenaflor.github.io/BaptismDay/",
      }
    ]
  },
  {
    title: "School File Repository System",
    tag: "Web Application",
    desc: "A web-based file repository system built with ReactJS, designed to facilitate secure storage and management of school-related files and documents.",
    stack: ["ReactJS", "JavaScript", "Font Awesome", "Bootstrap", "Axios"],
    icon: '<i class="bi bi-folder"></i>',
    attachments: [
      {
        type: "image",
        src: "/image/projects/SFRS.png",
        alt: "School File Repository System"
      }
    ]
  },
  {
    title: "School Web Design Template",
    tag: "WordPress · Divi",
    desc: "A professional and responsive school web design template built using WordPress and the Divi theme, providing an attractive online presence for educational institutions.",
    stack: ["WordPress", "Divi"],
    icon: '<i class="bi bi-patch-check"></i>',
    attachments: [
      {
        type: "image",
        src: "/image/projects/WordPressSchoolFighting.png",
        alt: "School Web Design Template"
      }
    ]
  },
];

const grid = document.getElementById("projectGrid");
projects.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "project-card reveal";
  card.innerHTML = `
      <div class="project-icon">${p.icon}</div>
      <h4>${p.title}</h4>
      <p class="desc">${p.tag}</p>
      <div class="project-tags">${p.stack.map((s) => `<span class="tag">${s}</span>`).join("")}</div>
      <div class="project-more">View details →</div>
    `;
  card.addEventListener("click", () => openModal(i));
  grid.appendChild(card);
});

const overlay = document.getElementById("modalOverlay");
const modalBox = document.getElementById("modalBox");
function openModal(i) {
  const p = projects[i];

  const attachments = p.attachments
    .map((a) => {
      if (a.src && a.src.trim() !== "") {
        return `
          <img src="${a.src}" alt="${a.alt || ""}" />
        `;
      }

      if (a.url && a.url.trim() !== "") {
        return `
          <a
            href="${a.url}"
            target="_blank"
            rel="noopener noreferrer"
            class="modal-attachment-url"
          >
            ${a.url}
          </a>
        `;
      }

      return "";
    })
    .join("");

  modalBox.innerHTML = `
    <button class="modal-close" id="modalClose" aria-label="Close">✕</button>

    <div class="modal-tag">${p.tag}</div>

    <h4>${p.title}</h4>

    <p>${p.desc}</p>

    <div class="modal-stack">
      ${p.stack.map((s) => `<span class="tag">${s}</span>`).join("")}
    </div>

    <hr class="modal-hr">

    <div class="modal-attachments">
      <div class="modal-attachment-card">
        ${attachments}
      </div>
    </div>
  `;

  overlay.classList.add("open");

  document
    .getElementById("modalClose")
    .addEventListener("click", closeModal);
}
function closeModal() {
  overlay.classList.remove("open");
}

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});


