const initialState = {
  user: {},
  ghostProfile: {}
}
const LOGGED_IN = 'LOGGED_IN',
      LOGGED_OUT = 'LOGGED_OUT',
      GET_GHOST_PROFILE = 'GET_GHOST_PROFILE'

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, user: action.payload }
    case LOGGED_OUT:
      return {...state, user: {}}
    case GET_GHOST_PROFILE:
      return {...state, ghostProfile: action.payload}
    default:
      return { ...state }
  }
}
export function logIn(user) {
  return {
    type: LOGGED_IN,
    payload: user
  }
}
export function logOut(user) {
  return {
    type: LOGGED_OUT
  }
}

export function getGhostProfile (ghostProfile) {
  return {
    type: GET_GHOST_PROFILE,
    payload: ghostProfile
  }
}