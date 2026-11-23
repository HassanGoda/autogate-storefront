import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// application
import AppImage from '~/components/shared/AppImage';
import AppLink from '~/components/shared/AppLink';
import url from '~/services/url';
import { IPost } from '~/interfaces/post';

interface Props {
    widgetTitle?: React.ReactNode;
    posts: IPost[];
}

function WidgetPosts(props: Props) {
    const l10n = useLocalize();

    const { widgetTitle, posts } = props;

    return (
        <div className="card widget widget-posts">
            {l10n(widgetTitle && (
                <div className="widget__header">
                    <h4>{l10n(widgetTitle)}</h4>
                </div>
            ))}
            <ul className="widget-posts__list">
                {l10n(posts.map((post, index) => (
                    <li key={index} className="widget-posts__item">
                        <div className="widget-posts__image">
                            <AppLink href={url.post(post)}>
                                <AppImage src={post.image} />
                            </AppLink>
                        </div>
                        <div className="widget-posts__info">
                            <div className="widget-posts__name">
                                <AppLink href={url.post(post)}>
                                    {l10n(post.title)}
                                </AppLink>
                            </div>
                            <div className="widget-posts__date">{l10n(post.date)}</div>
                        </div>
                    </li>
                )))}
            </ul>
        </div>
    );
}

export default WidgetPosts;
