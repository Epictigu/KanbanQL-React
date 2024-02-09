import {TicketBoard} from "./TicketBoard.tsx";
import NavigationBar from "./navigationBar/NavigationBar.tsx";

function Home() {
    return <>
        <NavigationBar/>
        <TicketBoard selectTicket={() => {
        }}/>
    </>
}

export default Home;