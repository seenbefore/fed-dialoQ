export const isNoData = (val: any) => {
    if (val === 0) return false
    return !val
}

export function formatDate(date = new Date()) {
    const year = date.getFullYear()
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let day = date
        .getDate()
        .toString()
        .padStart(2, '0')

    return `${year}-${month}-${day}`
}

export function formatDateTime(date = new Date()) {
    const hours = date
        .getHours()
        .toString()
        .padStart(2, '0')
    const minutes = date
        .getMinutes()
        .toString()
        .padStart(2, '0')

    return `${formatDate()} ${hours}:${minutes}`
}
