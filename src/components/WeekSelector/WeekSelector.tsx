import { Link } from '@tanstack/react-router'
import { add, format, getWeek, getWeekYear, sub } from 'date-fns'

import styles from './WeekSelector.module.css'

export function WeekSelector({ date }: Props) {
  const prevWeek = sub(date, { weeks: 1 })
  const nextWeek = add(date, { weeks: 1 })

  return (
    <div className={styles['c-ws']}>
      <Link
        className={styles['c-ws__left']}
        to={`/week/${getWeekYear(prevWeek)}/${getWeek(prevWeek)}`}
        aria-label="Previous week"
      >
        <img width="8" height="14" src="/icons/arrow.svg" alt="Left arrow" />
      </Link>
      {format(nextWeek, 'MMMM yyyy')} - Week {getWeek(date)}
      <Link
        className={styles['c-ws__right']}
        to={`/week/${getWeekYear(nextWeek)}/${getWeek(nextWeek)}`}
        aria-label="Next week"
      >
        <img width="8" height="14" src="/icons/arrow.svg" alt="Right arrow" />
      </Link>
    </div>
  )
}

interface Props {
  date: Date
}
