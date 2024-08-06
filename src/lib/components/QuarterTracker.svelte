<script lang="ts">
  import { differenceInCalendarWeeks, endOfQuarter, format, getQuarter, startOfQuarter } from "date-fns";

  export let date: Date;

  function progressDetails(dayViewed: Date) {
    const start = startOfQuarter(dayViewed);
    const end = endOfQuarter(dayViewed);
    const weeks = differenceInCalendarWeeks(end, start);
    const currentWeek = differenceInCalendarWeeks(dayViewed, start);
    return {
      percentage: Math.round((currentWeek / weeks) * 100),
      weeksInQuarter: weeks,
      currentWeek,
    };
  }

  let progress = progressDetails(date);

</script>

<div class="c-qt">
  <div>Progress in Q{getQuarter(date)} &apos;{format(date, 'yy')}</div>
  <div>{progress.currentWeek + 1} of {progress.weeksInQuarter}</div>
  <div class="c-qt__bar">
    <div class="c-qt__prog" style="width: {progress.percentage}%;"></div>
  </div>
</div>

<style>
.c-qt {
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-rows: repeat(2, 1fr);
	width: var(--width);
	margin: auto;
	font-weight: bold;
	gap: var(--xxs-padding);
	text-align: left;
	font-size: var(--xs-padding);
}

.c-qt__bar {
	width: 100%;
	height: 4px;
	border-radius: 4px;
	background-color: var(--pink);
	position: relative;
	grid-area: 2 / 1 / 3 / 3;
}

.c-qt__prog {
	height: 4px;
	border-radius: 4px;
	position: absolute;
	top: 0;
	left: 0;
	background-color: var(--orange);
}
</style>
