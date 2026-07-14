(function () {
  var KEY = "acs-theme";
  // Apply saved theme as early as possible to avoid a flash.
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") {
      document.documentElement.setAttribute("data-theme", saved);
    }
  } catch (e) {}

  function label(theme) {
    return theme === "dark" ? "☀️ 라이트모드" : "🌙 다크모드";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    var current = document.documentElement.getAttribute("data-theme") || "light";
    btn.textContent = label(current);
    btn.addEventListener("click", function () {
      current = (document.documentElement.getAttribute("data-theme") || "light") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", current);
      btn.textContent = label(current);
      try { localStorage.setItem(KEY, current); } catch (e) {}
    });
  });
})();
