import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
import { useIntl } from 'react-intl';
// third-party
import classNames from 'classnames';
// application
import AppImage from '~/components/shared/AppImage';
import AppLink from '~/components/shared/AppLink';
import url from '~/services/url';
import { IPost } from '~/interfaces/post';

export type IPostCardLayout = 'list' | 'grid' | 'grid-sm';

interface Props {
    post: IPost;
    layout?: IPostCardLayout;
}

function PostCard(props: Props) {
    const l10n = useLocalize();

    const { post, layout } = props;
    const { locale } = useIntl();
    const destination = post.officialPath ? `https://autogate.sa/${locale}${post.officialPath}` : url.post(post);

    const rootClasses = classNames('post-card', {
        [`post-card--layout--${layout}`]: layout,
    });

    return (
        <div className={rootClasses}>
            <div className="post-card__image">
                <AppLink href={destination}>
                    <AppImage src={post.image} />
                </AppLink>
            </div>
            <div className="post-card__content">
                <div className="post-card__category">
                    {l10n(post.categories.map((category, index) => (
                        <AppLink href={post.officialPath ? destination : "/"} key={index}>
                            {l10n(category)}
                        </AppLink>
                    )))}
                </div>
                <div className="post-card__title">
                    <h2>
                        <AppLink href={destination}>
                            {l10n(post.title)}
                        </AppLink>
                    </h2>
                </div>
                {!post.officialPath && <div className="post-card__date">
                    {l10n(' By ')}
                    <AppLink href="/">{l10n("Jessica Moore")}</AppLink>
                    {l10n(' on ')}
                    {l10n(post.date)}
                </div>}
                <div className="post-card__excerpt">
                    <div className="typography">{l10n(post.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis neque ut purus fermentum, ac pretium nibh facilisis. Vivamus venenatis viverra iaculis. Suspendisse tempor orci non sapien ullamcorper dapibus. Suspendisse at velit diam. Donec pharetra nec enim blandit vulputate.")}</div>
                </div>
                <div className="post-card__more">
                    <AppLink href={destination} className="btn btn-secondary btn-sm">{l10n("Read more")}</AppLink>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
