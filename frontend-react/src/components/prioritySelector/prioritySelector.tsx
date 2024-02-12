import './prioritySelector.less';
import BackgroundBlocker from "../utils/BackgroundBlocker.tsx";
import {useState} from "react";
import {fetchPriorityData, Priority} from "../../enum/priority.ts";

const selectablePriorities: Priority[] = [
    Priority.CRITICAL,
    Priority.HIGH,
    Priority.MEDIUM,
    Priority.LOW,
];

interface PrioritySelectorProps {
    currentPriority: Priority;
    selectPriority: (priority: Priority) => void;
}

function PrioritySelector(props: PrioritySelectorProps) {
    const [shouldShowSelector, setShouldShowSelector] = useState(false);

    const toggleSelector = (): void => {
        setShouldShowSelector(!shouldShowSelector);
    }

    const prioritySelected = (priority: Priority) => {
        toggleSelector();
        props.selectPriority(priority)
    }

    return (
        <div className="priority-selector">
            <i className="fa-solid fa-flag selector-icon"
               style={fetchPriorityData(props.currentPriority).colorStyle}
               onClick={toggleSelector}
               role="button"/>

            {shouldShowSelector &&
                <div className="priority-selector-overlay">
                    {selectablePriorities.map((priority) => (
                        <div className="priority-selector-line"
                             onClick={() => prioritySelected(priority)}
                             role="button"
                             key={priority}>
                            <i className="fa-solid fa-flag selector-icon" style={fetchPriorityData(priority).colorStyle}/>
                            <span className="ml-1">{fetchPriorityData(priority).title}</span>
                            {priority == props.currentPriority && <i className="fa-solid fa-check ml-auto"/>}
                        </div>
                    ))}
                </div>
            }
            {shouldShowSelector &&
                <BackgroundBlocker onClick={toggleSelector}/>
            }
        </div>
    )
}

export default PrioritySelector;