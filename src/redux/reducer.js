const initialState = {
  user: {},
  ghost: {},
  house: {},
  owner: {}
}
const LOGGED_IN = 'LOGGED_IN',
      LOGGED_OUT = 'LOGGED_OUT',
      GET_GHOST = 'GET_GHOST',
      GET_HOUSE = 'GET_HOUSE',
      GET_OWNER = 'GET_OWNER',
      GET_USER = 'GET_USER'

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, user: action.payload }
    case LOGGED_OUT:
      return {...state, user: {}}
    case GET_GHOST:
      return {...state, ghost: action.payload}
    case GET_HOUSE:
      return {...state, house: action.payload}
    case GET_OWNER:
      return {...state, owner: action.payload}
    case getUser:
      return {...state, user: action.payload}
    default:
      return { ...state }
  }
}
export function logIn (user) {
  // console.log(user, 'HEY IM A USER AS;DJFHLJKASFHLJKASHDFKJH')
  return {
    type: LOGGED_IN,
    payload: user
  }
}
export function logOut (user) {
  return {
    type: LOGGED_OUT
  }
}

export function getGhost (ghost) {
  return {
    type: GET_GHOST,
    payload: ghost
  }
}

export function getHouse (house) {
  return {
    type: GET_HOUSE,
    payload: house
  }
}

export function getOwner (owner) {
  return {
    type: GET_OWNER,
    payload: owner
  }
}

export function getUser (user) {
  return {
    type: GET_USER,
    payload: user
  }
}
