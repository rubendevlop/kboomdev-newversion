function AdminServiceForm({ form, onChange, onSubmit, saving }) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2.4rem] border border-soot/10 bg-white/80 p-6 shadow-sm"
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-ember-700">
        Servicios
      </p>
      <h2 className="mt-2 font-display text-3xl text-soot">Agregar servicio</h2>

      <div className="mt-6 grid gap-4">
        <input
          placeholder="Titulo del servicio"
          value={form.title}
          onChange={(event) => onChange('title', event.target.value)}
          className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
        />
        <input
          placeholder="Categoria"
          value={form.category}
          onChange={(event) => onChange('category', event.target.value)}
          className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
        />
        <textarea
          placeholder="Resumen corto"
          value={form.summary}
          onChange={(event) => onChange('summary', event.target.value)}
          rows={3}
          className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
        />
        <textarea
          placeholder="Descripcion larga"
          value={form.description}
          onChange={(event) => onChange('description', event.target.value)}
          rows={5}
          className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
        />
        <textarea
          placeholder="Entregables, uno por linea"
          value={form.deliverablesText}
          onChange={(event) => onChange('deliverablesText', event.target.value)}
          rows={4}
          className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            placeholder="Ideal para"
            value={form.idealFor}
            onChange={(event) => onChange('idealFor', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
          <input
            placeholder="Tiempo estimado"
            value={form.turnaround}
            onChange={(event) => onChange('turnaround', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <input
            type="number"
            placeholder="Precio desde"
            value={form.priceFrom}
            onChange={(event) => onChange('priceFrom', event.target.value)}
            className="rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none focus:border-ember-400"
          />
          <label className="flex items-center gap-2 rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 text-sm font-semibold text-soot">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) => onChange('featured', event.target.checked)}
            />
            Destacado
          </label>
          <label className="flex items-center gap-2 rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 text-sm font-semibold text-soot">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(event) => onChange('active', event.target.checked)}
            />
            Publicado
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="mt-6 rounded-full bg-soot px-6 py-4 text-sm font-extrabold text-white transition hover:bg-soot/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? 'Guardando...' : 'Guardar servicio'}
      </button>
    </form>
  )
}

export default AdminServiceForm
