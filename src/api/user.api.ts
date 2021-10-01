const HOST = import.meta.env.VITE_HOST_URL || ""

const logged = async () => {
  try {
    
    const res = await fetch(`${HOST}/api/auth/logged`, {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    });

    const resJSON = await res.json()

    if (res.ok) 
      return resJSON
    else {
      throw {message: resJSON.message}
    }

  } catch (err) {
    throw err
  }
}

const getUserByUsername = async (username) => {
  try {
    
    const res = await fetch(`${HOST}/api/user/username/${username}`, {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    });

    const resJSON = await res.json()

    if (res.ok) 
      return resJSON
    else {
      throw {message: resJSON.message}
    }

  } catch (err) {
    throw err
  }
}

const getUserByEmail = () => {
  var controller = new AbortController();
  var fetching = false

  return {
    abort: () => {
      if (fetching) {
        controller.abort()
      }
    },
    ready: async (email) => {
      try {
        controller = new AbortController();
        fetching = true
        console.log('=> start fetch');
        
        const res = await fetch(`${HOST}/api/user/email/${email}`, {
          signal: controller.signal,
          method: 'GET',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'}
        });

        const resJSON = await res.json()

        if (res.ok) 
          return resJSON
        else {
          throw {message: resJSON.message}
        }

      } catch (err) {
        throw err
      } finally {
        fetching = false
      }
    }
  }
}

const getUserByPhone = () => {
  var controller = new AbortController();
  var fetching = false

  return {
    abort: () => {
      if (fetching) {
        controller.abort()
      }
    },
    ready: async (phone) => {
      try {
        controller = new AbortController();
        fetching = true
        
        const res = await fetch(`${HOST}/api/user/phone/${phone}`, {
          signal: controller.signal,
          method: 'GET',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'}
        });

        const resJSON = await res.json()

        if (res.ok) 
          return resJSON
        else {
          throw {message: resJSON.message}
        }

      } catch (err) {
        throw err
      } finally {
        fetching = false
      }
    }
  }
}

const signup = async (data) => {
  try {
    
    const res = await fetch(`${HOST}/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        name : data.name,
        password : data.password,
        email : data.email,
        phone : data.phone,
        birthday : data.birthday
      }),
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    });

    const resJSON = await res.json()

    if (res.ok) 
      return resJSON
    else {
      throw {message: resJSON.message}
    }

  } catch (err) {
    throw err
  }
}

const logout = async () => {
  try {
    
    const res = await fetch(`${HOST}/api/auth/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    });

    const resJSON = await res.json()

    if (res.ok) 
      return resJSON
    else {
      throw {message: resJSON.message}
    }

  } catch (err) {
    throw err
  }
}

const login = async (data) => {
  try {
    
    const res = await fetch(`${HOST}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        username : data.username,
        password : data.password
      }),
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    });

    const resJSON = await res.json()

    if (res.ok) 
      return resJSON
    else {
      throw {message: resJSON.message}
    }

  } catch (err) {
    throw err
  }
}

const getRandomUser = async () => {
  try {
    
    const res = await fetch(`${HOST}/api/user/rand/3`, {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    });

    const resJSON = await res.json()

    if (res.ok) 
      return resJSON
    else {
      throw {message: resJSON.message}
    }

  } catch (err) {
    throw err
  }
}

const getTypeFriend = async (id) => {
  try {
    
    const res = await fetch(`${HOST}/api/friendships/type/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    });

    const resJSON = await res.json()

    if (res.ok) 
      return resJSON
    else {
      throw {message: resJSON.message}
    }

  } catch (err) {
    throw err
  }
}

export default {
  logged,
  getUserByUsername,
  getUserByEmail,
  getUserByPhone,
  signup,
  logout,
  login,
  getRandomUser,
  getTypeFriend
}