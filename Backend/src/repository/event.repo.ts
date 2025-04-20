import { AppDataStore } from "../data-source";
import { Event } from "../entity/event.entity";



export const eventRepo = AppDataStore.getRepository(Event)