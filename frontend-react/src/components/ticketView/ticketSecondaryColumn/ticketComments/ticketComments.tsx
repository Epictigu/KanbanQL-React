import "./ticketComments.less";
import React from 'react';
import CommentView from "./commentView/commentView.tsx";
import {TicketDetails} from "../../../../model/ticketDetails.ts";
import {Comment} from "../../../../model/comment.ts";
import TicketServices from "../../../../services/ticketServices.ts";

interface TicketCommentsProps {
    ticket: TicketDetails,
}

function TicketComments(props: TicketCommentsProps) {
    let newCommentText = "";

    const addComment = () => {
        TicketServices.createComment(props.ticket, newCommentText);
    }

    const addCommentWithEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addComment();
        }
    }

    const createCommentList = () => {
        if (props.ticket.comments.length == 0) {
            return <span className="no-comments-info">Noch keine Kommentare eingetragen!</span>;
        } else {
            return <div className="comments-list">
                {props.ticket.comments.map((comment: Comment) =>
                    <CommentView key={comment.id} comment={comment}/>
                )}
            </div>;
        }
    }

    return props.ticket.comments &&
        <div className="comments-container">
            {createCommentList()}
            <div className="add-comment-container">
                <input type="text"
                       className="add-comment-input"
                       placeholder="Neuer Kommentar ..."
                       onKeyUp={addCommentWithEnter}
                       value={newCommentText}
                       onChange={(input) => newCommentText = input.target.value}
                />
                <button className="fa-solid fa-paper-plane add-comment-icon" onClick={addComment}/>
            </div>
        </div>;
}

export default TicketComments;