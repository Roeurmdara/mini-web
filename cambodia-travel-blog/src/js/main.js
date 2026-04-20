/* Khmer Wanderer — main.js */

// ── Dark mode ──────────────────────────────────────────
const html = document.documentElement;
const MOON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const SUN = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

function applyTheme(dark) {
  if (dark) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
  localStorage.setItem("theme", dark ? "dark" : "light");

  const buttons = document.querySelectorAll(".dark-toggle-btn");
  buttons.forEach((b) => {
    b.innerHTML = dark ? SUN : MOON;
  });

  console.log("Theme applied:", dark ? "DARK" : "LIGHT");
}

// Initialize theme
const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const shouldBeDark = saved === "dark" || (!saved && prefersDark);
applyTheme(shouldBeDark);

// Add click handlers
document.querySelectorAll(".dark-toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const isDark = html.classList.contains("dark");
    console.log("Toggle clicked! Currently:", isDark ? "DARK" : "LIGHT");
    applyTheme(!isDark);
  });
});

// ── Mobile menu ────────────────────────────────────────
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const BARS = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
const CROSS = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("hidden");
    menuBtn.innerHTML = open ? BARS : CROSS;
  });
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuBtn.innerHTML = BARS;
    }),
  );
}

// ── Scroll reveal ──────────────────────────────────────
const revealEls = document.querySelectorAll(
  ".reveal, .opacity-0.translate-y-5",
);
if (revealEls.length) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const delay = parseInt(e.target.dataset.delay || 0);
          setTimeout(() => {
            e.target.classList.remove("opacity-0", "translate-y-5");
            e.target.classList.add("opacity-100", "translate-y-0");
          }, delay);
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );
  revealEls.forEach((el) => obs.observe(el));
}

// ── Back to top ────────────────────────────────────────
const btt = document.getElementById("back-to-top");
if (btt) {
  window.addEventListener(
    "scroll",
    () => {
      if (scrollY > 500) {
        btt.classList.remove("opacity-0", "pointer-events-none");
        btt.classList.add("opacity-100", "pointer-events-auto");
      } else {
        btt.classList.add("opacity-0", "pointer-events-none");
        btt.classList.remove("opacity-100", "pointer-events-auto");
      }
    },
    { passive: true },
  );
  btt.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
}

// ── Reading progress ───────────────────────────────────
const bar = document.getElementById("reading-progress");
if (bar) {
  window.addEventListener(
    "scroll",
    () => {
      bar.style.width =
        (scrollY / (document.body.scrollHeight - innerHeight)) * 100 + "%";
    },
    { passive: true },
  );
}

// ── Nav subtle shadow on scroll ────────────────────────
const nav = document.querySelector("nav");
if (nav) {
  window.addEventListener(
    "scroll",
    () => {
      nav.style.boxShadow = scrollY > 10 ? "0 1px 20px rgba(0,0,0,.06)" : "";
    },
    { passive: true },
  );
}
