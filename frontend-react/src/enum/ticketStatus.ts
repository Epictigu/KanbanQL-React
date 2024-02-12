export enum TicketStatus {
    BACKLOG,
    PLANNED,
    IN_PROGRESS,
    TO_REVIEW,
    DONE
}

export function fetchTicketStatusLabel(status: TicketStatus): string {
    switch (status) {
        case TicketStatus.IN_PROGRESS:
            return "In Bearbeitung";
        case TicketStatus.BACKLOG:
            return "Backlog";
        case TicketStatus.PLANNED:
            return "In Planung";
        case TicketStatus.TO_REVIEW:
            return "Im Review";
        case TicketStatus.DONE:
            return "Abgeschlossen";
        default:
            return "Ungültiger Status";
    }
}