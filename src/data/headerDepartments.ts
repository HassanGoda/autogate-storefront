// application
import { IDepartmentsLink } from '~/interfaces/departments-link';

const dataHeaderDepartments: IDepartmentsLink[] = [
    {
        title: 'Headlights & Lighting',
        url: '/catalog/products?filter_category=ag-lighting',
        submenu: {
            type: 'megamenu',
            size: 'xl',
            image: '/images/departments/departments-1.jpg',
            columns: [
                {
                    size: '1of5',
                    links: [
                        {
                            title: 'Body Parts',
                            url: '/catalog/products?filter_category=ag-body-parts',
                            links: [
                                { title: 'Bumpers', url: '/catalog/products?filter_category=ag-bumpers' },
                                { title: 'Hoods', url: '/catalog/products?filter_category=ag-hoods' },
                                { title: 'Grilles', url: '/catalog/products?filter_query=Grilles' },
                                { title: 'Fog Lights', url: '/catalog/products?filter_category=ag-fog-lights' },
                                { title: 'Door Handles', url: '/catalog/products?filter_category=ag-door-handles' },
                                { title: 'Car Covers', url: '/catalog/products?filter_query=Car%20Covers' },
                                { title: 'Tailgates', url: '/catalog/products?filter_query=Tailgates' },
                            ],
                        },
                        { title: 'Suspension', url: '/catalog/products?filter_category=ag-suspension' },
                        { title: 'Steering', url: '/catalog/products?filter_category=ag-steering' },
                        { title: 'Fuel Systems', url: '/catalog/products?filter_category=ag-fuel' },
                        { title: 'Transmission', url: '/catalog/products?filter_category=ag-transmission' },
                        { title: 'Air Filters', url: '/catalog/products?filter_category=ag-air-filters' },
                    ],
                },
                {
                    size: '1of5',
                    links: [
                        {
                            title: 'Headlights & Lighting',
                            url: '/catalog/products?filter_category=ag-lighting',
                            links: [
                                { title: 'Headlights', url: '/catalog/products?filter_category=ag-headlights' },
                                { title: 'Tail Lights', url: '/catalog/products?filter_category=ag-taillights' },
                                { title: 'Fog Lights', url: '/catalog/products?filter_category=ag-fog-lights' },
                                { title: 'Turn Signals', url: '/catalog/products?filter_category=ag-turn-signals' },
                                { title: 'Switches & Relays', url: '/catalog/products?filter_category=ag-relays-switches' },
                                { title: 'Corner Lights', url: '/catalog/products?filter_query=Corner%20Lights' },
                            ],
                        },
                        {
                            title: 'Brakes & Suspension',
                            url: '/catalog/products?filter_category=ag-brakes',
                            links: [
                                { title: 'Brake Discs', url: '/catalog/products?filter_category=ag-brake-discs' },
                                { title: 'Wheel Hubs', url: '/catalog/products?filter_category=ag-hubs' },
                                { title: 'Air Suspension', url: '/catalog/products?filter_category=ag-air-suspension' },
                                { title: 'Ball Joints', url: '/catalog/products?filter_category=ag-ball-joints' },
                                { title: 'Brake Pad Sets', url: '/catalog/products?filter_category=ag-brake-pads' },
                            ],
                        },
                    ],
                },
                {
                    size: '1of5',
                    links: [
                        {
                            title: 'Interior Parts',
                            url: '/catalog/products?filter_category=ag-interior',
                            links: [
                                { title: 'Floor Mats', url: '/catalog/products?filter_category=ag-floor-mats' },
                                { title: 'Gauges', url: '/catalog/products?filter_category=ag-gauges' },
                                { title: 'Consoles & Organizers', url: '/catalog/products?filter_category=ag-consoles' },
                                { title: 'Mobile Electronics', url: '/catalog/products?filter_query=Mobile%20Electronics' },
                                { title: 'Steering Wheels', url: '/catalog/products?filter_category=ag-steering-wheels' },
                                { title: 'Cargo Accessories', url: '/catalog/products?filter_query=Cargo%20Accessories' },
                            ],
                        },
                        {
                            title: 'Engine & Drivetrain',
                            url: '/catalog/products?filter_category=ag-engine-parts',
                            links: [
                                { title: 'Air Filters', url: '/catalog/products?filter_category=ag-air-filters' },
                                { title: 'Oxygen Sensors', url: '/catalog/products?filter_category=ag-o2-sensors' },
                                { title: 'Heating', url: '/catalog/products?filter_query=Heating' },
                                { title: 'Exhaust', url: '/catalog/products?filter_category=ag-exhaust' },
                                { title: 'Cranks & Pistons', url: '/catalog/products?filter_query=Cranks%20%26%20Pistons' },
                            ],
                        },
                    ],
                },
                {
                    size: '1of5',
                    links: [
                        {
                            title: 'Tools & Garage',
                            url: '/catalog/products?filter_category=ag-tools',
                            links: [
                                { title: 'Repair Manuals', url: '/catalog/products?filter_query=Repair%20Manuals' },
                                { title: 'Car Care', url: '/catalog/products?filter_query=Car%20Care' },
                                { title: 'Code Readers', url: '/catalog/products?filter_query=Code%20Readers' },
                                { title: 'Tool Boxes', url: '/catalog/products?filter_query=Tool%20Boxes' },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        title: 'Interior Parts',
        url: '/catalog/products?filter_category=ag-interior',
        submenu: {
            type: 'megamenu',
            size: 'lg',
            image: '/images/departments/departments-4.jpg',
            columns: [
                {
                    size: 3,
                    links: [
                        {
                            title: 'Body Parts',
                            url: '/catalog/products?filter_category=ag-body-parts',
                            links: [
                                { title: 'Bumpers', url: '/catalog/products?filter_category=ag-bumpers' },
                                { title: 'Hoods', url: '/catalog/products?filter_category=ag-hoods' },
                                { title: 'Grilles', url: '/catalog/products?filter_query=Grilles' },
                                { title: 'Fog Lights', url: '/catalog/products?filter_category=ag-fog-lights' },
                                { title: 'Door Handles', url: '/catalog/products?filter_category=ag-door-handles' },
                                { title: 'Car Covers', url: '/catalog/products?filter_query=Car%20Covers' },
                                { title: 'Tailgates', url: '/catalog/products?filter_query=Tailgates' },
                            ],
                        },
                        { title: 'Suspension', url: '/catalog/products?filter_category=ag-suspension' },
                        { title: 'Steering', url: '/catalog/products?filter_category=ag-steering' },
                        { title: 'Fuel Systems', url: '/catalog/products?filter_category=ag-fuel' },
                        { title: 'Transmission', url: '/catalog/products?filter_category=ag-transmission' },
                        { title: 'Air Filters', url: '/catalog/products?filter_category=ag-air-filters' },
                    ],
                },
                {
                    size: 3,
                    links: [
                        {
                            title: 'Headlights & Lighting',
                            url: '/catalog/products?filter_category=ag-lighting',
                            links: [
                                { title: 'Headlights', url: '/catalog/products?filter_category=ag-headlights' },
                                { title: 'Tail Lights', url: '/catalog/products?filter_category=ag-taillights' },
                                { title: 'Fog Lights', url: '/catalog/products?filter_category=ag-fog-lights' },
                                { title: 'Turn Signals', url: '/catalog/products?filter_category=ag-turn-signals' },
                                { title: 'Switches & Relays', url: '/catalog/products?filter_category=ag-relays-switches' },
                                { title: 'Corner Lights', url: '/catalog/products?filter_query=Corner%20Lights' },
                            ],
                        },
                        {
                            title: 'Brakes & Suspension',
                            url: '/catalog/products?filter_category=ag-brakes',
                            links: [
                                { title: 'Brake Discs', url: '/catalog/products?filter_category=ag-brake-discs' },
                                { title: 'Wheel Hubs', url: '/catalog/products?filter_category=ag-hubs' },
                                { title: 'Air Suspension', url: '/catalog/products?filter_category=ag-air-suspension' },
                                { title: 'Ball Joints', url: '/catalog/products?filter_category=ag-ball-joints' },
                                { title: 'Brake Pad Sets', url: '/catalog/products?filter_category=ag-brake-pads' },
                            ],
                        },
                    ],
                },
                {
                    size: 3,
                    links: [
                        {
                            title: 'Interior Parts',
                            url: '/catalog/products?filter_category=ag-interior',
                            links: [
                                { title: 'Floor Mats', url: '/catalog/products?filter_category=ag-floor-mats' },
                                { title: 'Gauges', url: '/catalog/products?filter_category=ag-gauges' },
                                { title: 'Consoles & Organizers', url: '/catalog/products?filter_category=ag-consoles' },
                                { title: 'Mobile Electronics', url: '/catalog/products?filter_query=Mobile%20Electronics' },
                                { title: 'Steering Wheels', url: '/catalog/products?filter_category=ag-steering-wheels' },
                                { title: 'Cargo Accessories', url: '/catalog/products?filter_query=Cargo%20Accessories' },
                            ],
                        },
                    ],
                },
                {
                    size: 3,
                    links: [
                        {
                            title: 'Tools & Garage',
                            url: '/catalog/products?filter_category=ag-tools',
                            links: [
                                { title: 'Repair Manuals', url: '/catalog/products?filter_query=Repair%20Manuals' },
                                { title: 'Car Care', url: '/catalog/products?filter_query=Car%20Care' },
                                { title: 'Code Readers', url: '/catalog/products?filter_query=Code%20Readers' },
                                { title: 'Tool Boxes', url: '/catalog/products?filter_query=Tool%20Boxes' },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        title: 'Switches & Relays',
        url: '/catalog/products?filter_category=ag-relays-switches',
        submenu: {
            type: 'megamenu',
            size: 'md',
            columns: [
                {
                    size: 4,
                    links: [
                        {
                            title: 'Body Parts',
                            url: '/catalog/products?filter_category=ag-body-parts',
                            links: [
                                { title: 'Bumpers', url: '/catalog/products?filter_category=ag-bumpers' },
                                { title: 'Hoods', url: '/catalog/products?filter_category=ag-hoods' },
                                { title: 'Grilles', url: '/catalog/products?filter_query=Grilles' },
                                { title: 'Fog Lights', url: '/catalog/products?filter_category=ag-fog-lights' },
                                { title: 'Door Handles', url: '/catalog/products?filter_category=ag-door-handles' },
                                { title: 'Car Covers', url: '/catalog/products?filter_query=Car%20Covers' },
                                { title: 'Tailgates', url: '/catalog/products?filter_query=Tailgates' },
                            ],
                        },
                        { title: 'Suspension', url: '/catalog/products?filter_category=ag-suspension' },
                        { title: 'Steering', url: '/catalog/products?filter_category=ag-steering' },
                        { title: 'Fuel Systems', url: '/catalog/products?filter_category=ag-fuel' },
                        { title: 'Transmission', url: '/catalog/products?filter_category=ag-transmission' },
                        { title: 'Air Filters', url: '/catalog/products?filter_category=ag-air-filters' },
                    ],
                },
                {
                    size: 4,
                    links: [
                        {
                            title: 'Headlights & Lighting',
                            url: '/catalog/products?filter_category=ag-lighting',
                            links: [
                                { title: 'Headlights', url: '/catalog/products?filter_category=ag-headlights' },
                                { title: 'Tail Lights', url: '/catalog/products?filter_category=ag-taillights' },
                                { title: 'Fog Lights', url: '/catalog/products?filter_category=ag-fog-lights' },
                                { title: 'Turn Signals', url: '/catalog/products?filter_category=ag-turn-signals' },
                                { title: 'Switches & Relays', url: '/catalog/products?filter_category=ag-relays-switches' },
                                { title: 'Corner Lights', url: '/catalog/products?filter_query=Corner%20Lights' },
                            ],
                        },
                        {
                            title: 'Brakes & Suspension',
                            url: '/catalog/products?filter_category=ag-brakes',
                            links: [
                                { title: 'Brake Discs', url: '/catalog/products?filter_category=ag-brake-discs' },
                                { title: 'Wheel Hubs', url: '/catalog/products?filter_category=ag-hubs' },
                                { title: 'Air Suspension', url: '/catalog/products?filter_category=ag-air-suspension' },
                                { title: 'Ball Joints', url: '/catalog/products?filter_category=ag-ball-joints' },
                                { title: 'Brake Pad Sets', url: '/catalog/products?filter_category=ag-brake-pads' },
                            ],
                        },
                    ],
                },
                {
                    size: 4,
                    links: [
                        {
                            title: 'Interior Parts',
                            url: '/catalog/products?filter_category=ag-interior',
                            links: [
                                { title: 'Floor Mats', url: '/catalog/products?filter_category=ag-floor-mats' },
                                { title: 'Gauges', url: '/catalog/products?filter_category=ag-gauges' },
                                { title: 'Consoles & Organizers', url: '/catalog/products?filter_category=ag-consoles' },
                                { title: 'Mobile Electronics', url: '/catalog/products?filter_query=Mobile%20Electronics' },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        title: 'Tires & Wheels',
        url: '/catalog/products?filter_category=ag-tires',
        submenu: {
            type: 'megamenu',
            size: 'nl',
            image: '/images/products/product-4-1.jpg',
            columns: [
                {
                    size: 6,
                    links: [
                        {
                            title: 'Body Parts',
                            url: '/catalog/products?filter_category=ag-body-parts',
                            links: [
                                { title: 'Bumpers', url: '/catalog/products?filter_category=ag-bumpers' },
                                { title: 'Hoods', url: '/catalog/products?filter_category=ag-hoods' },
                                { title: 'Grilles', url: '/catalog/products?filter_query=Grilles' },
                                { title: 'Fog Lights', url: '/catalog/products?filter_category=ag-fog-lights' },
                                { title: 'Door Handles', url: '/catalog/products?filter_category=ag-door-handles' },
                                { title: 'Car Covers', url: '/catalog/products?filter_query=Car%20Covers' },
                                { title: 'Tailgates', url: '/catalog/products?filter_query=Tailgates' },
                            ],
                        },
                        { title: 'Suspension', url: '/catalog/products?filter_category=ag-suspension' },
                        { title: 'Steering', url: '/catalog/products?filter_category=ag-steering' },
                        { title: 'Fuel Systems', url: '/catalog/products?filter_category=ag-fuel' },
                        { title: 'Transmission', url: '/catalog/products?filter_category=ag-transmission' },
                        { title: 'Air Filters', url: '/catalog/products?filter_category=ag-air-filters' },
                    ],
                },
                {
                    size: 6,
                    links: [
                        {
                            title: 'Headlights & Lighting',
                            url: '/catalog/products?filter_category=ag-lighting',
                            links: [
                                { title: 'Headlights', url: '/catalog/products?filter_category=ag-headlights' },
                                { title: 'Tail Lights', url: '/catalog/products?filter_category=ag-taillights' },
                                { title: 'Fog Lights', url: '/catalog/products?filter_category=ag-fog-lights' },
                                { title: 'Turn Signals', url: '/catalog/products?filter_category=ag-turn-signals' },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        title: 'Tools & Garage',
        url: '/catalog/products?filter_category=ag-tools',
        submenu: {
            type: 'megamenu',
            size: 'sm',
            columns: [
                {
                    size: 12,
                    links: [
                        {
                            title: 'Body Parts',
                            url: '/catalog/products?filter_category=ag-body-parts',
                            links: [
                                { title: 'Bumpers', url: '/catalog/products?filter_category=ag-bumpers' },
                                { title: 'Hoods', url: '/catalog/products?filter_category=ag-hoods' },
                                { title: 'Grilles', url: '/catalog/products?filter_query=Grilles' },
                                { title: 'Fog Lights', url: '/catalog/products?filter_category=ag-fog-lights' },
                                { title: 'Door Handles', url: '/catalog/products?filter_category=ag-door-handles' },
                                { title: 'Car Covers', url: '/catalog/products?filter_query=Car%20Covers' },
                                { title: 'Tailgates', url: '/catalog/products?filter_query=Tailgates' },
                            ],
                        },
                        { title: 'Suspension', url: '/catalog/products?filter_category=ag-suspension' },
                        { title: 'Steering', url: '/catalog/products?filter_category=ag-steering' },
                        { title: 'Fuel Systems', url: '/catalog/products?filter_category=ag-fuel' },
                        { title: 'Transmission', url: '/catalog/products?filter_category=ag-transmission' },
                        { title: 'Air Filters', url: '/catalog/products?filter_category=ag-air-filters' },
                    ],
                },
            ],
        },
    },
    { title: 'Clutches', url: '/catalog/products?filter_category=ag-clutch' },
    { title: 'Fuel Systems', url: '/catalog/products?filter_category=ag-fuel' },
    { title: 'Steering', url: '/catalog/products?filter_category=ag-steering' },
    { title: 'Suspension', url: '/catalog/products?filter_category=ag-suspension' },
    { title: 'Body Parts', url: '/catalog/products?filter_category=ag-body-parts' },
    { title: 'Transmission', url: '/catalog/products?filter_category=ag-transmission' },
    { title: 'Air Filters', url: '/catalog/products?filter_category=ag-air-filters' },
];

export default dataHeaderDepartments;
