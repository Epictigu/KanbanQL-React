import "./ticketStatusBar.less"
import React from 'react'
import StatusSelector from "./statusSelector.tsx";
import {TicketDetails} from "../../model/ticketDetails.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {Priority} from "../../enum/priority.ts";
import {TicketStatus} from "../../enum/ticketStatus.ts";
import PrioritySelector from "../PrioritySelector.tsx";

interface TicketStatusBarProps {
    ticket : TicketDetails;
    OnTicketViewClosed : () => void;
}

interface TicketStatusBarState {
    ticket : TicketDetails
}

class TicketStatusBar extends React.Component<TicketStatusBarProps, TicketStatusBarState> {
    constructor(props : TicketStatusBarProps) {
        super(props)
        this.state = {
            ticket : this.props.ticket
        }
    }

    selectPriority(priority: Priority) {
        this.setState((prevState) => {
            prevState.ticket.priority = priority;
            return ({ticket: prevState.ticket});
        })
        //TicketService.updatePriority(this.props.ticket.id, priority, this.props.ticket);
    }
    selectStatus(status: TicketStatus) {
        this.setState((prevState) => {
            prevState.ticket.status = status;
            return ({ticket: prevState.ticket});
        })
        //TicketService.updateStatus(this.props.ticket.id, status, this.props.ticket);
    }
    deleteTicket() {
        this.props.OnTicketViewClosed()
        //TicketService.deleteTicket(this.props.ticket.id);
    }
    render() {
        return this.state.ticket && <div className="ticket-status-bar">
            <StatusSelector status={this.state.ticket.status} className="mr-3" changeStatus={(status) => this.selectStatus(status)}/>
            <hr style={{rotate: "90deg", width: "1.5em", margin: 0}}/>
            <div className="ml-3">
                <PrioritySelector currentPriority={this.state.ticket.priority} selectPriority={(priority) => this.selectPriority(priority)}/>
            </div>
            <FontAwesomeIcon icon={faTrash} className="fa-solid fa-trash" onClick={() => {
                this.deleteTicket();
            }}/>

        </div>;
    }

}

export default TicketStatusBar;