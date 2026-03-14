import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { T } from '../../constants/theme';

/* ── Letter templates ────────────────────────────────────── */
const LETTER_TEMPLATES = {
  ehcp_request: {
    id: 'ehcp_request',
    title: 'Request an EHC Needs Assessment',
    category: 'education',
    description: 'Ask your local authority to assess your child for an Education, Health and Care Plan.',
    fields: [
      { key: 'parentName', label: 'Your name', placeholder: 'e.g. Sarah Jones' },
      { key: 'childName', label: "Child's name", placeholder: "e.g. Oliver Jones" },
      { key: 'childAge', label: "Child's age", placeholder: 'e.g. 7' },
      { key: 'schoolName', label: 'School name', placeholder: 'e.g. Oakfield Primary School' },
      { key: 'localAuthority', label: 'Local authority', placeholder: 'e.g. Surrey County Council' },
      { key: 'condition', label: "Child's condition/needs", placeholder: 'e.g. autism, sensory processing difficulties' },
    ],
    generate: (f) => `${f.parentName || '[Your name]'}
${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

SEN Department
${f.localAuthority || '[Local Authority]'}

Dear SEN Team,

RE: Request for Education, Health and Care Needs Assessment
Child: ${f.childName || '[Child name]'}, Age ${f.childAge || '[age]'}
School: ${f.schoolName || '[School name]'}

I am writing to formally request that the local authority carries out an Education, Health and Care (EHC) needs assessment for my child, ${f.childName || '[child name]'}, under Section 36 of the Children and Families Act 2014.

${f.childName || '[Child name]'} has ${f.condition || '[condition/needs]'} and is currently attending ${f.schoolName || '[school name]'}. Despite the support provided by the school through SEN Support, ${f.childName || '[they]'} continues to experience significant difficulties that I believe require a more detailed assessment of their needs.

I understand that you must respond to this request within six weeks, and I would appreciate written confirmation that this request has been received.

I am happy to provide any additional information or attend meetings to support this process.

Yours faithfully,

${f.parentName || '[Your name]'}`,
  },

  school_meeting: {
    id: 'school_meeting',
    title: 'Request a meeting with school SENCO',
    category: 'education',
    description: 'Formally request a meeting to discuss your child\'s SEN support at school.',
    fields: [
      { key: 'parentName', label: 'Your name', placeholder: 'e.g. Sarah Jones' },
      { key: 'childName', label: "Child's name", placeholder: "e.g. Oliver Jones" },
      { key: 'schoolName', label: 'School name', placeholder: 'e.g. Oakfield Primary School' },
      { key: 'headTeacher', label: 'Head teacher / SENCO name', placeholder: 'e.g. Mrs Williams' },
      { key: 'concerns', label: 'Main concerns', placeholder: 'e.g. struggling with reading, finding the classroom overwhelming' },
    ],
    generate: (f) => `${f.parentName || '[Your name]'}
${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

${f.headTeacher || '[Head Teacher / SENCO name]'}
${f.schoolName || '[School name]'}

Dear ${f.headTeacher || '[Head Teacher / SENCO]'},

RE: Meeting to discuss SEN support for ${f.childName || '[child name]'}

I am writing to request a meeting with the school's Special Educational Needs Co-ordinator (SENCO) to discuss the support being provided for my child, ${f.childName || '[child name]'}.

I have some concerns I would like to discuss, including: ${f.concerns || '[your concerns]'}.

I would be grateful if we could arrange a meeting at a mutually convenient time within the next two weeks. I am available during school hours and after school.

I look forward to hearing from you.

Yours sincerely,

${f.parentName || '[Your name]'}`,
  },

  dla_cover: {
    id: 'dla_cover',
    title: 'DLA application cover letter',
    category: 'financial',
    description: 'A cover letter to accompany your Disability Living Allowance application.',
    fields: [
      { key: 'parentName', label: 'Your name', placeholder: 'e.g. Sarah Jones' },
      { key: 'childName', label: "Child's name", placeholder: "e.g. Oliver Jones" },
      { key: 'childDob', label: "Child's date of birth", placeholder: 'e.g. 15 March 2018' },
      { key: 'niNumber', label: 'Your NI number (optional)', placeholder: 'e.g. AB 12 34 56 C' },
      { key: 'condition', label: "Child's condition", placeholder: 'e.g. autism spectrum disorder' },
    ],
    generate: (f) => `${f.parentName || '[Your name]'}
${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

Disability Living Allowance
Mail Handling Site A
Wolverhampton
WV98 2AH

Dear Sir/Madam,

RE: DLA claim for ${f.childName || '[child name]'}
Date of birth: ${f.childDob || '[date of birth]'}
${f.niNumber ? `NI Number: ${f.niNumber}` : ''}

Please find enclosed the DLA claim form for my child, ${f.childName || '[child name]'}, who has ${f.condition || '[condition]'}.

I would like this claim to be backdated to the date of my initial telephone call, as discussed.

${f.childName || '[Child name]'}'s condition affects them daily and they require significantly more care and supervision than a child of the same age without a disability.

I have enclosed supporting evidence from ${f.childName || '[child name]'}'s medical professionals. Please do not hesitate to contact me if you require any further information.

Yours faithfully,

${f.parentName || '[Your name]'}`,
  },

  gp_referral: {
    id: 'gp_referral',
    title: 'Request a GP referral',
    category: 'medical',
    description: 'Ask your GP for a referral to a specialist for your child.',
    fields: [
      { key: 'parentName', label: 'Your name', placeholder: 'e.g. Sarah Jones' },
      { key: 'childName', label: "Child's name", placeholder: "e.g. Oliver Jones" },
      { key: 'childDob', label: "Child's date of birth", placeholder: 'e.g. 15 March 2018' },
      { key: 'gpName', label: 'GP name / surgery', placeholder: 'e.g. Dr Patel, Oak Lane Surgery' },
      { key: 'referralTo', label: 'Specialist/service needed', placeholder: 'e.g. paediatric assessment, CAMHS, occupational therapy' },
      { key: 'concerns', label: 'Why you are concerned', placeholder: 'e.g. difficulty with social interactions, sensory sensitivities, not meeting milestones' },
    ],
    generate: (f) => `${f.parentName || '[Your name]'}
${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

${f.gpName || '[GP name / surgery]'}

Dear ${f.gpName || 'Doctor'},

RE: Referral request for ${f.childName || '[child name]'}
Date of birth: ${f.childDob || '[date of birth]'}

I am writing to formally request a referral for my child, ${f.childName || '[child name]'}, to ${f.referralTo || '[specialist/service]'}.

I have concerns about ${f.childName || '[child name]'}'s development, specifically: ${f.concerns || '[your concerns]'}.

These difficulties are affecting ${f.childName || '[child name]'}'s daily life and I believe a specialist assessment would help us understand their needs and access appropriate support.

I would be grateful if you could process this referral at your earliest convenience. I am happy to attend an appointment to discuss this further if needed.

Thank you for your time.

Yours sincerely,

${f.parentName || '[Your name]'}`,
  },

  /* ── ADHD-specific letter templates ─────────────────────── */

  adhd_reasonable_adjustments: {
    id: 'adhd_reasonable_adjustments',
    title: 'Request reasonable adjustments for ADHD',
    category: 'education',
    description: 'Ask the school to put specific, evidence-based ADHD adjustments in place. References the Equality Act 2010.',
    fields: [
      { key: 'parentName', label: 'Your name', placeholder: 'e.g. Sarah Jones' },
      { key: 'childName', label: "Child's name", placeholder: "e.g. Oliver Jones" },
      { key: 'childAge', label: "Child's age", placeholder: 'e.g. 8' },
      { key: 'schoolName', label: 'School name', placeholder: 'e.g. Oakfield Primary School' },
      { key: 'sencoName', label: 'SENCO name (if known)', placeholder: 'e.g. Mrs Williams' },
      { key: 'yearGroup', label: 'Year group', placeholder: 'e.g. Year 3' },
    ],
    generate: (f) => `${f.parentName || '[Your name]'}
${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

${f.sencoName || '[SENCO name]'}
${f.schoolName || '[School name]'}

Dear ${f.sencoName || '[SENCO]'},

RE: Request for reasonable adjustments for ${f.childName || '[child name]'}, ${f.yearGroup || '[Year group]'}

I am writing to formally request that the school puts reasonable adjustments in place for my child, ${f.childName || '[child name]'}, who has a diagnosis of ADHD.

ADHD is recognised as a disability under the Equality Act 2010. Under Section 20 of the Act, the school has a duty to make reasonable adjustments so that ${f.childName || '[child name]'} is not placed at a substantial disadvantage compared to pupils who do not have a disability. This is an anticipatory duty, meaning the school should not wait until a problem arises before acting.

I am requesting the following specific adjustments, which are evidence-based and widely recognised as effective for children with ADHD:

1. Movement breaks every 20-30 minutes during lessons
2. Access to fidget tools (such as a fidget cube, resistance band on chair legs, or stress ball)
3. Preferential seating near the teacher and away from windows and high-traffic areas
4. A visual timetable displayed at ${f.childName || '[child name]'}'s desk
5. Pre-warning before transitions between activities (e.g. "In 5 minutes we will be...")
6. A calm-down space that ${f.childName || '[child name]'} can go to when overwhelmed, without being treated as a punishment
7. A reduced homework load, with consideration of the effort ${f.childName || '[child name]'} already puts in during the school day
8. A positive behaviour support plan that focuses on understanding triggers, preventive strategies, and positive reinforcement rather than sanctions and punishment-based approaches

I would welcome a meeting to discuss how these adjustments can be implemented. I would also like to request that an Assess, Plan, Do, Review cycle is put in place for ${f.childName || '[child name]'}, in line with the graduated approach set out in the SEND Code of Practice 2015.

I am keeping a copy of this letter for my records.

Yours sincerely,

${f.parentName || '[Your name]'}`,
  },

  adhd_exclusion_challenge: {
    id: 'adhd_exclusion_challenge',
    title: 'Challenge a school exclusion (ADHD)',
    category: 'education',
    description: 'Challenge a fixed-term exclusion where ADHD-related behaviour was punished without adjustments in place.',
    fields: [
      { key: 'parentName', label: 'Your name', placeholder: 'e.g. Sarah Jones' },
      { key: 'childName', label: "Child's name", placeholder: "e.g. Oliver Jones" },
      { key: 'schoolName', label: 'School name', placeholder: 'e.g. Oakfield Primary School' },
      { key: 'headTeacher', label: 'Head teacher name', placeholder: 'e.g. Mr Brown' },
      { key: 'exclusionDate', label: 'Date of exclusion', placeholder: 'e.g. 10 March 2026' },
      { key: 'exclusionReason', label: 'Reason given for exclusion', placeholder: 'e.g. disruptive behaviour, not following instructions' },
      { key: 'exclusionLength', label: 'Length of exclusion', placeholder: 'e.g. 2 days' },
    ],
    generate: (f) => `${f.parentName || '[Your name]'}
${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

${f.headTeacher || '[Head Teacher]'}
${f.schoolName || '[School name]'}

Dear ${f.headTeacher || '[Head Teacher]'},

RE: Challenge to fixed-term exclusion of ${f.childName || '[child name]'} on ${f.exclusionDate || '[date]'}

I am writing regarding the ${f.exclusionLength || '[length]'} fixed-term exclusion of my child, ${f.childName || '[child name]'}, on ${f.exclusionDate || '[date]'}, for "${f.exclusionReason || '[reason given]'}".

${f.childName || '[Child name]'} has a diagnosis of ADHD. ADHD is a disability under the Equality Act 2010. I am concerned that this exclusion may be discriminatory because:

1. The behaviour that led to the exclusion is directly related to ${f.childName || '[child name]'}'s ADHD. Difficulties with impulse control, sitting still, following multi-step instructions, and regulating emotions are core features of the condition, not choices.

2. Under Section 20 of the Equality Act 2010, the school has a duty to make reasonable adjustments for disabled pupils. I would like to understand what reasonable adjustments were in place at the time of the incident, and what evidence the school has that these adjustments were being consistently applied.

3. The Department for Education's statutory guidance on exclusions (Suspension and Permanent Exclusion from maintained schools, academies and pupil referral units in England, 2023) states that head teachers should consider whether the behaviour was a result of an unmet need and whether reasonable adjustments had been made.

I am requesting:

- A copy of the written record of the incident that led to the exclusion
- Details of what reasonable adjustments were in place for ${f.childName || '[child name]'} at the time
- A copy of ${f.childName || '[child name]'}'s current SEN Support plan or provision map
- A meeting to discuss what adjustments and support will be put in place to prevent further exclusions

I want to work with the school to find solutions. Exclusion is not a solution for ADHD. I would welcome a meeting at the earliest opportunity to discuss a positive behaviour support plan and appropriate reasonable adjustments.

I am copying this letter to the Chair of Governors.

Yours sincerely,

${f.parentName || '[Your name]'}`,
  },

  adhd_behaviour_plan: {
    id: 'adhd_behaviour_plan',
    title: 'Request a positive behaviour plan (ADHD)',
    category: 'education',
    description: 'Ask the school to create a positive behaviour support plan instead of using punishment-based approaches.',
    fields: [
      { key: 'parentName', label: 'Your name', placeholder: 'e.g. Sarah Jones' },
      { key: 'childName', label: "Child's name", placeholder: "e.g. Oliver Jones" },
      { key: 'schoolName', label: 'School name', placeholder: 'e.g. Oakfield Primary School' },
      { key: 'sencoName', label: 'SENCO or head teacher name', placeholder: 'e.g. Mrs Williams' },
      { key: 'currentIssues', label: 'Current difficulties at school', placeholder: 'e.g. losing break times for not completing work, detentions for calling out' },
    ],
    generate: (f) => `${f.parentName || '[Your name]'}
${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

${f.sencoName || '[SENCO / Head Teacher]'}
${f.schoolName || '[School name]'}

Dear ${f.sencoName || '[SENCO / Head Teacher]'},

RE: Request for a positive behaviour support plan for ${f.childName || '[child name]'}

I am writing to request that the school creates a positive behaviour support plan for my child, ${f.childName || '[child name]'}, who has a diagnosis of ADHD.

I am concerned that the current approach to managing ${f.childName || '[child name]'}'s behaviour is not working. Specifically: ${f.currentIssues || '[describe current difficulties, e.g. losing break times, detentions, being told off for fidgeting]'}.

Research consistently shows that punitive approaches are not effective for children with ADHD. Removing break times — when children with ADHD need movement more than any other child — is counterproductive. Similarly, detentions for behaviour that is a symptom of a neurological condition (calling out, fidgeting, not completing work on time) do not change the behaviour. They simply make the child feel bad about something they struggle to control.

ADHD is a disability under the Equality Act 2010, and the school has a duty to make reasonable adjustments. I believe a positive behaviour support plan is a reasonable adjustment that would benefit ${f.childName || '[child name]'} and the whole class.

I would like the plan to include:

1. An understanding of ${f.childName || '[child name]'}'s ADHD-related triggers (e.g. unstructured time, long periods of sitting, transitions, sensory overload, boredom)
2. Preventive strategies to reduce the chance of difficult moments (e.g. movement breaks, seating changes, fidget tools, pre-warning of transitions)
3. Clear, consistent, and achievable expectations — agreed with ${f.childName || '[child name]'} so they understand what is expected
4. Positive reinforcement for effort and progress, not just outcomes
5. A calm-down strategy that ${f.childName || '[child name]'} can use without it being treated as a punishment
6. A plan for what happens when things go wrong that is de-escalating rather than punitive
7. Regular review with me as parent so we can see what is working

I would like to be involved in creating this plan, and I would welcome a meeting to discuss it. I am also happy for ${f.childName || '[child name]'}'s paediatrician or other professionals to contribute.

Yours sincerely,

${f.parentName || '[Your name]'}`,
  },

  adhd_school_complaint: {
    id: 'adhd_school_complaint',
    title: 'Formal complaint about SEND support (ADHD)',
    category: 'education',
    description: 'Formal complaint to the head teacher about failure to provide adequate SEND support for your child with ADHD.',
    fields: [
      { key: 'parentName', label: 'Your name', placeholder: 'e.g. Sarah Jones' },
      { key: 'childName', label: "Child's name", placeholder: "e.g. Oliver Jones" },
      { key: 'schoolName', label: 'School name', placeholder: 'e.g. Oakfield Primary School' },
      { key: 'headTeacher', label: 'Head teacher name', placeholder: 'e.g. Mr Brown' },
      { key: 'concerns', label: 'What has gone wrong', placeholder: 'e.g. no SEN support plan in place, adjustments promised but not delivered, repeated exclusions' },
      { key: 'previousActions', label: 'What you have already tried', placeholder: 'e.g. met with SENCO twice, emailed about adjustments, no changes made' },
    ],
    generate: (f) => `${f.parentName || '[Your name]'}
${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

${f.headTeacher || '[Head Teacher]'}
${f.schoolName || '[School name]'}

Dear ${f.headTeacher || '[Head Teacher]'},

RE: Formal complaint regarding SEND provision for ${f.childName || '[child name]'}

I am writing to make a formal complaint under the school's complaints procedure about the failure to provide adequate special educational needs support for my child, ${f.childName || '[child name]'}, who has a diagnosis of ADHD.

My concerns are as follows:

${f.concerns || '[Describe what has gone wrong — e.g. no SEN support plan, adjustments not implemented, exclusions without support in place]'}

I have already tried to resolve this informally:

${f.previousActions || '[Describe what you have already done — e.g. meetings with SENCO, emails, phone calls]'}

Despite these efforts, the situation has not improved. I believe the school is not meeting its duties under:

- The Equality Act 2010 (duty to make reasonable adjustments for disabled pupils — ADHD is a disability under this Act)
- The SEND Code of Practice 2015 (duty to follow the graduated approach of Assess, Plan, Do, Review for children with SEN)
- The school's own SEN Information Report

I am requesting:

1. A written response to this complaint within 15 school days, as required by your complaints procedure
2. A meeting to agree a clear action plan with specific adjustments, timescales, and named responsible staff
3. An Assess, Plan, Do, Review cycle to be put in place immediately if one is not already in operation
4. Consideration of whether an EHC needs assessment should be requested

I want to work with the school to ensure ${f.childName || '[child name]'} receives the support they are entitled to. If this complaint is not resolved satisfactorily, I am aware that I can escalate to the governing body and, if necessary, seek advice from IPSEA (Independent Provider of Special Education Advice) or my local SENDIASS service.

I am keeping a copy of this letter for my records. I am also sending a copy to the Chair of Governors.

Yours sincerely,

${f.parentName || '[Your name]'}`,
  },
};

