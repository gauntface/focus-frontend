import { Link } from '@tanstack/react-router'

import {
  startOfWeek,
  endOfWeek,
  add,
  sub,
  format,
  getWeek,
  getYear,
} from 'date-fns'

import styles from './TaskHeader.module.css'

export function TaskHeader({ user, date, selectedView }: TaskHeaderProps) {
  const views = [
    {
      text: 'Daily',
      img: (
        <img
          width="28"
          height="28"
          src="/icons/day-view.svg"
          alt="Day view icon"
        />
      ),
      view: 'day' as ViewSelection,
      link: '/home',
    },
    {
      text: 'Weekly',
      img: (
        <img
          width="28"
          height="28"
          src="/icons/week-view.svg"
          alt="Week view icon"
        />
      ),
      view: 'week' as ViewSelection,
      link: `/week/${getYear(date)}/${getWeek(date)}`,
    },
    /* {
      text: 'Quarter',
      img: (<img width="28" height="28" src="/icons/quarter-view.svg" alt="Quarter view icon" />),
      view: 'quarter',
    },*/
  ]

  const viewIcons = []
  for (const v of views) {
    const classes = [styles['c-task-header__task']]
    if (v.view == selectedView) {
      classes.push(styles['c-task-header__task--selected'])
    }
    viewIcons.push(
      <div key={v.view}>
        <Link to={v.link} className={classes.join(' ')}>
          {v.img}
          {v.text}
        </Link>
      </div>,
    )
  }

  const dh = dateHeading(selectedView, date)

  // TODO: Should find a better way to provide a link to the home page
  return (
    <div className={styles['c-task-header']}>
      <div className={styles['c-task-header__wrapper']}>
        <div className={styles['c-task-header__content']}>
          <div>
            {getIntro(user)}
            {dh}
          </div>

          <div className={styles['c-task-header__view-section']}>
            How do you like to view your tasks?
            <div className={styles['c-task-header__tasks']}>{viewIcons}</div>
          </div>
        </div>
        <div className={styles['c-task-header__bg']}></div>
      </div>
    </div>
  )
}

function dateHeading(selectedView: ViewSelection, date: Date) {
  switch (selectedView) {
    case 'day':
      return format(date, 'EEEE, MMMM do yyyy')
    case 'week': {
      const start = add(startOfWeek(date), { days: 1 })
      const end = sub(endOfWeek(date), { days: 1 })
      return `${format(start, 'MMMM do yyyy')} - ${format(end, 'MMMM do yyyy')}`
    }
  }
}

function getFirstName(user: TaskHeaderUser | null) {
  if (!user || !user.displayName) {
    return ''
  }

  let name = user.displayName
  const parts = name.split(' ')
  if (parts) {
    name = parts[0]
  }
  return name
}

function getIntro(user: TaskHeaderUser | null) {
  const fn = getFirstName(user)
  if (!fn) {
    return <></>
  }
  return (
    <Link to="/home" className={styles['l-default__home']}>
      <h2>
        <span>Hey,</span> {fn}
      </h2>
    </Link>
  )
}

export type ViewSelection = 'day' | 'week' // | 'quarter';

interface TaskHeaderProps {
  date: Date
  user: TaskHeaderUser | null
  selectedView: ViewSelection
}

interface TaskHeaderUser {
  displayName: string | null
}
