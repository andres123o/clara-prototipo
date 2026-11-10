import type { Metadata } from "next";

export const metadata: Metadata = { title: "Por qué yo · Clara Colombia" };

const CONTACT = {
  email: "andresolayacris@gmail.com",
  portfolio: "https://andresolaya.net",
  linkedin: "https://www.linkedin.com/in/andres-felipe-cristancho-olaya-3aa762179/",
};

/** Resultados del portafolio (andresolaya.net). */
const BUILT = [
  { initials: "AC", title: "Onboarding con agentes de IA", area: "Activación · grupo de control", value: "2 días", note: "para convertir a estancados" },
  { initials: "LP", title: "Landings y sitios", area: "Adquisición · Colombia, Perú y Chile", value: "3 países", note: "con un solo sistema de marca" },
  { initials: "DL", title: "Agente de documentos legales", area: "Operaciones", value: "1 hora", note: "antes 3 días" },
  { initials: "SS", title: "Saldos en un clic", area: "Soporte", value: "−90 %", note: "de tiempo operativo" },
] as const;

const REASONS = [
  { title: "De punta a punta", text: "Construyo con IA los datos, los agentes, la web y la medición." },
  { title: "Técnico con visión de negocio", text: "Economista que programa: entiendo los números y el código, y priorizo lo que mueve la métrica." },
  { title: "Mentalidad de fundador", text: "Fundé mi propia startup y lideré lanzamientos con operaciones y legal. Respondo por el resultado." },
] as const;


export default function AndresPage() {
  return (
    <div className="mx-auto max-w-[1360px]">
      <section className="grid gap-8 pt-16 pb-16 sm:pt-24 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <h1 className="t-display">Growth engineer y product builder</h1>
        <p className="max-w-[44ch] text-lg leading-relaxed">
          Encuentro dónde un negocio pierde clientes o tiempo, construyo la solución con IA y mido si funcionó.
        </p>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">
        <section className="panel overflow-hidden" aria-label="Lo que he construido">
          <p className="px-5 pt-4 pb-2 text-sm font-semibold text-navy">Lo que he construido</p>
          <ul>
            {BUILT.map((b) => (
              <li key={b.title} className="grid grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 [&+&]:border-t [&+&]:border-line">
                <span className="grid size-8 place-items-center rounded-full bg-brand-soft text-[11px] font-semibold text-brand">
                  {b.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-navy">{b.title}</p>
                  <p className="truncate text-sm text-muted">{b.area}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold tracking-tight text-navy tabular-nums">{b.value}</p>
                  <p className="text-xs text-muted">{b.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel flex flex-col p-6">
          <p className="text-sm font-semibold text-navy">Por qué yo</p>
          <ul className="mt-2 flex flex-1 flex-col justify-between">
            {REASONS.map((r) => (
              <li key={r.title} className="py-4 [&+&]:border-t [&+&]:border-line">
                <p className="font-semibold text-navy">{r.title}</p>
                <p className="mt-1 text-sm">{r.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-20 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="t-h2">Hablemos</h2>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={`mailto:${CONTACT.email}`} className="pressable rounded-full bg-action px-6 py-3 font-medium text-ink hover:bg-action-hover">
            {CONTACT.email}
          </a>
          <a href={CONTACT.portfolio} target="_blank" rel="noreferrer" className="text-navy underline-offset-4 hover:underline">
            Portafolio
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="text-navy underline-offset-4 hover:underline">
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
