import React from 'react'
import "./Loading.css"

interface Props {
    width: string,
    height: string,
    transform: string,
}

const Loading: React.FC<Props> = ({ width, height, transform }) => {
    return (
        <div style={{ width: width, height: height }}>
            <div className="loadingio-spinner-spinner-kichqf665ek">
                <div className="ldio-5hp9ya5nwxm" style={{ transform: transform }}>
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        </div>
    )
}

export default Loading