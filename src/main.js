// Mobile menu handling
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const menuLine1 = menuToggle?.querySelector(".menu-line-1");
  const menuLine2 = menuToggle?.querySelector(".menu-line-2");

  if (!menuToggle || !mainNav) return;

  function toggleMenu(show) {
    const isExpanded =
      show ?? menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);

    menuLine1?.classList.toggle("hidden");
    menuLine2?.classList.toggle("hidden");

    if (show === false || mainNav.classList.contains("translate-x-full")) {
      mainNav.classList.remove("translate-x-full");
    } else {
      mainNav.classList.add("translate-x-full");
    }
  }

  function closeMenu() {
    mainNav.classList.add("translate-x-full");
    menuToggle.setAttribute("aria-expanded", "false");
    menuLine1?.classList.remove("hidden");
    menuLine2?.classList.add("hidden");
  }

  // Toggle menu on button click
  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking on links
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });
}

// Calculate next event date
function getNextEventDate() {
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  // Get last Friday of a month
  function getLastFriday(year, month) {
    const lastDay = new Date(year, month + 1, 0);
    const dayOfWeek = lastDay.getDay();
    const daysToSubtract = (dayOfWeek + 2) % 7;
    const lastFriday = new Date(lastDay);
    lastFriday.setDate(lastDay.getDate() - daysToSubtract);
    return lastFriday;
  }

  // Find next valid date
  let nextEventDate = null;
  let monthsChecked = 0;

  while (!nextEventDate && monthsChecked < 12) {
    // Skip July (6) and August (7)
    if (currentMonth === 6 || currentMonth === 7) {
      currentMonth = (currentMonth + 1) % 12;
      if (currentMonth === 0) currentYear++;
      monthsChecked++;
      continue;
    }

    const lastFriday = getLastFriday(currentYear, currentMonth);

    // Check if date is in the future or today before 8pm
    if (
      lastFriday > today ||
      (lastFriday.toDateString() === today.toDateString() &&
        today.getHours() < 20)
    ) {
      nextEventDate = lastFriday;
    } else {
      currentMonth = (currentMonth + 1) % 12;
      if (currentMonth === 0) currentYear++;
    }
    monthsChecked++;
  }

  // Format date in French
  if (nextEventDate) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    const formatter = new Intl.DateTimeFormat("fr-FR", options);
    const formattedDate = formatter.format(nextEventDate);

    // Capitalize first letter
    const capitalizedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    // Update HTML element
    const dateElement = document.getElementById("next-event-date");
    if (dateElement) {
      dateElement.textContent = capitalizedDate + " à 20h";
    }
  }
}

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    getNextEventDate();
  });
} else {
  initMobileMenu();
  getNextEventDate();
}
