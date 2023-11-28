export interface IPerson {
    [key: string]: string,
    id: string,
    name: string,
    favorite_food: string,
    favorite_movie: string
    status: PersonStatus,
    updated_at: string
}

export enum PersonStatus {
    Inactive = "Inactive",
    Active = "Active"
}