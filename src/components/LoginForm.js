import { useState } from 'react';
import firebaseAuthService from '../firebase/FirebaseAuthService';

const LoginForm = ({ existingUser }) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await firebaseAuthService.LoginUser(userName, password);
            setUserName("");
            setPassword("");
        } catch (error) {
            alert(error.message);
        }
    }
    // async function handleSubmit(event) {
    //     event.preventDefault();
    //     try {
    //         await firebaseAuthService.registerUser(userName, password);
    //         setUserName("");
    //         setPassword("");
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // }

    function handleLogout() {
        firebaseAuthService.logoutUser();
    }

    async function handleSendResetPasswordEmail() {
        if (!userName) {
            alert("Missing Username!!!");
            return;
        }
        try {
            await firebaseAuthService.sendPasswordResetEmail(userName);
            alert("Successfully sent the password reset email to your email account")
        } catch (error) {
            alert(error.message);
        }
    }

    //For logging in with google
    // async function handleLoginWithGoogle()
    // {
    //     try {
    //         await firebaseAuthService.loginWithGoogle();
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // }

    //This is Login form
    return (
        <>
            <div className='login-form-container'>
                {
                    existingUser ? <div className='row'>
                        <h3>Welcome, {existingUser.email}</h3>
                        <button type='button' className='primary-button' onClick={handleLogout}>Logout</button>
                    </div>
                        :
                        <form onSubmit={handleSubmit} className="login-form">
                            <label className='input-label login-label'>
                                Username(email):
                                <input
                                    type={'email'}
                                    value={userName}
                                    onChange={e => setUserName(e.target.value)}
                                    className='input-text'
                                    required
                                >

                                </input>
                            </label>
                            <label className='input-label login-label'>
                                Password:
                                <input
                                    type={'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className='input-text'
                                    required
                                >

                                </input>
                            </label>
                            <div className='button-box'>
                                <button className='primary-button'>Login</button>
                                <button type="button" onClick={handleSendResetPasswordEmail} className='primary-button'>Reset Password</button>
                                {/* <button type='button' onClick={handleLoginWithGoogle} className='primary-button' >Login with Google</button> */}
                            </div>
                        </form>
                }
            </div>
        </>
        // This is a Sign-Up form 
        // <>
        //     <div className='login-form-container'>
        //         {
        //             existingUser ? <div className='row'>
        //                 <h3>Welcome, {existingUser.email}</h3>
        //                 <button type='button' className='primary-button' onClick={handleLogout}>Logout</button>
        //             </div>
        //                 :
        //                 <form onSubmit={handleSubmit} className="login-form">
        //                     <label className='input-label login-label'>
        //                         Username(email):
        //                         <input
        //                             type={'email'}
        //                             value={userName}
        //                             onChange={e => setUserName(e.target.value)}
        //                             className='input-text'
        //                             required
        //                         >

        //                         </input>
        //                     </label>
        //                     <label className='input-label login-label'>
        //                         Password:
        //                         <input
        //                             type={'password'}
        //                             value={password}
        //                             onChange={e => setPassword(e.target.value)}
        //                             className='input-text'
        //                             required
        //                         >

        //                         </input>
        //                     </label>
        //                     <div className='button-box'>
        //                         <button className='primary-button'>Submit</button>
        //                     </div>
        //                 </form>
        //         }
        //     </div>
        // </>
    );
}

export default LoginForm;