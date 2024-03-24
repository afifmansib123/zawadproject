import { useState , useEffect} from "react";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SignUp = () => {

  const {data : session} = useSession()
  const router = useRouter()
  useEffect(()=>(
    session ? (
      router.push('/dashboard')
    ) : (()=>{return})
  ),[session])

  const uploadHandler = async (e, field) => {
    e.preventDefault();
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
  
    try {
      const { data: { signature, timestamp } } = await axios('/api/admin/cloudinary-sign');
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      
      setFormData(prevData => ({
        ...prevData,
        [field]: data.secure_url // Update the field dynamically
      }));
      
      alert('successfully uploaded');
    } catch (err) {
      alert('failed to upload');
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
    gender: "",
    photo: null,
    medicalcertificate : null,
    hospital : "", 
    description : "",
    expertise : "" , 
    isAdmin : false,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    if (name === "medicalcertificate") {
      uploadHandler(e, "medicalcertificate");
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Access your form data in the `formData` object
    console.log(formData);

    try {
      const response = await axios.post('/api/signup', formData);

      console.log('Signup successful:', response.data);
      // Perform any client-side actions after successful signup
    } catch (error) {
      console.error('Error during signup:', error.response.data);
      // Handle errors or display error messages to the user
    }
    // Perform any further actions, such as API calls, with the form data
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          {/* ============ img box ========= */}
          <div className="hidden lg:block bg-[#0067FF] rounded-l-lg">
            <figure className="rounded-l-lg">
              <img className="w-full rounded-l-lg" src="/images/signup.gif" alt="" />
            </figure>
          </div>

          <div className="rounded-l-lg  lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-[#0067FF]">Account</span>
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter Your Email"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  placeholder="Password"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                  required
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                

                <label className="text-headingColor font-bold text-[16px] leading-7]">
                  Gender:
                  <select
                    name="gender"
                    onChange={handleChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>



                {/* For doctor Profile Picture */}

                <label className="text-headingColor font-bold text-[16px] leading-7]">Upload a Profile Picture</label>
                <input
                    type="file"
                    className="w-full"
                    id="imageFile"
                    onChange={(e)=>uploadHandler(e, 'photo')}
                />
              </div>

              <div className="mb-5 flex items-center gap-3">
                <div className="relative inline-block w-[130px] h-[50px]">
                  <input
                    className="custom-file-input absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    id="customFile"
                    name="photo"
                    type="file"
                    accept=".jpg,.png"
                    placeholder="Upload Profile"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="name"
                  onChange={handleChange}
                  name="hospital"
                  placeholder="Which Hospital You work for"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                  required
                />
              </div>

              <div className="mb-5">
                <textarea
                  type="password"
                  onChange={handleChange}
                  name="description"
                  placeholder="Please Describe Your Career Shortly"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="name"
                  onChange={handleChange}
                  name="expertise"
                  placeholder="Your Expertise"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                  required
                />
              </div>

              {/* Picture for medical certificate */}

              <label className="text-headingColor font-bold text-[16px] leading-7]">As Of Our Terms and Services Please Upload a Picture of Your Medical Lisence</label>
              <div className="mb-5">

                <input
                    type="file"
                    className="w-full"
                    id="imageFile01"
                    onChange={(e)=>uploadHandler(e, 'medicalcertificate')}
                />
              </div>

              <div className="mb-5 flex items-center gap-3">
                <div className="relative inline-block w-[130px] h-[50px]">
                  <input
                    className="custom-file-input absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    id="customFile01"
                    name="medicalcertificate"
                    type="file"
                    accept=".jpg,.png"
                    placeholder="Upload Profile"
                    onChange={handleChange}
                  />
                </div>
                </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-[#0067FF] text-white py-3 px-4 rounded-lg text-[18px] leading-[30px]"
                >
                  SignUp
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-[#0067FF] font-medium">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
