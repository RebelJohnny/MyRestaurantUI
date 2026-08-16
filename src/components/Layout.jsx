import { useState } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

const DRAWER = 272
const MINI = 80

export default function Layout({ children, dark, setDark, collapsed, setCollapsed }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const w = collapsed ? MINI : DRAWER

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: dark ? '#0f172a' : '#f1f5f9' }}>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        dark={dark}
        setDark={setDark}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <Box sx={{
        ml: isMobile ? 0 : `${w}px`,
        width: isMobile ? '100%' : `calc(100% - ${w}px)`,
        transition: 'margin-right 0.3s cubic-bezier(.4,0,.2,1)',
        display: 'flex', flexDirection: 'column', minHeight: '100vh',
      }}>
        <Header dark={dark} onMenuClick={() => setMobileOpen(true)} isMobile={isMobile} />
        <Box sx={{ flex: 1, px: { xs: 1.5, sm: 3 }, py: 2 }}>{children}</Box>
        <Footer dark={dark} />
      </Box>
    </Box>
  )
}
