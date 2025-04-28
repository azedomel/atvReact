import style from '../Req.module.css'
export const ModalInfo = ({data, close}) =>{
    return(
        <div className={style.modalPop}>
            <button onClick={close}>❌</button>
            <img src={data.image} alt={data.name}/>
            <h1><strong>Name:</strong>{data.name}</h1>
            <p><strong>Status:</strong>{data.status}</p>
            <p><strong>Origin:</strong>{data.origin.name}</p>
            <p><strong>Species:</strong>{data.species}</p>
            <p><strong>Gender:</strong>{data.gender}</p>
            <p><strong>Location:</strong>{data.location.name}</p>
            <p><strong>Created:</strong>{new Date(data.created).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "numeric",
                second: "numeric"
            })}</p>
        </div>
    )
}