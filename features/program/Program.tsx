"use client";

import { AthleteImage } from "./Athlete";
import { useEffect, useRef, useState } from "react";
import { EXERCISES, PROGRAM, TOTAL_DAYS, type ExerciseKey } from "./data";
import { technique } from "./technique";

const STORAGE_KEY = "askeri-jimnastik-v1";
const INITIAL = { started: false, done: [] as number[], current: 1 };

export default function Program() {
  const [state, setState] = useState(INITIAL);
  const [ready, setReady] = useState(false);
  const [viewDay, setViewDay] = useState(1);
  const [zoom, setZoom] = useState<ExerciseKey | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved?.started && Array.isArray(saved.done)) {
        // Retain the contiguous completed days from the original 28-day program.
        const firstIncomplete = PROGRAM.findIndex(({ day }) => !saved.done.includes(day));
        const count = firstIncomplete === -1 ? TOTAL_DAYS : firstIncomplete;
        const current = Math.min(count + 1, TOTAL_DAYS);
        setState({ started: true, done: PROGRAM.slice(0, count).map(({ day }) => day), current });
        setViewDay(current);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state, ready]);

  useEffect(() => {
    if (zoom && !dialog.current?.open) dialog.current?.showModal();
    if (!zoom && dialog.current?.open) dialog.current.close();
  }, [zoom]);

  const selected = PROGRAM[viewDay - 1];
  const count = state.done.length;
  const finished = count === TOTAL_DAYS;
  const canComplete = ready && state.started && viewDay === count + 1;
  const isTest = selected.moves.some(({ key }) => key === "max");

  function completeDay() {
    if (!canComplete) return;
    const next = Math.min(viewDay + 1, TOTAL_DAYS);
    setState({ started: true, done: [...state.done, viewDay], current: next });
    setViewDay(next);
  }

  function reset() {
    if (!window.confirm("Tamamladığın günler silinecek. Program sıfırlansın mı?")) return;
    setState(INITIAL);
    setViewDay(1);
  }

  return (
    <section id="program" className="section">
      <div className="section-head">
        <div><h2>Antrenman takvimi</h2><p className="muted">Bir gün seç, hareketleri ve tekrarları incele.</p></div>
        {state.started && <button className="btn btn-secondary" onClick={reset}>İlerlemeyi sıfırla</button>}
      </div>
      <div className="dashboard">
        <aside className="calendar">
          <div className="progress-head"><strong>İlerlemen</strong><span>{count} / {TOTAL_DAYS} gün</span></div>
          <progress aria-label="Tamamlanan gün sayısı" max={TOTAL_DAYS} value={count} />
          <div className="days" role="group" aria-label="Program günleri">
            {PROGRAM.map(({ day, rest, moves }) => (
              <button type="button" key={day} className={`day-chip ${rest ? "recovery" : ""} ${day <= count ? "done" : ""}`}
                aria-pressed={viewDay === day} aria-label={`${day}. gün, ${rest ? "dinlenme" : moves[0]?.key === "max" ? "değerlendirme" : "antrenman"}${day <= count ? ", tamamlandı" : ""}`}
                onClick={() => setViewDay(day)}>{day}{day <= count && <small aria-hidden="true">✓</small>}</button>
            ))}
          </div>
          <p className="calendar-note"><i /> Dinlenme günü</p>
        </aside>
        <div className="panel">
          <div className="panel-heading">
            <div><p className="eyebrow">{selected.rest ? "Toparlanma" : isTest ? "Değerlendirme" : "Vücut ağırlığı"}</p><h3>{selected.day}. Gün</h3></div>
            <div className="pager">
              {!state.started ? (
                <button className="btn btn-primary start-button" disabled={!ready} onClick={() => { setState({ ...INITIAL, started: true }); setViewDay(1); }}>
                  <span className="play-icon" aria-hidden="true" />
                  Programa başla
                </button>
              ) : canComplete && <button className="btn btn-primary" onClick={completeDay}>Günü tamamla</button>}
              <button className="btn btn-secondary" disabled={viewDay === 1} onClick={() => setViewDay(viewDay - 1)}>Önceki</button>
              <button className="btn btn-secondary" disabled={viewDay === TOTAL_DAYS} onClick={() => setViewDay(viewDay + 1)}>Sonraki</button>
            </div>
          </div>
          {selected.rest ? (
            <div className="rest-box"><h4>{viewDay === TOTAL_DAYS ? "Toparlan ve planını gözden geçir" : "Dinlenme günü"}</h4><p>{viewDay === TOTAL_DAYS ? "Önceki şınav değerlendirmelerinle son denemeni karşılaştır. Bir sonraki dönemde sürdürmek istediğin hareketleri ve sana uygun tekrar aralığını belirle." : "Bugün ara verebilir veya kendini iyi hissediyorsan rahat tempoda kısa bir yürüyüş yapabilirsin."}</p></div>
          ) : (
            <ul className="moves">
              {selected.moves.map(({ key, detail }) => (
                <li key={key}>
                  <button className="thumb" onClick={() => setZoom(key)} aria-label={`${EXERCISES[key].name} görselini ve tekniğini aç`}>
                    <AthleteImage src={EXERCISES[key].image} alt={technique[key].alt} width={384} height={172} sizes="(max-width: 450px) 100vw, 180px" />
                  </button>
                  <div><h4>{EXERCISES[key].name}</h4><p>{detail}</p></div>
                </li>
              ))}
            </ul>
          )}
          {state.started && !canComplete && <div className="panel-bottom">
            {finished ? <p role="status">✓ 30 günlük programı tamamladın.</p>
              : viewDay <= count ? <p role="status">✓ Bu gün tamamlandı.</p>
              : <p>Sıradaki gün <button className="text-button" onClick={() => setViewDay(state.current)}>{state.current}. gün</button>.</p>}
          </div>}
        </div>
      </div>
      <dialog ref={dialog} className="modal" aria-labelledby="exercise-title" onClose={() => setZoom(null)} onClick={(event) => { if (event.target === dialog.current) setZoom(null); }}>
        {zoom && <div className="modal-body">
          <button className="btn btn-secondary modal-close" onClick={() => setZoom(null)}>Kapat</button>
          <AthleteImage src={EXERCISES[zoom].image} alt={technique[zoom].alt} width={860} height={484} sizes="(max-width: 800px) 94vw, 760px" />
          <div className="modal-copy"><h3 id="exercise-title">{EXERCISES[zoom].name}</h3><p>{technique[zoom].cue}</p></div>
        </div>}
      </dialog>
    </section>
  );
}
