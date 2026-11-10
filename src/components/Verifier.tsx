"use client";

import { useEffect, useMemo, useState } from "react";
import {
  COMPANY,
  INVOICES,
  TRANSACTIONS,
  checkTransactions,
  formatCOP,
  formatDate,
  type CheckedTransaction,
  type Status,
} from "@/lib/dian";

const STATUS: Record<Status, { label: string; fix?: string; tone: string }> = {
  ok: { label: "Factura válida", tone: "bg-ok-soft text-ok" },
  missing: { label: "Sin factura", fix: "Pedirla al comercio", tone: "bg-error-soft text-error" },
  otherBuyer: { label: "A nombre de otro", fix: "Salió con la cédula de quien pagó", tone: "bg-error-soft text-error" },
  amount: { label: "Valor distinto", fix: "La factura dice $ 2.530.000", tone: "bg-warn-soft text-warn" },
  support: { label: "Documento soporte", fix: "Proveedor del exterior", tone: "bg-brand-soft text-brand" },
};

const CHECKS = [
  "Que la factura llegó al correo de facturación",
  "Que el CUFE existe",
  "Que está a nombre del NIT de la empresa",
  "Que el valor coincide con el cobro",
  "Si el proveedor es del exterior: documento soporte",
];

const STEP_MS = 170;

export function Verifier() {
  const rows = useMemo(() => checkTransactions(TRANSACTIONS, INVOICES, COMPANY.nit), []);
  /** Cuántas filas ya se revisaron; null mientras no se ha empezado. */
  const [checked, setChecked] = useState<number | null>(null);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (checked === null || checked >= rows.length) return;
    const timer = setTimeout(() => setChecked(checked + 1), STEP_MS);
    return () => clearTimeout(timer);
  }, [checked, rows.length]);

  const done = checked === rows.length;
  const pending = rows.filter((r) => r.status !== "ok");
  const atRisk = pending.reduce((sum, r) => sum + r.amount, 0);
  const people = new Set(pending.map((r) => r.holder)).size;

  function start() {
    setRequested(false);
    setChecked(0);
  }

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[1.55fr_1fr]">
      <section className="panel overflow-hidden" aria-label="Gastos con tarjeta de octubre">
        <header className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-navy">Gastos de octubre</p>
            <p className="text-xs text-muted">{COMPANY.name} · datos de ejemplo</p>
          </div>
          <button
            onClick={start}
            disabled={checked !== null && !done}
            className="pressable rounded-full bg-action px-5 py-2.5 text-sm font-medium text-ink hover:bg-action-hover disabled:opacity-60"
          >
            {done ? "Revisar de nuevo" : "Revisar con la DIAN"}
          </button>
        </header>
        <ul>
          {rows.map((row, i) => (
            <Row key={row.id} row={row} revealed={checked !== null && i < checked} active={checked === i} />
          ))}
        </ul>
      </section>

      <aside className="panel p-6" aria-live="polite">
        {checked === null && (
          <>
            <h2 className="text-lg font-semibold">Qué revisa en cada gasto</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {CHECKS.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  {c}
                </li>
              ))}
            </ul>
          </>
        )}

        {checked !== null && !done && (
          <>
            <p className="text-sm text-muted">Revisando</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-navy tabular-nums">
              {checked} de {rows.length} gastos
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-subtle">
              <div
                className="h-full rounded-full bg-brand transition-[width] duration-150 ease-out"
                style={{ width: `${(checked / rows.length) * 100}%` }}
              />
            </div>
          </>
        )}

        {done && (
          <div className="rise">
            <p className="text-sm text-muted">Antes del cierre</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-navy">
              {rows.length - pending.length} de {rows.length} listos
            </p>
            <p className="mt-3 text-sm">
              <span className="font-semibold text-error tabular-nums">{formatCOP(atRisk)}</span> no serían deducibles si
              cierras hoy. Faltan soportes de {people} personas.
            </p>

            <div className="mt-6 rounded-2xl rounded-bl-sm bg-ok-soft p-4 text-sm text-navy">
              Laura, falta la factura de Restaurante La Huerta del 6 oct. Salió con tu cédula: pídela con el NIT de la empresa y
              respóndeme con el archivo.
            </div>

            <button
              onClick={() => setRequested(true)}
              disabled={requested}
              className="pressable mt-4 w-full rounded-full bg-navy px-5 py-3 text-sm font-medium text-white hover:bg-inverse disabled:bg-subtle disabled:text-muted"
            >
              {requested ? `Enviado por WhatsApp a ${people} personas` : "Pedir lo que falta por WhatsApp"}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

function Row({ row, revealed, active }: { row: CheckedTransaction; revealed: boolean; active: boolean }) {
  const status = STATUS[row.status];
  const initials = row.holder
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <li
      className={`grid grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 transition-colors duration-150 [&+&]:border-t [&+&]:border-line ${
        active ? "bg-subtle" : ""
      }`}
    >
      <span className="grid size-8 place-items-center rounded-full bg-brand-soft text-[11px] font-semibold text-brand">
        {initials}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-navy">{row.merchant}</p>
        <p className="truncate text-xs text-muted">
          {row.holder} · {formatDate(row.date)}
          {revealed && status.fix && <span className="chip-in"> · {status.fix}</span>}
        </p>
      </div>
      <div className="grid justify-items-end gap-1">
        <span className="text-sm font-semibold text-navy tabular-nums">{formatCOP(row.amount)}</span>
        {revealed ? (
          <span key="status" className={`chip-in rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${status.tone}`}>
            {status.label}
          </span>
        ) : (
          <span className="rounded-full bg-subtle px-2 py-0.5 text-[11px] text-muted">Pendiente</span>
        )}
      </div>
    </li>
  );
}
