import {TicketBoard} from "./ticketBoard/ticketBoard.tsx";
import NavigationBar from "./navigationBar/navigationBar.tsx";

function Home() {
    return <>
        <NavigationBar/>
        <TicketBoard selectTicket={() => {
        }}/>
    </>
}

export default Home;