import { useSession } from 'next-auth/react';
import { useState, useEffect } from "react"
import axios from "axios";
import { useRouter } from 'next/router';

const dashboard = () => {

    const router = useRouter()
    const { data: session } = useSession()

    const [dashboardfor, setdashboard] = useState("")
    const [pic, setpic] = useState("")
    const [timeslotsfordoctor, setthisprop] = useState(null)

    console.log('id of user from session', session?.user?._id)

    const updatecard = async (e , emptyornot) => {
        if(emptyornot !== ""){
            alert('Sorry this slot is booked')
        }else{
        try {
            const thisslot = await axios.put(`/api/slots/${e}`, {
                _id : e,
                patientname: session?.user?.name
            })
            console.log(thisslot.data)
            alert('slot booked successfully')
            router.push('paymentpage')
        } catch (err) {
            console.log(err)
        }
    
    }
    }

    async function fetchlist() {
        try {
            const x = await axios.get("/api/userlist")
            const match = x.data.find((user) => user._id === session?.user?._id)
            setdashboard(match.role)
            setpic(match.photo)
        } catch (err) {
            return
        }
    }
    fetchlist()

    const [doctortime, selectdoctortime] = useState("")

    const handledoctortime = (e) => {
        selectdoctortime(e.target.value)
    }

    const postslot = async (e) => {
        e.preventDefault()
        const slotdetails = {
            doctorname: session?.user?.name,
            slottime: doctortime,
            patientname: "",
        }
        try {
            const response = await axios.post('/api/timeslots', slotdetails);

            console.log('posting successful:', response.data);
            await doctortimeslotlist();

            // Perform any client-side actions after successful signup
        } catch (error) {
            console.error('Error during posting:', error.response.data);
            // Handle errors or display error messages to the user
        }
        // Perform any further actions, such as API calls, with the form data
    };



    // for patient get doctor slot list

    const [doctorList, setDoctorList] = useState([]);


    async function doctortimeslotlist() {
        try {
            const response = await axios.get("/api/doctortimeslotlist");
            const apidata = response.data;
            setDoctorList(apidata)
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    }


    useEffect(() => {
        doctortimeslotlist()
    }, [session])

    useEffect(() => {
        const myslotsDOC = doctorList.filter((x) => x.doctorname === session?.user?.name);
        setthisprop(myslotsDOC);
    }, [doctorList, session]);

    console.log('timeslots for this doctor is', timeslotsfordoctor)

    return (
        <div>


            {dashboardfor === "doctor" ? (
                // dashboard for doctor
                <>

                    <h1 style={{ marginBottom: "10px", marginRight: "10px", marginLeft: "10px", textAlign: "center" }}>Welcome {dashboardfor}</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5" style={{ border: "1px solid blue" }}>
                        <div className="py-[30px] px-5 rounded-3 mt-10 flex flex-column items-center justify-center">
                            <select value={doctortime} onChange={handledoctortime} style={{ border: "1px solid blue", marginRight: "10px" }}>
                                <option value={"9 AM - 10 AM"}>9 AM - 10 AM</option>
                                <option value={"10 AM - 11 AM"}>10 AM - 11 AM</option>
                                <option value={"11 AM - 12 PM"}>11 AM - 12 PM</option>
                                <option value={"12 PM - 1:30 PM"}>12 PM - 1:30 PM</option>
                                <option value={"1 PM - 3 PM"}>1 PM - 3 PM</option>
                                <option value={"3 PM - 4 PM"}>3 PM - 4 PM</option>
                                <option value={"4 PM - 5 PM"}>4 PM - 5 PM</option>
                            </select>

                            <button style={{ textAlign: "center", border: "2px solid blue", marginTop: "2px" }} className="bg-buttonBgColor py-2 px-6 rounded-[50px] text-black font-[600] h-[44px] flex items-center justify-center" onClick={postslot}>
                                Open Slot
                            </button>
                        </div>
                        <div className="py-[30px] px-5 rounded-3 mt-10 flex flex-row items-center justify-center">
                            <img src={pic} alt='hello' height={700} width={500}></img>
                        </div>
                    </div>
                    <p className='bg-buttonBgColor py-2 px-6 rounded-[50px] text-black font-[600] h-[44px] flex items-center justify-center'>Below Are Your Slots Listed</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

                        {timeslotsfordoctor.map((item, index) => (
                            <div className="py-[30px] px-5 rounded-3 mt-10" style={{ border: "1px solid blue" }} onClick={() => { alert('hi') }}><>
                                <p className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor">Doctor : {item.doctorname}</p>
                                <p className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor">Patient : {item.patientname}</p>
                                <p className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor">Time : {item.slottime}</p>
                            </>
                            </div>
                        ))}

                    </div>



                </>) : (
                // dashboard for patient

                <>
                    <div className="">
                        <div style={{ textAlign: "center" }}>
                            <h1 style={{ border: "1px solid blue" }}>Welcome {dashboardfor}</h1>
                            {/* show doctor list */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

                                {doctorList.map((item, index) => (
                                    <div className="py-[30px] px-5 rounded-3 mt-10" style={{ border: "1px solid blue" }} ><>
                                        <p className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor">Doctor : {item.doctorname}</p>
                                        <p className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor">Patient : {item.patientname === "" ? "Free" : item.patientname}</p>
                                        <p className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor">Time : {item.slottime}</p>
                                        <p className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor text-red-500">*Booking Fee is $20</p>
                                        <button className='p-4 border-b rounded-xl hover:bg-[#8FACC8] duration-300 hover:text-black cursor-pointer border-gray-600' onClick={()=> updatecard(item._id , item.patientname)  }>Book This Slot</button>
                                    </>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </>)}
        </div>
    )
}

export default dashboard