import {
  formatCurrency,
  paymentMethodLabels,
  paymentStatusLabels,
} from '../../lib/formatters.js'

function AdminPaymentList({ payments, drafts, setDrafts, onSave, onMarkPaid }) {
  return (
    <div className="rounded-[2.4rem] border border-soot/10 bg-white/80 p-6 shadow-sm">
      <h2 className="font-display text-3xl text-soot">Pagos y links de cobro</h2>
      <div className="mt-6 space-y-5">
        {payments.map((payment) => {
          const draft = drafts[payment._id] || {}

          return (
            <article key={payment._id} className="rounded-[1.9rem] bg-paper p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-extrabold text-soot">{payment.title}</p>
                  <p className="mt-1 text-sm text-soot/60">
                    {payment.client?.name} · {payment.project?.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-soot">
                    {formatCurrency(payment.amount, payment.currency)}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-soot/45">
                    {paymentStatusLabels[payment.status]}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <select
                  value={draft.method || payment.method}
                  onChange={(event) =>
                    setDrafts((current) => ({
                      ...current,
                      [payment._id]: {
                        ...current[payment._id],
                        method: event.target.value,
                      },
                    }))
                  }
                  className="rounded-[1.2rem] border border-soot/10 bg-white px-4 py-3 outline-none focus:border-ember-400"
                >
                  {Object.entries(paymentMethodLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={draft.dueDate || ''}
                  onChange={(event) =>
                    setDrafts((current) => ({
                      ...current,
                      [payment._id]: {
                        ...current[payment._id],
                        dueDate: event.target.value,
                      },
                    }))
                  }
                  className="rounded-[1.2rem] border border-soot/10 bg-white px-4 py-3 outline-none focus:border-ember-400"
                />
              </div>

              <textarea
                placeholder="Instrucciones"
                value={draft.instructions || ''}
                onChange={(event) =>
                  setDrafts((current) => ({
                    ...current,
                    [payment._id]: {
                      ...current[payment._id],
                      instructions: event.target.value,
                    },
                  }))
                }
                rows={3}
                className="mt-4 w-full rounded-[1.2rem] border border-soot/10 bg-white px-4 py-3 outline-none focus:border-ember-400"
              />
              <input
                placeholder="Link de pago externo (util para Visa)"
                value={draft.checkoutUrl || ''}
                onChange={(event) =>
                  setDrafts((current) => ({
                    ...current,
                    [payment._id]: {
                      ...current[payment._id],
                      checkoutUrl: event.target.value,
                    },
                  }))
                }
                className="mt-4 w-full rounded-[1.2rem] border border-soot/10 bg-white px-4 py-3 outline-none focus:border-ember-400"
              />

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onSave(payment._id)}
                  className="rounded-full bg-soot px-5 py-3 text-sm font-extrabold text-white"
                >
                  Guardar pago
                </button>
                {payment.status !== 'paid' ? (
                  <button
                    type="button"
                    onClick={() => onMarkPaid(payment._id)}
                    className="rounded-full border border-soot/10 px-5 py-3 text-sm font-extrabold text-soot"
                  >
                    Marcar como pago
                  </button>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default AdminPaymentList
