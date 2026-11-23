import os
import shutil

base_dir = r"C:\AutoGate\autogate-platform\autogate-storefront\Sources"

# 1. إنشاء ملف قاموس القوائم والدالة المساعدة useMenuLabel
labels_file = os.path.join(base_dir, "src", "services", "i18n", "menu-labels.ts")
os.makedirs(os.path.dirname(labels_file), exist_ok=True)

labels_code = '''import React from 'react';
import { useLocale } from '~/services/i18n/hooks';

const AR_LABELS: Record<string, string> = {
    'Home': 'الرئيسية',
    'Home One': 'الرئيسية ١',
    'Home Two': 'الرئيسية ٢',
    'Header Spaceship': 'ترويسة حديثة',
    'Header Classic': 'ترويسة كلاسيكية',
    'Mobile Header': 'ترويسة الجوال',
    'Variant One': 'النمط الأول',
    'Variant Two': 'النمط الثاني',
    'Variant Three': 'النمط الثالث',
    'Variant Four': 'النمط الرابع',
    'Variant Five': 'النمط الخامس',
    'Megamenu': 'الأقسام الكبرى',
    'Shop': 'المتجر',
    'Blog': 'المدونة',
    'Account': 'حسابي',
    'Pages': 'الصفحات',
    'Buy Theme': 'عن القالب',
    'Category': 'الفئات',
    'Shop Grid': 'شبكة المنتجات',
    'Shop List': 'قائمة المنتجات',
    'Shop Table': 'جدول المنتجات',
    'Shop Right Sidebar': 'قائمة جانبية يمنى',
    'Shop Navigation': 'التنقل في المتجر',
    'Product': 'صفحة المنتج',
    'Cart': 'سلة التسوق',
    'Checkout': 'إتمام الطلب',
    'Order Success': 'تأكيد الطلب',
    'Wishlist': 'المفضلة',
    'Compare': 'المقارنة',
    'Track Order': 'تتبع الطلب',
    'Login & Register': 'الدخول والتسجيل',
    'Dashboard': 'لوحة التحكم',
    'Garage': 'مرآبي',
    'Edit Profile': 'تعديل الملف الشخصي',
    'Order History': 'سجل الطلبات',
    'Order Details': 'تفاصيل الطلب',
    'Address Book': 'دفتر العناوين',
    'Edit Address': 'تعديل العنوان',
    'Change Password': 'تغيير كلمة المرور',
    'About Us': 'من نحن',
    'Terms And Conditions': 'الشروط والأحكام',
    'FAQ': 'الأسئلة الشائعة',
    'Headlights & Lighting': 'الأنوار والإضاءة',
    'Headlights': 'المصابيح الأمامية',
    'Tail Lights': 'المصابيح الخلفية',
    'Fog Lights': 'كشافات الضباب',
    'Turn Signals': 'إشارات الانعطاف',
    'Switches & Relays': 'المفاتيح والمرحلات',
    'Corner Lights': 'أنوار الزوايا',
    'Brakes & Suspension': 'المكابح ونظام التعليق',
    'Brake Discs': 'أقراص المكابح (الهوبات)',
    'Wheel Hubs': 'فلنجات العجلات',
    'Air Suspension': 'التعليق الهوائي',
    'Ball Joints': 'الجوزات والمفاصل',
    'Brake Pad Sets': 'أقمشة المكابح (الفحمات)',
    'Interior Parts': 'القطع الداخلية',
    'Floor Mats': 'فرشات الأرضية',
    'Gauges': 'العدادات والمقاييس',
    'Consoles & Organizers': 'الكونسول والمنظمات',
    'Mobile Electronics': 'إلكترونيات السيارة',
    'Steering Wheels': 'عجلات القيادة',
    'Cargo Accessories': 'إكسسوارات التحميل',
    'Engine & Drivetrain': 'المحرك ونظام الدفع',
    'Air Filters': 'فلاتر الهواء',
    'Oxygen Sensors': 'حساسات الأكسجين',
    'Heating': 'نظام التدفئة',
    'Exhaust': 'نظام العادم',
    'Cranks & Pistons': 'الكرنك والبساتم',
    'Body Parts': 'قطع الهيكل الخارجي',
    'Bumpers': 'الصدامات',
    'Hoods': 'أغطية المحرك (الكبوت)',
    'Grilles': 'الشبكات الأمامية',
    'Door Handles': 'مقابض الأبواب',
    'Car Covers': 'أغطية السيارات',
    'Tailgates': 'الأبواب الخلفية',
    'Suspension': 'نظام التعليق',
    'Steering': 'نظام التوجيه (الدركسون)',
    'Fuel Systems': 'أنظمة الوقود',
    'Transmission': 'ناقل الحركة (القير)',
    'Tires & Wheels': 'الإطارات والجنوط',
    'Tools & Garage': 'العدد والورشة',
    'Repair Manuals': 'أدلة الصيانة',
    'Car Care': 'العناية بالسيارة',
    'Code Readers': 'أجهزة فحص الأعطال',
    'Tool Boxes': 'صناديق العدد',
    'Clutches': 'الكلتشات',
};

export function useMenuLabel() {
    const locale = useLocale();

    return (title: string | React.ReactNode): string | React.ReactNode => {
        if (typeof title !== 'string') {
            return title;
        }
        if (locale === 'ar' && AR_LABELS[title]) {
            return AR_LABELS[title];
        }
        return title;
    };
}
'''

with open(labels_file, "w", encoding="utf-8") as f:
    f.write(labels_code)
print("Created:", labels_file)

# 2. تحديث مكونات القوائم الخمسة
targets = [
    ("src/components/header/MainMenu.tsx", "function MainMenu(", "{item.title}", "{t(item.title)}"),
    ("src/components/header/Departments.tsx", "function Departments(", "{item.title}", "{t(item.title)}"),
    ("src/components/header/MegamenuLinks.tsx", "function MegamenuLinks(", "{link.title}", "{t(link.title)}"),
    ("src/components/header/Menu.tsx", "function Menu(", "{item.title}", "{t(item.title)}"),
    ("src/components/mobile/MobileMenuLinks.tsx", "function MobileMenuLinks(", "{item.title}", "{t(item.title)}"),
]

import_line = "import { useMenuLabel } from '~/services/i18n/menu-labels';\n"

for rel_path, fn_sig, old_expr, new_expr in targets:
    full_path = os.path.join(base_dir, rel_path.replace("/", os.sep))
    shutil.copy2(full_path, full_path + ".bak")
    content = open(full_path, "r", encoding="utf-8").read()

    if "useMenuLabel" not in content:
        # إضافة الاستيراد بعد السطر الأول
        lines = content.splitlines(True)
        lines.insert(2, import_line)
        content = "".join(lines)

        # حقن const t = useMenuLabel(); داخل بداية الدالة
        idx = content.find(fn_sig)
        brace_idx = content.find("{", idx)
        content = content[:brace_idx + 1] + "\n    const t = useMenuLabel();" + content[brace_idx + 1:]

    content = content.replace(old_expr, new_expr)
    content = content.replace("label={item.title}", "label={t(item.title)}")

    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated:", rel_path)

print("ALL MENUS LOCALIZED SUCCESSFULLY!")