import json
import os
import shutil

base_dir = r"C:\AutoGate\autogate-platform\autogate-storefront\Sources"

# 1. تحديث مفاتيح اختيار المركبة في public/i18n/ar.json
ar_path = os.path.join(base_dir, "public", "i18n", "ar.json")
ar_data = json.load(open(ar_path, "r", encoding="utf-8"))

vehicle_ar_keys = {
    "INPUT_VEHICLE_YEAR_PLACEHOLDER": "اختر سنة الصنع",
    "INPUT_VEHICLE_BRAND_PLACEHOLDER": "اختر الشركة المصنّعة",
    "INPUT_VEHICLE_MODEL_PLACEHOLDER": "اختر الموديل",
    "INPUT_VEHICLE_ENGINE_PLACEHOLDER": "اختر سعة المحرك",
    "TEXT_SELECT_YEAR": "اختر سنة الصنع",
    "TEXT_SELECT_BRAND": "اختر الشركة المصنّعة",
    "TEXT_SELECT_MODEL": "اختر الموديل",
    "TEXT_SELECT_ENGINE": "اختر سعة المحرك",
}
ar_data.update(vehicle_ar_keys)
with open(ar_path, "w", encoding="utf-8") as f:
    json.dump(ar_data, f, ensure_ascii=False, indent=2)
print("1. Updated vehicle placeholders in ar.json")

# 2. تحديث قاعدة بيانات المركبات في vehicles.ts بالسيارات الشائعة في السوق السعودي (ثنائية الاسم عربي / إنجليزي للوضوح)
vehicles_path = os.path.join(base_dir, "src", "fake-server", "database", "vehicles.ts")
shutil.copy2(vehicles_path, vehicles_path + ".bak")

