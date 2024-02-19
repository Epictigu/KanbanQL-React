import Modal from "../../../../../utils/Modal.tsx";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../../../state/store.ts";
import {createNewTagAsync} from "../../../../../../state/tagsSlice.ts";
import {Tag} from "../../../../../../model/tag.ts";

interface AddTagModalProps {
    shouldShowModal: boolean,
    closeModal: () => void
}

function AddTagModal(props: Readonly<AddTagModalProps>) {
    const dispatch = useDispatch<AppDispatch>()

    const [newTagName, setNewTagName] = useState("");
    const [newTagColor, setNewTagColor] = useState("#000000");

    const addTag = (): void => {
        props.closeModal();
        let newTag: Tag = {
            id: "-1",
            tagName: newTagName,
            color: newTagColor
        };
        dispatch(createNewTagAsync(newTag));
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
                   className="form-control w-100 mb-2"
                   type="text"
                   autoComplete={"off"}/>
            <label htmlFor="newTagColor">Farbe des Tags:</label>
            <input id="newTagColor"
                   value={newTagColor}
                   onChange={(event) => setNewTagColor(event.target.value)}
                   className="form-control w-100"
                   type="color"/>
        </div>
    </Modal>
}

export default AddTagModal;