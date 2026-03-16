import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box, Paper, Typography, TextField, Button,
  Alert, InputAdornment, IconButton, Divider
} from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PieChartIcon from '@mui/icons-material/PieChart'
import API from '../api'

const Feature = ({ icon, text }) => (
  <Box display="flex" alignItems="center" gap={1.5} mb={2}>
    <Box sx={{ color: 'rgba(255,255,255,0.9)', display: 'flex' }}>{icon}</Box>
    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem' }}>{text}</Typography>
  </Box>
)

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e?.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await API.post('/auth/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('name', res.data.name)
      localStorage.setItem('email', res.data.email)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left Panel */}
      <Box sx={{
        display: { xs: 'none', md: 'flex' },
        flex: '0 0 45%',
        background: 'linear-gradient(160deg, #0F2444 0%, #1B3A6B 50%, #2A52A0 100%)',
        flexDirection: 'column',
        justifyContent: 'center',
        px: 6,
        py: 8,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <Box sx={{ position:'absolute', top:-80, right:-80, width:300, height:300, borderRadius:'50%', background:'rgba(255,255,255,0.04)' }} />
        <Box sx={{ position:'absolute', bottom:-60, left:-60, width:250, height:250, borderRadius:'50%', background:'rgba(255,255,255,0.04)' }} />

        <Box mb={5}>
          <Box display="flex" alignItems="center" gap={1.5} mb={1}>
            <AccountBalanceIcon sx={{ color: '#fff', fontSize: 36 }} />
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, letterSpacing: '-0.5px' }}>
              FinTrack
            </Typography>
          </Box>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
            Your personal banking companion
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 1.5, lineHeight: 1.3 }}>
          Take control of your finances
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, fontSize: '0.9rem', lineHeight: 1.7 }}>
          Track income, manage expenses, and build wealth with smart analytics and real-time insights.
        </Typography>

        <Feature icon={<TrendingUpIcon fontSize="small" />} text="Real-time income & expense tracking" />
        <Feature icon={<PieChartIcon fontSize="small" />} text="Visual spending analytics by category" />
        <Feature icon={<AccountBalanceIcon fontSize="small" />} text="Monthly savings trends & balance insights" />
      </Box>

      {/* Right Panel */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        background: '#F0F4F8',
      }}>
        <Paper sx={{ p: { xs: 3, sm: 5 }, width: '100%', maxWidth: 420, borderRadius: 4 }}>
          {/* Mobile logo */}
          <Box display={{ xs: 'flex', md: 'none' }} alignItems="center" gap={1} mb={3}>
            <AccountBalanceIcon color="primary" />
            <Typography variant="h6" color="primary" fontWeight={800}>FinTrack</Typography>
          </Box>

          <Typography variant="h5" fontWeight={800} color="primary.dark" mb={0.5}>
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Sign in to your finance dashboard
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth label="Email address" type="email" margin="normal"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth label="Password" margin="normal"
              type={showPass ? 'text' : 'password'}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)} size="small">
                      {showPass ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              fullWidth variant="contained" type="submit"
              disabled={loading}
              sx={{ mt: 2.5, py: 1.4, fontSize: '0.95rem' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" color="text.secondary">OR</Typography>
          </Divider>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#1B3A6B', fontWeight: 600, textDecoration: 'none' }}>
              Create one free
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  )
}
