export interface Todo {
  id: number
  content: string
  done: boolean
}

export enum Filter {
  All,
  Active,
  Completed
}
