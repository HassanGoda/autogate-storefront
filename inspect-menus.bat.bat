@echo off
cd /d C:\AutoGate\autogate-platform\autogate-storefront\Sources
python -c "files=['src/components/header/MainMenu.tsx','src/components/header/Departments.tsx','src/components/header/MegamenuLinks.tsx','src/components/header/Menu.tsx','src/components/mobile/MobileMenuLinks.tsx']; [print('===', f, '===\n', '\n'.join(f'{i+1}: {l}' for i,l in enumerate(open(f,'r',encoding='utf-8').read().splitlines()) if i<20 or 'title' in l)) for f in files]"
pause