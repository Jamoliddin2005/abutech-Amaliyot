import React from 'react'
import { FormControl, InputLabel, Input } from '@mui/material'

interface Props {
    classes: string,
    title: string,
    setValue: Function,
    value: string,
    type: string,
}

const Inputs: React.FC<Props> = ({ classes, title, value,
    setValue, type }) => {
    return (
        <FormControl className={classes}>
            <InputLabel >{title}</InputLabel>
            <Input type={type} aria-describedby="my-helper-text" value={value} onChange={(e) => setValue(e.target.value)} />
        </FormControl>
    )
}

export default Inputs