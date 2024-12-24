import AuthLayout from "@/components/AuthLayout/authLayout"
import SignUp from "@/components/SignUp/signUp"
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
      <SignUp />
      <AuthLayout />
    </div>
  )
}
