import type { ExerciseKey } from "./data";

export const technique: Record<ExerciseKey, { group: string; cue: string; alt: string }> = {
  sinav: { group: "Üst vücut", cue: "Ellerini omuz hizasına yerleştir. Gövdeni düz tutarak dirseklerini bük ve kontrollü biçimde yukarı it.", alt: "Şınavın alt pozisyonunda gövdesini düz tutan sporcu" },
  egimli: { group: "Üst vücut", cue: "Ellerini sağlam, kaymayan yüksek bir yüzeye koy. Başından topuklarına kadar aynı çizgiyi koru.", alt: "Ellerini alçak ve sabit bir sehpaya dayayarak eğimli şınav yapan sporcu" },
  squat: { group: "Alt vücut", cue: "Kalçanı geriye ve aşağı gönder. Ayak tabanlarını yerde tut, dizlerin ayak parmaklarınla aynı yöne baksın.", alt: "Ayakları yerde ve kolları ileri uzanmış şekilde squat yapan sporcu" },
  plank: { group: "Merkez bölge", cue: "Dirseklerini omuzlarının altına al. Kalçanı sabit tut ve pozisyon boyunca nefes alıp ver.", alt: "Ön kolları ve ayak uçları üzerinde plank yapan sporcu" },
  dag: { group: "Merkez bölge", cue: "Ellerini omuzlarının altına al. Kalçanı mümkün olduğunca sabit tutarak dizlerini sırayla göğsüne çek.", alt: "Yüksek plank pozisyonunda bir dizini öne çeken sporcu" },
  lunge: { group: "Alt vücut", cue: "Bir adım öne at. Gövdeni dik tutarak iki dizini bük, ardından ön ayağınla yeri iterek başlangıca dön.", alt: "Ön ayağı yerde ve arka dizi yere yakın biçimde lunge yapan sporcu" },
  max: { group: "Değerlendirme", cue: "Önceki değerlendirmeyle aynı şınav varyasyonunu kullan. Formun bozulmaya başladığında dur ve tekrarlarını karşılaştır.", alt: "Kolları düz ve ayak uçları yerde, şınavın başlangıç pozisyonundaki sporcu" },
};
