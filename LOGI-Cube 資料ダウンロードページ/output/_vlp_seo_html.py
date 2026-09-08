# -*- coding: utf-8 -*-
import re
from pathlib import Path

HTML = Path(r"c:\Users\ccom2\開発環境\1.X 【最新】Webサイト\HP\kintone車両台帳\vehicleledger.html")
text = HTML.read_text(encoding="utf-8")

WP_DIR = "https://commoncom.jp/wp/wp-content/uploads/2026/09/"

IMAGES = {
    "https://commoncom.jp/wp/wp-content/uploads/2026/08/hero-vehicle-ledger.jpg": {
        "stem": "hero-vehicle-ledger",
        "alt": "kintoneでつくる車両管理システムの画面イメージ。車両台帳・点検アラート・カレンダーを一つの画面で表示",
        "eager": True,
    },
    "https://commoncom.jp/wp/wp-content/uploads/2026/03/daichou2-1024x517.png": {
        "stem": "vehicle-ledger-list",
        "alt": "kintone車両台帳パッケージの車両情報入力画面",
    },
    "https://commoncom.jp/wp/wp-content/uploads/2026/08/excel-input.png": {
        "stem": "vehicle-ledger-excel",
        "alt": "kintone車両台帳パッケージのExcel風入力画面",
    },
    "https://commoncom.jp/wp/wp-content/uploads/2026/08/8d735d314cb8507c930c742ed5f7e00f.png": {
        "stem": "vehicle-ledger-filter",
        "alt": "kintone車両台帳パッケージのクリック絞り込み画面",
    },
    "https://commoncom.jp/wp/wp-content/uploads/2026/03/daichou3.png": {
        "stem": "vehicle-ledger-report",
        "alt": "kintone車両台帳パッケージの帳票出力画面",
    },
    "https://commoncom.jp/wp/wp-content/uploads/2026/03/fba58fcb5b27c8ebaac5355e94ad77a3-1024x457.png": {
        "stem": "vehicle-ledger-alert",
        "alt": "kintone車両台帳パッケージの期限アラート設定画面",
    },
    "https://commoncom.jp/wp/wp-content/uploads/2026/03/daichou6-1024x422.png": {
        "stem": "vehicle-ledger-accident",
        "alt": "kintone車両台帳パッケージの事故情報入力画面",
    },
    "https://commoncom.jp/wp/wp-content/uploads/2026/03/daichou5-1024x527.png": {
        "stem": "vehicle-ledger-maintenance",
        "alt": "kintone車両台帳パッケージの整備情報入力画面",
    },
    "https://commoncom.jp/wp/wp-content/uploads/2026/08/b70b933f36afd584eb7768ccf19fbdbb.png": {
        "stem": "vehicle-ledger-annual-plan",
        "alt": "kintone車両台帳パッケージの車両整備年間計画表",
    },
    "https://commoncom.jp/wp/wp-content/uploads/2026/08/b4529dfc4a949e0cb60467233c25487c.png": {
        "stem": "vehicle-ledger-calendar",
        "alt": "kintone車両台帳パッケージの車両整備カレンダー",
    },
    "https://commoncom.jp/wp/wp-content/uploads/2026/03/e5e6e43a9960fbc2ddbc11dc94107647.png": {
        "stem": "vehicle-ledger-daily-check-mobile",
        "alt": "kintone車両台帳パッケージのスマートフォン日常点検入力画面",
    },
    "https://commoncom.jp/wp/wp-content/uploads/2026/05/bcebd384fa9480e78d65f8cf80bca0c2.png": {
        "stem": "vehicle-ledger-daily-check-sheet",
        "alt": "kintone車両台帳パッケージの日常点検表",
    },
    "https://commoncom.jp/wp/wp-content/uploads/2026/08/6f728f1569d8579f25c53f30cb0945f6.png": {
        "stem": "vehicle-ledger-parts",
        "alt": "kintone車両台帳パッケージの車両装備部品管理画面",
    },
    "https://commoncom.jp/wp/wp-content/uploads/2026/08/0686972609cb1505621c979f7c106f18.png": {
        "stem": "vehicle-ledger-parts-report",
        "alt": "kintone車両台帳パッケージの車両別部品管理帳票",
    },
}

