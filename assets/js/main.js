/* MERIDIAN — bespoke interactions. Topic: news. No shared skeleton. */
(function () {
  "use strict";

  /* Mobile nav drawer */
  const burger = document.querySelector(".nav2 .burger");
  const links = document.querySelector(".nav2 .links");
  if (burger && links) {
    burger.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  /* Scroll reveals — type-set wipe */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((r) => io.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add("in"));
  }

  /* Active nav link */
  const here = location.pathname.split("/").pop();
  document.querySelectorAll(".nav2 .links a").forEach((l) => {
    if (l.getAttribute("href") === here) l.classList.add("active");
  });

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach((y) => (y.textContent = new Date().getFullYear()));

  /* Forms — inline validation, no alert() */
  document.querySelectorAll("[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ok = form.querySelector(".form-ok");
      const err = form.querySelector(".form-err");
      if (!form.checkValidity()) {
        if (err) { err.textContent = "Please complete the required fields."; err.hidden = false; }
        return;
      }
      form.reset();
      if (ok) { ok.hidden = false; setTimeout(() => (ok.hidden = true), 5000); }
      if (err) err.hidden = true;
    });
  });
})();
