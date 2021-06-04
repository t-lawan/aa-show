import * as contentful from "contentful";
import ProjectModel from "../../Models/ProjectModel";
import Coordinates from "../../Models/Coordinates";

export default class RequestManager {
    static space = "w6wp6l1i10zr";
    static environment = "master";
    static accessToken = "dTfnzz7HGLVoGfTRJSLMn8zb_15PTclYK_uT6koQCPk";
  
    static getProjects = async () => {
        let client = contentful.createClient({
            space: this.space,
            environment: this.environment, // defaults to 'master' if not set
            accessToken: this.accessToken
          });

          let response = await client.getEntries({
            content_type: "project"
          });

          let projects = response.items.map((item) => {
              let coordinate = new Coordinates(item.fields.coordinate.fields.x, item.fields.coordinate.fields.y, item.fields.coordinate.fields.z);
            //   console.log('Item', item)
              return new ProjectModel(
                  item.sys.id,
                  item.fields.title,
                  item.fields.description,
                  item.fields.unit,
                  coordinate,
                  item.fields.modelUrl,
                  item.fields.glbUrl,
                  item.fields.usdzUrl,
                  item.fields.shouldDisplay
              )
          });

          return projects;
    }
}