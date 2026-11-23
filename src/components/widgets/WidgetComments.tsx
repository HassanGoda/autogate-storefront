import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// application
import AppLink from '~/components/shared/AppLink';
import { IComment } from '~/interfaces/comment';

interface Props {
    widgetTitle?: React.ReactNode;
    comments: IComment[];
}

function WidgetComments(props: Props) {
    const l10n = useLocalize();

    const { widgetTitle, comments } = props;

    return (
        <div className="card widget widget-comments">
            {l10n(widgetTitle && (
                <div className="widget__header">
                    <h4>{l10n(widgetTitle)}</h4>
                </div>
            ))}

            <div className="widget-comments__body">
                <ul className="widget-comments__list">
                    {l10n(comments.map((comment, index) => (
                        <li key={index} className="widget-comments__item">
                            <div className="widget-comments__author">
                                <AppLink href="/">
                                    {l10n(comment.author)}
                                </AppLink>
                            </div>
                            <div className="widget-comments__content">{l10n(comment.text)}</div>
                            <div className="widget-comments__meta">
                                <div className="widget-comments__date">{l10n(comment.date)}</div>
                                <div className="widget-comments__name">
                                    {l10n('On ')}
                                    <AppLink href="/" title={l10n(comment.postTitle)}>
                                        {l10n(comment.postTitle)}
                                    </AppLink>
                                </div>
                            </div>
                        </li>
                    )))}
                </ul>
            </div>
        </div>
    );
}

export default WidgetComments;
