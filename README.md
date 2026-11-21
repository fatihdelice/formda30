# Formda30

Şınav, squat ve diğer vücut ağırlığı hareketlerini içeren 30 günlük evde spor takvimi. Günleri ve hareket rehberini başlangıçtan önce inceleyebilir, tamamlanan günleri tarayıcıda saklayabilirsin.

```sh
npm ci
npm run dev
```

Üretim için `npm run build` ve `npm start` kullanılır. Canlı sitenin kök adresini (örneğin `https://example.com`) dağıtım ortamında **derlemeden önce** `NEXT_PUBLIC_SITE_URL` değişkenine yaz. Canonical adresi, Open Graph paylaşım görseli ve site haritası bu adresten üretilir.

- `app/` sayfa, global stil, metadata, robots ve sitemap
- `features/program/` takvim arayüzü, gün planı ve hareket tekniği
- `lib/site.ts` marka, açıklama ve site adresi
- `public/images/` ImageGen ile üretilen hareket fotoğrafları, kapak ve favicon

