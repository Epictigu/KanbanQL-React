import './ticketLane.less';
import TicketCard from "./ticketCard/ticketCard.tsx";
import {Ticket} from "../../../model/ticket.ts";
import {TicketStatus} from "../../../enum/ticketStatus.ts";
import React from "react";

interface TicketLaneProps {
    tickets: Ticket[],
    laneName: string,
    laneColor: string,
    laneStatus: TicketStatus
    selectTicket: (ticket: Ticket) => void;
}

function TicketLane(props: TicketLaneProps) {
    const colorStyle = {
        borderTop: "2px solid " + props.laneColor
    }

    const onDrop = (event: React.DragEvent) => {
        if (!event.dataTransfer) {
            return;
        }

        /*const ticketId = event.dataTransfer.getData("ticketID");
        const ticket = this.ticketStore.tickets.find((searchedTicket) => searchedTicket.id == ticketId);
        if (!ticket) {
            return;
        }

        TicketService.updateStatus(ticket.id, this.laneStatus);
        this.ticketStore.moveTicketToTheTop(ticket);*/
    }

    return <div
        className="ticket-lane"
        onDragOver={(event) => event.preventDefault()}
        onDragEnter={(event) => event.preventDefault()}
        onDrop={onDrop}
    >
        <span className="lane-title" style={colorStyle}>{props.laneName}</span>
        {props.tickets.map((ticket: Ticket) => (
            <TicketCard
                key={ticket.id}
                ticket={ticket}
                selectTicket={props.selectTicket}
            />
        ))}
    </div>
}

export default TicketLane;