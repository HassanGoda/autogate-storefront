import json
import os
import shutil

base_dir = r"C:\AutoGate\autogate-platform\autogate-storefront\Sources"

# 1. تحديث مفاتيح الفرز والتصفية والكتالوج في public/i18n/ar.json
ar_path = os.path.join(base_dir, "public", "i18n", "ar.json")
ar_data = json.load(open(ar_path, "r", encoding="utf-8"))

catalog_ar_keys = {
    "TEXT_SORT": "الترتيب",
    "TEXT_SORT_BY": "الترتيب حسب",
    "INPUT_SORT_LABEL": "الترتيب حسب",
    "INPUT_LIMIT_LABEL": "عرض",
    "TEXT_SHOW": "عرض",
    "INPUT_SHOW_LABEL": "عرض",
    "TEXT_FILTER_CATEGORY": "الفئات",
    "TEXT_FILTER_VEHICLE": "المركبة",
    "TEXT_FILTER_VEHICLE_DESCRIPTION": "اختر مركبتك لتصفية القطع المتوافقة بدقة مع سيارتك.",
    "TEXT_FILTER_PRICE": "السعر",
    "TEXT_FILTER_BRAND": "العلامة التجارية",
    "TEXT_FILTER_DISCOUNT": "الخصومات",
    "TEXT_FILTER_RATING": "التقييم",
    "TEXT_FILTER_COLOR": "اللون",
    "TEXT_DISCOUNT_ANY": "الكل",
    "TEXT_DISCOUNT_YES": "يوجد خصم",
    "TEXT_DISCOUNT_NO": "بدون خصم",
    "OPTION_SORT_DEFAULT": "الافتراضي",
    "OPTION_SORT_NAME_ASC": "الاسم: أ إلى ي",
    "OPTION_SORT_NAME_DESC": "الاسم: ي إلى أ",
}

ar_data.update(catalog_ar_keys)
with open(ar_path, "w", encoding="utf-8") as f:
    json.dump(ar_data, f, ensure_ascii=False, indent=2)
print("[1/3] Updated catalog & filter keys in ar.json")

# 2. تعريب المنتجات الظاهرة في الكتالوج داخل src/fake-server/database/products.ts
products_path = os.path.join(base_dir, "src", "fake-server", "database", "products.ts")
if not os.path.exists(products_path + ".bak"):
    shutil.copy2(products_path, products_path + ".bak")

prod_content = open(products_path, "r", encoding="utf-8").read()
prod_map = {
    "Glossy Gray 19' Aluminium Wheel AR-19": "جنط ألمنيوم رمادي لامع مقاس 19 AR-19",
    "Left Headlight Of Brandix Z54": "مصباح أمامي يسار برانديكس Z54",
    "Right Headlight Of Brandix Z54": "مصباح أمامي يمين برانديكس Z54",
    "Brandix Brake Kit BDX-750/370-S": "طقم مكابح برانديكس BDX-750/370-S",
    "Brandix Spark Plug Kit ASR-400": "طقم بواجي برانديكس ASR-400",
    "Twin Exhaust Pipe From Brandix Z54": "ماسورة عادم مزدوجة برانديكس Z54",
    "Brandix Engine Block Z4": "كتلة محرك برانديكس Z4",
    "Brandix Manual Five Speed Gearbox": "قير عادي 5 سرعات برانديكس",
    "Brandix Clutch Discs Z175": "أقراص كلتش برانديكس Z175",
    "Set of Car Floor Mats Brandix Z4": "طقم فرشات أرضية للسيارة برانديكس Z4",
    "Set of Four 19 Inch Spiked Tires": "طقم 4 إطارات مقاس 19 إنش",
    "Taillights Brandix Z54": "إضاءة خلفية برانديكس Z54",
    "Wiper Blades Brandix WL2": "مساحات زجاج برانديكس WL2",
    "Motor Oil Level 5": "زيت محرك تخليقي فئة 5",
    "Brandix Driver's seat": "مقعد سائق برانديكس",
    "Side Rearview Mirror": "مرآة جانبية للرؤية الخلفية",
    "Brandix Car Door Lock": "قفل باب سيارة برانديكس",
    "Megawatt Low Beam Lamp 40": "لمبة إضاءة منخفضة ميغاوات 40",
}

c_prod = 0
for old, new in prod_map.items():
    if old in prod_content:
        c_prod += prod_content.count(old)
        prod_content = prod_content.replace(old, new)

with open(products_path, "w", encoding="utf-8") as f:
    f.write(prod_content)
print(f"[2/3] Updated products.ts ({c_prod} replacements)")

# 3. تعريب Turn Signals وبقية الفئات في categories.ts
cat_path = os.path.join(base_dir, "src", "fake-server", "database", "categories.ts")
if not os.path.exists(cat_path + ".bak"):
    shutil.copy2(cat_path, cat_path + ".bak")

cat_content = open(cat_path, "r", encoding="utf-8").read()
cat_map = {
    "name: 'Turn Signals'": "name: 'إشارات الانعطاف'",
    "name: 'Headlights'": "name: 'المصابيح الأمامية'",
    "name: 'Tail Lights'": "name: 'المصابيح الخلفية'",
    "name: 'Fog Lights'": "name: 'كشافات الضباب'",
    "name: 'Brake Discs'": "name: 'أقراص المكابح (الهوبات)'",
    "name: 'Exhaust'": "name: 'نظام العادم'",
}

c_cat = 0
for old, new in cat_map.items():
    if old in cat_content:
        c_cat += cat_content.count(old)
        cat_content = cat_content.replace(old, new)

with open(cat_path, "w", encoding="utf-8") as f:
    f.write(cat_content)
print(f"[3/3] Updated categories.ts ({c_cat} replacements)")

print("\nDONE! Refresh catalog page with Ctrl+F5.")