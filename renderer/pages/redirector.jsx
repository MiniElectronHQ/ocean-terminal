import { useEffect } from 'react'
import { useRouter } from 'next/router'

function Redirector() {
  const router = useRouter()

  useEffect(() => {
    router.push(router.query.name)
  })
}

export default Redirector
