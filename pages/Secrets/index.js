import Link from 'next/link'
import stylesHome from '../../styles/pageHome.module.css';
import { useState, useEffect, useRef } from 'react'
import style from '../Users/style.module.css'
import { useRouter } from 'next/navigation';

export default function Secrets() {

    const { push } = useRouter();
    const [secrets, setSecrets] = useState([])

    const secretsRef = useRef([secrets]);

    useEffect(() => {
        searchSecrets()},
        [secretsRef]);

    async function searchSecrets() {

        const response = await fetch('https://sentinel-pass-51041ea81f5c.herokuapp.com/api/secrets', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${sessionStorage.getItem("AccessToken")}`
          }
        })
     
        if (response.status === 401) { 
            push('/');
        }else if(response.status === 403){
            push('/Dashboard');
        }else{
            const dataRes = await response.json()
            setSecrets(dataRes);
        }
      }

    return (
        <div>
        <header className={stylesHome.header}> 
        <div className={stylesHome.actions}>
            <button className={stylesHome.action}>
                <Link href='/RegisterSecret'>Nova Secret</Link>
            </button>
        </div>
        </header>
        <main>
            <h1>Lista de Secrets</h1>
            <table id="customers">
                <thead>
                <tr>
                    <th>Descrição</th>
                    <th>URL</th>
                    <th>Username</th>
                    <th>Senha</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                    {secrets.map((secret, idx) => <RenderItem secret={secret} key={idx}/> )}                   
                </tbody>
            </table>


            <style jsx>{`
                main {
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: center;
                    height: 100%;

                }
                p {
                    width: 30px;
                    height:10px;
                    font-size: 40px;
                }

                table {
                    margin-top: 200px
                }

                table, td, th {  
                    border: 1px solid #ddd;
                    text-align: left;
                }
                
                table {
                border-collapse: collapse;
                width: 50%;
                }
                
                th, td {
                    padding: 15px;
                }
            `}</style>
        </main>
        </div>
    );

    function RenderItem({secret}) {
        return (
            <tr>
                <td className={style.item}>{secret.description}</td>
                <td className={style.item}>{secret.url}</td>
                <td className={style.item}>{secret.userName}</td>
                <td className={style.item}>{secret.password}</td>
                <td className={style.item}>
                    <Link href={{
                        pathname: '/EditSecrect',
                        query: {
                            id: secret.id, 
                            description: secret.description,
                            url: secret.url,
                            userName: secret.userName,
                            password: secret.password,
                         },
                    }}>
                        Editar
                    </Link>
                </td>
            </tr>
        )
    }
}