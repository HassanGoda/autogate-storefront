import os
import shutil

base_dir = r"C:\AutoGate\autogate-platform\autogate-storefront\Sources"

def safe_replace(rel_path, replacements):
    full_path = os.path.join(base_dir, rel_path.replace("/", os.sep))
    if not os.path.exists(full_path):
        print("Skipped (not found):", rel_path)
        return
    bak = full_path + ".bak"
    if not os.path.exists(bak):
        shutil.copy2(full_path, bak)
    content = open(full_path, "r", encoding="utf-8").read()
    count = 0
    for old, new in replacements.items():
        if old in content:
            count += content.count(old)
            content = content.replace(old, new)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {rel_path} ({count} replacements)")

product_replacements = {
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
    "Fantastic 12-Stroke Engine With A Power of 1991 hp": "محرك عالي الأداء بقوة 1991 حصان",
    "Air Filter From Ash's Chainsaw": "فلتر هواء عالي التدفق",
}

post_replacements = {
    "Philosophy That Addresses Topics Such As Goodness": "دليل اختيار قطع الغيار الأصلية والبديلة لمركبتك",
    "Logic Is The Study Of Reasoning And Argument Part 2": "كيف تحافظ على نظام التبريد والمكابح في أجواء الخليج",
    "Some Philosophers Specialize In One Or More Historical Periods": "أهم الفروقات بين الزيوت التخليقية والمعدنية للمحرك",
    "A Variety Of Other Academic And Non-Academic Approaches Have Been": "نصائح الصيانة الدورية قبل السفر والرحلات الطويلة",
    "Jessica Moore": "فريق بوابة السيارات",
}

safe_replace("src/fake-server/database/products.ts", product_replacements)
safe_replace("src/fake-server/database/posts.ts", post_replacements)

print("\nDONE! Refresh browser with Ctrl+F5.")