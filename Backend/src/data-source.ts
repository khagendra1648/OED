import { DataSource, DataSourceOptions } from "typeorm";
import { menu } from "./entity/menu.entity";
import { order } from "./entity/order.entity";
import { post } from "./entity/post.entity";
import { User } from "./entity/user.entity";
import { article } from "./entity/article.entity";
import { Event } from "./entity/event.entity";

export const dataStoreOptions:DataSourceOptions={
    type:"mysql",
    host:"localhost",
    database:"oed",
    username:"root",
    synchronize:true,
    debug: false,
    logging: false,
    trace: false,
    entities:[menu,order,post,User,article,Event],
}

export const AppDataStore=new DataSource(dataStoreOptions)