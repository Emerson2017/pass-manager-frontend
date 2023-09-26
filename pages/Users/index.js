import Link from 'next/link'
import stylesHome from '../../styles/pageHome.module.css';
import { useState, useEffect, useRef } from 'react'
import style from './style.module.css'
import { useRouter } from 'next/navigation';

export default function Users() {

    const { push } = useRouter();
    const [users, setUsers] = useState([])

    const usersRef = useRef([users]);

    useEffect(() => {
        searchUsers()},
        [usersRef]);

    async function searchUsers() {

        const response = await fetch('https://sentinel-pass-51041ea81f5c.herokuapp.com/api/users', {
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
            setUsers(dataRes);
        }
      }

    return (
        <div>
        <header className={stylesHome.header}> 
        <div className={stylesHome.actions}>
            <button className={stylesHome.action}>
                <Link href='/Register'>Novo Usuário</Link>
            </button>
        </div>
        </header>
        <main>
            <h1>Lista de Usuários</h1>
            <table id="customers">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => <RenderItem user={user} key={idx}/> )}                   
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

    function RenderItem({user}) {
        return (
            <tr>
                <td className={style.item}>{user.name}</td>
                <td className={style.item}>{user.email}</td>
                <td className={style.item}>{user.roles}</td>
            </tr>
        )
    }
}