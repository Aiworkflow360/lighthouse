import { useState, useCallback, useMemo } from 'react';

const STEPS = ['landing', 'condition', 'age', 'postcode', 'needs', 'results'];

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
      if (decoded) return { step: 5, ...decoded }; // Go straight to results
    }
    return { step: 0, condition: null, conditionCategory: null, age: null, postcode: null, postcodeData: null, needs: [] };
  }, []);

  const [step, setStep] = useState(initialState.step);
  const [condition, setCondition] = useState(initialState.condition);
  const [conditionCategory, setConditionCategory] = useState(initialState.conditionCategory);
  const [age, setAge] = useState(initialState.age);
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

  const restart = useCallback(() => {
    setStep(0);
    setCondition(null);
    setConditionCategory(null);
    setAge(null);
    setPostcode(null);
    setPostcodeData(null);
    setNeeds([]);
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  const getShareUrl = useCallback(() => {
    const state = { condition, conditionCategory, age, postcode, postcodeData, needs };
    const encoded = encodeState(state);
    return `${window.location.origin}${window.location.pathname}?q=${encoded}`;
  }, [condition, conditionCategory, age, postcode, postcodeData, needs]);

  // Update URL when reaching results
  const goToResults = useCallback(() => {
    const state = { condition, conditionCategory, age, postcode, postcodeData, needs };
    const encoded = encodeState(state);
    window.history.replaceState(null, '', `?q=${encoded}`);
    setStep(5);
  }, [condition, conditionCategory, age, postcode, postcodeData, needs]);

  return {
    step, currentStep, STEPS,
    condition, setCondition,
    conditionCategory, setConditionCategory,
    age, setAge,
    postcode, setPostcode,
    postcodeData, setPostcodeData,
    needs, setNeeds,
    next, back, restart,
    getShareUrl, goToResults,
  };
}
