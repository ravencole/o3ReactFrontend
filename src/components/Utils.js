export function capitalize(str) {
    return str.replace(/(?:^|\s)\S/g, (a) => { return a.toUpperCase(); });
}