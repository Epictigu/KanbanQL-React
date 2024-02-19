import './ticketBoard.less';
import TicketLane from "./ticketLane/ticketLane.tsx";
import {TicketStatus} from "../../enum/ticketStatus.ts";
import {Ticket} from "../../model/ticket.ts";
import {useEffect} from "react";
import {initializeTicketsAsync} from "../../state/ticketsSlice.ts";
import {AppDispatch, RootState} from "../../state/store.ts";
import {useDispatch, useSelector} from "react-redux";

interface TicketBoardProps {
    selectTicket: (ticket: Ticket) => void;
}

export function TicketBoard(props: Readonly<TicketBoardProps>) {
    const tickets: Ticket[] = useSelector((state: RootState) => state.tickets.tickets);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {dispatch(initializeTicketsAsync())},[1]);
    const ticketsByStatus = (status: TicketStatus) => {
        return tickets.filter(ticket => ticket.status === status);
    }

    return <div className="ticket-board">
        <TicketLane
            laneName="Backlog"
            laneColor="gray"
            laneStatus={TicketStatus.BACKLOG}
            tickets={ticketsByStatus(TicketStatus.BACKLOG)}
            selectTicket={(ticket: Ticket) => props.selectTicket(ticket)}
        />
        <TicketLane
            laneName="Geplant"
            laneColor="#C59916"
            laneStatus={TicketStatus.PLANNED}
            tickets={ticketsByStatus(TicketStatus.PLANNED)}
            selectTicket={(ticket: Ticket) => props.selectTicket(ticket)}
        />
        <TicketLane
            laneName="In Arbeit"
            laneColor="#C70039"
            laneStatus={TicketStatus.IN_PROGRESS}
            tickets={ticketsByStatus(TicketStatus.IN_PROGRESS)}
            selectTicket={(ticket: Ticket) => props.selectTicket(ticket)}
        />
        <TicketLane
            laneName="In Review"
            laneColor="#054AD5"
            laneStatus={TicketStatus.TO_REVIEW}
            tickets={ticketsByStatus(TicketStatus.TO_REVIEW)}
            selectTicket={(ticket: Ticket) => props.selectTicket(ticket)}
        />
        <TicketLane
            laneName="Abgeschlossen"
            laneColor="#55AB3C"
            laneStatus={TicketStatus.DONE}
            tickets={ticketsByStatus(TicketStatus.DONE)}
            selectTicket={(ticket: Ticket) => props.selectTicket(ticket)}
        />
    </div>
}