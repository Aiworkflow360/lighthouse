// Postcodes.io — free UK postcode lookup (no auth required)

export async function lookupPostcode(postcode, { signal } = {}) {
  const clean = postcode.replace(/\s+/g, '').toUpperCase();
  try {
    const resp = await fetch(`https://api.postcodes.io/postcodes/${clean}`, { signal });
    if (resp.status === 404) {
      return { error: true, message: 'Invalid postcode' };
    }
    if (!resp.ok) {
      return { error: true, message: 'Network error' };
    }
    const data = await resp.json();
    if (data.status !== 200 || !data.result) {
      return { error: true, message: 'Invalid postcode' };
    }
    return {
      postcode: data.result.postcode,
      outcode: data.result.outcode,
      region: data.result.region,
      nhsRegion: data.result.nhs_ha,
      localAuthority: data.result.admin_district,
      country: data.result.country,
      latitude: data.result.latitude,
      longitude: data.result.longitude,
    };
  } catch (err) {
    if (err.name === 'AbortError') {
      return { error: true, message: 'Request timed out' };
    }
    return { error: true, message: 'Network error' };
  }
}

export async function validatePostcode(postcode) {
  const clean = postcode.replace(/\s+/g, '').toUpperCase();
  try {
    const resp = await fetch(`https://api.postcodes.io/postcodes/${clean}/validate`);
    const data = await resp.json();
    return data.result === true;
  } catch {
    return false;
  }
}
