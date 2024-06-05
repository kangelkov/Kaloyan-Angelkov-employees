import React, { useState } from 'react'
import { Button, Typography, CircularProgress } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { parseCSV } from '../utils/parseCSV.ts'
import { FileUploadProps } from '../types.ts'
import { HiddenInput } from '../styles.ts'

const FileUpload: React.FC<FileUploadProps> = ({ onDataParsed }) => {
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
            if (!e.target.files[0]) return
            parseCSV(e.target.files[0])
                .then(onDataParsed)
                .catch(console.error)
                .finally(() => setLoading(false))
            setLoading(true)
        }
    }

    return (
        <>
            <Typography variant="h6">{file?.name}</Typography>
            <HiddenInput
                accept=".csv"
                id="button-file"
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="button-file">
                <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Choose a file'}
                </Button>
            </label>
        </>
    )
}

export default FileUpload
