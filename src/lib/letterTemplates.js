// Letter & template generators for Lighthouse
// All templates use plain English (reading age 9-11), warm tone, accurate legal refs
// Phase 1: deterministic templates. Phase 2: AI-assisted personalisation.

const DISCLAIMER = 'This is for information only. It does not constitute legal advice. If you need legal advice, contact IPSEA (ipsea.org.uk) or your local SENDIASS service for free, independent help.';

// ---------------------------------------------------------------------------
// 1. EHCP REQUEST LETTER
// ---------------------------------------------------------------------------

/**
 * Generates a formal letter requesting an EHC needs assessment.
 *
 * @param {object} params
 * @param {string} params.childName        — child's full name
 * @param {string} params.childDOB         — date of birth (e.g. "12 March 2018")
 * @param {string} params.conditionName    — primary condition / diagnosis
 * @param {string} params.schoolName       — current school or nursery
 * @param {string} params.localAuthorityName — e.g. "Leeds City Council"
 * @param {string} params.parentName       — parent or carer's full name
 * @param {string[]} params.difficulties   — list of specific difficulties
 * @param {string[]} params.professionals  — professionals already involved
 * @returns {string} — the complete letter as plain text
 */
export function generateEHCPRequestLetter({
  childName,
  childDOB,
  conditionName,
  schoolName,
  localAuthorityName,
  parentName,
  difficulties = [],
  professionals = [],
}) {
  const today = formatDate(new Date());

  const difficultiesList = difficulties.length > 0
    ? difficulties.map(d => `  - ${d}`).join('\n')
    : '  - [Please add your child\'s specific difficulties here]';

  const professionalsList = professionals.length > 0
    ? professionals.map(p => `  - ${p}`).join('\n')
    : '  - [Please list any professionals involved, e.g. speech therapist, paediatrician]';

  return `${parentName || '[Your name]'}
[Your address line 1]
[Your address line 2]
[Your postcode]

${today}

SEN Department
${localAuthorityName || '[Your local authority name]'}
[Local authority address]

Dear SEN Team,

REQUEST FOR AN EHC NEEDS ASSESSMENT
Child: ${childName || '[Child\'s name]'}
Date of birth: ${childDOB || '[Date of birth]'}
School: ${schoolName || '[School or nursery name]'}

I am writing to ask you to carry out an Education, Health and Care (EHC) needs assessment for my child, ${childName || '[child\'s name]'}, under Section 36(1) of the Children and Families Act 2014.

I believe that ${childName || 'my child'} may have special educational needs, and may need special educational provision to be made through an EHC plan.

The legal test for agreeing to assess is set out in Section 36(8) of the Children and Families Act 2014. The threshold is deliberately low. You must agree to assess if there is evidence that the child or young person "may" have special educational needs, and "may" need special educational provision through an EHC plan. The SEND Code of Practice 2015 (paragraph 9.14) confirms that the local authority must not apply a higher threshold than this.

About ${childName || 'my child'}

${childName || 'My child'} has a diagnosis of ${conditionName || '[condition/diagnosis]'}. ${childName || 'They'} currently attends ${schoolName || '[school name]'}.

${childName || 'My child'} has the following difficulties:

${difficultiesList}

The school has provided support through SEN Support (the graduated approach), but ${childName || 'my child'} continues to struggle. I believe that ${childName || 'their'} needs are greater than the school can meet from its own resources, and that an EHC plan is needed to make sure the right support is put in place.

Professionals involved

The following professionals are already involved with ${childName || 'my child'}:

${professionalsList}

I would be happy for you to contact any of these professionals as part of your assessment. I am also happy to provide any further information you need.

What I am asking you to do

1. Please carry out an EHC needs assessment for ${childName || 'my child'}.
2. Under the SEND Code of Practice 2015 (paragraph 9.14), you must let me know your decision within 6 weeks of receiving this letter.
3. If you decide not to assess, please give me your reasons in writing and let me know how to appeal.

I would also like to remind you that under Section 36(8) of the Children and Families Act 2014, you must agree to an assessment unless there is "no prospect" that one could be necessary. The bar for refusal is very high.

Please send me a written acknowledgement that you have received this letter.

Thank you for your time. I look forward to hearing from you.

Yours faithfully,

${parentName || '[Your name]'}


---
${DISCLAIMER}

Key legal references:
- Children and Families Act 2014, Section 36 (duty to assess)
- SEND Code of Practice 2015, Chapter 9 (EHC needs assessments)
- The First-tier Tribunal (SEND) can hear appeals if an assessment is refused`;
}

// ---------------------------------------------------------------------------
// 2. DLA APPLICATION HELPER
// ---------------------------------------------------------------------------

/**
 * Condition-specific prompt phrases for completing the DLA1 child form.
 * Returns concrete example sentences a parent can adapt to their own situation.
 *
 * @param {object} params
 * @param {string} params.conditionName      — e.g. "ADHD", "Autism / ASD"
 * @param {string} params.conditionCategory  — from CONDITION_CATEGORIES id
 * @param {string[]} params.needs            — optional list of specific needs
 * @returns {{ carePrompts, supervisionPrompts, mobilityPrompts, generalTips, disclaimer }}
 */
export function generateDLAHelper({ conditionName, conditionCategory, needs = [] }) {
  const condLower = (conditionName || '').toLowerCase();

  // Build condition-specific prompts for each DLA section
  const carePrompts = buildCarePrompts(condLower, conditionCategory, needs);
  const supervisionPrompts = buildSupervisionPrompts(condLower, conditionCategory, needs);
  const mobilityPrompts = buildMobilityPrompts(condLower, conditionCategory, needs);

  const generalTips = [
    'Describe your child\'s worst days, not their best. The DWP needs to understand the full picture.',
    'Write about what your child needs help with, even if they refuse the help. Needing help and accepting it are different things.',
    'Compare to a child of the same age without a disability. What extra help does your child need?',
    'Include night-time difficulties. If your child wakes you, that counts.',
    'Mention how long tasks take. If getting dressed takes 45 minutes instead of 10, say so.',
    'Use real examples from the last week. "On Tuesday, he..." is more powerful than general statements.',
    'If your child has good days and bad days, describe both. But focus on the bad days — the DWP needs to see the worst.',
    'Ask your child\'s doctor, therapist or school to write a short supporting letter. It strengthens your claim.',
    'DLA can be backdated to the date you first contact them. Call 0800 121 4600 to start your claim, even before you fill in the form.',
  ];

  return {
    conditionName: conditionName || 'your child\'s condition',
    carePrompts,
    supervisionPrompts,
    mobilityPrompts,
    generalTips,
    disclaimer: DISCLAIMER,
  };
}