/* ── Which letters to show based on wizard needs ─────────── */
function getAvailableLetters(wizard) {
  const needs = wizard?.needs || [];
  const condition = (wizard?.condition || '').toLowerCase();
  const isADHD = condition.includes('adhd') || condition.includes('attention deficit');
  const letters = [];

  // Always show EHCP and school meeting if education is selected
  if (needs.includes('education') || needs.length === 0) {
    letters.push(LETTER_TEMPLATES.ehcp_request);
    letters.push(LETTER_TEMPLATES.school_meeting);
    // Add ADHD-specific education letters
    if (isADHD) {
      letters.push(LETTER_TEMPLATES.adhd_reasonable_adjustments);
      letters.push(LETTER_TEMPLATES.adhd_behaviour_plan);
      letters.push(LETTER_TEMPLATES.adhd_exclusion_challenge);
      letters.push(LETTER_TEMPLATES.adhd_school_complaint);
    }
  }

  // Financial → DLA cover
  if (needs.includes('financial') || needs.length === 0) {
    letters.push(LETTER_TEMPLATES.dla_cover);
  }

  // Medical → GP referral
  if (needs.includes('medical') || needs.length === 0) {
    letters.push(LETTER_TEMPLATES.gp_referral);
  }

  // If nothing matched (e.g. only emotional/practical), show all
  if (letters.length === 0) {
    return Object.values(LETTER_TEMPLATES);
  }

  return letters;
}

