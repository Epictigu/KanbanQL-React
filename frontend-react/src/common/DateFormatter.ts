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

    return formatDateForLocale(date.toString()).toLocaleDateString("de-DE", dateTimeFormatOptions);
}

function formatDateForLocale(dateString: string): Date {
    let dateTimeSplit = dateString.split("T");
    let dateParts = dateTimeSplit[0].split("-");
    let timeParts = dateTimeSplit[1].split(".")[0].split(":");

    return new Date(Number.parseInt(dateParts[0]),
        Number.parseInt(dateParts[1]),
        Number.parseInt(dateParts[2]),
        Number.parseInt(timeParts[0]),
        Number.parseInt(timeParts[1]),
        Number.parseInt(timeParts[2]));
}