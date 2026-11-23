import json
import os

base_dir = r"C:\AutoGate\autogate-platform\autogate-storefront\Sources"

# 1. تحديث كامل مفاتيح public/i18n/ar.json
ar_path = os.path.join(base_dir, "public", "i18n", "ar.json")
ar_data = json.load(open(ar_path, "r", encoding="utf-8"))

full_ar_updates = {
    "TEXT_TOPBAR_COMPARE": "المقارنة",
    "TEXT_TOPBAR_CURRENCY": "العملة",
    "TEXT_TOPBAR_LANGUAGE": "اللغة",
    "TEXT_TOPBAR_PHONE": "اتصل بنا: {phone}",
    "LINK_CONTACTS": "تواصل معنا",
    "LINK_CONTACT_US": "اتصل بنا",
    "TEXT_INDICATOR_ACCOUNT_LABEL": "مرحباً، تسجيل الدخول",
    "TEXT_INDICATOR_ACCOUNT_VALUE": "حسابي",
    "TEXT_INDICATOR_CART_LABEL": "سلة التسوق",
    "INPUT_SEARCH_PLACEHOLDER": "أدخل اسم القطعة أو رقم القطعة (Part Number)",
    "INPUT_SEARCH_PLACEHOLDER_VEHICLE": "ابحث لمركبة {year} {make} {model}",
    "INPUT_VEHICLE_YEAR_PLACEHOLDER": "اختر السنة",
    "INPUT_VEHICLE_BRAND_PLACEHOLDER": "اختر الشركة",
    "INPUT_VEHICLE_MODEL_PLACEHOLDER": "اختر الموديل",
    "INPUT_VEHICLE_ENGINE_PLACEHOLDER": "اختر المحرك",
    "TEXT_SHOP_FEATURE_FREE_SHIPPING_TITLE": "شحن مجاني",
    "TEXT_SHOP_FEATURE_FREE_SHIPPING_SUBTITLE": "للطلبات فوق 200 ريال",
    "TEXT_SHOP_FEATURE_SUPPORT_TITLE": "دعم فني 24/7",
    "TEXT_SHOP_FEATURE_SUPPORT_SUBTITLE": "تواصل معنا في أي وقت",
    "TEXT_SHOP_FEATURE_SECURITY_TITLE": "أمان وموثوقية 100%",
    "TEXT_SHOP_FEATURE_SECURITY_SUBTITLE": "مدفوعات إلكترونية آمنة",
    "TEXT_SHOP_FEATURE_HOT_OFFERS_TITLE": "عروض قوية",
    "TEXT_SHOP_FEATURE_HOT_OFFERS_SUBTITLE": "خصومات تصل إلى 70%",
    "TEXT_TAB_FEATURED": "المميزة",
    "TEXT_TAB_BESTSELLERS": "الأكثر مبيعاً",
    "TEXT_TAB_TOP_RATED": "الأعلى تقييماً",
    "TEXT_TAB_DESCRIPTION": "الوصف",
    "TEXT_TAB_SPECIFICATION": "المواصفات",
    "TEXT_TAB_REVIEWS": "التقييمات",
    "TEXT_TAB_ANALOGS": "البدائل المتوافقة",
    "TEXT_CALL_US": "اتصل بنا:",
    "TEXT_WORKING_HOURS": "ساعات العمل",
    "TEXT_OUR_LOCATION": "موقعنا",
    "TEXT_EMAIL_ADDRESS": "البريد الإلكتروني",
    "TEXT_PHONE_NUMBER": "رقم الجوال",
    "TEXT_NEWSLETTER_MESSAGE": "أدخل بريدك الإلكتروني للاشتراك في نشرتنا البريدية والحصول على أحدث العروض.",
    "TEXT_SOCIAL_LINKS_MESSAGE": "تابعنا على منصات التواصل الاجتماعي",
    "TEXT_MOBILE_INDICATOR_ACCOUNT": "حسابي",
    "TEXT_MOBILE_INDICATOR_CART": "السلة",
    "TEXT_MOBILE_INDICATOR_GARAGE": "مرآبي",
    "TEXT_MOBILE_INDICATOR_WISHLIST": "المفضلة",
    "TEXT_MOBILE_MENU_PHONE_TITLE": "خدمة العملاء 24/7",
    "TEXT_YOUR_SHOPPING_CART_IS_EMPTY": "سلة التسوق فارغة!",
    "LINK_PRIVACY_POLICY": "سياسة الخصوصية",
    "LINK_RETURNS": "سياسة الاسترجاع",
    "LINK_DELIVERY_INFORMATION": "معلومات التوصيل",
    "LINK_SITE_MAP": "خريطة الموقع",
    "LINK_NEWSLETTER": "النشرة البريدية",
    "LINK_ORDER_HISTORY": "سجل الطلبات",
    "LINK_AFFILIATE": "التسويق بالعمولة",
    "LINK_GIFT_CERTIFICATES": "قسائم الهدايا",
    "LINK_STORE_LOCATION": "موقع المتجر",
    "HEADER_INFORMATION": "معلومات",
    "HEADER_MY_ACCOUNT": "حسابي",
    "HEADER_NEWSLETTER": "النشرة البريدية",
    "HEADER_DEAL_ZONE_TITLE": "عروض حصرية لفترة محدودة",
    "HEADER_DEAL_ZONE_SUBTITLE": "سارع الآن! خصومات تصل إلى 70%",
    "TEXT_TIMER_DAYS": "يوم",
    "TEXT_TIMER_HOURS": "ساعة",
    "TEXT_TIMER_MINUTES": "دقيقة",
    "TEXT_TIMER_SECONDS": "ثانية",
}

