import { paymentMethodLabels, projectStatusLabels } from '../../lib/formatters.js'

function AdminProjectForm({ form, services, onChange, onSubmit, saving }) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2.4rem] border border-soot/10 bg-white/80 p-6 shadow-sm"
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-ember-700">
        Proyectos
      </p>
      <h2 className="mt-2 font-display text-3xl text-soot">Crear proyecto para cliente</h2>

      <div className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            placeholder="Nombre del cliente"
            value={form.clientName}
            onChange={(event) => onChange('clientName', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
          <input
            type="email"
            placeholder="Correo del cliente"
            value={form.clientEmail}
            onChange={(event) => onChange('clientEmail', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <input
            placeholder="Contrasena inicial"
            value={form.clientPassword}
            onChange={(event) => onChange('clientPassword', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
          <input
            placeholder="Empresa"
            value={form.clientCompany}
            onChange={(event) => onChange('clientCompany', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
          <input
            placeholder="Telefono"
            value={form.clientPhone}
            onChange={(event) => onChange('clientPhone', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
        </div>
        <p className="text-xs font-semibold text-soot/55">
          Si el cliente ya existe, con el correo basta. La contrasena solo se usa para altas nuevas.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            placeholder="Nombre del proyecto"
            value={form.name}
            onChange={(event) => onChange('name', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
          <select
            value={form.serviceId}
            onChange={(event) => onChange('serviceId', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          >
            <option value="">Seleccionar servicio</option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.title}
              </option>
            ))}
          </select>
        </div>
        <textarea
          placeholder="Resumen del proyecto"
          value={form.summary}
          onChange={(event) => onChange('summary', event.target.value)}
          rows={3}
          className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
        />
        <textarea
          placeholder="Notas visibles para el cliente"
          value={form.notes}
          onChange={(event) => onChange('notes', event.target.value)}
          rows={3}
          className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
        />
        <textarea
          placeholder="Hitos, uno por linea"
          value={form.milestonesText}
          onChange={(event) => onChange('milestonesText', event.target.value)}
          rows={5}
          className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
        />
        <div className="grid gap-4 sm:grid-cols-4">
          <select
            value={form.status}
            onChange={(event) => onChange('status', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          >
            {Object.entries(projectStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Progreso"
            value={form.progress}
            onChange={(event) => onChange('progress', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
          <input
            type="date"
            value={form.startDate}
            onChange={(event) => onChange('startDate', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
          <input
            type="date"
            value={form.targetDate}
            onChange={(event) => onChange('targetDate', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-4">
          <input
            type="number"
            placeholder="Presupuesto total"
            value={form.budgetAmount}
            onChange={(event) => onChange('budgetAmount', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
          <input
            placeholder="Moneda"
            value={form.budgetCurrency}
            onChange={(event) => onChange('budgetCurrency', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
          <input
            type="number"
            placeholder="Primer pago"
            value={form.depositAmount}
            onChange={(event) => onChange('depositAmount', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
          <select
            value={form.depositMethod}
            onChange={(event) => onChange('depositMethod', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          >
            {Object.entries(paymentMethodLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <input
            type="date"
            value={form.depositDueDate}
            onChange={(event) => onChange('depositDueDate', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
          <input
            type="number"
            placeholder="Pago final"
            value={form.finalAmount}
            onChange={(event) => onChange('finalAmount', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
          <select
            value={form.finalMethod}
            onChange={(event) => onChange('finalMethod', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          >
            {Object.entries(paymentMethodLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <input
          type="date"
          value={form.finalDueDate}
          onChange={(event) => onChange('finalDueDate', event.target.value)}
          className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="mt-6 rounded-full bg-soot px-6 py-4 text-sm font-extrabold text-white transition hover:bg-soot/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? 'Creando...' : 'Crear proyecto con cuotas'}
      </button>
    </form>
  )
}

export default AdminProjectForm
