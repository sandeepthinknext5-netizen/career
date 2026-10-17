const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  mainNav.classList.toggle("is-open", !isOpen);
  mainNav.querySelectorAll(".nav-dropdown__toggle").forEach((toggle) => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.closest(".nav-dropdown").classList.remove("is-open");
  });
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    mainNav.classList.remove("is-open");
    mainNav.querySelectorAll(".nav-dropdown__toggle").forEach((toggle) => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.closest(".nav-dropdown").classList.remove("is-open");
    });
  });
});

mainNav.querySelectorAll(".nav-dropdown__toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    mainNav.querySelectorAll(".nav-dropdown__toggle").forEach((otherToggle) => {
      otherToggle.setAttribute("aria-expanded", "false");
      otherToggle.closest(".nav-dropdown").classList.remove("is-open");
    });
    toggle.closest(".nav-dropdown").classList.remove("is-scroll-closed");
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.closest(".nav-dropdown").classList.toggle("is-open", !isOpen);
  });
});

const dropdowns = [...mainNav.querySelectorAll(".nav-dropdown")];

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("pointerleave", () => {
    dropdown.classList.remove("is-scroll-closed");
  });
});

window.addEventListener("scroll", () => {
  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".nav-dropdown__toggle");
    const isOpen = dropdown.classList.contains("is-open") || dropdown.matches(":hover, :focus-within");

    if (isOpen) {
      dropdown.classList.add("is-scroll-closed");
      dropdown.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}, { passive: true });

const consultationForm = document.querySelector("#consult-form");

consultationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!consultationForm.reportValidity()) return;

  const formData = new FormData(consultationForm);
  const fields = [
    `Name: ${formData.get("name")}`,
    `Phone: ${formData.get("phone")}`,
    `Email: ${formData.get("email")}`,
    `Course: ${formData.get("course")}`,
    `Preferred centre: ${formData.get("centre") || "No preference"}`,
    `Message: ${formData.get("message") || "No additional details"}`
  ];
  const whatsappUrl = `https://wa.me/7070019666?text=${encodeURIComponent(fields.join("\n"))}`;

  window.location.assign(whatsappUrl);
});

document.querySelectorAll(".story-carousel").forEach((carousel) => {
  carousel.querySelectorAll(".story-carousel__arrow").forEach((button) => {
    button.addEventListener("click", () => {
      const track = button.closest(".story-carousel").querySelector(".story-grid");
      const cards = [...track.querySelectorAll(".story-tile")];
      const cardGap = Number.parseFloat(getComputedStyle(track).gap) || 0;
      const step = cards[0].getBoundingClientRect().width + cardGap;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const nextPosition = button.classList.contains("story-carousel__arrow--next")
        ? (track.scrollLeft >= maxScroll - 1 ? 0 : Math.min(track.scrollLeft + step, maxScroll))
        : (track.scrollLeft <= 1 ? maxScroll : track.scrollLeft - step);

      track.scrollTo({ left: nextPosition, behavior: "smooth" });
    });
  });
});

const faqItems = [...document.querySelectorAll(".faq-list details")];

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) otherItem.open = false;
    });
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