function buildCarePrompts(condLower, category, needs) {
  const prompts = {
    washing: [],
    dressing: [],
    eating: [],
    toileting: [],
    medication: [],
  };

  // --- Condition-specific prompts ---

  // ADHD
  if (condLower.includes('adhd') || condLower.includes('attention deficit')) {
    prompts.washing.push(
      'Needs constant verbal prompting to stay on task during bathing — will stop washing and start playing with the water or become distracted.',
      'Has to be supervised in the bath at all times as they may turn taps, climb out, or flood the bathroom without warning.',
      'Needs step-by-step reminders: "Now wash your arms. Now wash your face." Without prompting, they will just sit in the water.'
    );
    prompts.dressing.push(
      'Needs constant verbal prompting to stay on task during dressing — will start getting dressed, get distracted, and be found 20 minutes later with one sock on.',
      'Cannot choose appropriate clothing for the weather. Will insist on shorts in winter or refuse to wear a coat.',
      'Getting dressed in the morning takes 30-45 minutes with constant reminders compared to 5-10 minutes for other children their age.'
    );
    prompts.eating.push(
      'Cannot sit at the table for a full meal. Gets up, fidgets, and loses interest after a few bites.',
      'Needs constant encouragement to eat a reasonable amount. Without supervision, will eat two bites and leave the table.',
      'Medication affects appetite — barely eats during the day and then is very hungry at bedtime.'
    );
    prompts.toileting.push(
      'Gets distracted and forgets to go to the toilet, leading to regular accidents. This happens several times a week.',
      'Will not wipe properly without a reminder. Needs verbal prompting and sometimes physical help to clean themselves.',
      'Becomes so focused on an activity that they ignore the urge to go, resulting in wet or soiled clothing.'
    );
    prompts.medication.push(
      'Needs to take medication every morning at the same time. Cannot be trusted to take it independently — will forget or refuse.',
      'Medication must be hidden in food or given with a specific routine, or they will spit it out or have a meltdown.',
      'Requires careful monitoring after taking medication for side effects such as reduced appetite, difficulty sleeping, or mood changes.'
    );
  }

  // Autism / ASD
  if (condLower.includes('autism') || condLower.includes('asd') || condLower.includes('autistic') || condLower.includes('asperger')) {
    prompts.washing.push(
      'Extreme sensory distress around water on their face or head — screams and becomes very distressed during hair washing.',
      'Cannot tolerate certain textures of towels or flannels. Only one specific towel can be used or they will have a meltdown.',
      'Bath routine must follow an exact sequence. Any change causes extreme anxiety and refusal to continue.',
      'Cannot tell if water temperature is too hot or too cold. Needs an adult to check every time.'
    );
    prompts.dressing.push(
      'Can only wear certain fabrics. Seams, labels and textures cause real physical distress — not just a preference.',
      'Needs help choosing weather-appropriate clothing. Does not understand that they need a coat when it is cold.',
      'Takes a very long time to dress because each item must "feel right." May put clothes on and take them off repeatedly.',
      'Needs a visual schedule or verbal prompts for each step of getting dressed, even though they are [age] years old.'
    );
    prompts.eating.push(
      'Extremely restricted diet due to sensory issues — will only eat [number] foods. This is not fussy eating; new foods cause gagging or distress.',
      'Food must be presented in a specific way. If the wrong plate is used or foods touch each other, they will refuse to eat.',
      'Mealtimes can take over an hour due to food anxiety and the need for encouragement to try each bite.',
      'Cannot use a knife and fork age-appropriately. Needs food cut up and meals adapted.'
    );
    prompts.toileting.push(
      'Still not reliably toilet trained at [age] years old. Has regular accidents, especially when routine is disrupted.',
      'Will only use one specific toilet. Refuses to use toilets at school, other people\'s houses, or public toilets.',
      'Needs a very specific toileting routine (e.g. same toilet, door must be at exact angle). Any change causes extreme distress.',
      'Cannot manage clothing independently during toileting — struggles with buttons, zips, and pulling clothing up and down.'
    );
    prompts.medication.push(
      'Needs melatonin every night to sleep. Without it, takes 2-3 hours to fall asleep.',
      'Taking medication is very difficult due to sensory issues with taste and texture. Needs it hidden in food or given in a specific way.'
    );
  }

  // Epilepsy
  if (condLower.includes('epilepsy') || condLower.includes('seizure')) {
    prompts.washing.push(
      'Cannot be left alone in the bath or shower due to risk of seizure. Must have an adult present at all times.',
      'After a seizure, needs full help with washing as they are confused, drowsy, and unsteady on their feet.'
    );
    prompts.dressing.push(
      'After a seizure, needs full help getting dressed as they are too drowsy and confused to manage independently.',
      'Clothing may need to be changed after a seizure due to loss of bladder or bowel control.'
    );
    prompts.eating.push(
      'Must be supervised during every meal due to choking risk during a seizure.',
      'After a seizure, cannot hold cutlery or feed themselves. Needs someone to help them eat and drink.'
    );
    prompts.toileting.push(
      'Has loss of bladder control during seizures. Needs changing and cleaning up afterwards.',
      'After a seizure, needs to be accompanied to the toilet as they are unsteady and may fall.'
    );
    prompts.medication.push(
      'Takes anti-epilepsy medication [number] times a day. Timing is critical — a missed dose can trigger a seizure.',
      'Has emergency rescue medication (e.g. buccal midazolam) that must be administered during prolonged seizures. An adult must be trained and available at all times.',
      'Medication needs regular blood tests and dose adjustments. Appointments take half a day each time.'
    );
  }

  // Down's Syndrome
  if (condLower.includes('down') || condLower.includes('trisomy 21')) {
    prompts.washing.push(
      'Needs full help with washing as they cannot coordinate the movements to wash themselves effectively.',
      'Needs support getting in and out of the bath safely due to low muscle tone and poor balance.'
    );
    prompts.dressing.push(
      'Needs help with all fastenings — buttons, zips, and laces are too difficult due to fine motor difficulties.',
      'Cannot choose appropriate clothing independently. Needs guidance on what to wear each day.'
    );
    prompts.eating.push(
      'Needs food cut into small pieces due to risk of choking — children with Down\'s syndrome have a smaller airway.',
      'Needs close supervision during meals. Tends to put too much food in their mouth at once.',
      'Uses adapted cutlery and still needs help with some foods.'
    );
    prompts.toileting.push(
      'Toilet training was achieved much later than typical peers and still has regular accidents.',
      'Needs reminders and prompting to go to the toilet. Will not go independently without being told.'
    );
  }

  // Cerebral Palsy
  if (condLower.includes('cerebral palsy') || condLower.includes(' cp')) {
    prompts.washing.push(
      'Needs full physical help with washing due to limited movement in their arms and legs.',
      'Cannot get in or out of the bath independently. Needs lifting or hoisting.',
      'Requires adapted bathing equipment (bath seat / shower chair) and adult assistance throughout.'
    );
    prompts.dressing.push(
      'Needs full help getting dressed and undressed due to physical limitations.',
      'Cannot manage any fastenings independently. Needs adapted clothing with velcro or magnetic closures.',
      'Getting dressed takes much longer than for other children as each limb needs to be positioned carefully.'
    );
    prompts.eating.push(
      'Needs food pureed or cut very small due to swallowing difficulties (dysphagia).',
      'Cannot hold standard cutlery. Uses adapted cutlery and still needs an adult to help.',
      'Mealtimes take 45-60 minutes due to physical difficulties with chewing and swallowing.'
    );
    prompts.toileting.push(
      'Cannot manage clothing for toileting independently. Needs full physical help.',
      'Uses a specialist toilet seat and needs lifting on and off.',
      'Needs help with cleaning themselves after using the toilet.'
    );
  }

  // Anxiety / mental health
  if (condLower.includes('anxiety') || condLower.includes('ocd') || condLower.includes('mental health') || condLower.includes('depression') || condLower.includes('self-harm')) {
    prompts.washing.push(
      'Refuses to shower or bathe for days at a time during periods of low mood. Needs coaxing and encouragement.',
      'OCD rituals around washing mean it takes 30-60 minutes, with repeated hand-washing until skin is raw.'
    );
    prompts.dressing.push(
      'On bad days, cannot get out of bed or get dressed without significant encouragement and support.',
      'Anxiety about appearance means getting dressed can take a very long time, changing clothes repeatedly.'
    );
    prompts.eating.push(
      'Anxiety causes loss of appetite. Needs constant encouragement to eat even small amounts.',
      'Eating disorder means all meals must be supervised. Cannot be left alone during or after eating.'
    );
    prompts.toileting.push(
      'Anxiety about using the toilet at school means they hold on all day and are distressed by the time they get home.'
    );
    prompts.medication.push(
      'Takes prescribed medication for anxiety/depression. Needs monitoring for side effects and reminders to take it.',
      'Needs an adult to manage and administer medication safely, including keeping it locked away.'
    );
  }

  // Diabetes (Type 1)
  if (condLower.includes('diabetes') || condLower.includes('t1d')) {
    prompts.eating.push(
      'Every meal and snack must be carefully weighed and carbohydrate-counted. An adult must calculate the insulin dose.',
      'Blood glucose must be checked before and after eating. If levels are wrong, the meal may need to be delayed or adjusted.',
      'Cannot eat independently because insulin must be given at the right time in the right dose. A mistake can be dangerous.'
    );
    prompts.medication.push(
      'Needs insulin injections or pump management multiple times a day. Cannot do this independently at their age.',
      'Blood glucose must be tested 6-10 times per day. An adult must supervise and act on the results.',
      'Carries a medical kit at all times (glucose meter, insulin, hypo treatment). An adult must ensure this is always available and stocked.'
    );
  }

  // Generic fallback for any condition not specifically matched
  if (!hasAnyPrompts(prompts)) {
    prompts.washing.push(
      `Because of ${condLower || 'their condition'}, my child needs more help with washing than other children their age.`,
      'Needs an adult to supervise or help during bathing for safety reasons.'
    );
    prompts.dressing.push(
      `Because of ${condLower || 'their condition'}, my child needs help or prompting to get dressed that other children their age do not.`,
      'Getting dressed takes much longer than it would for a child of the same age without a disability.'
    );
    prompts.eating.push(
      `Because of ${condLower || 'their condition'}, my child needs extra help or supervision during meals.`,
      'Mealtimes take much longer and need more adult involvement than for other children of the same age.'
    );
    prompts.toileting.push(
      `Because of ${condLower || 'their condition'}, my child needs more help with toileting than other children their age.`
    );
    prompts.medication.push(
      'My child takes regular medication that must be given by an adult.',
      'My child has medical appointments that require time and travel.'
    );
  }

  return prompts;
}

