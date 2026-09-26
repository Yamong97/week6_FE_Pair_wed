

import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Signup = ({setIsAuthenticated}) => {
    const navigate = useNavigate ();
    const [name, setName] = useState("");
    const [password, setPassword] = useState ("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState ("");
    const [gender, setGender] = useState ("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [membershipStatus, setMembershipStatus] = useState("");
    const [error, setError] = useState(null);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setError(null);

        const response = await fetch ("/api/users/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email,
                password,
                name,
                phone_number: phoneNumber,
                gender,
                date_of_birth: dateOfBirth,
                membership_status: membershipStatus,
        
            }),

        });
        const user = await response.json();

        if (!response.ok) {
            setError(user.error);
            return;


        }

        localStorage.setItem("user", JSON.stringify(user));
        console.log("successfully created user");
        setIsAuthenticated(true);
        navigate("/");
    };

    return (
        <div className = "signup">
            <h2>Sign up</h2>

            <form onSubmit = {handleSubmitForm}>
                <label>Name: </label>
                <input
                type= "text"
                value = {name}
                onChange = {(e) => setName (e.target.value)} />

                <label>Email address: </label>
                <input
                type = "email"
                value= {email}
                onChange = {(e) => setEmail(e.target.value)}/>

                <label>Password:</label>
                <input
                type = "password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}/>

                <label>Phone Number: </label>
                <input
                type = "text"
                value = {phoneNumber}
                onChange = {(e) => setPhoneNumber (e.target.value)}/>

                <label>Gender:  </label>
                <input
                type = "text"
                value = {gender}
                onChange = {(e) => setGender(e.target.value)}/>

                <label>Date of Birth</label>
                <input
                type = "date"
                value = {dateOfBirth}
                onChange = {(e) => setDateOfBirth(e.target.value)}/>

                <label>Membership: </label>
                <input
                type = "text"
                value = {membershipStatus}
                onChange = {(e) => setMembershipStatus(e.target.value)}/>
                
                <button>Sign up</button>
                {error && <p className = "error" >{error}</p>}


            </form>
        </div>
    );

};

export default Signup;