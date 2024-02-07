import './NavigationBar.less'
import {Tag} from "../model/tag.ts";
import {useState} from "react";
import TicketServices from "../services/ticketServices.ts";
import TagService from "../services/tagService.ts";
import Modal from "./utils/Modal.tsx";
import TagView from "./TagView.tsx";

function NavigationBar() {
    const tags: Tag[] = []
    const [shouldDisplayTicketModal, setShouldDisplayTicketModal] = useState(false);
    const [shouldDisplayTagModal, setShouldDisplayTagModal] = useState(false);

    const [newTicketName, setNewTicketName] = useState("");

    const createTicket = () => {
        setShouldDisplayTicketModal(false);
        TicketServices.createNewTicketWithName(newTicketName);
    }
    const deleteTag = (id: string) => {
        setShouldDisplayTagModal(false);
        TagService.deleteTag(id);
    }

    return (<>
        <div className="navigation-bar">
            <i className="fa-solid fa-clipboard-list app-icon mr-2"></i>
            <span className="app-title">KanbanQL</span>
            <button className="btn btn-primary ticket-add-button" onClick={() => setShouldDisplayTicketModal(true)}>
                Ticket hinzufügen
            </button>
            <button className="btn btn-primary ticket-add-button" onClick={() => setShouldDisplayTagModal(true)}>
                Tags bearbeiten
            </button>
        </div>
        <Modal saveButtonText="Hinzufügen" onSave={createTicket} showModal={shouldDisplayTicketModal} title="Neues Ticket erstellen">
            <div className="input-group d-flex flex-column">
                <label htmlFor="newTicketName">Name des Tickets:</label>
                <input id="newTicketName"
                       value={newTicketName}
                       onChange={(event) => setNewTicketName(event.target.value)}
                       className="form-control w-100"
                       type="text"
                />
            </div>
        </Modal>
        <Modal saveButtonShow={false}
               cancelButtonText="Fertig"
               showModal={shouldDisplayTagModal}
               title="Tags bearbeiten"
               onCancel={() => setShouldDisplayTagModal(false)}>
            {tags.map((tag) =>
                <div className="tag-line d-flex mb-2" key={tag.id}>
                    <TagView tagId={tag.id}/>
                    <i className="fa-solid fa-trash ml-auto text-center" role="button" onClick={() => deleteTag(tag.id)}/>
                </div>
            )}
        </Modal>
    </>);
}

export default NavigationBar;