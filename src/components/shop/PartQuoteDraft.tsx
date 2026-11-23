import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useGarageCurrent } from '~/store/garage/garageHooks';

export default function PartQuoteDraft({ term }: { term: string }) {
    const ar = useIntl().locale === 'ar';
    const vehicle = useGarageCurrent();
    const [status, setStatus] = useState('');
    const vehicleName = vehicle ? [vehicle.make, vehicle.model, vehicle.year].join(' ') : '';

    function download(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const fields = new FormData(event.currentTarget);
        const part = String(fields.get('part') || '').trim();
        const car = String(fields.get('vehicle') || '').trim();
        if (!part || !car) {
            setStatus(ar ? 'أدخل اسم القطعة وبيانات السيارة.' : 'Enter the part and vehicle details.');
            return;
        }
        const content = JSON.stringify({ type: 'AutoGate quote draft', part, vehicle: car, manufacturerPartNumber: String(fields.get('number') || '').trim(), quantity: Number(fields.get('quantity')), notes: String(fields.get('notes') || '').trim() }, null, 2);
        const file = URL.createObjectURL(new Blob([content], { type: 'application/json' }));
        const link = document.createElement('a');
        link.href = file;
        link.download = 'autogate-quote-draft.json';
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(file), 1000);
        setStatus(ar ? 'تم تنزيل المسودة. يمكنك مشاركتها مع المورد.' : 'Draft downloaded. You can share it with your supplier.');
    }

    return (
        <details className="card text-start p-3 mt-3">
            <summary>{ar ? 'جهّز طلب تسعير قطعة' : 'Prepare a parts quote request'}</summary>
            <p className="mt-2">{ar ? 'نزّل تفاصيل الطلب لمشاركتها مع المورد.' : 'Download the request details to share with your supplier.'}</p>
            <form onSubmit={download} key={term + vehicleName}>
                <label className="d-block mb-2">{ar ? 'اسم القطعة' : 'Part name'}
                    <input className="form-control" name="part" defaultValue={term} required maxLength={180} />
                </label>
                <label className="d-block mb-2">{ar ? 'الشركة والطراز والسنة' : 'Make, model and year'}
                    <input className="form-control" name="vehicle" defaultValue={vehicleName} required maxLength={180} />
                </label>
                <label className="d-block mb-2">{ar ? 'رقم القطعة إن توفر' : 'Part number, if available'}
                    <input className="form-control" name="number" dir="ltr" maxLength={80} />
                </label>
                <label className="d-block mb-2">{ar ? 'الكمية' : 'Quantity'}
                    <input className="form-control" name="quantity" type="number" min={1} max={1000} defaultValue={1} required />
                </label>
                <label className="d-block mb-2">{ar ? 'ملاحظات عن القطعة' : 'Part notes'}
                    <textarea className="form-control" name="notes" rows={2} maxLength={500} />
                </label>
                <button type="submit" className="btn btn-primary btn-sm">{ar ? 'تنزيل مسودة الطلب' : 'Download quote draft'}</button>
                <p className="mt-2 mb-0" role="status">{status}</p>
            </form>
        </details>
    );
}
