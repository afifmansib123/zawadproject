import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import  Link  from "next/link"

export default function admindashboard () {
    let show
    const {data : session} = useSession()

    const [doclist, setlist] = useState([])
    const [petlist, setpetlist] = useState([])

    const router = useRouter()

    const deletdoctor = async (doctorid) => {
        if (!window.confirm('Are you sure?')) {
            return;
          }
        try{
            await axios.delete(`/api/users/${doctorid}`);
            alert(doctorid)
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{

    async function fetchlist() {
        try {
            const x = await axios.get("/api/userlist")
            console.log(x.data)
            let docs = x.data.filter((i)=>i.role === "doctor")
            let pets = x.data.filter((i)=>i.role === "patient")
            setlist(docs)
            setpetlist(pets)
        } catch (err) {
            return err
        }
    }
    fetchlist()
    
},[])


    return(
        <>
        {
            session?.user?.name === "Admin" ? (
            <>
            <>
            <h1 style={{ marginBottom: "10px", marginRight: "10px", marginLeft: "10px", marginBottom:"20px", textAlign: "center" }}>Welcome Admin</h1>
            <h1 style={{ marginBottom: "10px", marginRight: "10px", marginLeft: "10px", textAlign: "center" }}>Below Are All The Doctors Listed :</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {doclist.map((items)=>(
                <div className="py-[30px] px-5 rounded-3" key={items._id} style={{ marginBottom: "10px", marginRight: "10px", marginLeft: "10px", marginBottom:"20px", textAlign: "center" , border: "3px solid blue" }} onClick={()=>{router.push(`/profile/${items._id}`)}}>
                <p>Doctor Name : {items.name} </p>
                <p>Doctor Email : {items.email}</p>
                <p>Doctor Certificate</p> <img src = {items.photo} alt = "jerin" height = {500} width = {500}></img>
                <button className='p-4 border-b rounded-xl hover:bg-[#F31C06] duration-300 hover:text-black cursor-pointer border-red-500' onClick={()=> deletdoctor(items._id) }>Delete Doctor</button>
                </div>
            ))}
            </div>
            </>

            <>

            </>
            <h1 style={{ marginBottom: "10px", marginRight: "10px", marginLeft: "10px", marginBottom:"20px", textAlign: "center" }}>Welcome Admin</h1>
            <Link href = "/dashboard">Click Here To see All Time Slots</Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {petlist.map((items)=>(
                <div className="py-[30px] px-5 rounded-3" key={items._id} style={{ marginBottom: "10px", marginRight: "10px", marginLeft: "10px", marginBottom:"20px", textAlign: "center" , border: "3px solid blue" }}>
                <p>Patient Name : {items.name} </p>
                <p>Patient Email : {items.email}</p>
                <p>Profile Picture :</p> <img src = {items.photo} alt = "jerin" height = {500} width = {500}></img>
                <button className='p-4 border-b rounded-xl hover:bg-[#F31C06] duration-300 hover:text-black cursor-pointer border-red-500' onClick={()=> deletdoctor(items._id) }>Delete Patient</button>
                </div>
            ))}
            </div>
            </>
            )
            : (<>Admin authentication needed</>)
        }
        </>
    )
}