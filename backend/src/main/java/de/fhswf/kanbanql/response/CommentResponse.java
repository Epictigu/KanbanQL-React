package de.fhswf.kanbanql.response;

import de.fhswf.kanbanql.model.Comment;

import java.time.LocalDateTime;

public class CommentResponse {

    private String id;
    private String commentText;
    private LocalDateTime creationDate;

    public CommentResponse(Comment comment){
        this.id = comment.getId();
        this.commentText = comment.getCommentText();
        this.creationDate = comment.getCreationDate();
    }
}
