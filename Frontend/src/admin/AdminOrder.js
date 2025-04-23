// import React from "react";
// import { useState, useEffect } from "react";
// import { Table } from "react-bootstrap";

// function AdminOrder() {
//   const [orderList, setOrderList] = useState([]);
  
//   const fetchOrderList = () => {
//     fetch("http://localhost:10000/order/get_order")
//       .then((response) => response.json())
//       .then((data) => {
//         // Process the data to combine duplicate items
//         const processedData = data.data.map(order => ({
//           ...order,
//           items: combineDuplicateItems(order.items)
//         }));
//         setOrderList(processedData);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   // Function to combine duplicate items and calculate quantities
//   const combineDuplicateItems = (items) => {
//     const itemMap = new Map();
    
//     items.forEach(item => {
//       const existingItem = itemMap.get(item.menu_name);
//       if (existingItem) {
//         // If item exists, increment quantity
//         existingItem.quantity = (existingItem.quantity || 1) + 1;
//       } else {
//         // If new item, add to map with quantity 1
//         itemMap.set(item.menu_name, {
//           ...item,
//           quantity: 1
//         });
//       }
//     });
    
//     return Array.from(itemMap.values());
//   };

//   // Function to calculate total price of an order
//   const calculateTotalPrice = (items) => {
//     return items.reduce((total, item) => {
//       return total + (item.menu_price * (item.quantity || 1));
//     }, 0);
//   };

//   // Function to format order items
//   const formatOrderItems = (items) => {
//     return items.map(item => {
//       return item.quantity > 1 
//         ? `${item.menu_name} (${item.quantity})` 
//         : item.menu_name;
//     }).join(", ");
//   };

//   useEffect(() => {
//     fetchOrderList();
//   }, []);

//   return (
//     <div>
//       <div className="sidebar">
//         <h3 className="sidebar-heading">Admin Panel</h3>
//         <ul className="sidebar-menu">
//           <li><a href="/Admindashboard" className="active">Dashboard</a></li>
//           <li><a href="/AdminOrder">Order</a></li>
//           <li><a href="/MenuDash">Menu</a></li>
//         </ul>
//       </div>

//       <div className="content">
//         <div className="row justify-content-around">
//           <h2 className="mt-5 mb-3 text-start">Order Details</h2>

//           <Table responsive striped bordered hover>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Order Items</th>
//                 <th>Total Price (Rs.)</th>
//                 <th>Order Location</th>
//               </tr>
//             </thead>

//             <tbody>
//               {orderList.map((order) => (
//                 <tr key={order.Id}>
//                   <td>{order.Id}</td>
//                   <td>{formatOrderItems(order.items)}</td>
//                   <td>{calculateTotalPrice(order.items).toFixed(2)}</td>
//                   <td>{order.order_location}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminOrder;





import React from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

function AdminOrder() {
  const [orderList, setOrderList] = useState([]);

  const fetchOrderList = () => {
    fetch("http://localhost:10000/order/get_order")
      .then((response) => response.json())
      .then((data) => {
        const processedData = data.data.map(order => ({
          ...order,
          items: combineDuplicateItems(order.items)
        }));
        setOrderList(processedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const combineDuplicateItems = (items) => {
    const itemMap = new Map();

    items.forEach(item => {
      const existingItem = itemMap.get(item.menu_name);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        itemMap.set(item.menu_name, {
          ...item,
          quantity: 1
        });
      }
    });

    return Array.from(itemMap.values());
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      return total + (item.menu_price * (item.quantity || 1));
    }, 0);
  };

  // 🔄 UPDATED FUNCTION
  const formatOrderItems = (items) => {
    return items.map(item => {
      return `${item.menu_name} - Rs. ${item.menu_price} x ${item.quantity}`;
    }).join(", ");
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  return (
    <div>
      <div className="sidebar">
        <h3 className="sidebar-heading">Admin Panel</h3>
        <ul className="sidebar-menu">
          <li><a href="/Admindashboard" className="active">Dashboard</a></li>
          <li><a href="/AdminOrder">Order</a></li>
          <li><a href="/MenuDash">Menu</a></li>
        </ul>
      </div>

      <div className="content">
        <div className="row justify-content-around">
          <h2 className="mt-5 mb-3 text-start">Order Details</h2>

          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Order Items</th>
                <th>Total Price (Rs.)</th>
                <th>Order Location</th>
              </tr>
            </thead>

            <tbody>
              {orderList.map((order) => (
                <tr key={order.Id}>
                  <td>{order.Id}</td>
                  <td>{formatOrderItems(order.items)}</td>
                  <td>{calculateTotalPrice(order.items).toFixed(2)}</td>
                  <td>{order.order_location}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrder;
