import { useLocation } from 'react-router'
import { useState } from 'react'
import { Box, Typography, IconButton, Badge, Avatar, TextField, InputAdornment, Menu, MenuItem, useTheme } from '@mui/material'
import { Search as SearchIcon, Notifications as NotifIcon, KeyboardArrowDown, Menu as MenuIcon } from '@mui/icons-material'

const pageNames = {
  '/dashboard': 'داشبورد',
  '/personnel': 'مدیریت پرسنل',
  '/meal-period': 'مدیریت وعده غذایی',
  '/meal': 'مدیریت غذا',
  '/menu': 'مدیریت منو',
  '/reserve': 'رزرو'
}

export default function Header({ dark, onMenuClick, isMobile }) {
  const loc = useLocation()
  const theme = useTheme()
  const title = pageNames[loc.pathname] || 'داشبورد'

  const bg = dark ? '#1e293b' : '#ffffff'
  const border = dark ? '#334155' : '#e2e8f0'
  const inputBg = dark ? '#0f172a' : '#f8fafc'
  const textPrimary = dark ? '#f1f5f9' : '#1e293b'

  const [searchOpen, setSearchOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);

  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      px: { xs: 1.5, sm: 3 }, py: 1.2,
      bgcolor: bg, borderBottom: `1px solid ${border}`,
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {isMobile && (
          <IconButton onClick={onMenuClick} sx={{ borderRadius: '10px', bgcolor: inputBg, border: `1px solid ${border}` }}>
            <MenuIcon sx={{ color: dark ? '#94a3b8' : '#64748b' }} />
          </IconButton>
        )}
        <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: '1rem', sm: '1.2rem' }, color: textPrimary }}>{title}</Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.8, sm: 1.5 } }}>
        {/* Search: icon button on mobile, expands to field when tapped; full field on desktop */}
        {isMobile ? (
          <IconButton
            onClick={() => setSearchOpen((o) => !o)}
            sx={{ borderRadius: '10px', bgcolor: inputBg, border: `1px solid ${border}` }}
          >
            <SearchIcon sx={{ color: dark ? '#94a3b8' : '#64748b' }} />
          </IconButton>
        ) : (
          <TextField size="small" placeholder="جستجو..."
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8', fontSize: 18 }} /></InputAdornment> }}
            sx={{ width: 220, '& .MuiOutlinedInput-root': { borderRadius: '10px', fontSize: '0.82rem', bgcolor: inputBg, color: textPrimary, '& fieldset': { borderColor: border } } }}
          />
        )}

        <IconButton sx={{ borderRadius: '10px', bgcolor: inputBg, border: `1px solid ${border}` }}>
          <Badge badgeContent={3} color="error"><NotifIcon sx={{ fontSize: 20, color: dark ? '#94a3b8' : '#64748b' }} /></Badge>
        </IconButton>

        {/* Profile: icon on mobile, icon+name on desktop */}
        <Box
          onClick={(e) => setProfileAnchor(e.currentTarget)}
          sx={{
            display: 'flex', alignItems: 'center', gap: 1, px: { xs: 0, sm: 1.2 }, py: { xs: 0, sm: 0.6 },
            borderRadius: '10px', cursor: 'pointer', bgcolor: { xs: inputBg, sm: inputBg }, border: { xs: `1px solid ${border}`, sm: `1px solid ${border}` },
          }}
        >
          <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', fontWeight: 700, background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>مد</Avatar>
          {!isMobile && (
            <>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: '0.78rem', lineHeight: 1.2, color: textPrimary }}>مدیر</Typography>
                <Typography sx={{ color: '#94a3b8', fontSize: '0.62rem' }}>ادمین</Typography>
              </Box>
              <KeyboardArrowDown sx={{ color: '#94a3b8', fontSize: 16 }} />
            </>
          )}
        </Box>
        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={() => setProfileAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem onClick={() => setProfileAnchor(null)}>پروفایل</MenuItem>
          <MenuItem onClick={() => setProfileAnchor(null)}>تنظیمات</MenuItem>
          <MenuItem onClick={() => setProfileAnchor(null)}>خروج</MenuItem>
        </Menu>
      </Box>

      {/* Expandable search field on mobile */}
      {isMobile && searchOpen && (
        <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, p: 1, bgcolor: bg, borderBottom: `1px solid ${border}`, zIndex: 99 }}>
          <TextField
            size="small" placeholder="جستجو..."
            autoFocus
            fullWidth
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8', fontSize: 18 }} /></InputAdornment> }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', fontSize: '0.82rem', bgcolor: inputBg, color: textPrimary, '& fieldset': { borderColor: border } } }}
          />
        </Box>
      )}
    </Box>
  )
}
