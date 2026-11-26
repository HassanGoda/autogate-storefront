// react
import React from 'react';
import { useIntl } from 'react-intl';
// application
import AppLink from '~/components/shared/AppLink';
import BlockSpace from '~/components/blocks/BlockSpace';
import Decor from '~/components/shared/Decor';
import PageTitle from '~/components/shared/PageTitle';
import { baseUrl } from '~/services/utils';

function Page() {
    const { locale } = useIntl();
    const isArabic = locale === 'ar';
    const title = isArabic ? 'نبذة عنا' : 'About Us';
    const subtitle = isArabic ? 'موزّع معتمد للسيارات في السعودية' : 'Authorized Automotive Distributor in Saudi Arabia';
    const paragraphs = isArabic ? [
        'تأسست شركة أوتوجيت للسيارات عام 2015، وتعمل موزّعًا معتمدًا للسيارات في المملكة العربية السعودية. نوفّر لعملائنا مجموعة متنوعة من السيارات عالية الجودة، إلى جانب خدمات وحلول متكاملة تلبي احتياجاتهم.',
        'نقدّم حلول تنقّل حديثة في أنحاء المملكة، مستندين إلى مجموعة من المنتجات والخدمات والتقنيات التي تواكب المعايير العالمية.',
        'تُقدّر مبيعات الشركة بنحو 500 مليون ريال سعودي، وقد شهدت أرباحها نموًا ملحوظًا خلال الأعوام الماضية.',
    ] : [
        'Founded in 2015, AutoGate Cars is an authorized automotive distributor in Saudi Arabia. We offer a range of high-quality vehicles and integrated services to meet our customers’ needs.',
        'We provide modern mobility solutions across the Kingdom, supported by products, services, and technologies that meet international standards.',
        'Company sales are estimated at approximately SAR 500 million, and profits have grown in recent years.',
    ];

    const details = isArabic ? [
        ['تاريخنا', 'بدأت خبرة المؤسسة في بيع وتأجير السيارات عام 2012، وتأسست شركة أوتوجيت للسيارات عام 2015.'],
        ['رؤيتنا', 'دعم قطاع السيارات السعودي بتصنيع المركبات محليًا وتصديرها إلى الأسواق العالمية.'],
        ['مهمتنا', 'أن نكون من روّاد وكلاء السيارات في الشرق الأوسط.'],
        ['قيمنا', 'الابتكار، والمصداقية، وجودة الخدمة، والتركيز على العميل، والراحة.'],
        ['خدمات السيارات وقطع الغيار', 'تقدّم أوتوجيت خدمات العناية بالسيارة، ومنها التظليل وحماية الطلاء والتلميع، وتستقبل استفسارات قطع الغيار.'],
    ] : [
        ['Our history', 'The organization’s experience in vehicle sales and rentals dates back to 2012. AutoGate Cars was founded in 2015.'],
        ['Our vision', 'Support the Saudi automotive sector through local vehicle manufacturing and global exports.'],
        ['Our mission', 'Become one of the leading automotive dealers in the Middle East.'],
        ['Our values', 'Innovation, credibility, service quality, customer focus, and convenience.'],
        ['Vehicle services and spare parts', 'AutoGate offers vehicle care services including tinting, paint protection, and detailing, and handles spare parts enquiries.'],
    ];

    return (
        <React.Fragment>
            <PageTitle>{title}</PageTitle>

            <div className="about">
                <div className="about__body">
                    <div className="about__image">
                        <div
                            className="about__image-bg"
                            style={{
                                backgroundImage: `url(${baseUrl('/images/autogate-about.webp')})`,
                            }}
                        />
                        <Decor className="about__image-decor" type="bottom" />
                    </div>

                    <div className="about__card">
                        <h1 className="about__card-title">{title}</h1>
                        <h2 className="h5">{subtitle}</h2>
                        <div className="about__card-text">
                            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                            {details.map(([heading, description]) => (
                                <section className="mt-3" key={heading}>
                                    <h2 className="h5">{heading}</h2>
                                    <p>{description}</p>
                                </section>
                            ))}
                            <AppLink href="/contact-us" className="btn btn-primary btn-sm">
                                {isArabic ? 'تواصل مع أوتوجيت' : 'Contact AutoGate'}
                            </AppLink>
                        </div>
                    </div>
                </div>
            </div>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
