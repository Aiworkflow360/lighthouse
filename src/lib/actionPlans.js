// "Your First Week" action plans — pre-written, personalised step-by-step guides
// shown on the results page after a parent completes the wizard.
// Key format: conditionCategory_needCategory
// Each plan: { title, steps: [{ title, description, action, link? }] }

export const ACTION_PLANS = {

  // ═══════════════════════════════════════════════════════════════════════════
  // DEVELOPMENTAL (Autism / ADHD) × 5 need categories
  // ═══════════════════════════════════════════════════════════════════════════

  developmental_financial: {
    title: 'Getting financial support for your child',
    steps: [
      {
        title: 'Apply for Disability Living Allowance (DLA)',
        description:
          "DLA is the single most important benefit to apply for. It's tax-free and based on your child's needs, not their diagnosis. Most families of children with ADHD receive middle rate care (around £73.90/week or £3,843/year). Higher rates are possible but depend on the level of care and supervision needed. DLA is paid from the date you first call — so phone today even if you're not ready to fill in the form.",
        action: 'Call 0800 121 4600 to request a DLA1 form, or download it from gov.uk.',
        link: 'https://www.gov.uk/disability-living-allowance-children',
      },
      {
        title: "Check if you can claim Carer's Allowance",
        description:
          "If you spend 35 or more hours a week looking after your child, you could get £83.30 a week. You can claim once your child gets the middle or highest rate DLA care component. It's a separate application — don't wait for DLA to arrive before checking your eligibility.",
        action: 'Apply online at gov.uk. You will need your National Insurance number and your child\'s DLA reference.',
        link: 'https://www.gov.uk/carers-allowance',
      },
      {
        title: 'Apply to Family Fund for essential items',
        description:
          "Family Fund gives grants for things like computers, washing machines, and family breaks. If your child has autism or ADHD and you're on a low income, you'll likely qualify. A letter from your paediatrician confirming the diagnosis helps speed things up.",
        action: 'Apply online at familyfund.org.uk. Have your child\'s diagnosis letter ready.',
        link: 'https://www.familyfund.org.uk/apply',
      },
      {
        title: 'Run a free benefits check',
        description:
          "Many families don't realise how much they're entitled to. The Turn2us calculator takes about 20 minutes and checks every benefit you could be claiming. It's anonymous — no personal details are stored.",
        action: 'Use the free calculator at Turn2us. Have your income details handy.',
        link: 'https://benefits-calculator.turn2us.org.uk/',
      },
      {
        title: 'Access free Cerebra services',
        description:
          "Cerebra offers free services (not cash grants) for families of children with brain conditions including ADHD: a specialist sleep advice service, a lending library of sensory toys and equipment, legal rights guidance, and custom equipment design.",
        action: 'Call Cerebra on 01267 244200 to discuss which free services could help.',
        link: 'https://cerebra.org.uk/what-we-do/',
      },
      {
        title: 'Claim back hospital travel costs',
        description:
          "If you're on a low income or certain benefits, you can get travel costs to hospital appointments refunded. This includes petrol, parking, and public transport. Keep every receipt — you can claim up to 3 months back.",
        action: 'Claim at the hospital cashier\'s office after each appointment. Keep all receipts.',
        link: 'https://www.nhs.uk/nhs-services/help-with-health-costs/healthcare-travel-costs-scheme-htcs/',
      },
    ],
  },

  developmental_education: {
    title: 'Getting the right education support',
    steps: [
      {
        title: 'Request an EHC needs assessment',
        description:
          "An Education, Health and Care Plan (EHCP) is the legal document that sets out what support your child must receive at school. You have the right to request an assessment — the school doesn't have to do it for you. Write to the local authority's SEN team directly.",
        action: 'Write to your local authority\'s SEN team requesting an EHC needs assessment. IPSEA has template letters.',
        link: 'https://www.ipsea.org.uk/advice-line',
      },
      {
        title: 'Contact your local SENDIASS',
        description:
          "Every local authority must provide a free, impartial SENDIASS service. They can help you understand the EHCP process, attend meetings with you, and support you through any disagreements with the school. It's one of the most under-used services — and it's completely free.",
        action: 'Search for your local SENDIASS on the Council for Disabled Children website.',
        link: 'https://councilfordisabledchildren.org.uk/information-advice-and-support-services-network/find-your-local-iass',
      },
      {
        title: 'Ask the school for a sensory profile and social communication assessment',
        description:
          "For autistic children or those with ADHD, understanding their sensory needs and communication style is essential. Ask the school's SENCO to arrange assessments with an educational psychologist or speech and language therapist. These feed directly into the EHCP.",
        action: 'Email or meet with the school SENCO. Ask specifically for a sensory profile and communication assessment.',
      },
      {
        title: 'Look into Portage for pre-school children',
        description:
          "If your child is under school age, Portage is a brilliant home-visiting service. A trained worker comes to your home regularly and shows you practical activities to support your child's development through play. It's available through your local authority.",
        action: 'Ask your health visitor or paediatrician about the Portage service in your area.',
        link: 'https://www.portage.org.uk/',
      },
      {
        title: 'Get free SEN legal advice from IPSEA',
        description:
          "If the school or local authority isn't providing the support your child needs, IPSEA can help. They're legal experts in special education law, and their advice is completely free. They can help you challenge decisions and prepare for SEND Tribunal if needed.",
        action: 'Book a callback on the IPSEA website, or call on Tue, Wed, or Fri 9.30am-2.30pm.',
        link: 'https://www.ipsea.org.uk/advice-line',
      },
      {
        title: 'Connect with the National Autistic Society or ADHD UK',
        description:
          "These organisations have specific guidance on education rights for neurodivergent children. The NAS has a school exclusion helpline and ADHD UK has practical guides for working with schools.",
        action: 'Call the NAS on 0808 800 4104, or visit ADHD UK at adhduk.co.uk.',
        link: 'https://adhduk.co.uk/',
      },
    ],
  },

  developmental_emotional: {
    title: 'Emotional support for you and your family',
    steps: [
      {
        title: 'Call the National Autistic Society helpline or visit ADHD UK',
        description:
          "The NAS helpline is staffed by people who truly understand what you're going through. They can help you make sense of a diagnosis, answer questions you might feel silly asking, and point you to local support. It's free, confidential, and you don't need a referral. ADHD UK also has peer support groups and practical resources.",
        action: 'Call the NAS helpline on 0808 800 4104 (Mon-Thu 10am-4pm, Fri 9am-3pm) or visit adhduk.co.uk for ADHD-specific peer support.',
        link: 'https://adhduk.co.uk/',
      },
      {
        title: 'Find a local parent support group',
        description:
          "Talking to other parents who get it can be one of the most helpful things you do. The NAS and ADHD UK both have online communities and peer support groups. Your local Parent Carer Forum can also connect you with families near you. You don't have to share anything — just listening can help.",
        action: 'Search for local autism or ADHD parent groups on the NAS website or at adhduk.co.uk.',
        link: 'https://adhduk.co.uk/',
      },
      {
        title: 'Look after siblings too',
        description:
          "Brothers and sisters often have big feelings about what's happening and may not know how to express them. Sibs is a charity specifically for siblings of children with disabilities. They run online groups and workshops that give siblings a safe space to talk.",
        action: 'Visit sibs.org.uk for resources and online support groups for siblings.',
        link: 'https://www.sibs.org.uk/',
      },
      {
        title: 'Ask your GP about support for yourself',
        description:
          "Caring for a child with additional needs is demanding. Your GP can refer you for counselling, connect you with local support services, and check how you're doing. There's no shame in asking for help — you need to look after yourself to look after your child.",
        action: 'Book a GP appointment. Tell them you\'re a carer and would like to discuss support options.',
      },
      {
        title: 'Explore Ambitious about Autism resources',
        description:
          "Ambitious about Autism runs an online youth network and has excellent resources for understanding your child's perspective. Their Talk about Autism community is a welcoming place to connect with other families and autistic adults who can offer insight.",
        action: 'Visit ambitiousaboutautism.org.uk for resources and community forums.',
        link: 'https://www.ambitiousaboutautism.org.uk/',
      },
    ],
  },

  developmental_medical: {
    title: 'Getting the right medical support',
    steps: [
      {
        title: 'Get a referral to your local developmental paediatrics team',
        description:
          "If your child doesn't already have a paediatrician, ask your GP for a referral. The developmental paediatrics team coordinates assessments for autism, ADHD, and related conditions. Waiting lists can be long, so get the referral in as early as possible.",
        action: 'Book a GP appointment and request a referral to developmental paediatrics.',
      },
      {
        title: 'Ask about a social communication assessment',
        description:
          "For suspected autism, your child will usually have a multi-disciplinary assessment. This includes a speech and language therapist, a paediatrician, and sometimes an educational psychologist. Ask specifically what the assessment will involve so you know what to expect.",
        action: 'Call your paediatrician\'s office and ask what assessments are planned and the expected timeline.',
      },
      {
        title: 'Request an occupational therapy assessment',
        description:
          "Many children with autism or ADHD have sensory processing differences or motor coordination needs. An occupational therapist can create a sensory diet — a plan of activities that helps your child regulate through the day. Ask your paediatrician for a referral.",
        action: 'Ask your paediatrician or GP to refer your child for an occupational therapy assessment.',
      },
      {
        title: 'Keep a diary of behaviours and challenges',
        description:
          "Before appointments, write down specific examples of what's happening at home and school. Note when things are hardest, what helps, and what doesn't. This evidence is incredibly useful for clinicians and can speed up the assessment process.",
        action: 'Start a simple diary noting the date, what happened, when it happened, and how long it lasted.',
      },
      {
        title: 'Look into Cerebra\'s sleep support',
        description:
          "Sleep difficulties are extremely common in children with autism and ADHD. Cerebra offers free sleep advice from specialist practitioners. Better sleep makes everything else easier — for your child and for you.",
        action: 'Call Cerebra on 01267 244200 to access their free sleep advice service.',
        link: 'https://cerebra.org.uk/what-we-do/',
      },
      {
        title: 'Explore MindEd e-learning for parents',
        description:
          "MindEd is a free online resource trusted by health professionals. It has modules on autism, ADHD, anxiety, and more — written in plain language. Understanding your child's condition better can make appointments less overwhelming and help you advocate for the right support.",
        action: 'Visit minded.org.uk and start with the modules most relevant to your child.',
        link: 'https://www.minded.org.uk/',
      },
    ],
  },

  developmental_practical: {
    title: 'Practical help to make daily life easier',
    steps: [
      {
        title: 'Ask your local authority about a social care assessment',
        description:
          "Your local council can assess what support your family needs. This could include short breaks (respite), direct payments to pay for activities, or a family support worker. You have a legal right to request an assessment — you don't need to wait to be offered one.",
        action: 'Contact your local authority\'s children\'s disability team and request a child in need assessment.',
      },
      {
        title: 'Look into short breaks and respite',
        description:
          "Short breaks give you time to recharge and give your child new experiences. Your local authority should have a short breaks offer — this might be after-school clubs, holiday schemes, overnight stays, or a direct payment so you can choose your own provision.",
        action: 'Search your local authority\'s website for their "short breaks statement" or call their children\'s disability team.',
      },
      {
        title: 'Get a Blue Badge if your child needs one',
        description:
          "If your child gets the higher rate mobility component of DLA, they automatically qualify for a Blue Badge. Even without higher rate mobility, children who struggle in unfamiliar environments or have challenging behaviour near roads may still qualify.",
        action: 'Apply online through your local council. You will need your child\'s DLA award letter.',
        link: 'https://www.gov.uk/apply-blue-badge',
      },
      {
        title: 'Contact WellChild for home support',
        description:
          "WellChild nurses can help coordinate your child's care at home, reducing hospital visits. They also do home and garden transformations for families with children who have complex health needs.",
        action: 'Call WellChild on 01242 530007 to find out what support is available in your area.',
        link: 'https://www.wellchild.org.uk/',
      },
      {
        title: 'Explore Cerebra\'s equipment and toy library',
        description:
          "Cerebra has a free discovery toy library — you can borrow specialist sensory toys and switch-adapted equipment. They also design bespoke equipment if your child needs something that doesn't exist off the shelf.",
        action: 'Call Cerebra on 01267 244200 to discuss borrowing equipment or request a custom solution.',
        link: 'https://cerebra.org.uk/what-we-do/',
      },
      {
        title: 'Apply for a Disabled Facilities Grant for home adaptations',
        description:
          "If your home needs changes — like a ground-floor bedroom, a specialist bath, or a secure garden — you may be able to get a Disabled Facilities Grant from your local council. These are means-tested but can cover up to £30,000 in England.",
        action: 'Contact your local council\'s housing department and ask about a Disabled Facilities Grant.',
        link: 'https://www.gov.uk/disabled-facilities-grants',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHYSICAL (Cerebral Palsy) × 3 need categories
  // ═══════════════════════════════════════════════════════════════════════════

  physical_financial: {
    title: 'Getting financial support for your child',
    steps: [
      {
        title: 'Apply for Disability Living Allowance (DLA)',
        description:
          "DLA is the gateway benefit — it unlocks Carer's Allowance, Blue Badge, and Motability. For children with cerebral palsy, make sure you describe your child's needs on their worst day. Include how long tasks take compared to other children the same age. Call to request the form — it can be backdated to that call.",
        action: 'Call 0800 121 4600 to request a DLA1 form.',
        link: 'https://www.gov.uk/disability-living-allowance-children',
      },
      {
        title: "Apply for Carer's Allowance",
        description:
          "If you spend 35 or more hours a week looking after your child, you could get £83.30 a week. You can claim once your child gets the middle or highest rate DLA care component. It takes a few minutes to apply online.",
        action: 'Apply online at gov.uk.',
        link: 'https://www.gov.uk/carers-allowance',
      },
      {
        title: 'Apply to Newlife Foundation for specialist equipment',
        description:
          "Newlife provides essential equipment for disabled children when the NHS can't help or can't help fast enough. Their Emergency Equipment Loans can get vital kit to your home within 72 hours. A health professional needs to apply on your child's behalf.",
        action: 'Ask your child\'s physiotherapist or OT to contact Newlife on 0800 902 0095.',
        link: 'https://www.newlifecharity.co.uk/equipment-grants/',
      },
      {
        title: 'Look into Whizz-Kidz for mobility equipment',
        description:
          "Whizz-Kidz provides custom wheelchairs and mobility equipment when the NHS can't. They also run wheelchair skills training and youth clubs. If your child needs a chair that's better suited to their life, Whizz-Kidz can help.",
        action: 'Apply online at whizz-kidz.org.uk for a clinical assessment.',
        link: 'https://www.whizz-kidz.org.uk/apply/',
      },
      {
        title: 'Check if Motability can help with transport',
        description:
          "If your child receives the higher rate mobility component of DLA, you can use it to lease a car, powered wheelchair, or scooter through the Motability scheme. This includes insurance, maintenance, and breakdown cover. It can transform how your family gets around.",
        action: 'Visit motability.co.uk or call 0800 093 1000. You need the higher rate DLA mobility component.',
        link: 'https://www.motability.co.uk/',
      },
      {
        title: 'Apply for a Disabled Facilities Grant for home adaptations',
        description:
          "If your home needs changes — ramps, a specialist bathroom, a ground-floor bedroom, a through-floor lift — a Disabled Facilities Grant can cover up to £30,000 in England. Your local council's occupational therapy team can assess what's needed.",
        action: 'Contact your local council\'s housing department and ask about a Disabled Facilities Grant.',
        link: 'https://www.gov.uk/disabled-facilities-grants',
      },
      {
        title: 'Apply to Family Fund for everyday essentials',
        description:
          "Family Fund gives grants for computers, washing machines, family breaks, clothing, and bedding. If you're on a low income and raising a child with cerebral palsy, you'll likely qualify.",
        action: 'Apply online at familyfund.org.uk.',
        link: 'https://www.familyfund.org.uk/apply',
      },
    ],
  },

  physical_education: {
    title: 'Getting the right education support',
    steps: [
      {
        title: 'Request an EHC needs assessment',
        description:
          "An EHCP sets out the support your child must receive at school — including physical access, specialist equipment, and any additional staff support. You can request an assessment yourself by writing to your local authority. Don't wait for the school to do it.",
        action: 'Write to your local authority\'s SEN team. IPSEA has free template letters.',
        link: 'https://www.ipsea.org.uk/advice-line',
      },
      {
        title: 'Make sure the school has an accessibility plan',
        description:
          "All schools have a legal duty to make reasonable adjustments for disabled children. This might mean ramps, accessible toilets, specialist seating, or changes to the timetable. Ask the SENCO what physical adjustments are in place or planned.",
        action: 'Meet with the school SENCO and ask to see their accessibility plan.',
      },
      {
        title: 'Request an occupational therapy assessment for school',
        description:
          "An OT can advise on seating, writing equipment, and how your child accesses the classroom. Their recommendations carry weight in EHCP applications. Ask your paediatrician or the school to refer.",
        action: 'Ask the school SENCO or your paediatrician for an OT referral focused on the school environment.',
      },
      {
        title: 'Contact SENDIASS for free advice',
        description:
          "Your local SENDIASS can help you understand the EHCP process, attend meetings with you, and make sure your child gets the support they're legally entitled to. It's free, impartial, and every area has one.",
        action: 'Search for your local SENDIASS on the Council for Disabled Children website.',
        link: 'https://councilfordisabledchildren.org.uk/information-advice-and-support-services-network/find-your-local-iass',
      },
      {
        title: 'Explore Scope\'s education resources',
        description:
          "Scope has practical guides on disability rights in education, including what schools must provide and how to challenge decisions. Their helpline advisers can talk you through your options if you're not happy with the support your child is getting.",
        action: 'Call the Scope helpline on 0808 800 3333 (Mon-Sat 8am-8pm).',
        link: 'https://www.scope.org.uk/helpline',
      },
    ],
  },

  physical_practical: {
    title: 'Practical help to make daily life easier',
    steps: [
      {
        title: 'Get a Blue Badge',
        description:
          "If your child gets the higher rate mobility component of DLA, they automatically qualify for a Blue Badge. This lets you park closer to where you need to be — shops, hospitals, school. It makes a real difference day to day.",
        action: 'Apply online through your local council. You need your child\'s DLA award letter.',
        link: 'https://www.gov.uk/apply-blue-badge',
      },
      {
        title: 'Request a social care assessment',
        description:
          "Your local council can assess what practical support your family needs. This could include short breaks, a personal budget, or a family support worker. You have a right to request this — you don't need to wait to be offered it.",
        action: 'Contact your local authority\'s children\'s disability team and request a child in need assessment.',
      },
      {
        title: 'Apply for Whizz-Kidz mobility equipment',
        description:
          "Whizz-Kidz provides custom wheelchairs and powered mobility when the NHS waiting list is too long or the available options don't suit your child. They also run wheelchair skills training that builds confidence and independence.",
        action: 'Apply online at whizz-kidz.org.uk.',
        link: 'https://www.whizz-kidz.org.uk/apply/',
      },
      {
        title: 'Look into home adaptations',
        description:
          "A Disabled Facilities Grant from your council can cover ramps, wet rooms, hoists, door widening, and more. An OT will assess what changes are needed. The grant can cover up to £30,000 in England.",
        action: 'Contact your council\'s occupational therapy team to request a home assessment.',
        link: 'https://www.gov.uk/disabled-facilities-grants',
      },
      {
        title: 'Explore Motability for transport',
        description:
          "If your child gets the higher rate DLA mobility component, you can use Motability to lease a car, wheelchair accessible vehicle, or powered wheelchair. It covers insurance, maintenance, and breakdown cover.",
        action: 'Call Motability on 0800 093 1000 to discuss your options.',
        link: 'https://www.motability.co.uk/',
      },
      {
        title: 'Contact WellChild about home support',
        description:
          "WellChild nurses help coordinate care at home so your child can spend less time in hospital. They also offer home and garden transformations to make your space work better for your family.",
        action: 'Call WellChild on 01242 530007.',
        link: 'https://www.wellchild.org.uk/',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SENSORY (Deaf / Blind) × 2 need categories
  // ═══════════════════════════════════════════════════════════════════════════

  sensory_financial: {
    title: 'Getting financial support for your child',
    steps: [
      {
        title: 'Apply for Disability Living Allowance (DLA)',
        description:
          "DLA is available for deaf and visually impaired children who need more help or supervision than other children their age. Describe what daily life is actually like — the extra time it takes to communicate, the safety risks, the constant supervision. Call to start the claim and it can be backdated.",
        action: 'Call 0800 121 4600 to request a DLA1 form.',
        link: 'https://www.gov.uk/disability-living-allowance-children',
      },
      {
        title: "Check if you can claim Carer's Allowance",
        description:
          "If you spend 35+ hours a week caring, you could receive £83.30 a week. Once your child gets middle or highest rate DLA care, you can apply. Many parents of deaf or blind children don't realise they qualify.",
        action: 'Apply online at gov.uk.',
        link: 'https://www.gov.uk/carers-allowance',
      },
      {
        title: 'Contact the NDCS or RNIB for financial guidance',
        description:
          "The National Deaf Children's Society and the RNIB both have specialist advisers who know exactly what financial support is available for families with sensory-impaired children. They can guide you through the benefits system and check you're not missing anything.",
        action: 'Call NDCS on 0808 800 8880 or RNIB on 0303 123 9999.',
        link: 'https://www.ndcs.org.uk/',
      },
      {
        title: 'Apply to Family Fund',
        description:
          "Family Fund provides grants for computers, specialist equipment, family breaks, and everyday essentials. For deaf or visually impaired children, they can help with things like alerting devices, specialist tech, or vibrating alarm clocks.",
        action: 'Apply online at familyfund.org.uk.',
        link: 'https://www.familyfund.org.uk/apply',
      },
      {
        title: 'Run a free benefits check',
        description:
          "The Turn2us calculator checks what benefits you could be claiming. It takes about 20 minutes and is completely anonymous. Many families are missing out on hundreds of pounds a month.",
        action: 'Use the free calculator at Turn2us.',
        link: 'https://benefits-calculator.turn2us.org.uk/',
      },
      {
        title: 'Claim back hospital and appointment travel costs',
        description:
          "Children with sensory impairments often have frequent hospital and audiology or ophthalmology appointments. If you're on a low income or certain benefits, you can get travel costs refunded. Keep every receipt.",
        action: 'Claim at the hospital cashier\'s office after each visit.',
        link: 'https://www.nhs.uk/nhs-services/help-with-health-costs/healthcare-travel-costs-scheme-htcs/',
      },
    ],
  },

  sensory_education: {
    title: 'Getting the right education support',
    steps: [
      {
        title: 'Request a specialist Teacher of the Deaf or Qualified Teacher of Visual Impairment',
        description:
          "Your local authority should provide a specialist teacher for deaf or visually impaired children. They visit schools, advise on communication support, check hearing or visual aids are working, and make sure the classroom environment is right. If your child doesn't already have one, request it now.",
        action: 'Contact your local authority\'s sensory support team or ask your child\'s audiologist or ophthalmologist to refer.',
      },
      {
        title: 'Request an EHC needs assessment',
        description:
          "An EHCP can secure the support your child needs at school — a radio aid, a sign language interpreter, specialist teaching, modified materials, or a 1:1 assistant. You can request the assessment yourself by writing to your local authority.",
        action: 'Write to your local authority\'s SEN team. IPSEA has free template letters.',
        link: 'https://www.ipsea.org.uk/advice-line',
      },
      {
        title: 'Contact the NDCS or RNIB education team',
        description:
          "The NDCS has a specialist education team for deaf children and the RNIB has education advisers for visually impaired children. They know the system inside out and can help you make sure your child is getting everything they're entitled to.",
        action: 'Call NDCS on 0808 800 8880 or RNIB on 0303 123 9999 and ask about their education support.',
        link: 'https://www.ndcs.org.uk/',
      },
      {
        title: 'Check your child has the right equipment in school',
        description:
          "Deaf children may need a radio aid, soundfield system, or good acoustic conditions. Visually impaired children may need enlarged text, screen readers, or adjusted lighting. The school has a legal duty to provide reasonable adjustments.",
        action: 'Meet with the school SENCO and ask what equipment and adjustments are in place.',
      },
      {
        title: 'Explore communication options',
        description:
          "For deaf children, there are different communication approaches — spoken language with hearing aids or cochlear implants, British Sign Language, or a combination. The NDCS can help you understand the options so you can make the right choice for your family.",
        action: 'Contact NDCS for impartial information about communication approaches.',
        link: 'https://www.ndcs.org.uk/',
      },
      {
        title: 'Contact SENDIASS for free local advice',
        description:
          "Your local SENDIASS can help with EHCP applications, school meetings, and making sure the support in the plan is actually being delivered. Every local authority has one.",
        action: 'Search for your local SENDIASS on the Council for Disabled Children website.',
        link: 'https://councilfordisabledchildren.org.uk/information-advice-and-support-services-network/find-your-local-iass',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MENTAL HEALTH (Anxiety / Depression) × 3 need categories
  // ═══════════════════════════════════════════════════════════════════════════

  mental_health_emotional: {
    title: 'Emotional support for your child and your family',
    steps: [
      {
        title: 'Call the YoungMinds Parents Helpline',
        description:
          "YoungMinds has trained advisers who can talk through what's happening with your child and help you work out the best next steps. It's free, confidential, and you don't need a referral. They won't judge you — they'll help you.",
        action: 'Call 0808 802 5544 (Mon, Thu, Fri 9.30am-4pm, Tue, Wed 9.30am-6pm).',
        link: 'https://www.youngminds.org.uk/parent/parents-helpline/',
      },
      {
        title: 'Tell your child about Kooth — free online counselling',
        description:
          "Kooth is free, anonymous online counselling for ages 10-25. No waiting list, no referral, no parents told. Your child can chat with a qualified counsellor by text, join moderated forums, or use self-help tools. Sometimes young people find it easier to talk online.",
        action: 'Show your child kooth.com. They sign up with just a nickname — no personal details needed.',
        link: 'https://www.kooth.com/',
      },
      {
        title: 'Let your child know about Childline',
        description:
          "Childline is available 24/7 by phone, online chat, and email. It's completely confidential and anonymous. Even if your child isn't ready to talk to you or a professional yet, knowing this is there can be a lifeline.",
        action: 'Let your child know they can call 0800 1111 any time, or chat online at childline.org.uk.',
        link: 'https://www.childline.org.uk/',
      },
      {
        title: 'Check if your child\'s school has Place2Be counselling',
        description:
          "Place2Be provides in-school counselling in over 500 schools. Children can drop in for a chat or be referred for one-to-one sessions. If your school is a partner, your child can access support without leaving the school day.",
        action: 'Ask the school if they work with Place2Be, or check the Place2Be website.',
        link: 'https://www.place2be.org.uk/our-services/',
      },
      {
        title: 'Explore Anna Freud Centre resources',
        description:
          "The Anna Freud Centre has excellent, evidence-based resources for parents supporting a child with anxiety or low mood. Their practical tools and guides can help you understand what your child is going through and how to respond in ways that help.",
        action: 'Visit annafreud.org/parents-and-carers for free resources and toolkits.',
        link: 'https://www.annafreud.org/parents-and-carers/',
      },
      {
        title: 'Look after yourself too',
        description:
          "Watching your child struggle is incredibly stressful. You're allowed to feel overwhelmed. Talk to your GP about support for yourself — whether that's counselling, a carers' assessment, or just someone to listen.",
        action: 'Book a GP appointment and let them know you\'re supporting a child with mental health difficulties.',
      },
    ],
  },

  mental_health_medical: {
    title: 'Getting the right medical support',
    steps: [
      {
        title: 'Get a referral to CAMHS',
        description:
          "CAMHS (Child and Adolescent Mental Health Services) is the NHS specialist service for children's mental health. Your GP, school, or in many areas you can self-refer. Waiting times vary, but getting on the list is the important first step.",
        action: 'Ask your GP for a CAMHS referral, or check if your local CAMHS accepts self-referrals.',
        link: 'https://www.nhs.uk/mental-health/nhs-voluntary-charity-services/nhs-services/children-young-people-mental-health-services-cypmhs/',
      },
      {
        title: 'While you wait for CAMHS, get support from Kooth',
        description:
          "CAMHS waiting lists can be long. Kooth provides free online counselling with no waiting list. Your child can access qualified counsellors by text, use self-help tools, and join moderated peer support forums — all from their phone.",
        action: 'Show your child kooth.com — they can sign up with just a nickname.',
        link: 'https://www.kooth.com/',
      },
      {
        title: 'Keep a mood diary',
        description:
          "Before the first CAMHS appointment, start recording when your child's mood is lowest, what triggers difficult moments, and what helps. This information is incredibly valuable for clinicians and can speed up assessment. There are free apps like Daylio that make this easy.",
        action: 'Start a simple diary or download a mood tracking app. Note the date, mood level, and any triggers.',
      },
      {
        title: 'Call YoungMinds for guidance on the system',
        description:
          "If you're unsure whether your child needs CAMHS, or what to expect from the process, YoungMinds can talk it through. Their advisers understand the system and can help you prepare for assessments and appointments.",
        action: 'Call 0808 802 5544.',
        link: 'https://www.youngminds.org.uk/parent/parents-helpline/',
      },
      {
        title: 'Learn about the MindEd parent resources',
        description:
          "MindEd is free e-learning trusted by health professionals. The modules on anxiety, depression, and self-harm are equally useful for parents. Understanding what's happening for your child can help you support them better and communicate more effectively with clinicians.",
        action: 'Visit minded.org.uk and start with the module most relevant to your child.',
        link: 'https://www.minded.org.uk/',
      },
      {
        title: 'Know when to seek urgent help',
        description:
          "If your child is in immediate danger or has expressed suicidal thoughts, don't wait for a CAMHS appointment. Call 999, take them to A&E, or text SHOUT to 85258 for the crisis text line. PAPYRUS HOPELINEUK (0800 068 4141) is available every day 9am-midnight.",
        action: 'Save these numbers in your phone: 999 for emergencies, PAPYRUS 0800 068 4141, Crisis text: text SHOUT to 85258.',
      },
    ],
  },

  mental_health_education: {
    title: 'Getting the right support at school',
    steps: [
      {
        title: 'Talk to the school SENCO about your child\'s mental health needs',
        description:
          "Mental health difficulties are recognised as a special educational need. The school has a duty to provide support. Ask the SENCO what's available — this might include reduced timetables, a quiet space, a key adult, or exam adjustments.",
        action: 'Email or meet with the school SENCO. Explain what\'s happening and ask about SEN support.',
      },
      {
        title: 'Check if the school has in-house counselling',
        description:
          "Many schools have counsellors, pastoral support, or work with organisations like Place2Be. These services can often start more quickly than CAMHS. Ask the school what mental health support they offer.",
        action: 'Ask the school about counselling services, or check the Place2Be website for partner schools.',
        link: 'https://www.place2be.org.uk/our-services/',
      },
      {
        title: 'Request reasonable adjustments',
        description:
          "If your child is struggling with attendance, concentration, or social situations, the school should make adjustments. This might include a flexible start time, a reduced timetable, a safe space to go when overwhelmed, or modified homework expectations.",
        action: 'Write to the school requesting specific adjustments. Be clear about what your child needs and why.',
      },
      {
        title: 'Consider whether an EHCP is needed',
        description:
          "If your child's mental health difficulties are significantly affecting their education and the school's standard support isn't enough, you can request an EHC needs assessment. This can secure additional funding and a legally binding support plan.",
        action: 'Contact IPSEA for advice on whether an EHCP application is right for your situation.',
        link: 'https://www.ipsea.org.uk/advice-line',
      },
      {
        title: 'Get free advice from SENDIASS',
        description:
          "Your local SENDIASS can help you understand what the school should be doing, attend meetings with you, and support you if there's a disagreement about provision. It's free, impartial, and every area has one.",
        action: 'Find your local SENDIASS service.',
        link: 'https://councilfordisabledchildren.org.uk/information-advice-and-support-services-network/find-your-local-iass',
      },
      {
        title: 'Explore the Anna Freud Centre\'s school resources',
        description:
          "The Anna Freud Centre has toolkits specifically designed for parents working with schools to support children's mental health. Their resources can help you have productive conversations with teachers about what your child needs.",
        action: 'Visit annafreud.org/parents-and-carers for school-focused resources.',
        link: 'https://www.annafreud.org/parents-and-carers/',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // NEUROLOGICAL (Epilepsy) × 2 need categories
  // ═══════════════════════════════════════════════════════════════════════════

  neurological_financial: {
    title: 'Getting financial support for your child',
    steps: [
      {
        title: 'Apply for Disability Living Allowance (DLA)',
        description:
          "DLA is essential for families affected by epilepsy. When filling in the form, describe your child's seizures in detail — how often they happen, what they look like, the recovery time, and the constant supervision your child needs. Include night-time risks. It can be backdated to when you first call.",
        action: 'Call 0800 121 4600 to request a DLA1 form.',
        link: 'https://www.gov.uk/disability-living-allowance-children',
      },
      {
        title: "Apply for Carer's Allowance",
        description:
          "If you're spending 35+ hours a week caring — including night-time supervision for seizures — you could get £83.30 a week. Many parents of children with epilepsy qualify because of the constant need to be alert.",
        action: 'Apply online at gov.uk.',
        link: 'https://www.gov.uk/carers-allowance',
      },
      {
        title: 'Apply to Epilepsy Action for a grant',
        description:
          "Epilepsy Action provides small grants for people in financial hardship — things like replacing furniture damaged during seizures, safety equipment, or other essentials. You need to be on means-tested benefits to qualify.",
        action: 'Call the Epilepsy Action helpline on 0808 800 5050 to discuss a grant application.',
        link: 'https://www.epilepsy.org.uk/info/support/grants',
      },
      {
        title: 'Apply to Family Fund',
        description:
          "Family Fund provides grants for essential items — washing machines (for bedding after seizures), computers for education, and family breaks. If you're on a low income, you'll likely qualify.",
        action: 'Apply online at familyfund.org.uk.',
        link: 'https://www.familyfund.org.uk/apply',
      },
      {
        title: 'Check your full benefits entitlement',
        description:
          "Many families miss out on benefits they're entitled to. The Turn2us calculator takes about 20 minutes and checks everything. DLA unlocks other benefits too, like the disabled child element of Universal Credit.",
        action: 'Use the free calculator at Turn2us.',
        link: 'https://benefits-calculator.turn2us.org.uk/',
      },
      {
        title: 'Ask about free prescriptions',
        description:
          "If your child takes epilepsy medication, they're entitled to free prescriptions via a medical exemption certificate. Ask your GP surgery or the hospital pharmacy to arrange this.",
        action: 'Ask your GP surgery to issue a medical exemption certificate for epilepsy medication.',
      },
    ],
  },

  neurological_medical: {
    title: 'Getting the right medical support',
    steps: [
      {
        title: 'Start a seizure diary today',
        description:
          "Record every seizure — date, time, what happened before, what the seizure looked like, how long it lasted, and the recovery time. This is the most valuable thing you can bring to appointments. There are free apps like Epilepsy Action's seizure diary that make it easy.",
        action: 'Download a seizure diary app or start a written diary. Record every seizure from today.',
        link: 'https://www.epilepsy.org.uk/info/support',
      },
      {
        title: 'Make sure your child has a specialist epilepsy consultant',
        description:
          "Children with epilepsy should be seen by a paediatric neurologist or paediatrician with a special interest in epilepsy. If your child is only being seen by a GP, ask for a referral. Specialist care makes a real difference to seizure control.",
        action: 'Ask your GP for a referral to a paediatric neurologist if you don\'t already have one.',
      },
      {
        title: 'Get a seizure first aid plan',
        description:
          "Work with your child's epilepsy team to create a written seizure care plan. This tells everyone — school, babysitters, family — exactly what to do during and after a seizure. Share it with every person who looks after your child.",
        action: 'Ask your epilepsy nurse or consultant to help you create a seizure care plan.',
      },
      {
        title: 'Ask about an Epilepsy Specialist Nurse',
        description:
          "Epilepsy Specialist Nurses (ESNs) are incredible. They can answer questions between appointments, adjust medication advice, and provide ongoing support. Not every area has one, but Epilepsy Action's Sapphire Nurse programme is filling the gaps.",
        action: 'Ask your consultant about access to an Epilepsy Specialist Nurse.',
        link: 'https://www.epilepsy.org.uk/info/support',
      },
      {
        title: 'Learn seizure first aid',
        description:
          "Knowing what to do during a seizure reduces fear and keeps your child safe. Epilepsy Action and Epilepsy Society both have clear, simple guides. The key points: stay calm, protect their head, don't put anything in their mouth, time the seizure, call 999 if it lasts more than 5 minutes.",
        action: 'Visit the Epilepsy Society website for first aid guidance.',
        link: 'https://epilepsysociety.org.uk/',
      },
      {
        title: 'Call the Epilepsy Action helpline',
        description:
          "Epilepsy Action's helpline is staffed by people who understand epilepsy inside out. They can help with medication questions, school issues, emotional support, and navigating the system. It's free and confidential.",
        action: 'Call 0808 800 5050 (Mon-Fri 8.30am-5pm).',
        link: 'https://www.epilepsy.org.uk/info/support',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEARNING (Down Syndrome / Dyslexia) × 2 need categories
  // ═══════════════════════════════════════════════════════════════════════════

  learning_education: {
    title: 'Getting the right education support',
    steps: [
      {
        title: 'Request an EHC needs assessment',
        description:
          "If your child has a learning disability or specific learning difficulty like dyslexia, an EHCP can secure the specialist support they need — from 1:1 teaching to specialist resources. You can request this yourself by writing to the local authority.",
        action: 'Write to your local authority\'s SEN team requesting an EHC needs assessment.',
        link: 'https://www.ipsea.org.uk/advice-line',
      },
      {
        title: 'Get a formal assessment for dyslexia or learning difficulties',
        description:
          "A formal assessment confirms the diagnosis and identifies your child's specific strengths and difficulties. This evidence is powerful for EHCP applications and exam access arrangements. Schools can arrange assessments through their educational psychologist, or you can go private through Dyslexia Action.",
        action: 'Ask the school SENCO for an educational psychology assessment, or contact Dyslexia Action on 0330 159 8022.',
        link: 'https://dyslexiaaction.org.uk/',
      },
      {
        title: 'Call the BDA or Mencap helpline for advice',
        description:
          "The British Dyslexia Association can advise on school support for dyslexia and dyscalculia. For broader learning disabilities, Mencap's helpline can explain your child's education rights and what the school should be providing.",
        action: 'Call BDA on 0333 405 4567, or Mencap on 0808 808 1111.',
        link: 'https://www.bdadyslexia.org.uk/services/helpline',
      },
      {
        title: 'Check what the school is already doing',
        description:
          "Ask the SENCO for your child's SEN Support plan (sometimes called an IEP or provision map). It should list specific targets, interventions, and how progress is measured. If there isn't one, or it doesn't feel right, you can challenge it.",
        action: 'Meet with the SENCO and ask to see your child\'s SEN support plan and progress data.',
      },
      {
        title: 'Explore condition-specific education resources',
        description:
          "Down Syndrome Education International has research-based learning resources that parents can use at home. For dyslexia, the BDA has a parent toolkit. These practical, evidence-based approaches can make a real difference alongside school support.",
        action: 'Visit dseinternational.org or bdadyslexia.org.uk for free parent resources.',
        link: 'https://www.dseinternational.org/',
      },
      {
        title: 'Contact SENDIASS for local support',
        description:
          "Your local SENDIASS service can help you navigate the EHCP process, attend school meetings, and make sure your child's support is working. Every local authority has one and the service is free.",
        action: 'Find your local SENDIASS service.',
        link: 'https://councilfordisabledchildren.org.uk/information-advice-and-support-services-network/find-your-local-iass',
      },
    ],
  },

  learning_financial: {
    title: 'Getting financial support for your child',
    steps: [
      {
        title: 'Apply for Disability Living Allowance (DLA)',
        description:
          "DLA isn't just for physical disabilities. Children with Down syndrome, learning disabilities, and even specific learning difficulties like dyslexia can qualify if they need significantly more help or supervision than other children their age. Describe the extra time, repetition, and support needed for everyday tasks.",
        action: 'Call 0800 121 4600 to request a DLA1 form.',
        link: 'https://www.gov.uk/disability-living-allowance-children',
      },
      {
        title: "Check if you can claim Carer's Allowance",
        description:
          "If you're spending 35+ hours a week providing extra support — teaching self-care skills, managing medication, attending therapies, supporting homework — you may qualify for £83.30 a week.",
        action: 'Apply online at gov.uk.',
        link: 'https://www.gov.uk/carers-allowance',
      },
      {
        title: 'Apply to Family Fund',
        description:
          "Family Fund can help with computers (essential for learning), specialist software, family breaks, and everyday essentials. If you have a child with a learning disability and you're on a low income, they want to hear from you.",
        action: 'Apply online at familyfund.org.uk.',
        link: 'https://www.familyfund.org.uk/apply',
      },
      {
        title: 'Contact Contact for grants information',
        description:
          "Contact maintains a database of grants and financial help from charitable trusts. Their advisers can find funding sources specific to your child's condition and your family's needs.",
        action: 'Call Contact on 0808 808 3555.',
        link: 'https://contact.org.uk/',
      },
      {
        title: 'Run a benefits check',
        description:
          "DLA unlocks other benefits — like the disabled child element of Universal Credit and the carer element. The Turn2us calculator can show you everything you might be missing.",
        action: 'Use the free calculator at Turn2us.',
        link: 'https://benefits-calculator.turn2us.org.uk/',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GENETIC (Rare Disease) × 3 need categories
  // ═══════════════════════════════════════════════════════════════════════════

  genetic_financial: {
    title: 'Getting financial support for your child',
    steps: [
      {
        title: 'Apply for Disability Living Allowance (DLA)',
        description:
          "DLA is available for children with genetic conditions who need extra help or supervision. When completing the form, describe everything your child needs help with — even things that feel obvious. A rare condition doesn't mean less entitlement. DLA unlocks other benefits including Carer's Allowance and the Blue Badge.",
        action: 'Call 0800 121 4600 to request a DLA1 form. It can be backdated to this call.',
        link: 'https://www.gov.uk/disability-living-allowance-children',
      },
      {
        title: "Apply for Carer's Allowance",
        description:
          "If you spend 35+ hours a week caring, you could get £83.30 a week. Families with children who have complex genetic conditions almost always meet this threshold when you count all the care, monitoring, and medical management involved.",
        action: 'Apply online at gov.uk.',
        link: 'https://www.gov.uk/carers-allowance',
      },
      {
        title: 'Contact Genetic Alliance UK for financial guidance',
        description:
          "Genetic Alliance UK has advisers who understand the specific challenges of genetic conditions and can help you navigate the benefits system. They can also connect you with condition-specific charities that may offer grants.",
        action: 'Call 020 7831 0883 (Mon-Fri 9.30am-5pm).',
        link: 'https://geneticalliance.org.uk/',
      },
      {
        title: 'Apply to Family Fund',
        description:
          "Family Fund provides grants for essential items. For children with rare genetic conditions, this can include specialist equipment, hospital visiting costs, and family breaks.",
        action: 'Apply online at familyfund.org.uk.',
        link: 'https://www.familyfund.org.uk/apply',
      },
      {
        title: 'Check for condition-specific grants',
        description:
          "Many condition-specific charities offer grants — for example, the MPS Society, Cystic Fibrosis Trust, and sickle cell charities all have financial support programmes. Contact can help you find grants specific to your child's diagnosis.",
        action: 'Call Contact on 0808 808 3555 to search their grants database.',
        link: 'https://contact.org.uk/',
      },
      {
        title: 'Claim back hospital travel costs',
        description:
          "Children with genetic conditions often have very frequent hospital appointments, sometimes at distant specialist centres. If you're on a low income or certain benefits, you can get all travel costs refunded — including petrol, parking, and even accommodation.",
        action: 'Claim at the hospital cashier\'s office. Keep every receipt.',
        link: 'https://www.nhs.uk/nhs-services/help-with-health-costs/healthcare-travel-costs-scheme-htcs/',
      },
    ],
  },

  genetic_emotional: {
    title: 'Emotional support for you and your family',
    steps: [
      {
        title: 'Contact Genetic Alliance UK',
        description:
          "When your child has a genetic condition — especially a rare one — you can feel incredibly isolated. Genetic Alliance UK can connect you with other families who truly understand. They'll help you find condition-specific support groups and provide a listening ear.",
        action: 'Call 020 7831 0883 or visit geneticalliance.org.uk.',
        link: 'https://geneticalliance.org.uk/',
      },
      {
        title: 'Find your condition-specific support group',
        description:
          "There are support groups for almost every genetic condition, no matter how rare. These groups connect you with families living with the same diagnosis. They often know more about day-to-day management than the medical team. Unique covers rare chromosome disorders, and SWAN UK supports undiagnosed families.",
        action: 'Ask Genetic Alliance UK to help you find the right group, or visit rarechromo.org or undiagnosed.org.uk.',
        link: 'https://www.rarechromo.org/',
      },
      {
        title: 'Ask about genetic counselling',
        description:
          "A genetic counsellor can help you understand your child's diagnosis, what it means for the future, and any implications for your family. They provide emotional support alongside medical information. Ask your child's consultant for a referral.",
        action: 'Ask your child\'s consultant to refer you to a genetic counselling service.',
      },
      {
        title: 'Support siblings',
        description:
          "Brothers and sisters of children with genetic conditions often carry worry about whether they have the same condition and feelings about the extra attention their sibling needs. Sibs offers age-appropriate support.",
        action: 'Visit sibs.org.uk for sibling-specific resources and support groups.',
        link: 'https://www.sibs.org.uk/',
      },
      {
        title: 'Consider Together for Short Lives',
        description:
          "If your child's condition is life-limiting, Together for Short Lives can connect you with children's hospice services, palliative care, and respite breaks. Children's hospices are about living, not dying — they offer family time, specialist nursing, and a place to breathe.",
        action: 'Call 0808 8088 100 (Mon-Fri 9am-5pm).',
        link: 'https://www.togetherforshortlives.org.uk/get-support/',
      },
    ],
  },

  genetic_medical: {
    title: 'Getting the right medical support',
    steps: [
      {
        title: 'Make sure your child is under a specialist team',
        description:
          "Children with genetic conditions need specialist care. If your child is only seeing a general paediatrician, ask about referral to a specialist centre. For many genetic conditions there are nationally designated specialist centres — your consultant should know where they are.",
        action: 'Ask your child\'s consultant if there is a specialist centre for your child\'s condition.',
      },
      {
        title: 'Ask about clinical trials and research',
        description:
          "For many genetic conditions, research is advancing fast. The NIHR BioResource for Rare Diseases can connect your child with research studies. Ask your specialist team what trials or studies might be relevant. This doesn't mean experimental — it means your child could access the latest treatments.",
        action: 'Ask your consultant about relevant clinical trials, or visit bioresource.nihr.ac.uk.',
        link: 'https://bioresource.nihr.ac.uk/',
      },
      {
        title: 'Get a comprehensive care plan',
        description:
          "Many genetic conditions affect multiple body systems. Make sure there is one clinician coordinating your child's care across all their appointments and specialties. A care plan should list every professional involved, what monitoring is needed, and emergency protocols.",
        action: 'Ask your main consultant to create a coordinated care plan listing all professionals involved.',
      },
      {
        title: 'Create an emergency health passport',
        description:
          "For rare conditions, A&E staff may not know what your child needs in an emergency. A health passport — a short document explaining the condition, medications, allergies, and emergency protocols — can save time and prevent mistakes. Keep it in your bag and on your phone.",
        action: 'Create a one-page health passport with your consultant\'s help. Keep copies everywhere.',
      },
      {
        title: 'Connect with Genetic Alliance UK for specialist information',
        description:
          "Genetic Alliance UK can help you understand what medical monitoring your child should be receiving, connect you with condition-specific clinical guidelines, and signpost you to specialist centres you might not know about.",
        action: 'Call 020 7831 0883.',
        link: 'https://geneticalliance.org.uk/',
      },
      {
        title: 'Ask about genetic counselling for the wider family',
        description:
          "Genetic conditions can have implications for other family members, future pregnancies, and extended family. A genetic counsellor can help you understand inheritance patterns and what testing might be appropriate for other family members.",
        action: 'Ask your child\'s genetics team about family genetic counselling.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CANCER × 3 need categories
  // ═══════════════════════════════════════════════════════════════════════════

  cancer_financial: {
    title: 'Getting financial support during treatment',
    steps: [
      {
        title: 'Apply for Disability Living Allowance (DLA) immediately',
        description:
          "DLA is available for children undergoing cancer treatment. If your child has a terminal diagnosis, there is a fast-track process — called Special Rules — that means the claim is processed within days rather than weeks. Even without Special Rules, DLA can be backdated to when you call. Every day counts.",
        action: 'Call 0800 121 4600 to request a DLA1 form. Ask about Special Rules if applicable.',
        link: 'https://www.gov.uk/disability-living-allowance-children',
      },
      {
        title: 'Ask about Young Lives vs Cancer financial support',
        description:
          "Young Lives vs Cancer (formerly CLIC Sargent) provides a £100 registration grant to every family at diagnosis, plus crisis grants and ongoing support. Their social workers are based at your treatment centre and know exactly what help is available.",
        action: 'Ask your treatment centre about the Young Lives vs Cancer social worker, or call 0800 012 1020.',
        link: 'https://www.younglivesvscancer.org.uk/what-we-do/the-six-ways-we-help/',
      },
      {
        title: "Apply for Carer's Allowance",
        description:
          "If you've had to stop working or reduce hours to care for your child, you may qualify for £83.30 a week. You need to be caring 35+ hours a week and your child needs middle or highest rate DLA care component.",
        action: 'Apply online at gov.uk.',
        link: 'https://www.gov.uk/carers-allowance',
      },
      {
        title: 'Claim hospital travel costs',
        description:
          "Cancer treatment means many, many hospital trips — sometimes to distant specialist centres. If you're on a low income or certain benefits, all travel costs are refunded. Some treatment centres also have their own travel funds. Ask the hospital social worker.",
        action: 'Claim at the hospital cashier\'s office after every visit. Keep every receipt.',
        link: 'https://www.nhs.uk/nhs-services/help-with-health-costs/healthcare-travel-costs-scheme-htcs/',
      },
      {
        title: 'Call the Macmillan Support Line',
        description:
          "Macmillan has specialist financial advisers who can do a full benefits check and help with grant applications. They know the system inside out when it comes to cancer-related financial support. The line is open 7 days a week.",
        action: 'Call 0808 808 0000.',
        link: 'https://www.macmillan.org.uk/cancer-information-and-support/get-help',
      },
      {
        title: 'Apply to Family Fund and REACT',
        description:
          "Family Fund provides grants for essential items. REACT specifically helps children with life-limiting illnesses and can respond within 48 hours with emergency grants. Your hospital social worker can refer you to REACT.",
        action: 'Apply to Family Fund at familyfund.org.uk. Ask your social worker to refer to REACT.',
        link: 'https://www.familyfund.org.uk/apply',
      },
      {
        title: 'Ask about free accommodation near the hospital',
        description:
          "Ronald McDonald Houses provide free accommodation near major children's hospitals. Young Lives vs Cancer also has free Home from Home accommodation. Ask your ward nurse or social worker to refer you — you shouldn't be paying for somewhere to sleep while your child is in hospital.",
        action: 'Ask the ward nurse about Ronald McDonald House or Young Lives vs Cancer accommodation.',
        link: 'https://rmhc.org.uk/our-houses/',
      },
    ],
  },

  cancer_emotional: {
    title: 'Emotional support for your family',
    steps: [
      {
        title: 'Ask about the Young Lives vs Cancer social worker at your treatment centre',
        description:
          "Young Lives vs Cancer has specialist social workers based at children's cancer treatment centres across the UK. They provide emotional support, practical help, and can be with you from diagnosis onwards. They've walked this road with hundreds of families.",
        action: 'Ask your child\'s treatment team to introduce you to the Young Lives vs Cancer social worker.',
        link: 'https://www.younglivesvscancer.org.uk/',
      },
      {
        title: 'Call the Macmillan Support Line',
        description:
          "Macmillan's support line is open 7 days a week and staffed by cancer specialists. They can answer medical questions, help with emotional concerns, and connect you with local support. You can call as many times as you need.",
        action: 'Call 0808 808 0000.',
        link: 'https://www.macmillan.org.uk/cancer-information-and-support/get-help',
      },
      {
        title: 'Find other families going through this',
        description:
          "Connecting with other cancer parents can be one of the most powerful forms of support. Your treatment centre may run parent groups, and Young Lives vs Cancer has online communities. You're not alone in this, even when it feels like it.",
        action: 'Ask your treatment centre about parent support groups, or visit the Young Lives vs Cancer community.',
      },
      {
        title: 'Support siblings through Rainbow Trust',
        description:
          "Cancer treatment dominates family life, and siblings often feel scared, confused, and left out. Rainbow Trust Family Support Workers can look after siblings during hospital visits, talk them through what's happening, and give them attention they desperately need.",
        action: 'Ask your hospital social worker to refer to Rainbow Trust, or self-refer at rainbowtrust.org.uk.',
        link: 'https://www.rainbowtrust.org.uk/support',
      },
      {
        title: 'Let your child know about Childline',
        description:
          "If your child is old enough, Childline offers 24/7 confidential support. Sometimes children find it easier to talk to someone outside the family about their fears. Call 0800 1111 or chat online.",
        action: 'Let your child know about Childline — 0800 1111 or childline.org.uk.',
        link: 'https://www.childline.org.uk/',
      },
      {
        title: 'Ask about psychological support at your treatment centre',
        description:
          "Most principal treatment centres have clinical psychologists who work with families. They can help your child cope with treatment, manage anxiety about procedures, and support you and your partner too. You shouldn't have to wait to be offered this — ask for it.",
        action: 'Ask your child\'s consultant or key worker about psychological support at the treatment centre.',
      },
    ],
  },

  cancer_medical: {
    title: 'Understanding and navigating cancer treatment',
    steps: [
      {
        title: 'Find out about your Principal Treatment Centre',
        description:
          "The UK has 19 Principal Treatment Centres (PTCs) that specialise in children's cancer. Your child will be referred to the nearest one. The PTC coordinates all treatment, including shared care with your local hospital for routine appointments. Ask to meet the whole team.",
        action: 'Ask your hospital which PTC covers your area, or call CCLG on 0116 252 5858.',
        link: 'https://www.cclg.org.uk/young-people-and-cancer/i-have-cancer/hospitals/principal-treatment-centres',
      },
      {
        title: 'Read the CCLG information about your child\'s diagnosis',
        description:
          "The Children's Cancer and Leukaemia Group publishes clear, reliable information about every type of childhood cancer. Written by specialists and reviewed by families, these guides explain the diagnosis, treatment options, and what to expect. Knowledge helps you feel more in control.",
        action: 'Visit cclg.org.uk and search for your child\'s specific diagnosis.',
        link: 'https://www.cclg.org.uk/',
      },
      {
        title: 'Ask about clinical trials',
        description:
          "Most children with cancer are offered a place on a clinical trial. This is actually good news — it means your child gets the latest treatments, often before they're widely available. Your consultant should explain what trials are relevant and you always have the right to say no.",
        action: 'Ask your consultant whether there are any clinical trials relevant to your child\'s cancer.',
      },
      {
        title: 'Get a named key worker',
        description:
          "You should have a named key worker — usually a clinical nurse specialist — who is your main point of contact. They coordinate care, answer questions between appointments, and can be your lifeline when things feel overwhelming. If you don't have one, ask.",
        action: 'Ask your treatment team who your named key worker or clinical nurse specialist is.',
      },
      {
        title: 'Create a treatment folder',
        description:
          "Keep copies of blood results, scan reports, medication lists, and appointment letters in one folder. Take it to every appointment. It helps you track what's happening and makes handovers between shared care teams much safer.",
        action: 'Start a folder or use a notes app. Include: diagnosis, medications, blood results, and consultant names.',
      },
      {
        title: 'Know who to call in an emergency',
        description:
          "Children on cancer treatment can become seriously unwell very quickly, especially if they develop a fever while neutropenic. Your treatment centre should give you a 24-hour emergency number. Keep it in your phone and on the fridge. Don't hesitate to use it.",
        action: 'Save the treatment centre\'s 24-hour emergency number in your phone. Keep a written copy on the fridge.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GENERAL FALLBACKS — for conditions without specific plans
  // ═══════════════════════════════════════════════════════════════════════════

  general_financial: {
    title: 'Getting financial support for your child',
    steps: [
      {
        title: 'Apply for Disability Living Allowance (DLA)',
        description:
          "DLA is the most important benefit to apply for. It's tax-free and based on your child's needs, not their diagnosis. The amount depends on the level of care and supervision your child needs — most families receive middle rate care (around £73.90/week). DLA also unlocks other benefits like Carer's Allowance and the Blue Badge. Call now to request a form — DLA is paid from the date of this call.",
        action: 'Call 0800 121 4600 to request a DLA1 form, or download it from gov.uk.',
        link: 'https://www.gov.uk/disability-living-allowance-children',
      },
      {
        title: "Check if you can claim Carer's Allowance",
        description:
          "If you spend 35 or more hours a week looking after your child, you could get £83.30 a week. You can claim once your child gets the middle or highest rate DLA care component. It's a separate application.",
        action: 'Apply online at gov.uk.',
        link: 'https://www.gov.uk/carers-allowance',
      },
      {
        title: 'Apply to Family Fund for essential items',
        description:
          "Family Fund gives grants for things families actually need — computers, washing machines, family breaks, clothing, and bedding. If you're on a low income and have a child with a serious condition, you'll likely qualify.",
        action: 'Apply online at familyfund.org.uk.',
        link: 'https://www.familyfund.org.uk/apply',
      },
      {
        title: 'Run a free benefits check',
        description:
          "The Turn2us calculator checks every benefit you could be claiming. It's anonymous, takes about 20 minutes, and many families discover they're missing hundreds of pounds a month.",
        action: 'Use the free calculator at Turn2us.',
        link: 'https://benefits-calculator.turn2us.org.uk/',
      },
      {
        title: 'Contact Contact for grants information',
        description:
          "Contact has a database of grants from charitable trusts. Their advisers can match your situation with available funding for equipment, holidays, home adaptations, and everyday essentials.",
        action: 'Call 0808 808 3555 (Mon-Fri 9.30am-5pm).',
        link: 'https://contact.org.uk/',
      },
      {
        title: 'Claim back hospital travel costs',
        description:
          "If you're on a low income or certain benefits, you can get hospital travel costs refunded — petrol, parking, public transport, and sometimes taxis. Keep every receipt and claim within 3 months.",
        action: 'Claim at the hospital cashier\'s office after each appointment.',
        link: 'https://www.nhs.uk/nhs-services/help-with-health-costs/healthcare-travel-costs-scheme-htcs/',
      },
    ],
  },

  general_education: {
    title: 'Getting the right education support',
    steps: [
      {
        title: 'Talk to the school SENCO',
        description:
          "The SENCO (Special Educational Needs Coordinator) is the person at school responsible for making sure children with additional needs get the right support. Book a meeting, explain what's happening, and ask what support is already in place and what more can be done.",
        action: 'Email or call the school to arrange a meeting with the SENCO.',
      },
      {
        title: 'Request an EHC needs assessment if your child needs more support',
        description:
          "If your child needs more support than the school can provide from its own resources, you can request an Education, Health and Care Plan. This is a legal document that sets out exactly what support your child must receive. You can request the assessment yourself.",
        action: 'Write to your local authority\'s SEN team. IPSEA has free template letters.',
        link: 'https://www.ipsea.org.uk/advice-line',
      },
      {
        title: 'Contact your local SENDIASS',
        description:
          "SENDIASS is a free, impartial advice service available in every local authority. They help parents understand the SEN system, support EHCP applications, and can attend school meetings with you. Most parents don't know this service exists — but it's invaluable.",
        action: 'Find your local SENDIASS service.',
        link: 'https://councilfordisabledchildren.org.uk/information-advice-and-support-services-network/find-your-local-iass',
      },
      {
        title: 'Ask the school about reasonable adjustments',
        description:
          "All schools have a legal duty to make reasonable adjustments for disabled children. This might include flexible timing, modified materials, a quiet space, or additional adult support. Be specific about what your child needs.",
        action: 'Write to the school listing the specific adjustments your child needs, and ask for a written response.',
      },
      {
        title: 'Get free legal advice from IPSEA',
        description:
          "IPSEA provides free, expert legal advice on special educational needs. If you're not sure about your rights, or the school or local authority isn't doing what they should, IPSEA can help. They know SEN law inside out.",
        action: 'Book a callback on the IPSEA website or call on Tue, Wed, or Fri 9.30am-2.30pm.',
        link: 'https://www.ipsea.org.uk/advice-line',
      },
    ],
  },

  general_emotional: {
    title: 'Emotional support for you and your family',
    steps: [
      {
        title: 'Call Contact — the helpline for families of disabled children',
        description:
          "Contact is a free helpline specifically for families of disabled children. They understand the emotional weight of what you're going through and can help with practical questions too. Sometimes just talking to someone who gets it makes a huge difference.",
        action: 'Call 0808 808 3555 (Mon-Fri 9.30am-5pm).',
        link: 'https://contact.org.uk/help-for-families/information-advice-services/our-helpline/',
      },
      {
        title: 'Find a local parent support group',
        description:
          "Other parents who are going through similar things can become your greatest source of strength. Your local authority's children's disability team, your hospital, and condition-specific charities can all help you find local groups.",
        action: 'Ask your child\'s hospital or local authority about parent support groups in your area.',
      },
      {
        title: 'Look after siblings',
        description:
          "Brothers and sisters often have big feelings they don't know how to express. Sibs is the only charity in the UK specifically for siblings of disabled children. They run online groups, workshops, and have excellent resources.",
        action: 'Visit sibs.org.uk.',
        link: 'https://www.sibs.org.uk/',
      },
      {
        title: 'Ask your GP about support for yourself',
        description:
          "Being a carer is demanding. You don't have to be coping perfectly. Your GP can offer counselling referrals, a carer's health check, and connect you with local support. You deserve support too.",
        action: 'Book a GP appointment and mention that you\'re a carer.',
      },
      {
        title: 'Explore Scope\'s emotional support',
        description:
          "Scope's helpline provides free, independent advice and emotional support for disabled people and their families. Their advisers understand the isolation and stress and can help you find the right support.",
        action: 'Call 0808 800 3333 (Mon-Sat 8am-8pm, Sun 10am-6pm).',
        link: 'https://www.scope.org.uk/helpline',
      },
    ],
  },

  general_medical: {
    title: 'Getting the right medical support',
    steps: [
      {
        title: 'Make sure your child has the right specialist',
        description:
          "If your child's condition needs specialist care, ask your GP for a referral. Don't settle for a GP managing something that needs a consultant. If you're not sure who the right specialist is, ask your GP or contact a charity that focuses on your child's condition.",
        action: 'Book a GP appointment and ask whether your child should see a specialist.',
      },
      {
        title: 'Ask for a care plan',
        description:
          "A written care plan brings everything together — diagnosis, medication, appointments, emergency contacts, and what to do in a crisis. If your child sees multiple specialists, make sure someone is coordinating all the different parts. Ask for a named lead clinician.",
        action: 'Ask your child\'s main consultant to create a coordinated care plan.',
      },
      {
        title: 'Keep your own medical folder',
        description:
          "Keep copies of letters, test results, and medication changes in one place. Take it to every appointment. When you're tired and stressed, having everything written down means you don't have to rely on memory.",
        action: 'Start a folder with: diagnosis summary, medication list, consultant names, and emergency contacts.',
      },
      {
        title: 'Contact the relevant charity helpline',
        description:
          "Almost every condition has a charity with a helpline. These organisations often know more about day-to-day management than your GP does. They can help you prepare for appointments, understand test results, and connect you with specialists.",
        action: 'Search for your child\'s condition + \"charity UK\" to find condition-specific support.',
      },
      {
        title: 'Know your rights as a patient',
        description:
          "You have the right to a second opinion, to see your child's medical records, and to be involved in every decision about their care. If you're not happy with the care your child is receiving, you can ask for a referral elsewhere.",
        action: 'Contact PALS (Patient Advice and Liaison Service) at your hospital if you have concerns about care.',
      },
    ],
  },

  general_practical: {
    title: 'Practical help to make daily life easier',
    steps: [
      {
        title: 'Request a social care assessment from your local council',
        description:
          "Your local council can assess what support your family needs — short breaks, a personal budget, equipment, or a family support worker. You have a legal right to request this assessment. You don't need to wait to be offered it.",
        action: 'Contact your local authority\'s children\'s disability team and request a child in need assessment.',
      },
      {
        title: 'Check if your child qualifies for a Blue Badge',
        description:
          "If your child gets the higher rate mobility component of DLA, they automatically qualify. Even without this, children who can't walk far or who would be at risk near roads may qualify. It makes hospital trips, school runs, and outings much easier.",
        action: 'Apply online through your local council.',
        link: 'https://www.gov.uk/apply-blue-badge',
      },
      {
        title: 'Look into home adaptations',
        description:
          "If your home needs changes to make it work for your child, a Disabled Facilities Grant from your council can help. This covers things like ramps, accessible bathrooms, specialist beds, and more — up to £30,000 in England.",
        action: 'Contact your local council and ask about a Disabled Facilities Grant.',
        link: 'https://www.gov.uk/disabled-facilities-grants',
      },
      {
        title: 'Explore short breaks and respite',
        description:
          "Short breaks give you time to recharge while your child has new experiences. Your local authority should publish a short breaks statement listing what's available — after-school clubs, holiday schemes, overnight stays, or a budget for you to choose your own support.",
        action: 'Search your local authority\'s website for their short breaks statement.',
      },
      {
        title: 'Contact WellChild about home support',
        description:
          "WellChild helps children with complex health needs spend more time at home and less time in hospital. Their nurses coordinate care, and they also do home and garden transformations for families.",
        action: 'Call 01242 530007.',
        link: 'https://www.wellchild.org.uk/',
      },
    ],
  },
};

/**
 * Look up the best action plan for a given condition category and need.
 * Falls back to general plans when no specific plan exists.
 *
 * @param {string} conditionCategory - e.g. 'developmental', 'cancer', 'physical'
 * @param {string} needCategory - e.g. 'financial', 'education', 'emotional', 'medical', 'practical'
 * @returns {object|null} The action plan object with title and steps, or null if nothing matches
 */
export function getActionPlan(conditionCategory, needCategory) {
  const specificKey = `${conditionCategory}_${needCategory}`;
  if (ACTION_PLANS[specificKey]) {
    return ACTION_PLANS[specificKey];
  }

  // Fall back to general plan
  const fallbackKey = `general_${needCategory}`;
  if (ACTION_PLANS[fallbackKey]) {
    return ACTION_PLANS[fallbackKey];
  }

  return null;
}

/**
 * Get all action plans relevant to a user's needs and condition.
 * Returns an array of plans ordered by the user's stated priority.
 *
 * @param {string} conditionCategory - the condition category from the wizard
 * @param {string[]} needs - array of need categories, in priority order
 * @returns {Array<{ needCategory: string, plan: object }>}
 */
export function getActionPlansForUser(conditionCategory, needs) {
  if (!needs || needs.length === 0) return [];

  return needs
    .map(need => ({
      needCategory: need,
      plan: getActionPlan(conditionCategory, need),
    }))
    .filter(entry => entry.plan !== null);
}

/**
 * Bridge function matching the signature expected by ResultsContainer.
 * Takes the wizard state and returns a single action plan for the primary need,
 * with link strings normalised to { url, label } objects.
 *
 * @param {{ conditionCategory: string, needs: string[] }} wizard
 * @returns {object|null}
 */
export function generateActionPlan(wizard) {
  if (!wizard?.conditionCategory || !wizard?.needs?.length) return null;

  // Use the first selected need as the primary plan
  const plan = getActionPlan(wizard.conditionCategory, wizard.needs[0]);
  if (!plan) return null;

  return {
    id: `${wizard.conditionCategory}_${wizard.needs[0]}`,
    title: plan.title,
    subtitle: `Based on your situation — ${wizard.condition || wizard.conditionCategory}`,
    steps: plan.steps.map(step => ({
      ...step,
      // Normalise link: string → { url, label }
      link: typeof step.link === 'string'
        ? { url: step.link, label: step.linkLabel || 'Learn more' }
        : step.link || null,
    })),
  };
}
