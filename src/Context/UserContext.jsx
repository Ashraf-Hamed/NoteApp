import { createContext, useState } from "react";



export const UserContext = createContext(0)

export default function UserContextprovider({children}) {


    let [token , setToken] = useState(localStorage.getItem('token'))


    function logOut() {


        localStorage.removeItem('token');
        setToken(null);
      }

    return <UserContext.Provider value={{token , setToken ,logOut}}>
            {children}
    </UserContext.Provider>


}