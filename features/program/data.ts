export type ExerciseKey = "sinav" | "egimli" | "squat" | "plank" | "dag" | "lunge" | "max";

export const EXERCISES: Record<ExerciseKey, { name: string; image: string }> = {
  sinav: { name: "Şınav", image: "/images/exercises/sinav.webp" },
  egimli: { name: "Eğimli Şınav", image: "/images/exercises/egimli.webp" },
  squat: { name: "Squat", image: "/images/exercises/squat.webp" },
  plank: { name: "Plank", image: "/images/exercises/plank.webp" },
  dag: { name: "Dağ Tırmanıcı", image: "/images/exercises/dag.webp" },
  lunge: { name: "Lunge", image: "/images/exercises/lunge.webp" },
  max: { name: "Şınav Değerlendirmesi", image: "/images/exercises/max.webp" },
};

export type Move = { key: ExerciseKey; detail: string };
export type Day = { day: number; rest: boolean; moves: Move[] };

const s = (key: ExerciseKey, detail: string): Move => ({ key, detail });

const raw: (Move[] | "rest")[] = [
  [s("sinav", "3 × 8"), s("squat", "3 × 10"), s("plank", "20 sn")],
  [s("egimli", "3 × 10"), s("squat", "3 × 10"), s("plank", "25 sn")],
  [s("sinav", "3 × 10"), s("squat", "3 × 12"), s("dag", "20 sn")],
  "rest",
  [s("sinav", "3 × 10"), s("lunge", "3 × 8 (her bacak)"), s("plank", "30 sn")],
  [s("egimli", "3 × 12"), s("squat", "3 × 12"), s("dag", "25 sn")],
  [s("max", "1 set · Formun bozulana kadar")],
  "rest",
  [s("egimli", "3 × 8"), s("lunge", "3 × 10 (her bacak)"), s("dag", "30 sn")],
  [s("sinav", "4 × 12"), s("squat", "3 × 15"), s("plank", "35 sn")],
  [s("sinav", "4 × 12"), s("lunge", "3 × 12 (her bacak)"), s("plank", "40 sn")],
  "rest",
  [s("egimli", "3 × 15"), s("squat", "3 × 15"), s("dag", "35 sn")],
  [s("sinav", "4 × 12"), s("squat", "4 × 15"), s("plank", "40 sn")],
  [s("max", "1 set · Formun bozulana kadar")],
  "rest",
  [s("egimli", "3 × 10"), s("lunge", "3 × 12 (her bacak)"), s("dag", "40 sn")],
  [s("sinav", "4 × 15"), s("squat", "4 × 15"), s("plank", "45 sn")],
  [s("sinav", "4 × 15"), s("lunge", "3 × 15 (her bacak)"), s("plank", "45 sn")],
  "rest",
  [s("egimli", "3 × 15"), s("squat", "4 × 15"), s("dag", "45 sn")],
  [s("sinav", "5 × 12"), s("squat", "4 × 18"), s("plank", "50 sn")],
  [s("egimli", "4 × 10"), s("lunge", "3 × 15 (her bacak)"), s("dag", "50 sn")],
  "rest",
  [s("sinav", "5 × 15"), s("squat", "4 × 18"), s("plank", "55 sn")],
  [s("sinav", "5 × 15"), s("lunge", "3 × 15 (her bacak)"), s("plank", "60 sn")],
  [s("egimli", "3 × 20"), s("squat", "4 × 20"), s("dag", "60 sn")],
  "rest",
  [s("max", "1 set · Formun bozulana kadar")],
  "rest",
];

export const PROGRAM: Day[] = raw.map((r, i) => ({
  day: i + 1,
  rest: r === "rest",
  moves: r === "rest" ? [] : r,
}));

export const TOTAL_DAYS = PROGRAM.length;

