import NavigationBar from "./NavigationBar.tsx";
import {TicketBoard} from "./TicketBoard.tsx";

function Home() {
    return <>
        <NavigationBar/>
        <TicketBoard selectTicket={() => {
        }}/>
    </>
}

export default Home;