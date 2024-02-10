import "./ticketView.less"
import React from 'react'
import BackgroundBlocker from "../utils/BackgroundBlocker.tsx";
import TicketViewHeader from "./ticketViewHeader/ticketViewHeader.tsx";
import TicketMainColumn from "./ticketMainColumn/ticketMainColumn.tsx";
import TicketSecondaryColumn from "./ticketSecondaryColumn/ticketSecondaryColumn.tsx";
import {TicketDetails} from "../../model/ticketDetails.ts";

interface TicketViewProps {
    ticket: TicketDetails
    onTicketViewClosed: () => void;

}

interface TicketViewState {

}

class TicketView extends React.Component<TicketViewProps, TicketViewState> {

    constructor(props : TicketViewProps) {
        super(props)
        this.state = {

        }
    }

    render() {
        return <div className="ticket-view">
            <BackgroundBlocker backgroundColor="rgba(50, 50, 50, 0.4)" customZIndex={25}  onClick={this.props.onTicketViewClosed}/>
            <div className="ticket-view-main">
                <TicketViewHeader onTicketViewClosed={this.props.onTicketViewClosed} />
                <div className="ticket-column-container d-flex flex-row flex-grow-1">
                    <TicketMainColumn  ticket={this.props.ticket} onTicketViewClosed={this.props.onTicketViewClosed}/>
                    <TicketSecondaryColumn ticket={this.props.ticket} />
                </div>
            </div>
        </div>;
    }

}

export default TicketView;