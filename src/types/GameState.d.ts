export interface GameState {
    readonly Container: Unit[],
    readonly SetContainer: Function,
    readonly NextContainer: Unit[],
    readonly SetNextContainer: Function,
    readonly Pool: Map<number, Map<number, PoolUnit>>
}