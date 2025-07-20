import { Briefcase, Code, User } from 'lucide-react';
import React, { useState, useEffect, useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext';

const About = () => {
    const { port } = useContext(PortfolioContext);
    return (
        <section id='about' className='py-24 px-4 relative'>
            <div className='container mx-auto max-w-5xl'>
                <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
                    About <span className='text-primary'> Me </span>
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                    <div className='space-y-4'>
                        <h3 className='text-2xl font-semibold'>{port?.reflex || 'My Reflexion'}</h3>
                        <p className='text-muted-foreground text-lg'>
                            {port?.story || 'My Story'}
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 pt-4 justify-center'>
                            <a href="#contact" className='cosmic-button'> Get in Touch </a>
                            <a href={port?.cv || 'Cv'} className='px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300' download> Download CV </a>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-6'>
                        <div className='gradient-border p-6 card-hover '>
                            <div className='flex items-start gap-4'>
                                <div className='p-3 rounded-full bg-primary/10'>
                                    <Code className='w-6 h-6 text-primary' />
                                </div>
                                <div className='text-left'>
                                    <h4 className='font-semibold text-lg'> {port?.nspf || 'First Speciality Name'} </h4>
                                    <p className='text-muted-foreground'>{port?.dspf || 'First Speciality Description'}</p>
                                </div>
                            </div>
                        </div>
                        <div className='gradient-border p-6 card-hover '>
                            <div className='flex items-start gap-4'>
                                <div className='p-3 rounded-full bg-primary/10'>
                                    <User className='w-6 h-6 text-primary' />
                                </div>
                                <div className='text-left'>
                                    <h4 className='font-semibold text-lg'> {port?.nsps || 'Second Speciality Name'} </h4>
                                    <p className='text-muted-foreground'>{port?.dsps || 'Second Speciality Description'}</p>
                                </div>
                            </div>
                        </div>
                        <div className='gradient-border p-6 card-hover '>
                            <div className='flex items-start gap-4'>
                                <div className='p-3 rounded-full bg-primary/10'>
                                    <Briefcase className='w-6 h-6 text-primary' />
                                </div>
                                <div className='text-left'>
                                    <h4 className='font-semibold text-lg'> Work Experience </h4>
                                    <p className='text-muted-foreground'>{port?.experience || 'Work Experience'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;
