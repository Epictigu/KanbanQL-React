import Modal from "../../utils/Modal.tsx";
import TagView from "../../tagView/tagView.tsx";
import {Tag} from "../../../model/tag.ts";
import TagService from "../../../services/tagService.ts";

interface TagManagementModalProps {
    showModal: boolean,
    closeModal: () => void,
}

function TagManagementModal(props: TagManagementModalProps) {
    const tags: Tag[] = []

    const deleteTag = (id: string) => {
        props.closeModal();
        TagService.deleteTag(id);
    }

    return <>
        <Modal saveButtonShow={false}
               cancelButtonText="Fertig"
               showModal={props.showModal}
               title="Tags bearbeiten"
               onCancel={props.closeModal}>
            {tags.map((tag) =>
                <div className="tag-line d-flex mb-2" key={tag.id}>
                    <TagView tagId={tag.id}/>
                    <i className="fa-solid fa-trash ml-auto text-center" role="button" onClick={() => deleteTag(tag.id)}/>
                </div>
            )}
        </Modal>
    </>
}

export default TagManagementModal;