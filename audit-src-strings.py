import os
import re

src_dir = r"C:\AutoGate\autogate-platform\autogate-storefront\Sources\src"
out_file = r"C:\AutoGate\autogate-platform\autogate-storefront\Sources\src-english-audit.txt"

pattern = re.compile(r"""(['"])((?:\\.|(?!\1).){3,120})\1""")
skip_prefixes = ("http", "/", "~/", "./", "../", "data:", "image/", "text/", "application/")
skip_exact = {"true", "false", "null", "undefined", "text", "email", "password", "number", "button", "submit"}

found = []

for root, _, files in os.walk(src_dir):
    for fn in sorted(files):
        if not fn.endswith((".ts", ".tsx")):
            continue
        path = os.path.join(root, fn)
        rel = os.path.relpath(path, src_dir)
        try:
            lines = open(path, "r", encoding="utf-8").read().splitlines()
        except Exception:
            continue

        for idx, line in enumerate(lines, start=1):
            stripped = line.strip()
            if stripped.startswith(("import ", "export ", "//", "/*", "*")):
                continue
            for m in pattern.finditer(line):
                val = m.group(2).strip()
                if not re.search(r"[A-Za-z]{3,}", val):
                    continue
                if re.search(r"[\u0600-\u06FF]", val):
                    continue
                if val.lower() in skip_exact or val.startswith(skip_prefixes):
                    continue
                # استبعاد المفاتيح الكبيرة مثل HEADER_ أو BUTTON_ أو TEXT_ أو ERROR_
                if re.fullmatch(r"[A-Z0-9_]{4,}", val):
                    continue
                found.append(f"{rel}:{idx} -> {val}")

with open(out_file, "w", encoding="utf-8") as f:
    f.write("\n".join(found))

print(f"Total candidate strings found: {len(found)}")
print(f"Saved report to: {out_file}")
print("\n--- First 60 items ---")
for item in found[:60]:
    print(item)