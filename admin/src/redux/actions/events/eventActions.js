import axios from 'axios'
import {

  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAIL

} from '../../constants/events/eventConstants'
import { logout } from '../../actions/users/userActions'

export const listEvents = (keyword = '', pageNumber = '') => async (
  dispatch, getState
) => {
  try {
    dispatch({ type: EVENT_LIST_REQUEST })

    const config = {
      headers: {
        'X-Api-Key': '+gCAK9aqlI5sJ/5Y1goIog==hRWSuqDJxfSVIxWb'
      }
    }
    
      const { data } = await axios.get(`https://api.api-ninjas.com/v1/animals?name=shark`, config)

      dispatch({
        type: EVENT_LIST_SUCCESS,
        payload: data
      })
   

  } catch (error) {

    const message = error.response && error.response.data.message ? error.response.data.message : error.message

    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }

    dispatch({
      type: EVENT_LIST_FAIL,
      payload: message
    })
  }
}
