import os
import shutil

base_dir = r"C:\AutoGate\autogate-platform\autogate-storefront\Sources"

targets = [
    "src/data/blogPosts.ts",
    "src/fake-server/database/posts.ts",
    "src/pages/demo/home-two.tsx",
    "src/pages/index.tsx",
]

for rel in targets:
    full_path = os.path.join(base_dir, rel.replace("/", os.sep))
    if not os.path.exists(full_path):
        print("Not found:", rel)
        continue
    bak = full_path + ".bak"
    if not os.path.exists(bak):
        shutil.copy2(full_path, bak)
    content = open(full_path, "r", encoding="utf-8").read()
    count = content.count("'Special Offers'") + content.count('"Special Offers"')
    content = content.replace("'Special Offers'", "'العروض الخاصة'").replace('"Special Offers"', '"العروض الخاصة"')
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {rel} ({count} replacements)")

print("\nDONE! Refresh browser with Ctrl+F5.")