vehicles_code = """// application
import { IVehicle } from '~/interfaces/vehicle';
import { makeIdGenerator } from '~/fake-server/utils';
import { IVehicleDef } from '~/fake-server/interfaces/vehicle-def';

const getNextId = makeIdGenerator();

function makeVehicles(defs: IVehicleDef[]): IVehicle[] {
    return defs.map((def) => {
        const range = typeof def.year === 'number' ? [def.year, def.year] : def.year;
        const years = [];

        for (let i = range[0]; i <= range[1]; i += 1) {
            years.push(i);
        }

        return years.map((year) => ({
            id: getNextId(),
            year,
            make: def.make,
            model: def.model,
            engine: def.engine,
        }));
    }).reduce((acc, v) => [...acc, ...v], []);
}

const vehiclesDef: IVehicleDef[] = [
    // تويوتا - Toyota
    { year: [2015, 2026], make: 'تويوتا | Toyota', model: 'كامري (Camry)', engine: '2.5L 4-Cylinder' },
    { year: [2015, 2026], make: 'تويوتا | Toyota', model: 'كورولا (Corolla)', engine: '1.8L / 2.0L 4-Cylinder' },
    { year: [2015, 2026], make: 'تويوتا | Toyota', model: 'لاندكروزر (Land Cruiser)', engine: '3.5L V6 Twin-Turbo / 4.6L V8' },
    { year: [2015, 2026], make: 'تويوتا | Toyota', model: 'هايلكس (Hilux)', engine: '2.7L Petrol / 2.8L Diesel' },
    { year: [2016, 2026], make: 'تويوتا | Toyota', model: 'راف فور (RAV4)', engine: '2.5L 4-Cylinder / Hybrid' },

    // هيونداي - Hyundai
    { year: [2015, 2026], make: 'هيونداي | Hyundai', model: 'سوناتا (Sonata)', engine: '2.5L 4-Cylinder' },
    { year: [2015, 2026], make: 'هيونداي | Hyundai', model: 'إلنترا (Elantra)', engine: '1.6L / 2.0L 4-Cylinder' },
    { year: [2016, 2026], make: 'هيونداي | Hyundai', model: 'توسان (Tucson)', engine: '2.0L / 2.4L 4-Cylinder' },
    { year: [2016, 2026], make: 'هيونداي | Hyundai', model: 'أكسنت (Accent)', engine: '1.4L / 1.6L 4-Cylinder' },

    // نيسان - Nissan
    { year: [2015, 2026], make: 'نيسان | Nissan', model: 'باترول (Patrol)', engine: '4.0L V6 / 5.6L V8' },
    { year: [2015, 2026], make: 'نيسان | Nissan', model: 'ألتيما (Altima)', engine: '2.5L 4-Cylinder' },
    { year: [2015, 2026], make: 'نيسان | Nissan', model: 'صني (Sunny)', engine: '1.5L / 1.6L 4-Cylinder' },
    { year: [2016, 2026], make: 'نيسان | Nissan', model: 'إكستريل (X-Trail)', engine: '2.5L 4-Cylinder' },

    // فورد - Ford
    { year: [2015, 2026], make: 'فورد | Ford', model: 'تورس (Taurus)', engine: '2.0L EcoBoost / 3.5L V6' },
    { year: [2015, 2026], make: 'فورد | Ford', model: 'إكسبلورر (Explorer)', engine: '2.3L EcoBoost / 3.5L V6' },
    { year: [2015, 2026], make: 'فورد | Ford', model: 'إكسبيديشن (Expedition)', engine: '3.5L V6 EcoBoost' },
    { year: [2015, 2026], make: 'فورد | Ford', model: 'F-150', engine: '3.5L EcoBoost / 5.0L V8' },

    // كيا - Kia
    { year: [2015, 2026], make: 'كيا | Kia', model: 'K5 / أوبتيما (Optima)', engine: '2.0L / 2.5L 4-Cylinder' },
    { year: [2015, 2026], make: 'كيا | Kia', model: 'سبورتاج (Sportage)', engine: '2.0L / 2.4L 4-Cylinder' },
    { year: [2015, 2026], make: 'كيا | Kia', model: 'سيراتو (Cerato)', engine: '1.6L / 2.0L 4-Cylinder' },

    // لكزس - Lexus
    { year: [2015, 2026], make: 'لكزس | Lexus', model: 'ES 350', engine: '3.5L V6' },
    { year: [2015, 2026], make: 'لكزس | Lexus', model: 'LX 570 / LX 600', engine: '5.7L V8 / 3.5L V6 Twin-Turbo' },
    { year: [2016, 2026], make: 'لكزس | Lexus', model: 'RX 350', engine: '3.5L V6' },

    // شيفروليه وجي إم سي - Chevrolet & GMC
    { year: [2015, 2026], make: 'شيفروليه | Chevrolet', model: 'تاهو (Tahoe)', engine: '5.3L V8 / 6.2L V8' },
    { year: [2015, 2026], make: 'شيفروليه | Chevrolet', model: 'سلفرادو (Silverado)', engine: '5.3L V8 / 6.2L V8' },
    { year: [2015, 2026], make: 'جي إم سي | GMC', model: 'يوكن (Yukon)', engine: '5.3L V8 / 6.2L V8' },
    { year: [2015, 2026], make: 'جي إم سي | GMC', model: 'سييرا (Sierra)', engine: '5.3L V8 / 6.2L V8' },

    // هوندا ومازدا - Honda & Mazda
    { year: [2015, 2026], make: 'هوندا | Honda', model: 'أكورد (Accord)', engine: '1.5L Turbo / 2.0L' },
    { year: [2015, 2026], make: 'هوندا | Honda', model: 'سيفيك (Civic)', engine: '1.5L Turbo / 2.0L' },
    { year: [2015, 2026], make: 'مازدا | Mazda', model: 'مازدا 6 (Mazda6)', engine: '2.5L Skyactiv-G' },
    { year: [2016, 2026], make: 'مازدا | Mazda', model: 'CX-9', engine: '2.5L Turbo' },

    // السيارات الألمانية - Mercedes & BMW
    { year: [2015, 2026], make: 'مرسيدس بنز | Mercedes-Benz', model: 'E-Class (E200 / E300)', engine: '2.0L Turbo' },
    { year: [2015, 2026], make: 'مرسيدس بنز | Mercedes-Benz', model: 'S-Class (S450 / S500)', engine: '3.0L / 4.0L V8' },
    { year: [2015, 2026], make: 'بي إم دبليو | BMW', model: 'الفئة الخامسة (5 Series)', engine: '2.0L / 3.0L TwinPower Turbo' },
    { year: [2015, 2026], make: 'بي إم دبليو | BMW', model: 'X5', engine: '3.0L / 4.4L V8' },

    // السيارات الصينية - Changan & Geely
    { year: [2018, 2026], make: 'شانجان | Changan', model: 'CS95 / CS85', engine: '2.0L Turbo' },
    { year: [2018, 2026], make: 'جيلي | Geely', model: 'كولراي (Coolray) / مونجارو (Monjaro)', engine: '1.5L / 2.0L Turbo' },
];

export const vehicles: IVehicle[] = makeVehicles(vehiclesDef);

export const userVehicles: IVehicle[] = vehicles.slice(0, 3);
"""

with open(vehicles_path, "w", encoding="utf-8") as f:
    f.write(vehicles_code)
print("2. Updated vehicles.ts with Saudi market car brands, models, and engines (2015-2026)")
print("DONE! Refresh browser with Ctrl+F5.")