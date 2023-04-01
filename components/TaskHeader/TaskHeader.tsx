import { User } from "firebase/auth";

import styles from "./TaskHeader.module.css";

function getFirstName(user: User) {
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

export default function TaskHeader({user, date}: TaskHeaderProps) {
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

	return (
		<div className={styles['c-task-header']}>
			<div className={styles['c-task-header__wrapper']}>
				<div className={styles['c-task-header__content']}>
					<div>
						<h2><span>Hey,</span> {getFirstName(user)}</h2>
            Today is {date.format('dddd, MMMM Do YYYY')}
					</div>
				</div>
			</div>
		</div>
	);
}

interface TaskHeaderProps {
  date: moment.Moment;
  user: User;
  selectedView: 'day' | 'week' | 'quarter';
}
