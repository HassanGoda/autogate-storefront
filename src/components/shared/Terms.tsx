import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// application
import AppLink from '~/components/shared/AppLink';
import url from '~/services/url';

function Terms() {
    const l10n = useLocalize();

    return (
        <React.Fragment>
            <p>{l10n("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis neque ut purus fermentum, ac pretium nibh facilisis. Vivamus venenatis viverra iaculis. Suspendisse tempor orci non sapien ullamcorper dapibus. Suspendisse at velit diam. Donec pharetra nec enim blandit vulputate. Suspendisse potenti. Pellentesque et molestie ante. In feugiat ante vitae ultricies malesuada.")}</p>

            <h2>{l10n("Definitions")}</h2>

            <ol>
                <li>
                    <strong>{l10n("Risus")}</strong>
                    {l10n(' — ')}{l10n("Morbi posuere eleifend sollicitudin. Praesent eget ante in enim scelerisque scelerisque. Donec mi lorem, molestie a sapien non, laoreet convallis felis. In semper felis in lacus venenatis, sit amet commodo leo interdum. Maecenas congue ut leo et auctor.")}</li>
                <li>
                    <strong>{l10n("Praesent")}</strong>
                    {l10n(' — ')}{l10n("Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla orci ante, viverra in imperdiet in, pharetra et leo")}</li>
                <li>
                    <strong>{l10n("Vestibulum")}</strong>
                    {l10n(' — ')}{l10n("Vestibulum arcu tellus, aliquam vel fermentum vestibulum, lacinia pulvinar ipsum. In hac habitasse platea dictumst. Integer felis libero, blandit scelerisque mauris eget, porta elementum sapien. Mauris luctus arcu non enim lobortis gravida.")}</li>
            </ol>

            <h2>{l10n("Ornare dolor")}</h2>

            <p>{l10n("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis neque ut purus fermentum, ac pretium nibh facilisis. Vivamus venenatis viverra iaculis. Suspendisse tempor orci non sapien ullamcorper dapibus. Suspendisse at velit diam. Donec pharetra nec enim blandit vulputate. Suspendisse potenti. Pellentesque et molestie ante. In feugiat ante vitae ultricies malesuada.")}</p>

            <p>{l10n("For information about how to contact us, please visit our")}{l10n(' ')}
                <AppLink href={url.pageContactUs()}>{l10n("contact page")}</AppLink>
                .
            </p>

        </React.Fragment>
    );
}

export default Terms;
