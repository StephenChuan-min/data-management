
export function handleLocal(item: string, value?: any): string | void | null {
    if (value) {
        window.localStorage.setItem(item, value);
        console.log(`存入${item}成功:`, window.localStorage.getItem(item))
    } else {
        return window.localStorage.getItem(item);
    }
}