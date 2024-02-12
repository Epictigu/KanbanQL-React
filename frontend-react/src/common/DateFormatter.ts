const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};

export function formatDate(date: Date) {
    return date.toLocaleDateString("de-DE", dateTimeFormatOptions);
}