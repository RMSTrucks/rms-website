export interface StateData {
  name: string;
  abbrev: string;
  slug: string;
  active: boolean;
}

export const STATES: StateData[] = [
  { name: "Alabama", abbrev: "AL", slug: "alabama", active: true },
  { name: "Arizona", abbrev: "AZ", slug: "arizona", active: true },
  { name: "Arkansas", abbrev: "AR", slug: "arkansas", active: true },
  { name: "Colorado", abbrev: "CO", slug: "colorado", active: true },
  { name: "Connecticut", abbrev: "CT", slug: "connecticut", active: true },
  { name: "Delaware", abbrev: "DE", slug: "delaware", active: true },
  { name: "Florida", abbrev: "FL", slug: "florida", active: true },
  { name: "Georgia", abbrev: "GA", slug: "georgia", active: true },
  { name: "Idaho", abbrev: "ID", slug: "idaho", active: true },
  { name: "Illinois", abbrev: "IL", slug: "illinois", active: true },
  { name: "Indiana", abbrev: "IN", slug: "indiana", active: true },
  { name: "Iowa", abbrev: "IA", slug: "iowa", active: true },
  { name: "Kansas", abbrev: "KS", slug: "kansas", active: true },
  { name: "Kentucky", abbrev: "KY", slug: "kentucky", active: true },
  { name: "Louisiana", abbrev: "LA", slug: "louisiana", active: true },
  { name: "Maine", abbrev: "ME", slug: "maine", active: true },
  { name: "Maryland", abbrev: "MD", slug: "maryland", active: true },
  { name: "Minnesota", abbrev: "MN", slug: "minnesota", active: true },
  { name: "Missouri", abbrev: "MO", slug: "missouri", active: true },
  { name: "Montana", abbrev: "MT", slug: "montana", active: true },
  { name: "Nebraska", abbrev: "NE", slug: "nebraska", active: true },
  { name: "Nevada", abbrev: "NV", slug: "nevada", active: true },
  { name: "New Jersey", abbrev: "NJ", slug: "new-jersey", active: true },
  { name: "New Mexico", abbrev: "NM", slug: "new-mexico", active: true },
  { name: "North Carolina", abbrev: "NC", slug: "north-carolina", active: true },
  { name: "North Dakota", abbrev: "ND", slug: "north-dakota", active: true },
  { name: "Ohio", abbrev: "OH", slug: "ohio", active: true },
  { name: "Oregon", abbrev: "OR", slug: "oregon", active: true },
  { name: "Pennsylvania", abbrev: "PA", slug: "pennsylvania", active: true },
  { name: "South Carolina", abbrev: "SC", slug: "south-carolina", active: true },
  { name: "South Dakota", abbrev: "SD", slug: "south-dakota", active: true },
  { name: "Tennessee", abbrev: "TN", slug: "tennessee", active: true },
  { name: "Texas", abbrev: "TX", slug: "texas", active: true },
  { name: "Utah", abbrev: "UT", slug: "utah", active: true },
  { name: "Vermont", abbrev: "VT", slug: "vermont", active: true },
  { name: "Washington", abbrev: "WA", slug: "washington", active: true },
  { name: "West Virginia", abbrev: "WV", slug: "west-virginia", active: true },
  { name: "Wisconsin", abbrev: "WI", slug: "wisconsin", active: true },
  { name: "Wyoming", abbrev: "WY", slug: "wyoming", active: true },
];

export function getStateBySlug(slug: string): StateData | undefined {
  return STATES.find(s => s.slug === slug);
}

export function getStateByAbbrev(abbrev: string): StateData | undefined {
  return STATES.find(s => s.abbrev === abbrev);
}

export function getActiveStates(): StateData[] {
  return STATES.filter(s => s.active);
}
