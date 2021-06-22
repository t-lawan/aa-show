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


          console.log('RESPONSE', response)
          

          let projects = response.items.map((item) => {
            let coordinate = new Coordinates(item.fields.coordinate.fields.x, item.fields.coordinate.fields.y, item.fields.coordinate.fields.z);
            let rotation = null;
            if(item.fields.rotation){
                rotation = new Rotation(item.fields.rotation.fields.x, item.fields.rotation.fields.y, item.fields.rotation.fields.z);
            }
            let modelUrl = 'https://d321q9os2iadt9.cloudfront.net/THREE/'
            if(item.fields.modelUrl) {
                modelUrl = modelUrl + item.fields.modelUrl.split('/').pop()
            }

            let glbUrl = 'https://d321q9os2iadt9.cloudfront.net/AR/AAARGLTF_1/'
            if(item.fields.glbUrl) {
                glbUrl = glbUrl + item.fields.glbUrl.split('/').pop()
            }

            let usdzUrl = 'https://d321q9os2iadt9.cloudfront.net/AR/USDZ/'
            if(item.fields.usdzUrl) {
                usdzUrl = usdzUrl + item.fields.usdzUrl.split('/').pop()
            }

            //   console.log('Item', item)
              return new ProjectModel(
                  item.sys.id,
                  item.fields.title,
                  item.fields.sidebarDisplayTitle,
                  item.fields.description,
                  item.fields.unit,
                  coordinate,
                  item.fields.worldCoordinates,
                  rotation,
                  modelUrl,
                  glbUrl,
                  usdzUrl,
                  item.fields.shouldDisplay,
                  item.fields.showInArAtHome
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

          let response = await client.getEntry('6As5HylC56AmAi8XZ7ikyP', {
            content_type: "pageInfo",
            include: 2

          });

          

          console.log('getPageInfo', response);

          let diplomaProjects = response.fields.diplomaProjects.map((item) =>{
            let coordinate = new Coordinates(item.fields.coordinate.fields.x, item.fields.coordinate.fields.y, item.fields.coordinate.fields.z);
            let rotation = null;
            if(item.fields.rotation){
                rotation = new Rotation(item.fields.rotation.fields.x, item.fields.rotation.fields.y, item.fields.rotation.fields.z);
            }

            let modelUrl = 'https://d321q9os2iadt9.cloudfront.net/THREE/'
            if(item.fields.modelUrl) {
                modelUrl = modelUrl + item.fields.modelUrl.split('/').pop()
            }

            let glbUrl = 'https://d321q9os2iadt9.cloudfront.net/AR/AAARGLTF_1/'
            if(item.fields.glbUrl) {
                glbUrl = glbUrl + item.fields.glbUrl.split('/').pop()
            }

            let usdzUrl = 'https://d321q9os2iadt9.cloudfront.net/AR/USDZ/'
            if(item.fields.usdzUrl) {
                usdzUrl = usdzUrl + item.fields.usdzUrl.split('/').pop()
            }
            return new ProjectModel(
                item.sys.id,
                item.fields.title,
                item.fields.sidebarDisplayTitle,
                item.fields.description,
                item.fields.unit,
                coordinate,
                item.fields.worldCoordinates,
                rotation,
                modelUrl,
                glbUrl,
                usdzUrl,
                item.fields.shouldDisplay,
                item.fields.showInArAtHome
            )
          })

          let experimental = response.fields.experimental.map((item) => {
            let coordinate = new Coordinates(item.fields.coordinate.fields.x, item.fields.coordinate.fields.y, item.fields.coordinate.fields.z);
            let rotation = null;
            if(item.fields.rotation){
                rotation = new Rotation(item.fields.rotation.fields.x, item.fields.rotation.fields.y, item.fields.rotation.fields.z);
            }
            let modelUrl = 'https://d321q9os2iadt9.cloudfront.net/THREE/'
            if(item.fields.modelUrl) {
                modelUrl = modelUrl + item.fields.modelUrl.split('/').pop()
            }

            let glbUrl = 'https://d321q9os2iadt9.cloudfront.net/AR/AAARGLTF_1/'
            if(item.fields.glbUrl) {
                glbUrl = glbUrl + item.fields.glbUrl.split('/').pop()
            }

            let usdzUrl = 'https://d321q9os2iadt9.cloudfront.net/AR/USDZ/'
            if(item.fields.usdzUrl) {
                usdzUrl = usdzUrl + item.fields.usdzUrl.split('/').pop()
            }
            return new ProjectModel(
                item.sys.id,
                item.fields.title,
                item.fields.sidebarDisplayTitle,
                item.fields.description,
                item.fields.unit,
                coordinate,
                item.fields.worldCoordinates,
                rotation,
                modelUrl,
                glbUrl,
                usdzUrl,
                item.fields.shouldDisplay,
                item.fields.showInArAtHome
            )
          })

          let defaultProjects = response.fields.defaultProjects.map((item) => {
            let coordinate = new Coordinates(item.fields.coordinate.fields.x, item.fields.coordinate.fields.y, item.fields.coordinate.fields.z);
            let rotation = null;
            if(item.fields.rotation){
                rotation = new Rotation(item.fields.rotation.fields.x, item.fields.rotation.fields.y, item.fields.rotation.fields.z);
            }
            let modelUrl = 'https://d321q9os2iadt9.cloudfront.net/THREE/'
            if(item.fields.modelUrl) {
                modelUrl = modelUrl + item.fields.modelUrl.split('/').pop()
            }

            let glbUrl = 'https://d321q9os2iadt9.cloudfront.net/AR/AAARGLTF_1/'
            if(item.fields.glbUrl) {
                glbUrl = glbUrl + item.fields.glbUrl.split('/').pop()
            }

            let usdzUrl = 'https://d321q9os2iadt9.cloudfront.net/AR/USDZ/'
            if(item.fields.usdzUrl) {
                usdzUrl = usdzUrl + item.fields.usdzUrl.split('/').pop()
            }
            return new ProjectModel(
                item.sys.id,
                item.fields.title,
                item.fields.sidebarDisplayTitle,
                item.fields.description,
                item.fields.unit,
                coordinate,
                item.fields.worldCoordinates,
                rotation,
                modelUrl,
                glbUrl,
                usdzUrl,
                item.fields.shouldDisplay,
                item.fields.showInArAtHome
            )
          })

          let rightColumnProjects = response.fields.rightColumnProjects.map((item) => {
            let coordinate = new Coordinates(item.fields.coordinate.fields.x, item.fields.coordinate.fields.y, item.fields.coordinate.fields.z);
            let rotation = null;
            if(item.fields.rotation){
                rotation = new Rotation(item.fields.rotation.fields.x, item.fields.rotation.fields.y, item.fields.rotation.fields.z);
            }
            let modelUrl = 'https://d321q9os2iadt9.cloudfront.net/THREE/'
            if(item.fields.modelUrl) {
                modelUrl = modelUrl + item.fields.modelUrl.split('/').pop()
            }

            let glbUrl = 'https://d321q9os2iadt9.cloudfront.net/AR/AAARGLTF_1/'
            if(item.fields.glbUrl) {
                glbUrl = glbUrl + item.fields.glbUrl.split('/').pop()
            }

            let usdzUrl = 'https://d321q9os2iadt9.cloudfront.net/AR/USDZ/'
            if(item.fields.usdzUrl) {
                usdzUrl = usdzUrl + item.fields.usdzUrl.split('/').pop()
            }
            return new ProjectModel(
                item.sys.id,
                item.fields.title,
                item.fields.sidebarDisplayTitle,
                item.fields.description,
                item.fields.unit,
                coordinate,
                item.fields.worldCoordinates,
                rotation,
                modelUrl,
                glbUrl,
                usdzUrl,
                item.fields.shouldDisplay,
                item.fields.showInArAtHome
            )
          })

          let pageInfo = new PageInfoModel(defaultProjects, experimental, diplomaProjects, rightColumnProjects)

          return pageInfo;
    }
}