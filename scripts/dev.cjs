const {spawn}=require('child_process');
const args=process.argv.slice(2).filter(x=>x!=='--strictPort').map(x=>x==='--host'?'-H':x==='--port'?'-p':x);
const child=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'dev',...args],{stdio:'inherit',env:{...process.env,NODE_OPTIONS:[process.env.NODE_OPTIONS, Number(process.versions.openssl.split('.')[0]) >= 3 ? '--openssl-legacy-provider' : ''].filter(Boolean).join(' ')}});
child.on('exit',code=>process.exit(code||0));
