# AutoGate | تعليمات التشغيل

من مجلد Sources شغّل `npm ci --legacy-peer-deps` ثم `npm run dev`.
الواجهة الإنجليزية على / والعربية على /ar.

أُدرجت سجلات Excel الثمانون في محدد السيارة الموجود على الرئيسية وفي نموذج اختيار السيارة للصفحات الفرعية. يظهر شعار الشركة بجانب اختيارها. يتاح الاختيار حتى 2027. ملف Excel لا يحتوي السنوات أو المحركات، لذا تظهر هذه الاختيارات بوصفها غير مؤكدة وتفتح الرئيسية الكتالوج العام. فلتر التطابق في الصفحات الفرعية لا يعتبرها قطعًا متوافقة. لا توجد صفحة أو قائمة مستقلة للسيارات.

The existing vehicle selectors include all 80 spreadsheet models and years through 2027. Imported year and engine combinations are unverified. The home search opens the general parts catalog for these selections. Exact-fit filtering does not treat imported records as verified fitment.

Logo assets: supplied AutoGate files, https://github.com/vehiclespecs/brand-logos, Wikimedia Commons (Lynk & Co), and the Junfeng brand-usage brochure.

### نسخة العرض | Presentation build

تستخدم نسخة العرض صورًا من أصول AutoGate وصورًا توضيحية لقطع الغيار، مع الحفاظ على أبعاد ملفات القالب. صور المنتجات أمثلة بصرية للعرض، وتُستبدل بصور الأصناف الفعلية بعد اعتماد الكتالوج. استُخدم موقع سبيرو مرجعًا لمصطلحات السوق.

Preview imagery comes from supplied AutoGate assets and illustrative parts artwork. Product imagery must be matched to the production catalog before launch.

### الهوية والصور والأسعار | Brand, photos and prices

يظهر شعار «أوتوجيت | AutoGate» في ترويسة الكمبيوتر والجوال. تعرض الواجهة العربية أسعار العرض بالريال السعودي، بتحويل قيمة الدولار المخزنة بسعر 3.75 ريال لكل دولار. اللغة الإنجليزية تستخدم إعداد العملة المعتاد. لا يُنشئ هذا التغيير أسعار بيع معتمدة.

صور الكتالوج الفوتوغرافية تمثل أنواع القطع. يسرد PHOTO_SOURCES.json مصدر كل صورة جديدة. العرض التجاري يحتاج إلى صور مطابقة للأصناف ومصرح باستخدامها. احتفظت شعارات الشركات وعناصر الحساب بوظيفتها البصرية.

The bilingual wordmark is used across desktop and mobile. Arabic prices use SAR for the local demo, based on the template’s USD values. PHOTO_SOURCES.json records the source of each new photograph. Reference photos identify the part type.

### مراجعة صور الكتالوج | Catalog photo review

لكل صنف من أصناف العرض الـ35 صورة فوتوغرافية مرجعية ومصدر مستقل في PHOTO_SOURCES.json. أزلنا الصور المكررة من معارض المنتجات، وصححنا الأوصاف الوهمية ورقم القطعة المشترك. تُعرض الصور حسب نوع القطعة، إلى حين توافر أرقام المصنّع الفعلية ومطابقة صور المورد لكل صنف.

### طلب تسعير من نتائج البحث

عند عدم توفر نتائج، يمكن تجهيز مسودة طلب تسعير وتنزيلها. تُعبّأ عبارة البحث والسيارة المختارة تلقائيًا حيث تتوفران. يمكنك إضافة رقم القطعة والكمية والملاحظات. يستخدم النموذج بيانات الكتالوج التجريبي ولا يرسل الطلب أو يحسب سعرًا.

المرحلة التشغيلية تحتاج إلى كتالوج الموردين المصادق عليه، وخدمة تحقق VIN وتوافق، ومخزون وأسعار حية، وإرسال الطلبات وتتبعها، وخدمات الشحن والإرجاع والدفع.

### الهوية البصرية | Visual identity

تستخدم القوالب المشتركة ألوان AutoGate المستخرجة من مشروع الواجهة المرفق: الزعفراني والبرتقالي، والبني للقوائم الداكنة والروابط، ودرجات البيج الفاتح. يستخدم الموقع Tajawal المرفق للعربية وArial للإنجليزية. تمتد الأنماط عبر الأزرار والنماذج والقوائم وبطاقات الأصناف والسلة والدفع. بقي توزيع الصفحات ومساراتها كما في القالب.

Shared controls use the supplied AutoGate palette. Arabic uses the bundled Tajawal font and English uses Arial. Header, footer and browser titles use the bilingual AutoGate identity.
