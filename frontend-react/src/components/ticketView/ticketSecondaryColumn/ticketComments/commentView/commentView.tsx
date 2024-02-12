import "./commentView.less";
import {Comment} from "../../../../../model/comment.ts";
import {formatDate} from "../../../../../common/DateFormatter.ts";

interface CommentViewProps {
    comment : Comment
}

function CommentView(props: CommentViewProps) {
    return <div className="comment-container">
        <span className="comment-date">{formatDate(props.comment.creationDate)}</span>
        <span className="comment-text">{props.comment.commentText}</span>
    </div>;
}

export default CommentView;