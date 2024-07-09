// import { DropdownService } from "../../Service/DropdownService";
import { v4 as uuid } from "uuid";
// import sideBarDataChecker from "../Checker/sideBarData";
import { useState } from "react";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addUser } from "../../Store/Reducers/userReducer"; // Correct import path
// import { setProfile } from "../../Store/Reducers/profileReducer"; // Import action creator for profile
// import * as forge from "node-forge";
// import { useSelector } from "react-redux";
import JSEncrypt from "jsencrypt";

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQB4bo0ViZi3LL4UIh6fShEU
Q6TIq8PDwyzRq99WHNe2Ue8MFJXOBOL7pOLFvyXVGyO7wDGgw0swuJoHiFuzvq4m
d6AuMvbjab6DWhxRF3d3cT5fkD4gK2PPe2Z54IDIkq0yLD1ypInHi4TOsV4OqJOL
I7XIip6q+0zpgaae98sDdYh+IAjWLVGIjX+OEzJn3q8tc2/Qt/wDFZ9LxTiP8Sf6
1lD6pbmh+oyhYzSlBVC/ZpqEgs3T+zt6zex9PPSmecyzkJ4Qvo0UMBF6oPmfScN4
SaFiooJfF/3B3vzJzvxzdQkNaAajfB4/9ZMxt8SF8fXpaorQ01+UhuRz5t6Ng9yz
AgMBAAE=
-----END PUBLIC KEY-----`;

const publicKkey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArWNWAjuFGdwpTCgyGqZwehtK2RaZ3s05nD85pZO8YUjI4mEYFvFwaN/xq0oZ1qrXgeIcqT0WL2PPMDEEU1Ncf4twxm/GMOvYHU8MZuXcrN5q8auWpIth1puBfELCzmHZ7klkwuJmYlQ4iSLLAle4yi37lYlhsDs8+G+hSvR3OKpyuqy8dY5GMOkkRUlc04cpndxDedLqUPtPlC65Z8hcnC1drIQB6yekbfdmYKogTR6+0ujGv3dEZEpvFk85SUi5EA61wIjfhLC9qZaWpAXOYvjrhoeL1OKMzP6kJ8cbdwucleyrj27mqLvtCfYNiYCXLL64LYhWsbkTENp092pAXwIDAQAB`;

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQB4bo0ViZi3LL4UIh6fShEUQ6TIq8PDwyzRq99WHNe2Ue8MFJXO
BOL7pOLFvyXVGyO7wDGgw0swuJoHiFuzvq4md6AuMvbjab6DWhxRF3d3cT5fkD4g
K2PPe2Z54IDIkq0yLD1ypInHi4TOsV4OqJOLI7XIip6q+0zpgaae98sDdYh+IAjW
LVGIjX+OEzJn3q8tc2/Qt/wDFZ9LxTiP8Sf61lD6pbmh+oyhYzSlBVC/ZpqEgs3T
+zt6zex9PPSmecyzkJ4Qvo0UMBF6oPmfScN4SaFiooJfF/3B3vzJzvxzdQkNaAaj
fB4/9ZMxt8SF8fXpaorQ01+UhuRz5t6Ng9yzAgMBAAECggEAMYjnJtCtq8oPdKCE
D+ibFcas5I0hvEdvC96xwe2jHC6fMEzXQSHpaq/rRoLUwM6k5/ipcQJizutfD3Ia
pdfsMY5KqDX2Lpuz7LsHoqMQVGSTzyK5Kuot541OHRsmXVlXO6fOrnTW5uiP+6Qg
l87mwPgzMQUzNgifHfxh2Ej7i7Qe9EKwypG3yrmmuW8Cy6D602PQcH4+jefwpvN9
/E90QI9xCHleDOhbtRrdhV66itSyKPFDHkx/E9nEGApPHCw3VaKtnPc38+2Cpgn6
D31Sjsmy38V85Ml+uRBKzKSer1vtns+yNGhAk5rsj7V86Er6+HuHim0bhwxY9Nfx
FxAD4QKBgQDCvxbsMJI6KgUw9aRT8R50on+s7iRS/IRh3S/KR8+PMOSaB6Wg+Xn/
xi7dj6/i2EGIfQjwZISrtrOdS/HG03M95bt7a9cEf86fki7KLWwn75JR8rdrOdRK
p5ZgbdN2GWAKPsIQGXsA/ER3IVbSUiOefy+wsfNLUrXKT5m+8yFiXwKBgQCeT615
qslM0F5HWTRxCKoO95w9Kjv+TpGOvIiLRLLbYaHs0ReprJT7WVZtpVfcgjfnKdKQ
5OMeJCDEjswA+aCt3ElsWAwRr5DnwCKP2A8MW1ssjOZMMWXa9zE2KcSjhthID0qE
RUyMfoByFNeAEewEVzZUzX/MpgenELqfvteuLQKBgQCtsiwqy4OQ1yu8KEvCBtwo
IUuJHPpO/iTA+LwIShZpW615aHqk4f6bT9M7EE5LIKEKsKLJbo4abaE0GalyseQm
gAHBKkUkIS5UitiqwOqnj/lMmBRaUcD0ORdZuHsT6bwMRz9lhqR8E4SpUJYUjuhw
FHafvYgHVaUI5gh2FHphNwKBgFI/sTAyBA2tgB3vgahsSPYnvPumMq8oIMWYvBQn
KAmEiv0fkPytVmXT/2xN5/z/ho3KE8UFtd3WBVQ5oFGtX8aUWW05vWN+5HkTQKGd
LgxMdm0J8yiIzZNatC2gu7H9/+ZIU32vB1tC6fbbTy8RoJ6MtQSQE6K+a+Fndp5C
J4otAoGAYuvJS0oqxTDOsc00R2WEawb2FDZbLub/walOFB1GC+F5btu6kgJezPd3
FBjAVZ8cXtlKhtqgko/z2UP1p0BiElI7J+2eWDlJe46IZrzWb1JWx/nXhPweyZeF
/vQn6V5iFgcS7JO4bPUpDAZY7JXIt7ugvyU5KLdDEtVoEL0bRas=
-----END RSA PRIVATE KEY-----`;
export const DateFormatFunction = (inputDate) => {
  if (inputDate) {
    // Parse the input date string into a Date object
    const dateParts = inputDate.split("-");
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // JavaScript months are zero-based
    const day = parseInt(dateParts[2]);
    const formattedDate = new Date(year, month, day);

    // Extract day, month, and year components
    const dd = String(formattedDate.getDate()).padStart(2, "0");
    const mm = String(formattedDate.getMonth() + 1).padStart(2, "0"); // Add 1 to the month (zero-based)
    const yyyy = formattedDate.getFullYear();

    // Format the date in "dd-mm-yyyy" format
    return `${dd}-${mm}-${yyyy}`;
  } else {
    return;
  }
};

export const ConvertFormat = (inputDate) => {
  if (inputDate) {
    // Split the input date into an array
    var dateArray = inputDate.split("-");
    // Rearrange the array elements to the new format
    var outputDate = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];

    return outputDate;
  } else {
    return;
  }
};

// export const getCheckValueByName = (menuData, submenuName, actionName) => {
//   //Side bar Data
//   // var sidejsonData = sideBarDataChecker.find(
//   //   (item) => item.type === "menuData"
//   // );
//   const MappingData = JSON.parse(sessionStorage.getItem("Mapping"));
//   const sidebarMockData = MappingData; //sidejsonData.data;

//   for (const menu of sidebarMockData) {
//     for (const submenu of menu.subMenu) {
//       if (submenu.name === submenuName) {
//         if (actionName !== undefined) {
//           for (const action of submenu.action) {
//             if (action.actionName === actionName) {
//               return action.check;
//             }
//           }
//         } else {
//           return submenu.check;
//         }
//       }
//     }
//   }
//   return undefined; // Submenu or action not found
// };

export async function DownloadByteArray(filename, response) {
  const date = new Date();
  const linkSource = `data:application/vnd.ms-excel;base64,${response}`;
  const downloadLink = document.createElement("a");
  const fileName = `${filename}_${date}.xlsx`;
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

export async function getBase64(file) {
  if (file === null) {
    return;
  } else {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }
}

export const encryptData = (value) => {
  try {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    const data = JSON.stringify(value);
    const encryptedMessage = encrypt.encrypt(data);
    //setEncrypted(encryptedMessage);
    return encryptedMessage;
  } catch (error) {
    console.error("Encryption error:", error);
    return null; // Return null on error
  }
};

export const decryptData = (encryptedText) => {
  try {
    const encrypt = new JSEncrypt();
    encrypt.setPrivateKey(privateKey);
    const decryptedMessage = encrypt.decrypt(encryptedText);
    const decryptedData = JSON.parse(decryptedMessage);
    return decryptedData;
  } catch (error) {
    console.error("Decryption error:", error);
    return null; // Return null on error
  }
};

export const encryptValue = (value) => {
  try {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKkey);
    const encryptedMessage = encrypt.encrypt(value);
    //setEncrypted(encryptedMessage);
    return encryptedMessage;
  } catch (error) {
    console.error("Encryption error:", error);
    return null; // Return null on error
  }
};

// //-----------Cookie----------------------------------------------------------------

// // Function to set a cookie with JSON data
// export function setCookie(name, value, days) {
//   const encryptedValues = encryptData(value);

//   //------------------------------------------------------------------------------------------
//   let expires = "";
//   if (days) {
//     let date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     expires = "; expires=" + date.toUTCString();
//   }
//   document.cookie = name + "=" + encryptedValues + expires + "; path=/";
//   //encodeURIComponent()
// }

// // Function to get a cookie and parse JSON data
// export function getCookie(name) {
//   let nameEQ = name + "=";
//   let cookies = document.cookie.split(";");
//   for (let i = 0; i < cookies.length; i++) {
//     let cookie = cookies[i];
//     while (cookie.charAt(0) === " ") {
//       cookie = cookie.substring(1, cookie.length);
//     }
//     if (cookie.indexOf(nameEQ) === 0) {
//       var cookieValue = cookie.substring(nameEQ.length, cookie.length);
//       //--Decryption---------------------------------------------------------------------------------
//       const unencryptedData = decryptData(cookieValue);
//       //---------------------------------------------------------------------------------------------
//       return unencryptedData;
//     }
//   }
//   return null;
// }

// // Function to clear a cookie
// export function clearCookie(name) {
//   document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
// }

//-------------------------------------------------------------------------------------

// export const useSetReduxData = () => {
//   const dispatch = useDispatch();

//   const setReduxData = (data) => {
//     dispatch(addUser(data));
//   };

//   return setReduxData;
// };

// export const useSetReduxProfile = () => {
//   const dispatch = useDispatch();

//   const setReduxProfile = (data) => {
//     dispatch(setProfile(data));
//   };

//   return setReduxProfile;
// };

// export const useGetReduxData = () => {
//   // const userData = useSelector((state) => state.NHAIUser.data); // Assuming 'NHAIUser' is the slice name
//   // const profileData = useSelector((state) => state.profile.profile);
//   const userData = useSelector((state) => state.NHAIUser.data[0]?.userData); // Accessing userData directly
//   const profileData = useSelector((state) => state.profile.profile);
//   return { userData, profileData };
// };
