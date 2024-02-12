import "./ticketSecondaryColumn.less";
import TicketComments from "./ticketComments/ticketComments.tsx";
import TicketCommentHeader from "./ticketCommentHeader/ticketCommentHeader.tsx";
import {TicketDetails} from "../../../model/ticketDetails.ts";

interface TicketSecondaryColumnProps {
    ticket: TicketDetails;
}

function TicketSecondaryColumn(props: TicketSecondaryColumnProps) {
    return <div className="secondary-column-container">
        <TicketCommentHeader ticket={props.ticket}/>
        <TicketComments ticket={props.ticket}/>
    </div>;
}

export default TicketSecondaryColumn;