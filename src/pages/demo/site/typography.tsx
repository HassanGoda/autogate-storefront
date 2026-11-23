import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// application
import AppLink from '~/components/shared/AppLink';
import BlockSpace from '~/components/blocks/BlockSpace';
import PageTitle from '~/components/shared/PageTitle';

function Page() {
    const l10n = useLocalize();

    return (
        <React.Fragment>
            <PageTitle>{l10n("Typography")}</PageTitle>

            <BlockSpace layout="spaceship-ledge-height" />

            <div className="block">
                <div className="container">
                    <div className="document">
                        <div className="document__header">
                            <h1 className="document__title">{l10n("Typography")}</h1>
                        </div>
                        <div className="document__content card">
                            <div className="typography">
                                <p>{l10n("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis neque ut purus fermentum, ac pretium nibh facilisis. Vivamus venenatis viverra iaculis. Suspendisse tempor orci non sapien ullamcorper dapibus. Suspendisse at velit diam. Donec pharetra nec enim blandit vulputate.")}</p>

                                <h2>{l10n("H2 Header Example")}</h2>

                                <p>{l10n("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis neque ut purus fermentum, ac pretium nibh facilisis. Vivamus venenatis viverra iaculis. Suspendisse tempor orci non sapien ullamcorper dapibus. Suspendisse at velit diam. Donec pharetra nec enim blandit vulputate.")}</p>

                                <h3>{l10n("H3 Header Example")}</h3>

                                <p>{l10n("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis neque ut purus fermentum, ac pretium nibh facilisis. Vivamus venenatis viverra iaculis. Suspendisse tempor orci non sapien ullamcorper dapibus. Suspendisse at velit diam. Donec pharetra nec enim blandit vulputate.")}</p>

                                <h4>{l10n("H4 Header Example")}</h4>

                                <p>{l10n("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis neque ut purus fermentum, ac pretium nibh facilisis. Vivamus venenatis viverra iaculis. Suspendisse tempor orci non sapien ullamcorper dapibus. Suspendisse at velit diam. Donec pharetra nec enim blandit vulputate.")}</p>

                                <h5>{l10n("H5 Header Example")}</h5>

                                <p>{l10n("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis neque ut purus fermentum, ac pretium nibh facilisis. Vivamus venenatis viverra iaculis. Suspendisse tempor orci non sapien ullamcorper dapibus. Suspendisse at velit diam. Donec pharetra nec enim blandit vulputate.")}</p>

                                <h6>{l10n("H6 Header Example")}</h6>

                                <p>{l10n("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis neque ut purus fermentum, ac pretium nibh facilisis. Vivamus venenatis viverra iaculis. Suspendisse tempor orci non sapien ullamcorper dapibus. Suspendisse at velit diam. Donec pharetra nec enim blandit vulputate.")}</p>

                                <hr />

                                <h3>{l10n("Blockquote")}</h3>
                                <p>{l10n("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis neque ut purus fermentum, ac pretium nibh facilisis. Vivamus venenatis viverra iaculis.")}</p>
                                <blockquote>
                                    <p>{l10n("Suspendisse tempor orci non sapien ullamcorper dapibus. At velit diam. Donec pharetra nec enim blandit vulputate.")}</p>
                                    <p><cite>{l10n("Adam Taylor")}</cite></p>
                                </blockquote>
                                <p>{l10n("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis neque ut purus fermentum, ac pretium nibh facilisis. Vivamus venenatis viverra iaculis.")}</p>

                                <hr />

                                <h3>{l10n("Standard List")}</h3>
                                <p>{l10n("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis neque ut purus fermentum, ac pretium nibh facilisis. Vivamus venenatis viverra iaculis.")}</p>
                                <ul>
                                    <li>{l10n("Morbi dignissim hendrerit ligula, quis rutrum risus ultrices eu")}</li>
                                    <li>{l10n("Nullam dapibus id mauris dignissim dignissim. Sed ut metus mauris.")}</li>
                                    <li>{l10n("Nulla mollis justo faucibus, laoreet tortor ac, ornare arcu.")}</li>
                                    <li>{l10n("Libero quis mattis sollicitudin, ipsum sem mattis ligula, pharetra consectetur nisl mi sit amet turpis.")}</li>
                                    <li>{l10n("Vivamus malesuada, mauris in pulvinar ultricies, eros ligula scelerisque mi, a porttitor nulla ligula sed erat.")}</li>
                                </ul>

                                <h3>{l10n("Numbered List")}</h3>
                                <p>{l10n("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis neque ut purus fermentum, ac pretium nibh facilisis. Vivamus venenatis viverra iaculis.")}</p>
                                <ol>
                                    <li>{l10n("Morbi dignissim hendrerit ligula, quis rutrum risus ultrices eu")}</li>
                                    <li>{l10n("Nullam dapibus id mauris dignissim dignissim. Sed ut metus mauris.")}</li>
                                    <li>{l10n("Nulla mollis justo faucibus, laoreet tortor ac, ornare arcu.")}</li>
                                    <li>{l10n("Libero quis mattis sollicitudin, ipsum sem mattis ligula, pharetra consectetur nisl mi sit amet turpis.")}</li>
                                    <li>{l10n("Vivamus malesuada, mauris in pulvinar ultricies, eros ligula scelerisque mi, a porttitor nulla ligula sed erat.")}</li>
                                </ol>

                                <h3>{l10n("Text Styles")}</h3>
                                <p>{l10n("Lorem ipsum")}{l10n(' ')}
                                    <strong>{l10n("bold text")}</strong>{l10n(", consectetur")}{l10n(' ')}
                                    <em>{l10n("italic text")}</em>{l10n(". Donec facilisis")}{l10n(' ')}
                                    <del>{l10n("line through")}</del>{l10n("neque ut purus fermentum, ac")}{l10n(' ')}
                                    <AppLink href="/">{l10n("link")}</AppLink>{l10n(". Vivamus venenatis viverra iaculis.")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
