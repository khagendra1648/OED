import { LoginGuard } from "../../guards/role.guard";
import { Controller } from "../../lib/bind";
import { ImageSingle } from "../../lib/imageHandler";
import { Get, Post } from "../../lib/methods";
import { AuthorizedFileRequest, AuthorizedRequest } from "../../typings/base.type";

@Controller("/user")
export class UserController{
    constructor(

    ){}

    @Get("/get-user")
    @LoginGuard()
    getUser(req:AuthorizedRequest){
        return {message:"Hello User"}
    }

    @Get("/")
    getU(){
        return {message:"Hello User"}
        
    }

    // @Post("/")
    // @ImageSingle("upload")
    // upload(req:AuthorizedFileRequest){
    //     console.log(req)
    // }
}