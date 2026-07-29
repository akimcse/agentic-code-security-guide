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
    { group: "개요", items: [["index.html", "개요 (Overview)"]] },
    { group: "시작하기", items: [
      ["onboarding.html", "온보딩 시작하기"],
      ["foundry.html", "Microsoft Foundry 연결"],
      ["github-connector.html", "GitHub 커넥터 생성"],
      ["cli-setup.html", "Defender CLI 설정"],
      ["faq.html", "Codename MDASH FAQ"]
    ]},
    { group: "스캔 실행", items: [
      ["trigger-scan.html", "On-demand 스캔 트리거"],
      ["install-run.html", "설치 및 실행"],
      ["auto-fix.html", "취약점 자동 수정"],
      ["cicd.html", "CI/CD 예제"]
    ]},
    { group: "코딩 에이전트에서 사용", items: [
      ["coding-agent.html", "Defender Code Security 스킬"]
    ]},
    { group: "결과 검토", items: [
      ["review-terminal.html", "터미널 결과 검토"],
      ["review-portal.html", "Defender 포털 결과 검토"]
    ]},
    { group: "참조", items: [
      ["audit-log.html", "감사 로그 이벤트"],
      ["admin-consent.html", "관리자 동의 스크립트"]
    ]},
    { group: "블로그", ext: true, items: [
      ["https://www.microsoft.com/en-us/security/blog/2026/05/12/defense-at-ai-speed-microsofts-new-multi-model-agentic-security-system-tops-leading-industry-benchmark/", "MDASH 공식 발표 (2026.05)"],
      ["https://www.microsoft.com/en-us/security/blog/2026/06/17/beyond-the-benchmark-advancing-security-at-ai-speed/", "Beyond the benchmark (2026.06)"]
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

    var html = '<div class="brand"><span class="dot"></span>Agentic 코드 보안</div>' +
               '<div class="brand-sub">Codename MDASH · 한글 가이드</div><nav>';

    TOC.forEach(function (g) {
      html += '<div class="nav-group' + (g.ext ? " nav-ext" : "") + '"><h4>' + g.group + "</h4>";
      g.items.forEach(function (it) {
        var href = it[0], text = it[1];
        if (g.ext) {
          html += '<a href="' + href + '" target="_blank" rel="noopener">' + text + "</a>";
        } else {
          var active = href === here ? ' class="active"' : "";
          html += '<a href="' + href + '"' + active + ">" + text + "</a>";
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
