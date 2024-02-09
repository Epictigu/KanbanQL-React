import './NavigationBar.less';
import {useState} from "react";
import CreateTicketModal from "./createTicketModal/createTicketModal.tsx";
import TagManagementModal from "./tagManagementModal/tagManagementModal.tsx";

function NavigationBar() {
    const [shouldDisplayTicketModal, setShouldDisplayTicketModal] = useState(false);
    const [shouldDisplayTagModal, setShouldDisplayTagModal] = useState(false);

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
        <CreateTicketModal showModal={shouldDisplayTicketModal} closeModal={() => setShouldDisplayTicketModal(false)}/>
        <TagManagementModal showModal={shouldDisplayTagModal} closeModal={() => setShouldDisplayTagModal(false)}/>
    </>);
}

export default NavigationBar;