import { Box, Typography, Card, CardContent, Avatar, Skeleton, Chip } from '@mui/material'
import { People, AccessTime, Restaurant, MenuBook, ArrowUpward, CalendarToday } from '@mui/icons-material'
import { useNavigate } from 'react-router'
import { useGetPersonnelsQuery } from '@/features/api/personnelApis'
import { useGetMealPeriodsQuery } from '@/features/api/mealPeriodApis'
import { useGetMealsQuery } from '@/features/api/mealApis'
import { useGetMenuQuery } from '@/features/api/menuApis'

function StatCard({ title, value, icon, gradient, trend, dark }) {
  const bg = dark ? '#1e293b' : '#ffffff'
  const border = dark ? '#334155' : '#e2e8f0'
  const text = dark ? '#f1f5f9' : '#1e293b'
  const sub = dark ? '#94a3b8' : '#64748b'

  return (
    <Card sx={{
      position: 'relative', overflow: 'hidden',
      background: bg, border: `1px solid ${border}`,
      transition: 'all 0.3s ease',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(0,0,0,0.12)' },
      '&::after': { content: '""', position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: gradient },
    }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ color: sub, fontSize: '0.8rem', fontWeight: 500, mb: 1 }}>{title}</Typography>
            <Typography sx={{ fontWeight: 800, fontSize: '2rem', lineHeight: 1, color: text }}>{value}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
              <ArrowUpward sx={{ color: '#10b981', fontSize: 14 }} />
              <Typography sx={{ color: '#10b981', fontWeight: 700, fontSize: '0.75rem' }}>{trend}</Typography>
              <Typography sx={{ color: '#94a3b8', fontSize: '0.7rem' }}>ماه قبل</Typography>
            </Box>
          </Box>
          <Avatar sx={{ width: 50, height: 50, background: gradient, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>{icon}</Avatar>
        </Box>
      </CardContent>
    </Card>
  )
}

function ActivityRow({ icon, title, time, gradient, isLast, dark }) {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', gap: 1.5, py: 1.5,
      borderBottom: isLast ? 'none' : `1px solid ${dark ? '#1e293b' : '#f1f5f9'}`,
      transition: 'all 0.15s', '&:hover': { bgcolor: dark ? '#1e293b' : '#f8fafc', pl: 0.5 },
    }}>
      <Avatar sx={{ width: 40, height: 40, background: gradient, fontSize: 18 }}>{icon}</Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography fontWeight={600} fontSize="0.87rem" color={dark ? '#f1f5f9' : '#1e293b'}>{title}</Typography>
        <Typography color="#94a3b8" fontSize="0.75rem">{time}</Typography>
      </Box>
    </Box>
  )
}

