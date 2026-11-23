import json
import os
import re
import shutil

base_dir = r"C:\AutoGate\autogate-platform\autogate-storefront\Sources"

def backup(path):
    if os.path.exists(path) and not os.path.exists(path + ".bak"):
        shutil.copy2(path, path + ".bak")

def replace_map(rel_path, replacements):
    full_path = os.path.join(base_dir, rel_path.replace("/", os.sep))
    if not os.path.exists(full_path):
        print("Skipped (not found):", rel_path)
        return
    backup(full_path)
    content = open(full_path, "r", encoding="utf-8", errors="replace").read()
    count = 0
    for old, new in replacements.items():
        if old in content:
            count += content.count(old)
            content = content.replace(old, new)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {rel_path} ({count} replacements)")

# ==========================================
# 1. تعريب كامل مفاتيح ar.json (الواجهة، الفلاتر، الفرز، المركبة، الحساب)
# ==========================================
en_path = os.path.join(base_dir, "public", "i18n", "en.json")
ar_path = os.path.join(base_dir, "public", "i18n", "ar.json")

en_data = json.load(open(en_path, "r", encoding="utf-8")) if os.path.exists(en_path) else {}
ar_data = json.load(open(ar_path, "r", encoding="utf-8")) if os.path.exists(ar_path) else {}

