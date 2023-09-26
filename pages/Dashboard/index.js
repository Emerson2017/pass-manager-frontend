import Image from 'next/image'
import ImagePersona from '../../public/resources/images/new-user.jpeg'
import ImageCredentials from '../../public/resources/images/credentials.png'
import Link from 'next/link'

export default function Register() {

    return (
        <main>
            <div>
                <h2>Administrar Usuários</h2>

                <button>
                    <Link href='/Users'>
                            <Image
                            src={ImagePersona}
                            width={200}
                            height={200}
                            alt="Persona Image"
                        />
                    </Link>
                </button>
            </div>

            <div>
                <h2>Administrar Senhas</h2>
                <button>
                    <Link href='/Secrets'>
                            <Image
                            src={ImageCredentials}
                            width={200}
                            height={200}
                            alt="Persona Image"
                        />
                    </Link>
                </button>
            </div>

            <style jsx>{`
                main {
                    display: flex;
                    justify-content: space-around;
                    flex-direction: row;
                    align-items: center;
                    margin-top: 100px;
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

                button {
                    background-color: transparent;
                    border: none;
                }

            `}</style>
        </main>
    );
}