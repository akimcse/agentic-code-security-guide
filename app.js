(function () {
  var KEY = "acs-theme";
  // Apply saved theme ASAP (script is in <head>) to avoid a flash.
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") {
      document.documentElement.setAttribute("data-theme", saved);
    }
  } catch (e) {}

  // Full table of contents, mirroring the official Microsoft Learn "Codename MDASH" TOC.
  var TOC = [
    { group: "개요", items: [
      ["index.html", "개요 (Overview)"],
      ["architecture.html", "아키텍처 (보안 설계)"]
    ] },
    { group: "시작하기 (공통)", items: [
      ["foundry.html", "Foundry 설정"],
      ["defender-setup.html", "권한 설정 (RBAC)"],
      ["portal-onboarding.html", "온보딩"]
    ]},
    { group: "원격 스캔 (커넥터 경로)", items: [
      ["github-connector.html", "GitHub 커넥터 생성"],
      ["ado-connector.html", "Azure DevOps 커넥터 생성"],
      ["ado-provisioning-script.html", "ADO 프로비저닝 스크립트", true],
      ["trigger-scan.html", "Defender Portal에서 스캔 실행"]
    ]},
    { group: "로컬 스캔 (CLI 경로)", items: [
      ["cli-setup.html", "Defender CLI 설정"],
      ["admin-consent.html", "관리자 동의 스크립트", true],
      ["install-run.html", "Defender CLI에서 스캔 실행"],
      ["cicd.html", "CI/CD 예제 (GitHub Actions)", true]
    ]},
    { group: "결과 검토 (공통)", items: [
      ["review-terminal.html", "터미널 결과 검토"],
      ["review-portal.html", "Defender 포털 결과 검토"],
      ["auto-fix.html", "취약점 자동 수정 (GitHub Copilot CLI)"],
      ["audit-log.html", "감사 로그 이벤트"]
    ]},
    { group: "참조", items: [
      ["faq.html", "자주 묻는 질문 (FAQ)"],
      ["troubleshooting.html", "트러블슈팅"]
    ]},
    { group: "블로그", ext: true, items: [
      ["https://www.microsoft.com/en-us/security/blog/2026/05/12/defense-at-ai-speed-microsofts-new-multi-model-agentic-security-system-tops-leading-industry-benchmark/", "MDASH 공식 발표 (2026.05)"],
      ["https://www.microsoft.com/en-us/security/blog/2026/06/17/beyond-the-benchmark-advancing-security-at-ai-speed/", "Beyond the benchmark (2026.06)"],
      ["https://techcommunity.microsoft.com/blog/microsoftdefendercloudblog/built-to-protect-the-architecture-behind-codename-mdash/4541662", "Built to Protect (2026.07)"]
    ]}
  ];

  function currentFile() {
    var p = location.pathname.split("/").pop();
    return p || "index.html";
  }

  // Pages hidden on the deployed site but visible when previewing locally.
  var LOCAL_ONLY = ["architecture.html"];
  function isLocal() {
    var h = location.hostname;
    return h === "localhost" || h === "127.0.0.1" || h === "" || h === "[::1]";
  }
  function isHidden(href) {
    return !isLocal() && LOCAL_ONLY.indexOf(href) !== -1;
  }

  // On the deployed site, rewire prev/next links that point to a hidden page.
  var PAGENAV_REMAP = {
    "architecture.html": { nxt: ["foundry.html", "Foundry 설정"], prev: ["index.html", "개요 (Overview)"] }
  };
  function fixPagenav() {
    if (isLocal()) return;
    var anchors = document.querySelectorAll(".pagenav a");
    Array.prototype.forEach.call(anchors, function (a) {
      var href = (a.getAttribute("href") || "").split("/").pop();
      var map = PAGENAV_REMAP[href];
      if (!map) return;
      var dir = a.classList.contains("nxt") ? "nxt" : "prev";
      var target = map[dir];
      if (!target) return;
      a.setAttribute("href", target[0]);
      var strong = a.querySelector("strong");
      if (strong) strong.textContent = target[1];
    });
  }

  function label(theme) {
    return theme === "dark" ? "☀️ 라이트모드" : "🌙 다크모드";
  }

  function build() {
    var aside = document.getElementById("sidebar");
    if (!aside) return;
    var here = currentFile();

    var html = '<div class="brand"><span class="dot"></span>MDASH Private Preview 가이드</div>' +
               '<div class="brand-sub">Agentic 코드 보안 · 한글 가이드</div><nav>';

    TOC.forEach(function (g) {
      html += '<div class="nav-group' + (g.ext ? " nav-ext" : "") + '"><h4>' + g.group + "</h4>";
      g.items.forEach(function (it) {
        var href = it[0], text = it[1], sub = it[2];
        if (!g.ext && isHidden(href)) return;
        if (g.ext) {
          html += '<a href="' + href + '" target="_blank" rel="noopener">' + text + "</a>";
        } else {
          var cls = [];
          if (href === here) cls.push("active");
          if (sub) cls.push("nav-sub");
          var clsAttr = cls.length ? ' class="' + cls.join(" ") + '"' : "";
          html += '<a href="' + href + '"' + clsAttr + ">" + text + "</a>";
        }
      });
      html += "</div>";
    });

    html += "</nav>";
    html += '<button class="theme-toggle" id="themeToggle" aria-label="테마 전환"></button>';
    aside.innerHTML = html;

    var current = document.documentElement.getAttribute("data-theme") || "light";
    var btn = document.getElementById("themeToggle");
    btn.textContent = label(current);
    btn.addEventListener("click", function () {
      current = (document.documentElement.getAttribute("data-theme") || "light") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", current);
      btn.textContent = label(current);
      try { localStorage.setItem(KEY, current); } catch (e) {}
    });
  }

  function boot() { build(); fixPagenav(); }

  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