ar_overrides = {
    # الأزرار العامة
    "BUTTON_ADD_ADDRESS": "إضافة عنوان",
    "BUTTON_ADD_NEW": "إضافة جديد",
    "BUTTON_ADD_TO_CART": "أضف إلى السلة",
    "BUTTON_ADD_TO_COMPARE": "أضف للمقارنة",
    "BUTTON_ADD_TO_WISHLIST": "أضف للمفضلة",
    "BUTTON_ADD_VEHICLE": "إضافة مركبة",
    "BUTTON_ADD_VEHICLE_LONG": "إضافة مركبة إلى المرآب",
    "BUTTON_APPLY_COUPON": "تطبيق الكوبون",
    "BUTTON_BACK_TO_LIST": "العودة إلى القائمة",
    "BUTTON_BLOCK_FINDER_SEARCH": "بحث",
    "BUTTON_CANCEL": "إلغاء",
    "BUTTON_CHANGE": "تغيير",
    "BUTTON_CHECKOUT": "إتمام الطلب",
    "BUTTON_CLEAR_ALL": "مسح الكل",
    "BUTTON_CLEAR_LIST": "مسح القائمة",
    "BUTTON_DEPARTMENTS": "الأقسام",
    "BUTTON_DEPARTMENTS_LONG": "تسوق حسب القسم",
    "BUTTON_EDIT_PROFILE": "تعديل الملف الشخصي",
    "BUTTON_FILTERS": "تصفية",
    "BUTTON_GO_TO_HOMEPAGE": "الذهاب إلى الرئيسية",
    "BUTTON_LOGIN": "تسجيل الدخول",
    "BUTTON_PLACE_ORDER": "تأكيد الطلب",
    "BUTTON_POST_REVIEW": "نشر التقييم",
    "BUTTON_PROCEED_TO_CHECKOUT": "المتابعة لإتمام الطلب",
    "BUTTON_QUICKVIEW": "معاينة سريعة",
    "BUTTON_REGISTER": "إنشاء حساب",
    "BUTTON_REMOVE": "حذف",
    "BUTTON_RESET": "إعادة ضبط",
    "BUTTON_RESET_FILTERS": "إعادة ضبط الفلاتر",
    "BUTTON_SAVE": "حفظ",
    "BUTTON_SEARCH_SELECT_VEHICLE_DESKTOP": "اختر المركبة",
    "BUTTON_SEARCH_SELECT_VEHICLE_MOBILE": "المركبة",
    "BUTTON_SEE_FULL_DETAILS": "عرض التفاصيل الكاملة",
    "BUTTON_SELECT_VEHICLE": "اختر المركبة",
    "BUTTON_SHOP_ALL": "تسوق الكل",
    "BUTTON_SUBSCRIBE": "اشتراك",
    "BUTTON_TRACK": "تتبع",
    "BUTTON_UPDATE_CART": "تحديث السلة",
    "BUTTON_VIEW_CART": "عرض السلة",

    # العناوين الرئيسية
    "HEADER_ADD_VEHICLE": "إضافة مركبة",
    "HEADER_ADDRESSES": "العناوين",
    "HEADER_BESTSELLERS": "الأكثر مبيعاً",
    "HEADER_BILLING_DETAILS": "تفاصيل الفوترة",
    "HEADER_CART_TOTALS": "إجمالي السلة",
    "HEADER_CATEGORIES": "الفئات",
    "HEADER_CHANGE_PASSWORD": "تغيير كلمة المرور",
    "HEADER_CHECKOUT": "إتمام الطلب",
    "HEADER_COMPARE": "المقارنة",
    "HEADER_CONTACT_US": "تواصل معنا",
    "HEADER_DASHBOARD": "لوحة التحكم",
    "HEADER_DEAL_ZONE_SUBTITLE": "سارع الآن! خصومات تصل إلى 70%",
    "HEADER_DEAL_ZONE_TITLE": "عروض حصرية لفترة محدودة",
    "HEADER_EDIT_ADDRESS": "تعديل العنوان",
    "HEADER_EDIT_PROFILE": "تعديل الملف الشخصي",
    "HEADER_FEATURED_PRODUCTS": "منتجات مميزة",
    "HEADER_FILTERS": "عوامل التصفية",
    "HEADER_GARAGE": "مرآبي (مركباتي)",
    "HEADER_INFORMATION": "معلومات",
    "HEADER_LATEST_NEWS": "أحدث الأخبار",
    "HEADER_LATEST_PRODUCTS": "أحدث المنتجات",
    "HEADER_LOGIN": "تسجيل الدخول",
    "HEADER_LOGIN_TO_YOUR_ACCOUNT": "تسجيل الدخول إلى حسابك",
    "HEADER_MY_ACCOUNT": "حسابي",
    "HEADER_NAVIGATION": "التنقل",
    "HEADER_NEW_ADDRESS": "عنوان جديد",
    "HEADER_NEW_ARRIVALS": "وصل حديثاً",
    "HEADER_NEWSLETTER": "النشرة البريدية",
    "HEADER_ORDER": "الطلب {number}",
    "HEADER_ORDER_HISTORY": "سجل الطلبات",
    "HEADER_POPULAR_CATEGORIES": "الفئات الشائعة",
    "HEADER_RECENT_ORDERS": "الطلبات الأخيرة",
    "HEADER_REGISTER": "تسجيل جديد",
    "HEADER_RELATED_PRODUCTS": "منتجات ذات صلة",
    "HEADER_SELECT_VEHICLE": "اختر المركبة",
    "HEADER_SHOP": "المتجر",
    "HEADER_SHOPPING_CART": "سلة التسوق",
    "HEADER_SPECIAL_OFFERS": "العروض الخاصة",
    "HEADER_TOP_RATED": "الأعلى تقييماً",
    "HEADER_TRACK_ORDER": "تتبع الطلب",
    "HEADER_WISHLIST": "المفضلة",
    "HEADER_WRITE_REVIEW": "أضف تقييماً",
    "HEADER_YOUR_ORDER": "طلبك",

    # الروابط
    "LINK_ABOUT_US": "من نحن",
    "LINK_ACCOUNT_ADDRESSES": "دفتر العناوين",
    "LINK_ACCOUNT_DASHBOARD": "لوحة التحكم",
    "LINK_ACCOUNT_GARAGE": "مرآبي (مركباتي)",
    "LINK_ACCOUNT_LOGOUT": "تسجيل الخروج",
    "LINK_ACCOUNT_ORDERS": "سجل الطلبات",
    "LINK_ACCOUNT_PASSWORD": "تغيير كلمة المرور",
    "LINK_ACCOUNT_PROFILE": "تعديل الملف الشخصي",
    "LINK_AFFILIATE": "التسويق بالعمولة",
    "LINK_ALL_PRODUCTS": "جميع المنتجات",
    "LINK_BLOG": "المدونة",
    "LINK_BRANDS": "العلامات التجارية",
    "LINK_CART": "السلة",
    "LINK_CHECKOUT": "إتمام الطلب",
    "LINK_COMPARE": "المقارنة",
    "LINK_CONTACT_US": "اتصل بنا",
    "LINK_CONTACTS": "تواصل معنا",
    "LINK_CREATE_ACCOUNT": "إنشاء حساب جديد",
    "LINK_DELIVERY_INFORMATION": "معلومات التوصيل",
    "LINK_FORGOT": "نسيت كلمة المرور؟",
    "LINK_GIFT_CERTIFICATES": "قسائم الهدايا",
    "LINK_HOME": "الرئيسية",
    "LINK_NEWSLETTER": "النشرة البريدية",
    "LINK_ORDER_HISTORY": "سجل الطلبات",
    "LINK_PRIVACY_POLICY": "سياسة الخصوصية",
    "LINK_RETURNS": "سياسة الاسترجاع",
    "LINK_SHOP": "المتجر",
    "LINK_SHOP_ALL": "تسوق الكل",
    "LINK_SHOW_PARTS": "عرض قطع الغيار",
    "LINK_SITE_MAP": "خريطة الموقع",
    "LINK_SPECIAL_OFFERS": "العروض الخاصة",
    "LINK_STORE_LOCATION": "موقع المتجر",
    "LINK_TRACK_ORDER": "تتبع الطلب",
    "LINK_WISH_LIST": "المفضلة",
    "LINK_WISHLIST": "المفضلة",

    # حقول الإدخال واختيار المركبة ورسائل الأخطاء
    "INPUT_CITY_LABEL": "المدينة",
    "INPUT_CITY_PLACEHOLDER": "الرياض، جدة، الدمام، بريدة...",
    "INPUT_COMPANY_LABEL": "اسم الشركة (اختياري)",
    "INPUT_COMPANY_PLACEHOLDER": "اسم الشركة",
    "INPUT_COUNTRY_LABEL": "الدولة",
    "INPUT_COUNTRY_PLACEHOLDER": "اختر الدولة",
    "INPUT_EMAIL_ADDRESS_LABEL": "البريد الإلكتروني",
    "INPUT_EMAIL_ADDRESS_PLACEHOLDER": "أدخل بريدك الإلكتروني",
    "INPUT_FIRST_NAME_LABEL": "الاسم الأول",
    "INPUT_FIRST_NAME_PLACEHOLDER": "الاسم الأول",
    "INPUT_LAST_NAME_LABEL": "اسم العائلة",
    "INPUT_LAST_NAME_PLACEHOLDER": "اسم العائلة",
    "INPUT_ONLY_EXACT_FIT_PARTS_LABEL": "القطع المتوافقة مع المركبة فقط",
    "INPUT_PASSWORD_LABEL": "كلمة المرور",
    "INPUT_PASSWORD_PLACEHOLDER": "كلمة المرور",
    "INPUT_PASSWORD_REPEAT_LABEL": "تأكيد كلمة المرور",
    "INPUT_PASSWORD_REPEAT_PLACEHOLDER": "أعد إدخال كلمة المرور",
    "INPUT_PHONE_NUMBER_LABEL": "رقم الجوال",
    "INPUT_PHONE_NUMBER_PLACEHOLDER": "05XXXXXXXX",
    "INPUT_POSTCODE_LABEL": "الرمز البريدي",
    "INPUT_POSTCODE_PLACEHOLDER": "الرمز البريدي",
    "INPUT_REMEMBER_ME_LABEL": "تذكرني",
    "INPUT_SEARCH_PLACEHOLDER": "أدخل اسم القطعة أو رقم القطعة (Part Number)",
    "INPUT_SEARCH_PLACEHOLDER_VEHICLE": "ابحث لمركبة {year} {make} {model}",
    "INPUT_SORT_LABEL": "الترتيب حسب",
    "INPUT_SORT_PLACEHOLDER": "الترتيب",
    "INPUT_SORT_DEFAULT": "الافتراضي",
    "INPUT_SORT_NAME_ASC": "الاسم (أ - ي)",
    "INPUT_SORT_NAME_DESC": "الاسم (ي - أ)",
    "INPUT_LIMIT_LABEL": "عرض",
    "INPUT_SHOW_LABEL": "عرض",
    "INPUT_STATE_LABEL": "المنطقة",
    "INPUT_STATE_PLACEHOLDER": "المنطقة",
    "INPUT_STREET_ADDRESS_LABEL": "عنوان الشارع / الحي",
    "INPUT_STREET_ADDRESS_PLACEHOLDER": "اسم الحي، اسم الشارع، رقم المبنى",
    "INPUT_VEHICLE_YEAR_LABEL": "سنة الصنع",
    "INPUT_VEHICLE_YEAR_PLACEHOLDER": "اختر سنة الصنع",
    "INPUT_VEHICLE_BRAND_LABEL": "الشركة المصنّعة",
    "INPUT_VEHICLE_BRAND_PLACEHOLDER": "اختر الشركة المصنّعة",
    "INPUT_VEHICLE_MODEL_LABEL": "الموديل",
    "INPUT_VEHICLE_MODEL_PLACEHOLDER": "اختر الموديل",
    "INPUT_VEHICLE_ENGINE_LABEL": "سعة المحرك",
    "INPUT_VEHICLE_ENGINE_PLACEHOLDER": "اختر سعة المحرك",
    "ERROR_FORM_INCORRECT_EMAIL": "صيغة البريد الإلكتروني غير صحيحة",
    "ERROR_FORM_PASSWORD_DOES_NOT_MATCH": "كلمتا المرور غير متطابقتين",
    "ERROR_FORM_REQUIRED": "هذا الحقل مطلوب",

    # النصوص العامة والواجهة والفلاتر
    "TEXT_ALL_VEHICLES": "جميع المركبات",
    "TEXT_BADGE_SALE": "تخفيض",
    "TEXT_BANNER_ONE_BUTTON": "تسوق الآن",
    "TEXT_BANNER_ONE_SUBTITLE": "زيوت محركات تخليقية أصلية مع شحن سريع<br>حماية وأداء مضمون للمحرك",
    "TEXT_BANNER_ONE_TITLE": "زيوت المحركات",
    "TEXT_BANNER_TWO_BUTTON": "تسوق الآن",
    "TEXT_BANNER_TWO_SUBTITLE": "إكسسوارات داخلية فاخرة لسيارتك<br>جلد، فرشات، ومستلزمات متكاملة.",
    "TEXT_BANNER_TWO_TITLE": "وفّر حتى 150 ريال",
    "TEXT_BLOCK_FINDER_SUBTITLE": "مئات العلامات التجارية وعشرات الآلاف من قطع الغيار الأصلية والبديلة",
    "TEXT_BLOCK_FINDER_TITLE": "ابحث عن قطع الغيار المناسبة لمركبتك",
    "TEXT_CALL_US": "اتصل بنا:",
    "TEXT_CATEGORIES": "الفئات",
    "TEXT_CONTACT_US_MESSAGE": "مرحباً بك، يسعدنا تواصلك معنا لأي استفسار أو طلب تعاون عبر إحدى الوسائل التالية:",
    "TEXT_EMAIL_ADDRESS": "البريد الإلكتروني",
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
    "TEXT_INDICATOR_ACCOUNT_LABEL": "مرحباً، تسجيل الدخول",
    "TEXT_INDICATOR_ACCOUNT_VALUE": "حسابي",
    "TEXT_INDICATOR_CART_LABEL": "سلة التسوق",
    "TEXT_MOBILE_INDICATOR_ACCOUNT": "حسابي",
    "TEXT_MOBILE_INDICATOR_CART": "السلة",
    "TEXT_MOBILE_INDICATOR_GARAGE": "مرآبي",
    "TEXT_MOBILE_INDICATOR_WISHLIST": "المفضلة",
    "TEXT_MOBILE_MENU_PHONE_TITLE": "خدمة العملاء 24/7",
    "TEXT_NEWSLETTER_MESSAGE": "أدخل بريدك الإلكتروني للاشتراك في نشرتنا البريدية والحصول على أحدث العروض.",
    "TEXT_ORDER_STATUS_COMPLETED": "مكتمل",
    "TEXT_ORDER_STATUS_PENDING": "قيد المعالجة",
    "TEXT_ORDER_STATUS_SHIPPED": "تم الشحن",
    "TEXT_OUR_LOCATION": "موقعنا",
    "TEXT_PHONE_NUMBER": "رقم الجوال",
    "TEXT_PRODUCTS": "المنتجات",
    "TEXT_RATING_LABEL": "{reviews, plural, =0 {لا توجد تقييمات} one {تقييم واحد} other {{reviews} تقييمات}}",
    "TEXT_SELECT_BRAND": "اختر الشركة المصنّعة",
    "TEXT_SELECT_ENGINE": "اختر سعة المحرك",
    "TEXT_SELECT_MODEL": "اختر الموديل",
    "TEXT_SELECT_YEAR": "اختر سنة الصنع",
    "TEXT_SHOP_FEATURE_FREE_SHIPPING_SUBTITLE": "للطلبات فوق 200 ريال",
    "TEXT_SHOP_FEATURE_FREE_SHIPPING_TITLE": "شحن مجاني",
    "TEXT_SHOP_FEATURE_HOT_OFFERS_SUBTITLE": "خصومات تصل إلى 70%",
    "TEXT_SHOP_FEATURE_HOT_OFFERS_TITLE": "عروض قوية",
    "TEXT_SHOP_FEATURE_SECURITY_SUBTITLE": "مدفوعات إلكترونية آمنة",
    "TEXT_SHOP_FEATURE_SECURITY_TITLE": "أمان وموثوقية 100%",
    "TEXT_SHOP_FEATURE_SUPPORT_SUBTITLE": "تواصل معنا في أي وقت",
    "TEXT_SHOP_FEATURE_SUPPORT_TITLE": "دعم فني 24/7",
    "TEXT_SHOW": "عرض",
    "TEXT_SHOWING_PRODUCTS": "عرض {from}-{to} من أصل {total} {total, plural, one {منتج} other {منتجات}}",
    "TEXT_SLOGAN": "قطع غيار السيارات والشاحنات والدراجات النارية",
    "TEXT_SOCIAL_LINKS_MESSAGE": "تابعنا على منصات التواصل الاجتماعي",
    "TEXT_SORT": "الترتيب",
    "TEXT_SORT_BY": "الترتيب حسب",
    "TEXT_STOCK_IN_STOCK": "متوفر في المخزون",
    "TEXT_STOCK_OUT_OF_STOCK": "غير متوفر حالياً",
    "TEXT_TAB_ANALOGS": "البدائل المتوافقة",
    "TEXT_TAB_BESTSELLERS": "الأكثر مبيعاً",
    "TEXT_TAB_DESCRIPTION": "الوصف",
    "TEXT_TAB_FEATURED": "المميزة",
    "TEXT_TAB_REVIEWS": "التقييمات",
    "TEXT_TAB_SPECIFICATION": "المواصفات",
    "TEXT_TAB_TOP_RATED": "الأعلى تقييماً",
    "TEXT_TIMER_DAYS": "يوم",
    "TEXT_TIMER_HOURS": "ساعة",
    "TEXT_TIMER_MINUTES": "دقيقة",
    "TEXT_TIMER_SECONDS": "ثانية",
    "TEXT_TOPBAR_COMPARE": "المقارنة",
    "TEXT_TOPBAR_CURRENCY": "العملة",
    "TEXT_TOPBAR_LANGUAGE": "اللغة",
    "TEXT_TOPBAR_PHONE": "اتصل بنا: {phone}",
    "TEXT_TOTAL": "الإجمالي",
    "TEXT_VEHICLE_FILTER_HELP": "اختر مركبتك لتصفية القطع المتوافقة بدقة فقط.",
    "TEXT_WORKING_HOURS": "ساعات العمل",
    "TEXT_YOUR_SHOPPING_CART_IS_EMPTY": "سلة التسوق فارغة!",
}

