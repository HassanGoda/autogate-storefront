import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import models from '~/data/autogate-vehicles.json';
import VehicleMakeLogo from './VehicleMakeLogo';
import { translateText } from '~/services/i18n/localize';

interface Props {
    make: string;
    brands?: boolean;
    value: string;
    options: string[];
    placeholder: string;
    disabled: boolean;
    onChange: (model: string) => void;
}

const arabicModels: Record<string, string> = {
    Accent: 'أكسنت', Accord: 'أكورد', 'Accord(not)': 'أكورد (not)',
    Alsvin: 'ألسفن', Altima: 'ألتيما', Aqua: 'أكوا', Arkana: 'أركانا',
    Attrage: 'أتراج', Avalon: 'أفالون', Avante: 'أفانتي', Avanza: 'أفانزا',
    Azera: 'أزيرا', AZKARRA: 'أزكارا', Baleno: 'بالينو', BOXER: 'بوكسر',
    Camaro: 'كامارو', Camry: 'كامري', Captiva: 'كابتيفا', Captur: 'كابتشر',
    CARENS: 'كارينز', Carnival: 'كرنفال', CARRY: 'كاري', CERATO: 'سيراتو',
    Charger: 'تشارجر', Cherokee: 'شيروكي', Ciaz: 'سياز', City: 'سيتي',
    Cityray: 'سيتي راي', Coaster: 'كوستر', Coolray: 'كول راي', Cooper: 'كوبر',
    Corolla: 'كورولا', Creta: 'كريتا', Crown: 'كراون', Cruze: 'كروز',
    Dashing: 'داشينغ', DEFENDER: 'ديفندر', Destinator: 'ديستينيتر',
    ACADIA: 'أكاديا', ALLURE: 'ألور', PLUS: 'بلس', PRO: 'برو', MAX: 'ماكس',
    'Bestune Mini EV': 'بيستون ميني EV', 'CAPTAIN V PASSENGER VAN': 'كابتن V فان ركاب',
    'A08 HIGH ROOF': 'A08 سقف مرتفع', '735i M KIT': '735i حزمة M',
};

function modelArabic(model: string) {
    return arabicModels[model] || model.replace(/Arrizo|ALLURE|PLUS|PRO|MAX/gi, (word) =>
        word.toLowerCase() === 'arrizo' ? 'أريزو' : arabicModels[word.toUpperCase()],
    );
}

export default function VehicleModelOptions({ make, value, options, placeholder, disabled, onChange, brands = false }: Props) {
    const { locale } = useIntl();
    const details = useRef<HTMLDetailsElement>(null);
    const makeArabic = (name: string) => models.find((row) => row.make.toLowerCase() === name.toLowerCase())?.makeAr || translateText(name, 'ar');
    const renderName = (model: string) => {
        const arabic = brands ? makeArabic(model) : [makeArabic(make), modelArabic(translateText(model, 'ar'))].filter(Boolean).join(' ');
        const english = brands ? model : [make, model].filter(Boolean).join(' ');
        return <><bdi dir="rtl" lang="ar">{arabic}</bdi> <span aria-hidden="true">·</span> <bdi dir="ltr" lang="en">{english}</bdi></>;
    };

    useEffect(() => {
        function closeOutside(event: PointerEvent) {
            if (event.target instanceof Node && !details.current?.contains(event.target)) {
                details.current?.removeAttribute('open');
            }
        }
        document.addEventListener('pointerdown', closeOutside);
        return () => document.removeEventListener('pointerdown', closeOutside);
    }, []);

    function pick(model: string) {
        onChange(model);
        details.current?.removeAttribute('open');
        details.current?.querySelector('summary')?.focus();
    }

    if (disabled) return <input className="form-control" disabled value={placeholder} aria-label={placeholder} />;

    return (
        <details className="vehicle-model-options" ref={details} onKeyDown={(event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                details.current?.removeAttribute('open');
                details.current?.querySelector('summary')?.focus();
            }
        }}>
            <summary className="form-control">
                {value === 'none' ? placeholder : <><VehicleMakeLogo make={brands ? value : make} /> {renderName(value)}</>}
            </summary>
            <div className="vehicle-model-options__list" aria-label={locale === 'ar' ? (brands ? 'شركات السيارات' : 'طرازات السيارات') : (brands ? 'Manufacturers' : 'Vehicle models')}>
                <button type="button" onClick={() => pick('none')}>{placeholder}</button>
                {options.map((model) => (
                    <button type="button" key={model} onClick={() => pick(model)} aria-pressed={value === model}>
                        <VehicleMakeLogo make={brands ? model : make} /> <span>{renderName(model)}</span>
                    </button>
                ))}
            </div>
        </details>
    );
}
