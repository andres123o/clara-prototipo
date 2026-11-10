import type { Metadata } from "next";

export const metadata: Metadata = { title: "Jugadas de growth · Clara Colombia" };

const PLAYS = [
  {
    stage: "Activación",
    title: "De la firma a la primera tarjeta usada, más rápido",
    pain: "Revisar a cada empresa nueva (RUT, Cámara de Comercio, listas restrictivas) es trabajo manual.",
    play: "Un agente lee los documentos, cruza las listas y deja a la persona solo los casos dudosos.",
    metric: "Días entre la firma y el primer gasto",
  },
  {
    stage: "Adquisición",
    title: "Vender Clara for HR con el dato de cada empresa",
    pain: "Los equipos de RR. HH. gastan más de 40 horas al mes en bonos, recargas y conciliación.",
    play: "Una calculadora de ahorro y un mensaje hecho para cada líder de RR. HH., con las cifras de su empresa.",
    metric: "Reuniones por cada 100 contactos",
  },
  {
    stage: "Adquisición",
    title: "Que Google y la IA respondan con Clara",
    pain: "La web menciona la DIAN sin explicarla y los casos de clientes no traen números.",
    play: "Páginas por dolor colombiano (legalización, documento soporte, viáticos) y casos medidos, listas para buscadores de IA.",
    metric: "Demos agendadas desde orgánico",
  },
  {
    stage: "Retención",
    title: "Cada caso de soporte, una señal",
    pain: "Quejas públicas: actualizar la app para ver la tarjeta, códigos que no llegan, tarjetas emitidas sin pedirlas.",
    play: "Un agente clasifica los casos escalados, marca cuentas en riesgo y lleva los temas repetidos a producto y a marketing.",
    metric: "Cuentas en riesgo recuperadas",
  },
  {
    stage: "Retención",
    title: "Cobranza que avisa antes de perder al cliente",
    pain: "El estado de cada factura (pago parcial, reverso, disputa) vive en eventos que nadie mira a tiempo.",
    play: "Alertas por cuenta para el gerente comercial, con el contexto y el siguiente paso sugerido.",
    metric: "Cartera recuperada y cuentas que se quedan",
  },
] as const;

export default function GrowthPage() {
  return (
    <div className="mx-auto max-w-[1360px]">
      <h1 className="t-display max-w-4xl pt-16 pb-16 sm:pt-24">Cinco jugadas para crecer en Colombia</h1>

      <ol>
        {PLAYS.map((p) => (
          <li
            key={p.title}
            className="grid gap-x-10 gap-y-4 border-t border-line py-10 lg:grid-cols-[120px_minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)]"
          >
            <p className="text-sm text-muted lg:pt-1.5">{p.stage}</p>
            <h2 className="text-2xl leading-tight tracking-tight">{p.title}</h2>
            <div>
              <p className="text-sm text-muted">El dolor</p>
              <p className="mt-1.5 leading-relaxed">{p.pain}</p>
            </div>
            <div>
              <p className="text-sm text-muted">Qué construiría</p>
              <p className="mt-1.5 leading-relaxed">{p.play}</p>
              <p className="mt-4 text-sm font-medium text-brand">{p.metric}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
