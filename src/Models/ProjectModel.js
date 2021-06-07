export default class ProjectModel {
    id;
    title;
    description;
    coordinate;
    modelUrl;
    glbUrl;
    usdzUrl;
    shouldDisplay;
    unit;
    rotation;
    constructor(id, title, description, unit, coordinate, rotation, modelUrl, glbUrl,usdzUrl, shouldDisplay) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.unit = unit;
        this.coordinate = coordinate;
        this.rotation = rotation;
        this.modelUrl = modelUrl;
        this.glbUrl = glbUrl;
        this.usdzUrl = usdzUrl;
        this.shouldDisplay = shouldDisplay
        
    }
}