import "./ticketView.less"
import BackgroundBlocker from "../utils/BackgroundBlocker.tsx";
import TicketViewHeader from "./ticketViewHeader/ticketViewHeader.tsx";
import TicketMainColumn from "./ticketMainColumn/ticketMainColumn.tsx";
import TicketSecondaryColumn from "./ticketSecondaryColumn/ticketSecondaryColumn.tsx";
import {TicketDetails} from "../../model/ticketDetails.ts";

interface TicketViewProps {
    ticket: TicketDetails
    onTicketViewClosed: () => void;
}

function TicketView(props: TicketViewProps) {
    return <div className="ticket-view">
        <BackgroundBlocker backgroundColor="rgba(50, 50, 50, 0.4)" customZIndex={25} onClick={props.onTicketViewClosed}/>

        <div className="ticket-view-main">
            <TicketViewHeader onTicketViewClosed={props.onTicketViewClosed}/>
            <div className="ticket-column-container d-flex flex-row flex-grow-1">
                <TicketMainColumn ticket={props.ticket} onTicketViewClosed={props.onTicketViewClosed}/>
                <TicketSecondaryColumn ticket={props.ticket}/>
            </div>
        </div>
    </div>;
}

export default TicketView;