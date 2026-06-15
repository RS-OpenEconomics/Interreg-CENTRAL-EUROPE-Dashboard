import styles from './KpiStrip.module.css'

export default function KpiStrip({ stats, euVal, eu27Val, selectedYear, benchmarkLabel = 'Programme avg' }) {
  if (!stats) return null
  if (euVal == null) euVal = 0

  const eu27Gap = eu27Val != null ? eu27Val - euVal : null

  const cards = [
    {
      label: 'EU27 avg',
      value: eu27Val != null ? eu27Val.toFixed(1) : 'N/A',
      sub: `All EU27 regions · ${selectedYear}`,
      delta: eu27Gap != null
        ? (eu27Gap > 0 ? '+' : '') + eu27Gap.toFixed(1) + ' vs ' + benchmarkLabel
        : '—',
      deltaOk: eu27Gap != null ? eu27Gap <= 0 : true,
      dimmed: eu27Val == null,
    },
    {
      label: stats.isSelection ? 'Highest (selection)' : 'Highest value',
      value: stats.max.toFixed(1),
      sub: stats.maxRegion?.name || '—',
      delta: '+' + (stats.max - euVal).toFixed(1) + ' vs ' + benchmarkLabel,
      deltaOk: false,
    },
    {
      label: stats.isSelection ? 'Lowest (selection)' : 'Lowest value',
      value: stats.min.toFixed(1),
      sub: stats.minRegion?.name || '—',
      delta: (stats.min - euVal).toFixed(1) + ' vs ' + benchmarkLabel,
      deltaOk: true,
    },
    {
      label: benchmarkLabel,
      value: euVal.toFixed(1),
      sub: `All CE regions · ${selectedYear}`,
      delta: eu27Gap != null
        ? (eu27Gap < 0 ? '+' : '') + (eu27Gap < 0 ? (-eu27Gap).toFixed(1) : eu27Gap.toFixed(1)) + ' gap vs EU27'
        : '—',
      deltaOk: eu27Gap != null ? eu27Gap >= 0 : true,
    },
  ]

  return (
    <div className={styles.grid}>
      {cards.map((c, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.label}>{c.label}</div>
          <div className={`${styles.value} ${c.dimmed ? styles.dimmed : ''}`}>{c.value}</div>
          <div className={styles.sub}>{c.sub}</div>
          <div className={`${styles.delta} ${c.deltaOk ? styles.green : styles.red}`}>
            {c.delta}
          </div>
        </div>
      ))}
    </div>
  )
}
