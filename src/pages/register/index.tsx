import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../header";
import { ToastContainer, toast } from "react-toastify";



function Register() {
  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      router.push("/addProduct")
    }
  })
  useEffect(() => {
        if (!localStorage.getItem('user-data')) {
            router.push("/login")
        }
    })


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter()

  useEffect(() => {
      const storedUsername = localStorage.getItem('userEmail');
      if (storedUsername) {
          setEmail(storedUsername);
      }
      // Try to get the device's IP address
      fetch('https://api.ipify.org?format=json')
          .then((response) => response.json())
          .then((data) => {
              setDeviceId(data.ip); // Use the IP address as the device ID
          })
          .catch((error) => {
              console.error('Error getting IP address:', error);
          });

  }, []);
  async function signUp() {

    if (!firstName || !lastName || !email || !deviceId || !displayName || !phone) {
      toast.error("Please fill in all the fields"); // Display a toast notification
      return;
    }
    else {
      let item = { firstName, lastName, email, deviceId, displayName, phone }
      // console.log(item)


      let result = await fetch("https://anisoft.us/gapshupapp/api/user/chatuser", {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          "Content-Type": 'application/json',
          "Content-Length": '<calculated when request is sent>',
          "Host": '<calculated when request is sent>',
          "User-Agent": 'PostmanRuntime/7.32.3',
          "Accept-Encoding": 'gzip, deflate, br',
          "Connection": 'keep-alive',
          "Accept": 'application/json',
        }
      })
      result = await result.json()
      localStorage.setItem("user-info", JSON.stringify(result))
      localStorage.setItem("item", JSON.stringify(item))

      router.push("/homePage")
    }
  }


  return (
    <>
      <Header />
      <h1 className="d-flex justify-center">Register Now</h1>
      <br />
      <div className="col-sm-6 offset-sm-3 flex-column">
        <input type="text" name="firstName" className="form-control" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
        <br />
        <input type="text" name="lastName" className="form-control" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} value={lastName} />
        <br />
        {/* <input type="email" name="email" placeholder="Email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
        <br />
        <input type="text" name="deviceId" className="form-control" placeholder="Device Id" onChange={(e) => setDeviceId(e.target.value)} value={deviceId} />
        <br /> */}
        <input type="text" name="siaplayName" className="form-control" placeholder="Display Name" onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
        <br />
        <input type="text" name="phoneNumber" className="form-control" placeholder="Phone no" onChange={(e) => setPhone(e.target.value)} value={phone} />
        <br />
        <button onClick={signUp} className="btn btn-primary"  >Sign Up</button>
        <ToastContainer />

      </div>
    </>
  )
}


export default Register
