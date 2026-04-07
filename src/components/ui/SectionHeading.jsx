import clsx from 'clsx'

function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <div className={clsx('max-w-3xl', center && 'mx-auto text-center')}>
      {eyebrow ? (
        <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-ember-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-display text-4xl leading-tight text-soot sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-soot/70 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeading
