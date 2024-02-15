import Modal from "../../../../../utils/Modal.tsx";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../../../state/store.ts";
import {createNewTagAsync} from "../../../../../../state/tagsSlice.ts";

interface AddTagModalProps {
    shouldShowModal: boolean,
    closeModal: () => void
}

function AddTagModal(props: Readonly<AddTagModalProps>) {
    const dispatch = useDispatch<AppDispatch>()

    const [newTagName, setNewTagName] = useState("");

    const addTag = (): void => {
        props.closeModal();
        dispatch(createNewTagAsync(newTagName))
    }

    return <Modal saveButtonText="Hinzufügen"
                  footerShow={true}
                  saveButtonShow={true}
                  onSave={addTag}
                  onCancel={props.closeModal}
                  showModal={props.shouldShowModal}
                  title="Neuen Tag erstellen">
        <div className="input-group d-flex flex-column">
            <label htmlFor="newTagName">Name des Tags:</label>
            <input id="newTagName"
                   value={newTagName}
                   onChange={(event) => setNewTagName(event.target.value)}
                   className="form-control w-100"
                   type="text"
                   autoComplete={"off"}/>
        </div>
    </Modal>
}

export default AddTagModal;