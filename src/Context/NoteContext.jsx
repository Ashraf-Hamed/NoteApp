import { createContext } from "react";
import { useState } from "react";



export const NoteContext = createContext(0) ;


export default function NoteContextProvider({children}) {


   let [notes , setNotes] = useState(null)

    return <NoteContext.Provider value={{notes , setNotes}}>
    
      {children}
    </NoteContext.Provider>
}