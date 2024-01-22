import "./ticketViewHeader.less"

import React from 'react'

interface TicketViewHeaderProps {
    onCloseTicket: () => void
}

interface TicketViewHeaderState {

}


class TicketViewHeader extends React.Component<TicketViewHeaderProps, TicketViewHeaderState> {
    state: TicketViewHeaderState = {   }
    render() {
        return <div className="ticket-view-bar d-flex">
            <input type="button" className="fa-solid fa-x ticket-view-close-button" onClick={this.props.onCloseTicket}/>
        </div>;
    }
}

export default TicketViewHeader;