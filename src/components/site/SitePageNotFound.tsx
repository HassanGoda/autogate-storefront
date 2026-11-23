import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
import { useRouter } from 'next/router';
// application
import AppLink from '~/components/shared/AppLink';
import BlockSpace from '~/components/blocks/BlockSpace';
import PageTitle from '~/components/shared/PageTitle';
import url from '~/services/url';

function SitePageNotFound() {
    const l10n = useLocalize();
    const router = useRouter();

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const term = String(new FormData(event.currentTarget).get('filter_query') || '').trim();
        if (term) {
            router.push({ pathname: '/catalog/products', query: { filter_query: term } }).then();
        }
    };

    return (
        <React.Fragment>
            <PageTitle>{l10n("Page Not Found")}</PageTitle>

            <BlockSpace layout="spaceship-ledge-height" />

            <div className="block">
                <div className="container">
                    <div className="not-found">
                        <div className="not-found__404">{l10n("Oops! Error 404")}</div>

                        <div className="not-found__content">
                            <h1 className="not-found__title">{l10n("Page Not Found")}</h1>

                            <p className="not-found__text">
                                {l10n('We can\'t seem to find the page you\'re looking for.')}
                                <br />{l10n("Try to use the search.")}</p>

                            <form className="not-found__search" onSubmit={handleSearch}>
                                <input
                                    type="search"
                                    name="filter_query"
                                    aria-label={l10n("Search")}
                                    className="not-found__search-input form-control"
                                    placeholder={l10n("Search Query...")}
                                />
                                <button type="submit" className="not-found__search-button btn btn-primary">{l10n("Search")}</button>
                            </form>

                            <p className="not-found__text">{l10n("Or go to the home page to start over.")}</p>

                            <AppLink href={url.home()} className="btn btn-secondary btn-sm">{l10n("Go To Home Page")}</AppLink>
                        </div>
                    </div>
                </div>
            </div>
            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default SitePageNotFound;
