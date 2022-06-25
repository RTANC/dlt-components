import { Card, CardHeader, Container, Slide, Box, CardContent, Grid, CardActions, Stack, Divider, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import SelectStation from '../../../components/SelectStation'
import DltTextField from '../../../components/DltTextField'
import { LoadingButton } from '@mui/lab'
import { useParams, useNavigate } from 'react-router-dom'
import { validator } from '../../../services/validator'
import RadioBoxIsActiveUser from '../../../components/RadioBoxIsActiveUser'
import SelectTransportType from '../../../components/SelectTransportType'
import SelectTransportScope from '../../../components/SelectTransportScope'
import { getCompany } from '../../../services/managements'

export default function CompanyForm() {
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const { companyId } = useParams()
    const navigate = useNavigate()

    const [company, setCompany] = useState({
        companyId: '',
        station: {
            value: 1
        },
        companyName: {
            value: '',
            rules: [],
            error: false
        },
        taxId: {
            value: '',
            rules: [],
            error: false
        },
        transportType: {
            value: 1
        },
        transportScope: {
            value: 1
        },
        transportLicense: {
            value: '',
            rules: [(v) => !!v || '*ข้อมูลจำเป็น'],
            error: false
        },
        isActive: {
            value: false
        }
    })

    const handleValueChange = (e) => {
        company[e.target.name].value = e.target.value
        setCompany({...company})
    }

    const handleValidateValue = (e) => {
        company[e.target.name].error = validator(e.target.value, company[e.target.name].rules)
        setCompany({...company})
    }

    const init = async () => {
        try {
            const data = (await getCompany(companyId)).data
            company.companyId = parseInt(data.CompanyID).toLocaleString('en-US', {
                minimumIntegerDigits: 3,
                useGrouping: false
            })
            company.station.value = data.StationID
            company.companyName.value = data.CompanyName
            company.taxId.value = data.TaxID
            company.transportType.value = data.TransportTypeID
            company.transportScope.value = data.TransportScopeID
            company.transportLicense.value = data.TransportLicenseID
            company.isActive.value = data.IsActive
            setCompany({...company})
        } catch (error) {
          console.log(error)
        }
      }

    const save  = async () => {
        try {

        } catch (error) {
            console.log(error)
        }
    }

    const cancel = () => {
      navigate(-1)
    }

    useEffect(() => {
        if (companyId !== '0') {
          setEditMode(true)
          init()
        } else {
          setEditMode(false)
        }
      }, [])
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container>
            <Stack spacing={2}>
                <Card>
                    <CardHeader title={editMode ? 'แก้ไขข้อมูลผู้ประกอบการ' : 'เพิ่มข้อมูลผู้ประกอบการ'} titleTypographyProps={{variant: 'h5', display: 'flex', justifyContent: 'center'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
                    <CardContent>
                      <Grid container spacing={2} direction='row' wrap="wrap">
                        <Grid item xs={12}>
                          <SelectStation name='station' value={company.station.value} onChange={handleValueChange} disabled={editMode}></SelectStation>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <DltTextField name='companyName' value={company.companyName.value} onChange={handleValueChange} label='ชื่อผู้ประกอบการ' disabled={editMode}></DltTextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <DltTextField name='taxId' value={company.taxId.value} onChange={handleValueChange} label='เลขประจำตัวผู้เสียภาษี' disabled={editMode}></DltTextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <DltTextField name='companyId' value={company.companyId} label='รหัส'></DltTextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <RadioBoxIsActiveUser name='isActive' value={company.isActive.value} onChange={handleValueChange} label='สถานะผู้กระกอบการ'></RadioBoxIsActiveUser>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <SelectTransportType name='transportType' value={company.transportType.value} onChange={handleValueChange} required></SelectTransportType>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <SelectTransportScope name='transportScope' value={company.transportScope.value} onChange={handleValueChange} required></SelectTransportScope>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <DltTextField name='transportLicense' value={company.transportLicense.value} onChange={handleValueChange} onKeyUp={handleValidateValue} required label='เลขที่ใบอนุญาต' error={company.transportLicense.error}></DltTextField>
                        </Grid>
                      </Grid>
                    </CardContent>
                </Card>
                <Card>
                  <CardActions>
                    <Box sx={{width: '100%', display:'flex', justifyContent:'center', alignContent: 'center'}}>
                      <LoadingButton loading={loading} disabled={loading} sx={{mx: 1}} color='secondary' variant='contained' onClick={cancel} startIcon={<CancelIcon/>}>ย้อนกลับ</LoadingButton>
                      <LoadingButton loading={loading} disabled={loading} sx={{mx: 1}} color='success' variant='contained' onClick={save} startIcon={<SaveIcon/>}>บันทึกข้อมูล</LoadingButton>
                    </Box>
                  </CardActions>
                </Card>
            </Stack>
        </Container>
    </Slide>
  )
}
