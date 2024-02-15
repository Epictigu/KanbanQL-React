import Modal from "../../utils/Modal.tsx";
import TagView from "../../tagView/tagView.tsx";
import {Tag} from "../../../model/tag.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../state/store.ts";
import {deleteTagAsync} from "../../../state/tagsSlice.ts";

interface TagManagementModalProps {
    tags: Tag[],
    showModal: boolean,
    closeModal: () => void,
}

function TagManagementModal(props: Readonly<TagManagementModalProps>) {
    const dispatch = useDispatch<AppDispatch>();

    const deleteTag = (id: string) => {
        dispatch(deleteTagAsync(id));
    }

    return <>
        <Modal saveButtonShow={false}
               cancelButtonText="Fertig"
               showModal={props.showModal}
               title="Tags bearbeiten"
               onCancel={props.closeModal}>
            {props.tags.length != 0 && props.tags.map((tag) =>
                <div className="tag-line d-flex mb-2" key={tag.id}>
                    <TagView tagId={tag.id}/>
                    <i className="fa-solid fa-trash ml-auto text-center" role="button" onClick={() => deleteTag(tag.id)}/>
                </div>
            )}
        </Modal>
    </>
}

export default TagManagementModal;