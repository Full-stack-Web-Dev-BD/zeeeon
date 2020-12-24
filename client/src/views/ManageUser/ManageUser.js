import { Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Axios from 'axios';

import jwtDecoder from 'jwt-decode'




const ManageUser = () => {
  const [client, setClient] = useState([])
  const [backup, setBackup] = useState([])


  const getAll = () => {

    Axios.get(`/api/client/get-all`)
      .then(res => {
        setClient(res.data)
        setBackup(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }
  useEffect(() => {
    getAll()
  }, [])

  const deleteClient = (id) => {
    let con = window.confirm('Are you sure to delete ')
    if (!con) return
    Axios.get(`/api/client/delete/${id}`)
      .then(res => {
        getAll()
      })
      .catch(err => {
        console.log(err);
      })
  }
  const filterClient = (option) => {
    if (option.target.value === 'All') {
      return getAll()
    } else if (option.target.value === 'Active') {
      let filtered = backup.filter(el => new Date(el.validity) > new Date(Date.now()))
      setClient(filtered)
    } else if (option.target.value === 'Inactive') {
      let filtered = backup.filter(el => new Date(el.validity) < new Date(Date.now()))
      setClient(filtered)
    }

  }
  return (
    <>
      <div className="row pt-3 pb-5 bg-white ">
        <div className="col-md-10 offset-md-1">
          <div>
            <h1>Manage User</h1>
          </div>
          <div className="row mt-4 pt-5">
            <div className="col-md-6 text-left">
              <Typography > {client.length} Users</Typography>
            </div>
            <div className="col-md-3 "></div>
            <div className="col-md-3 text-right">
              <select className="form-control " onChange={e => filterClient(e)}>
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <table class="table mt-5">
              <thead>
                <tr className="noborder">
                  <th scope="col"></th>
                  <th scope="col"><p className="txt">NAME</p> </th>
                  <th scope="col"><p className="txt">EMAIL</p></th>
                  <th scope="col"><p className="txt">ABOUT</p></th>
                  <th scope="col"><p className="txt">STATUS</p></th>
                  <th scope="col"><p className="txt">ACTION</p></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  client.map(el => (
                    <tr>
                      <td className="lh5"></td>
                      <td className="lh5"> {el.name} </td>
                      <td className="lh5"> {el.email} </td>
                      <td className="lh5"> {el.about} </td>
                      <td className="lh5"> {new Date(el.validity) > new Date(Date.now()) ? <span className="active-status">Active</span> : <span className="inactive-status">Inactive</span>} </td>
                      <td className="lh5"> <button className="btn btn-danger" onClick={e => deleteClient(el._id)} > Delete </button> </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageUser
