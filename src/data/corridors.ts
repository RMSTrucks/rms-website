export interface CorridorData {
  name: string;
  slug: string;
  label: string;
  states: string[];
  primary: boolean;
}

export const CORRIDORS: CorridorData[] = [
  { name: "I-95", slug: "i-95", label: "I-95: Florida to Maine", states: ["FL","GA","SC","NC","MD","DE","NJ","CT","RI","ME"], primary: true },
  { name: "I-10", slug: "i-10", label: "I-10: Florida to Arizona", states: ["FL","AL","LA","TX","NM","AZ"], primary: true },
  { name: "I-80", slug: "i-80", label: "I-80: Pennsylvania to Nevada", states: ["PA","OH","IN","IL","IA","NE","WY","UT","NV"], primary: true },
  { name: "I-75", slug: "i-75", label: "I-75: Florida to Ohio", states: ["FL","GA","TN","KY","OH"], primary: true },
  { name: "I-40", slug: "i-40", label: "I-40: North Carolina to Arizona", states: ["NC","TN","AR","OK","TX","NM","AZ"], primary: true },
  { name: "I-35", slug: "i-35", label: "I-35: Texas to Minnesota", states: ["TX","OK","KS","MO","IA","MN"], primary: true },
  { name: "I-90", slug: "i-90", label: "I-90: Ohio to Montana", states: ["OH","IN","IL","WI","MN","SD","WY","MT"], primary: true },
  { name: "I-20", slug: "i-20", label: "I-20: South Carolina to Texas", states: ["SC","GA","AL","LA","TX"], primary: true },
  { name: "I-70", slug: "i-70", label: "I-70: Pennsylvania to Utah", states: ["PA","OH","IN","IL","MO","KS","CO","UT"], primary: true },
  { name: "I-15", slug: "i-15", label: "I-15: Nevada to Montana", states: ["NV","AZ","UT","ID","MT"], primary: true },
  { name: "I-84", slug: "i-84", label: "I-84: Oregon to Idaho", states: ["OR","ID"], primary: true },
  { name: "I-65", slug: "i-65", label: "I-65: Alabama to Indiana", states: ["AL","TN","KY","IN"], primary: false },
  { name: "I-81", slug: "i-81", label: "I-81: Tennessee to Pennsylvania", states: ["TN","WV","PA"], primary: false },
  { name: "I-94", slug: "i-94", label: "I-94: Montana to Wisconsin", states: ["MT","ND","MN","WI"], primary: false },
  { name: "I-25", slug: "i-25", label: "I-25: New Mexico to Wyoming", states: ["NM","CO","WY"], primary: false },
  { name: "I-5", slug: "i-5", label: "I-5: Oregon to Washington", states: ["OR","WA"], primary: false },
  { name: "I-55", slug: "i-55", label: "I-55: Louisiana to Illinois", states: ["LA","AR","TN","IL"], primary: false },
  { name: "I-29", slug: "i-29", label: "I-29: Missouri to North Dakota", states: ["MO","IA","SD","ND"], primary: false },
  { name: "I-77", slug: "i-77", label: "I-77: South Carolina to West Virginia", states: ["SC","NC","WV"], primary: false },
];

export function getCorridorsForState(stateAbbrev: string): CorridorData[] {
  return CORRIDORS.filter(c => c.states.includes(stateAbbrev));
}

export function getPrimaryCorridors(): CorridorData[] {
  return CORRIDORS.filter(c => c.primary);
}
