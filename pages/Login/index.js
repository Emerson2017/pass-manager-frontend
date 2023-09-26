import Image from 'next/image'
import ImagePersona from '../../public/resources/images/persona.png'
import { useRouter } from 'next/navigation';



export default function Login() {

    const { push } = useRouter();

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target)

        var data = {
            login: formData.getAll("login")[0],
            password: formData.getAll("password")[0]
        };

        var response = null;
        try {
            response = await fetch('https://sentinel-pass-51041ea81f5c.herokuapp.com/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  "Content-Type": "application/json",
                }
              })
        }catch(e){
            console.log('Error : '+e)
        }finally{
            if(response.ok) {
                const dataRes = await response.json()
                sessionStorage.setItem("AccessToken", dataRes.token);
                
                push('/Dashboard');
            }
        }
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
                <input type="password" name="password" placeholder="Password"/>
                <button type="submit">Login</button>
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