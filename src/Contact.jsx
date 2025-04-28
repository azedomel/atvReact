import style from './Contact.module.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import menuStyle from './components/menu.module.css';
import { Menu } from './components/menu';
import React, { useEffect, useState, useMap } from 'react';
import { Loading } from './components/spinner';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

export default function Contact (){
  const [cep, setCep] = useState("")
  const [lat, setLat] = useState("-25.4216311")
  const [ing, setIng] = useState("-49.2732416")
  const [loading, setLoading] = useState(false)
  const [bairro, setBairro]= useState("")
  const [rua, setRua] = useState("")
  const [estado, setEstado] = useState("")
  const [localidade, setLocalidade] = useState("")

    const position = [lat, ing];

    function handleCep(e){
      setCep(e.target.value)
    }

    function ChangeView ({center}){
      const map = useMap();
      map.setView(center, 15);
      return null;
    }

    useEffect(()=>{
      const santizedCep = cep.replace(/\D/g, "")
      if(santizedCep.length !== 8) return; 
      setLoading(true)

      fetch(`https://viacep.com.br/ws/${santizedCep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if(data.erro){
          console.warn("cep nao encontrado")
            setLoading(false)
            return;
        }
          const { logradouro, localidade, uf, bairro, estado } = data;
          setBairro(bairro)
          setRua(logradouro)
          setEstado(estado)
          setLocalidade(localidade)
          const address = `${logradouro ? logradouro + ', ' : ''}${localidade}, ${uf}`

          fetch(`https://nominatim.openstreemap.org/search?format=json&q=${encodeURIComponent(address)}`)
          .then((response) => response.json())
          .then((LocationData) => {

            if(LocationData.length > 0){
              const { lat, ing} = LocationData[0]
              setLat(parseFloat(lat))
              setIng(parseFloat(ing))
            }else {
              console.warn("Coordenadas não encontradas")
            }    
          }).catch(error =>{
            console.error("erro ao buscar coordenadas:", error)
          });
          setLoading(false)
      }). catch(error => { 
        console.error("erro ao buscar CEP: ", error)
        setLoading(false)
      })

    }, [cep])

    

     
    return(
        <>
        <Menu option01={<a href="/" className={menuStyle.navLink}>Voltar à página principal</a>}/>
       
        <section className={style.mapSection}>
      <h2 className={style.tt}>Onde me encontrar:</h2>
      <input type="text"placeholder="insira o cep" onChange={handleCep} />
      {bairro} - {rua} - {estado} - {localidade}
      <br/>
      {loading ? <Loading/> : <MapContainer
          center={position}
          zoom={12}
          scrollWheelZoom={true}
          style={{ width: '90vw', height: '700px'}}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup><a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1$query${lat},${ing}`}>Abrir no google maps</a></Popup>
          </Marker>
        </MapContainer>}
        </section>
        </>
    )
}