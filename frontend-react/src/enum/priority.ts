export enum Priority {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
}

interface PriorityData {
    title: string,
    colorStyle: { color: string }
}

export function fetchPriorityData(priority: Priority): PriorityData {
    switch (priority) {
        case Priority.LOW:
            return {
                title: "Niedrige Priorität",
                colorStyle: {
                    color: "lightgray"
                }
            }
        case Priority.MEDIUM:
            return {
                title: "Mittlere Priorität",
                colorStyle: {
                    color: "#41b8df"
                }
            }
        case Priority.HIGH:
            return {
                title: "Hohe Priorität",
                colorStyle: {
                    color: "orange"
                }
            }
        case Priority.CRITICAL:
            return {
                title: "Kritische Priorität",
                colorStyle: {
                    color: "red"
                }
            }
        default:
            return {
                title: "undefined",
                colorStyle: {
                    color: "black"
                }
            }
    }
}