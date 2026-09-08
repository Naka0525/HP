# -*- coding: utf-8 -*-
from pathlib import Path

folder = Path(r"c:\Users\ccom2\開発環境\1.X 【最新】Webサイト\HP\トップページ")
src = (folder / "top.html").read_text(encoding="utf-8")
tail = "</div></body></html>"

home = """<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<title>H1 preview - home</title>
<style>
  body { margin: 0; font-family: sans-serif; }
  .c-headLogo { margin: 0; padding: 12px 18px; font-size: 18px; }
  .l-mainContent__inner { padding: 0; }
</style>
</head>
<body>
<header>
<h1 class="c-headLogo -img"><a href="/">LOGI-Cube</a></h1>
</header>
<div class="l-mainContent__inner">
"""

page = """<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<title>H1 preview - pageTitle</title>
<style>
  body { margin: 0; font-family: sans-serif; }
  .l-mainContent__inner { padding: 16px; }
  h1.c-pageTitle[data-style="b_bottom"] {
    font-size: 24px;
    border-bottom: 2px solid #c8c4bc;
    padding: 14px 18px;
    margin: 0 0 12px;
  }
</style>
</head>
<body>
<div class="l-mainContent__inner">
<h1 class="c-pageTitle" data-style="b_bottom">運送・倉庫システムといえばクラウド対応「LOGI-Cube」</h1>
"""

(folder / "_h1-preview-home.html").write_text(home + src + tail, encoding="utf-8")
(folder / "_h1-preview.html").write_text(page + src + tail, encoding="utf-8")
print("wrote previews")
