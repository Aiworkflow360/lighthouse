// Condition categories and common conditions for the wizard typeahead
// Phase 1: curated list. Phase 2: fetched from Supabase.

export const CONDITION_CATEGORIES = [
  { id: 'cancer', label: 'Cancer' },
  { id: 'heart', label: 'Heart Conditions' },
  { id: 'neurological', label: 'Brain & Neurological' },
  { id: 'genetic', label: 'Genetic & Chromosomal' },
  { id: 'rare', label: 'Rare Disease' },
  { id: 'respiratory', label: 'Respiratory & Lung' },
  { id: 'metabolic', label: 'Metabolic Conditions' },
  { id: 'other', label: 'Other / Not Listed' },
];

export const COMMON_CONDITIONS = [
  // Cancer
  { name: 'Acute Lymphoblastic Leukaemia (ALL)', category: 'cancer', terms: ['leukaemia', 'leukemia', 'blood cancer', 'ALL'] },
  { name: 'Brain Tumour', category: 'cancer', terms: ['brain tumour', 'brain tumor', 'CNS tumour', 'glioma'] },
  { name: 'Neuroblastoma', category: 'cancer', terms: ['neuroblastoma'] },
  { name: 'Wilms Tumour', category: 'cancer', terms: ['wilms', 'kidney cancer', 'nephroblastoma'] },
  { name: 'Lymphoma', category: 'cancer', terms: ['lymphoma', 'hodgkins', "hodgkin's", 'non-hodgkins'] },
  { name: 'Bone Cancer (Osteosarcoma)', category: 'cancer', terms: ['osteosarcoma', 'bone cancer', 'ewings', "ewing's"] },
  { name: 'Retinoblastoma', category: 'cancer', terms: ['retinoblastoma', 'eye cancer'] },
  { name: 'Rhabdomyosarcoma', category: 'cancer', terms: ['rhabdomyosarcoma', 'soft tissue'] },
  { name: 'Other Childhood Cancer', category: 'cancer', terms: ['cancer', 'tumour', 'tumor'] },

  // Heart
  { name: 'Congenital Heart Disease', category: 'heart', terms: ['heart defect', 'congenital heart', 'CHD', 'hole in heart'] },
  { name: 'Hypoplastic Left Heart Syndrome', category: 'heart', terms: ['HLHS', 'hypoplastic'] },
  { name: 'Tetralogy of Fallot', category: 'heart', terms: ['tetralogy', 'fallot', 'ToF'] },
  { name: 'Cardiomyopathy', category: 'heart', terms: ['cardiomyopathy', 'heart muscle'] },
  { name: 'Heart Transplant', category: 'heart', terms: ['heart transplant'] },

  // Neurological
  { name: 'Epilepsy (Severe/Drug-Resistant)', category: 'neurological', terms: ['epilepsy', 'seizures', 'fits'] },
  { name: 'Cerebral Palsy', category: 'neurological', terms: ['cerebral palsy', 'CP'] },
  { name: 'Muscular Dystrophy', category: 'neurological', terms: ['muscular dystrophy', 'duchenne', 'DMD'] },
  { name: 'Spinal Muscular Atrophy', category: 'neurological', terms: ['SMA', 'spinal muscular'] },
  { name: 'Hydrocephalus', category: 'neurological', terms: ['hydrocephalus', 'water on brain'] },

  // Genetic
  { name: "Down's Syndrome", category: 'genetic', terms: ['downs', "down's", 'trisomy 21'] },
  { name: "Edwards' Syndrome", category: 'genetic', terms: ['edwards', 'trisomy 18'] },
  { name: 'Cystic Fibrosis', category: 'genetic', terms: ['cystic fibrosis', 'CF'] },
  { name: 'Sickle Cell Disease', category: 'genetic', terms: ['sickle cell', 'sickle'] },

  // Rare
  { name: 'Batten Disease', category: 'rare', terms: ['batten', 'NCL'] },
  { name: 'Undiagnosed / Awaiting Diagnosis', category: 'rare', terms: ['undiagnosed', 'unknown', 'waiting', "don't know"] },
];

export const AGE_RANGES = [
  { id: 'prenatal', label: 'Not Yet Born', min: null, max: null },
  { id: 'under1', label: 'Under 1', min: 0, max: 0 },
  { id: '1-4', label: '1 - 4', min: 1, max: 4 },
  { id: '5-11', label: '5 - 11', min: 5, max: 11 },
  { id: '12-17', label: '12 - 17', min: 12, max: 17 },
  { id: '18-25', label: '18 - 25', min: 18, max: 25 },
];
