import "./PrioritySelector.less"
import BackgroundBlocker from "./utils/BackgroundBlocker.tsx";
import {ReactNode, useState} from "react";
import {Priority} from "../enum/priority.ts";

interface PrioritySelectorProps {
    currentPriority: Priority;
    children?: ReactNode;
    selectPriority: (priority: Priority) => void;
    className: string;
}

function getColorStyleForPriority(priority: Priority) {
    switch (priority) {
        case Priority.LOW:
            return {color: "lightgray"};
        case Priority.MEDIUM:
            return {color: "#41b8df"};
        case Priority.HIGH:
            return {color: "orange"};
        case Priority.CRITICAL:
            return {color: "red"};
        default:
            return {color: "black"};
    }
}

function getTitleForPriority(priority: Priority) {
    switch (priority) {
        case Priority.LOW:
            return "Niedrige Priorität";
        case Priority.MEDIUM:
            return "Mittlere Priorität"
        case Priority.HIGH:
            return "Hohe Priorität";
        case Priority.CRITICAL:
            return "Kritische Priorität";
        default:
            return "undefined";
    }
}

function PrioritySelector(props: PrioritySelectorProps) {
    const [shouldShowSelector, setShouldShowSelector] = useState(false);
    const selectablePriorities = [
        Priority.CRITICAL,
        Priority.HIGH,
        Priority.MEDIUM,
        Priority.LOW,
    ];

    const toggleSelector = () => {
        setShouldShowSelector(!shouldShowSelector);
    }

    const prioritySelected = (priority: Priority) => {
        toggleSelector();
        props.selectPriority(priority)
    }

    return (
        <div className={`priority-selector ${props.className}`}>
            {props.children ?? ""}
            <>
                <i className="fa-solid fa-flag selector-icon"
                   style={getColorStyleForPriority(props.currentPriority)}
                   onClick={toggleSelector}
                   role="button"/>
            </>

            {shouldShowSelector && <div className="priority-selector-overlay">
                {selectablePriorities.map((priority) => (
                    <div className="priority-selector-line"
                         onClick={() => prioritySelected(priority)}
                         role="button"
                         key={priority}>
                        <i className="fa-solid fa-flag selector-icon" style={getColorStyleForPriority(priority)}/>
                        <span className="ml-1">{getTitleForPriority(priority)}</span>
                        {priority == props.currentPriority && <i className="fa-solid fa-check ml-auto"/>}
                    </div>
                ))}
            </div>}
            { shouldShowSelector && <BackgroundBlocker onClick={toggleSelector}/>}
        </div>
    )
}

export default PrioritySelector;