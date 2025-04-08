// import style from './App.module.css'
import { Menu } from './components/menu'
import  Contact from './Contact'
// import rj from './assets/images/rj.png'
import { cards } from './assets/mock/card'
import style from './App.module.css'
import { useState } from 'react'


export default function App() {
  const defaultPhoneNumber = '5541999999999'

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData({...formData, [name]: value})
  }
  
  const handleZap = () =>{
    const {name, email, message} = formData;

    const urlZap = `https://api.whatsapp.com/send?phone=${defaultPhoneNumber}&text=
    Nome:%20${name}%0D%0A
    Email:%20${email}%0D%0A
    Mensagem:%20${message}%0D%0A`

    window.open(urlZap, "_blank")
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <>

     <Menu option01='sessão 1' option02='sessão 2' option03='contato' ></Menu>

     <main>
      <section id='s1' className={style.s1}>
      <h2>sessão 1</h2>
      {/* <img src={rj} alt="rio" /> */}
      {cards.map((item, index) => {
        return(
          <div key={index}>
            <h5>{item.text}</h5>
            <img src={item.img} alt={item.text} width={200} height={"auto"}/>
          </div>
        )
})}
      </section>

      <section id='s2'>
      <h2>sessão 2</h2>
      <br/>
      <input placeholder="Insira seu nome"  type="text" id='name' name='name' value={formData.name} onChange={handleChange} required/>
      <input placeholder="Insira seu email" type="text" id='email' name='email' value={formData.email} onChange={handleChange} required/>
      <textarea placeholder="Insira mensagem" type="text" id='message' name='message' value={formData.message}  onChange={handleChange} required></textarea>
     <button onClick={handleZap}>Enviar Mensagem</button>
      </section>

      <section id='s3'>
      <h2>sessão 3</h2>
      </section>
     </main>
    </>
  )
}