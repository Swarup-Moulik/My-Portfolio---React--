import React, { useState } from 'react'
import { cn } from '../lib/utils';
import { useContext } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';


const categories = ['All', 'Frontend', 'Backend', 'Tools', 'AIML & Data Science', 'Others'];
const Skills = () => {
    const { port } = useContext(PortfolioContext);
    const [activeCat, setActiveCat] = useState("All");
    const filteredSkills = (port.skills ?? []).filter(skill => activeCat === 'All' || skill.category === activeCat);
    return (
        <section id='skills' className='py-24 px-4 relative bg-secondary/30'>
            <div className='container mx-auto max-w-5xl '>
                <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
                    My <span className='text-primary'> Skills </span>
                </h2>
                <div className='flex flex-wrap justify-center gap-4 mb-12'>
                    {categories.map((category, key) => (
                        <button
                            key={key}
                            onClick={() => setActiveCat(category)}
                            className={cn(
                                'px-5 py-2 rounded-full transition-colors duration-300 capitalize',
                                activeCat === category ? 'bg-primary text-primary-foreground' : 'bg-secondary/70 text-foreground hover:bg-secondary'
                            )}
                        >
                            {category}
                        </button>
                    ))
                    }
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {filteredSkills.map((skill, key) => (
                        <div key={key} className='bg-card p-6 rounded-lg shadow-xs card-hover'>
                            <div className='text-left mb-4 '>
                                <h3 className='text-lg font-semibold'>{skill.name}</h3>
                            </div>
                            <div className='w-full bg-secondary/50 rounded-full h-2 overflow-hidden'>
                                <div
                                    className='bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out_0.2s_forwards]'
                                    style={{ '--tw-grow-width': `${skill.level}%`, width: "0%" }}
                                />
                            </div>
                            <div className='text-right mt-1'>
                                <span className='text-sm text-muted-foreground'>{skill.level}%</span>
                            </div>
                            <p className='text-md text-gray-200'>{skill.category}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills
