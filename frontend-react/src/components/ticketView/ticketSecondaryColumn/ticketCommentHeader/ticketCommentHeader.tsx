import "./ticketCommentHeader.less"
import React from 'react'
import {TicketDetails} from "../../../../model/ticketDetails.ts";

interface TicketCommentHeaderProps {
    ticket : TicketDetails
}

interface TicketCommentHeaderState {

}

class TicketCommentHeader extends React.Component<TicketCommentHeaderProps, TicketCommentHeaderState> {
    state : TicketCommentHeaderState = {   }

    formattedDate(): string {
        let options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        } as Intl.DateTimeFormatOptions;

        return this.props.ticket.creationDate.toLocaleDateString("de-DE", options);
    }
    render() {
        return  this.props.ticket && ( <div className="comment-header">
            <span className="creation-label">Erstellt am</span>
            <span className="creation-value">{ this.formattedDate() }</span>
        </div>);
    }
}

export default TicketCommentHeader;