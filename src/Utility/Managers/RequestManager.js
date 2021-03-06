import * as contentful from "contentful";
import ProjectModel from "../../Models/ProjectModel";
import Coordinates from "../../Models/Coordinates";
import Rotation from "../../Models/Rotation";
import PageInfoModel from "../../Models/PageInfoModel";

let baseUrl = 'https://ar2021.azureedge.net/ar2021-objects/ASSETS/ASSETS/'
// baseUrl = 'https://d321q9os2iadt9.cloudfront.net/'
export default class RequestManager {
    static space = "w6wp6l1i10zr";
    static environment = "master";
    static accessToken = "dTfnzz7HGLVoGfTRJSLMn8zb_15PTclYK_uT6koQCPk";
    
    static getModelUrl= (item) => {
        let modelUrl = baseUrl + 'THREE/'
        modelUrl = modelUrl + item.fields.modelUrl.split('/').pop()
        return modelUrl;
    }

    static getGlbUrl = (item) => {
        let glbUrl = baseUrl +  'AR/AAARGLTF_1/'
        glbUrl = glbUrl + item.fields.glbUrl.split('/').pop()
        return glbUrl;
    }

    static getUSDZUrl = (item) => {
        let usdzUrl = baseUrl + 'AR/USDZ/'
        usdzUrl = usdzUrl + item.fields.usdzUrl.split('/').pop()
        return usdzUrl
    }

    static getFileName = (item) => {
        return item.fields.modelUrl.split('/').pop()
    }
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
            // let modelUrl = baseUrl + 'THREE/'
            // if(item.fields.modelUrl) {
            //     modelUrl = modelUrl + item.fields.modelUrl.split('/').pop()
            // }
            let modelUrl = RequestManager.getModelUrl(item)

            let glbUrl = RequestManager.getGlbUrl(item)

            let usdzUrl = RequestManager.getUSDZUrl(item)

            //   console.log('Item', item)
              let project =  new ProjectModel(
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

              project.fileName = RequestManager.getFileName(item)
              return project
          });

          console.log('PROJECTS', projects)


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

            // let modelUrl = baseUrl + 'THREE/'
            let modelUrl = RequestManager.getModelUrl(item)

            let glbUrl = RequestManager.getGlbUrl(item)

            let usdzUrl = RequestManager.getUSDZUrl(item)

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
            let modelUrl = RequestManager.getModelUrl(item)

            let glbUrl = RequestManager.getGlbUrl(item)

            let usdzUrl = RequestManager.getUSDZUrl(item)
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

            let modelUrl = RequestManager.getModelUrl(item)

            let glbUrl = RequestManager.getGlbUrl(item)

            let usdzUrl = RequestManager.getUSDZUrl(item)

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
            let modelUrl = RequestManager.getModelUrl(item)

            let glbUrl = RequestManager.getGlbUrl(item)

            let usdzUrl = RequestManager.getUSDZUrl(item)

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