for k, v in en_data.items():
    if "SORT" in k or "DEFAULT" in k:
        if v == "Default":
            ar_overrides.setdefault(k, "الافتراضي")
        elif "A-Z" in v:
            ar_overrides.setdefault(k, "الاسم (أ - ي)")
        elif "Z-A" in v:
            ar_overrides.setdefault(k, "الاسم (ي - أ)")

ar_final = {**en_data, **ar_data, **ar_overrides}
os.makedirs(os.path.dirname(ar_path), exist_ok=True)
with open(ar_path, "w", encoding="utf-8") as f:
    json.dump(ar_final, f, ensure_ascii=False, indent=2)
print("[1/7] Updated public/i18n/ar.json")

# ==========================================
# 2. قاموس القوائم src/services/i18n/menu-labels.ts
# ==========================================
labels_path = os.path.join(base_dir, "src", "services", "i18n", "menu-labels.ts")
os.makedirs(os.path.dirname(labels_path), exist_ok=True)
labels_code = """import React from 'react';
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
    'Buy Theme': 'عن المتجر',
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
    'Contact Us v1': 'تواصل معنا ١',
    'Contact Us v2': 'تواصل معنا ٢',
    '404': 'صفحة غير موجودة (404)',
    'Components': 'مكونات الواجهة',
    'Typography': 'الخطوط والتنسيق',
    'Blog Classic': 'مدونة كلاسيكية',
    'Blog List': 'قائمة المقالات',
    'Blog Grid': 'شبكة المقالات',
    'Post Page': 'صفحة المقال',
    'Post Without Image': 'مقال بدون صورة',
    'Left Sidebar': 'شريط جانبي أيسر',
    'Right Sidebar': 'شريط جانبي أيمن',
    'Full Width': 'عرض كامل',
    'Cursor-Based': 'تنقل بالمؤشر',
    'Page-Based': 'تنقل بالصفحات',
    '3 Columns Sidebar': '٣ أعمدة مع شريط جانبي',
    '4 Columns Sidebar': '٤ أعمدة مع شريط جانبي',
    '5 Columns Sidebar': '٥ أعمدة مع شريط جانبي',
    '4 Columns Full': '٤ أعمدة عرض كامل',
    '5 Columns Full': '٥ أعمدة عرض كامل',
    '6 Columns Full': '٦ أعمدة عرض كامل',
    '7 Columns Full': '٧ أعمدة عرض كامل',
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
    'All': 'الكل',
    'Power Tools': 'أدوات كهربائية',
    'Hand Tools': 'أدوات يدوية',
    'Plumbing': 'توصيلات وأنابيب',
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
"""
with open(labels_path, "w", encoding="utf-8") as f:
    f.write(labels_code)
