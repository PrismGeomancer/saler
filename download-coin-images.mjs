import { readFile, writeFile } from 'node:fs/promises';
const { coins } = JSON.parse(await readFile(new URL('./assets/coins/sources.json', import.meta.url),'utf8'));
for (let i=0;i<coins.length;i+=4) {
  await Promise.all(coins.slice(i,i+4).map(async coin=>{
    const response=await fetch(coin.imageUrl,{signal:AbortSignal.timeout(25000)});
    if(!response.ok||!response.headers.get('content-type')?.startsWith('image/'))throw new Error(`Image download failed for ${coin.id}: ${response.status}`);
    const bytes=Buffer.from(await response.arrayBuffer());
    if(bytes.length<100)throw new Error(`Empty image for ${coin.id}`);
    await writeFile(new URL('./assets/coins/'+coin.file,import.meta.url),bytes);
    console.log(`${coin.id}: ${bytes.length} bytes`);
  }));
}
