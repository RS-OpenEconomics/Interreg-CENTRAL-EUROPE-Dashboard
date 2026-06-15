import { useState, useMemo } from 'react'
import {
  INDICATORS_DATA,
  REGIONS,
  COUNTRIES,
} from '../data/indicators_data_POC'

export const CE_COUNTRIES = COUNTRIES

export function useIndicatorState(sheetCode) {
  const currentData = sheetCode ? INDICATORS_DATA[sheetCode] : null

  // Derive available years from eu27Avg/programmeAvg keys (exclude composite keys like "2014_2024")
  const yearSrc = currentData?.eu27Avg || currentData?.programmeAvg || {}
  const years = Object.keys(yearSrc).filter(y => !/\d+_\d+/.test(y)).sort()

  const allCountryCodes = COUNTRIES.map(c => c.code)

  const [selectedYear,    setSelectedYear]    = useState(years[years.length - 1] || '2024')
  const [activeCountries, setActiveCountries] = useState(allCountryCodes)
  const [focusRegions,    setFocusRegions]    = useState([])

  // Build regions array: REGIONS list + series from current indicator
  const regions = useMemo(() => {
    if (!currentData) return []
    return REGIONS.map(r => ({
      ...r,
      code: r.id,
      series: currentData.regions[r.id] || {},
    }))
  }, [sheetCode])

  const filtered = useMemo(
    () => activeCountries.length === 0
      ? []
      : regions.filter(r => activeCountries.includes(r.country)),
    [regions, activeCountries]
  )

  // Stats on focusRegions if any, otherwise all filtered regions
  const statsRegions = useMemo(() => {
    if (focusRegions.length > 0) {
      return regions.filter(r => focusRegions.includes(r.code))
    }
    return filtered
  }, [focusRegions, regions, filtered])

  const stats = useMemo(() => {
    const vals = statsRegions.map(r => r.series[selectedYear]).filter(v => v != null)
    if (!vals.length) return null
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length
    const max = Math.max(...vals)
    const min = Math.min(...vals)
    const isSelection = focusRegions.length > 0 && focusRegions.length < regions.length
    return {
      avg, max, min, count: vals.length,
      maxRegion: statsRegions.find(r => r.series[selectedYear] === max),
      minRegion: statsRegions.find(r => r.series[selectedYear] === min),
      isSelection,
    }
  }, [statsRegions, selectedYear, focusRegions, regions])

  const focusRegionObjects = useMemo(
    () => focusRegions.map(id => regions.find(r => r.code === id)).filter(Boolean),
    [focusRegions, regions]
  )

  const focusRegionId = focusRegions[0] || null

  const setFocusRegionId = (id) => {
    if (!id) setFocusRegions([])
    else setFocusRegions(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    )
  }

  // Real EU27 average (all ~245 EU NUTS2 regions)
  const eu27Avg = currentData?.eu27Avg || {}

  // CE Programme area average (111 CE programme regions)
  const programmeAvg = currentData?.programmeAvg || {}

  return {
    regions, years, filtered,
    selectedYear, setSelectedYear,
    activeCountries, setActiveCountries,
    focusRegions, setFocusRegions,
    focusRegionId, setFocusRegionId,
    focusRegionObjects,
    stats,
    eu27Avg,
    programmeAvg,
    countries: COUNTRIES,
    hasTimeSeries: years.length > 2,
  }
}
