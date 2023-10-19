
import Swal from "sweetalert2"
// import { axios } from 'axios';
import axios from "axios";  

// ShowAddModel 

export function ShowAddModel({token ,updater}) {
    Swal.fire({
        title: 'Add Note ❤️',
       html :` 
           <input class= 'form-control' id = "title" name : "title" Placeholder = "Enter Title"/>
           <textarea class= 'form-control mt-3 p-2' id = "content" name : "content" Placeholder = "Enter content"></textarea>
       `,
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          
            let title = document.getElementById('title').value
            let content = document.getElementById('content').value
            return {title , content}
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
          sendDataToNote({title : result.value.title , content : result.value.content , token , updater})

      })
     

  }


// sendDataToNote 

async function sendDataToNote({title , content , token , updater}) {
        let {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes` ,{title, content} , {headers : {token}})
        console.log(data);

        if(data.msg === 'done') {

            getNotes({token , updater})
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Your Note has been Added',
                showConfirmButton: false,
                timer: 1500,
                
              })
        }
       
  }


  // Get Notes 



  export async function getNotes({token , updater}) {
   try {
    
    let {data} = await axios.get('https://note-sigma-black.vercel.app/api/v1/notes',{headers :{token}})
    updater(data.notes)
    console.log(data);
   } catch (error) {
    updater([])
   }
  }



// [1] ShowDeleteModel

export function showDeleteModel({id , token,updater}) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

            deleteNotes({id , token,updater})
         
        }
      })
}

  // Delete Notes 


  export async function deleteNotes({id , token , updater}) {
    let {data} = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{headers :{token}})
    console.log(data);
    getNotes({token , updater})
    Swal.fire(
        'Deleted!',
        'Your Note has been deleted.',
        'success'
      )
  } 




  // Updata Notes 


  export function ShowUpdateModel({token ,updater , id ,prevTitle , prevContent}) {
    Swal.fire({
        title: 'Update Note ❤️',
       html :` 
           <input class= 'form-control' id = "title" name : "title" Placeholder = "Enter Title" value="${prevTitle}"/>
           <textarea class= 'form-control mt-3 p-2' id = "content" name : "content" Placeholder = "Enter content">${prevContent}</textarea>
       `,
        showCancelButton: true,
        confirmButtonText: 'Update',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          
            let title = document.getElementById('title').value
            let content = document.getElementById('content').value
            return {title , content}
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        sendData({title : result.value.title , content : result.value.content , token , updater , id})

      })
     

  }



async function sendData({id , title , content ,token,updater}) {
    let {data} = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{title , content} , {headers :{token}})
    console.log(data);
    getNotes({token , updater})
    Swal.fire(
        'Updtaed',
        'Your Note has been Update.',
        'success'
      )
} 