# 1) Flatten single-image galleries
gallery_re = re.compile(
    r'<div class="vlp-gallery" data-gallery>\s*'
    r'<div class="vlp-gallery__viewport">\s*'
    r'<div class="vlp-gallery__track">\s*'
    r'<div class="vlp-gallery__slide">\s*'
    r'(<a\s+class="vlp-lightbox-trigger"[\s\S]*?</a>)\s*'
    r"</div>\s*"
    r"</div>\s*"
    r"</div>\s*"
    r'<div class="vlp-gallery__nav">[\s\S]*?</div>\s*'
    r'<div class="vlp-gallery__dots"[^>]*></div>\s*'
    r'<div class="vlp-gallery__count"[^>]*>1 / 1</div>\s*'
    r"</div>",
    re.M,
)
text, n_gal = gallery_re.subn(r"\1", text)
print("flattened galleries", n_gal)

# 2) Remove gallery CSS (keep the hero media queries that sit in the same 640px block)
text = text.replace(
    """  /* ---- Multi image gallery ---- */
  body #vlp-root .vlp-gallery {
    position: relative;
  }

  body #vlp-root .vlp-gallery__viewport {
    overflow: hidden;
    border-radius: 12px 12px 0 0;
  }

  body #vlp-root .vlp-gallery__track {
    display: flex;
    transition: transform 0.35s ease;
    will-change: transform;
  }

  body #vlp-root .vlp-gallery__slide {
    flex: 0 0 100%;
    min-width: 100%;
  }

  body #vlp-root .vlp-gallery__slide > .vlp-lightbox-trigger {
    display: block;
  }

  body #vlp-root .vlp-gallery__slide img {
    width: 100%;
    max-height: 430px;
    object-fit: contain;
    background: #fff;
  }

  body #vlp-root .vlp-menushot--mobile .vlp-gallery__slide img {
    max-height: 420px;
    width: auto;
    margin-inline: auto;
  }

  body #vlp-root .vlp-gallery__nav {
    pointer-events: none;
  }

  body #vlp-root .vlp-gallery__prev,
  body #vlp-root .vlp-gallery__next {
    position: absolute;
    top: calc(50% - 24px);
    z-index: 3;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    color: #fff;
    background: rgba(35, 18, 0, 0.78);
    box-shadow: 0 8px 20px rgba(35, 18, 0, 0.16);
    cursor: pointer;
    pointer-events: auto;
    font-size: 22px;
    line-height: 1;
  }

  body #vlp-root .vlp-gallery__prev:hover,
  body #vlp-root .vlp-gallery__next:hover {
    color: var(--vlp-navy);
    background: var(--vlp-blue);
  }

  body #vlp-root .vlp-gallery__prev {
    left: 12px;
  }

  body #vlp-root .vlp-gallery__next {
    right: 12px;
  }

  body #vlp-root .vlp-gallery__dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 12px 0;
  }

  body #vlp-root .vlp-gallery__dot {
    width: 9px;
    height: 9px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: #d6d5d5;
    cursor: pointer;
  }

  body #vlp-root .vlp-gallery__dot.is-active {
    background: var(--vlp-blue);
    transform: scale(1.12);
  }

  body #vlp-root .vlp-gallery__count {
    margin-top: 8px;
    color: var(--vlp-muted);
    font-size: 12px;
    text-align: center;
  }

  body #vlp-root .vlp-gallery:not(.is-multi) .vlp-gallery__prev,
  body #vlp-root .vlp-gallery:not(.is-multi) .vlp-gallery__next,
  body #vlp-root .vlp-gallery:not(.is-multi) .vlp-gallery__dots,
  body #vlp-root .vlp-gallery:not(.is-multi) .vlp-gallery__count {
    display: none;
  }

""",
    """  body #vlp-root .vlp-hero__shot picture,
  body #vlp-root .vlp-menushot picture {
    display: block;
  }

""",
)

