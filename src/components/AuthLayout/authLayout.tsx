import { Flex } from '@chakra-ui/react'
import styles from './authLayout.module.css'

export default function AuthLayout() {
  return (
    <Flex flexDirection={"column"} justifyContent={"space-between"} backgroundColor={"#f5f5f5"} paddingY={"1rem"} paddingX={"2.5rem"} height={"100vh"}>
      <span className={styles.title}>App</span>
      <footer className={styles.footer}>
        &copy; Desenvolvido por Gabriela França - {new Date().getFullYear()}
      </footer>
    </Flex>
  )
}