import os
import shutil

base_dir = r"C:\AutoGate\autogate-platform\autogate-storefront\Sources"

brand_map = {
    "Brandix": "برانديكس (Brandix)",
    "RedGate": "ريد جيت (RedGate)",
    "Sunset": "صن ست (Sunset)",
    "No Name": "بدون علامة (No Name)",
    "TurboElectric": "تيربو إلكتريك (TurboElectric)",
    "Specter": "سبيكتر (Specter)",
}

for rel in ["src/fake-server/database/brands.ts", "src/fake-server/database/products.ts"]:
    full_path = os.path.join(base_dir, rel.replace("/", os.sep))
    if not os.path.exists(full_path):
        continue
    bak = full_path + ".bak"
    if not os.path.exists(bak):
        shutil.copy2(full_path, bak)
    content = open(full_path, "r", encoding="utf-8").read()
    count = 0
    for old, new in brand_map.items():
        # استبدال داخل السلاسل النصية فقط لتفادي لمس أسماء المتغيرات أو الكلاسات
        for q in ("'", '"'):
            target = f"{q}{old}{q}"
            replacement = f"{q}{new}{q}"
            if target in content:
                count += content.count(target)
                content = content.replace(target, replacement)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {rel} ({count} replacements)")

print("\nDONE! Refresh browser with Ctrl+F5.")