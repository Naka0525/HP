# -*- coding: utf-8 -*-
"""Remove <picture>/<source> so unpublished WebP URLs do not 404."""
import re
from pathlib import Path

HTML = Path(r"c:\Users\ccom2\開発環境\1.X 【最新】Webサイト\HP\kintone車両台帳\vehicleledger.html")
text = HTML.read_text(encoding="utf-8")

# Keep a comment listing the WebP mapping for after upload.
note = """  - 機能画面の WebP は kintone車両台帳/image/ に生成済み。メディアへ上げたあと
    <picture><source type="image/webp" srcset="...webp"> を足す
"""
if "機能画面の WebP は kintone車両台帳/image/ をメディアへアップロードしてから公開する" in text:
    text = text.replace(
        "  - 機能画面の WebP は kintone車両台帳/image/ をメディアへアップロードしてから公開する\n",
        note,
    )

text, n = re.subn(
    r"<picture>\s*<source type=\"image/webp\" srcset=\"[^\"]+\" />\s*(<img[\s\S]*?/>)\s*</picture>",
    r"\1",
    text,
)
print("unwrapped picture", n)
HTML.write_text(text, encoding="utf-8")
