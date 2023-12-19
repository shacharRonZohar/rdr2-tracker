// export interface Plant {
//   id: number
//   name: string
//   isNewAustin: boolean
// }

export type WithId = { id: number }

export type DataType = 'plant'

export interface DataItem<T extends DataType> extends WithId {
  name: string
  type: T
  isNewAustin: boolean
  comments?: string
}

export type Plant = DataItem<'plant'>

export interface UserData {
  plants: Plant[]
}
