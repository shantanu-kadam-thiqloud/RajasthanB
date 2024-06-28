// import React from 'react';
// import { useSelector } from 'react-redux';
// import { selectFirstName, selectEmailId, selectUserType, selectToken } from '../Login/selector';

export async function setUserDataInCookie(userData) {
    try {
        document.cookie = `UserData=${userData}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`; // Set cookie
      } catch (error) {
        console.error('Error setting user data in cookie:', error);
      }
    }

    export async function getUserDataFromCookie() {
         const cookies = document.cookie.split(';');
         let userData = null;
      
        cookies.forEach(cookie => {
          const [name, value] = cookie.trim().split('=');
          if (name === 'UserData') {
            userData = decodeURIComponent(value);
          }
        });
        // const userName
        //     userData = {
        //     userType: useSelector(selectUserType),    
        //     userName: useSelector(selectEmailId),            
        //     token: useSelector(selectToken),
        //     firstName: useSelector(selectFirstName)
        //   }
      
        return userData ? JSON.parse(userData) : null;
      }

      export function removeUserDataCookie() {
        document.cookie = 'UserData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
      

