// La date des soirées vit dans l'agenda du HTML (#agenda [data-date]).
// Ce script en déduit la carte « prochaine soirée » et le compte à rebours.

export function nextSession(dates, now) {
  return dates.filter((d) => d > now).sort((a, b) => a - b)[0] ?? null;
}

export function countdown(target, now) {
  const total = Math.max(0, (target - now) / 1000);
  const pad = (n) => String(Math.floor(n)).padStart(2, "0");
  return {
    d: pad(total / 86400),
    h: pad((total % 86400) / 3600),
    m: pad((total % 3600) / 60),
    s: pad(total % 60),
  };
}

function initNextSession() {
  const dates = [...document.querySelectorAll("#agenda [data-date]")].map(
    (el) => new Date(el.dataset.date),
  );
  const target = nextSession(dates, new Date());
  // ponytail: agenda périmé → on laisse le contenu statique du HTML tel quel
  if (!target) return;

  const format = (options) =>
    new Intl.DateTimeFormat("fr-FR", options).format(target);
  const weekday = format({ weekday: "long" });

  const dateEl = document.getElementById("next-event-date");
  if (dateEl) {
    dateEl.innerHTML = `${weekday[0].toUpperCase()}${weekday.slice(1)}<br>${format(
      { day: "numeric", month: "long" },
    )}`;
  }

  const timeEl = document.getElementById("next-event-time");
  if (timeEl) {
    timeEl.textContent = `à partir de ${target.getHours()} h`;
  }

  const cells = ["d", "h", "m", "s"].map((unit) =>
    document.getElementById(`cd-${unit}`),
  );
  if (cells.some((cell) => !cell)) return;

  const tick = () => {
    const left = countdown(target, new Date());
    cells[0].textContent = left.d;
    cells[1].textContent = left.h;
    cells[2].textContent = left.m;
    cells[3].textContent = left.s;
  };
  tick();
  setInterval(tick, 1000);
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNextSession);
  } else {
    initNextSession();
  }
}
