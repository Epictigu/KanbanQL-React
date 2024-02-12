import './tagView.less';
import {Tag} from "../../model/tag.ts";

interface TagViewProps {
    tagId: string;
}

function TagView(props: TagViewProps) {
    const tag: Tag = {
        id: props.tagId,
        tagName: "",
        color: ""
    };

    const tagColorStyle = {
        background: tag.color
    }

    return tag.id &&
        <div className="tag-view-container" style={tagColorStyle}>
            <span className="tag-view-text">{tag.tagName}</span>
        </div>
}

export default TagView;