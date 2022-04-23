import React from 'react'
import "../styles/SelectButton.css"

const SelectButton = ({children, selected, onClick}) => {
  return(<span onClick={onClick} className='selectButton'>{children}</span>
  )
};

export default SelectButton