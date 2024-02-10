import "./ticketMainColumn.less"
import React from 'react'
import TicketStatusBar from "./ticketStatusBar/ticketStatusBar.tsx";
import {TicketDetails} from "../../../model/ticketDetails.ts";

interface TicketMainColumnProps {
    ticket: TicketDetails;
    onTicketViewClosed: () => void;
}

interface TicketMainColumnState {
    ticket: TicketDetails
    title: string;
    description: string
}

class TicketMainColumn extends React.Component<TicketMainColumnProps, TicketMainColumnState> {
    constructor(props : TicketMainColumnProps) {
        super(props)
        this.state = {
            ticket : props.ticket,
            title : props.ticket.title,
            description : props.ticket.description
        }
    }

    saveNewTitle(newTitle : string) {
        if (newTitle === "") {
            this.setState((prevState) => ({title: prevState.title}));
            return;
        }
        let newTicket = this.state.ticket;

        newTicket.title = newTitle;

        this.setState({title: newTitle});
        this.setState(() => ({ticket: newTicket}));


        //TicketService.updateTitle(this.ticket.id, this.newTitle, this.ticket);
    }
    saveNewDescription(newDescription : string) {
        if (newDescription === "") {
            this.setState((prevState) => ({description: prevState.description}));
            return;
        }
        let newTicket = this.state.ticket;

        newTicket.description = newDescription;

        this.setState({description: newDescription});
        this.setState(() => ({ticket: newTicket}));
        //TicketService.updateDescription(this.ticket.id, this.newDescription, this.ticket);
    }

    render() {
        return <div className="main-column-container">
            <TicketStatusBar ticket={this.props.ticket} OnTicketViewClosed={this.props.onTicketViewClosed} />
            <div className="main-column">
                <input type="text" id="name-field" value={this.state.title} onChange={(input) => {this.setState({title: input.target.value}) }}
                       className="ticket-name-input"  onBlur={(event) => this.saveNewTitle(event.target.value)}/>
                <textarea  id="name-field" value={this.state.description} className="ticket-description-input" onChange={(input) => {this.setState({description: input.target.value}) }}
                          placeholder="Geben Sie hier eine Beschreibung ein..." onBlur={(event) => this.saveNewDescription(event.target.value)}/>
            </div>
        </div>;
    }

}

export default TicketMainColumn;