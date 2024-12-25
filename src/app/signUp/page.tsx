import AuthLayout from "@/components/AuthLayout/authLayout"
import SignUpForm from "@/components/SignUpForm/signUpForm"
import styles from './signUp.module.css'

export default function SignUp() {
  return (
    <div className={styles.signUp}>
      <SignUpForm />
      <AuthLayout />
    </div>
  )
}