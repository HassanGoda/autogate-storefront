import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import classNames from 'classnames';
// application
import AppImage from '~/components/shared/AppImage';
import AppLink from '~/components/shared/AppLink';
import CommentsList from '~/components/blog/CommentsList';
import Pagination from '~/components/shared/Pagination';
import ShareLinks from '~/components/shared/ShareLinks';
import { ArrowRoundedLeft7x11Svg, ArrowRoundedRight7x11Svg } from '~/svg';
// data
import dataBlogComments from '~/data/blogComments';
import dataBlogPosts from '~/data/blogPosts';

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

function Post(props: Props) {
    const l10n = useLocalize();

    const { className, ...rootProps } = props;

    const rootClasses = classNames(className);

    return (
        <div className={rootClasses} {...rootProps}>
            <div className="post-view__card post">
                <div className="post__body typography">
                    <p>{l10n("Vestibulum sagittis justo sit amet nisl semper, et pulvinar elit maximus. Morbi interdum velit quis magna placerat lobortis eget pharetra magna. Nulla tristique sollicitudin turpis, eget maximus risus faucibus non. Nulla vestibulum ipsum risus, vitae maximus nunc bibendum quis.")}</p>
                    <p>{l10n("Raesent eu consequat nibh. Quisque ullamcorper, augue eu fringilla sodales, leo metus volutpat risus, at suscipit ipsum diam eget sem. Maecenas dictum elit in enim molestie, vel sollicitudin erat ultricies. Sed risus tellus, molestie finibus dui quis, suscipit consequat ex.")}</p>
                    <blockquote>
                        <p>{l10n("Sed a dictum elit. In iaculis porttitor luctus. Maecenas ultricies dolor et semper placerat. Proin at lectus felis.")}</p>
                        <p><cite>{l10n("John Mcarthy")}</cite></p>
                    </blockquote>
                    <p>{l10n("Vivamus in nisi at turpis rhoncus feugiat. Mauris scelerisque non ante et ultrices. Donec sit amet sem lobortis, ullamcorper felis at, finibus sem. Curabitur tincidunt neque nunc.")}</p>
                    <h2>{l10n("Nam Eget Blandit Diam")}</h2>
                    <p>{l10n("Quisque semper magna eget libero maximus, a sollicitudin nunc hendrerit. Cras efficitur, ante vitae fringilla rutrum, mi tortor dapibus metus, in egestas metus erat sit amet orci. Ut faucibus non ante dapibus efficitur. Nam eget blandit diam, imperdiet condimentum neque. Donec risus nisi, aliquet a commodo ac, elementum vitae leo.")}</p>
                    <p>{l10n("Vestibulum sagittis justo sit amet nisl semper, et pulvinar elit maximus. Morbi interdum velit quis magna placerat lobortis eget pharetra magna.")}</p>
                    <p>
                        <strong>{l10n("Nulla fringilla:")}</strong>
                        {l10n(' ')}
                        <AppLink href="/">{l10n("Donec aliquet at felis et dignissim")}</AppLink>
                    </p>

                    <figure>
                        <AppLink href="/">
                            <AppImage src="/images/posts/post-3.webp" />
                        </AppLink>
                        <figcaption>{l10n("Nunc viverra, dui nec commodo dignissim, libero arcu.")}</figcaption>
                    </figure>

                    <p>{l10n("Vestibulum non varius lectus. Cras vel elit id ligula laoreet imperdiet. Mauris quis laoreet velit. Suspendisse sed velit nec ante facilisis pharetra.")}</p>
                    <p>{l10n("Phasellus ut elit vestibulum, dignissim mi non, suscipit ex. Praesent eu consequat nibh. Quisque ullamcorper, augue eu fringilla sodales, leo metus volutpat risus,")}{l10n(' ')}
                        <AppLink href="/">{l10n("at suscipit ipsum diam eget sem")}</AppLink>{l10n(". Maecenas dictum elit in enim molestie, vel sollicitudin erat ultricies. Sed risus tellus, molestie finibus dui quis, suscipit consequat ex.")}</p>
                    <hr />
                    <h2>{l10n("Nunc Dapibus Varius Ligula")}</h2>
                    <p>{l10n("Maecenas ultrices arcu ut feugiat semper. Praesent dictum tincidunt justo, ac tincidunt ante fermentum at. Vestibulum non varius lectus. Cras vel elit id ligula laoreet imperdiet. Mauris quis laoreet velit. Suspendisse sed velit nec ante facilisis pharetra. Duis vitae fermentum elit. Integer ac mattis elit.")}</p>
                    <p>{l10n("Mauris scelerisque non ante et ultrices. Donec sit amet sem lobortis:")}</p>
                    <ol>
                        <li>{l10n("Duis")}{l10n(' ')}
                            <strong>{l10n("finibus imperdiet ultricies")}</strong>{l10n(". Donec vel pretium turpis. In auctor euismod posuere.")}</li>
                        <li>{l10n("Praesent dictum tincidunt justo, ac tincidunt ante fermentum at. Vestibulum non varius lectus. Cras vel elit id ligula laoreet imperdiet.")}</li>
                        <li>
                            <strong>{l10n("In iaculis porttitor luctus")}</strong>{l10n(". Maecenas ultricies dolor et semper placerat. Proin at lectus felis. Quisque dapibus auctor justo id dictum.")}</li>
                    </ol>
                    <p>{l10n("Ut faucibus non ante dapibus efficitur. Nam eget blandit diam, imperdiet condimentum neque. Donec risus nisi, aliquet a commodo ac, elementum vitae leo.")}</p>
                </div>

                <div className="post__pagination">
                    <div className="post__pagination-title">{l10n("Pages")}</div>
                    <div className="post__pagination-list">
                        <ul>
                            <li><span className="post__pagination-link post__pagination-link--current">1</span></li>
                            <li><AppLink href="/" className="post__pagination-link">2</AppLink></li>
                            <li><AppLink href="/" className="post__pagination-link">3</AppLink></li>
                        </ul>
                    </div>
                </div>

                <div className="post__footer">
                    <div className="post__tags tags tags--sm">
                        <div className="tags__list">
                            <AppLink href="/">{l10n("Promotion")}</AppLink>
                            <AppLink href="/">{l10n("Power Tool")}</AppLink>
                            <AppLink href="/">{l10n("Wrench")}</AppLink>
                            <AppLink href="/">{l10n("Electrodes")}</AppLink>
                        </div>
                    </div>
                    <ShareLinks className="post__share-links" />
                </div>

                <div className="post__author">
                    <div className="post__author-avatar">
                        <AppImage src="/images/avatars/avatar-4.webp" />
                    </div>
                    <div className="post__author-info">
                        <div className="post__author-name">{l10n("Ryan Ford")}</div>
                        <div className="post__author-about">{l10n("Aliquam ullamcorper elementum sagittis. Etiam lacus lacus, mollis in mattis in, vehicula eu nulla. Nulla nec tellus pellentesque.")}</div>
                    </div>
                </div>
            </div>

            <div className="post-view__card post-navigation">
                <div className="post-navigation__body">
                    <AppLink href="/" className="post-navigation__item post-navigation__item--prev">
                        <div className="post-navigation__item-image">
                            <AppImage src={dataBlogPosts[1].image} />
                        </div>
                        <div className="post-navigation__item-info">
                            <div className="post-navigation__direction">
                                <div className="post-navigation__direction-arrow">
                                    <ArrowRoundedLeft7x11Svg />
                                </div>
                                <div className="post-navigation__direction-title">{l10n("Previous post")}</div>
                            </div>
                            <div className="post-navigation__item-title">
                                {l10n(dataBlogPosts[1].title)}
                            </div>
                        </div>
                    </AppLink>

                    <AppLink href="/" className="post-navigation__item post-navigation__item--next">
                        <div className="post-navigation__item-info">
                            <div className="post-navigation__direction">
                                <div className="post-navigation__direction-title">{l10n("Next post")}</div>
                                <div className="post-navigation__direction-arrow">
                                    <ArrowRoundedRight7x11Svg />
                                </div>
                            </div>
                            <div className="post-navigation__item-title">
                                {l10n(dataBlogPosts[2].title)}
                            </div>
                        </div>
                        <div className="post-navigation__item-image">
                            <AppImage src={dataBlogPosts[2].image} />
                        </div>
                    </AppLink>
                </div>
            </div>

            <div className="post-view__card">
                <h2 className="post-view__card-title">{l10n("Comments (")}{l10n(dataBlogComments.count)}
                    )
                </h2>

                <div className="post-view__card-body comments-view">
                    <CommentsList
                        className="comments-view__list"
                        comments={dataBlogComments.items}
                    />

                    <div className="comments-view__pagination">
                        <Pagination current={1} siblings={2} total={3} />
                    </div>
                </div>
            </div>

            <div className="post-view__card">
                <h2 className="post-view__card-title">{l10n("Write A Comment")}</h2>

                <form className="post-view__card-body">
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="comment-first-name">{l10n("First Name")}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="comment-first-name"
                                placeholder={l10n("First Name")}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="comment-last-name">{l10n("Last Name")}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="comment-last-name"
                                placeholder={l10n("Last Name")}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="comment-email">{l10n("Email Address")}</label>
                            <input
                                type="email"
                                className="form-control"
                                id="comment-email"
                                placeholder={l10n("Email Address")}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment-content">{l10n("Comment")}</label>
                        <textarea
                            className="form-control"
                            id="comment-content"
                            rows={6}
                        />
                    </div>
                    <div className="form-group mb-0">
                        <button type="submit" className="btn btn-primary mt-md-4 mt-2">{l10n("Post Comment")}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Post;
