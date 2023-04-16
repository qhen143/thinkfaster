declare global {
    interface WindowEventMap {
        keydown: KeyboardEvent<HTMLInputElement>
        keyup: KeyboardEvent<HTMLInputElement>
    }
}
