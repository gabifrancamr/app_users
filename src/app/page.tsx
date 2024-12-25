import { Button } from "@/components/ui/button"
import Link from "next/link"
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
      <Link href="/signUp">
        <Button>Cadastrar</Button>
      </Link>
    </div>
  )
}
