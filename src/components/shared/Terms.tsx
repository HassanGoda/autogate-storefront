import React from 'react';
import { useIntl } from 'react-intl';
import AppLink from './AppLink';

export default function Terms() {
    const ar = useIntl().locale === 'ar';

    return (
        <>
            <h2>{ar ? 'استخدام الكتالوج' : 'Using the catalog'}</h2>
            <p>{ar ? 'يعرض الكتالوج أنواع قطع الغيار لأغراض التعريف. يوضح فريق أوتوجيت رقم القطعة المناسب والسعر والتوفر قبل إتمام الطلب.' : 'The catalog shows types of spare parts for reference. AutoGate can confirm the part number, price and availability before you place an order.'}</p>
            <h2 id="delivery">{ar ? 'معلومات التوصيل' : 'Delivery information'}</h2>
            <p>{ar ? 'تواصل مع قسم قطع الغيار لتأكيد إمكانية التوصيل وتكلفته ومدته حسب المدينة والقطعة.' : 'Contact the spare parts team to confirm delivery options, costs and timing for your part and location.'}</p>
            <h2 id="returns">{ar ? 'الإرجاع والاستبدال' : 'Returns and exchanges'}</h2>
            <p>{ar ? 'للاستفسار عن إرجاع قطعة أو استبدالها، تواصل مع خدمة العملاء وأرفق رقم الفاتورة والقطعة إن توفر.' : 'For return or exchange enquiries, contact customer service with the invoice and part references if available.'}</p>
            <h2 id="privacy">{ar ? 'الخصوصية' : 'Privacy'}</h2>
            <p>{ar ? 'يفتح نموذج الاستفسار تطبيق البريد لديك. عند إرسال الرسالة تُشارك بيانات التواصل ومحتوى الاستفسار مع أوتوجيت. للاستفسار عن البيانات تواصل معنا عبر البريد الرسمي.' : 'The enquiry form opens your email app. When you send a message, you share your contact details and enquiry with AutoGate. Contact the company email for privacy enquiries.'}</p>
            <h2 id="site-map">{ar ? 'خريطة الموقع' : 'Site map'}</h2>
            <ul>
                <li><AppLink href="/catalog/products">{ar ? 'قطع الغيار' : 'Spare parts'}</AppLink></li>
                <li><AppLink href="/vehicle-catalog">{ar ? 'كتالوج السيارات' : 'Vehicle catalog'}</AppLink></li>
                <li><AppLink href="/about-us">{ar ? 'نبذة عنا' : 'About us'}</AppLink></li>
                <li><AppLink href="/contact-us">{ar ? 'تواصل معنا' : 'Contact us'}</AppLink></li>
                <li><AppLink href="/faq">{ar ? 'الأسئلة الشائعة' : 'Frequently asked questions'}</AppLink></li>
            </ul>
            <h2>{ar ? 'الاستفسار عن قطعة' : 'Asking about a part'}</h2>
            <p>{ar ? 'أرسل اسم القطعة ورقمها إن وجد، مع ماركة السيارة وطرازها وسنة الصنع.' : 'Include the part name and number if known, along with the vehicle make, model and year.'}</p>
            <a href="mailto:Spareparts@autogate-sa.com">Spareparts@autogate-sa.com</a>
        </>
    );
}
