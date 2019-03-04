import React, { useState, useEffect } from "react";
import api from "../api";

export default function Load({ onLoad, saved }) {

  const [savedProfile, setSavedProfile] = useState([])

  const [title, setTitle] = useState('')

  useEffect(() => {
    api.getSavedProfile()
      .then(data => {
        setSavedProfile(data)
        setTitle(data[0]._id)


      })
  }, [])

  useEffect(() => {
    api.getSavedProfile()
      .then(data => {
        setSavedProfile(data)
      })
  }, [saved])



  return (

    < div >

      <select name="" id="" value={title} onChange={e => setTitle(e.target.value)}>
        {savedProfile.map((profile) => {
          return <option key={profile.title} value={profile._id}>{profile.title}</option>
        })}
      </select>
      <button className='btn btn-info' onClick={() => { onLoad(title) }}>load</button>

    </div >
  )



}