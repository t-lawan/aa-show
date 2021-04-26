export default class ProjectModel {
    id;
    title;
    author;
    coordinate;
    constructor(id, title, author, coordinate) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.coordinate = coordinate;
    }
}