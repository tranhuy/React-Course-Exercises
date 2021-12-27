const InputWithReset = ({type, value, onChange, reset}) => {
   return (
       <>
           <input type={type} value={value} onChange={onChange} />
       </>
   )
}

export default InputWithReset