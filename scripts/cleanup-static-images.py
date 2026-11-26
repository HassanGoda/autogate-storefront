from pathlib import Path
from PIL import Image, ImageOps
import subprocess
root = Path("public")
extensions = {".jpg",".jpeg",".png",".avif",".bmp",".tif",".tiff",".gif"}
files = [Path(x) for x in subprocess.check_output(["git","ls-files","-z"]).decode().split("\0") if x]
texts = {}
for p in files:
    if p.is_file() and p.suffix.lower() in {".ts",".tsx",".js",".jsx",".json",".css",".scss",".sass",".html",".md",".mjs",".cjs",".svg",".yml",".yaml"} and p != Path(__file__):
        texts[p] = p.read_text(encoding="utf-8")
removed = []
blocked = []
for p in sorted(root.rglob("*")):
    if not p.is_file() or p.suffix.lower() not in extensions:
        continue
    if p.stat().st_size == 0:
        if any(p.name in t for t in texts.values()):
            blocked.append(str(p)); continue
        p.unlink()
        removed.append(str(p))
        continue
    try:
        with Image.open(p) as im:
            if getattr(im,"n_frames",1) > 1:
                continue
            im = im.convert("RGBA" if "A" in im.getbands() or "transparency" in im.info else "RGB")
            target = p.with_suffix(".webp")
            # Never overwrite an existing potentially unrelated asset.
            if target.exists():
                from io import BytesIO
                buf = BytesIO()
                im.save(buf,"WEBP",quality=88,method=6)
                buf.seek(0)
                with Image.open(buf) as expected, Image.open(target) as actual:
                    same = expected.size == actual.size and expected.convert("RGBA").tobytes() == actual.convert("RGBA").tobytes()
                if not same:
                    target = p.with_name(p.stem + "-source-" + p.suffix[1:].lower() + ".webp")
                    if not target.exists():
                        im.save(target,"WEBP",lossless=True)
                    with Image.open(target) as actual:
                        if actual.size != im.size or actual.convert("RGBA").tobytes() != im.convert("RGBA").tobytes():
                            blocked.append(str(p)); continue
            else:
                im.save(target,"WEBP",lossless=True)
            old = p.relative_to(root).as_posix()
            new = target.relative_to(root).as_posix()
            proposed = {f:s.replace(old,new) for f,s in texts.items()}
            if any(p.name in s for s in proposed.values()):
                blocked.append(str(p)); continue
            # Retain originals where generated or indirect paths cannot be ruled out.
            if not any(old in s for s in texts.values()):
                blocked.append(str(p) + " (no explicit path; review dynamic references)")
                continue
            texts = proposed
        p.unlink()
        removed.append(str(p))
    except Exception as e:
        blocked.append(f"{p}: {e}")
for p,s in texts.items():
    if p.read_text(encoding="utf-8") != s:
        p.write_text(s,encoding="utf-8")
print("Removed:",len(removed))
print("Retained for manual review:",blocked)
