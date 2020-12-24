import { Button, Card, CardContent, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import PublishIcon from '@material-ui/icons/Publish';
import jwtDecoder from 'jwt-decode'
import Axios from 'axios';
import BackupIcon from '@material-ui/icons/Backup';


const Create = () => {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [about, setAbout] = useState('')
const [validity, setValidity] = useState('')

const [error, setError] = useState({})


  const submitHandler = (event) => {
    event.preventDefault()
    if(new Date(validity)>new Date( Date.now())){
      axios.post('/api/client/create',{name, email, about , validity})
      .then(res=>{
        window.location.href='/manage-users'
      })
      .catch(err=>{
        setError(err.response.data)
      })
    }else{
      alert('Invalid Date . The date should be greater than the current date!')
    }
  }
  return (
    <>
      <div className="row pt-3 pb-5 ">
        <div className="col-md-6 offset-md-3 mt-5">
          <form onSubmit={e => submitHandler(e)}>
            <h3 className="mt-3 mb-5">Create New Client</h3>
            <hr/>
            {
              error.message? 
              <p className="text-danger text-center" style={{fontWeight:'700'}}> {error.message} </p>:''
            }
            <label className="label">Name </label>
            <input onChange={e => { setName(e.target.value) }} required className="form-control mb-3" placeholder="Enter Name " />

            <label className="label">Email </label>
            <input type="email" onChange={e => { setEmail(e.target.value) }} required className="form-control mb-3" placeholder="Enter Email" />

            <label className="label">About text</label>
            <textarea
              placeholder="About  This Client "
              className="form-control mb-3"
              rows="3"
              required
              maxLength="40"
              onChange={e => { setAbout(e.target.value) }}
            />

            <label className="label">Validity </label>
            <input type="date" required onChange={e => { setValidity(e.target.value) }} className="form-control mb-3" />

            <div className="page-footer">
              <button type="submit" className="btn save-style" onClick={e => { }} >Create</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Create
