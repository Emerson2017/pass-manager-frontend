import Head from 'next/head';
import Link from 'next/link'
import Image from 'next/image'
import stylesHome from '../styles/pageHome.module.css';
import ImageBanner from '../public/resources/images/image1.png'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pass Manager</title>
      </Head>

      <header className={stylesHome.header}> 
        <div className={stylesHome.actions}>

          <button className={stylesHome.action}>
            <Link href='/Login'>Login</Link>
          </button>

          <button className={stylesHome.action}>
            <Link href='/Register'>Register</Link>
          </button>
        </div>
      </header>
      <main className={stylesHome.main}>
        <section>
          <div className={stylesHome.containerBanner}>
            <p className={stylesHome.textBanner}>Pass Manager</p>
            <Image
              src={ImageBanner}
              width={300}
              height={300}
              alt="Pass Manager"
            />
          </div>
        </section>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        header {
          display: flex,
          flex-direction: row
        }

        a {
          text-decoration: none
        }

      `}</style>
    </div>
  );
}
