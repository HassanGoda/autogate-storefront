import os
import shutil

base_dir = r"C:\AutoGate\autogate-platform\autogate-storefront\Sources"

def save_clean(rel_path, updater_fn):
    full_path = os.path.join(base_dir, rel_path.replace("/", os.sep))
    if not os.path.exists(full_path):
        print("Not found:", rel_path)
        return
    bak = full_path + ".bak"
    if not os.path.exists(bak):
        shutil.copy2(full_path, bak)
    content = open(full_path, "r", encoding="utf-8", errors="replace").read()
    updated = updater_fn(content)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(updated)
    print("Updated:", rel_path)

def localize_home_content(text: str) -> str:
    # إصلاح أي نص تالف سابقاً للعروض الخاصة
    import re
    text = re.sub(r"['\"]╪[^'\"]+['\"]", "'العروض الخاصة'", text)

    replacements = {
        "{ id: 1, name: 'All', categorySlug: null }": "{ id: 1, name: 'الكل', categorySlug: null }",
        "{ id: 2, name: 'Power Tools', categorySlug: 'power-tools' }": "{ id: 2, name: 'أدوات كهربائية', categorySlug: 'power-tools' }",
        "{ id: 3, name: 'Hand Tools', categorySlug: 'hand-tools' }": "{ id: 3, name: 'أدوات يدوية', categorySlug: 'hand-tools' }",
        "{ id: 4, name: 'Plumbing', categorySlug: 'plumbing' }": "{ id: 4, name: 'توصيلات وأنابيب', categorySlug: 'plumbing' }",
        "{ title: 'Wheel Covers', url: url.products() }": "{ title: 'أغطية الجنوط', url: url.products() }",
        "{ title: 'Timing Belts', url: url.products() }": "{ title: 'سيور التايمن', url: url.products() }",
        "{ title: 'Oil Pans', url: url.products() }": "{ title: 'كارتير الزيت', url: url.products() }",
        "{ title: 'Show All', url: url.products() }": "{ title: 'عرض الكل', url: url.products() }",
        "{ title: 'Special Offers', url: url.blog() }": "{ title: 'العروض الخاصة', url: url.blog() }",
        "{ title: 'New Arrivals', url: url.blog() }": "{ title: 'وصل حديثاً', url: url.blog() }",
        "{ title: 'Reviews', url: url.blog() }": "{ title: 'مراجعات وتقييمات', url: url.blog() }",
        "title: 'Top Rated Products'": "title: 'الأعلى تقييماً'",
        "title: 'Special Offers'": "title: 'العروض الخاصة'",
        "title: 'Bestsellers'": "title: 'الأكثر مبيعاً'",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text

save_clean("src/pages/index.tsx", localize_home_content)
save_clean("src/pages/demo/home-two.tsx", localize_home_content)

# تعريب placeholders المركبة داخل src/services/forms/vehicle.ts إن وُجدت نصوص إنجليزية مباشرة
vehicle_form_path = os.path.join(base_dir, "src", "services", "forms", "vehicle.ts")
if os.path.exists(vehicle_form_path):
    def localize_vehicle_placeholders(text: str) -> str:
        vf_map = {
            "'Select Year'": "'اختر سنة الصنع'",
            "'Select Brand'": "'اختر الشركة المصنّعة'",
            "'Select Make'": "'اختر الشركة المصنّعة'",
            "'Select Model'": "'اختر الموديل'",
            "'Select Engine'": "'اختر سعة المحرك'",
            '"Select Year"': '"اختر سنة الصنع"',
            '"Select Brand"': '"اختر الشركة المصنّعة"',
            '"Select Make"': '"اختر الشركة المصنّعة"',
            '"Select Model"': '"اختر الموديل"',
            '"Select Engine"': '"اختر سعة المحرك"',
        }
        for old, new in vf_map.items():
            text = text.replace(old, new)
        return text
    save_clean("src/services/forms/vehicle.ts", localize_vehicle_placeholders)

print("\nDONE! Refresh browser with Ctrl+F5.")