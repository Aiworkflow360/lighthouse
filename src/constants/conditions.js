// Condition categories and common conditions for the wizard typeahead
// Phase 1: curated list. Phase 2: fetched from Supabase.

export const CONDITION_CATEGORIES = [
  { id: 'developmental', label: 'Autism & Development' },
  { id: 'mental_health', label: 'Mental Health' },
  { id: 'learning', label: 'Learning Disabilities' },
  { id: 'sensory', label: 'Sensory & Communication' },
  { id: 'behavioural', label: 'Behavioural & Emotional' },
  { id: 'chronic', label: 'Chronic Conditions' },
  { id: 'physical', label: 'Physical & Mobility' },
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
  // === Developmental ===
  { name: 'Autism / ASD', category: 'developmental', terms: ['autism', 'ASD', 'autistic', 'aspergers', "asperger's", 'spectrum'] },
  { name: 'ADHD', category: 'developmental', terms: ['ADHD', 'attention deficit', 'hyperactivity', 'ADD', 'inattentive'] },
  { name: 'Global Developmental Delay', category: 'developmental', terms: ['developmental delay', 'GDD', 'delayed development'] },
  { name: 'Speech & Language Delay', category: 'developmental', terms: ['speech delay', 'language delay', 'speech and language', 'late talker'] },
  { name: 'Developmental Coordination Disorder (DCD)', category: 'developmental', terms: ['DCD', 'developmental coordination', 'clumsy child'] },

  // === Mental Health ===
  { name: 'Anxiety Disorder', category: 'mental_health', terms: ['anxiety', 'generalised anxiety', 'GAD', 'worry'] },
  { name: 'Depression', category: 'mental_health', terms: ['depression', 'low mood', 'depressed'] },
  { name: 'OCD', category: 'mental_health', terms: ['OCD', 'obsessive compulsive', 'obsessive-compulsive'] },
  { name: 'Eating Disorder', category: 'mental_health', terms: ['eating disorder', 'anorexia', 'bulimia', 'ARFID'] },
  { name: 'PTSD / Trauma', category: 'mental_health', terms: ['PTSD', 'trauma', 'post-traumatic'] },
  { name: 'Self-Harm', category: 'mental_health', terms: ['self-harm', 'self harm', 'cutting'] },
  { name: 'Social Anxiety', category: 'mental_health', terms: ['social anxiety', 'social phobia'] },

  // === Learning ===
  { name: 'Dyslexia', category: 'learning', terms: ['dyslexia', 'reading difficulty', 'word blind'] },
  { name: 'Dyspraxia', category: 'learning', terms: ['dyspraxia', 'motor planning'] },
  { name: 'Dyscalculia', category: 'learning', terms: ['dyscalculia', 'maths difficulty', 'number blind'] },
  { name: 'Intellectual Disability', category: 'learning', terms: ['intellectual disability', 'learning disability', 'learning difficulty'] },
  { name: 'Specific Learning Difficulty (SpLD)', category: 'learning', terms: ['SpLD', 'specific learning difficulty'] },

  // === Sensory & Communication ===
  { name: 'Selective Mutism', category: 'sensory', terms: ['selective mutism', 'mutism', "won't speak", "doesn't talk", 'silent'] },
  { name: 'Sensory Processing Disorder', category: 'sensory', terms: ['sensory processing', 'SPD', 'sensory issues', 'sensory overload'] },
  { name: 'Hearing Loss / Deafness', category: 'sensory', terms: ['deaf', 'hearing loss', 'hearing impairment', 'hard of hearing'] },
  { name: 'Visual Impairment / Blindness', category: 'sensory', terms: ['blind', 'visual impairment', 'sight loss', 'partially sighted'] },
  { name: 'Auditory Processing Disorder', category: 'sensory', terms: ['APD', 'auditory processing', 'CAPD'] },

  // === Behavioural & Emotional ===
  { name: 'Conduct Disorder', category: 'behavioural', terms: ['conduct disorder', 'behaviour problems'] },
  { name: 'Oppositional Defiant Disorder (ODD)', category: 'behavioural', terms: ['ODD', 'oppositional defiant', 'defiant'] },
  { name: 'Attachment Difficulties', category: 'behavioural', terms: ['attachment', 'RAD', 'reactive attachment'] },
  { name: 'Pathological Demand Avoidance (PDA)', category: 'behavioural', terms: ['PDA', 'pathological demand avoidance', 'demand avoidance'] },

  // === Chronic ===
  { name: 'Asthma (Severe / Brittle)', category: 'chronic', terms: ['asthma', 'breathing', 'inhaler'] },
  { name: 'Type 1 Diabetes', category: 'chronic', terms: ['type 1 diabetes', 'T1D', 'insulin', 'diabetes'] },
  { name: 'Eczema (Severe)', category: 'chronic', terms: ['eczema', 'atopic dermatitis', 'skin condition'] },
  { name: "Crohn's Disease / Colitis", category: 'chronic', terms: ["crohn's", 'colitis', 'IBD', 'inflammatory bowel'] },
  { name: 'Coeliac Disease', category: 'chronic', terms: ['coeliac', 'celiac', 'gluten'] },
  { name: 'Chronic Fatigue Syndrome / ME', category: 'chronic', terms: ['CFS', 'ME', 'chronic fatigue', 'myalgic'] },
  { name: 'Severe Allergies / Anaphylaxis', category: 'chronic', terms: ['allergy', 'anaphylaxis', 'epipen', 'food allergy', 'nut allergy'] },

  // === Physical & Mobility ===
  { name: 'Spina Bifida', category: 'physical', terms: ['spina bifida'] },
  { name: 'Limb Differences', category: 'physical', terms: ['limb difference', 'amputee', 'missing limb', 'prosthetic'] },
  { name: 'Juvenile Idiopathic Arthritis', category: 'physical', terms: ['juvenile arthritis', 'JIA', 'joint pain'] },
  { name: 'Ehlers-Danlos Syndrome', category: 'physical', terms: ['ehlers-danlos', 'EDS', 'hypermobility'] },

  // === Cancer ===
  { name: 'Acute Lymphoblastic Leukaemia (ALL)', category: 'cancer', terms: ['leukaemia', 'leukemia', 'blood cancer', 'ALL'] },
  { name: 'Brain Tumour', category: 'cancer', terms: ['brain tumour', 'brain tumor', 'CNS tumour', 'glioma'] },
  { name: 'Neuroblastoma', category: 'cancer', terms: ['neuroblastoma'] },
  { name: 'Wilms Tumour', category: 'cancer', terms: ['wilms', 'kidney cancer', 'nephroblastoma'] },
  { name: 'Lymphoma', category: 'cancer', terms: ['lymphoma', 'hodgkins', "hodgkin's", 'non-hodgkins'] },
  { name: 'Bone Cancer (Osteosarcoma)', category: 'cancer', terms: ['osteosarcoma', 'bone cancer', 'ewings', "ewing's"] },
  { name: 'Retinoblastoma', category: 'cancer', terms: ['retinoblastoma', 'eye cancer'] },
  { name: 'Rhabdomyosarcoma', category: 'cancer', terms: ['rhabdomyosarcoma', 'soft tissue'] },
  { name: 'Other Childhood Cancer', category: 'cancer', terms: ['cancer', 'tumour', 'tumor'] },

  // === Heart ===
  { name: 'Congenital Heart Disease', category: 'heart', terms: ['heart defect', 'congenital heart', 'CHD', 'hole in heart'] },
  { name: 'Hypoplastic Left Heart Syndrome', category: 'heart', terms: ['HLHS', 'hypoplastic'] },
  { name: 'Tetralogy of Fallot', category: 'heart', terms: ['tetralogy', 'fallot', 'ToF'] },
  { name: 'Cardiomyopathy', category: 'heart', terms: ['cardiomyopathy', 'heart muscle'] },
  { name: 'Heart Transplant', category: 'heart', terms: ['heart transplant'] },

  // === Neurological ===
  { name: 'Epilepsy (Severe/Drug-Resistant)', category: 'neurological', terms: ['epilepsy', 'seizures', 'fits'] },
  { name: 'Cerebral Palsy', category: 'neurological', terms: ['cerebral palsy', 'CP'] },
  { name: 'Muscular Dystrophy', category: 'neurological', terms: ['muscular dystrophy', 'duchenne', 'DMD'] },
  { name: 'Spinal Muscular Atrophy', category: 'neurological', terms: ['SMA', 'spinal muscular'] },
  { name: 'Hydrocephalus', category: 'neurological', terms: ['hydrocephalus', 'water on brain'] },

  // === Genetic ===
  { name: "Down's Syndrome", category: 'genetic', terms: ['downs', "down's", 'trisomy 21'] },
  { name: "Edwards' Syndrome", category: 'genetic', terms: ['edwards', 'trisomy 18'] },
  { name: 'Cystic Fibrosis', category: 'genetic', terms: ['cystic fibrosis', 'CF'] },
  { name: 'Sickle Cell Disease', category: 'genetic', terms: ['sickle cell', 'sickle'] },

  // === Rare ===
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
