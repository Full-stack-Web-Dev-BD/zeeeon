import React, { useEffect, useState } from 'react'
import axios from 'axios'
import qs from 'querystring'


const UpdateUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [about, setAbout] = useState('')
  const [validity, setValidity] = useState('')
  const [client, setClient] = useState({})
  const [error, setError] = useState({})

  useEffect(() => {
    let obj = qs.parse(window.location.search)

    axios.get(`/api/client/get-single/${obj.id}`)
      .then(res => {
        setName(res.data.name)
        setEmail(res.data.email)
        setAbout(res.data.about)
        setValidity(res.data.validity)
        setClient(res.data)
      })
  }, [])

  const submitHandler = (event) => {
    event.preventDefault()
    if (new Date(validity) > new Date(Date.now())) {
      axios.post(`/api/client/update/${client._id}`, { name, email, about, validity })
        .then(res => {
          window.location.href = '/manage-users'
        })
        .catch(err => {
          setError(err.response.data)
        })
    } else {
      alert('Invalid Date . The date should be greater than the current date!')
    }
  }
  return (
    <>
      <div className="row pt-3 pb-5 ">
        <div className="col-md-6 offset-md-3 mt-5">
          <form style={{ padding: "0 30px" }} onSubmit={e => submitHandler(e)}>
            <h3 className="mt-3 mb-5">Create New Client</h3>
            <hr />
            {
              error.message ?
                <p className="text-danger text-center" style={{ fontWeight: '700' }}> {error.message} </p> : ''
            }
            <label className="label">Name </label>
            <input value={name} onChange={e => { setName(e.target.value) }} required className="form-control mb-3" placeholder="Enter Name " />

            <label className="label">Email </label>
            <input value={email} type="email" onChange={e => { setEmail(e.target.value) }} required className="form-control mb-3" placeholder="Enter Email" />

            <label className="label">About text</label>
            <textarea
              value={about}
              placeholder="About  This Client "
              className="form-control mb-3"
              rows="3"
              required
              maxLength="40"
              onChange={e => { setAbout(e.target.value) }}
            />

            <label className="label">Validity </label>
            <input value={validity} type="date" required onChange={e => { setValidity(e.target.value) }} className="form-control mb-3" />

            <div className="page-footer">
              <button type="submit" className="btn save-style" onClick={e => { }} >Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateUser
