import {useSession} from 'next-auth/react'
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router'

import { useEffect } from 'react';

export default function Dashboard() {
    const session = useSession()
    const router = useRouter();

    useEffect(() => {
        handleRole()
    }, [])

    const handleRole = () => {
        if( session?.data?.user?.role !== 'ADMIN'){
            router.push('/login')
        }
    }
    

  return (
    <div>dashboard</div>
  )
}
