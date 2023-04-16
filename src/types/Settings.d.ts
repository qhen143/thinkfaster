export interface LevelSettings {
    readonly StartingLevel: number,
    readonly StartingXP: number,
    readonly MaxLevel: number,
    readonly XPModifier: number,
    readonly LevelThresholds: number[],
    readonly UnitLimits: number[]
}

export interface Settings extends LevelSettings, BoardSettings {
    readonly UseMouseTracker: bool,
    readonly shopSize: number,
    readonly benchSize: number,
}

export interface BoardSettings {
    readonly rows: number,
    readonly columns: number,
}