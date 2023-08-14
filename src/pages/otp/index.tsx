// pages/verify.js

import { useEffect, useState } from 'react';
import { verifyUser } from '../api'; // Import your API function
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Header from '../header';

export default function Verify() {

    const [username, setUsername] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const router = useRouter()

    const storedUsername = localStorage.getItem('userEmail');
    useEffect(() => {
        const storedUsername = localStorage.getItem('userEmail');
        if (storedUsername) {
            setUsername(storedUsername);
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
    const handleVerification = async () => {



        if (!username || !deviceId || !verificationCode) {
            // Check if any of the fields is empty
            toast.error('All input fields are required');
            return;
        }
        else if (!username.includes('@')) {
            toast.error("Enter a valid Email")
            return;
        }

        try {
            const result = await verifyUser(username, deviceId, verificationCode);
            // setVerificationResult(result);
            const storedJSON = localStorage.getItem("user-data");

            if (storedJSON) {
                const userInfo = JSON.parse(storedJSON);
                // Extract the value of the "action" property
                const actionValue = userInfo.action;

                // Now you can use the actionValue as needed
                if (actionValue === "Failed") {
                    toast.error("Please enter a valid OTP.", {
                        position: "top-center",
                        autoClose: 3000,
                    });
                } else {
                    // Action is not "Failed", you can proceed accordingly
                    router.push("/register");
                }
            }
            if (result.status === 'ok') {
                // Store the verification data in local storage
                localStorage.setItem('verificationData', JSON.stringify({ username, deviceId }));
                router.push("/register"); // Redirect to registration page
            } else {
                toast.error('Verification failed');
            }
        } catch (error) {
            console.error('Error verifying user:', error);
            toast.error("Please enter a valid OTP.", {
                position: "top-center",
                autoClose: 3000,
            });
        }

    };

    return (
        <>
            <Header />
            <h1 className="d-flex justify-center">Otp Verification</h1>
            <div className='col-sm-6 offset-sm-3 flex-column'>
                {/* <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    className='form-control'
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <input
                    type="text"
                    placeholder="Device ID"
                    value={deviceId}
                    className='form-control'
                    onChange={(e) => setDeviceId(e.target.value)}
                    required
                />
                <br /> */}
                <input
                    type="text"
                    placeholder="Verification Code"
                    value={verificationCode}
                    className='form-control'
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                />
                <br />
            </div>
            <div className='d-flex justify-center'>
                <button onClick={handleVerification} className='btn btn-primary'>Verify</button>
                {verificationResult && <pre>{JSON.stringify(verificationResult, null, 2)}</pre>}
            </div>
            <ToastContainer />

        </>

    );
}
