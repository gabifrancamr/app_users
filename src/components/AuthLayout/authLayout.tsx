import styles from './authLayout.module.css'

export default function AuthLayout() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>App</span>
      <footer className={styles.footer}>
        &copy; Desenvolvido por Gabriela França - {new Date().getFullYear()}
      </footer>
    </div>
  )
}