function buildSupervisionPrompts(condLower, category, needs) {
  const prompts = { day: [], night: [] };

  // ADHD
  if (condLower.includes('adhd') || condLower.includes('attention deficit')) {
    prompts.day.push(
      'Cannot be left unsupervised for any length of time. Will run into roads, climb dangerous things, or leave the house without telling anyone.',
      'Needs an adult within arm\'s reach when out in public. Has no sense of danger and will run off without warning.',
      'At home, needs constant supervision to prevent injury. Has climbed on kitchen surfaces, put things in the oven, and opened windows on upper floors.',
      'Cannot play unsupervised with other children. Becomes over-excited and may hurt others without meaning to.'
    );
    prompts.night.push(
      'Takes 1-2 hours to fall asleep even with medication. An adult must stay nearby during this time.',
      'Wakes during the night and wanders the house. We have had to install extra locks and safety gates.',
      'Gets up extremely early (4-5am) and cannot be left unsupervised. An adult must get up with them.'
    );
  }

  // Autism
  if (condLower.includes('autism') || condLower.includes('asd') || condLower.includes('autistic') || condLower.includes('asperger')) {
    prompts.day.push(
      'Needs constant supervision due to no awareness of danger — will walk into roads, approach strangers, or leave safe areas.',
      'Has meltdowns that can last 30 minutes to 2 hours. During a meltdown, they may hit, bite, or throw things. An adult must be present to keep them and others safe.',
      'Cannot be left alone in a room. May break things, eat non-food items (pica), or harm themselves (head-banging, biting arms).',
      'Needs someone with them at all times when outside the home. Cannot cope with unexpected changes, crowds, or noise without becoming very distressed.'
    );
    prompts.night.push(
      'Severe sleep difficulties — takes 1-3 hours to fall asleep. Wakes multiple times in the night.',
      'When they wake in the night, they are fully alert and may wander the house, turn on taps, open doors, or go downstairs.',
      'Needs melatonin and a strict bedtime routine. Even small changes can mean no sleep at all.',
      'An adult must sleep near them or use a monitor to hear when they wake, as they will not call out for help.'
    );
  }

  // Epilepsy
  if (condLower.includes('epilepsy') || condLower.includes('seizure')) {
    prompts.day.push(
      'Must have a trained adult present at all times in case of a seizure. Cannot be left alone, even briefly.',
      'Seizures can happen without warning. After a seizure, needs supervision for 30-60 minutes during recovery.',
      'Cannot do everyday activities alone that other children manage (playing in the garden, walking to school) because of seizure risk.'
    );
    prompts.night.push(
      'Has seizures during sleep. An adult must check on them regularly throughout the night or use a seizure alarm.',
      'After a night-time seizure, an adult must administer medication, change bedding, and stay with them until they recover.',
      'Cannot sleep in a top bunk or a room by themselves due to the risk of injury during a night-time seizure.'
    );
  }

  // Mental health
  if (condLower.includes('anxiety') || condLower.includes('self-harm') || condLower.includes('depression')) {
    prompts.day.push(
      'Cannot be left alone due to risk of self-harm. An adult must know where they are at all times.',
      'Needs constant emotional support and reassurance. Anxiety means they cannot do everyday activities without an adult nearby.',
      'Has panic attacks that need immediate adult support. These can happen at any time without warning.'
    );
    prompts.night.push(
      'Cannot sleep alone. Needs an adult nearby due to night-time anxiety, nightmares, or risk of self-harm.',
      'Wakes with panic attacks during the night. An adult must get up and help them calm down, which can take an hour or more.'
    );
  }

  // Generic fallback
  if (prompts.day.length === 0) {
    prompts.day.push(
      `Because of ${condLower || 'their condition'}, my child needs more supervision during the day than other children of the same age.`,
      'Cannot be left alone safely and needs an adult present at all times.'
    );
  }
  if (prompts.night.length === 0) {
    prompts.night.push(
      `Because of ${condLower || 'their condition'}, my child needs checking or supervision during the night more than other children of the same age.`,
      'An adult needs to get up during the night to help or check on them.'
    );
  }

  return prompts;
}

