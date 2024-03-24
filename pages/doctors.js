import { useEffect, useState } from "react";
import Testimonial from "./components/Testimonial";
import axios from "axios"
import { useRouter } from "next/router";

const Doctors = () => {

  const [doctorList, setDoctorList] = useState([]);


  async function fetchlist() {
    try {
      const response = await axios.get("/api/userlist");
      const apidata = response.data;
      const doctors = apidata.filter((item)=>item.role === "doctor")
      setDoctorList(doctors)
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  let router = useRouter()

  useEffect(()=>{
    fetchlist()
    console.log('doctorlist is', doctorList)
  },[])

  console.log(doctorList)

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mx-auto mt-[30px] bg-[#0066ff2c] rounded-md flex items-center justify-between ">
            <p
              className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor">
                Here Are All Doctors
              </p>
              
          </div>
        </div>
      </section>

      <section>
        <div className="container">


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            
            {
            
            doctorList.map((item, index) => (
              <div className="py-[30px] px-5 rounded-3" style={{border: "1px solid blue"}} onClick={()=>{router.push(`/profile/${item._id}`)}}><>
              <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-[600]">
                      {item?.expertise}
                    </span>
                <p className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor">Doctor : {item.name}</p>
                <p className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor">Gender : {item.gender}</p>
                <p className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor">Experience : {item.description}</p>
                <img src={item.photo} alt="hello" height = {500} width = {500}></img>
                </>
                </div>
            ))}

            </div>

        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patient say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
            </p>
          </div>

          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
