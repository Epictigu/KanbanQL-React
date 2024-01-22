import "./commentView.less"
import React from 'react'
import {Comment} from "../../model/comment.ts";

interface CommentViewProps {
    comment : Comment
}

interface CommentViewState {

}

class CommentView extends React.Component<CommentViewProps, CommentViewState> {
    state : CommentViewState = {   }
    formattedDate(): string {
        let options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        } as Intl.DateTimeFormatOptions;

        return this.props.comment.creationDate.toLocaleDateString("de-DE", options);
    }
    render() {
        return <div className="comment-container">
            <span className="comment-date">{ this.formattedDate() }</span>
            <span className="comment-text">{ this.props.comment.commentText }</span>
        </div>;
    }

}

export default CommentView;