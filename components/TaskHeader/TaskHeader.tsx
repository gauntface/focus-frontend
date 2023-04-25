import Link from 'next/link';

import styles from "./TaskHeader.module.css";

export function TaskHeader({user, date}: TaskHeaderProps) {
	/* const views = [
    {
      text: 'Daily',
      img: (<Image width="28" height="28" src="/icons/day-view.svg" alt="Day view icon" />),
      selected: selectedView == 'day',
    },
    {
      text: 'Weekly',
      img: (<Image width="28" height="28" src="/icons/week-view.svg" alt="Week view icon" />),
      selected: selectedView == 'week',
    },
    {
      text: 'Quarter',
      img: (<Image width="28" height="28" src="/icons/quarter-view.svg" alt="Quarter view icon" />),
      selected: selectedView == 'quarter',
    },
  ];

  const viewIcons = [];
  for (const v of views) {
    const classes = [
      styles['c-task-header__task'],
    ];
    if (v.selected) {
      classes.push(styles['c-task-header__task--selected']);
    }
    viewIcons.push(
        <div className={classes.join(' ')}>
          {v.img}
          {v.text}
        </div>
    );
  }*/

	/*
  <div>
    How do you like to view your tasks?
    <div className={styles['c-task-header__tasks']}>
      {viewIcons}
    </div>
  </div>
  */

	// TODO: Should find a better way to provide a link to the home page
	return (
		<div className={styles['c-task-header']}>
			<div className={styles['c-task-header__wrapper']}>
				<div className={styles['c-task-header__content']}>
					{getIntro(user)}
					Today is {date.format('dddd, MMMM Do YYYY')}
				</div>
				<div className={styles['c-task-header__bg']}></div>
			</div>
		</div>
	);
}

function getFirstName(user: TaskHeaderUser) {
	if (!user || !user.displayName) {
		return '';
	}

	let name = user.displayName;
	const parts = name.split(' ');
	if (parts) {
		name = parts[0];
	}
	return name;
}

function getIntro(user: TaskHeaderUser) {
	const fn = getFirstName(user);
	if (!fn) {
		return (<></>);
	}
	return (
		<Link href="/home" className={styles['l-default__home']}><h2><span>Hey,</span> {fn}</h2></Link>
	);
}

interface TaskHeaderProps {
  date: moment.Moment;
  user: TaskHeaderUser;
  selectedView: 'day' | 'week' | 'quarter';
}

interface TaskHeaderUser {
	displayName?: string;
}