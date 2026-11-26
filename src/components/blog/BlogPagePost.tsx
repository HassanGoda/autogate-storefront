import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import classNames from 'classnames';
// application
import AppLink from '~/components/shared/AppLink';
import BlockSpace from '~/components/blocks/BlockSpace';
import BlogSidebar from '~/components/blog/BlogSidebar';
import Decor from '~/components/shared/Decor';
import stories from '~/data/autogate-company-stories.json';
import { useIntl } from 'react-intl';
import { baseUrl } from '~/services/utils';
import { IBlogPageSidebarPosition } from '~/interfaces/pages';

interface Props {
    featuredImage?: boolean;
    sidebarPosition?: IBlogPageSidebarPosition | false;
}

function BlogPagePost(props: Props) {
    const l10n = useLocalize();
    const { locale } = useIntl();
    const story = stories[0];

    const { featuredImage = false, sidebarPosition = false } = props;

    return (
        <React.Fragment>
            <div className="block post-view">
                <div
                    className={classNames('post-view__header post-header', {
                        'post-header--has-image': featuredImage,
                    })}
                >
                    {l10n(featuredImage && (
                        <div
                            className="post-header__image"
                            style={{ backgroundImage: `url(${baseUrl(story.image)})` }}
                        />
                    ))}

                    <div className="post-header__body">
                        <div className="post-header__categories">
                            <ul className="post-header__categories-list">
                                <li className="post-header__categories-item">
                                    <AppLink href="/" className="post-header__categories-link">{l10n("Latest News")}</AppLink>
                                </li>
                            </ul>
                        </div>
                        <h1 className="post-header__title">{l10n(story.title)}</h1>
                    </div>
                    <Decor type="bottom" className="post-header__decor" />
                </div>

                <div className="container">
                    <div className="post-view__body">
                        {l10n(sidebarPosition === 'start' && (
                            <div className="post-view__item post-view__item-sidebar">
                                <BlogSidebar />
                            </div>
                        ))}
                        <article className="post-view__item post-view__item-post">
                            <p>{l10n(story.summary)}</p>
                            <AppLink href={`https://autogate.sa/${locale}${story.officialPath}`}>{l10n('Read more')}</AppLink>
                        </article>
                        {l10n(sidebarPosition === 'end' && (
                            <div className="post-view__item post-view__item-sidebar">
                                <BlogSidebar />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default BlogPagePost;
