export interface Scheme {
  id: string
  code: string
  name: string
  description: string
  status: "ACTIVE" | "DRAFT" | "INACTIVE"
  ruleJson: any
  eligibleCount?: number
  ruleComplexity?: string
}

export const mockSchemes: Scheme[] = [
  {
    id: "SCH_001",
    code: "PM_KISAN",
    name: "PM-KISAN",
    description: "Pradhan Mantri Kisan Samman Nidhi - Direct income support to small and marginal farmers",
    status: "ACTIVE",
    eligibleCount: 1250,
    ruleComplexity: "Medium",
    ruleJson: {
      schemeCode: "PM_KISAN",
      if: [
        { fact: "claimStatus", op: "=", value: "APPROVED" },
        { fact: "area", op: "<=", value: 2.0 },
        { fact: "claimType", op: "in", value: ["IFR", "CR"] },
        { fact: "landUse", op: "in", value: ["AGRICULTURE", "MIXED"] },
      ],
      boosts: [
        { when: { fact: "area", op: "<", value: 1.0 }, score: 0.1 },
        { when: { fact: "tribalGroup", op: "in", value: ["Gond", "Baiga"] }, score: 0.05 },
      ],
      then: { eligible: true, priority: "MEDIUM" },
    },
  },
  {
    id: "SCH_002",
    code: "JAL_JEEVAN",
    name: "Jal Jeevan Mission",
    description: "Providing functional household tap connections to every rural household",
    status: "ACTIVE",
    eligibleCount: 890,
    ruleComplexity: "Simple",
    ruleJson: {
      schemeCode: "JAL_JEEVAN",
      if: [
        { fact: "waterIndex", op: "<", value: 0.4 },
        { fact: "village", op: "!=", value: "" },
        { fact: "claimStatus", op: "in", value: ["APPROVED", "PENDING"] },
      ],
      boosts: [
        { when: { fact: "waterIndex", op: "<", value: 0.3 }, score: 0.2 },
        { when: { fact: "area", op: ">", value: 2.0 }, score: 0.1 },
      ],
      then: { eligible: true, priority: "HIGH" },
    },
  },
  {
    id: "SCH_003",
    code: "MGNREGA",
    name: "MGNREGA",
    description: "Mahatma Gandhi National Rural Employment Guarantee Act - Guaranteed employment in rural areas",
    status: "ACTIVE",
    eligibleCount: 2100,
    ruleComplexity: "Simple",
    ruleJson: {
      schemeCode: "MGNREGA",
      if: [
        { fact: "village", op: "!=", value: "" },
        { fact: "state", op: "in", value: ["MP", "OD", "TR", "TG"] },
      ],
      boosts: [
        { when: { fact: "claimStatus", op: "=", value: "PENDING" }, score: 0.15 },
        { when: { fact: "landUse", op: "=", value: "MIXED" }, score: 0.1 },
      ],
      then: { eligible: true, priority: "MEDIUM" },
    },
  },
  {
    id: "SCH_004",
    code: "DAJGUA",
    name: "DAJGUA",
    description: "Development Action Plan for Scheduled Tribes - Comprehensive tribal development program",
    status: "ACTIVE",
    eligibleCount: 750,
    ruleComplexity: "Complex",
    ruleJson: {
      schemeCode: "DAJGUA",
      if: [
        { fact: "tribalGroup", op: "!=", value: "" },
        { fact: "claimType", op: "in", value: ["IFR", "CR", "CFR"] },
        { fact: "state", op: "in", value: ["MP", "OD", "TR"] },
      ],
      boosts: [
        { when: { fact: "claimType", op: "=", value: "CFR" }, score: 0.2 },
        { when: { fact: "area", op: ">", value: 5.0 }, score: 0.15 },
        { when: { fact: "waterIndex", op: "<", value: 0.3 }, score: 0.1 },
      ],
      then: { eligible: true, priority: "HIGH" },
    },
  },
  {
    id: "SCH_005",
    code: "FOREST_CONSERVATION",
    name: "Forest Conservation Scheme",
    description: "Support for community forest conservation and sustainable management practices",
    status: "DRAFT",
    eligibleCount: 320,
    ruleComplexity: "Medium",
    ruleJson: {
      schemeCode: "FOREST_CONSERVATION",
      if: [
        { fact: "claimType", op: "=", value: "CFR" },
        { fact: "landUse", op: "=", value: "FOREST" },
        { fact: "area", op: ">", value: 10.0 },
      ],
      boosts: [
        { when: { fact: "waterIndex", op: ">", value: 0.6 }, score: 0.2 },
        { when: { fact: "claimStatus", op: "=", value: "APPROVED" }, score: 0.15 },
      ],
      then: { eligible: true, priority: "HIGH" },
    },
  },
  {
    id: "SCH_006",
    code: "COMMUNITY_DEVELOPMENT",
    name: "Community Development Program",
    description: "Infrastructure and livelihood development for tribal communities",
    status: "ACTIVE",
    eligibleCount: 450,
    ruleComplexity: "Medium",
    ruleJson: {
      schemeCode: "COMMUNITY_DEVELOPMENT",
      if: [
        { fact: "claimType", op: "in", value: ["CR", "CFR"] },
        { fact: "tribalGroup", op: "!=", value: "" },
        { fact: "claimStatus", op: "=", value: "APPROVED" },
      ],
      boosts: [
        { when: { fact: "area", op: ">", value: 20.0 }, score: 0.25 },
        { when: { fact: "waterIndex", op: "<", value: 0.4 }, score: 0.1 },
      ],
      then: { eligible: true, priority: "MEDIUM" },
    },
  },
]
