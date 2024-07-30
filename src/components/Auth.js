import { auth, provider } from '../firebase-config.mjs';
import { signInWithPopup } from "firebase/auth"; 
import "../styles/Auth.css";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

// Use `auth` and `provider` as needed in your component

export const Auth = (props) => {

    const { setIsAuth } = props;

    const signInWithGoogle = async  () => {
        try{
        const result = await signInWithPopup(auth, provider);
        cookies.set("auth-token", result.user.refreshToken)
        setIsAuth(true);
    } catch(err){
            console.error(err)

        }   
    };


    return (
     <div className="auth">
        <p>Sign In With Google To Continue</p>
        <button onClick={signInWithGoogle}>Sign In With Google</button>

    </div>
    );
};