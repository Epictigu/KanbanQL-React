import Modal from "../../../../../utils/Modal.tsx";
import TagService from "../../../../../../services/tagService.ts";

interface AddTagModalProps {
    shouldShowModal: boolean,
    closeModal: () => void
}

function AddTagModal(props: AddTagModalProps) {
    let newTagName = "";

    const addTag = (): void => {
        if (newTagName === "") {
            return;
        }
        TagService.createNewTag(newTagName);
        newTagName = "";
        props.closeModal();
    }

    return <Modal saveButtonText="Hinzufügen"
                  onSave={addTag}
                  onCancel={props.closeModal}
                  title="Neuen Tag erstellen"
                  showModal={props.shouldShowModal}>
        <div className="input-group d-flex flex-column">
            <label htmlFor="newTagName">Name des Tags:</label>
            <input id="newTagName" value={newTagName} className="form-control w-100" type="text"/>
        </div>
    </Modal>
}

export default AddTagModal;