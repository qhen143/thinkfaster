export interface BaseUnit {
    Id: number,
    Tier: number,
    Name: string
}

export interface PoolUnit extends BaseUnit {
    Copies: number
}

export interface Unit extends BaseUnit {
    UID: string,
    StarLevel: number
}