print("[2/7] Updated src/services/i18n/menu-labels.ts")

# ==========================================
# 3. العملات وهوية AutoGate
# ==========================================
currencies_path = os.path.join(base_dir, "src", "data", "shopCurrencies.ts")
backup(currencies_path)
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
print("[3/7] Updated src/data/shopCurrencies.ts")

theme_path = os.path.join(base_dir, "src", "data", "theme.ts")
backup(theme_path)
theme_code = """const theme = {
    name: 'AutoGate',
    url: 'https://autogate.sa',
    author: {
        name: 'AutoGate Team',
        profile_url: 'https://autogate.sa',
    },
    contacts: {
        address: ['المملكة العربية السعودية'],
        email: ['support@autogate.sa'],
        phone: ['+966 9200 00000'],
        hours: ['السبت - الخميس: 9:00 ص - 10:00 م'],
    },
};

export default theme;
"""
with open(theme_path, "w", encoding="utf-8") as f:
    f.write(theme_code)
print("[4/7] Updated src/data/theme.ts")

# ==========================================
# 4. السيارات السعودية للسوق المحلي (2015-2026)
# ==========================================
vehicles_path = os.path.join(base_dir, "src", "fake-server", "database", "vehicles.ts")
backup(vehicles_path)
vehicles_code = """// application
import { IVehicle } from '~/interfaces/vehicle';
import { makeIdGenerator } from '~/fake-server/utils';
import { IVehicleDef } from '~/fake-server/interfaces/vehicle-def';

const getNextId = makeIdGenerator();

function makeVehicles(defs: IVehicleDef[]): IVehicle[] {
    return defs.map((def) => {
        const range = typeof def.year === 'number' ? [def.year, def.year] : def.year;
        const years = [];

        for (let i = range[0]; i <= range[1]; i += 1) {
            years.push(i);
        }

        return years.map((year) => ({
            id: getNextId(),
            year,
            make: def.make,
            model: def.model,
            engine: def.engine,
        }));
    }).reduce((acc, v) => [...acc, ...v], []);
}

const vehiclesDef: IVehicleDef[] = [
    { year: [2015, 2026], make: 'تويوتا | Toyota', model: 'كامري (Camry)', engine: '2.5L 4-Cylinder' },
    { year: [2015, 2026], make: 'تويوتا | Toyota', model: 'كورولا (Corolla)', engine: '1.8L / 2.0L 4-Cylinder' },
    { year: [2015, 2026], make: 'تويوتا | Toyota', model: 'لاندكروزر (Land Cruiser)', engine: '3.5L V6 Twin-Turbo / 4.6L V8' },
    { year: [2015, 2026], make: 'تويوتا | Toyota', model: 'هايلكس (Hilux)', engine: '2.7L Petrol / 2.8L Diesel' },
    { year: [2016, 2026], make: 'تويوتا | Toyota', model: 'راف فور (RAV4)', engine: '2.5L 4-Cylinder / Hybrid' },
    { year: [2015, 2026], make: 'هيونداي | Hyundai', model: 'سوناتا (Sonata)', engine: '2.5L 4-Cylinder' },
    { year: [2015, 2026], make: 'هيونداي | Hyundai', model: 'إلنترا (Elantra)', engine: '1.6L / 2.0L 4-Cylinder' },
    { year: [2016, 2026], make: 'هيونداي | Hyundai', model: 'توسان (Tucson)', engine: '2.0L / 2.4L 4-Cylinder' },
    { year: [2016, 2026], make: 'هيونداي | Hyundai', model: 'أكسنت (Accent)', engine: '1.4L / 1.6L 4-Cylinder' },
    { year: [2015, 2026], make: 'نيسان | Nissan', model: 'باترول (Patrol)', engine: '4.0L V6 / 5.6L V8' },
    { year: [2015, 2026], make: 'نيسان | Nissan', model: 'ألتيما (Altima)', engine: '2.5L 4-Cylinder' },
    { year: [2015, 2026], make: 'نيسان | Nissan', model: 'صني (Sunny)', engine: '1.5L / 1.6L 4-Cylinder' },
    { year: [2016, 2026], make: 'نيسان | Nissan', model: 'إكستريل (X-Trail)', engine: '2.5L 4-Cylinder' },
    { year: [2015, 2026], make: 'فورد | Ford', model: 'تورس (Taurus)', engine: '2.0L EcoBoost / 3.5L V6' },
    { year: [2015, 2026], make: 'فورد | Ford', model: 'إكسبلورر (Explorer)', engine: '2.3L EcoBoost / 3.5L V6' },
    { year: [2015, 2026], make: 'فورد | Ford', model: 'إكسبيديشن (Expedition)', engine: '3.5L V6 EcoBoost' },
    { year: [2015, 2026], make: 'فورد | Ford', model: 'F-150', engine: '3.5L EcoBoost / 5.0L V8' },
    { year: [2015, 2026], make: 'كيا | Kia', model: 'K5 / أوبتيما (Optima)', engine: '2.0L / 2.5L 4-Cylinder' },
    { year: [2015, 2026], make: 'كيا | Kia', model: 'سبورتاج (Sportage)', engine: '2.0L / 2.4L 4-Cylinder' },
    { year: [2015, 2026], make: 'كيا | Kia', model: 'سيراتو (Cerato)', engine: '1.6L / 2.0L 4-Cylinder' },
    { year: [2015, 2026], make: 'لكزس | Lexus', model: 'ES 350', engine: '3.5L V6' },
    { year: [2015, 2026], make: 'لكزس | Lexus', model: 'LX 570 / LX 600', engine: '5.7L V8 / 3.5L V6 Twin-Turbo' },
    { year: [2016, 2026], make: 'لكزس | Lexus', model: 'RX 350', engine: '3.5L V6' },
    { year: [2015, 2026], make: 'شيفروليه | Chevrolet', model: 'تاهو (Tahoe)', engine: '5.3L V8 / 6.2L V8' },
    { year: [2015, 2026], make: 'شيفروليه | Chevrolet', model: 'سلفرادو (Silverado)', engine: '5.3L V8 / 6.2L V8' },
    { year: [2015, 2026], make: 'جي إم سي | GMC', model: 'يوكن (Yukon)', engine: '5.3L V8 / 6.2L V8' },
    { year: [2015, 2026], make: 'جي إم سي | GMC', model: 'سييرا (Sierra)', engine: '5.3L V8 / 6.2L V8' },
    { year: [2015, 2026], make: 'هوندا | Honda', model: 'أكورد (Accord)', engine: '1.5L Turbo / 2.0L' },
    { year: [2015, 2026], make: 'هوندا | Honda', model: 'سيفيك (Civic)', engine: '1.5L Turbo / 2.0L' },
    { year: [2015, 2026], make: 'مازدا | Mazda', model: 'مازدا 6 (Mazda6)', engine: '2.5L Skyactiv-G' },
    { year: [2016, 2026], make: 'مازدا | Mazda', model: 'CX-9', engine: '2.5L Turbo' },
    { year: [2015, 2026], make: 'مرسيدس بنز | Mercedes-Benz', model: 'E-Class (E200 / E300)', engine: '2.0L Turbo' },
    { year: [2015, 2026], make: 'مرسيدس بنز | Mercedes-Benz', model: 'S-Class (S450 / S500)', engine: '3.0L / 4.0L V8' },
    { year: [2015, 2026], make: 'بي إم دبليو | BMW', model: 'الفئة الخامسة (5 Series)', engine: '2.0L / 3.0L TwinPower Turbo' },
    { year: [2015, 2026], make: 'بي إم دبليو | BMW', model: 'X5', engine: '3.0L / 4.4L V8' },
    { year: [2018, 2026], make: 'شانجان | Changan', model: 'CS95 / CS85', engine: '2.0L Turbo' },
    { year: [2018, 2026], make: 'جيلي | Geely', model: 'كولراي (Coolray) / مونجارو (Monjaro)', engine: '1.5L / 2.0L Turbo' },
];

export const vehicles: IVehicle[] = makeVehicles(vehiclesDef);

export const userVehicles: IVehicle[] = vehicles.slice(0, 3);
"""
with open(vehicles_path, "w", encoding="utf-8") as f:
    f.write(vehicles_code)
