# -*- coding: utf-8 -*-
from pathlib import Path

folder = Path(r"c:\Users\ccom2\開発環境\1.X 【最新】Webサイト\HP\kintone車両台帳")
src = (folder / "vehicleledger.html").read_text(encoding="utf-8")
wrap = """<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<title>H1 preview</title>
<style>
  h1.c-pageTitle[data-style="b_bottom"] {
    font-size: 24px;
    border-bottom: 2px solid #c8c4bc;
    padding: 14px 18px;
    margin: 0 0 12px;
  }
</style>
</head>
<body>
<div id="content">
<main id="main_content">
<div class="l-mainContent__inner">
<h1 class="c-pageTitle" data-style="b_bottom">車両台帳パッケージ for kintone｜kintoneでつくる車両管理システム</h1>
"""
(folder / "_h1-preview.html").write_text(
    wrap + src + "</div></main></div></body></html>", encoding="utf-8"
)
print("wrote preview")
