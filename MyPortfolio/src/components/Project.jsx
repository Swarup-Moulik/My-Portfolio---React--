import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import React, { useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext';

const Project = () => {
    const { port } = useContext(PortfolioContext);
    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className='container mx-auto max-w-5xl'>
                <h2 className='text-3xl md:text-4xl font-bold mb-4 text-center'>
                    Featured <span className='text-primary'> Projects </span>
                </h2>
                <p className='text-center text-muted-foreground mb-12 max-w-2xl mx-auto'>
                    Here are some of my recent projects that I have worked on. Click on the links to view the live demos or the source code on GitHub.
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {(port.projects ?? []).map((project, key) => (
                        <div key={key} className='group bg-card rounded-lg shadow-xs overflow-hidden card-hover'>
                            <div className='h-48 overflow-hidden'>
                                <img src={project.image} alt={project.title} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' />
                            </div>
                            <div className='p-6'>
                                <div className='flex flex-wrap gap-2 mb-4'>
                                    {project.stack.map((tag, key) => (
                                        <span key={key} className='px-2 py-1 text-xs border font-medium rounded-full background-secondary text-secondary-foreground'> {tag} </span>
                                    ))}
                                </div>
                                <h3 className='text-xl font-semibold mb-1'>{project.title}</h3>
                                <p className='text-muted-foreground text-sm mb-4'>{project.about}</p>
                                <div className='flex justify-between items-center mt-2'>
                                    <div className='flex space-x-3'>
                                        <a
                                            href={project.live}
                                            target='_blank'
                                            className='text-foreground/80  hover:text-primary transition-colors duration-300'
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                        <a
                                            href={project.github}
                                            target='_blank'
                                            className='text-foreground/80  hover:text-primary transition-colors duration-300'
                                        >
                                            <Github size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='text-center mt-12'>
                    <a
                        href={port?.git || "git"}
                        target='_blank'
                        className='cosmic-button w-fit flex items-center mx-auto gap-2'
                    >
                        Check My Git-Hub <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Project
