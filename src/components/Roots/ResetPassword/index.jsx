import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ResetPassword = () => {

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {

    }

    return(
        <>
            <section className='section'>
                <form onSubmit={handleSubmit} className='section__form' action="" method="">
                    <h2 className='section-form__h2'>Connection</h2>
                    <div className='section-form__divEmail'>
                        <label htmlFor="email">Email :</label>
                        <input type="email" name="email" id="email"/>
                        {error?
                            <p>{error}</p>
                            :
                            ""
                        }
                    </div>

                    <button className='section-form__btn' type="submit">Envoyer</button>

                </form>
            </section>
        </>
    )
}

export default ResetPassword;