function buildMobilityPrompts(condLower, category, needs) {
  const prompts = [];

  // Physical / mobility conditions
  if (category === 'physical' || condLower.includes('cerebral palsy') || condLower.includes('spina bifida') || condLower.includes('muscular dystrophy') || condLower.includes('arthritis')) {
    prompts.push(
      'Cannot walk any distance without pain, fatigue, or falling. Uses a wheelchair / walking frame for anything more than a few metres.',
      'Needs physical support from an adult to walk. Cannot manage uneven ground, stairs, or slopes independently.',
      'Falls frequently when walking due to poor balance and muscle weakness. Needs a hand to hold or an adult close by.',
      'Cannot keep up with other children when walking. A journey that takes a typical child 5 minutes takes 20 minutes or more.',
      'Needs to be pushed in a buggy or wheelchair for any journey outside the house, even though other children their age walk.'
    );
  }

  // ADHD — behavioural mobility
  if (condLower.includes('adhd') || condLower.includes('attention deficit')) {
    prompts.push(
      'Cannot walk safely outdoors without an adult holding their hand or using reins. Will run into the road without looking.',
      'Needs constant physical guidance when walking anywhere outside the home. Has no awareness of traffic or danger.',
      'Cannot walk at a steady pace. Runs ahead, darts sideways, and ignores all instructions to stop. This makes every journey dangerous.'
    );
  }

  // Autism — mobility as outdoor guidance
  if (condLower.includes('autism') || condLower.includes('asd') || condLower.includes('autistic')) {
    prompts.push(
      'Cannot walk outdoors safely without an adult guiding them. Will walk into roads, into other people, or become fixated on objects and refuse to move.',
      'Becomes extremely distressed in unfamiliar environments — will drop to the ground, run away, or freeze and refuse to walk.',
      'Needs reins, a wrist strap, or an adult holding their hand at all times when walking outside, even though they are [age] years old.',
      'Cannot cope with crowded places. Sensory overload means they may bolt or have a meltdown that makes it impossible to continue.'
    );
  }

  // Epilepsy
  if (condLower.includes('epilepsy') || condLower.includes('seizure')) {
    prompts.push(
      'Cannot walk near roads, water, or heights without supervision because a seizure could cause them to fall into danger.',
      'After a seizure, cannot walk at all for 30-60 minutes. Needs to be carried or supported.',
      'An adult must accompany them on every journey in case of a seizure.'
    );
  }

  // Anxiety
  if (condLower.includes('anxiety') || condLower.includes('agoraphobia')) {
    prompts.push(
      'Severe anxiety means they cannot leave the house without an adult and significant preparation. Some days they cannot go out at all.',
      'Becomes frozen with fear in certain situations (busy places, school). Needs an adult to guide and reassure them to keep moving.',
      'Panic attacks can happen during any outdoor journey. An adult must be present to help them cope and get home safely.'
    );
  }

  // Generic fallback
  if (prompts.length === 0) {
    prompts.push(
      `Because of ${condLower || 'their condition'}, my child needs more help getting around outdoors than other children of the same age.`,
      'My child needs guidance or supervision when walking outside that other children their age do not.',
      'Journeys that are straightforward for other children of the same age are difficult, dangerous, or impossible for my child without help.'
    );
  }

  return prompts;
}

