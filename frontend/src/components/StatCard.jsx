import { Box, Paper, Typography } from '@mui/material'

export default function StatCard({ label, value, icon, color, prefix = '₹', suffix = '' }) {
  return (
    <Paper sx={{
      p: 2.5,
      borderRadius: 3,
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      borderLeft: `4px solid ${color}`,
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }
    }}>
      <Box sx={{
        position: 'absolute', top: -15, right: -15,
        width: 80, height: 80, borderRadius: '50%',
        background: color, opacity: 0.08
      }} />
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={500} mb={0.5}>
            {label}
          </Typography>
          <Typography variant="h5" fontWeight={800} sx={{ color }}>
            {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}{suffix}
          </Typography>
        </Box>
        <Box sx={{
          width: 44, height: 44, borderRadius: 2,
          background: color, opacity: 0.12,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Box sx={{ color, opacity: 8 }}>{icon}</Box>
        </Box>
      </Box>
    </Paper>
  )
}
