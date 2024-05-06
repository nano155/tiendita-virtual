

const Input = ({type, name, onChange, value, onBlur, onFocus, nameL}) => {
  return (
    <div className="flex flex-col gap-2">
    <label htmlFor={name.toLowerCase()}>{nameL}</label>
    <input className="p-2 text-gray-800" id={name.toLowerCase()} type={type} name={name.toLowerCase()} onChange={onChange} value={value} placeholder={`Ingrese su ${nameL} `} onBlur={onBlur} onFocus={onFocus}/>       
    </div>
  )
}

export default Input

