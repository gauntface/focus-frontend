import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
	add,
	sub,
	startOfWeek,
	endOfWeek,
	parse,
	getYear,
	getWeek,
} from "date-fns";
import { useEffect, useState } from "react";
import {
	DatePriorities,
	getPrioritiesForDates,
} from "../../../../src/models/priorities";
import { withAuth } from "../../../../src/utils/wrapWithAuthWaiting";
import { WeekTasks } from "../../../components/WeekTasks/WeekTasks";
import { useAuth } from "../../../contexts/Auth";
import { WeekSelector } from "../../../components/WeekSelector/WeekSelector";
import { Footer } from "../../../components/Footer/Footer";
import { TaskHeader } from "../../../components/TaskHeader/TaskHeader";
import { QuarterTracker } from "../../../components/QuarterTracker/QuarterTracker";
import { LayoutFullHeight } from "../../../components/LayoutFullHeight/LayoutFullHeight";

const Week: NextPage = () => {};

export default withAuth(Week);