text = text.replace(
    """    body #vlp-root .vlp-gallery__prev,
    body #vlp-root .vlp-gallery__next {
      width: 38px;
      height: 38px;
      top: calc(50% - 20px);
      font-size: 20px;
    }
""",
    "",
)

# 3) Remove gallery JS
gallery_js = """      function initGallery(gallery) {
        var track = gallery.querySelector(".vlp-gallery__track");
        var slides = gallery.querySelectorAll(".vlp-gallery__slide");
        var prev = gallery.querySelector(".vlp-gallery__prev");
        var next = gallery.querySelector(".vlp-gallery__next");
        var dotsWrap = gallery.querySelector(".vlp-gallery__dots");
        var count = gallery.querySelector(".vlp-gallery__count");
        var current = 0;

        if (!track) return;
        if (!slides.length) return;
        if (slides.length < 2) return;

        gallery.classList.add("is-multi");
        if (!dotsWrap) return;

        slides.forEach(function (_, index) {
          var dot = document.createElement("button");
          dot.type = "button";
          dot.className =
            "vlp-gallery__dot" + (index === 0 ? " is-active" : "");
          dot.setAttribute("aria-label", index + 1 + "枚目を表示");
          dot.addEventListener("click", function () {
            goTo(index);
          });
          dotsWrap.appendChild(dot);
        });

        var dots = dotsWrap.querySelectorAll(".vlp-gallery__dot");

        function update() {
          track.style.transform = "translateX(-" + current * 100 + "%)";
          dots.forEach(function (dot, index) {
            dot.classList.toggle("is-active", index === current);
          });
          if (count) {
            count.textContent = current + 1 + " / " + slides.length;
          }
        }

        function goTo(index) {
          current = (index + slides.length) % slides.length;
          update();
        }

        if (prev) {
          prev.addEventListener("click", function () {
            goTo(current - 1);
          });
        }

        if (next) {
          next.addEventListener("click", function () {
            goTo(current + 1);
          });
        }

        update();
      }

      bindLightbox(root);

      var galleries = root.querySelectorAll("[data-gallery]");
      galleries.forEach(initGallery);
"""
if gallery_js not in text:
    raise SystemExit("gallery JS block not found")
text = text.replace(gallery_js, "      bindLightbox(root);\n")

# 4) Hero title + lead
old_title = '<p class="vlp-hero__title">車両台帳パッケージ for&nbsp;kintone</p>'
new_title = (
    '<p class="vlp-hero__title">\n'
    "            車両台帳パッケージ for&nbsp;kintone\n"
    '            <span class="vlp-hero__title-sub">kintoneでつくる車両管理システム</span>\n'
    "          </p>"
)
if old_title not in text:
    raise SystemExit("hero title not found")
text = text.replace(old_title, new_title, 1)

old_lead = """          <p class="vlp-hero__lead">
            車両情報、事故、整備、点検、帳票、アラートまで。車両管理に必要な情報をkintone上で一元化し、更新・検索・共有の手間を削減します。
          </p>"""
new_lead = """          <p class="vlp-hero__lead">
            kintoneで構築する車両管理システムです。車両情報、事故、整備、点検、帳票、アラートまでを一元化し、更新・検索・共有の手間を削減します。
          </p>"""
if old_lead not in text:
    raise SystemExit("hero lead not found")
text = text.replace(old_lead, new_lead, 1)

