import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Grid, Paper, Typography, Button, TextField,
  Select, MenuItem, FormControl, InputLabel, Chip,
  Table, TableBody, TableCell, TableHead, TableRow,
  Avatar, Drawer, List, ListItem, ListItemIcon,
  ListItemText, Divider, Alert, Snackbar, IconButton,
  Tooltip, Badge, useMediaQuery, useTheme
} from '@mui/material'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip as RechartTooltip, ResponsiveContainer, Legend
} from 'recharts'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import HistoryIcon from '@mui/icons-material/History'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import SavingsIcon from '@mui/icons-material/Savings'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import API from '../api'
import StatCard from '../components/StatCard'

const CATEGORIES = ['Salary','Freelance','Investment','Food','Rent','Transport','Shopping','Healthcare','Entertainment','Education','Other']
const EXPENSE_CATS = ['Food','Rent','Transport','Shopping','Healthcare','Entertainment','Education','Other']
const INCOME_CATS  = ['Salary','Freelance','Investment','Other']

const PIE_COLORS  = ['#1B3A6B','#C62828','#2E7D32','#E65100','#6A1B9A','#0277BD','#00695C','#F9A825']
const DRAWER_WIDTH = 240

const navItems = [
  { icon: <DashboardIcon />, label: 'Dashboard' },
  { icon: <AddCircleOutlineIcon />, label: 'Add Transaction' },
  { icon: <HistoryIcon />, label: 'History' },
]

