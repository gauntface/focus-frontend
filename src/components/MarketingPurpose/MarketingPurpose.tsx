import styles from './MarketingPurpose.module.css'

export function MarketingPurpose() {
  return (
    <div className={styles['c-mkt-purpose']}>
      <div className={styles['c-mkt-purpose--title']}>
        <div className={styles['c-mkt-purpose--icon']}>
          <img width="48" height="48" src="/marketing/goal.svg" alt="Goal" />
        </div>
        Clear Goals
      </div>
      <p>
        Set daily goals to focus and prioritize your day, moving you closer to
        your goals.
      </p>

      <div className={styles['c-mkt-purpose--title']}>
        <div className={styles['c-mkt-purpose--icon']}>
          <img
            width="48"
            height="48"
            src="/marketing/checklist.svg"
            alt="Check list"
          />
        </div>
        Don&apos;t Be Overwhelmed
      </div>
      <p>
        It&apos;s easy to become overwhelmed with an ever growing to-do list.
        Focusing one day at a time can help remove this risk.
      </p>

      <div className={styles['c-mkt-purpose--title']}>
        <div className={styles['c-mkt-purpose--icon']}>
          <img
            width="48"
            height="48"
            src="/marketing/checkmark.svg"
            alt="Check mark"
          />
        </div>
        Track Progress
      </div>
      <p>
        We all get asked what we&apos;ve been up, with Focus it&apos;s easy to
        share progress when you can get an overwiew of your week and months.
      </p>
    </div>
  )
}
