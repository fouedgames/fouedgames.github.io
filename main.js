// Small touches: reveal on scroll, reels that only play while on screen, a
// sound toggle per phone, and a lightbox for screenshots. The page works
// without any of it.
document.documentElement.classList.remove("no-js");

const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ------------------------------------------------------------------ reveal --
const revealer = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add("is-in");
      revealer.unobserve(e.target);
    }
  }
}, { threshold: 0.15 });
document.querySelectorAll("[data-reveal]").forEach((el) => revealer.observe(el));

// ------------------------------------------------------------------- reels --
const phones = [...document.querySelectorAll(".phone")];

function setSound(phone, on) {
  const video = phone.querySelector("video");
  const btn = phone.querySelector(".sound");
  video.muted = !on;
  btn.setAttribute("aria-pressed", String(on));
  btn.querySelector(".sound__icon").textContent = on ? "🔊" : "🔇";
  btn.querySelector(".sound__label").textContent = on ? "Sound off" : "Sound on";
}

const player = new IntersectionObserver((entries) => {
  for (const e of entries) {
    const video = e.target.querySelector("video");
    if (e.isIntersecting && !calm) {
      video.play().catch(() => {});
    } else if (!e.isIntersecting) {
      video.pause();
      setSound(e.target, false);
    }
  }
}, { threshold: 0.35 });

for (const phone of phones) {
  player.observe(phone);
  phone.querySelector(".sound").addEventListener("click", () => {
    const on = phone.querySelector("video").muted;
    // only one game talks at a time
    phones.forEach((p) => setSound(p, false));
    setSound(phone, on);
    if (on) phone.querySelector("video").play().catch(() => {});
  });
}

// ---------------------------------------------------------------- lightbox --
const box = document.querySelector(".lightbox");
const boxImg = box.querySelector("img");
document.querySelectorAll(".shot").forEach((shot) => {
  shot.addEventListener("click", () => {
    const img = shot.querySelector("img");
    boxImg.src = img.src;
    boxImg.alt = img.alt;
    box.showModal();
  });
});
// a click on the dimmed backdrop (the dialog itself, outside the image) closes it
box.addEventListener("click", (e) => {
  if (e.target === box) box.close();
});

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