/* ── Inline SVG icons ────────────────────────────────────── */
function LetterIcon({ size = 20, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function CopyIcon({ size = 16, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function PrintIcon({ size = 16, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

function ChevronIcon({ size = 18, color, up }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}
      animate={{ rotate: up ? 180 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

function CloseIcon({ size = 20, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ── Category badge colours ──────────────────────────────── */
const CATEGORY_COLORS = {
  education: T.education,
  financial: T.financial,
  medical: T.medical,
  emotional: T.emotional,
  practical: T.practical,
};

/* ── Letter type selector pill ───────────────────────────── */
function LetterTypePill({ template, dark, onClick }) {
  const color = CATEGORY_COLORS[template.category] || T.primary;
  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2, boxShadow: T.shadowCardHover }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        width: '100%',
        padding: '14px 16px',
        background: dark ? T.bgHoverDark : '#FFFFFF',
        border: `1px solid ${dark ? T.borderDark : T.border}`,
        borderLeft: `4px solid ${color}`,
        borderRadius: T.radius,
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: T.font,
        transition: T.transition,
      }}
    >
      <LetterIcon size={20} color={color} />
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '15px', fontWeight: 600, color: textColor,
          lineHeight: '1.3', marginBottom: '4px',
        }}>
          {template.title}
        </div>
        <div style={{
          fontSize: '13px', color: subColor, lineHeight: '1.4',
        }}>
          {template.description}
        </div>
      </div>
      <span style={{
        fontSize: '18px', color: dark ? T.textMutedDark : T.textMuted,
        lineHeight: 1, paddingTop: '2px',
      }}>
        {'\u2192'}
      </span>
    </motion.button>
  );
}

/* ── Letter form + generator modal/expanded view ─────────── */
function LetterForm({ template, wizard, dark, onClose }) {
  const [fields, setFields] = useState(() => {
    // Pre-fill from wizard data where possible
    const initial = {};
    template.fields.forEach(f => {
      if (f.key === 'condition' && wizard?.condition) {
        initial[f.key] = wizard.condition;
      } else if (f.key === 'localAuthority' && wizard?.postcodeData?.localAuthority) {
        initial[f.key] = wizard.postcodeData.localAuthority;
      } else {
        initial[f.key] = '';
      }
    });
    return initial;
  });
  const [generatedLetter, setGeneratedLetter] = useState(null);
  const [copied, setCopied] = useState(false);
  const letterRef = useRef(null);

  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  const color = CATEGORY_COLORS[template.category] || T.primary;

  const handleFieldChange = useCallback((key, value) => {
    setFields(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleGenerate = useCallback(() => {
    const text = template.generate(fields);
    setGeneratedLetter(text);
  }, [template, fields]);

  const handleCopy = useCallback(async () => {
    if (!generatedLetter) return;
    try {
      await navigator.clipboard.writeText(generatedLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = generatedLetter;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [generatedLetter]);

  const handlePrint = useCallback(() => {
    if (!letterRef.current) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${template.title}</title>
          <style>
            body { font-family: 'Inter', system-ui, sans-serif; font-size: 14px; line-height: 1.6; padding: 40px; max-width: 700px; margin: 0 auto; white-space: pre-wrap; color: #1C1917; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>${generatedLetter}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }, [generatedLetter, template.title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        marginBottom: '16px', paddingBottom: '12px',
        borderBottom: `1px solid ${dark ? T.borderDark : T.border}`,
      }}>
        <LetterIcon size={22} color={color} />
        <h3 style={{
          fontFamily: T.font, fontSize: T.sizeH3, fontWeight: 700,
          color: textColor, margin: 0, flex: 1,
        }}>
          {template.title}
        </h3>
        <button
          onClick={onClose}
          aria-label="Close letter generator"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '12px', display: 'flex', borderRadius: T.radius,
            minWidth: '44px', minHeight: '44px',
          }}
        >
          <CloseIcon size={20} color={dark ? T.textMutedDark : T.textMuted} />
        </button>
      </div>

      {/* Form fields */}
      {!generatedLetter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {template.fields.map((field, i) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
              >
                <label style={{
                  fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 600,
                  color: textColor, display: 'block', marginBottom: '4px',
                }}>
                  {field.label}
                </label>
                <input
                  type="text"
                  value={fields[field.key] || ''}
                  onChange={e => handleFieldChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    fontFamily: T.font,
                    fontSize: T.sizeSmall,
                    border: `1.5px solid ${dark ? T.borderDark : T.border}`,
                    borderRadius: '8px',
                    background: dark ? T.bgDark : '#FFFFFF',
                    color: textColor,
                    outline: 'none',
                    boxSizing: 'border-box',
                    minHeight: '44px',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={e => e.target.style.borderColor = color}
                  onBlur={e => e.target.style.borderColor = dark ? T.borderDark : T.border}
                />
              </motion.div>
            ))}
          </div>

          <p style={{
            fontFamily: T.font, fontSize: '12px', color: dark ? T.textMutedDark : T.textMuted,
            margin: '12px 0', fontStyle: 'italic',
            lineHeight: '1.5',
          }}>
            Leave any field blank and we will add a placeholder you can fill in later.
          </p>

          <motion.button
            onClick={handleGenerate}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            style={{
              width: '100%',
              padding: '14px 24px',
              fontFamily: T.font,
              fontSize: T.sizeBody,
              fontWeight: 700,
              color: '#FFFFFF',
              background: `linear-gradient(135deg, ${color} 0%, ${T.warm} 100%)`,
              border: 'none',
              borderRadius: T.radius,
              cursor: 'pointer',
              minHeight: T.touchMin,
              boxShadow: T.shadow,
            }}
          >
            Generate Letter
          </motion.button>
        </motion.div>
      )}

      {/* Generated letter */}
      {generatedLetter && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Action buttons */}
          <div style={{
            display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap',
          }}>
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '10px 18px', fontFamily: T.font, fontSize: T.sizeSmall,
                fontWeight: 600, color: copied ? T.warm : T.primary,
                background: 'transparent',
                border: `1.5px solid ${copied ? T.warm : T.primary}`,
                borderRadius: T.radius, cursor: 'pointer',
                minHeight: T.touchMin, transition: T.transition,
              }}
            >
              <CopyIcon size={16} color={copied ? T.warm : T.primary} />
              {copied ? 'Copied!' : 'Copy to clipboard'}
            </motion.button>

            <motion.button
              onClick={handlePrint}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '10px 18px', fontFamily: T.font, fontSize: T.sizeSmall,
                fontWeight: 600, color: subColor,
                background: 'transparent',
                border: `1.5px solid ${dark ? T.borderDark : T.border}`,
                borderRadius: T.radius, cursor: 'pointer',
                minHeight: T.touchMin, transition: T.transition,
              }}
            >
              <PrintIcon size={16} color={subColor} />
              Print
            </motion.button>

            <motion.button
              onClick={() => setGeneratedLetter(null)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '10px 18px', fontFamily: T.font, fontSize: T.sizeSmall,
                fontWeight: 600, color: subColor,
                background: 'transparent', border: 'none',
                cursor: 'pointer', minHeight: T.touchMin,
              }}
            >
              Edit details
            </motion.button>
          </div>

          {/* Letter display */}
          <div
            ref={letterRef}
            style={{
              fontFamily: T.font,
              fontSize: T.sizeSmall,
              color: textColor,
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              background: dark ? T.bgDark : '#FFFEF9',
              border: `1px solid ${dark ? T.borderDark : T.border}`,
              borderRadius: T.radius,
              padding: '20px',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            {generatedLetter}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ── Main LetterGeneratorCard ────────────────────────────── */
export function LetterGeneratorCard({ wizard, dark }) {
  const [cardExpanded, setCardExpanded] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(null);

  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  const cardBg = dark ? T.bgCardDark : T.bgCard;
  const borderColor = dark ? T.borderDark : T.border;

  const availableLetters = getAvailableLetters(wizard);

  if (availableLetters.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderLeft: 'none',
        borderRadius: T.radiusLg,
        padding: 0,
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: T.shadowMd,
      }}
    >
      {/* Gradient left border */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
        background: `linear-gradient(180deg, ${T.education} 0%, ${T.primary} 100%)`,
        borderRadius: '16px 0 0 16px',
      }} />

      {/* Subtle overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: dark
          ? 'linear-gradient(135deg, rgba(139,92,246,0.04) 0%, transparent 60%)'
          : 'linear-gradient(135deg, rgba(139,92,246,0.03) 0%, transparent 60%)',
        pointerEvents: 'none', borderRadius: T.radiusLg,
      }} />

      <div style={{ position: 'relative', padding: '20px 20px 20px 24px' }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          marginBottom: cardExpanded ? '4px' : '0',
        }}>
          <LetterIcon size={20} color={T.education} />
          <h2 style={{
            fontFamily: T.font, fontSize: T.sizeH2, fontWeight: 700,
            color: textColor, margin: 0, flex: 1,
          }}>
            Tools to help you
          </h2>
          <button
            onClick={() => { setCardExpanded(prev => !prev); setActiveTemplate(null); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 500,
              color: T.education, padding: '10px 12px', borderRadius: T.radius,
              minHeight: T.touchMin, transition: T.transition,
            }}
            aria-expanded={cardExpanded}
            aria-label={cardExpanded ? 'Collapse tools' : 'Expand tools'}
          >
            {cardExpanded ? 'Hide' : 'Show'}
            <ChevronIcon size={18} color={T.education} up={cardExpanded} />
          </button>
        </div>

        {/* Subtitle */}
        {cardExpanded && !activeTemplate && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              fontFamily: T.font,
              fontSize: T.sizeSmall,
              color: subColor,
              margin: '0 0 16px',
              lineHeight: '1.5',
            }}
          >
            Generate ready-to-send letters and templates. Fill in a few details and we will do the rest.
          </motion.p>
        )}

        {/* Content */}
        <AnimatePresence initial={false} mode="wait">
          {cardExpanded && !activeTemplate && (
            <motion.div
              key="letter-list"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {availableLetters.map((template, i) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.1 + i * 0.06 }}
                  >
                    <LetterTypePill
                      template={template}
                      dark={dark}
                      onClick={() => setActiveTemplate(template)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Privacy note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                style={{
                  fontFamily: T.font,
                  fontSize: '12px',
                  color: dark ? T.textMutedDark : T.textMuted,
                  margin: '16px 0 0',
                  fontStyle: 'italic',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '14px' }} aria-hidden="true">{'\uD83D\uDD12'}</span>
                This stays on your device. We don't store any of this.
              </motion.p>
            </motion.div>
          )}

          {cardExpanded && activeTemplate && (
            <motion.div
              key="letter-form"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <LetterForm
                template={activeTemplate}
                wizard={wizard}
                dark={dark}
                onClose={() => setActiveTemplate(null)}
              />

              {/* Privacy note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                style={{
                  fontFamily: T.font,
                  fontSize: '12px',
                  color: dark ? T.textMutedDark : T.textMuted,
                  margin: '16px 0 0',
                  fontStyle: 'italic',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '14px' }} aria-hidden="true">{'\uD83D\uDD12'}</span>
                This stays on your device. We don't store any of this.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
