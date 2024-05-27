<script lang="ts">
  import LayoutFullHeight from "../../common/components/layouts/LayoutFullHeight.svelte";
  import SignedIn from "../../common/components/auth/SignedIn.svelte";
  import TaskHeader from "./components/TaskHeader.svelte";
  import QuarterTracker from "./components/QuarterTracker.svelte";
  import DayTasks from "./components/DayTasks.svelte";
  import {userStore} from "../../common/auth/auth";
  import { getDailyPriorities, setDailyPriorities, type DailyPriority } from "../../models/priorities";
  import { getDailyNotes } from "../../models/notes";
  import type { User } from "firebase/auth";
  import {debounce} from "lodash-es";
  import { SvelteToast, toast} from '@zerodevx/svelte-toast';

  const DEBOUNCE_DURATION = 2000;

  // TODO: Get date from url parameter
  let date = new Date();
  let priorities: Array<DailyPriority> = getEmptyPriorities();
  let note: string = "";
  let loading = true;

  // Priotity toast options
  const priorityToastOptions = {

  };

  function onNoteChange(n: string) {
    note = n;
  }

  let toastID: number | undefined;
  const setPriorities = debounce(async () => {
    console.log(`Doing API call`);
      await setDailyPriorities($userStore, date, priorities);
      toast.pop(toastID);
      toastID = undefined;
    }, DEBOUNCE_DURATION);

  function onPriorityChange(idx: number, s: string) {
    priorities[idx].note = s;
    console.log(`onPriorityChange: ${idx} ${s}`);
    if (toastID === undefined) {
      toastID = toast.push('<div class="loader"></div> Saving tasks...', {
        // Toast can only be dismissed programatically
        dismissable: false,
        initial: 0,
        duration: DEBOUNCE_DURATION,
      });
    }
    setPriorities();
  }

  function getEmptyPriorities() {
    return [
      {
        note: '',
        order: 0,
      }, {
        note: '',
        order: 0,
      }, {
        note: '',
        order: 0,
      }
    ];
  }

  async function initialize(user: User | null) {
    if (!user) {
      return;
    }

    const [ps, ns] = await Promise.all([
      getDailyPriorities(user, date),
      getDailyNotes(user, date),
    ]);
    priorities = ps;
    note = ns;
    loading = false;
  }

  $: initialize($userStore);
</script>

<SignedIn>
  <LayoutFullHeight>
    <TaskHeader displayName={$userStore?.displayName || ""} date={date} selectedView="day" />
    <QuarterTracker date={date} />
    <main>
      <DayTasks priorities={priorities} note={note} loading={loading} onNoteChange={onNoteChange} onPriorityChange={onPriorityChange} />
    </main>
  </LayoutFullHeight>
</SignedIn>

<SvelteToast options={priorityToastOptions} />

<style>
:root {
  --toastContainerTop: auto;
  --toastContainerRight: var(--m-padding);
  --toastContainerBottom: var(--s-padding);
  --toastContainerLeft: auto;

  	/* The following vars are to alter toastify */
	--toastBackground: var(--pink);
	--toastColor: var(--navy);
}
</style>
