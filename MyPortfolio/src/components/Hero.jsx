import { ArrowDown } from 'lucide-react'
import React, { useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'

const Hero = () => {
    const { port } = useContext(PortfolioContext);
    return (
        <section
            id='hero'
            className='relative min-h-screen flex flex-col items-center justify-center p-4'
        >
            <div className='container max-w-4xl mx-auto text-center z-10'>
                <div className='space-y-6'>
                    <h1 className='h-4xl text-3xl md:text-6xl font-bold tracking-tight'>
                        <span className='opacity-0 animate-fade-in'> Hi, I'm </span>
                        <span className='text-primary opacity-0 animate-fade-in-delay-1'> {port?.firstName || 'FirstName'} </span>
                        <span className='text-gradient opacity-0 animate-fade-in-delay-2'> {port?.lastName || 'LastName'} </span>
                    </h1>
                    <p className='text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3'>
                        {port?.description || 'Description'}
                    </p>
                    <div className='pt-2 opacity-0 animate-fade-in-delay-4'>
                        <a href="#projects" className='cosmic-button'>View My Work</a>
                    </div>
                </div>
            </div>

            <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce'>
                <span className='text-lg text-muted-foreground mb-2'> Scroll </span>
                <ArrowDown className='w-5 h-5 text-primary text-md' />
            </div>
        </section>
    )
}

export default Hero
