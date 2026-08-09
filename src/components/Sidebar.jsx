import { useLocation, useNavigate } from 'react-router'
import { Box, Typography, IconButton, Tooltip, Divider } from '@mui/material'
import { Dashboard, People, AccessTime, Restaurant, MenuBook, ChevronLeft, ChevronRight, DarkMode, LightMode, EventSeat } from '@mui/icons-material'

const DRAWER = 272
const MINI = 80

const menuItems = [
  { label: 'داشبورد', icon: <Dashboard />, path: '/dashboard' },
  { label: 'پرسنل', icon: <People />, path: '/personnel' },
  { label: 'وعده غذایی', icon: <AccessTime />, path: '/mealPeriod' },
  { label: 'غذا', icon: <Restaurant />, path: '/meal' },
  { label: 'منو', icon: <MenuBook />, path: '/menu' },
  { label: 'رزرو', icon: <EventSeat />, path: '/reserve' }
]

export default function Sidebar({ collapsed, setCollapsed, dark, setDark }) {
  const navigate = useNavigate()
  const loc = useLocation()
  const isActive = (p) => loc.pathname === p

  return (
    <Box sx={{
      width: collapsed ? MINI : DRAWER, height: '100vh', position: 'fixed', top: 0, left: 0,
      zIndex: 1100, display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(195deg, #1a1f3c 0%, #0f1225 100%)',
      transition: 'width 0.3s cubic-bezier(.4,0,.2,1)',
      boxShadow: '4px 0 30px rgba(0,0,0,0.12)',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', px: collapsed ? 1 : 2.5, py: 2.2, minHeight: 68 }}>
        {!collapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <Box sx={{ width: 38, height: 38, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
              <Restaurant sx={{ color: '#fff', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography sx={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>رستوران</Typography>
              <Typography sx={{ color: '#64748b', fontSize: '0.65rem' }}>پنل مدیریت</Typography>
            </Box>
          </Box>
        )}
        <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ color: '#94a3b8', '&:hover': { color: '#f1f5f9' } }}>
          {collapsed ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mx: 2 }} />

      <Box sx={{ flex: 1, py: 2, px: 1.2 }}>
        {!collapsed && <Typography sx={{ color: '#475569', fontWeight: 600, fontSize: '0.62rem', letterSpacing: '0.12em', px: 1.8, mb: 1 }}>منوی اصلی</Typography>}
        {menuItems.map((item) => {
          const active = isActive(item.path)
          return (
            <Tooltip key={item.path} title={collapsed ? item.label : ''} placement="right" arrow>
              <Box
                role="button"
                tabIndex={0}
                onClick={() => navigate(item.path)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(item.path) }}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.3, cursor: 'pointer',
                  px: collapsed ? 0 : 1.5, py: 1.1, mb: 0.4, mx: 0.3, borderRadius: '10px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  backgroundColor: active ? 'rgba(99,102,241,0.18)' : 'transparent',
                  transition: 'all 0.2s',
                  '&:hover': { backgroundColor: active ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.06)' },
                }}
              >
                <Box sx={{ color: active ? '#818cf8' : '#94a3b8', display: 'flex' }}>{item.icon}</Box>
                {!collapsed && <Typography sx={{ color: active ? '#f1f5f9' : '#cbd5e1', fontWeight: active ? 600 : 400, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{item.label}</Typography>}
                {active && !collapsed && <Box sx={{ mr: 'auto', width: 5, height: 5, borderRadius: '50%', bgcolor: '#818cf8' }} />}
              </Box>
            </Tooltip>
          )
        })}
      </Box>

      <Box sx={{ px: 1.2, pb: 1.8 }}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 1 }} />
        <Tooltip title={collapsed ? (dark ? 'حالت روشن' : 'حالت تاریک') : ''} placement="right" arrow>
          <Box onClick={() => setDark(!dark)} sx={{
            display: 'flex', alignItems: 'center', gap: 1.3, px: collapsed ? 0 : 1.5, py: 1.1, mx: 0.3,
            borderRadius: '10px', cursor: 'pointer', justifyContent: collapsed ? 'center' : 'flex-start',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' },
          }}>
            <Box sx={{ color: '#94a3b8' }}>{dark ? <LightMode /> : <DarkMode />}</Box>
            {!collapsed && <Typography sx={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{dark ? 'حالت روشن' : 'حالت تاریک'}</Typography>}
          </Box>
        </Tooltip>
      </Box>
    </Box>
  )
}
