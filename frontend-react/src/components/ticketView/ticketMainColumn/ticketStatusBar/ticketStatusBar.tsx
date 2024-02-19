import "./ticketStatusBar.less";
import StatusSelector from "./statusSelector/statusSelector.tsx";
import {TicketDetails} from "../../../../model/ticketDetails.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {Priority} from "../../../../enum/priority.ts";
import {TicketStatus} from "../../../../enum/ticketStatus.ts";
import PrioritySelector from "../../../prioritySelector/prioritySelector.tsx";
import {AppDispatch} from "../../../../state/store.ts";
import {useDispatch} from "react-redux";
import {deleteTicketAsync, updatePriorityAsync, updateStatusAsync} from "../../../../state/ticketsSlice.ts";

interface TicketStatusBarProps {
    ticket: TicketDetails;
    OnTicketViewClosed: () => void;
}

function TicketStatusBar(props: TicketStatusBarProps) {
    const dispatch = useDispatch<AppDispatch>();
    const selectPriority = (priority: Priority) => {
        dispatch(updatePriorityAsync({id: props.ticket.id, priority: priority}))
    }

    const selectStatus = (status: TicketStatus) => {
        dispatch(updateStatusAsync({id: props.ticket.id, status: status}))
    }

    const deleteTicket = () => {
        props.OnTicketViewClosed();
        dispatch(deleteTicketAsync(props.ticket.id))
    }

    return props.ticket && <div className="ticket-status-bar">
        <div className="mr-3">
            <StatusSelector status={props.ticket.status} changeStatus={(status) => selectStatus(status)}/>
        </div>

        <hr style={{rotate: "90deg", width: "1.5em", margin: 0}}/>
        <div className="ml-3">
            <PrioritySelector currentPriority={props.ticket.priority} selectPriority={(priority) => selectPriority(priority)}/>
        </div>
        <div className="delete-button">
            <FontAwesomeIcon icon={faTrash} className="fa-solid fa-trash" onClick={() => deleteTicket()}/>
        </div>

    </div>;
}

export default TicketStatusBar;