import styles from "./DefaultLayout.module.css";

import { User } from "firebase/auth";

import { Footer } from '../Footer/Footer';
import { TaskHeader } from '../../components/TaskHeader/TaskHeader';

export function DefaultLayout(props: Props) {
	return <>
		<div className={styles['l-default']}>
			<div className={styles['l-default__header']}>
				<TaskHeader user={props.user} date={props.date} selectedView='day' />
			</div>
			<main className={styles['l-default__main']}>{props.children}</main>
			<Footer />
		</div>
	</>;
}

interface Props {
  children: React.ReactNode;
	spinning: boolean;
	title: string;
	subtitle?: string;
  date: moment.Moment;
  user: User;
}
