import "./ticketSecondaryColumn.less"
import React from 'react'
import TicketComments from "./ticketComments.tsx";
import TicketCommentHeader from "./ticketCommentHeader.tsx";
import {TicketDetails} from "../../model/ticketDetails.ts";

interface TicketSecondaryColumnProps {
    ticket: TicketDetails;
}

interface TicketSecondaryColumnState {
}

class TicketSecondaryColumn extends React.Component<TicketSecondaryColumnProps, TicketSecondaryColumnState> {

    constructor(props : TicketSecondaryColumnProps) {
        super(props)
        this.state = {

        }
    }

    render() {
        return <div className="secondary-column-container">
            <TicketCommentHeader ticket={this.props.ticket}/>
            <TicketComments ticket={this.props.ticket} />
        </div>;
    }

}

export default TicketSecondaryColumn;