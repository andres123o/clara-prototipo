/**
 * Datos de ejemplo y reglas del verificador.
 * Empresa, comercios y personas son ficticios.
 */

export const COMPANY = { name: "Andina Logística S.A.S.", nit: "901234567" } as const;

export type CardTransaction = {
  id: string;
  date: string; // ISO
  merchant: string;
  holder: string;
  amount: number; // COP
  /** Proveedor del exterior o no obligado a facturar: necesita documento soporte, no factura. */
  foreign?: boolean;
};

export type DianInvoice = {
  cufe: string;
  issuer: string;
  buyerNit: string;
  date: string;
  total: number;
};

export type Status = "ok" | "missing" | "otherBuyer" | "amount" | "support";

export type CheckedTransaction = CardTransaction & { status: Status; invoice?: DianInvoice };

export const TRANSACTIONS: CardTransaction[] = [
  { id: "t1", date: "2026-10-02", merchant: "Hotel Parque 93", holder: "Laura Gómez", amount: 684000 },
  { id: "t2", date: "2026-10-03", merchant: "Aerolínea Andes", holder: "Carlos Ruiz", amount: 1240500 },
  { id: "t3", date: "2026-10-06", merchant: "Restaurante La Huerta", holder: "Laura Gómez", amount: 186900 },
  { id: "t4", date: "2026-10-08", merchant: "Papelería Central", holder: "Diana Torres", amount: 94300 },
  { id: "t5", date: "2026-10-09", merchant: "Anthropic", holder: "Diana Torres", amount: 86400, foreign: true },
  { id: "t6", date: "2026-10-10", merchant: "Taxi Express", holder: "Carlos Ruiz", amount: 38000 },
  { id: "t7", date: "2026-10-12", merchant: "Software Nube S.A.S.", holder: "Diana Torres", amount: 2350000 },
  { id: "t8", date: "2026-10-15", merchant: "Café Origen", holder: "Mateo Rojas", amount: 24500 },
  { id: "t9", date: "2026-10-17", merchant: "Ferretería El Tornillo", holder: "Mateo Rojas", amount: 412800 },
  { id: "t10", date: "2026-10-20", merchant: "Google Workspace", holder: "Diana Torres", amount: 158000, foreign: true },
  { id: "t11", date: "2026-10-22", merchant: "Parqueadero Calle 100", holder: "Carlos Ruiz", amount: 18000 },
  { id: "t12", date: "2026-10-24", merchant: "Hotel Parque 93", holder: "Laura Gómez", amount: 912000 },
];

/** Facturas electrónicas recibidas en el buzón de la empresa (ejemplo). */
export const INVOICES: DianInvoice[] = [
  invoice("Hotel Parque 93", COMPANY.nit, "2026-10-02", 684000),
  invoice("Aerolínea Andes", COMPANY.nit, "2026-10-03", 1240500),
  invoice("Restaurante La Huerta", "52418903", "2026-10-06", 186900), // a nombre de la cédula de Laura
  invoice("Papelería Central", COMPANY.nit, "2026-10-08", 94300),
  invoice("Software Nube S.A.S.", COMPANY.nit, "2026-10-12", 2530000), // valor distinto al cobro
  invoice("Ferretería El Tornillo", COMPANY.nit, "2026-10-18", 412800),
  invoice("Hotel Parque 93", COMPANY.nit, "2026-10-25", 912000),
];

const MAX_DAYS_APART = 5;
const AMOUNT_TOLERANCE = 0.01;

export function checkTransactions(
  transactions: CardTransaction[],
  invoices: DianInvoice[],
  companyNit: string,
): CheckedTransaction[] {
  const unused = [...invoices];

  return transactions.map((tx) => {
    if (tx.foreign) return { ...tx, status: "support" };

    const index = unused.findIndex(
      (inv) => sameName(inv.issuer, tx.merchant) && daysApart(inv.date, tx.date) <= MAX_DAYS_APART,
    );
    if (index === -1) return { ...tx, status: "missing" };

    const [match] = unused.splice(index, 1);
    if (match.buyerNit !== companyNit) return { ...tx, status: "otherBuyer", invoice: match };
    if (Math.abs(match.total - tx.amount) > tx.amount * AMOUNT_TOLERANCE) {
      return { ...tx, status: "amount", invoice: match };
    }
    return { ...tx, status: "ok", invoice: match };
  });
}

function sameName(a: string, b: string) {
  const clean = (s: string) => s.toLowerCase().normalize("NFD").replace(/[^a-z0-9]/g, "");
  return clean(a) === clean(b);
}

function daysApart(a: string, b: string) {
  return Math.abs(Date.parse(a) - Date.parse(b)) / 86_400_000;
}

/** CUFE de ejemplo: 96 caracteres hexadecimales, como el SHA-384 real. */
function invoice(issuer: string, buyerNit: string, date: string, total: number): DianInvoice {
  let seed = [...`${issuer}${date}${total}`].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);
  let cufe = "";
  while (cufe.length < 96) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    cufe += seed.toString(16).padStart(8, "0");
  }
  return { cufe: cufe.slice(0, 96), issuer, buyerNit, date, total };
}

export const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(iso));
