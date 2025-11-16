import { useAuth } from '../contexts/Auth'
import { LayoutFullHeight } from '../components/LayoutFullHeight/LayoutFullHeight'
import { Loading } from '../components/Loading/Loading'

import styles from '../styles/layouts/l-auth.module.css'
import { useRouter } from '@tanstack/react-router'
import type { ReactNode } from 'react'

export function withAuth<P extends object>(Component: ReactNode<P>) {
  const Auth = (props: P) => {
    const { user, loading } = useAuth()
    const router = useRouter()

    if (loading) {
      return (
        <LayoutFullHeight>
          <main className={styles['l-auth__loading']}>
            <Loading />
          </main>
        </LayoutFullHeight>
      )
    }

    if (!user) {
      router.push('/')
      return
    }

    return <Component {...(props as P)} />
  }

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps
  }

  return Auth
}
