# العربية والإنجليزية فقط | Arabic and English only

## التعديلات

- حصر إعدادات التوجيه وقوائم اللغة في الإنجليزية والعربية، وإزالة ملف اللغة الروسية وصورتها.
- الإنجليزية افتراضية على `/`، والعربية على `/ar`، مع تغيير `lang` و`dir` على الخادم والمتصفح.
- إكمال 357 رسالة واجهة، مع المحافظة على متغيرات ICU ودعم صيغ الجمع العربية.
- إضافة قاموس محتوى ثنائي اللغة للقوائم والمنتجات والمواصفات والمدونة والفريق والأسئلة الشائعة والشروط والتذييل وصفحات العروض.
- الترجمة عند العرض بواسطة `useLocalize` و`react-intl` دون تغيير معرّفات المنتجات وروابطها وأرقام القطع وقيم النماذج المخزّنة.
- البحث التجريبي يقبل أسماء المنتجات والفئات بالعربية والإنجليزية وأرقام SKU والقطع.
- تعريب خيارات المنتجات في السلة والدفع ورسائل الإضافة والتواريخ والعملات وأدوات الصور.
- العربية RTL والإنجليزية LTR، مع خط عربي وخطوط بديلة. أسماء العلامات التجارية وأرقام القطع محفوظة.
- استبدال الحشو اللاتيني غير المرتبط بقطع الغيار بنصوص نموذجية واضحة باللغتين.

## التشغيل

```sh
cd Sources
npm ci --legacy-peer-deps
npm run dev
```

افتح عنوان التشغيل الظاهر في الطرفية. الإنجليزية على `/` والعربية على `/ar`.

```sh
npm run verify:locales
npm run build
npm start
```

رسائل الواجهة في `public/i18n/en.json` و`public/i18n/ar.json`. النصوص الإضافية في `src/services/i18n/content-catalog.json`، وكل مدخل يحتوي `en` و`ar`. عند إضافة محتوى جديد أضف ترجمته إلى القاموس أو استخدم رسائل `react-intl`.

## نطاق التسليم

هذا مصدر قالب React / Next.js المرفق بعد الترجمة، وليس ملف HTML مستقلًا. بياناته وصوره وخدماته الخلفية تجريبية. الأسماء والعناوين والأسعار والإحصاءات والسياسات بيانات القالب الأصلية وليست معلومات مؤكدة عن AutoGate؛ تُراجع قبل الإطلاق. يُحفظ محتوى المستخدم كما يكتبه. لم يُربط القالب بـ Odoo أو دفع أو VIN حقيقي، ولم يُستبدل الموقع المنشور السابق.

## English

The supplied React / Next.js template now supports only English (`/`) and Arabic (`/ar`). Russian was removed from routing, desktop/mobile selectors and public language assets. Arabic uses RTL; English uses LTR. All 357 UI message keys have matching translations and valid ICU syntax, including Arabic plural forms.

A bilingual content catalog covers displayed menus, product names/specifications, blog, forms, cart/checkout, informational pages, demo layouts, image controls and footer. IDs, slugs, part numbers, stored values and user-entered content are preserved. The demo search supports both languages and part/SKU identifiers. Meaningless Latin copy was replaced with explicit sample content in both languages.

Run the commands above from `Sources`. This delivery preserves the template sources and assets and adds localization. It does not add Odoo, real payments, real VIN data or production backend services. Original sample statistics and policies require business review before launch. No previous hosted Site has been replaced.

هوية الموقع وشعاره وأيقونته تحمل اسم AutoGate.

The site uses the AutoGate name, logo and favicon.
