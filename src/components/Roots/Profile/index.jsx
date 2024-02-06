import { useState } from "react"

const Profil = () => {

    console.log(JSON.parse(localStorage.getItem("user")))
    const test = JSON.parse(localStorage.getItem("user"));

    console.log("test :", test.name)
    const [profil] = useState(JSON.parse(localStorage.getItem("user")))
    console.log("profil", profil)
    

    return(
        <section className="section">

            <div className="section__headProfile">
                <h2>Profile</h2>
                <img src="" alt="" />
            </div>

            <form action="">
                <label htmlFor="name">
                    Name
                    <input type="text" id="name" value={profil.name}/>
                </label>

                <label htmlFor="email">
                    Email
                    <input type="email" id="email" value={profil.email}/>
                </label>
                <label htmlFor="password">
                    Mot de passe
                    <input type="password" id="password" value={profil.pwd}/>
                </label>

            </form>

        </section>

    )
}

export default Profil;