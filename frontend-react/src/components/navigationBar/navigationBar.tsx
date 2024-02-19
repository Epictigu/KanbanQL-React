import './navigationBar.less';
import {useState} from "react";
import CreateTicketModal from "./createTicketModal/createTicketModal.tsx";
import TagManagementModal from "./tagManagementModal/tagManagementModal.tsx";
import {RootState} from "../../state/store.ts";
import {useSelector} from "react-redux";
import {Tag} from "../../model/tag.ts";

function NavigationBar() {
    const tags: Tag[] = useSelector((state: RootState) => state.tags.tags)
    const [shouldDisplayTicketModal, setShouldDisplayTicketModal] = useState(false);
    const [shouldDisplayTagModal, setShouldDisplayTagModal] = useState(false);

    return (<>
        <div className="navigation-bar">
            <i className="fa-solid fa-clipboard-list app-icon mr-2"></i>
            <span className="app-title">KanbanQL</span>
            <button className="btn btn-primary ticket-add-button" onClick={() => setShouldDisplayTicketModal(true)}>
                Ticket hinzufügen
            </button>
            <button disabled={tags.length === 0} className="btn btn-primary ticket-add-button" onClick={() => setShouldDisplayTagModal(true)}>
                Tags bearbeiten
            </button>
        </div>
        <CreateTicketModal showModal={shouldDisplayTicketModal} closeModal={() => setShouldDisplayTicketModal(false)}/>
        <TagManagementModal tags={tags} showModal={shouldDisplayTagModal} closeModal={() => setShouldDisplayTagModal(false)}/>
    </>);
}

export default NavigationBar;