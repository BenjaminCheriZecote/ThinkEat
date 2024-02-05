
import store from '../../../store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const user = {name:"Toto", email:"toto@example.com", pwd:"toto"}


const SignIn = () => {

    const urlAPI = "http://localhost:5500/signIn";
    const [error, setError] = useState("");
    const navigate = useNavigate();
    

    const fetchData = async (data) => {
        try {
            const response = await fetch(urlAPI, {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (result.user) {
                store.dispatch({type:"WELCOME", payload:result.success});
                store.dispatch({type:"USER", payload:result.user});
                store.dispatch({type:"IS_CONNECTED"});
                localStorage.setItem("user", JSON.stringify(result));
                navigate('/');

            } else {
                setError(result.fail);
            }

            console.log("retour du back connexion :", result)
        } catch (error) {
            console.log("erreur front avec le fetch API", error)
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const dataForm = Object.fromEntries(formData);
        // fetchData(dataForm);
        connexion(dataForm);
    }

    const connexion = (data) => {
        if (data.email === user.email) {
            if (data.password === user.pwd) {
                store.dispatch({type:"USER", payload:user.name});
                store.dispatch({type:"IS_CONNECTED"});
                localStorage.setItem("user", user.name);
                navigate("/")
            } else {
                setError("Mot de passe incorrect")
            }
        } else {
            setError("Email incorrect")
        }
    }


    return(
        <>
            <section className='section'>
                <form onSubmit={handleSubmit} className='section__form' action="" method="">
                    <h2 className='section-form__h2'>Connection</h2>
                    <div className='section-form__divEmail'>
                        <label htmlFor="email">Email :</label>
                        <input type="email" name="email" id="email"/>
                    </div>

                    <div className='section-form__divPassword'>
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" name="password" id="password"/>
                        {error?
                            <p>{error}</p>
                            :
                            ""
                        }
                    </div>

                    <button className='section-form__btn' type="submit">Connection</button>

                </form>
            </section>
        </>
    )
}

export default SignIn;