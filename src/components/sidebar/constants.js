import { ReactComponent as Dashboard } from "../../assets/svg/Dashboard.svg";
import { ReactComponent as Orders } from "../../assets/svg/Orders.svg";
import { ReactComponent as Conversations } from "../../assets/svg/Chat.svg";
import { ReactComponent as Inventory } from "../../assets/svg/Inventory.svg";
import { ReactComponent as Customers } from "../../assets/svg/Customers.svg";
import { ReactComponent as Settings } from "../../assets/svg/Setting.svg";


export const menu = [
  { key: "/", title: "Dashboard", icon: Dashboard },
  { key: "/orders", title: "Orders", icon: Orders },
  { key: "/customers", title: "Customers", icon: Customers },
  { key: "/inventory", title: "Inventory", icon: Inventory },
  { key: "/conversations", title: "Conversations", icon: Conversations },
  { key: "/settings", title: "Settings", icon: Settings },
];
