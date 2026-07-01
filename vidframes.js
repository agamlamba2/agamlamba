const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1000, height: 640 } });
  const vid = 'file:///root/.claude/uploads/14a41a77-f045-5ee0-a776-bf84974baed2/5697b502-robinnoguier.com.mp4';
  await page.setContent(`<body style="margin:0;background:#000"><video id="v" src="${vid}" style="width:100%;height:100vh;object-fit:contain"></video></body>`);
  const dur = await page.evaluate(() => new Promise(res => { const v=document.getElementById('v'); v.onloadedmetadata=()=>res(v.duration); }));
  console.log('duration', dur);
  const frac = [0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.85,1.0];
  for (let k=0;k<frac.length;k++){
    const t = Math.min(dur*frac[k], dur-0.05);
    await page.evaluate((tt)=>new Promise(res=>{const v=document.getElementById('v'); v.onseeked=()=>res(); v.currentTime=tt;}), t);
    await page.waitForTimeout(200);
    await page.screenshot({ path: `/tmp/claude-0/vf_${k}.png` });
  }
  await browser.close();
  console.log('done');
})();