print("[5/7] Updated src/fake-server/database/vehicles.ts")

# ==========================================
# 5. الفئات، العلامات التجارية، المنتجات، المقالات، وخيارات الفلاتر
# ==========================================
replace_map("src/fake-server/database/categories.ts", {
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
    "name: 'Turn Signals'": "name: 'إشارات الانعطاف'",
    "name: 'Headlights'": "name: 'المصابيح الأمامية'",
    "name: 'Tail Lights'": "name: 'المصابيح الخلفية'",
    "name: 'Fog Lights'": "name: 'كشافات الضباب'",
    "name: 'Brake Discs'": "name: 'أقراص المكابح (الهوبات)'",
    "name: 'Exhaust'": "name: 'نظام العادم'",
})

for brand_old, brand_new in {
    "Brandix": "برانديكس (Brandix)",
    "RedGate": "ريد جيت (RedGate)",
    "Sunset": "صن ست (Sunset)",
    "No Name": "بدون علامة (No Name)",
    "TurboElectric": "تيربو إلكتريك (TurboElectric)",
    "Specter": "سبيكتر (Specter)",
}.items():
    for rel in ["src/fake-server/database/brands.ts", "src/fake-server/database/products.ts"]:
        replace_map(rel, {f"'{brand_old}'": f"'{brand_new}'", f'"{brand_old}"': f'"{brand_new}"'})