export default function Dashboard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  const name  = localStorage.getItem('name') || 'User'
  const email = localStorage.getItem('email') || ''
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const [transactions, setTransactions] = useState([])
  const [summary, setSummary]           = useState({ income: 0, expense: 0, balance: 0, savings_rate: 0, categories: [], monthly: [], transaction_count: 0 })
  const [form, setForm]                 = useState({ title: '', amount: '', type: 'expense', category: 'Food', note: '' })
  const [activeTab, setActiveTab]       = useState('Dashboard')
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [snack, setSnack]               = useState({ open: false, msg: '', severity: 'success' })
  const [addLoading, setAddLoading]     = useState(false)

  const load = async () => {
    try {
      const [txRes, sumRes] = await Promise.all([
        API.get('/transactions/'),
        API.get('/transactions/summary')
      ])
      setTransactions(txRes.data)
      setSummary(sumRes.data)
    } catch {}
  }

  useEffect(() => { load() }, [])

  const showSnack = (msg, severity = 'success') => setSnack({ open: true, msg, severity })

  const handleAdd = async () => {
    if (!form.title.trim() || !form.amount) {
      showSnack('Please fill title and amount', 'error'); return
    }
    if (parseFloat(form.amount) <= 0) {
      showSnack('Amount must be positive', 'error'); return
    }
    setAddLoading(true)
    try {
      await API.post('/transactions/', { ...form, amount: parseFloat(form.amount) })
      setForm({ title: '', amount: '', type: 'expense', category: 'Food', note: '' })
      showSnack('Transaction added successfully!')
      load()
    } catch {
      showSnack('Failed to add transaction', 'error')
    } finally {
      setAddLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`)
      showSnack('Transaction deleted')
      load()
    } catch {
      showSnack('Failed to delete', 'error')
    }
  }

  const logout = () => { localStorage.clear(); navigate('/login') }

  const pieData = summary.categories.slice(0, 6).map(c => ({
    name: c.category, value: c.total
  }))

  const availableCategories = form.type === 'income' ? INCOME_CATS : EXPENSE_CATS

  // ── Sidebar ────────────────────────────────────────────────────────────────
  const SidebarContent = () => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0F2444' }}>
      {/* Logo */}
      <Box sx={{ px: 3, py: 3, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <AccountBalanceIcon sx={{ color: '#fff', fontSize: 28 }} />
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, letterSpacing: '-0.3px' }}>
            FinTrack
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', mt: 0.3, display: 'block' }}>
          Personal Finance Dashboard
        </Typography>
      </Box>

      {/* Nav */}
      <List sx={{ px: 1.5, pt: 2, flex: 1 }}>
        {navItems.map(item => (
          <ListItem
            key={item.label}
            onClick={() => { setActiveTab(item.label); setMobileOpen(false) }}
            sx={{
              borderRadius: 2, mb: 0.5, cursor: 'pointer',
              background: activeTab === item.label ? 'rgba(255,255,255,0.12)' : 'transparent',
              '&:hover': { background: 'rgba(255,255,255,0.08)' },
              transition: 'background 0.2s',
            }}
          >
            <ListItemIcon sx={{ color: activeTab === item.label ? '#fff' : 'rgba(255,255,255,0.5)', minWidth: 36 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '0.875rem', fontWeight: activeTab === item.label ? 600 : 400,
                color: activeTab === item.label ? '#fff' : 'rgba(255,255,255,0.6)'
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* User info */}
      <Box sx={{ px: 2, py: 2.5, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Box display="flex" alignItems="center" gap={1.5} mb={1.5}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: '#1B3A6B', fontSize: '0.8rem', fontWeight: 700 }}>
            {initials}
          </Avatar>
          <Box overflow="hidden">
            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600, fontSize: '0.8rem' }} noWrap>{name}</Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }} noWrap>{email}</Typography>
          </Box>
        </Box>
        <Button
          fullWidth size="small" startIcon={<LogoutIcon />}
          onClick={logout}
          sx={{ color: 'rgba(255,255,255,0.6)', justifyContent: 'flex-start', pl: 0.5, '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.08)' } }}
        >
          Sign out
        </Button>
      </Box>
    </Box>
  )

  // ── Overview tab ──────────────────────────────────────────────────────────
  const OverviewContent = () => (
    <Box>
      {/* Stat cards */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard label="Total Income" value={summary.income} icon={<TrendingUpIcon />} color="#2E7D32" />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard label="Total Expenses" value={summary.expense} icon={<TrendingDownIcon />} color="#C62828" />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard label="Net Balance" value={summary.balance} icon={<AccountBalanceWalletIcon />} color="#1B3A6B" />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard label="Savings Rate" value={summary.savings_rate} icon={<SavingsIcon />} color="#E65100" prefix="" suffix="%" />
        </Grid>
      </Grid>

      <Grid container spacing={2.5} mb={3}>
        {/* Monthly trend area chart */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} color="primary.dark" mb={2}>
              Monthly Income vs Expense
            </Typography>
            {summary.monthly.length === 0 ? (
              <Box display="flex" alignItems="center" justifyContent="center" height={200}>
                <Typography color="text.secondary" variant="body2">Add transactions to see trends</Typography>
              </Box>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={summary.monthly}>
                  <defs>
                    <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2E7D32" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C62828" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#C62828" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#718096' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#718096' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                  <RechartTooltip formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, '']} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                  <Legend />
                  <Area type="monotone" dataKey="income" stroke="#2E7D32" strokeWidth={2.5} fill="url(#incGrad)" name="Income" dot={{ r: 4, fill: '#2E7D32' }} />
                  <Area type="monotone" dataKey="expense" stroke="#C62828" strokeWidth={2.5} fill="url(#expGrad)" name="Expense" dot={{ r: 4, fill: '#C62828' }} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>

        {/* Pie chart - spending by category */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} color="primary.dark" mb={2}>
              Spending by Category
            </Typography>
            {pieData.length === 0 ? (
              <Box display="flex" alignItems="center" justifyContent="center" height={200}>
                <Typography color="text.secondary" variant="body2">No expense data yet</Typography>
              </Box>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={75} innerRadius={40} dataKey="value" paddingAngle={3}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartTooltip formatter={v => [`₹${v.toLocaleString('en-IN')}`, '']} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                  <Legend iconSize={10} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Category bar chart */}
      {summary.categories.length > 0 && (
        <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} color="primary.dark" mb={2}>
            Top Expense Categories
          </Typography>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={summary.categories.slice(0, 8)}>
              <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#718096' }} />
              <YAxis tick={{ fontSize: 11, fill: '#718096' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <RechartTooltip formatter={v => [`₹${v.toLocaleString('en-IN')}`, 'Amount']} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="total" fill="#1B3A6B" radius={[6, 6, 0, 0]} name="Amount" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      )}

      {/* Recent transactions preview */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1" fontWeight={700} color="primary.dark">
            Recent Transactions
          </Typography>
          <Button size="small" onClick={() => setActiveTab('History')} sx={{ color: '#1B3A6B', fontWeight: 600 }}>
            View all →
          </Button>
        </Box>
        {transactions.length === 0 ? (
          <Box textAlign="center" py={3}>
            <ReceiptLongIcon sx={{ fontSize: 40, color: '#c5cfe0', mb: 1 }} />
            <Typography color="text.secondary" variant="body2">No transactions yet</Typography>
            <Button size="small" variant="outlined" sx={{ mt: 1 }} onClick={() => setActiveTab('Add Transaction')}>
              Add your first transaction
            </Button>
          </Box>
        ) : (
          transactions.slice(0, 5).map(t => (
            <Box key={t._id} display="flex" alignItems="center" justifyContent="space-between"
              sx={{ py: 1.2, borderBottom: '1px solid #f0f4f8', '&:last-child': { borderBottom: 'none' } }}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Box sx={{
                  width: 36, height: 36, borderRadius: 2,
                  background: t.type === 'income' ? '#E8F5E9' : '#FFEBEE',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {t.type === 'income'
                    ? <TrendingUpIcon sx={{ fontSize: 18, color: '#2E7D32' }} />
                    : <TrendingDownIcon sx={{ fontSize: 18, color: '#C62828' }} />}
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={600}>{t.title}</Typography>
                  <Typography variant="caption" color="text.secondary">{t.category} · {new Date(t.date).toLocaleDateString('en-IN')}</Typography>
                </Box>
              </Box>
              <Typography variant="body2" fontWeight={700} sx={{ color: t.type === 'income' ? '#2E7D32' : '#C62828' }}>
                {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
              </Typography>
            </Box>
          ))
        )}
      </Paper>
    </Box>
  )

  // ── Add Transaction tab ────────────────────────────────────────────────────
  const AddContent = () => (
    <Box maxWidth={520}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" gap={1.5} mb={3}>
          <Box sx={{ width: 42, height: 42, borderRadius: 2, bgcolor: '#E8EDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AddCircleOutlineIcon color="primary" />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} color="primary.dark">New Transaction</Typography>
            <Typography variant="caption" color="text.secondary">Record income or expense</Typography>
          </Box>
        </Box>

        {/* Type toggle */}
        <Box display="flex" gap={1} mb={2.5}>
          {['expense', 'income'].map(t => (
            <Button
              key={t}
              fullWidth
              variant={form.type === t ? 'contained' : 'outlined'}
              onClick={() => setForm({ ...form, type: t, category: t === 'income' ? 'Salary' : 'Food' })}
              sx={{
                py: 1.2,
                ...(form.type === t && t === 'income' && {
                  background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                  '&:hover': { background: 'linear-gradient(135deg, #14521a 0%, #256626 100%)' }
                }),
                ...(form.type === t && t === 'expense' && {
                  background: 'linear-gradient(135deg, #B71C1C 0%, #C62828 100%)',
                  '&:hover': { background: 'linear-gradient(135deg, #9a1818 0%, #a82222 100%)' }
                }),
                ...(form.type !== t && { borderColor: '#c5cfe0', color: 'text.secondary' })
              }}
            >
              {t === 'income' ? '↑ Income' : '↓ Expense'}
            </Button>
          ))}
        </Box>

        <TextField
          fullWidth label="Transaction Title" margin="dense"
          placeholder={form.type === 'income' ? 'e.g. Monthly Salary' : 'e.g. Grocery Shopping'}
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <Grid container spacing={1.5} mt={0}>
          <Grid item xs={6}>
            <TextField
              fullWidth label="Amount (₹)" type="number" margin="dense"
              placeholder="0.00"
              value={form.amount}
              onChange={e => setForm({ ...form, amount: e.target.value })}
              inputProps={{ min: 0, step: '0.01' }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth size="small" sx={{ mt: '8px' }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={form.category} label="Category"
                onChange={e => setForm({ ...form, category: e.target.value })}
                sx={{ borderRadius: 2.5 }}
              >
                {availableCategories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <TextField
          fullWidth label="Note (optional)" margin="dense"
          placeholder="Add a short description..."
          value={form.note}
          onChange={e => setForm({ ...form, note: e.target.value })}
        />

        <Button
          fullWidth variant="contained" onClick={handleAdd}
          disabled={addLoading}
          sx={{ mt: 3, py: 1.4, fontSize: '0.95rem' }}
        >
          {addLoading ? 'Adding...' : `Add ${form.type === 'income' ? 'Income' : 'Expense'}`}
        </Button>
      </Paper>
    </Box>
  )

  // ── History tab ────────────────────────────────────────────────────────────
  const HistoryContent = () => (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid #f0f4f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6" fontWeight={700} color="primary.dark">Transaction History</Typography>
          <Typography variant="caption" color="text.secondary">{summary.transaction_count} total transactions</Typography>
        </Box>
      </Box>
      {transactions.length === 0 ? (
        <Box textAlign="center" py={6}>
          <ReceiptLongIcon sx={{ fontSize: 48, color: '#c5cfe0', mb: 2 }} />
          <Typography color="text.secondary" variant="body1" fontWeight={500}>No transactions yet</Typography>
          <Typography color="text.secondary" variant="body2" mb={2}>Start by adding your first income or expense</Typography>
          <Button variant="outlined" color="primary" onClick={() => setActiveTab('Add Transaction')}>
            Add Transaction
          </Button>
        </Box>
      ) : (
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F7FAFC' }}>
                {['Title', 'Category', 'Type', 'Amount', 'Note', 'Date', ''].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#718096', py: 1.5, borderBottom: '2px solid #EDF2F7' }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map(t => (
                <TableRow key={t._id} hover sx={{ '&:hover': { bgcolor: '#F7FAFC' }, transition: 'background 0.15s' }}>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.title}</TableCell>
                  <TableCell>
                    <Chip label={t.category} size="small" sx={{ bgcolor: '#EDF2F7', color: '#4A5568', fontWeight: 500, fontSize: '0.72rem' }} />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={t.type}
                      size="small"
                      icon={t.type === 'income' ? <TrendingUpIcon style={{ fontSize: 13 }} /> : <TrendingDownIcon style={{ fontSize: 13 }} />}
                      sx={{
                        bgcolor: t.type === 'income' ? '#E8F5E9' : '#FFEBEE',
                        color: t.type === 'income' ? '#2E7D32' : '#C62828',
                        fontWeight: 600, fontSize: '0.72rem',
                        '& .MuiChip-icon': { color: 'inherit' }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: t.type === 'income' ? '#2E7D32' : '#C62828', fontSize: '0.9rem' }}>
                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell sx={{ color: '#718096', fontSize: '0.82rem', maxWidth: 120 }}>
                    <Typography noWrap variant="caption">{t.note || '—'}</Typography>
                  </TableCell>
                  <TableCell sx={{ color: '#718096', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                    {new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Delete">
                      <IconButton size="small" onClick={() => handleDelete(t._id)} sx={{ color: '#CBD5E0', '&:hover': { color: '#C62828', bgcolor: '#FFEBEE' } }}>
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Paper>
  )

  const pageTitle = activeTab
  const pageSubtitle = {
    'Dashboard': `Hello ${name}, here's your financial overview`,
    'Add Transaction': 'Record a new income or expense entry',
    'History': 'Browse and manage all your transactions',
  }[activeTab]

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Desktop Sidebar */}
      <Box component="nav" sx={{ width: DRAWER_WIDTH, flexShrink: 0, display: { xs: 'none', md: 'block' } }}>
        <Box sx={{ width: DRAWER_WIDTH, height: '100vh', position: 'fixed' }}>
          <SidebarContent />
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} sx={{ display: { md: 'none' } }}
        PaperProps={{ sx: { width: DRAWER_WIDTH } }}>
        <SidebarContent />
      </Drawer>

      {/* Main content */}
      <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <Box sx={{
          px: { xs: 2, md: 4 }, py: 2,
          background: '#fff',
          borderBottom: '1px solid #EDF2F7',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <IconButton sx={{ display: { md: 'none' } }} onClick={() => setMobileOpen(true)} size="small">
              <MenuIcon />
            </IconButton>
            <Box>
              <Typography variant="h6" fontWeight={700} color="primary.dark" sx={{ lineHeight: 1.2 }}>
                {pageTitle}
              </Typography>
              <Typography variant="caption" color="text.secondary">{pageSubtitle}</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Badge badgeContent={summary.transaction_count} color="primary" max={99}
              sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', height: 16, minWidth: 16 } }}>
              <ReceiptLongIcon sx={{ color: '#a0aec0', fontSize: 22 }} />
            </Badge>
            <Avatar sx={{ width: 34, height: 34, bgcolor: '#1B3A6B', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
              {initials}
            </Avatar>
          </Box>
        </Box>

        {/* Page content */}
        <Box sx={{ p: { xs: 2, md: 4 }, flex: 1 }}>
          {activeTab === 'Dashboard'        && <OverviewContent />}
          {activeTab === 'Add Transaction'  && <AddContent />}
          {activeTab === 'History'          && <HistoryContent />}
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snack.severity} sx={{ borderRadius: 2 }} onClose={() => setSnack({ ...snack, open: false })}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  )
}
