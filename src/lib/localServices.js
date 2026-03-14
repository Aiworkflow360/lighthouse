// Local services lookup — returns SENDIASS, Local Offer, and Parent Carer Forum
// info based on postcode data from postcodes.io.
//
// Phase 1: Smart search URL generation for every local authority.
// Phase 2: Will be replaced with a Supabase-backed database of verified entries.

/**
 * Generate local service links for a given postcode/local authority.
 *
 * @param {object} postcodeData — result from postcodes.io outcode lookup
 * @param {string} postcodeData.localAuthority — e.g. "Leeds"
 * @param {string} postcodeData.region — e.g. "Yorkshire and the Humber"
 * @param {string} postcodeData.outcode — e.g. "LS1"
 * @returns {object} — { sendiass, localOffer, parentCarerForum }
 */
export function getLocalServices(postcodeData) {
  if (!postcodeData) return null;

  const la = postcodeData.localAuthority || '';
  const laEncoded = encodeURIComponent(la);

  return {
    sendiass: {
      name: `${la} SENDIASS`,
      description: 'Free, impartial advice on special educational needs and disabilities. They can attend meetings with you.',
      website: `https://www.google.com/search?q=${laEncoded}+SENDIASS+contact`,
      findUrl: 'https://councilfordisabledchildren.org.uk/information-advice-and-support-services-network/find-your-local-iass',
    },
    localOffer: {
      name: `${la} Local Offer`,
      description: 'Your council\'s directory of SEND services, schools, and support available in your area.',
      url: `https://www.google.com/search?q=${laEncoded}+local+offer+SEND`,
    },
    parentCarerForum: {
      name: `${la} Parent Carer Forum`,
      description: 'Other parents in your area who understand. Peer support, information events, and a collective voice.',
      url: `https://www.google.com/search?q=${laEncoded}+parent+carer+forum`,
      nationalUrl: 'https://www.nnpcf.org.uk/find-your-forum/',
    },
  };
}
