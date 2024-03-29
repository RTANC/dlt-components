import { Card, Container, Slide, Box, CardContent, Grid, CardActions, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SelectStation from '../../../components/SelectStation'
import DltTextField from '../../../components/DltTextField'
import { useParams, useNavigate } from 'react-router-dom'
import formValidator, { validator } from '../../../services/validator'
import RadioBoxIsActiveUser from '../../../components/RadioBoxIsActiveUser'
import SelectTransportType from '../../../components/SelectTransportType'
import SelectTransportScope from '../../../components/SelectTransportScope'
import { createCompany, getCompany, updateCompany } from '../../../services/managements'
import BtnBack from '../../../components/BtnBack'
import BtnSave from '../../../components/BtnSave'
import { getKeyValue } from '../../../services/utils'

export default function CompanyForm() {
    const [loading, setLoading] = useState(false)
    const [valid, setValid] = useState(false)
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
            error: false,
            rules: [(v) => (v.trim() !== '') || '*ข้อมูลจำเป็น'],
        },
        taxId: {
            value: '',
            rules: [(v) => (v.trim() !== '') || '*ข้อมูลจำเป็น'],
            error: false
        },
        transportType: {
            value: 1
        },
        transportScope: {
            value: 1
        },
        transportLicense: {
            value: ''
        },
        isActive: {
            value: 'false'
        }
    })

    const handleValueChange = (e) => {
        company[e.target.name].value = e.target.value
        if (e.target.name === 'isActive') {
            if (e.target.value === 'true') {
                company[e.target.name].value = true
            } else {
                company[e.target.name].value = false
            }
        }
        setCompany({...company})
        setValid(formValidator(company, setCompany))
    }

    const handleValidateValue = (e) => {
        // company[e.target.name].error = validator(e.target.value, company[e.target.name].rules)
        // setCompany({...company})
        setValid(formValidator(company, setCompany))
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
            setValid(formValidator(company, setCompany))
        } catch (error) {
          console.log(error)
        }
      }

    const save  = async () => {
        try {
            setLoading(true)
            if (editMode) {
                await updateCompany(companyId, getKeyValue(company))
            } else {
                await createCompany(getKeyValue(company))
            }
            navigate(-1)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
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
            <div className='dlt-page-title'>
              <div className='dlt-page-title-text-s'>{editMode ? 'แก้ไขข้อมูลผู้ประกอบการ' : 'เพิ่มข้อมูลผู้ประกอบการ'}</div>
              <div className='dlt-page-title-line'></div>
            </div>
            <Stack spacing={2}>
                <Card>
                    <CardContent>
                      <Grid container spacing={2} direction='row' wrap="wrap">
                        <Grid item xs={12}>
                          <SelectStation name='station' value={company.station.value} onChange={handleValueChange} disabled={editMode}></SelectStation>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <DltTextField name='companyName' value={company.companyName.value} onChange={handleValueChange} label='ชื่อผู้ประกอบการ' required error={company.companyName.error}></DltTextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <DltTextField name='taxId' value={company.taxId.value} onChange={handleValueChange} label='เลขประจำตัวผู้เสียภาษี' required error={company.taxId.error}></DltTextField>
                        </Grid>
                        { editMode && <Grid item xs={12} sm={12} md={6} lg={6}>
                            <DltTextField name='companyId' value={company.companyId} label='รหัส' readOnly></DltTextField>
                        </Grid>}
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
                            <DltTextField name='transportLicense' value={company.transportLicense.value} onChange={handleValueChange} label='เลขที่ใบอนุญาต'></DltTextField>
                        </Grid>
                      </Grid>
                    </CardContent>
                </Card>
                <Card>
                  <CardActions>
                    <Box sx={{width: '100%', display:'flex', justifyContent:'center', alignContent: 'center', py: 2}}>
                        <BtnBack loading={loading} onClick={cancel}></BtnBack>
                        <BtnSave loading={loading} disabled={!valid} onClick={save}></BtnSave>
                    </Box>
                  </CardActions>
                </Card>
            </Stack>
        </Container>
    </Slide>
  )
}
