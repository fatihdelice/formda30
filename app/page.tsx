import Image from "next/image";
import { AthleteImage, AthleteProvider, AthleteSelect } from "@/features/program/Athlete";
import Program from "@/features/program/Program";
import { EXERCISES, TOTAL_DAYS, type ExerciseKey } from "@/features/program/data";
import { technique } from "@/features/program/technique";
import { brand, description } from "@/lib/site";

const exercises = (Object.keys(EXERCISES) as ExerciseKey[]).filter((key) => key !== "max");

export default function Home() {
  const jsonLd = { "@context": "https://schema.org", "@type": "ExercisePlan", name: "30 Günlük Evde Spor Programı", description, inLanguage: "tr", exerciseType: "Vücut ağırlığı egzersizleri" };
  return (
    <AthleteProvider>
      <header className="top">
        <div className="shell top-inner">
          <a href="/" className="brand"><Image src="/images/favicon.png" alt="" width={36} height={36} />{brand}</a>
          <nav aria-label="Ana menü"><a href="#program">Takvim</a><a href="#hareketler">Hareket rehberi</a></nav>
          <div className="top-controls">
            <AthleteSelect />
            <a className="btn top-action" href="#program">Programı aç</a>
          </div>
        </div>
      </header>
      <main className="shell">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <section className="hero">
          <div className="hero-text">
            <p className="eyebrow">Vücut ağırlığı antrenmanı</p>
            <h1>{TOTAL_DAYS} Günlük<br /><em>Evde Spor</em><br />Programı</h1>
            <p className="intro">Şınav, squat ve plank gibi temel hareketleri öğren. Antrenman ve dinlenme günlerini takip ederek evde düzenli bir spor rutini oluştur.</p>
            <a className="btn btn-lime" href="#program">Takvimi incele</a>
          </div>
          <div className="hero-photo"><AthleteImage src="/images/evde-spor.webp" alt="Güneş alan bir odada vücut ağırlığıyla squat yapan sporcu" fill preload sizes="(max-width: 760px) 100vw, 55vw" /></div>
        </section>
        <ul className="stats" aria-label="Program özeti">
          <li><strong>{TOTAL_DAYS} gün</strong><span>Adım adım egzersiz takvimi</span></li>
          <li><strong>{exercises.length} hareket</strong><span>Görselli teknik rehberi</span></li>
          <li><strong>Evde antrenman</strong><span>Vücut ağırlığıyla çalışma</span></li>
        </ul>
        <Program />
        <section id="hareketler" className="section">
          <h2>Hareket rehberi</h2>
          <p className="muted">Temel pozisyonları ve uygulama ipuçlarını incele.</p>
          <div className="guide">
            {exercises.map((key) => (
              <article key={key} className="guide-card">
                <AthleteImage src={EXERCISES[key].image} alt={technique[key].alt} width={768} height={343} sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
                <div><span className="eyebrow">{technique[key].group}</span><h3>{EXERCISES[key].name}</h3><p>{technique[key].cue}</p></div>
              </article>
            ))}
          </div>
        </section>
        <section className="section faq">
          <h2>Program hakkında</h2>
          <details><summary>Egzersizleri seviyeme nasıl uyarlayabilirim?</summary><p>Takvimdeki set ve tekrarlar örnektir. Başlangıçta daha az set veya tekrar yapabilir, plank süresini kısaltabilir ve şınav yerine eğimli şınavı seçebilirsin. Kontrollü hareket etmeye ve setler arasında dinlenmeye öncelik ver.</p></details>
          <details><summary>Spor ekipmanı gerekiyor mu?</summary><p>Hareketler vücut ağırlığıyla yapılır. Eğimli şınav için sağlam ve kaymayan bir yüzey gerekir.</p></details>
          <details><summary>İlerlemem nerede saklanıyor?</summary><p>Tamamladığın günler bu tarayıcıda saklanır. Tarayıcı verilerini temizlersen ilerlemen sıfırlanır.</p></details>
        </section>
      </main>
      <footer className="site-footer"><div className="shell"><strong>{brand}</strong><span>30 günlük evde egzersiz takvimi</span></div></footer>
    </AthleteProvider>
  );
}
