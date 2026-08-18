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
      ["defender-setup.html", "권한 설정 (RBAC)"],
      ["onboarding-start.html", "온보딩 시작 (진입점·약관)"],
      ["foundry.html", "Foundry 설정"],
      ["onboarding-complete.html", "온보딩 완료 (엔드포인트·저장)"]
    ]},
    { group: "원격 스캔 (GitHub 경로)", items: [
      ["github-connector.html", "GitHub 커넥터 생성"],
      ["trigger-scan.html", "On-demand 스캔 트리거"]
    ]},
    { group: "로컬 스캔 (CLI 경로)", items: [
      ["cli-setup.html", "Defender CLI 설정"],
      ["admin-consent.html", "관리자 동의 스크립트", true],
      ["install-run.html", "설치 및 실행"],
      ["review-terminal.html", "터미널 결과 검토"],
      ["cicd.html", "CI/CD 예제 (GitHub Actions)"]
    ]},
    { group: "결과 검토 (공통)", items: [
      ["auto-fix.html", "취약점 자동 수정 (GitHub Copilot CLI)"],
      ["review-portal.html", "Defender 포털 결과 검토"],
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

  if (document.readyState !== "loading") build();
  else document.addEventListener("DOMContentLoaded", build);
})();
