<script lang="ts">
  import LayoutFullHeight from "../../common/components/layouts/LayoutFullHeight.svelte";
  import SignedIn from "../../common/components/auth/SignedIn.svelte";
  import TaskHeader from "./components/TaskHeader.svelte";
  import QuarterTracker from "./components/QuarterTracker.svelte";
  import DayTasks from "./components/DayTasks.svelte";
  import {userStore} from "../../common/auth/auth";
  import { getDailyPriorities, type DailyPriority } from "../../models/priorities";
  import { getDailyNotes } from "../../models/notes";
  import type { User } from "firebase/auth";

  // TODO: Get date from url parameter
  let date = new Date();
  let priorities: Array<DailyPriority> = getEmptyPriorities();
  let note: string = "";
  let loading = true;

  function onNoteChange(n: string) {
    note = n;
  }

  function onPriorityChange(idx: number, s: string) {
    priorities[idx].note = s;
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


<style>

</style>
