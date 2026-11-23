import os
import shutil

base_dir = r"C:\AutoGate\autogate-platform\autogate-storefront\Sources"

def backup_and_replace(rel_path, replacements):
    full_path = os.path.join(base_dir, rel_path.replace("/", os.sep))
    if not os.path.exists(full_path):
        print("Not found:", rel_path)
        return
    bak = full_path + ".bak"
    if not os.path.exists(bak):
        shutil.copy2(full_path, bak)
    content = open(full_path, "r", encoding="utf-8").read()
    total = 0
    for old, new in replacements.items():
        if old in content:
            total += content.count(old)
            content = content.replace(old, new)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {rel_path} ({total} replacements)")

# 1. خيارات فلتر الخصم في radio-filter-builder.ts
backup_and_replace("src/fake-server/filters/radio-filter-builder.ts", {
    "{ slug: 'any', name: 'Any', count: 0 }": "{ slug: 'any', name: 'الكل', count: 0 }",
    "{ slug: 'yes', name: 'Yes', count: 0 }": "{ slug: 'yes', name: 'يوجد خصم', count: 0 }",
    "{ slug: 'no', name: 'No', count: 0 }": "{ slug: 'no', name: 'بدون خصم', count: 0 }",
})

# 2. تعريب أسماء الفلاتر في endpoints و filters
filter_name_map = {
    "'Categories'": "'الفئات'",
    "'Vehicle'": "'المركبة'",
    "'Price'": "'السعر'",
    "'Brand'": "'العلامة التجارية'",
    "'With Discount'": "'الخصومات'",
    "'Rating'": "'التقييم'",
    "'Color'": "'اللون'",
    '"Categories"': '"الفئات"',
    '"Vehicle"': '"المركبة"',
    '"Price"': '"السعر"',
    '"Brand"': '"العلامة التجارية"',
    '"With Discount"': '"الخصومات"',
    '"Rating"': '"التقييم"',
}

for sub in ["src/fake-server/endpoints", "src/fake-server/filters"]:
    folder = os.path.join(base_dir, sub.replace("/", os.sep))
    if os.path.exists(folder):
        for fn in sorted(os.listdir(folder)):
            if fn.endswith(".ts"):
                backup_and_replace(f"{sub}/{fn}", filter_name_map)

# 3. تعريب المنتجات المتبقية في products.ts
backup_and_replace("src/fake-server/database/products.ts", {
    "Glossy Gray 19' Aluminium Wheel AR-19": "جنط ألمنيوم رمادي لامع مقاس 19 AR-19",
    "Brandix Brake Kit BDX-750/370-S": "طقم مكابح برانديكس BDX-750/370-S",
})

print("\nDONE! Refresh browser with Ctrl+F5.")