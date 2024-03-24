import { useRouter } from "next/router";
import axios from "axios"; // Removed curly braces
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from 'next/link'

export default function Profile() { // Changed profile to Profile
  const [user, setUser] = useState(); // Changed setuser to setUser and initialized with an empty object instead of array
  const router = useRouter();
  const { _id } = router.query; // Changed id to _id

  useEffect(() => { // Use useEffect for data fetching
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/profile/${_id}`); // Used _id
        const x = response.data.filter((x) => x._id === _id)
        setUser(x[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (_id) { // Check if _id is available before making the request
      fetchUser();
    }
  }, [_id]); // Added _id as dependency to useEffect


  const [doctorList, setDoctorList] = useState([]);
  const [patientslots, setpatientslots] = useState([])


  async function doctortimeslotlist() {
      try {
          const response = await axios.get("/api/doctortimeslotlist");
          const apidata = response.data;
          const filterdata = apidata.filter((x)=>x.doctorname === user?.name)
          const filteredpatientslots = apidata.filter((x)=>x.patientname === user?.name)
          console.log('filterdatat is', filterdata)
          setpatientslots(filteredpatientslots)
          setDoctorList(filterdata)
      } catch (err) {
          console.error("Error fetching data:", err);
      }
  }


  useEffect(() => {
      doctortimeslotlist()
  }, [user])

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
        router.push('../paymentpage')
    } catch (err) {
        console.log(err)
    }

}
}

  console.log(JSON.stringify(user));

  const {data : session} = useSession()
  const x = session?.user?.name



  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <h1 className="flex justify-center">Welcome {user?.name}</h1>
        <Link href = "../editpage">Change Your Password</Link>
        {x === "Admin" ? <Link className="flex justify-center" style={{textAlign : "center" , border : "3px solid blue" , backgroundColor : "green"}} href = "/admindashboard">GO TO ADMIN PANEL MANAGEMENT</Link> : <></>}
        <div className="grid lg:grid-cols-5 gap-[30px] lg:gap-[50px] ">
          <div className="lg:col-span-4">
            <div
              id="alert-4"
              className="flex p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 "
              role="alert"
            >{x === user?.name ? <Link href="/dashboard">CLICK HERE TO MANAGE YOUR TIME SLOTS</Link> : <div></div>}
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="mt-8">
              <div>
                <div className="flex gap-5 items-center mb-10">
                  <img src={user?.photo} alt="" className="w-full" />
                  <div>
                    <h3 className="text-headingColor text-[22px] leading-[36px] mt-3 font-bold">
                      {user?.name}
                    </h3>
                    <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-[600]">
                      {user?.expertise}
                    </span>

                    <div className="flex items-center gap-[6px]">
                      <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[600] text-headingColor">
                        <img src={user?.mediclcertificate} alt="" />{" "}
                      </span>
                      <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                          <p className="text__para text-[15px] leading-6 lg:max-w-[390px]">
                      {user?.description}
                    </p>
                      </span>
                      
                    </div>
                    <span  className=" text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-[600]">
                        <p style = {{border : "1px solid blue"}}>The Doctor is Located at : {user?.hospital}</p>
                      </span>

                  </div>

                </div>



              </div>




              <div className="flex gap-5 items-center mb-10">
              
                <img src={user?.medicalcertificate} alt="" className="w-full" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
          <p className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor">Here Are All slots for {user?.name}</p>
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
          <>
            {patientslots.map((item, index) => (
                                    <div className="py-[30px] px-5 rounded-3 mt-10" style={{ border: "1px solid blue" }} ><>
                                        <p className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor">Doctor : {item.doctorname}</p>
                                        <p className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor">Patient : {item.patientname === "" ? "Free" : item.patientname}</p>
                                        <p className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor">Time : {item.slottime}</p>
                                        <p className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor text-red-500">*Booking Fee is $20</p>
                                        <button className='p-4 border-b rounded-xl hover:bg-[#8FACC8] duration-300 hover:text-black cursor-pointer border-gray-600' onClick={()=> updatecard(item._id , item.patientname)  }>Book This Slot</button>
                                    </>
                                    </div>
                                ))}
          </>

          </div>
        </div>
      </div>
    </section>
  )
}