ar_data.update(full_ar_updates)
with open(ar_path, "w", encoding="utf-8") as f:
    json.dump(ar_data, f, ensure_ascii=False, indent=2)
print("Updated public/i18n/ar.json")

# 2. إضافة بقية عناصر القوائم الفرعية إلى menu-labels.ts
labels_path = os.path.join(base_dir, "src", "services", "i18n", "menu-labels.ts")
labels_content = open(labels_path, "r", encoding="utf-8").read()

extra_menu_labels = """    'Blog Classic': 'مدونة كلاسيكية',
    'Blog List': 'قائمة المقالات',
    'Blog Grid': 'شبكة المقالات',
    'Post Page': 'صفحة المقال',
    'Post Without Image': 'مقال بدون صورة',
    'Left Sidebar': 'شريط جانبي أيسر',
    'Right Sidebar': 'شريط جانبي أيمن',
    'Full Width': 'عرض كامل',
    'Contact Us v1': 'تواصل معنا ١',
    'Contact Us v2': 'تواصل معنا ٢',
    '404': 'صفحة غير موجودة (404)',
    'Components': 'مكونات الواجهة',
    'Typography': 'الخطوط والتنسيق',
    'Cursor-Based': 'تنقل بالمؤشر',
    'Page-Based': 'تنقل بالصفحات',
    '3 Columns Sidebar': '٣ أعمدة مع شريط جانبي',
    '4 Columns Sidebar': '٤ أعمدة مع شريط جانبي',
    '5 Columns Sidebar': '٥ أعمدة مع شريط جانبي',
    '4 Columns Full': '٤ أعمدة عرض كامل',
    '5 Columns Full': '٥ أعمدة عرض كامل',
    '6 Columns Full': '٦ أعمدة عرض كامل',
    '7 Columns Full': '٧ أعمدة عرض كامل',
    '6 Columns Full': '٦ أعمدة عرض كامل',
    '5 Columns Full': '٥ أعمدة عرض كامل',
    '4 Columns Full': '٤ أعمدة عرض كامل',
    '3 Columns Sidebar': '٣ أعمدة مع شريط جانبي',
    'All': 'الكل',
    'Power Tools': 'أدوات كهربائية',
    'Hand Tools': 'أدوات يدوية',
    'Plumbing': 'سباكة وتوصيلات',
"""

if "'Blog Classic'" not in labels_content:
    labels_content = labels_content.replace("const AR_LABELS: Record<string, string> = {\n", "const AR_LABELS: Record<string, string> = {\n" + extra_menu_labels)
    with open(labels_path, "w", encoding="utf-8") as f:
        f.write(labels_content)
    print("Updated menu-labels.ts")

print("DONE! Refresh browser with Ctrl+F5.")