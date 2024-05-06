


const Card = ({ title, description, price, id }) => {
    return (
        <>
            <article id={id} className="flex flex-col bg-slate-400 w-40 items-center p-2 ">
                <div className="w-28 bg-slate-800 block h-16"></div>
                <h2 className="mt-2">Nombre: {title}</h2>
                <p className="mt-2">Descripción: {description}</p>
                <p className="mt-2">Precio: {price}</p>
            </article>
        </>
    )
}

export default Card
