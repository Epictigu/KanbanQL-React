import "./ticketViewHeader.less"

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faX} from "@fortawesome/free-solid-svg-icons";

interface TicketViewHeaderProps {
    onTicketViewClosed: () => void
}

interface TicketViewHeaderState {

}


class TicketViewHeader extends React.Component<TicketViewHeaderProps, TicketViewHeaderState> {
    state: TicketViewHeaderState = {   }
    render() {
        return <div className="ticket-view-bar d-flex">
            <FontAwesomeIcon icon={faX} type="button" className="fa-solid fa-x ticket-view-close-button" onClick={this.props.onTicketViewClosed}/>
        </div>;
    }
}

export default TicketViewHeader;