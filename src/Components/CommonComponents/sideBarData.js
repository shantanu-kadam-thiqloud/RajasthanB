//import { useState } from "react";

const sideData = [
  {
    type: "menuData",
    data: [
      {
        id: 1,
        menuName: "Home",
        url: "/Dashboard",
        subMenu: [],
      },
      {
        id: 2,
        menuName: "User Management",
        url: "/User",
        subMenu: [
          {
            id: 3,
            name: "Add",
            oldCheck: false,
            check: true,
            url: "#",
            action: [],
          },
          {
            id: 4,
            name: "View",
            oldCheck: false,
            check: true,
            url: "#",
            action: [],
          },
          {
            id: 2,
            name: "Update",
            oldCheck: false,
            check: true,
            url: "#",
            action: [],
          },
          {
            id: 5,
            name: "Delete",
            oldCheck: false,
            check: true,
            url: "#",
            action: [],
          },
        ],
      },
      {
        id: 3,
        menuName: "Role Management",
        url: "/Role",
        subMenu: [
          {
            id: 3,
            name: "Add",
            oldCheck: false,
            check: true,
            url: "#",
            action: [],
          },
          {
            id: 4,
            name: "View",
            oldCheck: false,
            check: true,
            url: "#",
            action: [],
          },
          {
            id: 2,
            name: "Update",
            oldCheck: false,
            check: true,
            url: "#",
            action: [],
          },
          {
            id: 5,
            name: "Delete",
            oldCheck: false,
            check: true,
            url: "#",
            action: [],
          },
        ],
      },
      {
        id: 4,
        menuName: "Customer Onboarding",
        url: "/Customer",
        subMenu: [
          {
            id: 3,
            name: "Add",
            oldCheck: false,
            check: true,
            url: "#",
            action: [],
          },
          {
            id: 4,
            name: "View",
            oldCheck: false,
            check: true,
            url: "#",
            action: [],
          },
          {
            id: 2,
            name: "Update",
            oldCheck: false,
            check: true,
            url: "#",
            action: [],
          },
          {
            id: 5,
            name: "Delete",
            oldCheck: false,
            check: true,
            url: "#",
            action: [],
          },
        ],
      },
      {
        id: 5,
        menuName: "Reports",
        url: "#",
        subMenu: [
          {
            id: 1,
            name: "User Login Report",
            url: "/UserLoginReport",
            check: true,
            oldCheck: false,
            action: [],
          },
          {
            id: 2,
            name: "User Active/Inactive",
            url: "/UserActiveInactiveReport",
            check: true,
            oldCheck: false,
            action: [],
          },
          {
            id: 3,
            name: "UAM Report",
            url: "/UserAccessReport",
            check: true,
            oldCheck: false,
            action: [],
          },
        ],
      },
      {
        id: 6,
        menuName: "Pending Approval",
        url: "PendingApproval",
        subMenu: [],
        // subMenu: [
        //   {
        //     id: 1,
        //     name: "User Request",
        //     url: "/UserRequests",
        //     oldCheck: false,
        //     check: true,
        //     action: [],
        //   },
        //   {
        //     id: 2,
        //     name: "Role Request",
        //     url: "/RoleRequests",
        //     oldCheck: false,
        //     check: true,
        //     action: [],
        //   },
        //   {
        //     id: 3,
        //     name: "Customer Request",
        //     url: "/CustomerRequests",
        //     oldCheck: false,
        //     check: true,
        //     action: [],
        //   },
        // ],
      },
    ],
  },
];

//----------------------------------------------------------------------------------------------------------

// const [data, setData] = useState([]);
// function addMenu(data, newMenu) {
//   data.push(newMenu);
//   setData(data);
//   return data;
// }

// function addSubMenu(data, menuId, newSubMenu) {
//   const menu = data.find((item) => item.id === menuId);
//   if (menu) {
//     if (!menu.subMenu) {
//       menu.subMenu = [];
//     }
//     menu.subMenu.push(newSubMenu);
//   }
//   setData(data);
//   return data;
// }

// // Function to add an action to a specific submenu
// function addAction(data, menuId, subMenuId, newAction) {
//   const menu = data.find((item) => item.id === menuId);
//   if (menu) {
//     const subMenu = menu.subMenu.find((subItem) => subItem.id === subMenuId);
//     if (subMenu) {
//       if (!subMenu.action) {
//         subMenu.action = [];
//       }
//       subMenu.action.push(newAction);
//     }
//   }
//   setData(data);
//   return data;
// }
// //-Edit function---------------------------------------------------------------------------------

// function editMenu(data, menuId, updatedMenu) {
//   const index = data.findIndex((item) => item.id === menuId);
//   if (index !== -1) {
//     data[index] = { ...data[index], ...updatedMenu };
//   }
//   setData(data);
//   return data;
// }

// function editSubMenu(data, menuId, subMenuId, updatedSubMenu) {
//   const menu = data.find((item) => item.id === menuId);
//   if (menu && menu.subMenu) {
//     const subMenuIndex = menu.subMenu.findIndex(
//       (subItem) => subItem.id === subMenuId
//     );
//     if (subMenuIndex !== -1) {
//       menu.subMenu[subMenuIndex] = {
//         ...menu.subMenu[subMenuIndex],
//         ...updatedSubMenu,
//       };
//     }
//   }
//   setData(data);
//   return data;
// }

// function editAction(data, menuId, subMenuId, actionId, updatedAction) {
//   const menu = data.find((item) => item.id === menuId);
//   if (menu && menu.subMenu) {
//     const subMenu = menu.subMenu.find((subItem) => subItem.id === subMenuId);
//     if (subMenu && subMenu.action) {
//       const actionIndex = subMenu.action.findIndex(
//         (action) => action.id === actionId
//       );
//       if (actionIndex !== -1) {
//         subMenu.action[actionIndex] = {
//           ...subMenu.action[actionIndex],
//           ...updatedAction,
//         };
//       }
//     }
//   }
//   setData(data);
//   return data;
// }
// //-Delete Function----------------------------------------------------------------------------------

// function deleteMenu(data, menuId) {
//   return data.filter((menu) => menu.id !== menuId);
// }

// function deleteSubMenu(data, menuId, subMenuId) {
//   return data.map((menu) => {
//     if (menu.id === menuId && menu.subMenu) {
//       menu.subMenu = menu.subMenu.filter((subMenu) => subMenu.id !== subMenuId);
//     }
//     return menu;
//   });
// }

// function deleteAction(data, menuId, subMenuId, actionId) {
//   return data.map((menu) => {
//     if (menu.id === menuId && menu.subMenu) {
//       menu.subMenu = menu.subMenu.map((subMenu) => {
//         if (subMenu.id === subMenuId && subMenu.action) {
//           subMenu.action = subMenu.action.filter(
//             (action) => action.id !== actionId
//           );
//         }
//         return subMenu;
//       });
//     }
//     return menu;
//   });
// }
// //----------------------------------------------------------------------------------------------------------

export default sideData;
