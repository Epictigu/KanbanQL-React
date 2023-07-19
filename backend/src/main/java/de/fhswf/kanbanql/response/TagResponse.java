package de.fhswf.kanbanql.response;

import de.fhswf.kanbanql.model.Tag;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TagResponse {

    private String id;
    private String tagName;

    public TagResponse(Tag tag){
        this.id = tag.getId();
        this.tagName = tag.getTagName();
    }
}
