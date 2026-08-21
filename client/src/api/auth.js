import axios from 'axios';

// -----------
//    Auth
// -----------

const loginUser = async ()=>{
    let response= await axios.post(
        "http://localhost:8000/api/",
        {
            "email":"jg@jg.com",
            "password":"pw"
        }
    )
    console.log(response.data)
}
// loginUser()
// {
//     email,
//     token
// }

const registerUser = async ()=>{
    let response = await axios.post(
        "http://localhost:8000/api/",
        {
            "email":"jg@jg.com",
            "password":"pw"
        }    
    )
    console.log(response.data)    
}    

// registerUser()

const logOutUser = async ()=>{
    const response = await axios.post(
        "http://localhost:8000/api/",
        null,
        {
            headers:{
                Authorization: ""
            }
        }
    )
    console.log(response.data)
}
// logOutUser()

const getInfo = async ()=>{
    const response = await axios.get(
        "http://localhost:8000/api/",
        {
            headers:{
                Authorization: ""
            }
        } 
    )
    console.log(response.data)
}