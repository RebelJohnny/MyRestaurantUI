import { Box } from '@mui/material'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

const DRAWER = 272
const MINI = 80

export default function Layout({ children, dark, setDark, collapsed, setCollapsed }) {
  const w = collapsed ? MINI : DRAWER

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: dark ? '#0f172a' : '#f1f5f9' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} dark={dark} setDark={setDark} />
      <Box sx={{
        mr: `${w}px`, width: `calc(100% - ${w}px)`,
        transition: 'margin-right 0.3s cubic-bezier(.4,0,.2,1)',
        display: 'flex', flexDirection: 'column', minHeight: '100vh',
      }}>
        <Header dark={dark} />
        <Box sx={{ flex: 1, px: 3, py: 2 }}>{children}</Box>
        <Footer dark={dark} />
      </Box>
    </Box>
  )
}
