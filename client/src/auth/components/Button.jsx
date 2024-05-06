

const Button = ({nameButton, btnState}) => {
  return (
    <>
     <button className="p-1 bg-violet-950"  type="submit" disabled ={btnState} ><strong>{nameButton}</strong></button>
    </>
  )
}

export default Button
