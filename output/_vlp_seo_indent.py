# -*- coding: utf-8 -*-
import re
from pathlib import Path

HTML = Path(r"c:\Users\ccom2\開発環境\1.X 【最新】Webサイト\HP\kintone車両台帳\vehicleledger.html")
text = HTML.read_text(encoding="utf-8")

block_re = re.compile(
    r'(<figure class="vlp-menushot(?: vlp-menushot--mobile)?">)\s*'
    r'<a\s+class="vlp-lightbox-trigger"\s+'
    r'href="([^"]+)"\s+'
    r'aria-label="画像を拡大表示">\s*'
    r"<picture>\s*"
    r'<source type="image/webp" srcset="([^"]+)" />\s*'
    r"<img\s+"
    r'class="skip-lazy"\s+'
    r'src="([^"]+)"\s+'
    r'data-full="([^"]+)"\s+'
    r'width="([^"]+)"\s+'
    r'height="([^"]+)"\s+'
    r'loading="lazy"\s+'
    r'decoding="async"\s+'
    r'alt="([^"]+)" />\s*'
    r"</picture>\s*"
    r"</a>\s*"
    r'(<div class="vlp-menushot__caption">[\s\S]*?</div>)\s*'
    r"</figure>",
    re.M,
)


def fmt(m):
    fig, href, webp, src, full, w, h, alt, cap = m.groups()
    cap = re.sub(r"\s+", " ", cap.strip())
    return (
        f"{fig}\n"
        f'            <a\n'
        f'              class="vlp-lightbox-trigger"\n'
        f'              href="{href}"\n'
        f'              aria-label="画像を拡大表示">\n'
        f"              <picture>\n"
        f'                <source type="image/webp" srcset="{webp}" />\n'
        f"                <img\n"
        f'                  class="skip-lazy"\n'
        f'                  src="{src}"\n'
        f'                  data-full="{full}"\n'
        f'                  width="{w}"\n'
        f'                  height="{h}"\n'
        f'                  loading="lazy"\n'
        f'                  decoding="async"\n'
        f'                  alt="{alt}" />\n'
        f"              </picture>\n"
        f"            </a>\n"
        f"            {cap}\n"
        f"          </figure>"
    )


text, n = block_re.subn(fmt, text)
print("reformatted figures", n)

hero_re = re.compile(
    r'(<figure class="vlp-hero__shot">)\s*'
    r"<picture>\s*"
    r'<source type="image/webp" srcset="([^"]+)" />\s*'
    r"<img\s+"
    r'class="skip-lazy"\s+'
    r'src="([^"]+)"\s+'
    r'width="([^"]+)"\s+'
    r'height="([^"]+)"\s+'
    r'loading="eager"\s+'
    r'fetchpriority="high"\s+'
    r'decoding="async"\s+'
    r'alt="([^"]+)" />\s*'
    r"</picture>\s*"
    r"(<small>[\s\S]*?</small>)\s*"
    r"</figure>",
    re.M,
)


def fmt_hero(m):
    fig, webp, src, w, h, alt, small = m.groups()
    return (
        f"{fig}\n"
        f"          <picture>\n"
        f'            <source type="image/webp" srcset="{webp}" />\n'
        f"            <img\n"
        f'              class="skip-lazy"\n'
        f'              src="{src}"\n'
        f'              width="{w}"\n'
        f'              height="{h}"\n'
        f'              loading="eager"\n'
        f'              fetchpriority="high"\n'
        f'              decoding="async"\n'
        f'              alt="{alt}" />\n'
        f"          </picture>\n"
        f"          {small.strip()}\n"
        f"        </figure>"
    )


text, n_hero = hero_re.subn(fmt_hero, text)
print("reformatted hero", n_hero)

HTML.write_text(text, encoding="utf-8")
