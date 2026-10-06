import { mkdir, copyFile, cp } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
await copyFile('index.html','dist/index.html');
await cp('assets','dist/assets',{recursive:true});
console.log('SALER static site ready in dist/');
