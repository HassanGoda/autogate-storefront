import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
import { useIntl } from 'react-intl';
// application
import BlockHeader from '~/components/blocks/BlockHeader';
import BlockMap from '~/components/blocks/BlockMap';
import BlockSpace from '~/components/blocks/BlockSpace';
import PageTitle from '~/components/shared/PageTitle';
// data
import theme from '~/data/theme';

function Page() {
    const l10n = useLocalize();
    const { locale } = useIntl();

    return (
        <React.Fragment>
            <PageTitle>{l10n("Contact Us")}</PageTitle>

            <BlockMap />

            <BlockHeader
                pageTitle="Contact Us"
                breadcrumb={[
                    { title: 'Home', url: '' },
                    { title: 'Breadcrumb', url: '' },
                    { title: 'Current Page', url: '' },
                ]}
                afterHeader={false}
            />

            <div className="block">
                <div className="container container--max--lg">
                    <div className="card">
                        <div className="card-body card-body--padding--2">
                            <div className="row">
                                <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                                    <div className="mr-1">
                                        <h4 className="contact-us__header card-title">{l10n("Our Address")}</h4>

                                        <div className="contact-us__address" id="branches">
                                            <p>{l10n(theme.contacts.address[0])}</p>
                                            <p><a href={`tel:${theme.contacts.phone[0]}`}>{theme.contacts.phone[0]}</a></p>
                                            <ul>
                                                {theme.contacts.email.map((email) => <li key={email}><a href={`mailto:${email}`}>{email}</a></li>)}
                                            </ul>
                                            <p>{l10n(theme.contacts.hours[0])}</p>
                                            <p><a href={`https://autogate.sa/${locale}/contact-us#branches-section`}>{l10n('View AutoGate branches')}</a></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-6">
                                    <div className="ml-1">
                                        <h4 className="contact-us__header card-title">{l10n("Leave us a Message")}</h4>

                                        <form onSubmit={(event) => {
                                            event.preventDefault();
                                            const fields = new FormData(event.currentTarget);
                                            const subject = encodeURIComponent(String(fields.get('subject') || ''));
                                            const body = encodeURIComponent(`${fields.get('message')}\n\n${fields.get('name')} — ${fields.get('email')}`);
                                            window.location.href = `mailto:${theme.contacts.email[0]}?subject=${subject}&body=${body}`;
                                        }}>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="form-name">{l10n("Your Name")}</label>
                                                    <input
                                                        type="text"
                                                        id="form-name" name="name" required
                                                        className="form-control"
                                                        placeholder={l10n("Your Name")}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="form-email">{l10n("Email")}</label>
                                                    <input
                                                        type="email"
                                                        id="form-email" name="email" required
                                                        className="form-control"
                                                        placeholder={l10n("Email Address")}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="form-subject">{l10n("Subject")}</label>
                                                <input
                                                    type="text"
                                                    id="form-subject" name="subject" required
                                                    className="form-control"
                                                    placeholder={l10n("Subject")}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="form-message">{l10n("Message")}</label>
                                                <textarea
                                                    id="form-message" name="message" required
                                                    className="form-control"
                                                    rows={4}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary">{l10n("Send Message")}</button>
                                        </form>
                                    </div>
                                </div>
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
