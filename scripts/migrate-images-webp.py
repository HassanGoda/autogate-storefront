"""Run from repository root with Python 3 and Pillow. Review git diff before committing."""
from pathlib import Path
from PIL import Image
import re
root = Path("public")
mapping = {}
for p in sorted(root.rglob("*")):
    if not p.is_file() or p.suffix.lower() not in {".png", ".jpg", ".jpeg", ".avif"}:
        continue
    target = p.with_suffix(".webp")
    if target.exists():
        print("SKIP collision:", p)
        continue
    try:
        with Image.open(p) as im:
            if getattr(im, "n_frames", 1) != 1:
                print("SKIP animated:", p)
                continue
            im = im.convert("RGBA" if "A" in im.getbands() or "transparency" in im.info else "RGB")
            im.save(target, "WEBP", quality=88, method=6)
            with Image.open(target) as check:
                assert check.size == im.size
                check.verify()
        mapping["/" + p.relative_to(root).as_posix()] = "/" + target.relative_to(root).as_posix()
    except Exception as e:
        target.unlink(missing_ok=True)
        print("SKIP:", p, e)
for folder in (Path("src"), root):
    for p in folder.rglob("*"):
        if not p.is_file() or p.suffix.lower() not in {".ts", ".tsx", ".js", ".jsx", ".json", ".css", ".scss", ".html"}:
            continue
        s = p.read_text(encoding="utf-8")
        updated = s
        for old, new in mapping.items():
            updated = updated.replace(old, new)
        if updated != s:
            p.write_text(updated, encoding="utf-8")
# Keep original images until dynamic references and production build are verified.
print("Converted:", len(mapping), "Originals retained for compatibility.")
