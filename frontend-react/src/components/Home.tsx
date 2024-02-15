import {TicketBoard} from "./ticketBoard/ticketBoard.tsx";
import NavigationBar from "./navigationBar/navigationBar.tsx";
import {initializeTagsAsync} from "../state/tagsSlice.ts";
import {useEffect, useState} from "react";
import {TicketDetails} from "../model/ticketDetails.ts";
import {AppDispatch, RootState} from "../state/store.ts";
import {useDispatch, useSelector} from "react-redux";
import TicketView from "./ticketView/ticketView.tsx";
import {deselectTicket, selectTicketAsync} from "../state/ticketsSlice.ts";
import {Ticket} from "../model/ticket.ts";

function Home() {
    const selectedTicket: TicketDetails|null = useSelector((state: RootState) => state.tickets.selectedTicket);
    const dispatch = useDispatch<AppDispatch>();

    const [showTicketDetails, setShowTicketDetails] = useState(false);

    useEffect(() => {dispatch(initializeTagsAsync())},[1]);
    const closeTicketDetails = () =>{
        dispatch(deselectTicket());
        setShowTicketDetails(false);
    }

    const selectTicket = (ticket: Ticket) => {
        dispatch(selectTicketAsync(ticket.id));
        setShowTicketDetails(true);
    }

    return <>
        <NavigationBar/>
        <TicketBoard selectTicket={selectTicket}/>
        {showTicketDetails && (selectedTicket !== null) && <TicketView ticket={selectedTicket} onTicketViewClosed={closeTicketDetails}></TicketView>}
    </>
}

export default Home;