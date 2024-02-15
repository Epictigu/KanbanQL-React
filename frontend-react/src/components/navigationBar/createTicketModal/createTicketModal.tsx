import {useState} from "react";
import Modal from "../../utils/Modal.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../state/store.ts";
import {addTicketAsync} from "../../../state/ticketsSlice.ts";

interface CreateTicketModalProps {
    showModal: boolean,
    closeModal: () => void,
}

function CreateTicketModal(props: Readonly<CreateTicketModalProps>) {
    const dispatch = useDispatch<AppDispatch>()

    const [newTicketName, setNewTicketName] = useState("");

    const createTicket = () => {
        props.closeModal();
        dispatch(addTicketAsync(newTicketName))
    }

    return <>
        <Modal saveButtonText="Hinzufügen"
               footerShow={true}
               saveButtonShow={true}
               onSave={createTicket}
               onCancel={props.closeModal}
               showModal={props.showModal}
               title="Neues Ticket erstellen">
            <div className="input-group d-flex flex-column">
                <label htmlFor="newTicketName">Name des Tickets:</label>
                <input id="newTicketName"
                       value={newTicketName}
                       onChange={(event) => setNewTicketName(event.target.value)}
                       className="form-control w-100"
                       type="text"
                       autoComplete={"off"}/>
            </div>
        </Modal>
    </>
}

export default CreateTicketModal;