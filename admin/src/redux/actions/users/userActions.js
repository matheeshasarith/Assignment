import axios from 'axios'

// import { useState, } from 'react'
import React, {useState} from "react"

import {
  
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,

  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS

  //USER_DETAILS_RESET,

} from '../../constants/users/userConstants'


export const loginNext = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }


    const { data } = await axios.post(
      '/api/users/loginNext', 
      { email, password }, 
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: 
      
      error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const registerUser = (name, email, password, address, contactNo) => async (dispatch) => {

  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
       
      }
    }

    const { data } = await axios.post(
      'api/users',
      { name, email, password, address, contactNo },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  //dispatch({ type: USER_DETAILS_RESET })
  document.location.href = '/login'
}

