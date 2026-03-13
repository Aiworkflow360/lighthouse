// Postcodes.io — free UK postcode lookup (no auth required)

export async function lookupPostcode(postcode) {
  const clean = postcode.replace(/\s+/g, '').toUpperCase();
  try {
    const resp = await fetch(`https://api.postcodes.io/postcodes/${clean}`);
    if (!resp.ok) return null;
    const data = await resp.json();
    if (data.status !== 200 || !data.result) return null;
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
  } catch {
    return null;
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
