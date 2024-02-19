import './tagView.less';
import {Tag} from "../../model/tag.ts";
import {RootState} from "../../state/store.ts";
import {useSelector} from "react-redux";

interface TagViewProps {
    tagId: string
}

function TagView(props: TagViewProps) {
    const tags: Tag[] = useSelector((state: RootState) => state.tags.tags);
    const tag: Tag|undefined = tags.find((tag) => tag.id === props.tagId) ;


    return tag !== undefined &&
        <div className="tag-view-container" style={{ background: tag.color }}>
            <span className="tag-view-text">{tag.tagName}</span>
        </div>
}

export default TagView;