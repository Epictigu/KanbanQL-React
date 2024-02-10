import {TagId} from "../../../../../model/tagId.ts";
import TagView from "../../../../tagView/tagView.tsx";
import {Tag} from "../../../../../model/tag.ts";
import BackgroundBlocker from "../../../../utils/BackgroundBlocker.tsx";
import {useState} from "react";
import AddTagModal from "./addTagModal/addTagModal.tsx";

interface TagListProps {
    selectTag: (tag: Tag) => void
    ticketTagIds: TagId[]
}

function TagList(props: TagListProps) {
    const [shouldShowTagList, setShouldShowTagList] = useState(false);
    const [shouldShowAddTagModal, setShouldShowAddTagModal] = useState(false);

    //Store missing; Must be replaced when the tags can be fetched
    let selectableTags: Tag[] = [];

    return <>
        <div className="tag-list">
            {props.ticketTagIds.map((tagId: TagId) => (
                <TagView tagId={tagId.id} key={tagId.id}/>
            ))}
            <div className="tag-edit">
                <i className="fa fa-solid fa-tags tag-edit-icon" onClick={() => setShouldShowTagList(true)}/>
                {shouldShowTagList &&
                    <div className="tag-selector-overlay">
                        {selectableTags.map((selectableTag: Tag) => (
                            <div className="tag-selector-line" onClick={() => props.selectTag(selectableTag)} key={selectableTag.id}>
                                <TagView tagId="tag.id"/>
                                isTagSelected(tag) && <i className="fa-solid fa-check ml-auto"/>
                            </div>
                        ))}

                        <hr className="hr mt-2 mb-2"/>
                        <div className="tag-selector-line" onClick={() => setShouldShowAddTagModal(true)}>
                            <i className="fa-solid fa-plus ml-auto mr-auto"/>
                        </div>
                    </div>
                }
            </div>
        </div>

        {shouldShowTagList &&
            <BackgroundBlocker onClick={() => setShouldShowTagList(false)} customZIndex={14}/>
        }
        {shouldShowAddTagModal &&
            <AddTagModal shouldShowModal={shouldShowAddTagModal} closeModal={() => setShouldShowAddTagModal(false)}/>
        }
    </>
}

export default TagList;