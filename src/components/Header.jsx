import { useLocation } from 'react-router'
import { Box, Typography, IconButton, Badge, Avatar, TextField, InputAdornment } from '@mui/material'
import { Search as SearchIcon, Notifications as NotifIcon, KeyboardArrowDown } from '@mui/icons-material'

const pageNames = {
  '/dashboard': 'داشبورد',
  '/personnel': 'مدیریت پرسنل',
  '/meal-period': 'مدیریت وعده غذایی',
  '/meal': 'مدیریت غذا',
  '/menu': 'مدیریت منو',
}

export default function Header({ dark }) {
  const loc = useLocation()
  const title = pageNames[loc.pathname] || 'داشبورد'

  const bg = dark ? '#1e293b' : '#ffffff'
  const border = dark ? '#334155' : '#e2e8f0'
  const inputBg = dark ? '#0f172a' : '#f8fafc'
  const textPrimary = dark ? '#f1f5f9' : '#1e293b'

  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      px: 3, py: 1.2,
      bgcolor: bg, borderBottom: `1px solid ${border}`,
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '1.2rem', color: textPrimary }}>{title}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <TextField size="small" placeholder="جستجو..."
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8', fontSize: 18 }} /></InputAdornment> }}
          sx={{ width: 220, '& .MuiOutlinedInput-root': { borderRadius: '10px', fontSize: '0.82rem', bgcolor: inputBg, color: textPrimary, '& fieldset': { borderColor: border } } }}
        />
        <IconButton sx={{ borderRadius: '10px', bgcolor: inputBg, border: `1px solid ${border}` }}>
          <Badge badgeContent={3} color="error"><NotifIcon sx={{ fontSize: 20, color: dark ? '#94a3b8' : '#64748b' }} /></Badge>
        </IconButton>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1, px: 1.2, py: 0.6, borderRadius: '10px',
          cursor: 'pointer', bgcolor: inputBg, border: `1px solid ${border}`,
        }}>
          <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', fontWeight: 700, background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>مد</Avatar>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '0.78rem', lineHeight: 1.2, color: textPrimary }}>مدیر</Typography>
            <Typography sx={{ color: '#94a3b8', fontSize: '0.62rem' }}>ادمین</Typography>
          </Box>
          <KeyboardArrowDown sx={{ color: '#94a3b8', fontSize: 16 }} />
        </Box>
      </Box>
    </Box>
  )
}
