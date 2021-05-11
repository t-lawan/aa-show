export default class ProjectModel {
    id;
    title;
    author;
    coordinate;
    glbUrl;
    usdzUrl;
    constructor(id, title, author, coordinate, glbUrl,usdzUrl) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.coordinate = coordinate;
        this.glbUrl = glbUrl;
        this.usdzUrl = usdzUrl
        
    }
}