export default class PageInfoModel {
    experimental;
    diploma;
    defaultProjects;
    rightColumnProjects;
    constructor(defaultProjects,experimental, diploma, rightColumnProjects) {
        this.defaultProjects = defaultProjects;
        this.experimental = experimental;
        this.diploma = diploma;
        this.rightColumnProjects = rightColumnProjects;
        
    }
}