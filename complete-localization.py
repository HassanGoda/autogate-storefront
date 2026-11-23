import json
import os
import shutil

base_dir = r"C:\AutoGate\autogate-platform\autogate-storefront\Sources"

# 1. تحديث العملات وإضافة الريال السعودي SAR كعملة افتراضية
currencies_path = os.path.join(base_dir, "src", "data", "shopCurrencies.ts")
shutil.copy2(currencies_path, currencies_path + ".bak")
currencies_code = """// application
import { ICurrency } from '~/interfaces/currency';

const dataShopCurrencies: ICurrency[] = [
    {
        code: 'SAR',
        symbol: 'ر.س ',
        name: 'الريال السعودي (SAR)',
        rate: 3.75,
    },
    {
        code: 'USD',
        symbol: '$',
        name: 'US Dollar (USD)',
        rate: 1,
    },
    {
        code: 'EUR',
        symbol: '€',
        name: 'Euro (EUR)',
        rate: 0.92,
    },
];

const dataShopDefaultCurrencyCode = 'SAR';

export const dataShopDefaultCurrency: ICurrency = dataShopCurrencies.find((x) => (
    x.code === dataShopDefaultCurrencyCode
))!;

export default dataShopCurrencies;
"""
with open(currencies_path, "w", encoding="utf-8") as f:
    f.write(currencies_code)
print("1. Updated shopCurrencies.ts with SAR")

# 2. تحديث بيانات المتجر والفوتر في theme.ts
theme_path = os.path.join(base_dir, "src", "data", "theme.ts")
shutil.copy2(theme_path, theme_path + ".bak")
theme_code = """const theme = {
    name: 'AutoGate',
    url: 'https://autogate.sa',
    author: {
        name: 'AutoGate Team',
        profile_url: 'https://autogate.sa',
    },
    contacts: {
        address: ['الرياض، المملكة العربية السعودية'],
        email: ['support@autogate.sa'],
        phone: ['+966 9200 00000'],
        hours: ['السبت - الخميس: 9:00 ص - 10:00 م'],
    },
};

export default theme;
"""
with open(theme_path, "w", encoding="utf-8") as f:
    f.write(theme_code)
print("2. Updated theme.ts with AutoGate Saudi contacts")

# 3. إكمال مفاتيح الترجمة المتبقية في public/i18n/ar.json (التقييمات، الفوتر، التبويبات)
ar_path = os.path.join(base_dir, "public", "i18n", "ar.json")
ar_data = json.load(open(ar_path, "r", encoding="utf-8"))

remaining_ar = {
    "TEXT_RATING_LABEL": "{reviews, plural, =0 {لا توجد تقييمات} one {تقييم واحد} other {{reviews} تقييمات}}",
    "TEXT_CONTACT_US_MESSAGE": "مرحباً بك، يسعدنا تواصلك معنا لأي استفسار أو طلب تعاون عبر إحدى الوسائل التالية:",
    "LINK_WISH_LIST": "المفضلة",
    "LINK_SHOW_PARTS": "عرض قطع الغيار",
    "LINK_SHOP_ALL": "تسوق الكل",
    "BUTTON_SHOP_ALL": "تسوق الكل",
    "HEADER_POPULAR_CATEGORIES": "الفئات الشائعة",
    "HEADER_RELATED_PRODUCTS": "منتجات ذات صلة",
    "HEADER_LATEST_PRODUCTS": "أحدث المنتجات",
    "HEADER_SPECIAL_OFFERS": "العروض الخاصة",
    "HEADER_TOP_RATED": "الأعلى تقييماً",
    "HEADER_BESTSELLERS": "الأكثر مبيعاً",
    "HEADER_NEW_ARRIVALS": "وصل حديثاً",
    "HEADER_LATEST_NEWS": "أحدث الأخبار",
    "TEXT_ORDER_STATUS_COMPLETED": "مكتمل",
    "TEXT_ORDER_STATUS_PENDING": "قيد المعالجة",
    "TEXT_ORDER_STATUS_SHIPPED": "تم الشحن",
}
ar_data.update(remaining_ar)
with open(ar_path, "w", encoding="utf-8") as f:
    json.dump(ar_data, f, ensure_ascii=False, indent=2)
print("3. Updated remaining keys in ar.json")

# 4. تعريب أسماء الفئات والمنتجات التجريبية في categories.ts و products.ts
cat_path = os.path.join(base_dir, "src", "fake-server", "database", "categories.ts")
shutil.copy2(cat_path, cat_path + ".bak")
cat_content = open(cat_path, "r", encoding="utf-8").read()

cat_replacements = {
    "name: 'Headlights & Lighting'": "name: 'الأنوار والإضاءة'",
    "name: 'Fuel Systems'": "name: 'أنظمة الوقود'",
    "name: 'Body Parts'": "name: 'قطع الهيكل'",
    "name: 'Interior Parts'": "name: 'القطع الداخلية'",
    "name: 'Tires & Wheels'": "name: 'الإطارات والجنوط'",
    "name: 'Engine & Drivetrain'": "name: 'المحرك ونظام الدفع'",
    "name: 'Oils & Lubricants'": "name: 'الزيوت ومواد التشحيم'",
    "name: 'Steering & Suspension'": "name: 'التوجيه ونظام التعليق'",
    "name: 'Wheel Covers'": "name: 'أغطية الجنوط'",
    "name: 'Brake Kits'": "name: 'أطقم المكابح'",
    "name: 'Tire Chains'": "name: 'سلاسل الإطارات'",
    "name: 'Wheel disks'": "name: 'الجنوط المعدنية'",
    "name: 'Tires'": "name: 'الإطارات'",
    "name: 'Sensors'": "name: 'الحساسات'",
    "name: 'Accessories'": "name: 'الإكسسوارات'",
    "name: 'Dashboards'": "name: 'الطبلون ولوحة العدادات'",
    "name: 'Seat Covers'": "name: 'تلبيسات المقاعد'",
    "name: 'Floor Mats'": "name: 'فرشات الأرضية'",
    "name: 'Sun Shades'": "name: 'مظلات الشمس'",
    "name: 'Visors'": "name: 'شماسات السيارة'",
    "name: 'Car Covers'": "name: 'أغطية السيارات'",
    "name: 'Timing Belts'": "name: 'سيور التايمن'",
    "name: 'Spark Plugs'": "name: 'البواجي (شمعات الإشعال)'",
    "name: 'Oil Pans'": "name: 'كارتير الزيت'",
    "name: 'Engine Gaskets'": "name: 'وجيه المحرك'",
    "name: 'Oil Filters'": "name: 'فلاتر الزيت'",
    "name: 'Engine Mounts'": "name: 'كراسي المحرك'",
    "name: 'Power Tools'": "name: 'أدوات كهربائية'",
    "name: 'Hand Tools'": "name: 'أدوات يدوية'",
    "name: 'Plumbing'": "name: 'توصيلات وأنابيب'",
    "name: 'Latest News'": "name: 'أحدث الأخبار'",
    "name: 'Special Offers'": "name: 'العروض الخاصة'",
    "name: 'New Arrivals'": "name: 'وصل حديثاً'",
    "name: 'Reviews'": "name: 'مراجعات وتقييمات'",
}
for old, new in cat_replacements.items():
    cat_content = cat_content.replace(old, new)

with open(cat_path, "w", encoding="utf-8") as f:
    f.write(cat_content)
print("4. Localized category names in categories.ts")

print("ALL DONE! Refresh browser with Ctrl+F5.")