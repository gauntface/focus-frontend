import { useAuth } from '../../contexts/Auth'
import styles from './MarketingNav.module.css'
import { SignInButton } from '../SignInButton/SignInButton'

import { Link } from '@tanstack/react-router'

export function MarketingNav() {
  const { user } = useAuth()
  let taskBtn
  let modifer
  if (user && user.email) {
    taskBtn = (
      <Link href="/home">
        <button>Tasks</button>
      </Link>
    )
    modifer = 'subtle'
  }

  return (
    <section className={styles['c-mkt-nav']}>
      <Link to="/">
        <img
          width="48"
          height="48"
          src="/logo/mini-logo.svg"
          alt="Small Focus Logo"
        />
      </Link>

      <div className={styles['c-mkt-nav__menu']}>
        <SignInButton classModifier={modifer} />
        {taskBtn}
      </div>
    </section>
  )
}
