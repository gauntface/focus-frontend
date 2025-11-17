import type { NextPage } from "next";
import { parseISO } from "date-fns";

import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

import {
	DailyPriority,
	getDailyPriorities,
	setDailyPriorities,
} from "../../../src/models/priorities";
import { getDailyNotes, setDailyNotes } from "../../../src/models/notes";
import { withAuth } from "../../../src/utils/wrapWithAuthWaiting";
import { Footer } from "../../components/Footer/Footer";
import { TaskHeader } from "../../components/TaskHeader/TaskHeader";
import { DayTasks } from "../../components/DayTasks/DayTasks";
import { QuarterTracker } from "../../components/QuarterTracker/QuarterTracker";
import { LayoutFullHeight } from "../../components/LayoutFullHeight/LayoutFullHeight";
import { DelayAPI } from "../../../src/utils/useDelayedState";

const Day: NextPage = () => {};

export default withAuth(Day);
