export const useUnEnumerable = <T, K extends keyof T>(target: T, keys: K | K[]): void => {
    if (keys instanceof Array) {
        keys.forEach((it: K) => useUnEnumerable(target, it))
    } else {
        Reflect.defineProperty(target as any, keys, {
            enumerable: false,
            writable: true,
        })
    }
}
