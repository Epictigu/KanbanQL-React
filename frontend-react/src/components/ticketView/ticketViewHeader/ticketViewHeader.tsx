import "./ticketViewHeader.less"

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faX} from "@fortawesome/free-solid-svg-icons";

interface TicketViewHeaderProps {
    onTicketViewClosed: () => void
}

function TicketViewHeader(props: TicketViewHeaderProps) {
    return <div className="ticket-view-bar d-flex">
        <FontAwesomeIcon icon={faX} type="button" className="fa-solid fa-x ticket-view-close-button" onClick={props.onTicketViewClosed}/>
    </div>;
}

export default TicketViewHeader;