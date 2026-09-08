# -*- coding: utf-8 -*-
from pathlib import Path

root = Path(r"c:\Users\ccom2\開発環境\1.X 【最新】Webサイト\HP")

pages = [
    {
        "folder": root / "kintone運転者台帳",
        "src": "driverledger.html",
        "title": "運転者台帳パッケージ for kintone",
    },
    {
        "folder": root / "ネットワーク・セキュリティ対策",
        "src": "network.html",
        "title": "ネットワーク・セキュリティ対策",
    },
    {
        "folder": root / "AWS",
        "src": "aws.html",
        "title": "AWS導入支援サービス",
    },
]

wrap_head = """<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<title>H1 preview — {title}</title>
<style>
  body {{ margin: 0; font-family: sans-serif; }}
  .l-mainContent__inner {{ padding: 16px; }}
  h1.c-pageTitle[data-style="b_bottom"] {{
    font-size: 24px;
    border-bottom: 2px solid #c8c4bc;
    padding: 14px 18px;
    margin: 0 0 12px;
  }}
</style>
</head>
<body>
<div id="content">
<main id="main_content">
<div class="l-mainContent__inner">
<h1 class="c-pageTitle" data-style="b_bottom">{title}</h1>
"""

wrap_tail = "</div></main></div></body></html>"

for page in pages:
    src = (page["folder"] / page["src"]).read_text(encoding="utf-8")
    html = wrap_head.format(title=page["title"]) + src + wrap_tail
    out = page["folder"] / "_h1-preview.html"
    out.write_text(html, encoding="utf-8")
    print("wrote", out)
