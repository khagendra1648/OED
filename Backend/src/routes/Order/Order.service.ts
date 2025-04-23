import { order } from '../../entity/order.entity';
import { orderModel } from '../../model/order.model';
import { orderDto } from './Order.dto';
import { InvalidInputError } from '../../middleware/error.middleware';
import { menuModel } from '../../model/menu.model';
import { In } from 'typeorm';

export class OrderService {
    constructor(
        private order_model = new orderModel(),
        private menu_model=new menuModel()
    ) {}

    // async createorder(create: orderDto) {
    //     let orders = new order()
    //     let foodItem=await this.menu_model.find({where:{Id:In(create.order_items)}})
    //     let order_price=0        
    //     for(let i of foodItem){
    //         order_price+=i.menu_price
    //     }
    //     if(foodItem.length <=0)
    //         throw new InvalidInputError("No food found")
    //     orders.order_location = create.order_locations;
    //     orders.items=foodItem
    //     orders.order_price =order_price;
    //     console.log(orders)
    //     await this.order_model.save(orders)
    //     return {message:"Order Created"}
    // }

    async createorder(create: orderDto) {
        if (!create.order_items || create.order_items.length === 0) {
            throw new InvalidInputError("No items provided");
        }
    
        // Step 1: Count each item (handle duplicates)
        const itemCountMap: { [key: string]: number } = {};
        for (const itemId of create.order_items) {
            const idStr = itemId.toString();
            itemCountMap[idStr] = (itemCountMap[idStr] || 0) + 1;
        }
    
        // Step 2: Get unique item IDs
        const uniqueItemIds = Object.keys(itemCountMap).map(id => parseInt(id));
    
        // Step 3: Fetch those menu items from the database
        const foodItems = await this.menu_model.find({ where: { Id: In(uniqueItemIds) } });
        if (foodItems.length === 0) {
            throw new InvalidInputError("No food found");
        }
    
        // Step 4: Calculate total price and build items with quantity
        let total_price = 0;
        const itemsWithQuantity = foodItems.map(item => {
            const quantity = itemCountMap[item.Id.toString()] || 1;
            total_price += item.menu_price * quantity;
            // Attach quantity dynamically (not persisted in DB unless modeled)
            return { ...item, quantity };
        });
    
        // Step 5: Create the order
        const orders = new order();
        orders.order_location = create.order_locations;
        orders.items = foodItems; // You can customize this if persisting quantities too
        orders.order_price = total_price;
    
        await this.order_model.save(orders);
    
        return { message: "Order Created", order_price: total_price };
    }
    

    async getorders(read:orderDto){
        let orders = await this.order_model.find({relations:{items:true}});
        return {data:orders}
    }

    async Deleteorders(Delete: string) {
        let orders = await this.order_model.findOne({where:{Id:Delete}})
        if(!orders)
            throw new InvalidInputError("No id found")
        await this.order_model.delete(orders)
        return ('menu is deleted')
    }
}