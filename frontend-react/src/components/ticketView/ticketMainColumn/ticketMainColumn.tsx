import "./ticketMainColumn.less";
import TicketStatusBar from "./ticketStatusBar/ticketStatusBar.tsx";
import {TicketDetails} from "../../../model/ticketDetails.ts";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../state/store.ts";
import {updateDescriptionAsync, updateTitleAsync} from "../../../state/ticketsSlice.ts";

interface TicketMainColumnProps {
    ticket: TicketDetails;
    onTicketViewClosed: () => void;
}

function TicketMainColumn(props: Readonly<TicketMainColumnProps>) {
    const dispatch = useDispatch<AppDispatch>();

    const [title, setTitle] = useState(props.ticket.title ?? "")
    const [description, setDescription] = useState(props.ticket.description ?? "")

    const saveNewTitle = () => {
        if (title === "") {
            setTitle(props.ticket.title);
            return;
        }
        dispatch(updateTitleAsync({id: props.ticket.id, title: title}));
    };

    const saveNewDescription = () => {
        dispatch(updateDescriptionAsync({id: props.ticket.id, description: description}));
    }

    return <div className="main-column-container">
        <TicketStatusBar ticket={props.ticket} OnTicketViewClosed={props.onTicketViewClosed}/>

        <div className="main-column">
            <input type="text"
                   id="name-field"
                   value={title}
                   onChange={(input) => setTitle(input.target.value)}
                   className="ticket-name-input"
                   onBlur={saveNewTitle}
            />
            <textarea id="name-field"
                      value={description}
                      className="ticket-description-input"
                      onChange={(input) => setDescription(input.target.value)}
                      placeholder="Geben Sie hier eine Beschreibung ein..."
                      onBlur={saveNewDescription}
            />
        </div>
    </div>;
}

export default TicketMainColumn;