replace_map("src/fake-server/database/products.ts", {
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
})

replace_map("src/fake-server/filters/radio-filter-builder.ts", {
    "{ slug: 'any', name: 'Any', count: 0 }": "{ slug: 'any', name: 'الكل', count: 0 }",
    "{ slug: 'yes', name: 'Yes', count: 0 }": "{ slug: 'yes', name: 'يوجد خصم', count: 0 }",
    "{ slug: 'no', name: 'No', count: 0 }": "{ slug: 'no', name: 'بدون خصم', count: 0 }",
})

filter_names = {
    "'Categories'": "'الفئات'",
    "'Vehicle'": "'المركبة'",
    "'Price'": "'السعر'",
    "'Brand'": "'العلامة التجارية'",
    "'With Discount'": "'الخصومات'",
    "'Rating'": "'التقييم'",
    "'Color'": "'اللون'",
}
for sub in ["src/fake-server/endpoints", "src/fake-server/filters"]:
    folder = os.path.join(base_dir, sub.replace("/", os.sep))
    if os.path.exists(folder):
        for fn in sorted(os.listdir(folder)):
            if fn.endswith(".ts"):
                replace_map(f"{sub}/{fn}", filter_names)

print("[6/7] Updated categories, brands, products, and filters")

# ==========================================
# 6. إصلاح الصفحة الرئيسية والحساب
# ==========================================
def clean_home(text: str) -> str:
    text = re.sub(r"['\"]╪[^'\"]+['\"]", "'العروض الخاصة'", text)
    home_map = {
        "{ id: 1, name: 'All', categorySlug: null }": "{ id: 1, name: 'الكل', categorySlug: null }",
        "{