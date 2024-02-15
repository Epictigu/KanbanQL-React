import './ticketCard.less';
import {Ticket} from "../../../../model/ticket.ts";
import PrioritySelector from "../../../prioritySelector/prioritySelector.tsx";
import {Priority} from "../../../../enum/priority.ts";
import {Tag} from "../../../../model/tag.ts";
import {TagId} from "../../../../model/tagId.ts";
import TagList from "./tagList/tagList.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../state/store.ts";
import {updatePriorityAsync, updateTagsAsync} from "../../../../state/ticketsSlice.ts";

interface TicketCardProps {
    ticket: Ticket;
    selectTicket: (ticket: Ticket) => void;
}

function TicketCard(props: TicketCardProps) {
    let doubleClickTimeout: number | null = null;
    const dispatch = useDispatch<AppDispatch>();

    const selectPriority = (priority: Priority) => {
        dispatch(updatePriorityAsync({id: props.ticket.id, priority: priority}))
    };

    const selectTag = (tag: Tag) => {

        const ticketWithNewTags = JSON.parse(JSON.stringify(props.ticket)) as Ticket;
        let index = ticketWithNewTags.tags.findIndex((tagId) => tag.id == tagId.id);
        if (index >= 0) {
            ticketWithNewTags.tags.splice(index, 1);
        } else {
            const tagId: TagId = {id: tag.id}
            ticketWithNewTags.tags.push(tagId);
        }

        dispatch(updateTagsAsync(ticketWithNewTags));
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
             role={"button"}
             onDragStart={(event) => startDrag(event, props.ticket)}>
            <span className="double-click-checker" role={"button"} onClick={selectTicket}/>

            <span className="ticket-name">{props.ticket.title}</span>
            <PrioritySelector currentPriority={props.ticket.priority} selectPriority={selectPriority}/>
            <TagList selectTag={selectTag} ticketTagIds={props.ticket.tags}/>
        </div>
}

export default TicketCard;