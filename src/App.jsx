import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { lightTheme } from '@/theme/palette'
import { darkTheme } from '@/theme/darkTheme'
import Layout from '@/components/Layout'
import DashboardPage from '@/pages/Dashboard'
import PersonnelPage from '@/pages/Personnel'
import MealPeriodPage from '@/pages/MealPeriod'
import MealPage from '@/pages/Meal'
import MenuPage from '@/pages/Menu'
import ReservedOrders from './pages/reserveOrders'

export default function App() {
  const [dark, setDark] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <CssBaseline />
      <Layout dark={dark} setDark={setDark} collapsed={collapsed} setCollapsed={setCollapsed}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage dark={dark} />} />
          <Route path="/personnel" element={<PersonnelPage dark={dark} />} />
          <Route path="/mealPeriod" element={<MealPeriodPage dark={dark} />} />
          <Route path="/meal" element={<MealPage dark={dark} />} />
          <Route path="/menu" element={<MenuPage dark={dark} />} />
          <Route path='/reserve' element={<ReservedOrders dark={dark} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}
