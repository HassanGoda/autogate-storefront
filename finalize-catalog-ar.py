import json
import os
import shutil

base_dir = r"C:\AutoGate\autogate-platform\autogate-storefront\Sources"

# 1. إضافة مفاتيح وصف المركبة والفرز في public/i18n/ar.json
en_path = os.path.join(base_dir, "public", "i18n", "en.json")
ar_path = os.path.join(base_dir, "public", "i18n", "ar.json")

en_data = json.load(open(en_path, "r", encoding="utf-8"))
ar_data = json.load(open(ar_path, "r", encoding="utf-8"))

extra_ar = {
    "TEXT_VEHICLE_FILTER_HELP": "اختر مركبتك لتصفية القطع المتوافقة بدقة فقط.",
    "INPUT_ONLY_EXACT_FIT_PARTS_LABEL": "القطع المتوافقة مع المركبة فقط",
    "INPUT_SORT_PLACEHOLDER": "الترتيب",
    "INPUT_SORT_DEFAULT": "الافتراضي",
    "INPUT_SORT_NAME_ASC": "الاسم (أ - ي)",
    "INPUT_SORT_NAME_DESC": "الاسم (ي - أ)",
}

# تعريب أي مفاتيح إنجليزية متعلقة بالترتيب أو العرض من en.json تلقائياً
for k, v in en_data.items():
    if "SORT" in k or "DEFAULT" in k:
        if v == "Default":
            ar_data[k] = "الافتراضي"
        elif "A-Z" in v:
            ar_data[k] = "الاسم (أ - ي)"
        elif "Z-A" in v:
            ar_data[k] = "الاسم (ي - أ)"

ar_data.update(extra_ar)
with open(ar_path, "w", encoding="utf-8") as f:
    json.dump(ar_data, f, ensure_ascii=False, indent=2)
print("[1/2] Updated TEXT_VEHICLE_FILTER_HELP and sort keys in ar.json")

# 2. تعريب اسمي المنتجين المتبقيين في products.ts
products_path = os.path.join(base_dir, "src", "fake-server", "database", "products.ts")
if not os.path.exists(products_path + ".bak"):
    shutil.copy2(products_path, products_path + ".bak")

prod_content = open(products_path, "r", encoding="utf-8").read()
remaining_prods = {
    "Glossy Gray 19' Aluminium Wheel AR-19": "جنط ألمنيوم رمادي لامع مقاس 19 AR-19",
    "Brandix Brake Kit BDX-750/370-S": "طقم مكابح برانديكس BDX-750/370-S",
}
cnt = 0
for old, new in remaining_prods.items():
    if old in prod_content:
        cnt += prod_content.count(old)
        prod_content = prod_content.replace(old, new)

with open(products_path, "w", encoding="utf-8") as f:
    f.write(prod_content)
print(f"[2/2] Updated remaining product names in products.ts ({cnt} replacements)")
print("\nDONE! Refresh browser with Ctrl+F5.")