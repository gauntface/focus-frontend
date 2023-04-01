import styles from "./DefaultLayout.module.css";

import Link from 'next/link';
import { User } from "firebase/auth";

import Footer from '../Footer/Footer';
import TaskHeader from '../../components/TaskHeader/TaskHeader';

export default function DefaultLayout(props: Props) {
	return <>
		<TaskHeader user={props.user} date={props.date} selectedView='day' />

		<div className={styles['l-default']}>
			<div className={styles['l-default__loading']}>
			</div>

			<header className={styles['l-default__header']}>
				<Link href="/" className={styles['l-default__home']}>
            Home
				</Link>
				<h1>{props.title}</h1>
				{props.subtitle && <h2>{props.subtitle}</h2>}
			</header>
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