function hasAnyPrompts(prompts) {
  return Object.values(prompts).some(arr => arr.length > 0);
}

// ---------------------------------------------------------------------------
// 3. GP REFERRAL REQUEST
// ---------------------------------------------------------------------------

/**
 * Generates a structured letter/script for requesting a GP referral,
 * designed to fit within a 10-minute appointment.
 *
 * @param {object} params
 * @param {string} params.childName     — child's name
 * @param {string} params.conditionName — suspected/known condition
 * @param {string} params.referralType  — e.g. "paediatrician", "CAMHS", "speech therapy", "OT"
 * @param {string[]} params.concerns    — specific concerns to raise
 * @returns {{ letter: string, appointmentScript: string, tips: string[], disclaimer: string }}
 */
export function generateGPReferralRequest({ childName, conditionName, referralType, concerns = [] }) {
  const today = formatDate(new Date());
  const child = childName || '[Child\'s name]';
  const condition = conditionName || '[suspected condition]';
  const referral = referralType || '[specialist service]';

  const concernsList = concerns.length > 0
    ? concerns.map(c => `  - ${c}`).join('\n')
    : '  - [List your specific concerns here]';

  const letter = `${today}

Dear Doctor,

Re: ${child} — Request for referral to ${referral}

Thank you for seeing us today. I am writing to support our discussion about ${child} and to ask for a referral to ${referral}.

I am concerned that ${child} may have ${condition}. I have noticed the following:

${concernsList}

These difficulties have been going on for [how long, e.g. "over a year"] and are getting worse. They are affecting ${child}'s ability to [learn at school / make friends / manage daily life / sleep — choose what applies].

I am asking for a referral to ${referral} for a proper assessment. I understand that early help makes a real difference, and I would like to get ${child} assessed as soon as possible.

If you are not able to refer directly, I would be grateful if you could let me know who can, so I can follow this up.

Thank you for your help.

[Your name]`;

  const appointmentScript = `HOW TO USE YOUR 10 MINUTES WITH THE GP

Before the appointment:
  - Print or show this letter to the GP at the start of the appointment
  - Bring any school reports or letters from teachers about your concerns
  - Write down 2-3 short examples of what worries you most

In the appointment (aim for this order):

1. Hand the letter over (1 minute)
   "I've written down my concerns. Can I leave this with you?"

2. State what you want clearly (1 minute)
   "I'd like a referral to ${referral} for ${child}. I'm concerned about ${condition}."

3. Give your strongest examples (3 minutes)
   Pick your top 2-3 concerns. Use specific examples:
   "Last week, ${child} [specific thing that happened]."
   "This happens [how often — daily, every week, every time we...]."
   "It's been going on for [how long]."

4. Show the impact (2 minutes)
   "This is affecting ${child}'s [school work / friendships / sleep / ability to leave the house]."
   "I'm worried because [it's getting worse / the school has raised concerns / nothing we try is helping]."

5. Ask for the referral (2 minutes)
   "Can you please refer us to ${referral}?"
   If the GP says no or suggests waiting:
   "I understand, but these difficulties are significant and have been going on for [time]. I would like it noted in the records that I requested a referral today."

6. Confirm next steps (1 minute)
   "Can you confirm who you are referring us to?"
   "How long will it take to hear back?"
   "Is there anything I can do while we wait?"`;

  const tips = [
    'You have the right to ask for a referral. The GP can decline, but they must explain why and record your request.',
    'If the GP says your child is "too young" or "it\'s just a phase," you can say: "I respect your view, but I\'d like a specialist to assess. Please could you note my request in the records."',
    'You can ask for a double appointment (20 minutes) when you book. Say it\'s for a child referral discussion.',
    'If your GP will not refer, you can: (1) see a different GP at the same surgery, (2) ask the school to refer directly (some services accept school referrals), (3) contact the service yourself to ask if they accept self-referrals.',
    'After the appointment, ask reception for a printed copy of the consultation notes so you have a record of what was discussed.',
    `Some services such as CAMHS and speech therapy accept self-referrals in many areas. Check your local NHS trust website for "${referral} self-referral."`,
  ];

  return { letter, appointmentScript, tips, disclaimer: DISCLAIMER };
}

// ---------------------------------------------------------------------------
// 4. SCHOOL MEETING PREPARATION
// ---------------------------------------------------------------------------

/**
 * Generates a personalised school meeting prep pack.
 *
 * @param {object} params
 * @param {string} params.conditionName — child's condition
 * @param {string} params.meetingType   — e.g. "IEP review", "annual review", "SENCO meeting", "parents evening", "exclusion"
 * @param {string[]} params.concerns    — specific concerns
 * @returns {{ questions: string[], rightsSummary: string, followUpLetterTemplate: string, tips: string[], disclaimer: string }}
 */
