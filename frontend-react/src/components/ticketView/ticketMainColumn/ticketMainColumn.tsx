import "./ticketMainColumn.less";
import TicketStatusBar from "./ticketStatusBar/ticketStatusBar.tsx";
import {TicketDetails} from "../../../model/ticketDetails.ts";
import TicketServices from "../../../services/ticketServices.ts";

interface TicketMainColumnProps {
    ticket: TicketDetails;
    onTicketViewClosed: () => void;
}

function TicketMainColumn(props: TicketMainColumnProps) {
    let title = props.ticket.title;
    let description = props.ticket.description;

    const saveNewTitle = () => {
        if (title === "") {
            title = props.ticket.title;
            return;
        }
        TicketServices.updateTitle(props.ticket.id, title, props.ticket);
    };

    const saveNewDescription = () => {
        if (description === "") {
            description = props.ticket.description;
            return;
        }
        TicketServices.updateDescription(props.ticket.id, description, props.ticket);
    }

    return <div className="main-column-container">
        <TicketStatusBar ticket={props.ticket} OnTicketViewClosed={props.onTicketViewClosed}/>

        <div className="main-column">
            <input type="text"
                   id="name-field"
                   value={title}
                   onChange={(input) => title = input.target.value}
                   className="ticket-name-input"
                   onBlur={saveNewTitle}
            />
            <textarea id="name-field"
                      value={description}
                      className="ticket-description-input"
                      onChange={(input) => description = input.target.value}
                      placeholder="Geben Sie hier eine Beschreibung ein..."
                      onBlur={saveNewDescription}
            />
        </div>
    </div>;
}

export default TicketMainColumn;