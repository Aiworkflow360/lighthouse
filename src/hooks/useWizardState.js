import { useState, useCallback, useMemo } from 'react';

const STEPS = ['landing', 'condition', 'postcode', 'results'];

function encodeState(state) {
  try {
    return btoa(JSON.stringify(state));
  } catch { return ''; }
}

function decodeState(encoded) {
  try {
    return JSON.parse(atob(encoded));
  } catch { return null; }
}

export function useWizardState() {
  // Try to restore from URL on mount
  const initialState = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      const decoded = decodeState(q);
      if (decoded) return { step: 3, ...decoded }; // Go straight to results
    }
    return { step: 0, condition: null, conditionCategory: null, postcode: null, postcodeData: null, needs: [] };
  }, []);

  const [step, setStep] = useState(initialState.step);
  const [condition, setCondition] = useState(initialState.condition);
  const [conditionCategory, setConditionCategory] = useState(initialState.conditionCategory);
  const [postcode, setPostcode] = useState(initialState.postcode);
  const [postcodeData, setPostcodeData] = useState(initialState.postcodeData);
  const [needs, setNeeds] = useState(initialState.needs);

  const currentStep = STEPS[step] || 'landing';

  const next = useCallback(() => {
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  }, []);

  const back = useCallback(() => {
    setStep(s => Math.max(s - 1, 0));
  }, []);

  const goToStep = useCallback((targetStep) => {
    // Only allow navigating to completed steps (earlier than current) or current step
    setStep(s => {
      if (targetStep >= 0 && targetStep < s) return targetStep;
      return s;
    });
  }, []);

  const restart = useCallback(() => {
    setStep(0);
    setCondition(null);
    setConditionCategory(null);
    setPostcode(null);
    setPostcodeData(null);
    setNeeds([]);
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  const getShareUrl = useCallback(() => {
    const state = { condition, conditionCategory, postcode, postcodeData, needs };
    const encoded = encodeState(state);
    return `${window.location.origin}${window.location.pathname}?q=${encoded}`;
  }, [condition, conditionCategory, postcode, postcodeData, needs]);

  // Update URL when reaching results — auto-select all needs
  const goToResults = useCallback(() => {
    const allNeeds = ['education', 'financial', 'emotional', 'medical', 'practical'];
    setNeeds(allNeeds);
    const state = { condition, conditionCategory, postcode, postcodeData, needs: allNeeds };
    const encoded = encodeState(state);
    window.history.replaceState(null, '', `?q=${encoded}`);
    setStep(3);
  }, [condition, conditionCategory, postcode, postcodeData]);

  return {
    step, currentStep, STEPS,
    condition, setCondition,
    conditionCategory, setConditionCategory,
    postcode, setPostcode,
    postcodeData, setPostcodeData,
    needs, setNeeds,
    next, back, goToStep, restart,
    getShareUrl, goToResults,
  };
}