function QuickCard({ icon, title, desc, gradient, onClick, dark }) {
  const bg = dark ? '#1e293b' : '#ffffff'
  const border = dark ? '#334155' : '#e2e8f0'
  const text = dark ? '#f1f5f9' : '#1e293b'

  return (
    <Card
      role="button" tabIndex={0} onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      sx={{
        cursor: 'pointer',
        background: bg, border: `1px solid ${border}`,
        transition: 'all 0.25s ease',
        '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
      }}
    >
      <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 48, height: 48, background: gradient, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>{icon}</Avatar>
        <Box>
          <Typography fontWeight={700} fontSize="0.9rem" color={text}>{title}</Typography>
          <Typography color="#94a3b8" fontSize="0.75rem">{desc}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage({ dark }) {
  const navigate = useNavigate()
  const { data: personnels = [], isLoading: pL } = useGetPersonnelsQuery()
  const { data: periods = [], isLoading: mpL } = useGetMealPeriodsQuery()
  const { data: meals = [], isLoading: mL } = useGetMealsQuery()
  const { data: menus = [], isLoading: mnL } = useGetMenuQuery()
  const loading = pL || mpL || mL || mnL

  const text = dark ? '#f1f5f9' : '#1e293b'
  const bg = dark ? '#1e293b' : '#ffffff'
  const border = dark ? '#334155' : '#e2e8f0'

  const today = new Date().toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const stats = [
    { title: 'پرسنل', value: personnels.length, icon: <People sx={{ color: '#fff' }} />, gradient: 'linear-gradient(135deg, #6366f1, #a855f7)', trend: '+12%' },
    { title: 'وعده غذایی', value: periods.length, icon: <AccessTime sx={{ color: '#fff' }} />, gradient: 'linear-gradient(135deg, #06b6d4, #0ea5e9)', trend: '+5%' },
    { title: 'آیتم غذا', value: meals.length, icon: <Restaurant sx={{ color: '#fff' }} />, gradient: 'linear-gradient(135deg, #10b981, #34d399)', trend: '+8%' },
    { title: 'منو', value: menus.length, icon: <MenuBook sx={{ color: '#fff' }} />, gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)', trend: '+3%' },
  ]

  const quickAccess = [
    { icon: <People sx={{ color: '#fff', fontSize: 22 }} />, title: 'پرسنل', desc: `${personnels.length} نفر`, gradient: 'linear-gradient(135deg, #6366f1, #a855f7)', path: '/personnel' },
    { icon: <AccessTime sx={{ color: '#fff', fontSize: 22 }} />, title: 'وعده غذایی', desc: `${periods.length} وعده`, gradient: 'linear-gradient(135deg, #06b6d4, #0ea5e9)', path: '/meal-period' },
    { icon: <Restaurant sx={{ color: '#fff', fontSize: 22 }} />, title: 'غذا', desc: `${meals.length} آیتم`, gradient: 'linear-gradient(135deg, #10b981, #34d399)', path: '/meal' },
    { icon: <MenuBook sx={{ color: '#fff', fontSize: 22 }} />, title: 'منو', desc: `${menus.length} منو`, gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)', path: '/menu' },
  ]

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', color: text, mb: 0.3 }}>خلاصه وضعیت</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <CalendarToday sx={{ fontSize: 13, color: '#94a3b8' }} />
          <Typography color="#94a3b8" fontSize="0.8rem">{today}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
        {stats.map((s) => (
          <Box key={s.title}>
            {loading ? <Skeleton variant="rounded" height={120} sx={{ borderRadius: 3 }} /> : <StatCard {...s} dark={dark} />}
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 2 }}>
        <Card sx={{ background: bg, border: `1px solid ${border}` }}>
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography fontWeight={700} fontSize="1rem" color={text}>آخرین فعالیت‌ها</Typography>
              <Chip label={`${personnels.length + meals.length} مورد`} size="small" sx={{ fontWeight: 600, fontSize: '0.72rem', bgcolor: dark ? '#0f172a' : '#f1f5f9', color: '#94a3b8' }} />
            </Box>
            {loading ? [1, 2, 3].map((i) => <Skeleton key={i} height={56} sx={{ my: 0.5, borderRadius: 2 }} />) : (
              <Box sx={{ borderRadius: 2, border: `1px solid ${dark ? '#334155' : '#f1f5f9'}`, overflow: 'hidden' }}>
                {personnels.slice(0, 4).map((p, i) => (
                  <ActivityRow key={p.id || i} icon={<People sx={{ fontSize: 18, color: '#fff' }} />}
                    title={`پرسنل جدید: ${p.name}`} time={`${i + 1} روز پیش`}
                    gradient="linear-gradient(135deg, #6366f1, #a855f7)" dark={dark}
                    isLast={i === Math.min(personnels.length, 4) - 1 && meals.length === 0} />
                ))}
                {meals.slice(0, 3).map((m, i) => (
                  <ActivityRow key={m.id || `m-${i}`} icon={<Restaurant sx={{ fontSize: 18, color: '#fff' }} />}
                    title={`غذای جدید: ${m.name}`} time={`${i + 2} روز پیش`}
                    gradient="linear-gradient(135deg, #10b981, #34d399)" dark={dark}
                    isLast={i === meals.length - 1} />
                ))}
                {personnels.length === 0 && meals.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 5 }}><Typography color="#94a3b8">هنوز فعالیتی ثبت نشده</Typography></Box>
                )}
              </Box>
            )}
          </CardContent>
        </Card>

        <Card sx={{ background: bg, border: `1px solid ${border}` }}>
          <CardContent sx={{ p: 2.5 }}>
            <Typography fontWeight={700} fontSize="1rem" color={text} mb={2}>دسترسی سریع</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
              {quickAccess.map((q) => (
                <QuickCard key={q.title} {...q} dark={dark} onClick={() => navigate(q.path)} />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
