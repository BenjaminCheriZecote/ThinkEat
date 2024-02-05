/* eslint-disable no-unused-vars */


const SignUp = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const dataForm = Object.fromEntries(formData);
        fetchData(dataForm);
    }

    const fetchData = async (data) => {
        const urlAPI="http://localhost:5500/signUp"
        try {
            const response = await fetch(urlAPI, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log(result)
            
        } catch (error) {
            console.log("erreur front fetch POST", error)
        }
    }

    return(
        <>
            <section className='section'>
                <form onSubmit={(e)=>handleSubmit(e)} className='section__form' action="" method='POST'>
                    <h2 className='section-form__h2'>Compte</h2>
                    <div className='section-form__divLastName'>
                        <label htmlFor="lastName">Nom :</label>
                        <input type="text" id="lastName" name="lastName"/>
                    </div>
                    <div className='section-form__divFisrtName'>
                        <label htmlFor="firstName">Prénom :</label>
                        <input type="text" id="firstName" name="firstName"/>
                    </div>
                    <div className='section-form__divEmail'>
                        <label htmlFor="email">Email :</label>
                        <input type="email" id="email" name="email"/>
                    </div>

                    <div className='section-form__divPassword'>
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="text" id="password" name="password"/>
                    </div>

                    <button className='section_form--btn' type="submit">Créer un compte</button>

                </form>
            </section>
        </>
    )
}

export default SignUp;