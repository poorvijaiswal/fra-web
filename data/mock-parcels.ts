export interface Parcel {
  id: string
  pattaHolderId: string
  name: string
  type: "IFR" | "CR" | "CFR"
  status: "APPROVED" | "PENDING" | "REJECTED" | "FILED"
  coordinates: [number, number]
  polygon?: [number, number][]
  area: number
  village: string
  district: string
  state: string
  tribalGroup?: string
  waterIndex?: number
  landUse?: string
  assets?: Asset[]
}

export interface Asset {
  id: string
  type: "POND" | "FARM" | "FOREST" | "HOMESTEAD" | "WELL" | "STREAM"
  coordinates: [number, number]
  confidence: number
  area?: number
}

export const mockParcels: Parcel[] = [
  {
    id: "PAR_MP_001",
    pattaHolderId: "PH_MP_0001",
    name: "Ramesh Kumar",
    type: "IFR",
    status: "APPROVED",
    coordinates: [79.9629, 22.2587],
    polygon: [
      [79.962, 22.258],
      [79.964, 22.258],
      [79.964, 22.2595],
      [79.962, 22.2595],
      [79.962, 22.258],
    ],
    area: 1.6,
    village: "Khapa",
    district: "Seoni",
    state: "Madhya Pradesh",
    tribalGroup: "Gond",
    waterIndex: 0.28,
    landUse: "AGRICULTURE",
    assets: [
      {
        id: "AS_001",
        type: "POND",
        coordinates: [79.9625, 22.2585],
        confidence: 0.92,
        area: 0.1,
      },
      {
        id: "AS_002",
        type: "HOMESTEAD",
        coordinates: [79.9635, 22.259],
        confidence: 0.87,
      },
    ],
  },
  {
    id: "PAR_MP_002",
    pattaHolderId: "PH_MP_0002",
    name: "Sunita Devi",
    type: "CR",
    status: "PENDING",
    coordinates: [79.9829, 22.2787],
    polygon: [
      [79.982, 22.278],
      [79.985, 22.278],
      [79.985, 22.28],
      [79.982, 22.28],
      [79.982, 22.278],
    ],
    area: 2.3,
    village: "Barghat",
    district: "Seoni",
    state: "Madhya Pradesh",
    tribalGroup: "Baiga",
    waterIndex: 0.45,
    landUse: "MIXED",
    assets: [
      {
        id: "AS_003",
        type: "FARM",
        coordinates: [79.9835, 22.279],
        confidence: 0.95,
        area: 1.8,
      },
    ],
  },
  {
    id: "PAR_MP_003",
    pattaHolderId: "PH_MP_0003",
    name: "Gond Community",
    type: "CFR",
    status: "APPROVED",
    coordinates: [79.9429, 22.2387],
    polygon: [
      [79.94, 22.235],
      [79.948, 22.235],
      [79.948, 22.242],
      [79.94, 22.242],
      [79.94, 22.235],
    ],
    area: 45.2,
    village: "Lakhnadon",
    district: "Seoni",
    state: "Madhya Pradesh",
    tribalGroup: "Gond",
    waterIndex: 0.62,
    landUse: "FOREST",
    assets: [
      {
        id: "AS_004",
        type: "STREAM",
        coordinates: [79.944, 22.2385],
        confidence: 0.98,
      },
      {
        id: "AS_005",
        type: "FOREST",
        coordinates: [79.945, 22.239],
        confidence: 0.89,
        area: 40.0,
      },
    ],
  },
]

export const mockStates = [
  { code: "MP", name: "Madhya Pradesh", center: [79.9629, 22.2587] },
  { code: "TR", name: "Tripura", center: [91.9882, 23.9408] },
  { code: "OD", name: "Odisha", center: [85.0985, 20.9517] },
  { code: "TG", name: "Telangana", center: [79.0193, 17.1232] },
]
