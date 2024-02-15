import "./statusSelector.less"
import {useState} from 'react'
import BackgroundBlocker from "../../../../utils/BackgroundBlocker.tsx";
import {fetchTicketStatusLabel, TicketStatus} from "../../../../../enum/ticketStatus.ts";

const selectableStatus: TicketStatus[] = [
    TicketStatus.BACKLOG,
    TicketStatus.PLANNED,
    TicketStatus.IN_PROGRESS,
    TicketStatus.TO_REVIEW,
    TicketStatus.DONE
];

interface StatusSelectorProps {
    status: TicketStatus;
    changeStatus: (status: TicketStatus) => void;
}

function StatusSelector(props: StatusSelectorProps) {
    const [selectorOpened, setSelectorOpened] = useState(false);

    const setNewStatus = (status: TicketStatus): void => {
        props.changeStatus(status);
        setSelectorOpened(false);
    }

    return <div className="status-selector-container">
        <button className="status-selector-main" style={{zIndex: selectorOpened ? "60" : ""}} onClick={() => setSelectorOpened(!selectorOpened)}>
            <span className="user-select-none">{fetchTicketStatusLabel(props.status)}</span>
            <i className="fa-solid fa-caret-right ml-1" style={{rotate: selectorOpened ? "90deg" : ""}}/>
        </button>

        {selectorOpened && <>
            <div className="status-selector-overlay">
                {selectableStatus.map((status: TicketStatus) => props.status != status &&
                    <span className="status-selector-item" key={status} role={"button"} onClick={() => setNewStatus(status)}>{fetchTicketStatusLabel(status)}</span>
                )}
            </div>
            <BackgroundBlocker onClick={() => setSelectorOpened(false)}/>
        </>}
    </div>;
}

export default StatusSelector;