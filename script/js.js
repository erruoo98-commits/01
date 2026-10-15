document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const bagCount = document.querySelector("#bagCount");

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        mobileNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Duplicate product cards once to create a continuous leftward carousel.
  const productTrack = document.querySelector(".product-track");
  if (productTrack && !productTrack.dataset.cloned) {
    [...productTrack.children].forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("a").forEach((link) => link.setAttribute("tabindex", "-1"));
      productTrack.appendChild(clone);
    });
    productTrack.dataset.cloned = "true";
  }

  // Demo interaction: product VIEW links add one item to the bag count.
  document.querySelectorAll(".product-card .view").forEach((view) => {
    view.addEventListener("click", () => {
      if (bagCount) bagCount.textContent = String(Number(bagCount.textContent || 0) + 1);
    });
  });

  // Pause the product carousel while a visitor is using keyboard focus.
  if (productTrack) {
    productTrack.querySelectorAll("a").forEach((link) => {
      link.addEventListener("focus", () => { productTrack.style.animationPlayState = "paused"; });
      link.addEventListener("blur", () => { productTrack.style.animationPlayState = ""; });
    });
  }
});
