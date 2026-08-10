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
    title: "PITO Inventory & Service Management System",
    tag: "ASP.NET Web Application",
    desc: "A system for the Provincial Information Technology Office, providing direct client service and technical support for fast, efficient computer repair and inventory tracking.",
    stack: ["C#", "ASP.NET", "MSSQL"],
    icon: '<path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M3 7v10l9 4 9-4V7" stroke="currentColor" stroke-width="1.8" fill="none"/>',
    attachments: [
      {
        type: "image",
        src: "images/pito-inventory.jpg",
        alt: "PITO Inventory & Service Management System"
      }
    ]
  },
  {
    title: "NROTC Record and Monitoring System",
    tag: "ASP.NET Web Application",
    desc: "A record-keeping and monitoring platform built to track member data accurately across a structured program.",
    stack: ["C#", "ASP.NET", "MSSQL"],
    icon: '<path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" fill="none"/>',
    attachments: [
      {
        type: "image",
        src: "images/nrotc-record.jpg",
        alt: "NROTC Record and Monitoring System"
      }
    ]
  },
  {
    title: "School Web Design Template",
    tag: "WordPress · Divi",
    desc: "A static school website template built on WordPress using the Divi theme, designed for easy content updates by non-technical staff.",
    stack: ["WordPress", "Divi"],
    icon: '<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" stroke="currentColor" stroke-width="1.8" fill="none"/>',
    attachments: [
      {
        type: "image",
        src: "images/school-template.jpg",
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
  modalBox.innerHTML = `
      <button class="modal-close" id="modalClose" aria-label="Close">✕</button>
      <div class="modal-tag">${p.tag}</div>
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <div class="modal-stack">${p.stack.map((s) => `<span class="tag">${s}</span>`).join("")}</div>
      <hr class="modal-hr"/>
      <div class="modal-attachments">
      <div class="modal-attachment-card">
      ${p.attachments.map((a) => `<img src="${a.src}" alt="${a.alt}" />`).join("")}
      </div>
      
      </div>
    `;
  overlay.classList.add("open");
  document.getElementById("modalClose").addEventListener("click", closeModal);
}
function closeModal() {
  overlay.classList.remove("open");
}
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});


