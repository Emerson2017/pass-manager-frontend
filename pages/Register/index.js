import Image from 'next/image'
import ImagePersona from '../../public/resources/images/new-user.jpeg'
import { useRouter } from 'next/navigation';

export default function Register() {

    const { push } = useRouter();

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target)

        var data = {
            login: formData.getAll("login")[0],
            email: formData.getAll("email")[0],
            name: formData.getAll("name")[0],
            password: formData.getAll("password")[0],
            roles: "user"
        };

        const response = await fetch('https://sentinel-pass-51041ea81f5c.herokuapp.com/api/users', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${sessionStorage.getItem("AccessToken")}`
          }
        })
     
        const dataRes = await response.json() 
        console.log(dataRes)
        push('/Users')
      }

    return (
        <main>
            <Image
              src={ImagePersona}
              width={200}
              height={200}
              alt="Persona Image"
            />
            <form onSubmit={onSubmit}>
                <input type="text" name="login" placeholder="Login"/>
                <input type="text" name="email" placeholder="Email"/>
                <input type="text" name="name" placeholder="Name"/>
                <input type="password" name="password" placeholder="Password"/>
                <button type="submit">Register</button>
            </form>

            <style jsx>{`
                main {
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: center;
                }

                form {
                    display:flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 400px;
                }

                input {
                    height: 20px;
                }

                form input, form button {
                    margin-top: 20px;
                }

            `}</style>
        </main>
    );
}