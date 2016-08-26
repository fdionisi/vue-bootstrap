export function inEnum(...args) {
    return (val) => args.includes(val)
}
