import * as contentful from "contentful";
import ProjectModel from "../../Models/ProjectModel";
import Coordinates from "../../Models/Coordinates";
import Rotation from "../../Models/Rotation";
import PageInfoModel from "../../Models/PageInfoModel";

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
            let rotation = null;
            if(item.fields.rotation){
                rotation = new Rotation(item.fields.rotation.fields.x, item.fields.rotation.fields.y, item.fields.rotation.fields.z);
            }
             
            //   console.log('Item', item)
              return new ProjectModel(
                  item.sys.id,
                  item.fields.title,
                  item.fields.description,
                  item.fields.unit,
                  coordinate,
                  rotation,
                  item.fields.modelUrl,
                  item.fields.glbUrl,
                  item.fields.usdzUrl,
                  item.fields.shouldDisplay
              )
          });

          return projects;
    }

    static getPageInfo = async () => {
        let client = contentful.createClient({
            space: this.space,
            environment: this.environment, // defaults to 'master' if not set
            accessToken: this.accessToken
          });

          let response = await client.getEntry({
            content_type: "pageInfo"

          });

          let diplomaProjects = response.fields.diplomaProjects.map((item) =>{
            let coordinate = new Coordinates(item.fields.coordinate.fields.x, item.fields.coordinate.fields.y, item.fields.coordinate.fields.z);
            let rotation = null;
            if(item.fields.rotation){
                rotation = new Rotation(item.fields.rotation.fields.x, item.fields.rotation.fields.y, item.fields.rotation.fields.z);
            }
            return new ProjectModel(
                item.sys.id,
                item.fields.title,
                item.fields.description,
                item.fields.unit,
                coordinate,
                rotation,
                item.fields.modelUrl,
                item.fields.glbUrl,
                item.fields.usdzUrl,
                item.fields.shouldDisplay
            )
          })

          let experimental = response.fields.experimental.map((item) => {
            let coordinate = new Coordinates(item.fields.coordinate.fields.x, item.fields.coordinate.fields.y, item.fields.coordinate.fields.z);
            let rotation = null;
            if(item.fields.rotation){
                rotation = new Rotation(item.fields.rotation.fields.x, item.fields.rotation.fields.y, item.fields.rotation.fields.z);
            }
            return new ProjectModel(
                item.sys.id,
                item.fields.title,
                item.fields.description,
                item.fields.unit,
                coordinate,
                rotation,
                item.fields.modelUrl,
                item.fields.glbUrl,
                item.fields.usdzUrl,
                item.fields.shouldDisplay
            )
          })

          let pageInfo = new PageInfoModel(experimental, diplomaProjects)

          console.log('RS', pageInfo)






          return pageInfo;
    }
}