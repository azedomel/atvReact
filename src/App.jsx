// import style from './App.module.css'
import { Menu } from './components/menu'
import  Contact from './Contact'


export default function App() {

  return (
    <>
  
     <Menu option01='sessão 1' option02='sessão 2' option03='contato' ></Menu>
     <main>
      <section id='s1'>
      <h2>sessão 1</h2>
      </section>

      <section id='s2'>
      <h2>sessão 2</h2>
      </section>

      <section id='s3'>
      <h2>sessão 3</h2>
      </section>
     </main>
    </>
  )
}