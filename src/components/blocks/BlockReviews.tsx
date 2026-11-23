import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// application
import AppImage from '~/components/shared/AppImage';
import AppSlick, { ISlickProps } from '~/components/shared/AppSlick';
import Rating from '~/components/shared/Rating';
// data
import dataSiteTestimonials from '~/data/siteTestimonials';

const slickSettings: ISlickProps = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
};

function BlockReviews() {
    const l10n = useLocalize();

    return (
        <div className="block block-reviews">
            <div className="container">
                <div className="block-reviews__title">{l10n("Testimonials")}</div>
                <div className="block-reviews__subtitle">{l10n("During our work we have accumulated")}<br />{l10n("hundreds of positive reviews.")}</div>
                <div className="block-reviews__list">
                    <AppSlick {...slickSettings}>
                        {l10n(dataSiteTestimonials.map((testimonial, index) => (
                            <div key={index} className="block-reviews__item">
                                <div className="block-reviews__item-avatar">
                                    <AppImage src={testimonial.avatar} />
                                </div>
                                <div className="block-reviews__item-content">
                                    <div className="block-reviews__item-text">{l10n(testimonial.review)}</div>
                                    <div className="block-reviews__item-meta">
                                        <div className="block-reviews__item-rating">
                                            <Rating value={testimonial.rating} />
                                        </div>
                                        <div className="block-reviews__item-author">
                                            {l10n(`${l10n(testimonial.name)}, ${l10n(testimonial.position)}`)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )))}
                    </AppSlick>
                </div>
            </div>
        </div>
    );
}

export default BlockReviews;
