import Image from 'next/image'
import ImageSecret from '../../public/resources/images/image2.png'
import { useRouter } from 'next/navigation';

export default function RegisterSecret() {

    const { push } = useRouter();

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target)

        var data = {
            description: formData.getAll("description")[0],
            url: formData.getAll("url")[0],
            userName: formData.getAll("userName")[0],
            password: formData.getAll("password")[0],
        };

        const response = await fetch('https://sentinel-pass-51041ea81f5c.herokuapp.com/api/secrets', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${sessionStorage.getItem("AccessToken")}`
          }
        })

        if (response.status === 401) { 
            push('/');
        }else{
            const dataRes = await response.json() 
            console.log(dataRes)
            push('/Secrets')
        }
      }

    return (
        <main>
            <Image
              src={ImageSecret}
              width={200}
              height={200}
              alt="Persona Image"
            />
            <form onSubmit={onSubmit}>
                <input type="text" name="description" placeholder="Description"/>
                <input type="text" name="url" placeholder="URL"/>
                <input type="text" name="userName" placeholder="User Name"/>
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