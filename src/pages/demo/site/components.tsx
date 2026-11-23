import { useLocalize } from '~/services/i18n/localize';
// react
import React, { useState } from 'react';
// application
import AppLink from '~/components/shared/AppLink';
import BlockHeader from '~/components/blocks/BlockHeader';
import BlockSpace from '~/components/blocks/BlockSpace';
import InputNumber from '~/components/shared/InputNumber';
import PageTitle from '~/components/shared/PageTitle';
import StatusBadge from '~/components/shared/StatusBadge';
import { Cross12Svg, Quickview16Svg } from '~/svg';

function titleCase(str: string) {
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.replace(word[0], word[0].toUpperCase()))
        .join(' ');
}

function Page() {
    const l10n = useLocalize();

    const [numberValue, setNumberValue] = useState<number | string>(1);

    return (
        <React.Fragment>
            <PageTitle>{l10n("Components")}</PageTitle>

            <BlockHeader
                pageTitle="Components"
                breadcrumb={[
                    { title: 'Home', url: '' },
                    { title: 'Breadcrumb', url: '' },
                    { title: 'Current Page', url: '' },
                ]}
            />

            <div className="block">
                <div className="container">
                    <div className="card mb-4">
                        <div className="card-body card-body--padding--2">
                            <h2 className="card-title">{l10n("Alerts")}</h2>

                            <div className="row">
                                <div className="col-12">
                                    <div className="alert alert-primary alert-lg mb-3 alert-dismissible fade show">{l10n("A simple large alert with")}{l10n(' ')}
                                        <AppLink href="/">{l10n("an example link")}</AppLink>{l10n(". Give it a click if you like.")}<button type="button" className="close" data-dismiss="alert" aria-label={l10n("Close")}>
                                            <Cross12Svg />
                                        </button>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="alert alert-info mb-3">{l10n("A simple alert with")}{l10n(' ')}
                                        <AppLink href="/">{l10n("an example link")}</AppLink>{l10n(". Give it a click if you like.")}</div>
                                    <div className="alert alert-primary mb-3">{l10n("A simple alert with")}{l10n(' ')}
                                        <AppLink href="/">{l10n("an example link")}</AppLink>{l10n(". Give it a click if you like.")}</div>
                                    <div className="alert alert-secondary mb-3 mb-md-5">{l10n("A simple alert with")}{l10n(' ')}
                                        <AppLink href="/">{l10n("an example link")}</AppLink>{l10n(". Give it a click if you like.")}</div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="alert alert-success mb-3">{l10n("A simple alert with")}{l10n(' ')}
                                        <AppLink href="/">{l10n("an example link")}</AppLink>{l10n(". Give it a click if you like.")}</div>
                                    <div className="alert alert-danger mb-3">{l10n("A simple alert with")}{l10n(' ')}
                                        <AppLink href="/">{l10n("an example link")}</AppLink>{l10n(". Give it a click if you like.")}</div>
                                    <div className="alert alert-warning mb-5">{l10n("A simple alert with")}{l10n(' ')}
                                        <AppLink href="/">{l10n("an example link")}</AppLink>{l10n(". Give it a click if you like.")}</div>
                                </div>
                            </div>
                            <div className="alert alert-success" role="alert">
                                <h4 className="alert-heading">{l10n("Well done!")}</h4>
                                <p>{l10n("Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.")}</p>
                                <hr />
                                <p className="mb-0">{l10n("Whenever you need to, be sure to use margin utilities to keep things nice and tidy.")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body card-body--padding--2">
                            <h2 className="card-title">{l10n("Input Number")}</h2>

                            <div className="row">
                                <div className="col-3">
                                    <InputNumber
                                        value={numberValue}
                                        onChange={setNumberValue}
                                        className="mb-3"
                                        min={1}
                                        size="lg"
                                    />

                                    <InputNumber
                                        value={numberValue}
                                        onChange={setNumberValue}
                                        className="mb-3"
                                        min={1}
                                    />

                                    <InputNumber
                                        value={numberValue}
                                        onChange={setNumberValue}
                                        min={1}
                                        size="sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body card-body--padding--2">
                            <h2 className="card-title">{l10n("Buttons")}</h2>
                            <div className="row">
                                {l10n(['primary', 'secondary', 'light', 'muted'].map((style, index) => (
                                    <React.Fragment key={index}>
                                        <div className="col-lg-4">
                                            <p><strong>{l10n(`${titleCase(style)} Buttons`)}</strong></p>

                                            <div className="form-group">
                                                <button type="button" className={`btn btn-${style} btn-xl`}>{l10n("Extra Large")}</button>
                                                {l10n(' ')}
                                                <button type="button" className={`btn btn-${style} btn-xl btn-icon`}>
                                                    <Quickview16Svg />
                                                </button>
                                                {l10n(' ')}
                                            </div>
                                            <div className="form-group">
                                                <button type="button" className={`btn btn-${style} btn-lg`}>{l10n("Button Large")}</button>
                                                {l10n(' ')}
                                                <button type="button" className={`btn btn-${style} btn-lg btn-icon`}>
                                                    <Quickview16Svg />
                                                </button>
                                                {l10n(' ')}
                                            </div>
                                            <div className="form-group">
                                                <button type="button" className={`btn btn-${style}`}>{l10n("Button Normal")}</button>
                                                {l10n(' ')}
                                                <button type="button" className={`btn btn-${style} btn-icon`}>
                                                    <Quickview16Svg />
                                                </button>
                                                {l10n(' ')}
                                            </div>
                                            <div className="form-group">
                                                <button type="button" className={`btn btn-${style} btn-sm`}>{l10n("Button Small")}</button>
                                                {l10n(' ')}
                                                <button type="button" className={`btn btn-${style} btn-sm btn-icon`}>
                                                    <Quickview16Svg />
                                                </button>
                                                {l10n(' ')}
                                            </div>
                                            <div className="form-group">
                                                <button type="button" className={`btn btn-${style} btn-xs`}>{l10n("Extra Small")}</button>
                                                {l10n(' ')}
                                                <button type="button" className={`btn btn-${style} btn-xs btn-icon`}>
                                                    <Quickview16Svg />
                                                </button>
                                                {l10n(' ')}
                                            </div>

                                            <p><strong>{l10n("Loading State")}</strong></p>

                                            <div className="form-group">
                                                <button type="button" className={`btn btn-${style} btn-loading btn-xl`}>{l10n("Extra Large")}</button>
                                                {l10n(' ')}
                                                <button type="button" className={`btn btn-${style} btn-loading btn-xl btn-icon`}>
                                                    <Quickview16Svg />
                                                </button>
                                                {l10n(' ')}
                                            </div>
                                            <div className="form-group">
                                                <button type="button" className={`btn btn-${style} btn-loading btn-lg`}>{l10n("Button Large")}</button>
                                                {l10n(' ')}
                                                <button type="button" className={`btn btn-${style} btn-loading btn-lg btn-icon`}>
                                                    <Quickview16Svg />
                                                </button>
                                                {l10n(' ')}
                                            </div>
                                            <div className="form-group">
                                                <button type="button" className={`btn btn-${style} btn-loading`}>{l10n("Button Normal")}</button>
                                                {l10n(' ')}
                                                <button type="button" className={`btn btn-${style} btn-loading btn-icon`}>
                                                    <Quickview16Svg />
                                                </button>
                                                {l10n(' ')}
                                            </div>
                                            <div className="form-group">
                                                <button type="button" className={`btn btn-${style} btn-loading btn-sm`}>{l10n("Button Small")}</button>
                                                {l10n(' ')}
                                                <button type="button" className={`btn btn-${style} btn-loading btn-sm btn-icon`}>
                                                    <Quickview16Svg />
                                                </button>
                                                {l10n(' ')}
                                            </div>
                                            <div className="form-group">
                                                <button type="button" className={`btn btn-${style} btn-loading btn-xs`}>{l10n("Extra Small")}</button>
                                                {l10n(' ')}
                                                <button type="button" className={`btn btn-${style} btn-loading btn-xs btn-icon`}>
                                                    <Quickview16Svg />
                                                </button>
                                                {l10n(' ')}
                                            </div>

                                            <p><strong>{l10n("Disabled State")}</strong></p>

                                            <div className="form-group">
                                                <button type="button" className={`btn btn-${style} btn-lg`} disabled>{l10n("Button Large")}</button>
                                                {l10n(' ')}
                                                <button type="button" className={`btn btn-${style} btn-lg btn-icon`} disabled>
                                                    <Quickview16Svg />
                                                </button>
                                                {l10n(' ')}
                                            </div>
                                            <div className="form-group">
                                                <button type="button" className={`btn btn-${style}`} disabled>{l10n("Button Normal")}</button>
                                                {l10n(' ')}
                                                <button type="button" className={`btn btn-${style} btn-icon`} disabled>
                                                    <Quickview16Svg />
                                                </button>
                                                {l10n(' ')}
                                            </div>
                                            <div className="form-group">
                                                <button type="button" className={`btn btn-${style} btn-sm`} disabled>{l10n("Button Small")}</button>
                                                {l10n(' ')}
                                                <button type="button" className={`btn btn-${style} btn-sm btn-icon`} disabled>
                                                    <Quickview16Svg />
                                                </button>
                                                {l10n(' ')}
                                            </div>
                                            <div className="form-group">
                                                <button type="button" className={`btn btn-${style} btn-xs`} disabled>{l10n("Extra Small")}</button>
                                                {l10n(' ')}
                                                <button type="button" className={`btn btn-${style} btn-xs btn-icon`} disabled>
                                                    <Quickview16Svg />
                                                </button>
                                                {l10n(' ')}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )))}
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body card-body--padding--2">
                            <h2 className="card-title">{l10n("Fields")}</h2>

                            <div className="row">
                                <div className="col-lg-4">
                                    <p><strong>{l10n("Text Field")}</strong></p>

                                    <div className="form-group">
                                        <label htmlFor="text-default">{l10n("Default")}</label>
                                        <input
                                            id="text-default"
                                            type="text"
                                            className="form-control"
                                            placeholder={l10n("Placeholder")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="text-readonly">{l10n("Readonly")}</label>
                                        <input
                                            id="text-readonly"
                                            type="text"
                                            className="form-control"
                                            placeholder={l10n("Placeholder")}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="text-disabled">{l10n("Disabled")}</label>
                                        <input
                                            id="text-disabled"
                                            type="text"
                                            className="form-control"
                                            placeholder={l10n("Placeholder")}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="text-success">{l10n("Success")}</label>
                                        <input
                                            id="text-success"
                                            type="text"
                                            className="form-control is-valid"
                                            placeholder={l10n("Placeholder")}
                                        />
                                        <div className="valid-feedback">{l10n("Example invalid feedback text")}</div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="text-error">{l10n("Error")}</label>
                                        <input
                                            id="text-error"
                                            type="text"
                                            className="form-control is-invalid"
                                            placeholder={l10n("Placeholder")}
                                        />
                                        <div className="invalid-feedback">{l10n("Example invalid feedback text")}</div>
                                    </div>

                                    <p className="mt-5"><strong>{l10n("Text Field Sizes")}</strong></p>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder={l10n("Large")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={l10n("Normal")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder={l10n("Small")}
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <p><strong>{l10n("Select")}</strong></p>

                                    <div className="form-group">
                                        <label htmlFor="select-default">{l10n("Default")}</label>
                                        <select id="select-default" className="form-control">
                                            <option>{l10n("Select")}</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="select-disabled">{l10n("Disabled")}</label>
                                        <select id="select-disabled" className="form-control" disabled>
                                            <option>{l10n("Select")}</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="select-success">{l10n("Success")}</label>
                                        <select id="select-success" className="form-control is-valid">
                                            <option>{l10n("Select")}</option>
                                        </select>
                                        <div className="valid-feedback">{l10n("Example invalid feedback text")}</div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="select-error">{l10n("Error")}</label>
                                        <select id="select-error" className="form-control is-invalid">
                                            <option>{l10n("Select")}</option>
                                        </select>
                                        <div className="invalid-feedback">{l10n("Example invalid feedback text")}</div>
                                    </div>

                                    <p className="mt-5"><strong>{l10n("Select Sizes")}</strong></p>

                                    <div className="form-group">
                                        <select className="form-control form-control-lg">
                                            <option>{l10n("Large")}</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control">
                                            <option>{l10n("Normal")}</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control form-control-sm">
                                            <option>{l10n("Small")}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <p><strong>{l10n("Textarea")}</strong></p>

                                    <div className="form-group">
                                        <label htmlFor="area-default">{l10n("Default")}</label>
                                        <textarea
                                            id="area-default"
                                            rows={3}
                                            className="form-control"
                                            placeholder={l10n("Placeholder")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="area-readonly">{l10n("Readonly")}</label>
                                        <textarea
                                            id="area-readonly"
                                            rows={3}
                                            className="form-control"
                                            placeholder={l10n("Placeholder")}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="area-disabled">{l10n("Disabled")}</label>
                                        <textarea
                                            id="area-disabled"
                                            rows={3}
                                            className="form-control"
                                            placeholder={l10n("Placeholder")}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="area-success">{l10n("Success")}</label>
                                        <textarea
                                            id="area-success"
                                            rows={3}
                                            className="form-control is-valid"
                                            placeholder={l10n("Placeholder")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="area-error">{l10n("Error")}</label>
                                        <textarea
                                            id="area-error"
                                            rows={3}
                                            className="form-control is-invalid"
                                            placeholder={l10n("Placeholder")}
                                        />
                                    </div>

                                    <p className="mt-5"><strong>{l10n("Textarea Sizes")}</strong></p>
                                    <div className="form-group">
                                        <textarea
                                            rows={3}
                                            className="form-control form-control-lg"
                                            placeholder={l10n("Large")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            rows={3}
                                            className="form-control"
                                            placeholder={l10n("Normal")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            rows={3}
                                            className="form-control form-control-sm"
                                            placeholder={l10n("Small")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body card-body--padding--2">
                            <h2 className="card-title">{l10n("Status Badge")}</h2>

                            <div>
                                <StatusBadge
                                    type="success"
                                    text="In Stock"
                                    tooltip="In Stock"
                                    icon="success"
                                />
                                {l10n(' ')}
                                <StatusBadge
                                    type="failure"
                                    text="Out of Stock"
                                    tooltip="Out of Stock"
                                    icon="failure"
                                />
                                {l10n(' ')}
                                <StatusBadge
                                    type="warning"
                                    text="On Order"
                                    tooltip="On Order"
                                    icon="success"
                                />
                                {l10n(' ')}
                                <StatusBadge
                                    type="unknown"
                                    text="Unknown"
                                    tooltip="Unknown"
                                    icon="failure"
                                />
                                {l10n(' ')}
                            </div>
                            <div className="mt-3">
                                <StatusBadge
                                    type="success"
                                    text="In Stock"
                                    tooltip="In Stock"
                                />
                                {l10n(' ')}
                                <StatusBadge
                                    type="failure"
                                    text="Out of Stock"
                                    tooltip="Out of Stock"
                                />
                                {l10n(' ')}
                                <StatusBadge
                                    type="warning"
                                    text="On Order"
                                    tooltip="On Order"
                                />
                                {l10n(' ')}
                                <StatusBadge
                                    type="unknown"
                                    text="Unknown"
                                    tooltip="Unknown"
                                />
                                {l10n(' ')}
                            </div>
                            <div className="mt-3">
                                <StatusBadge
                                    type="success"
                                    tooltip="In Stock"
                                    icon="success"
                                />
                                {l10n(' ')}
                                <StatusBadge
                                    type="failure"
                                    tooltip="Out of Stock"
                                    icon="failure"
                                />
                                {l10n(' ')}
                                <StatusBadge
                                    type="warning"
                                    tooltip="On Order"
                                    icon="success"
                                />
                                {l10n(' ')}
                                <StatusBadge
                                    type="unknown"
                                    tooltip="Unknown"
                                    icon="failure"
                                />
                                {l10n(' ')}
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body card-body--padding--2">
                            <h2 className="card-title">{l10n("Tag Badge")}</h2>

                            <div>
                                <div className="tag-badge tag-badge--theme">{l10n("Theme")}</div>
                                <div className="tag-badge tag-badge--sale">{l10n("Sale")}</div>
                                <div className="tag-badge tag-badge--new">{l10n("New")}</div>
                                <div className="tag-badge tag-badge--hot">{l10n("Hot")}</div>
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
