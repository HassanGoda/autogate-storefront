const assert=require('assert'),fs=require('fs'),path=require('path'),ts=require('typescript'),Module=require('module');
const {IntlMessageFormat}=require('intl-messageformat');const root=path.resolve(__dirname,'..');
const en=require('../public/i18n/en.json'),ar=require('../public/i18n/ar.json'),catalog=require('../src/services/i18n/content-catalog.json');
assert.deepStrictEqual(Object.keys(en).sort(),Object.keys(ar).sort());
for(const [locale,messages] of Object.entries({en,ar}))for(const [id,message] of Object.entries(messages)){assert.equal(typeof message,'string',id);new IntlMessageFormat(message,locale);}
assert(!fs.existsSync(path.join(root,'public/i18n/ru.json')));assert(/locales: \['en', 'ar'\]/.test(fs.readFileSync(path.join(root,'next.config.js'),'utf8')));
assert(!/locale: 'ru'|name: 'RTL'/.test(fs.readFileSync(path.join(root,'src/data/shopLanguages.ts'),'utf8')));
for(const [key,entry] of Object.entries(catalog)){assert(entry.en&&entry.ar,`Incomplete content: ${key}`);}
const filename=path.join(root,'src/services/i18n/localize.ts');const code=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2019,module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
const mod=new Module(filename,module);mod.filename=filename;mod.paths=Module._nodeModulePaths(path.dirname(filename));mod._compile(code,filename);const {translateText,translateHtml}=mod.exports;
assert.equal(translateText('Shop','ar'),'قطع الغيار');assert.equal(translateText(' Home ','ar'),' الرئيسية ');assert.equal(translateText('BDX-750Z370-S','ar'),'BDX-750Z370-S');
assert(translateHtml('When Buying Parts <br>With Installation','ar').includes('<br>'));assert(translateText('2019-05-21','ar').includes('مايو'));
assert(!/[А-Яа-я]/.test(JSON.stringify(ar)+JSON.stringify(catalog)));
for(const count of [0,1,2,3,11,100])for(const id of ['TEXT_PRODUCTS_COUNT','TEXT_RATING_LABEL','TEXT_STARS','TEXT_ORDER_TOTAL','TEXT_SHOWING_PRODUCTS']){
 const message=new IntlMessageFormat(ar[id],'ar');const value=message.format({count,reviews:count,stars:count,total:count,quantity:count,from:1,to:count});assert(!/product|review|item|star/i.test(String(value)),id);
}
console.log(`PASS: ${Object.keys(ar).length} paired UI messages, ${Object.keys(catalog).length} bilingual content entries, valid ICU syntax, two supported locales, date/HTML/SKU/plural checks.`);
