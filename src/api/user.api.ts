const logged = async () => {
  try {
    return ({
      id: 14297252630,
      email: 'viet.hung.2898@gmail.com',
      username: 'VietHung413313',
      phone: '0399633237',
      color: 'violet',
      realName: 'Việt Hùng',
      create_at: Date.now()
    })
  } catch (err) {
    throw err
  }
}

const getUserById = async (username) => {
  try {
    return ({
      id: 14297252630,
      email: 'viet.hung.2898@gmail.com',
      username: 'VietHung413313',
      phone: '0399633237',
      realName: 'Việt Hùng',
      create_at: Date.now()
    })
  } catch (err) {
    throw err
  }
}

export default {
  logged,
  getUserById
}