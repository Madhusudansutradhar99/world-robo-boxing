const CACHE='wrb-v4';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{
    if(r&&r.ok){const cp=r.clone();caches.open(CACHE).then(ch=>ch.put(e.request,cp)).catch(()=>{});}
    return r;
  }).catch(()=>caches.match('./index.html'))));
});
