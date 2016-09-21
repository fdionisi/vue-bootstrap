export function inEnum(...args) {
    const validator = (val) => args.includes(val)
    validator.__doc_accept = args.join(', ')
    return validator
}
