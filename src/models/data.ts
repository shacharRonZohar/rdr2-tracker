export type WithId = { id: number }

export enum ITEM_TYPES {
  PLANT = 'plant',
  ANIMAL = 'animal',
  LEGENDARY_ANIMAL = 'legendaryAnimal'
}

export enum SPECIAL_ITEM_TYPES {
  NEW_AUSTIN = 'new-austin'
}

export interface DataItem<T extends ITEM_TYPES> extends WithId {
  name: string
  locations: Location[]
  comments?: string[]
  trackerValues: TrackerValues[T]
}

export interface Location extends WithId {
  name: string
  state: string
  comments?: string[]
}

export interface TrackerValues {
  [ITEM_TYPES.PLANT]: {
    isCollected: boolean
  }
  [ITEM_TYPES.ANIMAL]: {
    isTracked: boolean
    isKilled: boolean
    isSkinned: boolean
    isPerfectSkinned: boolean
    isStudied: boolean
  }
  [ITEM_TYPES.LEGENDARY_ANIMAL]: {
    isTracked: boolean
    isKilled: boolean
    isSkinned: boolean
    isStudied: boolean
  }
}

export type OBJECTIVE =
  | keyof TrackerValues[ITEM_TYPES.ANIMAL]
  | keyof TrackerValues[ITEM_TYPES.PLANT]
  | keyof TrackerValues[ITEM_TYPES.LEGENDARY_ANIMAL]
export interface UserData {
  plant: DataItem<ITEM_TYPES.PLANT>[]
  animal: DataItem<ITEM_TYPES.ANIMAL>[]
  legendaryAnimals: DataItem<ITEM_TYPES.LEGENDARY_ANIMAL>[]
}

export const ICONS = {
  [ITEM_TYPES.PLANT]: '🌱',
  [ITEM_TYPES.ANIMAL]: '🐮',
  [ITEM_TYPES.LEGENDARY_ANIMAL]: '🦄',
  [SPECIAL_ITEM_TYPES.NEW_AUSTIN]: '🌵'
} as const

export const ITEM_TYPE_OBJECTIVE_MAP = {
  [ITEM_TYPES.PLANT]: ['isCollected'],
  [ITEM_TYPES.ANIMAL]: ['isTracked', 'isKilled', 'isSkinned', 'isPerfectSkinned', 'isStudied'],
  [ITEM_TYPES.LEGENDARY_ANIMAL]: ['isTracked', 'isKilled', 'isSkinned', 'isStudied']
} as const

export const DEFAULT_TRACKER_VALUES = {
  [ITEM_TYPES.PLANT]: {
    isCollected: false
  },
  [ITEM_TYPES.ANIMAL]: {
    isTracked: false,
    isKilled: false,
    isSkinned: false,
    isPerfectSkinned: false,
    isStudied: false
  },
  [ITEM_TYPES.LEGENDARY_ANIMAL]: {
    isTracked: false,
    isKilled: false,
    isSkinned: false,
    isStudied: false
  }
} as const
