(() => {
  const config = window.VEYRA_CONFIG || {};
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  document.querySelectorAll("[data-download]").forEach(link => {
    if (config.windowsDownload) {
      link.href = config.windowsDownload;
      link.target = "_blank";
      link.rel = "noopener";
    } else {
      link.addEventListener("click", e => {
        e.preventDefault();
        alert("The Veyra Windows release is not available yet.");
      });
    }
  });

  const stage = document.querySelector(".gallery-stage");
  const image = document.querySelector(".gallery-image");
  const dots = [...document.querySelectorAll(".dots button")];
  const prev = document.querySelector(".gallery-button.prev");
  const next = document.querySelector(".gallery-button.next");
  const shots = config.screenshots || [];
  let index = 0;

  function show(i) {
    if (!image || !shots.length) return;
    index = (i + shots.length) % shots.length;
    image.src = shots[index];
    image.onerror = () => stage?.classList.add("missing-image");
    stage?.classList.remove("missing-image");
    dots.forEach((d, n) => d.classList.toggle("active", n === index));
  }
  prev?.addEventListener("click", () => show(index - 1));
  next?.addEventListener("click", () => show(index + 1));
  dots.forEach((d, n) => d.addEventListener("click", () => show(n)));
})();