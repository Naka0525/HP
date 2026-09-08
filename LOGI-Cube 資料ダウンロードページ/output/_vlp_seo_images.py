# -*- coding: utf-8 -*-
import re
import urllib.request
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    raise SystemExit("Pillow is required")

ROOT = Path(r"c:\Users\ccom2\開発環境\1.X 【最新】Webサイト\HP")
HTML = ROOT / "kintone車両台帳" / "vehicleledger.html"
OUT_DIR = ROOT / "kintone車両台帳" / "image"
OUT_DIR.mkdir(parents=True, exist_ok=True)

IMAGES = [
    {
        "old": "https://commoncom.jp/wp/wp-content/uploads/2026/08/hero-vehicle-ledger.jpg",
        "stem": "hero-vehicle-ledger",
        "alt": "kintoneでつくる車両管理システムの画面イメージ。車両台帳・点検アラート・カレンダーを一つの画面で表示",
        "eager": True,
    },
    {
        "old": "https://commoncom.jp/wp/wp-content/uploads/2026/03/daichou2-1024x517.png",
        "stem": "vehicle-ledger-list",
        "alt": "kintone車両台帳パッケージの車両情報入力画面",
    },
    {
        "old": "https://commoncom.jp/wp/wp-content/uploads/2026/08/excel-input.png",
        "stem": "vehicle-ledger-excel",
        "alt": "kintone車両台帳パッケージのExcel風入力画面",
    },
    {
        "old": "https://commoncom.jp/wp/wp-content/uploads/2026/08/8d735d314cb8507c930c742ed5f7e00f.png",
        "stem": "vehicle-ledger-filter",
        "alt": "kintone車両台帳パッケージのクリック絞り込み画面",
    },
    {
        "old": "https://commoncom.jp/wp/wp-content/uploads/2026/03/daichou3.png",
        "stem": "vehicle-ledger-report",
        "alt": "kintone車両台帳パッケージの帳票出力画面",
    },
    {
        "old": "https://commoncom.jp/wp/wp-content/uploads/2026/03/fba58fcb5b27c8ebaac5355e94ad77a3-1024x457.png",
        "stem": "vehicle-ledger-alert",
        "alt": "kintone車両台帳パッケージの期限アラート設定画面",
    },
    {
        "old": "https://commoncom.jp/wp/wp-content/uploads/2026/03/daichou6-1024x422.png",
        "stem": "vehicle-ledger-accident",
        "alt": "kintone車両台帳パッケージの事故情報入力画面",
    },
    {
        "old": "https://commoncom.jp/wp/wp-content/uploads/2026/03/daichou5-1024x527.png",
        "stem": "vehicle-ledger-maintenance",
        "alt": "kintone車両台帳パッケージの整備情報入力画面",
    },
    {
        "old": "https://commoncom.jp/wp/wp-content/uploads/2026/08/b70b933f36afd584eb7768ccf19fbdbb.png",
        "stem": "vehicle-ledger-annual-plan",
        "alt": "kintone車両台帳パッケージの車両整備年間計画表",
    },
    {
        "old": "https://commoncom.jp/wp/wp-content/uploads/2026/08/b4529dfc4a949e0cb60467233c25487c.png",
        "stem": "vehicle-ledger-calendar",
        "alt": "kintone車両台帳パッケージの車両整備カレンダー",
    },
    {
        "old": "https://commoncom.jp/wp/wp-content/uploads/2026/03/e5e6e43a9960fbc2ddbc11dc94107647.png",
        "stem": "vehicle-ledger-daily-check-mobile",
        "alt": "kintone車両台帳パッケージのスマートフォン日常点検入力画面",
    },
    {
        "old": "https://commoncom.jp/wp/wp-content/uploads/2026/05/bcebd384fa9480e78d65f8cf80bca0c2.png",
        "stem": "vehicle-ledger-daily-check-sheet",
        "alt": "kintone車両台帳パッケージの日常点検表",
    },
    {
        "old": "https://commoncom.jp/wp/wp-content/uploads/2026/08/6f728f1569d8579f25c53f30cb0945f6.png",
        "stem": "vehicle-ledger-parts",
        "alt": "kintone車両台帳パッケージの車両装備部品管理画面",
    },
    {
        "old": "https://commoncom.jp/wp/wp-content/uploads/2026/08/0686972609cb1505621c979f7c106f18.png",
        "stem": "vehicle-ledger-parts-report",
        "alt": "kintone車両台帳パッケージの車両別部品管理帳票",
    },
]

WP_DIR = "https://commoncom.jp/wp/wp-content/uploads/2026/09/"


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as res:
        return res.read()


def convert():
    report = []
    for item in IMAGES:
        raw = fetch(item["old"])
        src_name = item["old"].rsplit("/", 1)[-1]
        src_path = OUT_DIR / src_name
        src_path.write_bytes(raw)
        img = Image.open(src_path)
        if img.mode in ("P", "RGBA"):
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")
        webp_path = OUT_DIR / (item["stem"] + ".webp")
        img.save(webp_path, "WEBP", quality=78, method=6)
        item["webp"] = WP_DIR + item["stem"] + ".webp"
        item["old_size"] = len(raw)
        item["new_size"] = webp_path.stat().st_size
        report.append(
            f"{item['stem']}.webp\t{item['old_size']}\t{item['new_size']}\t{round(item['new_size']/item['old_size']*100)}%"
        )
    (ROOT / "output" / "_vlp_webp_sizes.txt").write_text(
        "\n".join(report), encoding="utf-8"
    )
    print("\n".join(report))


if __name__ == "__main__":
    convert()
