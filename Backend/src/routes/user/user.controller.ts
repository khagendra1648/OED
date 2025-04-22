import { LoginGuard } from "../../guards/role.guard";
import { Controller } from "../../lib/bind";
import { Get } from "../../lib/methods";
import { AuthorizedRequest } from "../../typings/base.type";

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
        return {message:"Hello Usesr"}
    }
}