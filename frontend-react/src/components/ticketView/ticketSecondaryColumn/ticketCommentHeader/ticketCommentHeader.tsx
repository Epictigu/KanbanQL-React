import "./ticketCommentHeader.less";
import {TicketDetails} from "../../../../model/ticketDetails.ts";
import {formatDate} from "../../../../common/DateFormatter.ts";

interface TicketCommentHeaderProps {
    ticket: TicketDetails
}

function TicketCommentHeader(props: TicketCommentHeaderProps) {
    return props.ticket &&
        <div className="comment-header">
            <span className="creation-label">Erstellt am</span>
            <span className="creation-value">{formatDate(props.ticket.creationDate)}</span>
        </div>;
}

export default TicketCommentHeader;