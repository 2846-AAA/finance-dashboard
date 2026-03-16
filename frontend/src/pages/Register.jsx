import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box, Paper, Typography, TextField, Button,
  Alert, InputAdornment, IconButton, Divider, LinearProgress
} from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import API from '../api'

const PasswordStrength = ({ password }) => {
  const strength = password.length === 0 ? 0
    : password.length < 6 ? 25
    : password.length < 8 ? 50
    : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 100 : 75

  const color = strength < 50 ? 'error' : strength < 100 ? 'warning' : 'success'
  const label = strength === 0 ? '' : strength < 50 ? 'Weak' : strength < 100 ? 'Medium' : 'Strong'

  if (!password) return null
  return (
    <Box mt={0.5} mb={1}>
      <LinearProgress variant="determinate" value={strength} color={color} sx={{ borderRadius: 2, height: 4 }} />
      <Typography variant="caption" color={`${color}.main`} mt={0.3} display="block">{label} password</Typography>
    </Box>
  )
}

const Benefit = ({ text }) => (
  <Box display="flex" alignItems="center" gap={1} mb={1.5}>
    <CheckCircleIcon sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 18 }} />
    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>{text}</Typography>
  </Box>
)

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e?.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      await API.post('/auth/register', form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.')
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
        background: 'linear-gradient(160deg, #085254 0%, #0D7377 50%, #14AAAF 100%)',
        flexDirection: 'column',
        justifyContent: 'center',
        px: 6,
        py: 8,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{ position:'absolute', top:-80, right:-80, width:300, height:300, borderRadius:'50%', background:'rgba(255,255,255,0.05)' }} />
        <Box sx={{ position:'absolute', bottom:-60, left:-60, width:250, height:250, borderRadius:'50%', background:'rgba(255,255,255,0.05)' }} />

        <Box mb={5}>
          <Box display="flex" alignItems="center" gap={1.5} mb={1}>
            <AccountBalanceIcon sx={{ color: '#fff', fontSize: 36 }} />
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800 }}>FinTrack</Typography>
          </Box>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
            Start your financial journey today
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 1.5, lineHeight: 1.3 }}>
          Join thousands managing their money smarter
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, fontSize: '0.9rem', lineHeight: 1.7 }}>
          A free, secure platform to track every rupee — income, expenses, savings, and more.
        </Typography>

        <Benefit text="100% free — no hidden charges" />
        <Benefit text="Bank-grade JWT security" />
        <Benefit text="Instant spending insights on signup" />
        <Benefit text="Works on all devices" />
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
          <Box display={{ xs: 'flex', md: 'none' }} alignItems="center" gap={1} mb={3}>
            <AccountBalanceIcon sx={{ color: '#0D7377' }} />
            <Typography variant="h6" sx={{ color: '#0D7377' }} fontWeight={800}>FinTrack</Typography>
          </Box>

          <Typography variant="h5" fontWeight={800} color="#0D7377" mb={0.5}>
            Create account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Set up your free finance dashboard
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth label="Full Name" margin="normal"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                )
              }}
            />
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
            <PasswordStrength password={form.password} />

            <Button
              fullWidth variant="contained" type="submit"
              disabled={loading}
              sx={{
                mt: 1.5, py: 1.4, fontSize: '0.95rem',
                background: 'linear-gradient(135deg, #085254 0%, #0D7377 100%)',
                '&:hover': { background: 'linear-gradient(135deg, #063d3f 0%, #0a5e62 100%)' }
              }}
            >
              {loading ? 'Creating account...' : 'Create Free Account'}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" color="text.secondary">OR</Typography>
          </Divider>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#1B3A6B', fontWeight: 600, textDecoration: 'none' }}>
              Sign in
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  )
}
