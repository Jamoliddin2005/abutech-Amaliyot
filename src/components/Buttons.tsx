import { Button } from '@mui/material'
import React from 'react'
import Loading from './Loading/Loading'

interface Props {
    classes: string,
    title: string,
    OnClick: Function,
    loading: boolean,
}

const Buttons: React.FC<Props> = ({ classes, title, OnClick,
    loading }) => {
    return (
        <Button className={classes} variant={"contained"} type='submit' onClick={(e) => OnClick(e)}>
            {loading ? <Loading width="35px" height="35px" transform={"translateZ(0) scale(.3)"} /> : title}
        </Button>
    )
}

export default Buttons