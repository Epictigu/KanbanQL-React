import "./ticketStatusBar.less";
import StatusSelector from "./statusSelector/statusSelector.tsx";
import {TicketDetails} from "../../../../model/ticketDetails.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {Priority} from "../../../../enum/priority.ts";
import {TicketStatus} from "../../../../enum/ticketStatus.ts";
import PrioritySelector from "../../../prioritySelector/prioritySelector.tsx";
import TicketServices from "../../../../services/ticketServices.ts";

interface TicketStatusBarProps {
    ticket: TicketDetails;
    OnTicketViewClosed: () => void;
}

function TicketStatusBar(props: TicketStatusBarProps) {
    const selectPriority = (priority: Priority) => {
        TicketServices.updatePriority(props.ticket.id, priority, props.ticket);
    }

    const selectStatus = (status: TicketStatus) => {
        TicketServices.updateStatus(props.ticket.id, status, props.ticket);
    }

    const deleteTicket = () => {
        props.OnTicketViewClosed();
        TicketServices.deleteTicket(props.ticket.id);
    }

    return props.ticket && <div className="ticket-status-bar">
        <StatusSelector status={props.ticket.status} className="mr-3" changeStatus={selectStatus}/>

        <hr style={{rotate: "90deg", width: "1.5em", margin: 0}}/>
        <div className="ml-3">
            <PrioritySelector currentPriority={props.ticket.priority} selectPriority={selectPriority}/>
        </div>

        <FontAwesomeIcon icon={faTrash} className="fa-solid fa-trash" onClick={deleteTicket}/>
    </div>;
}

export default TicketStatusBar;