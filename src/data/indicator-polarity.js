// Polarity of each indicator sheet:
//   'highGood' — higher values are better (green = high, red = low)
//   'lowGood'  — lower values are better (green = low, red = high)
//   'neutral'  — no clear directionality (treated as lowGood for colouring)

export const INDICATOR_POLARITY = {
  // Demography & geography
  '2a_Popdens':      'neutral',   // population density — contextual
  '3a_MedAge':       'neutral',   // median age — contextual
  '12a_PopCha':      'highGood',  // population growth — more is better

  // Innovation, research & SMEs
  '23a_RCI':         'highGood',  // regional competitiveness index
  '25a_RIS':         'highGood',  // regional innovation scoreboard

  // Environment & climate
  '153a_Waste':      'lowGood',   // waste intensity — less is better
  '47a_Renewable':   'highGood',  // renewable energy share — more is better
  '155a_Drought':    'lowGood',   // drought risk — less is better
  '67a_Flood':       'lowGood',   // flood risk — less is better
  '52a_AirQ':        'lowGood',   // air pollution — less is better

  // Digital & transport connectivity
  '86a_Broadband':   'highGood',  // broadband coverage — more is better
  '97a_TENT':        'highGood',  // TEN-T accessibility — more is better

  // Economy & labour market
  '99g_EmplSect':    'highGood',  // employment by sector
  '99h_EmplSect':    'highGood',
  '99i_EmplSect':    'highGood',
  '156a_GDP':        'highGood',  // GDP per capita — more is better
  '154a_QualityGov': 'highGood',  // quality of governance — higher is better

  // Culture & tourism
  '116a_Tourism':    'highGood',  // tourism intensity — more is better
  '157a_UNESCO':     'highGood',  // UNESCO heritage sites — more is better

  // Social cohesion & housing
  '121a_Housing':    'lowGood',   // housing cost overburden — less is better
  '121b_Housing':    'lowGood',
  '134a_SpAccess':   'highGood',  // spatial accessibility — more is better
  '134b_SpAccess':   'highGood',

  // Education
  '101a_Edu':        'highGood',  // education attainment — more is better
  '101b_Edu':        'highGood',
  '101c_Edu':        'highGood',

  // Social exclusion & poverty
  '106a_NEET':       'lowGood',   // NEET rate — less is better
  '107a_Unempl':     'lowGood',   // unemployment rate — less is better
  '107b_Unempl':     'lowGood',
  '107c_Unempl':     'lowGood',
  '137a_AROPE':      'lowGood',   // at-risk of poverty — less is better
}

export function getPolarity(sheetCode) {
  return INDICATOR_POLARITY[sheetCode] ?? 'lowGood'
}
