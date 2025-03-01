import { useNavigate } from '@solidjs/router'
import { isTauri } from '@tauri-apps/api/core'

const Guard = () => {
  const navigate = useNavigate()
  if (isTauri()) navigate('/app')
  else navigate('/overlay')
  return <></>
}

export default Guard
