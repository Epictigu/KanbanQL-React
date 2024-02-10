import "./ticketComments.less"

import React from 'react'
import CommentView from "./commentView/commentView.tsx";
import {TicketDetails} from "../../../../model/ticketDetails.ts";
import {Comment} from "../../../../model/comment.ts";

interface TicketCommentsProps {
    ticket: TicketDetails,
}

interface TicketCommentsState {
    ticket: TicketDetails;
    commentText: string;
}

class TicketComments extends React.Component<TicketCommentsProps, TicketCommentsState> {
    constructor(props : TicketCommentsProps) {
        super(props)
        this.state = {
            ticket : this.props.ticket,
            commentText : ""
        }
    }

    addComment(commentText : string) {
        //TicketService.createComment(this.props.ticket, this.state.commentText)

        if(commentText){
            const comment : Comment = {
                id: commentText + Math.round(Math.random() * 100),
                commentText: commentText,
                creationDate: new Date()
            }

            this.setState({commentText: ""})
            this.pushComment(comment)
        }

    }

    pushComment(comment: Comment){
        let newTicket = this.state.ticket;

        newTicket.comments.push(comment)

        this.setState(() => ({ticket: newTicket}))
    }

    addCommentWithEnter(event: any){
        if(event.key === 'Enter'){
            this.addComment(this.state.commentText);
        }
    }

    render() {

        let comments;

        if(this.props.ticket.comments.length == 0){
            comments = <span className="no-comments-info">Noch keine Kommentare eingetragen!</span>;

        }else{
            comments = <div className="comments-list">
                {this.props.ticket.comments.map((comment) =>
                    <CommentView key={comment.id} comment={comment}/>
                )}
            </div>;
        }

        return this.props.ticket.comments && (<div className="comments-container">
            {comments}
            <div className="add-comment-container">
                <input type="text" className="add-comment-input" placeholder="Neuer Kommentar ..." value={this.state.commentText}
                       onKeyUp={(event) => this.addCommentWithEnter(event)}
                       onChange={(input) => {this.setState({commentText: input.target.value}) }}/>
                <button className="fa-solid fa-paper-plane add-comment-icon" onClick={() => this.addComment(this.state.commentText)} />
            </div>
        </div>);
    }
}

export default TicketComments;