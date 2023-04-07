import React from "react";


export function Key({ keyVal,onClick,disabled}) {
 const handleClick= () =>{
    onClick(keyVal.name);
 }
  return (
    <button className="key" disabled={disabled&&'disabled'} onClick={handleClick} >
      {keyVal.name} 
      
    </button>
  );
}
export default Key;
