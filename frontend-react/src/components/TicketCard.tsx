import './TicketCard.less';
import {Ticket} from "../model/ticket.ts";
import PrioritySelector from "./PrioritySelector.tsx";
import {Priority} from "../enum/priority.ts";
import TicketServices from "../services/ticketServices.ts";
import {Tag} from "../model/tag.ts";
import {TagId} from "../model/tagId.ts";
import TagView from "./TagView.tsx";
import Modal from "./utils/Modal.tsx";
import TagService from "../services/tagService.ts";
import BackgroundBlocker from "./utils/BackgroundBlocker.tsx";

interface TicketCardProps {
    ticket: Ticket;
    selectTicket: (ticket: Ticket) => void;
}

function TicketCard(props: TicketCardProps) {
    let shouldShowTagList: boolean = false;
    let newTagName: string = "";
    let doubleClickTimeout: number | null = null;

    let showModal: boolean = false;

    //Store missing; Must be replaced when the tags can be fetched
    let tags: Tag[] = []

    const selectPriority = (priority: Priority) => {
        TicketServices.updatePriority(props.ticket.id, priority);
    };

    const toggleTagEditor = () => {
        shouldShowTagList = !shouldShowTagList;
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
        if (shouldShowTagList || showModal) {
            event.preventDefault();
            return;
        }

        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("ticketID", ticket.id);
    };

    const openAddTagModal = () => {
        showModal = true;
    };

    const addTag = () => {
        if (newTagName === "") {
            return;
        }
        TagService.createNewTag(newTagName);
        newTagName = "";
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

    return props.ticket && <div className="ticket-card" key={props.ticket.id}
                                draggable="true"
                                onDragStart={(event) => startDrag(event, props.ticket)}>
        <span className="double-click-checker" onClick={selectTicket}/>
        <span className="ticket-name">{props.ticket.title}</span>
        <PrioritySelector currentPriority={props.ticket.priority} selectPriority={selectPriority}/>
        <div className="tag-list">
            {props.ticket.tags.map((tagId: TagId) => (
                <TagView tagId={tagId.id} key={tagId.id}/>
            ))}
            <div className="tag-edit">
                <i className="fa fa-solid fa-tags tag-edit-icon" onClick={toggleTagEditor}/>
                {shouldShowTagList && <div className="tag-selector-overlay">
                    {tags.map((tag: Tag) => (
                        <div className="tag-selector-line" onClick={() => selectTag(tag)} key={tag.id}>
                            <TagView tagId="tag.id"/>
                            isTagSelected(tag) && <i className="fa-solid fa-check ml-auto"/>
                        </div>
                    ))}

                    <hr className="hr mt-2 mb-2"/>
                    <div className="tag-selector-line" onClick={openAddTagModal}>
                        <i className="fa-solid fa-plus ml-auto mr-auto"/>
                    </div>
                </div>}
            </div>
        </div>
        {shouldShowTagList && <BackgroundBlocker onClick={toggleTagEditor} customZIndex={14}/>}
        <Modal saveButtonText="Hinzufügen" onSave={addTag} title="Neuen Tag erstellen" showModal={showModal}>
            <div className="input-group d-flex flex-column">
                <label htmlFor="newTagName">Name des Tags:</label>
                <input id="newTagName" v-model="newTagName" className="form-control w-100" type="text"/>
            </div>
        </Modal>
    </div>
}

export default TicketCard;