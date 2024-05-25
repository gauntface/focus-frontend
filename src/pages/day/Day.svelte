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

  const setPriorities = debounce(async (toastNumber: number) => {
    console.log(`Doing API call`);
      await setDailyPriorities($userStore, date, priorities);
      toast.pop(toastNumber);
    }, 2000);

  function onPriorityChange(idx: number, s: string) {
    priorities[idx].note = s;
    console.log(`onPriorityChange: ${idx} ${s}`);
    const number = toast.push('hello world', {
      // Toast can only be dismissed programatically
      initial: 0,
      dismissable: false
    });
    setPriorities(number);
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

</style>