export function generateSchoolMeetingPrep({ conditionName, meetingType, concerns = [] }) {
  const condition = conditionName || 'your child\'s condition';
  const meeting = meetingType || 'school meeting';
  const meetingLower = (meetingType || '').toLowerCase();

  // Build personalised question list
  const questions = buildMeetingQuestions(condition, meetingLower, concerns);

  const rightsSummary = `YOUR CHILD'S RIGHTS AT SCHOOL — A QUICK SUMMARY

Under the Equality Act 2010:
  - Your child's school has a legal duty not to discriminate against your child because of their disability.
  - The school must make "reasonable adjustments" so your child is not put at a disadvantage compared to other pupils. This is not optional — it is the law.
  - A "reasonable adjustment" could be things like: extra time in tests, a quiet space to work, a teaching assistant, modified homework, or a sensory break.

Under the SEND Code of Practice 2015:
  - If your child has special educational needs, the school must follow the "graduated approach" — Assess, Plan, Do, Review.
  - The school's SENCO (Special Educational Needs Coordinator) should be involved in planning your child's support.
  - You must be involved in decisions about your child's support. The school should meet with you at least three times a year to review progress.
  - If the school's support is not enough, you (or the school) can ask the local authority for an EHC needs assessment.

Under the Children and Families Act 2014:
  - If your child has an EHCP, the school must provide everything set out in Sections F (education) and G (health) of the plan. This is legally binding.
  - The EHCP must be reviewed at least once a year (the Annual Review).
  - You have the right to request changes to the EHCP at any time, not just at the annual review.

Important:
  - You can bring someone with you to any school meeting — a friend, family member, or an advocate from your local SENDIASS service.
  - You can ask for the meeting to be at a time that suits you. The school should be flexible.
  - You can ask for notes of the meeting to be sent to you in writing.`;

  const followUpLetterTemplate = `[Your name]
[Your address]
[Date]

[Head teacher / SENCO name]
[School name]
[School address]

Dear [name],

Thank you for meeting with me on [date] to discuss [child's name].

I am writing to confirm what we discussed and agreed. My understanding is:

What we agreed:
  1. [First thing agreed, e.g. "The school will provide a quiet space for [child] to use during break times"]
  2. [Second thing agreed]
  3. [Third thing agreed]

What the school will do:
  - [Action 1, e.g. "SENCO will arrange an updated SEN Support Plan by [date]"]
  - [Action 2]

What I will do:
  - [Action 1, e.g. "I will send you the report from the paediatrician"]

When we will review:
  - We agreed to review progress on [date].

Please let me know if I have missed anything or if you remember things differently. If I do not hear from you within 10 working days, I will take it that you agree with this summary.

Thank you for your support.

Yours sincerely,

[Your name]


---
${DISCLAIMER}`;

  const tips = [
    'Write your questions down and bring the list with you. It is easy to forget things when you are nervous.',
    'You can bring someone with you for support — a partner, friend, or a free advocate from your local SENDIASS service.',
    'Take notes during the meeting, or ask if the school can take minutes and send them to you.',
    'If you do not understand something, ask them to explain it in plain language. It is okay to say "I don\'t understand."',
    'If you feel pressured to agree to something, say: "I\'d like some time to think about that. Can I get back to you?"',
    'Always follow up the meeting with a letter or email confirming what was agreed. This creates a paper trail that protects your child.',
    'If the school is not providing the support your child needs, contact your local SENDIASS (free, independent advice) or IPSEA (free SEN legal advice at ipsea.org.uk).',
  ];

  return {
    questions,
    rightsSummary,
    followUpLetterTemplate,
    tips,
    disclaimer: DISCLAIMER,
  };
}

function buildMeetingQuestions(condition, meetingLower, concerns) {
  const questions = [];

  // Universal questions for all meeting types
  questions.push(
    `What specific support is the school putting in place for my child's needs related to ${condition}?`
  );
  questions.push(
    'Can you show me the evidence of what has been tried so far and how it has worked?'
  );

  // Meeting-type-specific questions
  if (meetingLower.includes('annual review') || meetingLower.includes('ehcp')) {
    questions.push(
      'Are all the outcomes in the EHCP still the right ones, or do any need to be changed?',
      'Is my child making progress towards the outcomes in their EHCP? Can you show me the evidence?',
      'Is the school providing everything listed in Sections F, G, and H of the EHCP?',
      'Are there any new needs that should be added to the EHCP?',
      'Do we need to request any changes to the provision? If so, how do we do that?',
      'What are the plans for next year — will the current placement and support continue?'
    );
  } else if (meetingLower.includes('iep') || meetingLower.includes('sen support') || meetingLower.includes('senco')) {
    questions.push(
      'What targets have been set for my child, and how will you measure progress?',
      'What specific interventions or programmes are being used?',
      'How many hours of additional support is my child receiving each week? Who delivers it?',
      'Is the current level of support enough, or do we need to consider asking for an EHC needs assessment?',
      'What training have the staff working with my child had in relation to their specific needs?'
    );
  } else if (meetingLower.includes('exclusion')) {
    questions.push(
      'Has the school considered whether my child\'s behaviour is related to their disability or SEN before deciding to exclude?',
      'Under the Equality Act 2010, the school must make reasonable adjustments. What adjustments were in place before this exclusion?',
      'Has a risk assessment been done? Can I see a copy?',
      'What support will be in place when my child returns to prevent this happening again?',
      'I would like a copy of the school\'s behaviour policy and SEN policy.'
    );
  } else if (meetingLower.includes('parents evening') || meetingLower.includes('parent')) {
    questions.push(
      'How is my child doing compared to where they should be for their age?',
      'Are they managing to access the full curriculum, or are they missing out on things?',
      'How are they getting on socially — at break times and lunch times?',
      'Is there anything you are worried about that we should discuss further?',
      'What can I do at home to support what you are doing at school?'
    );
  }

  // Condition-specific questions
  if (condition.toLowerCase().includes('autism') || condition.toLowerCase().includes('asd')) {
    questions.push(
      'What sensory adjustments are in place in the classroom (lighting, noise, seating)?',
      'How are transitions between activities managed? My child finds changes very difficult.'
    );
  }
  if (condition.toLowerCase().includes('adhd')) {
    questions.push(
      'What strategies are being used to help my child focus and manage their behaviour in class?',
      'Is my child getting enough movement breaks during the day?'
    );
  }
  if (condition.toLowerCase().includes('anxiety') || condition.toLowerCase().includes('mental')) {
    questions.push(
      'Does my child have access to a safe space when they are feeling overwhelmed?',
      'How is the school supporting my child\'s emotional wellbeing on a day-to-day basis?'
    );
  }
  if (condition.toLowerCase().includes('dyslexia') || condition.toLowerCase().includes('learning')) {
    questions.push(
      'What reading and writing support is my child receiving? Is it an evidence-based programme?',
      'Will my child be getting access arrangements for tests and exams (extra time, a reader, a scribe)?'
    );
  }

  // Add concern-based questions
  concerns.forEach(concern => {
    questions.push(
      `I am particularly concerned about: ${concern}. What is the school doing to address this?`
    );
  });

  // Final universal question
  questions.push(
    'When will we next meet to review how things are going?'
  );

  return questions;
}