# 5) Wrap product / hero images
img_re = re.compile(
    r"<img\n"
    r'(\s+)src="([^"]+)"\n'
    r'(?:\s+data-full="[^"]+"\n)?'
    r'(\s+width="[^"]+"\n)'
    r'(\s+height="[^"]+"\n)'
    r'(?:\s+fetchpriority="high"\n)?'
    r'(?:\s+loading="lazy"\n)?'
    r'(\s+decoding="async"\n)'
    r'(\s+alt="[^"]*"\s*/>)',
    re.M,
)


def wrap_img(m):
    indent = m.group(1)
    src = m.group(2)
    info = IMAGES.get(src)
    if not info:
        return m.group(0)
    webp = WP_DIR + info["stem"] + ".webp"
    eager = info.get("eager")
    load_attr = (
        f'{indent}loading="eager"\n{indent}fetchpriority="high"\n'
        if eager
        else f'{indent}loading="lazy"\n'
    )
    data_full = "" if eager else f'{indent}data-full="{src}"\n'
    cls = f'{indent}class="skip-lazy"\n'
    inner = (
        f"<img\n"
        f"{cls}"
        f'{indent}src="{src}"\n'
        f"{data_full}"
        f"{m.group(3)}"
        f"{m.group(4)}"
        f"{load_attr}"
        f"{m.group(5)}"
        f'{indent}alt="{info["alt"]}" />'
    )
    return (
        f"<picture>\n"
        f'{indent}<source type="image/webp" srcset="{webp}" />\n'
        f"{indent}{inner}\n"
        f"{indent[:-2] if indent.endswith('  ') else indent}</picture>"
    )


text, n_img = img_re.subn(wrap_img, text)
print("wrapped images", n_img)

# 6) skip-lazy on logos
text = text.replace(
    'class="vlp-kintone-logo"',
    'class="vlp-kintone-logo skip-lazy"',
    1,
)
text = text.replace(
    'class="vlp-partner-badge"',
    'class="vlp-partner-badge skip-lazy"',
)

# 7) JSON-LD + JS meta description
old_desc = "運送・物流向けの車両台帳パッケージ。kintone上で車両情報、車検、日常点検、整備、帳票、期限アラートを一元管理します。"
new_desc = "運送・物流向けの車両管理システム。kintone上で車両情報、車検、日常点検、整備、帳票、期限アラートを一元管理します。"
text = text.replace(old_desc, new_desc)

old_seo = (
    '"運送・物流向けの車両台帳パッケージ。kintone上で車両情報、車検、日常点検、整備、帳票、期限アラートを一元管理します。無料デモと1か月お試しに対応しています。";'
)
new_seo = (
    '"運送・物流向けの車両管理システム。kintone上で車両情報、車検、日常点検、整備、帳票、期限アラートを一元管理します。無料デモと1か月お試しに対応しています。";'
)
text = text.replace(old_seo, new_seo)

# 8) Rewrite SWELL H1
h1_js = """      upsertMeta("name", "twitter:card", "summary_large_image");
      upsertMeta("name", "twitter:image", seoImage);

      var root = document.getElementById("vlp-root");
"""
h1_js_new = """      upsertMeta("name", "twitter:card", "summary_large_image");
      upsertMeta("name", "twitter:image", seoImage);

      var swellH1 = document.querySelector("h1.c-pageTitle");
      if (swellH1) {
        swellH1.textContent =
          "車両台帳パッケージ for kintone｜kintoneでつくる車両管理システム";
      }

      var root = document.getElementById("vlp-root");
"""
if h1_js not in text:
    raise SystemExit("H1 JS insert point not found")
text = text.replace(h1_js, h1_js_new, 1)

HTML.write_text(text, encoding="utf-8")
print("ok")
print("gallery leftover", text.count("data-gallery"))
print("skip-lazy", text.count("skip-lazy"))
print("picture", text.count("<picture>"))
print("webp", text.count(".webp"))
print("loading eager", text.count('loading="eager"'))
print("initGallery", "function initGallery" in text)
