import './tagList.less';
import {TagId} from "../../../../../model/tagId.ts";
import TagView from "../../../../tagView/tagView.tsx";
import {Tag} from "../../../../../model/tag.ts";
import BackgroundBlocker from "../../../../utils/BackgroundBlocker.tsx";
import {useState} from "react";
import AddTagModal from "./addTagModal/addTagModal.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../state/store.ts";

interface TagListProps {
    selectTag: (tag: Tag) => void
    ticketTagIds: TagId[]
}

const isTagSelected = (ticketTags: TagId[], tag: Tag) => {
    let index = ticketTags.findIndex((tagId) => tagId.id == tag.id);
    return index >= 0;
}
function TagList(props: Readonly<TagListProps>) {
    const [shouldShowTagList, setShouldShowTagList] = useState(false);
    const [shouldShowAddTagModal, setShouldShowAddTagModal] = useState(false);

    //Store missing; Must be replaced when the tags can be fetched
    const selectableTags: Tag[] = useSelector((state: RootState) => state.tags.tags);

    return <>
        <div className="tag-list">
            {props.ticketTagIds.map((tagId: TagId) => (
                <TagView tagId={tagId.id} key={tagId.id}/>
            ))}
            <div className="tag-edit">
                <i className="fa fa-solid fa-tags tag-edit-icon" role={"button"} onClick={() => setShouldShowTagList(true)}/>
                {shouldShowTagList &&
                    <div className="tag-selector-overlay">
                        {selectableTags.map((selectableTag: Tag) => (
                            <div className="tag-selector-line" role={"button"} onClick={() => props.selectTag(selectableTag)} key={selectableTag.id}>
                                <TagView tagId={selectableTag.id}/>
                                {isTagSelected(props.ticketTagIds, selectableTag) && <i className="fa-solid fa-check ml-auto"/>}
                            </div>
                        ))}

                        {selectableTags.length !== 0 && <hr className="hr mt-2 mb-2"/>}
                        <div className="tag-selector-line" role={"button"} onClick={() => setShouldShowAddTagModal(true)}>
                            <i className="fa-solid fa-plus ml-auto mr-auto"/>
                        </div>
                    </div>
                }
            </div>
        </div>

        {shouldShowTagList &&
            <BackgroundBlocker onClick={() => setShouldShowTagList(false)} customZIndex={20}/>
        }
        {shouldShowAddTagModal &&
            <AddTagModal shouldShowModal={shouldShowAddTagModal} closeModal={() => setShouldShowAddTagModal(false)}/>
        }
    </>
}

export default TagList;