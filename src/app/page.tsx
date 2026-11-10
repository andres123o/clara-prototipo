import { Verifier } from "@/components/Verifier";

const STEPS = [
  { title: "Los gastos", text: "Cada transacción de la tarjeta, desde la API de Clara Colombia." },
  { title: "Las facturas", text: "El XML que cada proveedor envía al correo de facturación de la empresa. Leerlo no cuesta nada." },
  { title: "El agente", text: "Empareja, valida CUFE, NIT y valor, y le pide a cada persona lo que falta." },
];

const GROWTH = [
  {
    stage: "Adquisición",
    play: "Versión gratis: «¿Cuánto de tus gastos no es deducible?». La empresa sube su extracto y ve su monto en riesgo.",
    metric: "Prospectos con el dolor medido, listos para ventas",
  },
  {
    stage: "Activación",
    play: "El primer cierre de mes sin faltantes es el momento en que el cliente ve el valor. Se diseña el onboarding para llegar ahí.",
    metric: "Clientes con su primer cierre completo en 30 días",
  },
  {
    stage: "Expansión",
    play: "Con el dinero en riesgo de cada empresa a la vista, el paso a Pro o Enterprise se vende con sus propios números.",
    metric: "Cuentas que suben de plan",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-[1360px]">
      <section className="grid gap-6 pt-16 pb-12 sm:pt-24 lg:grid-cols-[1.55fr_1fr] lg:items-end">
        <h1 className="t-display">Cada gasto con su factura DIAN antes del cierre</h1>
        <p className="max-w-[46ch] text-lg leading-relaxed">
          Clara ya lee la factura que sube el empleado. Esto la trae sola del correo de facturación, la valida y persigue lo que
          falta.
        </p>
      </section>

      <Verifier />

      <section className="mt-24 grid gap-10 sm:grid-cols-3">
        {STEPS.map((s, i) => (
          <div key={s.title}>
            <p className="text-sm font-semibold text-brand tabular-nums">{i + 1}</p>
            <h3 className="mt-2 text-xl tracking-tight">{s.title}</h3>
            <p className="mt-2 max-w-[38ch]">{s.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-24 rounded-2xl bg-subtle p-6 sm:p-10">
        <h2 className="t-h2 max-w-3xl">La misma herramienta, como motor de crecimiento</h2>
        <div className="mt-10 divide-y divide-white">
          {GROWTH.map((g) => (
            <div key={g.stage} className="grid gap-2 py-6 md:grid-cols-[200px_1fr_280px] md:gap-8">
              <h3 className="text-lg tracking-tight">{g.stage}</h3>
              <p>{g.play}</p>
              <p className="text-sm text-muted md:text-right">
                Se mide en <span className="font-medium text-navy">{g.metric.toLowerCase()}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