// ---------------------------------------------------------------------------
// 5. BENEFITS CASCADE CALCULATOR
// ---------------------------------------------------------------------------

/**
 * Calculates additional benefits a family may be entitled to based on DLA award.
 * All values are approximate 2025/26 rates and should be verified.
 *
 * @param {object} params
 * @param {boolean} params.hasDLA          — whether the child receives DLA
 * @param {string}  params.dlaRate         — "lower", "middle", or "higher" (care component)
 * @param {boolean} params.onUniversalCredit — currently receiving UC
 * @param {boolean} params.onLegacyBenefits  — on legacy benefits (Income Support, Tax Credits, etc.)
 * @returns {{ entitlements: Array<object>, totalEstimate: number, tips: string[], disclaimer: string }}
 */
export function calculateBenefitsCascade({ hasDLA, dlaRate, onUniversalCredit, onLegacyBenefits }) {
  const entitlements = [];
  let totalEstimate = 0;
  const rate = (dlaRate || '').toLowerCase();

  // --- DLA itself ---
  if (hasDLA) {
    const dlaAmounts = {
      lower: { weekly: 28.70, annual: 1492 },
      middle: { weekly: 72.65, annual: 3778 },
      higher: { weekly: 108.55, annual: 5645 },
    };
    const dlaInfo = dlaAmounts[rate] || dlaAmounts.middle;
    entitlements.push({
      benefit: 'Disability Living Allowance (Care)',
      amount: `${formatCurrency(dlaInfo.weekly)}/week (${formatCurrency(dlaInfo.annual)}/year)`,
      amountAnnual: dlaInfo.annual,
      howToApply: 'You already receive this. Check you are on the right rate — many families are on a lower rate than they should be.',
      notes: 'The care component has three rates: lower, middle, and higher. If your child\'s needs have increased, you can ask for a review.',
    });
    totalEstimate += dlaInfo.annual;

    // --- Carer's Allowance (requires middle or higher rate DLA) ---
    if (rate === 'middle' || rate === 'higher') {
      entitlements.push({
        benefit: 'Carer\'s Allowance',
        amount: '£81.90/week (£4,259/year)',
        amountAnnual: 4259,
        howToApply: 'Apply online at gov.uk/carers-allowance. You need to care for the child 35+ hours per week and earn under £151/week after deductions.',
        notes: 'Even if your earnings are too high, still apply for "underlying entitlement" — this can unlock the carer element of Universal Credit.',
      });
      totalEstimate += 4259;

      // --- UC Carer Element ---
      if (onUniversalCredit) {
        entitlements.push({
          benefit: 'Universal Credit — Carer Element',
          amount: '£198.31/month (£2,380/year)',
          amountAnnual: 2380,
          howToApply: 'Report to your UC journal that you receive Carer\'s Allowance (or have underlying entitlement). The carer element should be added automatically.',
          notes: 'You get this on top of your normal UC. You do not need to apply separately — just tell your work coach.',
        });
        totalEstimate += 2380;
      }

      // --- UC Disabled Child Addition ---
      if (onUniversalCredit) {
        const disabledChildAmount = rate === 'higher' ? { monthly: 487.58, annual: 5851 } : { monthly: 156.11, annual: 1873 };
        entitlements.push({
          benefit: 'Universal Credit — Disabled Child Addition',
          amount: `${formatCurrency(disabledChildAmount.monthly)}/month (${formatCurrency(disabledChildAmount.annual)}/year)`,
          amountAnnual: disabledChildAmount.annual,
          howToApply: 'Report to your UC journal that your child receives DLA. The disabled child addition should be added automatically.',
          notes: rate === 'higher'
            ? 'Your child qualifies for the higher disabled child addition because they get the highest rate DLA care component.'
            : 'Your child qualifies for the lower disabled child addition. If their DLA is increased to the highest rate, this goes up too.',
        });
        totalEstimate += disabledChildAmount.annual;
      }
    }

    // --- Disability Premium (legacy benefits) ---
    if (onLegacyBenefits && (rate === 'middle' || rate === 'higher')) {
      entitlements.push({
        benefit: 'Disability Premium (Income Support / JSA / ESA)',
        amount: '£45.50/week (£2,366/year)',
        amountAnnual: 2366,
        howToApply: 'Contact the office that pays your benefit and tell them your child receives DLA. They should add the premium.',
        notes: 'This is a top-up to your existing benefit. You should get it automatically once you report the DLA award, but it is worth checking.',
      });
      totalEstimate += 2366;
    }

    // --- Child Tax Credit — Disabled Child Element ---
    if (onLegacyBenefits) {
      const ctcAmount = rate === 'higher' ? { annual: 5764 } : { annual: 3920 };
      entitlements.push({
        benefit: 'Child Tax Credit — Disabled Child Element',
        amount: `${formatCurrency(ctcAmount.annual)}/year`,
        amountAnnual: ctcAmount.annual,
        howToApply: 'Call the Tax Credit helpline on 0345 300 3900 and tell them your child receives DLA. They will add the disabled child element.',
        notes: rate === 'higher'
          ? 'Your child qualifies for the severely disabled child element because they get the highest rate DLA care.'
          : 'Your child qualifies for the disabled child element. If their DLA goes up to the highest rate, this increases too.',
      });
      totalEstimate += ctcAmount.annual;
    }

    // --- Free entitlements available to ALL DLA recipients (any rate) ---

    entitlements.push({
      benefit: 'Blue Badge (if mobility needs)',
      amount: 'Free or reduced-cost parking',
      amountAnnual: 0,
      howToApply: 'Apply through your local council website. Children who get the higher rate DLA mobility component qualify automatically. Others may qualify based on their difficulties.',
      notes: 'Even if your child does not get the mobility component, you may still qualify. Apply and describe their walking difficulties.',
    });

    entitlements.push({
      benefit: 'Motability Scheme',
      amount: 'Lease a car, scooter, or powered wheelchair using the DLA higher rate mobility component',
      amountAnnual: 0,
      howToApply: 'Visit motability.co.uk or call 0300 456 4566. You exchange your higher rate DLA mobility component for a vehicle lease.',
      notes: 'Only available if your child receives the higher rate DLA mobility component. The scheme covers insurance, servicing, and breakdown cover.',
    });

    entitlements.push({
      benefit: 'Council Tax Reduction',
      amount: 'Up to 25% reduction or full exemption',
      amountAnnual: 0,
      howToApply: 'Contact your local council. If your child needs an extra room for overnight care, or needs space for equipment, you may get a discount.',
      notes: 'Ask about a "disabled band reduction" if you have an extra room used for your child\'s disability-related needs (e.g. equipment storage, overnight carer).',
    });

    entitlements.push({
      benefit: 'Disabled Child\'s Free School Meals & Pupil Premium',
      amount: 'Free school meals + school receives extra £1,480/year funding',
      amountAnnual: 0,
      howToApply: 'The school can claim Pupil Premium Plus for children with an EHCP. Apply for free school meals through your local council if you are on a qualifying benefit.',
      notes: 'This is funding for the school, not cash for you — but it means more money to support your child\'s education.',
    });

    entitlements.push({
      benefit: 'Family Fund Grant',
      amount: 'Grants for essentials — computers, washing machines, holidays, clothing',
      amountAnnual: 0,
      howToApply: 'Apply online at familyfund.org.uk. You will need a letter from your child\'s consultant. Available to low-income families.',
      notes: 'Family Fund is the UK\'s largest grant-maker for families with disabled children. You can apply once a year.',
    });

    entitlements.push({
      benefit: 'Cinema Exhibitors\' Association (CEA) Card',
      amount: 'Free cinema ticket for your child\'s carer',
      amountAnnual: 0,
      howToApply: 'Apply online at ceacard.co.uk. Costs £6 and lasts for a year. Your child gets a free companion ticket at any major cinema.',
      notes: 'Works at Odeon, Vue, Cineworld, and most independent cinemas. Your child pays the normal ticket price; the carer goes free.',
    });

    entitlements.push({
      benefit: 'Disabled Persons Railcard',
      amount: 'One-third off rail fares for your child and a companion',
      amountAnnual: 0,
      howToApply: 'Apply at disabledpersons-railcard.co.uk. Costs £20/year. Both the disabled person and one companion get a third off.',
      notes: 'Children who receive DLA qualify. The companion discount applies to an adult travelling with them.',
    });

    entitlements.push({
      benefit: 'Access to Work (for parent)',
      amount: 'Help with work costs related to caring — e.g. taxis, adaptations',
      amountAnnual: 0,
      howToApply: 'Apply through gov.uk/access-to-work. This is for the parent/carer who is working or about to start work.',
      notes: 'This can help cover the extra costs of working while caring for a disabled child, such as specialist childcare.',
    });
  }

  // --- Benefits available even without DLA ---
  if (!hasDLA) {
    entitlements.push({
      benefit: 'Disability Living Allowance (DLA)',
      amount: 'Up to £108.55/week care + £72.65/week mobility (up to £9,423/year)',
      amountAnnual: 0,
      howToApply: 'Call 0800 121 4600 to request a DLA1 child claim form. DLA can be backdated to the date of your call, so call today even if you are not ready to fill in the form.',
      notes: 'DLA is the gateway to many other benefits. Getting DLA can unlock thousands of pounds in additional support. It is worth applying even if you are not sure your child qualifies.',
    });

    entitlements.push({
      benefit: 'Family Fund Grant',
      amount: 'Grants for essentials like computers, washing machines, and holidays',
      amountAnnual: 0,
      howToApply: 'Apply online at familyfund.org.uk. Available to low-income families raising a seriously disabled or ill child.',
      notes: 'You do not need DLA to apply, though it helps your case.',
    });

    entitlements.push({
      benefit: 'Free Prescriptions (for some conditions)',
      amount: 'Free NHS prescriptions',
      amountAnnual: 0,
      howToApply: 'Some conditions (e.g. diabetes, epilepsy) qualify for a medical exemption certificate. Ask your GP or pharmacist.',
      notes: 'Children under 16 get free prescriptions anyway, but this matters if you have prescription costs for yourself related to caring.',
    });
  }

  const tips = [
    'DLA is the "gateway benefit." Once your child has DLA, you may qualify for thousands of pounds in additional support. Apply for DLA first.',
    'Many families are on a lower rate of DLA than they should be. If your child\'s needs have changed, request a review — there is no limit on how often you can do this.',
    'Even if your earnings are above the Carer\'s Allowance threshold, apply anyway for "underlying entitlement." This can trigger extra money through Universal Credit or Tax Credits.',
    'Keep copies of everything. Take photos of letters, write down phone call dates, and save emails. This paper trail protects you.',
    'Use the Turn2us benefits calculator (turn2us.org.uk) for a detailed, personalised check. It is free and anonymous.',
    'Ask your hospital social worker for help with benefits applications. This is part of their job and they do it every day.',
    'Benefits can be backdated, so do not delay. Call DLA (0800 121 4600) and Carer\'s Allowance (0800 731 0297) today to start the clock.',
    'Your local Citizens Advice Bureau can help you fill in forms for free. Find them at citizensadvice.org.uk.',
  ];

  return {
    entitlements,
    totalEstimate,
    totalEstimateFormatted: formatCurrency(totalEstimate),
    hasDLA,
    dlaRate: rate,
    tips,
    disclaimer: `${DISCLAIMER} Benefit rates shown are approximate 2025/26 figures. Actual amounts may vary. Always check the latest rates on gov.uk.`,
  };
}

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

function formatDate(date) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function formatCurrency(amount) {
  if (amount === 0) return '£0';
  return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
