const {spawnSync}=require('child_process');
const result=spawnSync(process.execPath,[require.resolve('next/dist/bin/next'),'build','--no-lint',...process.argv.slice(2)],{stdio:'inherit',env:{...process.env,NODE_OPTIONS:[process.env.NODE_OPTIONS, Number(process.versions.openssl.split('.')[0]) >= 3 ? '--openssl-legacy-provider' : ''].filter(Boolean).join(' ')}});
if (result.error) {console.error(result.error);process.exit(1);}
process.exit(result.status === null ? 1 : result.status);
