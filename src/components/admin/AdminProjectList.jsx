import { formatCurrency, formatDate, projectStatusLabels } from '../../lib/formatters.js'

function AdminProjectList({ projects, drafts, setDrafts, onUpdate }) {
  return (
    <div className="rounded-[2.4rem] border border-soot/10 bg-white/80 p-6 shadow-sm">
      <h2 className="font-display text-3xl text-soot">Actualizar proyectos</h2>
      <div className="mt-6 space-y-5">
        {projects.map((project) => {
          const draft = drafts[project._id] || {}

          return (
            <article key={project._id} className="rounded-[1.9rem] bg-paper p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-extrabold text-soot">{project.name}</p>
                  <p className="mt-1 text-sm text-soot/60">
                    {project.client?.name} · {project.service?.title || 'Sin servicio'}
                  </p>
                </div>
                <p className="text-sm font-extrabold text-soot">
                  {formatCurrency(project.budgetAmount, project.budgetCurrency)}
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <select
                  value={draft.status || project.status}
                  onChange={(event) =>
                    setDrafts((current) => ({
                      ...current,
                      [project._id]: {
                        ...current[project._id],
                        status: event.target.value,
                      },
                    }))
                  }
                  className="rounded-[1.2rem] border border-soot/10 bg-white px-4 py-3 outline-none focus:border-ember-400"
                >
                  {Object.entries(projectStatusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={draft.progress ?? project.progress}
                  onChange={(event) =>
                    setDrafts((current) => ({
                      ...current,
                      [project._id]: {
                        ...current[project._id],
                        progress: event.target.value,
                      },
                    }))
                  }
                  className="rounded-[1.2rem] border border-soot/10 bg-white px-4 py-3 outline-none focus:border-ember-400"
                />
                <input
                  type="date"
                  value={draft.targetDate || ''}
                  onChange={(event) =>
                    setDrafts((current) => ({
                      ...current,
                      [project._id]: {
                        ...current[project._id],
                        targetDate: event.target.value,
                      },
                    }))
                  }
                  className="rounded-[1.2rem] border border-soot/10 bg-white px-4 py-3 outline-none focus:border-ember-400"
                />
              </div>

              <textarea
                value={draft.notes ?? ''}
                onChange={(event) =>
                  setDrafts((current) => ({
                    ...current,
                    [project._id]: {
                      ...current[project._id],
                      notes: event.target.value,
                    },
                  }))
                }
                rows={3}
                className="mt-4 w-full rounded-[1.2rem] border border-soot/10 bg-white px-4 py-3 outline-none focus:border-ember-400"
              />

              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-soot/45">
                  Inicio {formatDate(project.startDate)}
                </p>
                <button
                  type="button"
                  onClick={() => onUpdate(project._id)}
                  className="rounded-full bg-soot px-5 py-3 text-sm font-extrabold text-white"
                >
                  Actualizar proyecto
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default AdminProjectList
