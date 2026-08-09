import { Box, Typography } from '@mui/material'

export default function Footer({ dark }) {
  const bg = dark ? '#1e293b' : '#ffffff'
  const border = dark ? '#334155' : '#e2e8f0'
  const text = dark ? '#64748b' : '#94a3b8'

  return (
    <Box sx={{
      textAlign: 'center', py: 2, px: 3,
      bgcolor: bg, borderTop: `1px solid ${border}`,
    }}>
      <Typography variant="body2" sx={{ color: text, fontSize: '0.78rem' }}>
        © {new Date().getFullYear()} سیستم مدیریت رستوران
      </Typography>
    </Box>
  )
}
