export function toTimeString(number) {
    var hour = `${Math.floor(number / 3600)}`.padStart(2, '0');
    var minute = `${Math.floor((number % 3600) / 60)}`.padStart(2, '0');
    return `${hour}:${minute}`
}

export function toTimeOfDayInt(string) {
    var split = string.split(":");
    return Number(split[0].trim()) * 3600 + Number(split[1].trim()) * 60
}