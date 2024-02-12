import './ticketCard.less';
import {Ticket} from "../../../../model/ticket.ts";
import PrioritySelector from "../../../prioritySelector/prioritySelector.tsx";
import {Priority} from "../../../../enum/priority.ts";
import TicketServices from "../../../../services/ticketServices.ts";
import {Tag} from "../../../../model/tag.ts";
import {TagId} from "../../../../model/tagId.ts";
import TagList from "./tagList/tagList.tsx";

interface TicketCardProps {
    ticket: Ticket;
    selectTicket: (ticket: Ticket) => void;
}

function TicketCard(props: TicketCardProps) {
    let doubleClickTimeout: number | null = null;

    const selectPriority = (priority: Priority) => {
        console.log(priority);
        //TicketServices.updatePriority(props.ticket.id, priority);
    };

    const selectTag = (tag: Tag) => {
        let index = props.ticket.tags.findIndex((tagId) => tag.id == tagId.id);
        if (index >= 0) {
            props.ticket.tags.splice(index, 1);
        } else {
            props.ticket.tags.push({id: tag.id} as TagId);
        }
        TicketServices.updateTags(props.ticket);
    };

    const startDrag = (event: any, ticket: any) => {
        if (!event.dataTransfer) {
            return;
        }

        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("ticketID", ticket.id);
    };

    const selectTicket = () => {
        if (!doubleClickTimeout) {
            doubleClickTimeout = setTimeout(() => {
                doubleClickTimeout = null;
            }, 300);
        } else {
            clearTimeout(doubleClickTimeout);
            doubleClickTimeout = null;

            props.selectTicket(props.ticket);
        }
    }

    return props.ticket &&
        <div className="ticket-card" key={props.ticket.id}
             draggable="true"
             onDragStart={(event) => startDrag(event, props.ticket)}>
            <span className="double-click-checker" onClick={selectTicket}/>

            <span className="ticket-name">{props.ticket.title}</span>
            <PrioritySelector currentPriority={props.ticket.priority} selectPriority={selectPriority}/>
            <TagList selectTag={selectTag} ticketTagIds={props.ticket.tags}/>
        </div>
}

export default TicketCard;