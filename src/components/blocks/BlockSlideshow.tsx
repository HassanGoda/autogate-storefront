import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import classNames from 'classnames';
// application
import AppLink from '~/components/shared/AppLink';
import AppSlick, { ISlickProps } from '~/components/shared/AppSlick';
import { baseUrl } from '~/services/utils';

export interface IBlockSlideshowSlide {
    url: string;
    desktopImage: string;
    mobileImage: string;
    offer?: string;
    title: string;
    details: string;
    buttonLabel: string;
}

interface Props {
    slides: IBlockSlideshowSlide[];
}

const slickSettings: ISlickProps = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
};

function BlockSlideshow(props: Props) {
    const l10n = useLocalize();

    const { slides } = props;

    return (
        <div className="block block-slideshow">
            <div className="container">
                <div className="block-slideshow__carousel">
                    <AppSlick {...slickSettings}>
                        {l10n(slides.map((slide, slideIdx) => (
                            <AppLink href={slide.url} key={slideIdx} className="block-slideshow__item">
                                <span
                                    className={classNames(
                                        'block-slideshow__item-image',
                                        'block-slideshow__item-image--desktop',
                                        'reflect-rtl',
                                    )}
                                    style={{ backgroundImage: `url(${baseUrl(slide.desktopImage)})` }}
                                />
                                <span
                                    className={classNames(
                                        'block-slideshow__item-image',
                                        'block-slideshow__item-image--mobile',
                                        'reflect-rtl',
                                    )}
                                    style={{ backgroundImage: `url(${baseUrl(slide.mobileImage)})` }}
                                />
                                {l10n(slide.offer && (
                                    <span className="block-slideshow__item-offer">{l10n(slide.offer)}</span>
                                ))}
                                <span
                                    className="block-slideshow__item-title"
                                    dangerouslySetInnerHTML={{ __html: l10n.html(slide.title) }}
                                />
                                <span
                                    className="block-slideshow__item-details"
                                    dangerouslySetInnerHTML={{ __html: l10n.html(slide.details) }}
                                />
                                <span className="block-slideshow__item-button">{l10n(slide.buttonLabel)}</span>
                            </AppLink>
                        )))}
                    </AppSlick>
                </div>
            </div>
        </div>
    );
}

export default React.memo(BlockSlideshow);
