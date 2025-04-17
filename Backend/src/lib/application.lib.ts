import express from "express";
import cookieParser from "cookie-parser"
import { Singleton } from "./singleton";
import cors from "cors"


@Singleton()
export class BspApplication{
    controllers:any[]
    constructor(private application=express(),controllers:any[]){
        application.use(cors({origin:["http://localhost:3000"],credentials:true}))
        application.use(express.json())
        application.use(cookieParser())
        this.controllers=controllers
    }

    getApplication(){
        return this.application
    }

    async startApplication(port:any){
        new Promise((resolve,reject)=>{
            this.application.listen(port,()=>{
                console.log(`Server running on port ${port}`)
                this.controllers.forEach((controller:any)=>{
                    let obj=new controller()
                    Reflect.getMetadataKeys(obj).forEach(name=>{
                        let metaData=Reflect.getMetadata(name,obj)
                        if(metaData.router){
                            this.application.use(metaData.path,metaData.router)
                        }
                    })
                })
                resolve("")
            })
        })
        
    }
}