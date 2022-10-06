import { Select } from '@mui/material'
import { styled } from "@mui/material/styles"

export const DltSelect = styled(Select)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    backgroundColor: 'white'
  }
}))