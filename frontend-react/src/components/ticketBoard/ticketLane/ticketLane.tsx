import './ticketLane.less';
import TicketCard from "./ticketCard/ticketCard.tsx";
import {Ticket} from "../../../model/ticket.ts";
import {TicketStatus} from "../../../enum/ticketStatus.ts";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {moveTicketToTheTop, updateStatusAsync} from "../../../state/ticketsSlice.ts";
import {AppDispatch, RootState} from "../../../state/store.ts";

interface TicketLaneProps {
    tickets: Ticket[],
    laneName: string,
    laneColor: string,
    laneStatus: TicketStatus
    selectTicket: (ticket: Ticket) => void;
}

function TicketLane(props: Readonly<TicketLaneProps>) {
    const storeTickets = useSelector((state: RootState) => state.tickets.tickets)
    const dispatch = useDispatch<AppDispatch>();

    const [ticketOverLane, setTicketOverLane] = useState(false);

    const colorStyle = {
        borderTop: "2px solid " + props.laneColor
    }

    const onDrop = (event: React.DragEvent) => {
        if (!event.dataTransfer) {
            return;
        }

        const ticketId = event.dataTransfer.getData("ticketID");
        const ticket = storeTickets.find((searchedTicket) => searchedTicket.id == ticketId)
        if(!ticket) return;

        dispatch(updateStatusAsync({id:ticket.id, status: props.laneStatus}));
        dispatch(moveTicketToTheTop(ticket));
        setTicketOverLane(false);
    }

    return <div
        role={"none"}
        className={`ticket-lane + ${ticketOverLane ? "dashed-border" : ""}`}
        onDragOver={(event) => {
            event.preventDefault();
            setTicketOverLane(true);
        }}
        onDragEnter={(event) => event.preventDefault()}
        onDragLeave={(event) => {
            event.preventDefault();
            setTicketOverLane(false);
        }}
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