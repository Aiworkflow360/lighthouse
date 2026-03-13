// Smart triage: picks the 3 most important resources for a parent to act on THIS WEEK
// Rule-based scoring — no AI, no API calls

/**
 * @param {object} wizard - wizard state with { needs, conditionCategory, condition }
 * @param {Array} resources - filtered resource list from DEMO_RESOURCES
 * @returns {{ steps: Array<{ resource, why, action }>, encouragement: string }}
 */
export function generateTriage(wizard, resources) {
  if (!resources || resources.length === 0) {
    return { steps: [], encouragement: '' };
  }

  // Score each resource
  const scored = resources.map(r => ({
    resource: r,
    score: scoreResource(r, wizard),
  }));

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Pick top 3, enforcing variety: no more than 2 from the same category
  const steps = [];
  const categoryCounts = {};

  for (const entry of scored) {
    if (steps.length >= 3) break;
    const cat = entry.resource.category;
    const count = categoryCounts[cat] || 0;
    if (count >= 2) continue; // skip if we already have 2 from this category
    categoryCounts[cat] = count + 1;
    steps.push({
      resource: entry.resource,
      why: generateWhy(entry.resource, wizard),
      action: generateAction(entry.resource),
    });
  }

  return {
    steps,
    encouragement: generateEncouragement(wizard),
  };
}

function scoreResource(r, wizard) {
  let score = 0;

  // Backdatable benefits — every day delayed = money lost
  if (r.id === 'dla-children' || r.id === 'carers-allowance') {
    score += 50;
  }

  // Emergency / fast turnaround — immediate help
  if (r.type === 'emergency_fund' || (r.turnaround_days != null && r.turnaround_days < 7)) {
    score += 40;
  }

  // Condition-specific match
  if (
    r.conditionCategory &&
    r.conditionCategory !== 'all' &&
    wizard.conditionCategory &&
    r.conditionCategory === wizard.conditionCategory
  ) {
    score += 30;
  }

  // Matches top priority need
  if (wizard.needs && wizard.needs.length > 0 && r.category === wizard.needs[0]) {
    score += 20;
  }

  // Has phone — can act immediately, low barrier
  if (r.apply_phone) {
    score += 10;
  }

  // Has tangible financial benefit
  if (r.max_award_gbp) {
    score += 10;
  }

  // Helpline — easy first step
  if (r.type === 'helpline') {
    score += 5;
  }

  return score;
}

function generateWhy(r, wizard) {
  // DLA / Carer's Allowance — backdatable
  if (r.id === 'dla-children' || r.id === 'carers-allowance') {
    return "This can be backdated \u2014 every day you wait could mean money lost.";
  }

  // Emergency grant
  if (r.type === 'emergency_fund') {
    return `They typically respond within ${r.turnaround_days} days.`;
  }

  // Helpline
  if (r.type === 'helpline') {
    return "Free, no referral needed \u2014 sometimes you just need someone who understands.";
  }

  // Condition-specific
  if (
    r.conditionCategory &&
    r.conditionCategory !== 'all' &&
    wizard.conditionCategory &&
    r.conditionCategory === wizard.conditionCategory
  ) {
    return `Specifically for families dealing with ${wizard.condition || "your child's condition"}.`;
  }

  // Education
  if (r.category === 'education') {
    return "Getting the right school support early makes a huge difference.";
  }

  // Financial grant with max award
  if (r.max_award_gbp) {
    return `You could receive up to \u00A3${r.max_award_gbp.toLocaleString()}.`;
  }

  // Default
  return "A good first step based on your situation.";
}

function generateAction(r) {
  if (r.apply_phone) {
    return `Call ${r.apply_phone}`;
  }
  return 'Visit their website';
}

function generateEncouragement(wizard) {
  const primary = wizard.needs && wizard.needs.length > 0 ? wizard.needs[0] : null;

  switch (primary) {
    case 'financial':
      return "Money worries are real. These steps can help take the pressure off.";
    case 'emotional':
      return "Asking for support takes courage. You're already doing the right thing.";
    case 'education':
      return "The system is complicated, but you don't have to figure it out alone.";
    case 'medical':
      return "You don't have to navigate the medical system by yourself.";
    default:
      return "You've taken the first step by looking for help. Here's where to start.";
  }
}
