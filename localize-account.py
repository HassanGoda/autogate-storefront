import json
import os

base_dir = r"C:\AutoGate\autogate-platform\autogate-storefront\Sources"

# 1. تحديث مفاتيح الحساب وتسجيل الدخول والنماذج في public/i18n/ar.json
ar_path = os.path.join(base_dir, "public", "i18n", "ar.json")
ar_data = json.load(open(ar_path, "r", encoding="utf-8"))

account_ar_keys = {
    "HEADER_LOGIN_TO_YOUR_ACCOUNT": "تسجيل الدخول إلى حسابك",
    "LINK_FORGOT": "نسيت كلمة المرور؟",
    "LINK_CREATE_ACCOUNT": "إنشاء حساب جديد",
    "LINK_ACCOUNT_DASHBOARD": "لوحة التحكم",
    "LINK_ACCOUNT_GARAGE": "مرآبي (مركباتي)",
    "LINK_ACCOUNT_PROFILE": "تعديل الملف الشخصي",
    "LINK_ACCOUNT_ORDERS": "سجل الطلبات",
    "LINK_ACCOUNT_ADDRESSES": "دفتر العناوين",
    "LINK_ACCOUNT_PASSWORD": "تغيير كلمة المرور",
    "LINK_ACCOUNT_LOGOUT": "تسجيل الخروج",
    "INPUT_EMAIL_ADDRESS_LABEL": "البريد الإلكتروني",
    "INPUT_EMAIL_ADDRESS_PLACEHOLDER": "أدخل بريدك الإلكتروني",
    "INPUT_PASSWORD_LABEL": "كلمة المرور",
    "INPUT_PASSWORD_PLACEHOLDER": "كلمة المرور",
    "INPUT_PASSWORD_REPEAT_LABEL": "تأكيد كلمة المرور",
    "INPUT_PASSWORD_REPEAT_PLACEHOLDER": "أعد إدخال كلمة المرور",
    "INPUT_FIRST_NAME_LABEL": "الاسم الأول",
    "INPUT_FIRST_NAME_PLACEHOLDER": "الاسم الأول",
    "INPUT_LAST_NAME_LABEL": "اسم العائلة",
    "INPUT_LAST_NAME_PLACEHOLDER": "اسم العائلة",
    "INPUT_COMPANY_LABEL": "اسم الشركة (اختياري)",
    "INPUT_COMPANY_PLACEHOLDER": "اسم الشركة",
    "INPUT_COUNTRY_LABEL": "الدولة",
    "INPUT_COUNTRY_PLACEHOLDER": "اختر الدولة",
    "INPUT_STREET_ADDRESS_LABEL": "عنوان الشارع / الحي",
    "INPUT_STREET_ADDRESS_PLACEHOLDER": "اسم الحي، اسم الشارع، رقم المبنى",
    "INPUT_CITY_LABEL": "المدينة",
    "INPUT_CITY_PLACEHOLDER": "الرياض، جدة، الدمام...",
    "INPUT_STATE_LABEL": "المنطقة",
    "INPUT_STATE_PLACEHOLDER": "المنطقة",
    "INPUT_POSTCODE_LABEL": "الرمز البريدي",
    "INPUT_POSTCODE_PLACEHOLDER": "الرمز البريدي",
    "INPUT_PHONE_NUMBER_LABEL": "رقم الجوال",
    "INPUT_PHONE_NUMBER_PLACEHOLDER": "05XXXXXXXX",
    "INPUT_REMEMBER_ME_LABEL": "تذكرني",
    "ERROR_FORM_REQUIRED": "هذا الحقل مطلوب",
    "ERROR_FORM_INCORRECT_EMAIL": "صيغة البريد الإلكتروني غير صحيحة",
    "ERROR_FORM_PASSWORD_DOES_NOT_MATCH": "كلمتا المرور غير متطابقتين",
}

ar_data.update(account_ar_keys)
with open(ar_path, "w", encoding="utf-8") as f:
    json.dump(ar_data, f, ensure_ascii=False, indent=2)
print("1. Updated Account & Form keys in ar.json")

# 2. تحديث البريد الافتراضي في AccountMenu.tsx و sign-in.ts إلى AutoGate
for rel in ["src/components/header/AccountMenu.tsx", "src/services/forms/sign-in.ts"]:
    p = os.path.join(base_dir, rel.replace("/", os.sep))
    if os.path.exists(p):
        txt = open(p, "r", encoding="utf-8").read()
        txt = txt.replace("red-parts@example.com", "customer@autogate.sa")
        with open(p, "w", encoding="utf-8") as f:
            f.write(txt)
        print("2. Updated email placeholder in:", rel)

print("DONE! Refresh browser with Ctrl+F5.")