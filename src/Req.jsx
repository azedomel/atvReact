import { api } from './api/api';
import style from './Req.module.css'
import {useState, useEffect} from 'react';
import { Card } from './components/card';
import { ModalInfo } from './components/modalInfo';
import Tilt from 'react-parallax-tilt';
import { Menu } from './components/menu';
import menuStyle from './components/menu.module.css';
export default function Req(){
    const[data, setData] = useState([])
    const [page, setPage] = useState ("")
    const [searchName, setSearchName] = useState ("")
    const [modal, setModal] = useState()
    const [erro, setErro] = useState(false)

    useEffect(() => {
        api.get(`/character/?page=${page}&name=${searchName}`).then((response)=> {
                setData(response.data.results)
        }).catch((error) => {
            if(error.response.status === 404){
                setErro(true)
            }
            console.error(error)

        })
    }, [page,searchName])

    return(
        <>
        <Menu option01={<a href="/" className={menuStyle.navLink}>Inicio</a>}/>
        <section className={style.wrapPage}>
        {modal !== undefined && <ModalInfo data={data[modal]} close={() => setModal()}/>}
            <h1 className={style.titleName}> Rick and morty Api</h1>

            <input style={{padding: "10px", marginRight: "10px"}}type="text"placeholder='Digite um a pagina (1/42)' value={page} onChange={(e) => setPage(e.target.value)}/>
            <input type="text" placeholder='Digite um nome' value={searchName} onChange={(e) => setSearchName(e.target.value)}/>


            {erro && <p>Pagina nao encontrada</p>}

            <div className={style.wrapsCard}>
            {data.map((item,index) => {
                return(
                    <div key={(index)} style={{display: "flex", flexDirection: "column", gap: "2vh"}}>
                        <Tilt>
                        <Card name={item.name} image={item.image}/>
                        </Tilt>
                        {/* <img src={item.image} alt={item.name}/> */}
                        <button onClick={()=> {setModal(index)}}>info - {item.name}</button>
                    </div>
                )
            })}
            </div>
            </section>
        </>
    )
}