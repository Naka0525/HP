/** @format */

(function (root) {
  "use strict";

  // WordPressメディア連携。ユーザー名とアプリケーションパスワードは後からここへ入力する。
  // WordPress管理画面 → ユーザー → プロフィール → アプリケーションパスワード
  var WP_MEDIA_URL = "https://commoncom.jp/wp-json/wp/v2/media";
  var WP_USER = "ccom.dx@gmail.com";
  var WP_APP_PASSWORD = "DrLE unXw YFq8 PKHV gw1h LsM5";
  var FLYER_FILE_CODE = "添付ファイル";

  var FONT_LINK =
    '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Barlow+Condensed:wght@600;700&display=swap" rel="stylesheet">';

  var PAGE_CSS = [
    ".ccx, .ccx *, .ccx *::before, .ccx *::after { box-sizing: border-box; }",
    '.ccx { font-family:"Noto Sans JP",system-ui,sans-serif; color:#141c26; background:#f4f5f2; line-height:1.7; }',
    ".ccx a { color:#14415e; text-decoration:none; transition:.2s; }",
    ".ccx a:hover { color:#c2571c; }",
    ".ccx h2, .ccx h1, .ccx p, .ccx ul, .ccx figure { margin:0; padding:0; }",
    ".ccx ul { list-style:none; }",
    ".ccx-in { max-width:1180px; margin:0 auto; padding:0 28px; }",
    ".ccx h1, .ccx h2, .ccx h3, .ccx h4 { background:none !important; border:0 !important; box-shadow:none !important; padding:0 !important; font-family:inherit !important; color:inherit; text-indent:0 !important; counter-increment:none !important; }",
    ".ccx h1::before, .ccx h1::after, .ccx h2::before, .ccx h2::after, .ccx h3::before, .ccx h3::after, .ccx h4::before, .ccx h4::after { content:none !important; display:none !important; background:none !important; border:0 !important; }",
    ".ccx ul, .ccx ol { list-style:none !important; padding-left:0 !important; background:none !important; border:0 !important; }",
    ".ccx li { list-style:none !important; padding-left:0 !important; background:none !important; border:0 !important; }",
    ".ccx li::marker { content:none; }",
    ".ccx a { box-shadow:none !important; text-decoration:none !important; }",
    ".ccx a::before, .ccx a::after { content:none !important; display:none !important; }",
    ".ccx p { background:none !important; border:0 !important; }",
    ".ccx figure, .ccx figcaption { background:none; border:0; }",
    ".ccx-hero { position:relative; background:#0e1a25; color:#fff; overflow:hidden; }",
    ".ccx-hero img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:.62; filter:saturate(.85) contrast(1.08); }",
    ".ccx-hero-veil { position:absolute; inset:0; background:linear-gradient(100deg,rgba(14,26,37,.94) 6%,rgba(14,26,37,.62) 48%,rgba(14,26,37,.22) 100%); }",
    ".ccx-hero-body { position:relative; padding:70px 28px 84px; max-width:1180px; margin:0 auto; }",
    ".ccx-badge { display:inline-flex; align-items:center; gap:10px; padding:7px 14px; border:1px solid rgba(255,255,255,.28); border-radius:999px; font-size:12px; letter-spacing:.08em; font-weight:500; margin-bottom:28px; }",
    ".ccx-badge i { width:6px; height:6px; border-radius:50%; background:#e0762f; }",
    ".ccx h1.ccx-h1 { font-size:clamp(34px,5vw,60px); line-height:1.12; font-weight:900; letter-spacing:-.01em; margin-bottom:10px !important; }",
    '.ccx-sub { font-family:"Barlow Condensed",sans-serif; font-size:22px; letter-spacing:.14em; color:#e0a878; }',
    ".ccx-lead { font-size:clamp(16px,2vw,19px); line-height:1.95; color:rgba(255,255,255,.9); margin-top:22px !important; }",
    ".ccx-cta-row { display:flex; flex-wrap:wrap; gap:14px; margin-top:40px; }",
    ".ccx-btn { display:inline-flex; align-items:baseline; gap:12px; padding:18px 30px; font-weight:700; font-size:16px; border-radius:3px; }",
    '.ccx-btn b { font-family:"Barlow Condensed",sans-serif; font-weight:700; font-size:19px; letter-spacing:.08em; }',
    ".ccx-btn-o { background:#d9601f; color:#fff !important; box-shadow:0 14px 30px rgba(217,96,31,.35); }",
    ".ccx-btn-o:hover { background:#c2571c; color:#fff !important; transform:translateY(-2px); }",
    ".ccx-btn-g { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.4); color:#fff !important; }",
    ".ccx-btn-g:hover { background:#fff; color:#0e1a25 !important; }",
    ".ccx-sec { max-width:1180px; margin:0 auto; padding:78px 28px 0; }",
    ".ccx-head { display:flex; align-items:flex-end; justify-content:space-between; gap:24px; border-bottom:2px solid #14415e; padding-bottom:14px; margin-bottom:36px; }",
    ".ccx-head h2 { font-size:28px; font-weight:900; letter-spacing:.02em; }",
    '.ccx-en { font-family:"Barlow Condensed",sans-serif; font-size:16px; letter-spacing:.16em; color:#6b7580; }',
    ".ccx-cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(420px,1fr)); gap:26px; }",
    "@media (max-width:560px){ .ccx-cards { grid-template-columns:1fr; } }",
    ".ccx-card { display:flex; flex-direction:column; background:#fff; border:1px solid #e2e4de; border-top:4px solid #d9601f; border-radius:4px; overflow:hidden; transition:.25s; }",
    ".ccx-card.n { border-top-color:#14415e; }",
    ".ccx-card:hover { box-shadow:0 18px 40px rgba(14,26,37,.10); }",
    ".ccx-card-top { padding:30px 32px 24px; border-bottom:1px dashed #dfe1db; display:flex; align-items:flex-start; justify-content:space-between; gap:20px; }",
    '.ccx-date { font-family:"Barlow Condensed",sans-serif; font-size:52px; line-height:.95; font-weight:700; color:#14415e; }',
    ".ccx-date span { color:#d9601f; }",
    ".ccx-place { font-size:17px; font-weight:700; margin-top:12px !important; }",
    ".ccx-tag { flex:none; padding:6px 12px; background:#fdf1e8; color:#c2571c; font-size:12px; font-weight:700; border-radius:2px; }",
    ".ccx-tag.n { background:#eaf0f5; color:#14415e; }",
    ".ccx-card-body { padding:26px 32px 8px; display:grid; gap:24px; }",
    ".ccx-label { font-size:13px; font-weight:700; letter-spacing:.1em; color:#14415e; margin-bottom:12px !important; }",
    ".ccx-list li { display:flex; gap:10px; font-size:14.5px; line-height:1.7; margin-bottom:10px; }",
    '.ccx-list li::before { content:"・" !important; display:inline !important; color:#d9601f; }',
    ".ccx-card-foot { margin-top:auto; padding:26px 32px 30px; display:grid; grid-template-columns:1fr 152px; gap:12px; align-items:stretch; }",
    ".ccx-foot-sub { display:grid; gap:8px; }",
    ".ccx-apply { display:flex; align-items:center; justify-content:center; text-align:center; padding:16px 20px; line-height:1.5; background:#d9601f; color:#fff !important; font-weight:700; font-size:16px; border-radius:3px; }",
    ".ccx-apply:hover { background:#c2571c; }",
    ".ccx-apply.n { background:#14415e; }",
    ".ccx-apply.n:hover { background:#0e1a25; }",
    ".ccx-ghost { display:flex; align-items:center; justify-content:center; text-align:center; padding:8px 10px; border:1px solid #cdd1cb; border-radius:3px; font-size:12.5px; font-weight:500; }",
    ".ccx-ghost:hover { border-color:#14415e; }",
    ".ccx-photos { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:20px; }",
    ".ccx-photos figure { position:relative; overflow:hidden; border-radius:4px; background:#0e1a25; }",
    ".ccx-photos img { width:100%; height:280px; object-fit:cover; display:block; }",
    ".ccx .ccx-photos figcaption { position:absolute; left:0; bottom:0; padding:14px 20px; background:rgba(14,26,37,.82); color:#fff; font-size:13px; font-weight:700; letter-spacing:.06em; }",
    ".ccx-past-head { border-bottom:1px solid #d7dad3 !important; margin-bottom:8px !important; }",
    ".ccx-past-head h2 { font-size:24px; color:#4a545e; }",
    ".ccx-row { display:grid; grid-template-columns:190px 1fr 168px; gap:28px; padding:26px 4px; border-bottom:1px solid #e4e6e0; align-items:start; }",
    "@media (max-width:820px){ .ccx-row { grid-template-columns:1fr; gap:16px; } }",
    ".ccx-row:hover { background:#fafbf8; }",
    '.ccx-row-date { font-family:"Barlow Condensed",sans-serif; font-size:30px; font-weight:700; color:#14415e; line-height:1; }',
    ".ccx-row-place { font-size:14px; font-weight:700; margin-top:8px !important; }",
    ".ccx-row-note { font-size:12px; line-height:1.7; color:#6b7580; margin-top:10px !important; }",
    ".ccx-row-groups { display:grid; gap:16px; }",
    ".ccx-row-label { font-size:12px; font-weight:700; letter-spacing:.1em; color:#8b939c; margin-bottom:8px !important; }",
    ".ccx-row-list li { display:flex; gap:8px; font-size:13.5px; line-height:1.7; color:#3b444e; margin-bottom:6px; }",
    '.ccx-row-list li::before { content:"・" !important; display:inline !important; color:#c9ced6; }',
    ".ccx-row-links { display:grid; gap:8px; font-size:13px; }",
    ".ccx-row-links a { padding:11px 14px; text-align:center; border:1px solid #dcdfd8; border-radius:2px; }",
    ".ccx-row-links a:hover { border-color:#14415e; }",
    ".ccx-sticky { position:fixed; left:0; right:0; bottom:0; z-index:50; background:rgba(14,26,37,.96); border-top:1px solid rgba(255,255,255,.12); }",
    ".ccx-sticky-in { max-width:1180px; margin:0 auto; padding:14px 28px; display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; }",
    ".ccx-sticky p { color:#fff; font-size:14px; font-weight:700; }",
    ".ccx-sticky p span { color:rgba(255,255,255,.55); font-weight:400; margin-left:12px; }",
    ".ccx-sticky-btns { display:flex; gap:10px; }",
    ".ccx-sticky-btns a { padding:13px 24px; font-weight:700; font-size:14px; border-radius:3px; }",
  ].join("\n");

  var HERO_IMG =
    "https://commoncom.jp/wp/wp-content/uploads/2026/01/4011255_s.jpg";
  var PHOTO_EXHIBIT =
    "https://commoncom.jp/wp/wp-content/uploads/2025/10/d53e5269c9322e4dfba1d426b77ecbb5-300x200.jpg.webp";
  var PHOTO_SEMINAR =
    "https://commoncom.jp/wp/wp-content/uploads/2025/10/IMG_0146-1024x768.jpg.webp";
  var PREF_EN = { "埼玉": "SAITAMA", "新潟": "NIIGATA" };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fieldValue(record, code) {
    var field = record && record[code];
    if (!field || field.value == null || field.value === "") return "";
    return field.value;
  }

  function todayJst() {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  }

  function parseDate(iso) {
    var parts = String(iso || "").split("-");
    return {
      y: Number(parts[0]),
      m: Number(parts[1]),
      d: Number(parts[2]),
    };
  }

  function upcomingDateHtml(iso) {
    var dt = parseDate(iso);
    return dt.y + "<span>/</span>" + dt.m + "<span>/</span>" + dt.d;
  }

  function slashDate(iso) {
    var dt = parseDate(iso);
    return dt.y + "/" + dt.m + "/" + dt.d;
  }

  function mdDate(iso) {
    var dt = parseDate(iso);
    return dt.m + "/" + dt.d;
  }

  function tableTitles(record, tableCode, sortCode, titleCode) {
    var rows = fieldValue(record, tableCode) || [];
    return rows
      .map(function (row) {
        var values = row.value || {};
        var sortField = values[sortCode] || {};
        var titleField = values[titleCode] || {};
        return {
          sort: Number(sortField.value) || 0,
          title: titleField.value || "",
        };
      })
      .filter(function (row) {
        return row.title;
      })
      .sort(function (a, b) {
        return a.sort - b.sort;
      })
      .map(function (row) {
        return row.title;
      });
  }

  function normalizeRecord(record) {
    return {
      name: fieldValue(record, "event_name"),
      date: fieldValue(record, "event_date"),
      prefecture: fieldValue(record, "prefecture"),
      venue: fieldValue(record, "venue"),
      eventType: fieldValue(record, "event_type"),
      applyUrl: fieldValue(record, "apply_url"),
      detailUrl: fieldValue(record, "detail_url"),
      flyerUrl: fieldValue(record, "flyer_url"),
      visitorCompanies: fieldValue(record, "visitor_companies"),
      visitors: fieldValue(record, "visitors"),
      seminars: tableTitles(
        record,
        "seminars",
        "seminar_sort",
        "seminar_title",
      ),
      exhibits: tableTitles(
        record,
        "exhibits",
        "exhibit_sort",
        "exhibit_title",
      ),
    };
  }

  function classifyEvents(events) {
    var today = todayJst();
    var latestByPref = {};
    events.forEach(function (event) {
      if (!event.date || !event.prefecture) return;
      var current = latestByPref[event.prefecture];
      if (!current || event.date > current)
        latestByPref[event.prefecture] = event.date;
    });
    var upcoming = [];
    var past = [];
    events.forEach(function (event) {
      if (!event.date) return;
      var latest = latestByPref[event.prefecture];
      var isLatestForPref = latest && event.date === latest;
      if (isLatestForPref && event.date >= today) upcoming.push(event);
      else past.push(event);
    });
    upcoming.sort(function (a, b) {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
    past.sort(function (a, b) {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
    return { upcoming: upcoming, past: past };
  }

  function isNavy(event) {
    return event.eventType === "出展";
  }

  function listHtml(titles, className) {
    return titles
      .map(function (title) {
        return "<li>" + esc(title) + "</li>";
      })
      .join("");
  }

  function groupHtml(label, titles, listClass, labelClass) {
    if (!titles.length) return "";
    return (
      "<div>" +
      '<p class="' +
      labelClass +
      '">＜' +
      esc(label) +
      "＞</p>" +
      '<ul class="' +
      listClass +
      '">' +
      listHtml(titles) +
      "</ul>" +
      "</div>"
    );
  }

  function ctaEvents(upcoming) {
    return upcoming.filter(function (event) {
      return event.applyUrl;
    });
  }

  function uniquePrefEn(upcoming) {
    var seen = {};
    var labels = [];
    upcoming.forEach(function (event) {
      if (seen[event.prefecture]) return;
      seen[event.prefecture] = true;
      labels.push(PREF_EN[event.prefecture] || event.prefecture);
    });
    return labels;
  }

  function yearFrom(upcoming, past) {
    var source = upcoming.length ? upcoming : past;
    if (!source.length) return new Date().getFullYear();
    return parseDate(source[0].date).y;
  }

  function renderHero(upcoming, past) {
    var year = yearFrom(upcoming, past);
    var ctas = ctaEvents(upcoming);
    var prefs = uniquePrefEn(upcoming.length ? upcoming : past);
    var sub = prefs.length
      ? prefs.join(" &nbsp;/&nbsp; ") + " &nbsp;" + year
      : String(year);
    var ctaHtml = ctas
      .map(function (event, index) {
        var klass = index === 0 ? "ccx-btn ccx-btn-o" : "ccx-btn ccx-btn-g";
        return (
          '<a class="' +
          klass +
          '" href="' +
          esc(event.applyUrl) +
          '">' +
          "<b>" +
          esc(mdDate(event.date)) +
          "</b>" +
          esc(event.prefecture) +
          "のお申込みはこちら" +
          "</a>"
        );
      })
      .join("\n        ");
    return [
      '  <section class="ccx-hero">',
      '    <img src="' + HERO_IMG + '" alt="">',
      '    <div class="ccx-hero-veil"></div>',
      '    <div class="ccx-hero-body">',
      '      <div class="ccx-badge"><i></i>' +
        year +
        "年 開催情報" +
        (ctas.length ? " 受付中" : "") +
        "</div>",
      '      <h1 class="ccx-h1">展示会&amp;セミナー<br>のご案内</h1>',
      '      <p class="ccx-sub">' + sub + "</p>",
      '      <p class="ccx-lead">現場の改善と経営の判断を支える物流DX＋AI。<br>コモンコムが事例を交えて紹介します。</p>',
      ctas.length
        ? '      <div class="ccx-cta-row">\n        ' +
          ctaHtml +
          "\n      </div>"
        : "",
      "    </div>",
      "  </section>",
    ]
      .filter(Boolean)
      .join("\n");
  }

  function renderCardFoot(event, navyClass) {
    var ghosts = [];
    if (event.detailUrl)
      ghosts.push(
        '<a class="ccx-ghost" href="' +
          esc(event.detailUrl) +
          '">詳細はこちら</a>',
      );
    if (event.flyerUrl)
      ghosts.push(
        '<a class="ccx-ghost" href="' +
          esc(event.flyerUrl) +
          '">チラシを見る</a>',
      );
    var apply = event.applyUrl
      ? '<a class="ccx-apply' +
        navyClass +
        '" href="' +
        esc(event.applyUrl) +
        '">' +
        esc(event.prefecture) +
        "のお申込みは<br>こちら →</a>"
      : "";
    var sub = ghosts.length
      ? '<div class="ccx-foot-sub">' + ghosts.join("\n            ") + "</div>"
      : "";
    if (!apply && !sub) return "";
    var cols = apply && sub ? "" : ' style="grid-template-columns:1fr"';
    return (
      '        <div class="ccx-card-foot"' +
      cols +
      ">\n" +
      (apply ? "          " + apply + "\n" : "") +
      (sub ? "          " + sub + "\n" : "") +
      "        </div>"
    );
  }

  function renderUpcomingCard(event) {
    var navy = isNavy(event);
    var navyClass = navy ? " n" : "";
    var body = [
      groupHtml("セミナー", event.seminars, "ccx-list", "ccx-label"),
      groupHtml("出展", event.exhibits, "ccx-list", "ccx-label"),
    ]
      .filter(Boolean)
      .join("\n          ");
    return [
      '      <article class="ccx-card' + navyClass + '">',
      '        <div class="ccx-card-top">',
      "          <div>",
      '            <p class="ccx-date">' +
        upcomingDateHtml(event.date) +
        "</p>",
      '            <p class="ccx-place">' +
        esc(event.prefecture) +
        " ／ " +
        esc(event.venue) +
        "</p>",
      "          </div>",
      '          <span class="ccx-tag' +
        navyClass +
        '">' +
        esc(event.eventType) +
        "</span>",
      "        </div>",
      '        <div class="ccx-card-body">',
      "          " + body,
      "        </div>",
      renderCardFoot(event, navyClass),
      "      </article>",
    ].join("\n");
  }

  function renderUpcoming(upcoming) {
    if (!upcoming.length) return "";
    var countLabel =
      upcoming.length + " EVENT" + (upcoming.length === 1 ? "" : "S");
    return [
      "",
      '  <section class="ccx-sec">',
      '    <div class="ccx-head">',
      "      <h2>開催予定</h2>",
      '      <p class="ccx-en">UPCOMING &nbsp;—&nbsp; ' + countLabel + "</p>",
      "    </div>",
      '    <div class="ccx-cards">',
      upcoming.map(renderUpcomingCard).join("\n\n"),
      "    </div>",
      "  </section>",
    ].join("\n");
  }

  function renderPhotos() {
    return [
      "",
      '  <section class="ccx-sec">',
      '    <div class="ccx-photos">',
      "      <figure>",
      '        <img src="' + PHOTO_EXHIBIT + '" alt="展示会風景">',
      "        <figcaption>展示会風景</figcaption>",
      "      </figure>",
      "      <figure>",
      '        <img src="' + PHOTO_SEMINAR + '" alt="セミナー風景">',
      "        <figcaption>セミナー風景</figcaption>",
      "      </figure>",
      "    </div>",
      "  </section>",
    ].join("\n");
  }

  function renderPastEvent(event) {
    var groups = [
      groupHtml("セミナー", event.seminars, "ccx-row-list", "ccx-row-label"),
      groupHtml("出展", event.exhibits, "ccx-row-list", "ccx-row-label"),
    ]
      .filter(Boolean)
      .join("\n        ");
    var note = "";
    if (event.visitorCompanies !== "" && event.visitors !== "") {
      note =
        '\n        <p class="ccx-row-note">' +
        esc(event.visitorCompanies) +
        "社" +
        esc(event.visitors) +
        "名様<br>ご来場いただきました！<br>ありがとうございました！</p>";
    }
    var links = [];
    if (event.detailUrl)
      links.push('<a href="' + esc(event.detailUrl) + '">詳細はこちら</a>');
    if (event.flyerUrl)
      links.push('<a href="' + esc(event.flyerUrl) + '">チラシを見る</a>');
    return [
      '    <div class="ccx-row">',
      "      <div>",
      '        <p class="ccx-row-date">' + slashDate(event.date) + "</p>",
      '        <p class="ccx-row-place">' +
        esc(event.prefecture) +
        " ／ " +
        esc(event.venue) +
        "</p>" +
        note,
      "      </div>",
      '      <div class="ccx-row-groups">',
      "        " + groups,
      "      </div>",
      '      <div class="ccx-row-links">',
      "        " + links.join("\n        "),
      "      </div>",
      "    </div>",
    ].join("\n");
  }

  function renderPast(past, hasSticky) {
    if (!past.length) return "";
    return [
      "",
      '  <section class="ccx-sec"' +
        (hasSticky ? ' style="padding-bottom:90px"' : "") +
        ">",
      '    <div class="ccx-head ccx-past-head">',
      "      <h2>終了分</h2>",
      '      <p class="ccx-en">PAST EVENTS</p>',
      "    </div>",
      "",
      past.map(renderPastEvent).join("\n\n"),
      "  </section>",
    ].join("\n");
  }

  function renderSticky(upcoming) {
    var ctas = ctaEvents(upcoming);
    if (!ctas.length) return "";
    var summary =
      ctas
        .map(function (event) {
          return event.prefecture + " " + mdDate(event.date);
        })
        .join("・") + " 開催";
    var buttons = ctas
      .map(function (event, index) {
        var klass = index === 0 ? "ccx-btn-o" : "ccx-btn-g";
        var extra = index === 0 ? ' style="box-shadow:none"' : "";
        return (
          '<a class="' +
          klass +
          '" href="' +
          esc(event.applyUrl) +
          '"' +
          extra +
          ">" +
          esc(event.prefecture) +
          "のお申込み</a>"
        );
      })
      .join("\n        ");
    return [
      "",
      '  <div class="ccx-sticky">',
      '    <div class="ccx-sticky-in">',
      "      <p>お申込み受付中<span>" + esc(summary) + "</span></p>",
      '      <div class="ccx-sticky-btns">',
      "        " + buttons,
      "      </div>",
      "    </div>",
      "  </div>",
    ].join("\n");
  }

  function generateFromRecords(records) {
    var events = (records || []).map(normalizeRecord).filter(function (event) {
      return event.date;
    });
    var classified = classifyEvents(events);
    var sticky = renderSticky(classified.upcoming);
    var body = [
      renderHero(classified.upcoming, classified.past),
      renderUpcoming(classified.upcoming),
      renderPhotos(),
      renderPast(classified.past, !!sticky),
      sticky,
    ]
      .filter(Boolean)
      .join("\n");
    return [
      "<!-- ▼ここから▼ -->",
      FONT_LINK,
      "<style>",
      PAGE_CSS,
      "</style>",
      "",
      '<div class="ccx">',
      "",
      body,
      "</div>",
      "<!-- ▲ここまで▲ -->",
    ].join("\n");
  }

  function previewDocument(pasteHtml) {
    var inner = pasteHtml
      .replace("<!-- ▼ここから▼ -->", "")
      .replace("<!-- ▲ここまで▲ -->", "");
    return (
      '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      "<title>プレビュー｜展示会&amp;セミナーのご案内</title></head>" +
      '<body style="margin:0;background:#fff">' +
      inner +
      "</body></html>"
    );
  }

  function ensurePreviewUi() {
    var root = document.getElementById("ccx-preview-root");
    if (root) return root;
    var style = document.createElement("style");
    style.textContent = [
      '#ccx-preview-root{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;background:#0e1a25;font-family:"Noto Sans JP",system-ui,sans-serif;}',
      "#ccx-preview-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 20px;background:#0e1a25;color:#fff;border-bottom:1px solid rgba(255,255,255,.12);flex-wrap:wrap;}",
      "#ccx-preview-bar h2{margin:0;font-size:16px;font-weight:700;letter-spacing:.04em;}",
      "#ccx-preview-bar .ccx-preview-actions{display:flex;gap:8px;flex-wrap:wrap;}",
      "#ccx-preview-bar button{border:0;border-radius:3px;padding:10px 16px;font-weight:700;font-size:13px;cursor:pointer;}",
      "#ccx-preview-copy{background:#d9601f;color:#fff;}",
      "#ccx-preview-tab-preview,#ccx-preview-tab-source,#ccx-preview-close{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.25) !important;}",
      "#ccx-preview-bar button.is-active{background:#fff;color:#0e1a25;}",
      "#ccx-preview-status{min-width:8em;font-size:12px;color:#e0a878;}",
      "#ccx-preview-frame,#ccx-preview-source{flex:1;width:100%;border:0;background:#fff;}",
      "#ccx-preview-source{display:none;padding:20px;box-sizing:border-box;font:12px/1.6 ui-monospace,Consolas,monospace;color:#141c26;resize:none;}",
    ].join("");
    document.head.appendChild(style);

    root = document.createElement("div");
    root.id = "ccx-preview-root";
    root.innerHTML =
      '<div id="ccx-preview-bar">' +
      "<h2>展示会HTMLプレビュー</h2>" +
      '<div class="ccx-preview-actions">' +
      '<span id="ccx-preview-status"></span>' +
      '<button type="button" id="ccx-preview-tab-preview" class="is-active">プレビュー</button>' +
      '<button type="button" id="ccx-preview-tab-source">ソース</button>' +
      '<button type="button" id="ccx-preview-copy">HTMLをコピー</button>' +
      '<button type="button" id="ccx-preview-close">閉じる</button>' +
      "</div>" +
      "</div>" +
      '<iframe id="ccx-preview-frame" title="HTMLプレビュー"></iframe>' +
      '<textarea id="ccx-preview-source" readonly></textarea>';
    document.body.appendChild(root);

    var frame = root.querySelector("#ccx-preview-frame");
    var source = root.querySelector("#ccx-preview-source");
    var status = root.querySelector("#ccx-preview-status");
    root
      .querySelector("#ccx-preview-close")
      .addEventListener("click", function () {
        root.style.display = "none";
      });
    root
      .querySelector("#ccx-preview-tab-preview")
      .addEventListener("click", function () {
        root
          .querySelector("#ccx-preview-tab-preview")
          .classList.add("is-active");
        root
          .querySelector("#ccx-preview-tab-source")
          .classList.remove("is-active");
        frame.style.display = "block";
        source.style.display = "none";
      });
    root
      .querySelector("#ccx-preview-tab-source")
      .addEventListener("click", function () {
        root
          .querySelector("#ccx-preview-tab-source")
          .classList.add("is-active");
        root
          .querySelector("#ccx-preview-tab-preview")
          .classList.remove("is-active");
        frame.style.display = "none";
        source.style.display = "block";
      });
    root
      .querySelector("#ccx-preview-copy")
      .addEventListener("click", function () {
        copyHtml(source.value)
          .then(function () {
            status.textContent = "コピーしました";
          })
          .catch(function () {
            source.select();
            status.textContent = "Ctrl+C でコピーしてください";
          });
      });
    return root;
  }

  function showPreview(pasteHtml) {
    var root = ensurePreviewUi();
    var frame = root.querySelector("#ccx-preview-frame");
    var source = root.querySelector("#ccx-preview-source");
    source.value = pasteHtml;
    root.querySelector("#ccx-preview-status").textContent = "";
    root.querySelector("#ccx-preview-tab-preview").classList.add("is-active");
    root.querySelector("#ccx-preview-tab-source").classList.remove("is-active");
    frame.style.display = "block";
    source.style.display = "none";
    if (root._blobUrl) URL.revokeObjectURL(root._blobUrl);
    var blob = new Blob([previewDocument(pasteHtml)], { type: "text/html" });
    root._blobUrl = URL.createObjectURL(blob);
    frame.src = root._blobUrl;
    root.style.display = "flex";
  }

  function fileToObjectUrl(fileKey) {
    return fetch(
      kintone.api.url("/k/v1/file", true) +
        "?fileKey=" +
        encodeURIComponent(fileKey),
      {
        method: "GET",
        credentials: "same-origin",
        headers: { "X-Requested-With": "XMLHttpRequest" },
      },
    )
      .then(function (res) {
        if (!res.ok) throw new Error("file " + res.status);
        return res.blob();
      })
      .then(function (blob) {
        return URL.createObjectURL(blob);
      });
  }

  function loadHelpImages(root) {
    var img1 = root.querySelector("#ccx-help-img1");
    var img2 = root.querySelector("#ccx-help-img2");
    kintone
      .api(kintone.api.url("/k/v1/records", true), "GET", {
        app: kintone.app.getId(),
        query: "order by レコード番号 asc",
        fields: ["help_images"],
      })
      .then(function (resp) {
        var files = [];
        (resp.records || []).some(function (record) {
          var value = record.help_images && record.help_images.value;
          if (value && value.length) {
            files = value;
            return true;
          }
          return false;
        });
        if (!files.length) return null;
        var jobs = [];
        if (files[0] && img1) {
          jobs.push(
            fileToObjectUrl(files[0].fileKey).then(function (url) {
              if (img1._objectUrl) URL.revokeObjectURL(img1._objectUrl);
              img1._objectUrl = url;
              img1.src = url;
              img1.style.display = "block";
            }),
          );
        }
        if (files[1] && img2) {
          jobs.push(
            fileToObjectUrl(files[1].fileKey).then(function (url) {
              if (img2._objectUrl) URL.revokeObjectURL(img2._objectUrl);
              img2._objectUrl = url;
              img2.src = url;
              img2.style.display = "block";
            }),
          );
        }
        return Promise.all(jobs);
      })
      .catch(function () {});
  }

  function ensureHelpUi() {
    var root = document.getElementById("ccx-help-root");
    if (root) return root;
    var style = document.createElement("style");
    style.textContent = [
      '#ccx-help-root{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;background:#f4f5f2;font-family:"Noto Sans JP",system-ui,sans-serif;color:#141c26;}',
      "#ccx-help-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 20px;background:#0e1a25;color:#fff;flex:none;}",
      "#ccx-help-bar h2{margin:0;font-size:16px;font-weight:700;}",
      "#ccx-help-close{border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.08);color:#fff;border-radius:3px;padding:10px 16px;font-weight:700;cursor:pointer;}",
      "#ccx-help-body{flex:1;overflow:auto;padding:28px 24px 48px;}",
      "#ccx-help-body article{max-width:920px;margin:0 auto;background:#fff;border:1px solid #e2e4de;border-radius:6px;padding:32px 36px 40px;line-height:1.8;}",
      "#ccx-help-body h3{margin:28px 0 12px;font-size:20px;color:#14415e;}",
      "#ccx-help-body h3:first-child{margin-top:0;}",
      "#ccx-help-body p,#ccx-help-body li{font-size:14.5px;}",
      "#ccx-help-body ol{padding-left:1.3em;}",
      "#ccx-help-body li{margin-bottom:8px;}",
      "#ccx-help-body a{color:#14415e;font-weight:700;}",
      "#ccx-help-body figure{margin:16px 0 8px;background:#f4f5f2;border:1px solid #e2e4de;border-radius:4px;overflow:hidden;}",
      "#ccx-help-body img{display:none;width:100%;height:auto;vertical-align:top;}",
      "#ccx-help-body figcaption{padding:10px 14px;font-size:12.5px;color:#6b7580;}",
    ].join("");
    document.head.appendChild(style);

    root = document.createElement("div");
    root.id = "ccx-help-root";
    root.innerHTML =
      '<div id="ccx-help-bar">' +
      "<h2>ヘルプ</h2>" +
      '<button type="button" id="ccx-help-close">閉じる</button>' +
      "</div>" +
      '<div id="ccx-help-body"><article>' +
      "      <h3>このアプリについて</h3>" +
      "<p>展示会・セミナーの情報を kintone で管理し、WordPress（SWELL）の固定ページへ貼り付けるHTMLを自動生成するアプリです。1イベントにつき1レコードです。</p>" +
      "<ol>" +
      "<li>開催日・都道府県・会場・種別・セミナー／出展・各URLを登録します。チラシはPDFを「チラシファイル」に1つ付けて保存すると、WordPressへ送られ「チラシURL」に入ります。ファイルを付けなければ、今のチラシURLはそのままです。</li>" +
      "<li>公開状態を「公開」にしたレコードだけがHTML生成の対象です。</li>" +
      "<li>都道府県ごとに、開催日が一番新しいイベントだけが「開催予定」になります。同じ都道府県のそれ以外は「終了分」です。</li>" +
      "<li>「HTML生成・プレビュー」で見た目を確認し、HTMLをコピーします。</li>" +
      "<li>「WordPress」から固定ページの編集画面を開き、コピーしたHTMLを貼り付けます。</li>" +
      "</ol>" +
      "<h3>生成したHTMLを WordPress のカスタムHTMLに設定する</h3>" +
      "<ol>" +
      "<li>「WordPress」ボタンを押すか、" +
      '<a href="' +
      WP_EDIT_URL +
      '" target="_blank" rel="noopener noreferrer">固定ページ「展示会」の編集画面</a>' +
      "を開きます。</li>" +
      "<li>本文の「カスタム HTML」ブロックをクリックします。右側のブロック設定に「カスタム HTML」と表示されます。</li>" +
      "<li>ブロック左上の「コードを編集」を押します。</li>" +
      "</ol>" +
      "<figure>" +
      '<img id="ccx-help-img1" alt="カスタムHTMLブロックとコードを編集ボタン">' +
      "<figcaption>図1. カスタムHTMLブロック。「コードを編集」で貼り付け欄を開き、「HTML」でプレビューできます。</figcaption>" +
      "</figure>" +
      '<ol start="4">' +
      "<li>このアプリでコピーしたHTML（「ここから」〜「ここまで」の範囲）を、貼り付け欄へすべて貼ります。</li>" +
      "<li>「HTML」を押すと、展示会ページの見た目でプレビューできます。</li>" +
      "<li>「コードを編集」から開く画面では、左がHTML、右がプレビューです。問題なければ右下の「更新」を押します。</li>" +
      "</ol>" +
      "<figure>" +
      '<img id="ccx-help-img2" alt="コード編集モーダルのHTMLタブとプレビュー">' +
      "<figcaption>図2. コード編集画面。HTMLタブに貼り付け、右側のプレビューを確認して「更新」します。</figcaption>" +
      "</figure>" +
      "<p>SWELLのページ設定で「タイトルを非表示」「本文を全幅（フルワイド）」にすると、ヒーローが画面幅いっぱいに広がります。</p>" +
      "</article></div>";
    document.body.appendChild(root);
    root
      .querySelector("#ccx-help-close")
      .addEventListener("click", function () {
        root.style.display = "none";
      });
    return root;
  }

  function showHelp() {
    var root = ensureHelpUi();
    root.style.display = "flex";
    loadHelpImages(root);
  }

  function copyHtml(html) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(html);
    }
    return Promise.reject(new Error("clipboard unavailable"));
  }

  function getEvents() {
    var all = [];
    function fetchPage(offset) {
      return kintone
        .api(kintone.api.url("/k/v1/records", true), "GET", {
          app: kintone.app.getId(),
          query:
            'publish_status in ("公開") order by event_date desc limit 500 offset ' +
            offset,
        })
        .then(function (resp) {
          all = all.concat(resp.records || []);
          if ((resp.records || []).length === 500)
            return fetchPage(offset + 500);
          return all;
        });
    }
    return fetchPage(0);
  }

  var WP_EDIT_URL =
    "https://commoncom.jp/wp/wp-admin/post.php?post=6042&action=edit";
  var LIST_VIEW_ID = "13313387";
  var CALENDAR_VIEW_ID = "13313393";

  function appViewUrl(viewId) {
    return "/k/" + kintone.app.getId() + "/?view=" + viewId;
  }

  function injectButtonStyles() {
    if (document.getElementById("ccx-html-gen-style")) return;
    var style = document.createElement("style");
    style.id = "ccx-html-gen-style";
    style.textContent = [
      "#ccx-html-gen-bar{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;}",
      "#ccx-html-gen-bar.ccx-html-gen-bar-menu{margin:0 8px 0 0;padding:0;}",
      "#ccx-html-gen-bar.ccx-html-gen-bar-toolbar{height:48px;margin:0;padding:0 10px 0 0;vertical-align:middle;}",
      "#ccx-html-gen-btn,#ccx-html-cal-btn,#ccx-html-wp-link,#ccx-html-help-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:32px;padding:0 14px;border-radius:4px;font-size:12px;font-weight:700;letter-spacing:.04em;line-height:1;white-space:nowrap;text-decoration:none !important;box-sizing:border-box;cursor:pointer;transition:background .15s,box-shadow .15s,color .15s;}",
      "#ccx-html-gen-btn{border:0;background:#14415e;color:#fff;box-shadow:0 1px 2px rgba(14,26,37,.18);}",
      "#ccx-html-gen-btn:hover{background:#0e1a25;box-shadow:0 4px 10px rgba(14,26,37,.2);}",
      "#ccx-html-gen-btn:disabled{opacity:.65;cursor:wait;box-shadow:none;}",
      "#ccx-html-cal-btn,#ccx-html-wp-link,#ccx-html-help-btn{border:1px solid #14415e;background:#fff;color:#14415e;}",
      "#ccx-html-cal-btn:hover,#ccx-html-wp-link:hover,#ccx-html-help-btn:hover{background:#14415e;color:#fff;}",
      "#ccx-html-gen-btn .ccx-html-gen-icon{width:12px;height:12px;border:1.5px solid #fff;border-radius:2px;position:relative;flex:none;}",
      '#ccx-html-gen-btn .ccx-html-gen-icon::before{content:"";position:absolute;left:2px;right:2px;top:3px;height:1.5px;background:#fff;box-shadow:0 3px 0 #fff;}',
    ].join("");
    document.head.appendChild(style);
  }

  function onGenerate() {
    var btn = document.getElementById("ccx-html-gen-btn");
    var label = btn && btn.querySelector(".ccx-html-gen-label");
    if (btn) btn.disabled = true;
    if (label) label.textContent = "生成中...";
    getEvents()
      .then(function (records) {
        showPreview(generateFromRecords(records));
      })
      .catch(function (err) {
        alert("HTML生成に失敗しました: " + (err.message || err));
      })
      .then(function () {
        if (btn) btn.disabled = false;
        if (label) label.textContent = "HTML生成・プレビュー";
      });
  }

  function syncCalButton(bar, event) {
    var calBtn = bar.querySelector("#ccx-html-cal-btn");
    if (!calBtn) return;
    var onCalendar = !!(event && String(event.viewId) === CALENDAR_VIEW_ID);
    calBtn.textContent = onCalendar ? "一覧" : "カレンダー";
    calBtn.onclick = function () {
      location.href = appViewUrl(onCalendar ? LIST_VIEW_ID : CALENDAR_VIEW_ID);
    };
  }

  function createBar(variant, event) {
    injectButtonStyles();
    var bar = document.createElement("div");
    bar.id = "ccx-html-gen-bar";
    bar.className = "ccx-html-gen-bar-" + variant;
    bar.innerHTML =
      '<button type="button" id="ccx-html-gen-btn">' +
      '<span class="ccx-html-gen-icon" aria-hidden="true"></span>' +
      '<span class="ccx-html-gen-label">HTML生成・プレビュー</span>' +
      "</button>" +
      '<button type="button" id="ccx-html-cal-btn">カレンダー</button>' +
      '<a id="ccx-html-wp-link" href="' +
      WP_EDIT_URL +
      '" target="_blank" rel="noopener noreferrer">WordPress</a>' +
      '<button type="button" id="ccx-html-help-btn">ヘルプ</button>';
    bar
      .querySelector("#ccx-html-gen-btn")
      .addEventListener("click", onGenerate);
    bar.querySelector("#ccx-html-help-btn").addEventListener("click", showHelp);
    syncCalButton(bar, event);
    return bar;
  }

  function placeIndexButton(event) {
    var container = kintone.app.getHeaderMenuSpaceElement();
    if (!container) return;
    var bar = container.querySelector("#ccx-html-gen-bar");
    if (!bar) {
      container.appendChild(createBar("menu", event));
      return;
    }
    syncCalButton(bar, event);
  }

  function findDetailPager() {
    return (
      document.querySelector(
        ".gaia-argoui-app-show-toolbar .gaia-argoui-app-pager",
      ) ||
      document.querySelector(
        ".gaia-argoui-app-toolbar-menu .gaia-argoui-app-pager",
      ) ||
      document.querySelector(".gaia-argoui-app-toolbar .gaia-argoui-app-pager")
    );
  }

  function placeDetailButton(attempt) {
    attempt = attempt || 0;
    if (document.getElementById("ccx-html-gen-bar")) return;
    var pager = findDetailPager();
    if (!pager || !pager.parentNode) {
      if (attempt < 25) {
        setTimeout(function () {
          placeDetailButton(attempt + 1);
        }, 80);
      }
      return;
    }
    pager.parentNode.insertBefore(createBar("toolbar"), pager);
  }

  function wpCredentialsReady() {
    return !!(WP_USER && WP_APP_PASSWORD);
  }

  function wpBasicAuth() {
    var raw = unescape(encodeURIComponent(WP_USER + ":" + WP_APP_PASSWORD));
    return "Basic " + btoa(raw);
  }

  function flyerFiles(record) {
    var field = record && record[FLYER_FILE_CODE];
    return (field && field.value) || [];
  }

  function isPdfFile(file) {
    var name = String(file.name || "").toLowerCase();
    var type = String(file.contentType || "").toLowerCase();
    return name.slice(-4) === ".pdf" || type === "application/pdf";
  }

  function asciiPdfFilename(name, recordId) {
    var raw = String(name || "").replace(/["\\\r\n]/g, "");
    if (/^[A-Za-z0-9._-]+\.pdf$/i.test(raw)) return raw;
    return "flyer-" + recordId + ".pdf";
  }

  function fetchKintoneBlob(fileKey) {
    return fetch(
      kintone.api.url("/k/v1/file", true) +
        "?fileKey=" +
        encodeURIComponent(fileKey),
      {
        method: "GET",
        credentials: "same-origin",
        headers: { "X-Requested-With": "XMLHttpRequest" },
      },
    ).then(function (res) {
      if (!res.ok) throw new Error("kintone file " + res.status);
      return res.blob();
    });
  }

  function uploadFlyerToWordpress(blob, filename) {
    return kintone.proxy
      .upload(
        WP_MEDIA_URL,
        "POST",
        {
          Authorization: wpBasicAuth(),
          "Content-Type": blob.type || "application/pdf",
          "Content-Disposition": 'attachment; filename="' + filename + '"',
        },
        {
          format: "RAW",
          value: blob,
        },
      )
      .then(function (resp) {
        var body = resp[0];
        var status = resp[1];
        var parsed;
        try {
          parsed = JSON.parse(body);
        } catch (err) {
          throw new Error("WordPress応答が不正です");
        }
        if (status < 200 || status >= 300) {
          throw new Error(
            (parsed && parsed.message) || "WordPress HTTP " + status,
          );
        }
        var url =
          parsed.source_url || (parsed.guid && parsed.guid.rendered) || "";
        if (!url) throw new Error("WordPressがURLを返しませんでした");
        return url;
      });
  }

  function syncFlyerToWordpress(recordId) {
    return kintone
      .api(kintone.api.url("/k/v1/record", true), "GET", {
        app: kintone.app.getId(),
        id: recordId,
      })
      .then(function (resp) {
        var record = resp.record || {};
        var files = flyerFiles(record);
        if (!files.length) return null;
        var file = files[0];
        var synced = fieldValue(record, "flyer_synced_filekey");
        if (file.fileKey && file.fileKey === synced) return null;
        if (!isPdfFile(file)) {
          alert("チラシファイルはPDFを1つ添付してください。");
          return null;
        }
        if (!wpCredentialsReady()) {
          alert(
            "チラシをWordPressへ送るには、カスタマイズJSの WP_USER と WP_APP_PASSWORD を設定してください。",
          );
          return null;
        }
        return fetchKintoneBlob(file.fileKey)
          .then(function (blob) {
            return uploadFlyerToWordpress(
              blob,
              asciiPdfFilename(file.name, recordId),
            );
          })
          .then(function (url) {
            return kintone
              .api(kintone.api.url("/k/v1/record", true), "PUT", {
                app: kintone.app.getId(),
                id: recordId,
                record: {
                  flyer_url: { value: url },
                  flyer_synced_filekey: { value: file.fileKey },
                },
              })
              .then(function () {
                return url;
              });
          });
      });
  }

  function hideInternalFields(event) {
    function hide(attempt) {
      try {
        kintone.app.record.setFieldShown("flyer_synced_filekey", false);
      } catch (err) {}
      if (attempt < 20)
        setTimeout(function () {
          hide(attempt + 1);
        }, 50);
    }
    hide(0);
    return event;
  }

  function bindKintone() {
    kintone.events.on("app.record.index.show", function (event) {
      placeIndexButton(event);
      return event;
    });
    kintone.events.on("app.record.detail.show", function (event) {
      hideInternalFields(event);
      placeDetailButton(0);
      return event;
    });
    kintone.events.on(
      ["app.record.create.show", "app.record.edit.show"],
      hideInternalFields,
    );
    kintone.events.on(
      ["app.record.create.submit.success", "app.record.edit.submit.success"],
      function (event) {
        var recordId = event.recordId;
        if (!recordId) return event;
        syncFlyerToWordpress(recordId)
          .then(function (url) {
            if (url) location.reload();
          })
          .catch(function (err) {
            alert(
              "チラシのWordPress送信に失敗しました: " + (err.message || err),
            );
          });
        return event;
      },
    );
  }

  var api = {
    generateFromRecords: generateFromRecords,
    showPreview: showPreview,
    copyHtml: copyHtml,
    classifyEvents: classifyEvents,
    normalizeRecord: normalizeRecord,
  };

  root.CcxExhibition = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof kintone !== "undefined") bindKintone();
})(typeof window !== "undefined" ? window : globalThis);
