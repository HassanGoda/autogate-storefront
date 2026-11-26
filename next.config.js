// noinspection JSUnusedGlobalSymbols
module.exports = {
    env: {
        basePath: process.env.BASE_PATH || '',
    },
    basePath: process.env.BASE_PATH || '',
    async redirects() {
        return [
            { source: '/demo/blog/:path*', destination: '/#company-updates', permanent: false },
            { source: '/demo/shop/:path*', destination: '/catalog/products', permanent: false },
            { source: '/demo/site/contact-us-v1', destination: '/contact-us', permanent: false },
            { source: '/demo/site/contact-us-v2', destination: '/contact-us', permanent: false },
            { source: '/demo/:path*', destination: '/', permanent: false },
        ];
    },
    i18n: {
        locales: ['en', 'ar'],
        defaultLocale: 'en',
    },
};
