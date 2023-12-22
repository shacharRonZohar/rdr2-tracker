export type WithId = { id: number }

export type ItemType = 'plant' | 'animal'

export interface TrackerValues {
  plant: {
    isCollected: boolean
  }
  animal: {
    isTracked: boolean
    isKilled: boolean
    isSkinned: boolean
    isPerfectSkinned: boolean
    isStudied: boolean
  }
}
export interface Location extends WithId {
  name: string
  state: string
  comments?: string[]
}

export interface DataItem<T extends ItemType> extends WithId {
  name: string
  locations: Location[]
  comments?: string[]
  trackerValues: TrackerValues[T]
}

// export type Plant = DataItem<'plant'>

export interface UserData {
  plant: DataItem<'plant'>[]
  animal: DataItem<'animal'>[]
}
