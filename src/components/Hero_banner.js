import React from 'react'

export default function Hero_banner ({text}) {
    return (
        <div>
            <div className='h-60 bg-heroimage bg-cover bg-center bg-no-repeat flex items-center justify-center'>
                <h1 className='p-4 uppercase font-bold text-4xl'>{text}</h1>
            </div>
        </div>
    )
}
