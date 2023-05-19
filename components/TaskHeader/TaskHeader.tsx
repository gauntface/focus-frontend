import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';

import styles from "./TaskHeader.module.css";

export function TaskHeader({user, date, selectedView}: TaskHeaderProps) {
	const views = [
		{
			text: 'Daily',
			img: (<Image width="28" height="28" src="/icons/day-view.svg" alt="Day view icon" />),
			view: 'day' as ViewSelection,
			link: '/home',
		},
		{
			text: 'Weekly',
			img: (<Image width="28" height="28" src="/icons/week-view.svg" alt="Week view icon" />),
			view: 'week' as ViewSelection,
			link: `/week/${date.year()}/${date.week()}`,
		},
		/* {
      text: 'Quarter',
      img: (<Image width="28" height="28" src="/icons/quarter-view.svg" alt="Quarter view icon" />),
      view: 'quarter',
    },*/
	];

	const viewIcons = [];
	for (const v of views) {
		const classes = [
			styles['c-task-header__task'],
		];
		if (v.view == selectedView) {
			classes.push(styles['c-task-header__task--selected']);
		}
		viewIcons.push(
			<div key={v.view}>
				<Link href={v.link} className={classes.join(' ')}>
					{v.img}
					{v.text}
				</Link>
			</div>
		);
	}

	const dh = dateHeading(selectedView, date);

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
						<div className={styles['c-task-header__tasks']}>
							{viewIcons}
						</div>
					</div>
				</div>
				<div className={styles['c-task-header__bg']}></div>
			</div>
		</div>
	);
}

function dateHeading(selectedView: ViewSelection, date: moment.Moment) {
	switch (selectedView) {
	case 'day':
		return date.format('dddd, MMMM Do YYYY');
	case 'week': {
		const start = moment(date.startOf('week')).add(1, 'd');
		const end = moment(date.endOf('week')).subtract(1, 'd');
		return `${start.format('MMMM Do YYYY')} - ${end.format('MMMM Do YYYY')}`;
	}
	}
}

function getFirstName(user: TaskHeaderUser|null) {
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

function getIntro(user: TaskHeaderUser|null) {
	const fn = getFirstName(user);
	if (!fn) {
		return (<></>);
	}
	return (
		<Link href="/home" className={styles['l-default__home']}><h2><span>Hey,</span> {fn}</h2></Link>
	);
}

export type ViewSelection = 'day' | 'week'; // | 'quarter';

interface TaskHeaderProps {
  date: moment.Moment;
  user: TaskHeaderUser|null;
  selectedView: ViewSelection;
}

interface TaskHeaderUser {
	displayName: string | null;
}

function assertUnreachable(x: never): never {
	throw new Error("Didn't expect to get here");
}
