export default function toTimeString(number) {
    var hour = `${Math.floor(number / 3600)}`.padStart(2, '0');
    var minute = `${Math.floor((number % 3600) / 60)}`.padStart(2, '0');
    return `${hour}:${minute}`
}