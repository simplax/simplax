import React, { useState, useEffect } from "react";
import api from "../api";

export default function Save({ modifiedEffects, likedEffects, onSave }) {

  const [title, setTitle] = useState('')


  function handleChange(e) {
    setTitle(e.target.value)

  }

  let data = { _owner: api.getLocalStorageUser(), title: title, modifiedEffects: modifiedEffects, likedEffects: likedEffects }

  return (
    <div>
      <button className='btn btn-info' onClick={e => onSave(data)}>save</button>
      <input type="text" onChange={e => handleChange(e)} placeholder={'name me!'} />
    </div>
  )
}