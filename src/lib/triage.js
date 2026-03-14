// Personal triage: 3-step journey — Breathe → Connect → Act
// Rule-based selection — no AI, no API calls

/**
 * @param {object} wizard - wizard state with { needs, conditionCategory, condition }
 * @param {Array} resources - filtered resource list from DEMO_RESOURCES
 * @returns {{ steps: Array<{ title, description, resource?, icon }>, encouragement: string }}
 */
export function generateTriage(wizard, resources) {
  if (!resources || resources.length === 0) {
    return { steps: [], encouragement: '' };
  }

  const condLower = (wizard.condition || '').toLowerCase();

  // Step 1: Breathe — always static, warm, calming
  const breatheStep = {
    icon: 'breathe',
    title: 'Take a breath',
    description: breatheMessage(wizard),
    resource: null,
  };

  // Step 2: Connect — find best helpline or support group
  const connectResource = findBestConnect(resources, wizard, condLower);
  const connectStep = {
    icon: 'connect',
    title: connectResource ? 'Talk to someone who gets it' : 'Reach out to someone',
    description: connectResource
      ? connectDescription(connectResource, wizard)
      : "You don't have to figure this out alone. Talk to a friend, your GP, or a family member you trust.",
    resource: connectResource,
  };

  // Step 3: Act — find best financial resource or practical first step
  const actResource = findBestAction(resources, wizard, condLower);
  const actStep = {
    icon: 'act',
    title: actResource ? actTitle(actResource) : 'Start with one thing',
    description: actResource
      ? actDescription(actResource, wizard)
      : "When you're ready, pick one small thing from the resources below. You don't have to do everything today.",
    resource: actResource,
  };

  return {
    steps: [breatheStep, connectStep, actStep],
    encouragement: generateEncouragement(wizard),
  };
}

function breatheMessage(wizard) {
  const condition = wizard.condition;
  if (condition) {
    return `Finding out about ${condition} can feel overwhelming. That's completely normal. You don't need to have all the answers right now — just being here means you're already doing something.`;
  }
  return "Whatever you're going through, it's okay to feel overwhelmed. You don't need to have all the answers right now — just being here means you're already doing something.";
}

function findBestConnect(resources, wizard, condLower) {
  // Prefer: helpline or support_group, condition-specific first, then general
  const connectTypes = resources.filter(r =>
    r.type === 'helpline' || r.type === 'support_group'
  );

  if (connectTypes.length === 0) return null;

  // Score for connection relevance
  const scored = connectTypes.map(r => {
    let score = 0;
    // Exact condition match = top priority
    if (r.conditions && condLower && r.conditions.some(tag => condLower.includes(tag))) {
      score += 50;
    }
    // Same category match
    if (r.conditionCategory === wizard.conditionCategory && r.conditionCategory !== 'all') {
      score += 30;
    }
    // Helplines are easier to contact than support groups
    if (r.type === 'helpline') score += 10;
    // Has a phone number = lower barrier
    if (r.apply_phone) score += 5;
    return { resource: r, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.resource || null;
}

function connectDescription(r, wizard) {
  if (r.type === 'helpline') {
    return `${r.organisation} has people who understand what you're going through. It's free, confidential, and you don't need a referral — just pick up the phone when you're ready.`;
  }
  return `${r.organisation} connects you with other families in the same situation. Sometimes the most helpful thing is talking to someone who truly gets it.`;
}

function findBestAction(resources, wizard, condLower) {
  // Prefer: financial benefits/grants, then advocacy/education resources
  const actionTypes = resources.filter(r =>
    r.type === 'benefit' || r.type === 'grant' || r.type === 'emergency_fund' ||
    r.type === 'advocacy'
  );

  if (actionTypes.length === 0) return null;

  const scored = actionTypes.map(r => {
    let score = 0;
    // Backdatable = urgent
    if (r.id === 'dla-children' || r.id === 'carers-allowance') score += 60;
    // Emergency fund = fast
    if (r.type === 'emergency_fund') score += 40;
    // Has monetary value
    if (r.max_award_gbp) score += 20;
    // Condition-specific match
    if (r.conditions && condLower && r.conditions.some(tag => condLower.includes(tag))) {
      score += 15;
    }
    // Has phone = easy to start
    if (r.apply_phone) score += 5;
    return { resource: r, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.resource || null;
}

function actTitle(r) {
  if (r.id === 'dla-children') return 'Apply for DLA — it can be backdated';
  if (r.id === 'carers-allowance') return "Claim Carer's Allowance";
  if (r.type === 'emergency_fund') return 'Get emergency financial help';
  if (r.type === 'grant') return 'Apply for a grant';
  if (r.type === 'advocacy') return 'Get free legal advice on your rights';
  return 'Take one practical step';
}

function actDescription(r, wizard) {
  if (r.id === 'dla-children') {
    return "DLA can be backdated to when you first called — every day you wait could mean money lost. It's worth up to £9,748/year and the call takes 10 minutes.";
  }
  if (r.id === 'carers-allowance') {
    return "If you're spending 35+ hours a week caring, you could get £81.90/week. It only takes a few minutes to apply online.";
  }
  if (r.type === 'emergency_fund') {
    return `${r.organisation} can help with emergency costs — they typically respond within ${r.turnaround_days || 'a few'} days.`;
  }
  if (r.max_award_gbp) {
    return `${r.organisation} offers grants up to £${r.max_award_gbp.toLocaleString()}. ${r.apply_phone ? 'Give them a call to get started.' : 'Visit their website to apply.'}`;
  }
  if (r.type === 'advocacy') {
    return `${r.organisation} gives free, independent advice on your child's rights. They know the system inside out.`;
  }
  return `${r.organisation} can help you take a practical next step. ${r.apply_phone ? 'Give them a call.' : 'Visit their website.'}`;
}

function generateEncouragement(wizard) {
  const primary = wizard.needs && wizard.needs.length > 0 ? wizard.needs[0] : null;

  switch (primary) {
    case 'financial':
      return "You don't have to sort everything out today. Just one step at a time.";
    case 'emotional':
      return "Asking for support takes courage. You're already doing the right thing.";
    case 'education':
      return "The system is complicated, but you don't have to figure it out alone.";
    case 'medical':
      return "You're doing your best for your child. That's what matters.";
    default:
      return "You've already taken the hardest step — looking for help. Everything else gets easier from here.";
  }
}
