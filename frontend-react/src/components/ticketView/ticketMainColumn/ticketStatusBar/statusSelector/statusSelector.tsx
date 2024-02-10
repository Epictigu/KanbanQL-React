import "./statusSelector.less"
import React from 'react'
import BackgroundBlocker from "../../../../utils/BackgroundBlocker.tsx";
import {TicketStatus} from "../../../../../enum/ticketStatus.ts";

interface StatusSelectorProps {
    status: TicketStatus;
    changeStatus: (status: TicketStatus) => void;
    className?: string;
}

interface StatusSelectorState {
    selectorOpened: boolean
}

class StatusSelector extends React.Component<StatusSelectorProps, StatusSelectorState> {
    constructor(props: StatusSelectorProps) {
        super(props);
        this.state  = {
            selectorOpened: false
        }
    }

    toggleSelector() {
        this.setState(prevState => ({selectorOpened: !prevState.selectorOpened}))
    }
    currentStatus() {
        switch (this.props.status) {
            case TicketStatus.IN_PROGRESS:
                return "In Bearbeitung";
            case TicketStatus.BACKLOG:
                return "Backlog";
            case TicketStatus.PLANNED:
                return "In Planung";
            case TicketStatus.TO_REVIEW:
                return "Im Review";
            case TicketStatus.DONE:
                return "Abgeschlossen";
            default:
                return "Ungültiger Status";
        }
    }
    setNewStatus(status: TicketStatus) {
        this.props.changeStatus(status);
        this.setState({selectorOpened: false});
    }
    render() {

        return <div className={`status-selector-container ${this.props.className}`} >
                <button className="status-selector-main"  style={{zIndex: this.state.selectorOpened ? "60" : ""}} onClick={this.toggleSelector.bind(this)}>
                    <span className="user-select-none">{this.currentStatus()}</span>
                    <i className="fa-solid fa-caret-right ml-1" style={{rotate: this.state.selectorOpened ? "90deg" : ""}}/>
                </button>
                {this.state.selectorOpened && <div className="status-selector-overlay">
                    {this.props.status != TicketStatus.BACKLOG  && <span className="status-selector-item" onClick={() => this.setNewStatus(TicketStatus.BACKLOG)}>Backlog</span>}
                    {this.props.status != TicketStatus.PLANNED  && <span className="status-selector-item" onClick={() => this.setNewStatus(TicketStatus.PLANNED)}>Geplant</span>}
                    {this.props.status != TicketStatus.IN_PROGRESS &&  <span className="status-selector-item" onClick={() => this.setNewStatus(TicketStatus.IN_PROGRESS)}>In Arbeit</span>}
                    {this.props.status != TicketStatus.TO_REVIEW && <span className="status-selector-item" onClick={() => this.setNewStatus(TicketStatus.TO_REVIEW)}>Im Review</span>}
                    {this.props.status != TicketStatus.DONE  && <span className="status-selector-item" onClick={() => this.setNewStatus(TicketStatus.DONE)}>Abgeschlossen</span>}
                </div>}
                { this.state.selectorOpened && <BackgroundBlocker onClick={this.toggleSelector.bind(this)}/>}
            </div>;
    }

}

export default StatusSelector;