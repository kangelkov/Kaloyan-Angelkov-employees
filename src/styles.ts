import styled from 'styled-components'
import { Container } from '@mui/material'

export const AppContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`

export const HiddenInput = styled.input`
    display: none;
`

export const DataGridContainer = styled.div`
    height: 400px;
    width: 100%;
    margin-top: 20px;
`
