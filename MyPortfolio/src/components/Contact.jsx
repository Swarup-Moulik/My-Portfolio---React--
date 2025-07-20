import { Instagram, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { cn } from '../lib/utils'
import { useToast } from '@/hooks/use-toast.js';
import { PortfolioContext } from '../context/PortfolioContext';

const Contact = () => {
    const { toast } = useToast();
    const { port } = useContext(PortfolioContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            toast({
                title: 'Message Sent!',
                description: 'Thank you for your message! I will get back to you soon.'
            });
            setIsSubmitting(false);
        }, 1500)
    }
    return (
        <section id='contact' className='py-24 px-4 relative bg-secondary-30'>
            <div className='container mx-auto max-w-5xl'>
                <h2 className='text-3xl md:text-4xl font-bold text-center mb-4'>
                    Get in <span className='text-primary'> Touch </span>
                </h2>
                <p className='text-center text-muted-foreground mb-12 max-w-2xl mx-auto'>
                    Have a project in mind? Let's collaborate! Whether you have a question, want to discuss a project, or just want to say hello, feel free to reach out. I'm always open to new opportunities and ideas.
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    <div className='space-y-8 '>
                        <h3 className='text-2xl font-semibold mb-6'>
                            Contact Information
                        </h3>
                        <div className='space-y-6 justify-center'>
                            <div className='flex items-start space-x-4'>
                                <div className='p-3 rounded-full bg-primary/10'>
                                    <Mail className='h-6 w-6 text-primary' />
                                </div>
                                <div>
                                    <h4 className='font-medium'> Email </h4>
                                    <a href={`mailto:${port.email}`} className='text-muted-foreground hover:text-primary transition-colors'>{port?.email || 'Email'}</a>
                                </div>
                            </div>
                            <div className='flex items-start space-x-4'>
                                <div className='p-3 rounded-full bg-primary/10'>
                                    <Phone className='h-6 w-6 text-primary' />
                                </div>
                                <div>
                                    <h4 className='font-medium'> Phone </h4>
                                    <a href={`tel:${port.phoneNumber}`} className='text-muted-foreground hover:text-primary transition-colors'>{port?.phoneNumber || 'Number'}</a>
                                </div>
                            </div>
                            <div className='flex items-start space-x-4'>
                                <div className='p-3 rounded-full bg-primary/10'>
                                    <MapPin className='h-6 w-6 text-primary' />
                                </div>
                                <div>
                                    <h4 className='font-medium'> Location</h4>
                                    <a className='text-muted-foreground hover:text-primary transition-colors'>{port?.location || 'Location'}</a>
                                </div>
                            </div>
                        </div>
                        <div className='pt-8'>
                            <h4 className='font-medium mb-4'> Connect With Me :- </h4>
                            <div className='flex space-x-4 justify-center'>
                                <a href={port.linkedin} target='_blank'><Linkedin /></a>
                                <a href={port.instagram} target='_blank'><Instagram /></a>
                            </div>
                        </div>
                    </div>
                    <div className='bg-card p-8 rounded-lg shadow-xs'>
                        <h3 className='text-2xl font-semibold mb-6'>Send a Message</h3>
                        <form action="" className='space-y-6' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className='block text-md font-medium mb-2'>Your Name</label>
                                <input type="text" id='name' name='name' required
                                    className='w-full px-4 py-3 h-10 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary'
                                    placeholder='Swarup'
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className='block text-md font-medium mb-2'>Your Email</label>
                                <input type="email" id='email' name='email' required
                                    className='w-full px-4 py-3 h-10 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary'
                                    placeholder='john@gmail.com'
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className='block text-md font-medium mb-2'>Your Message</label>
                                <textarea type="text" id='message' name='message' required
                                    className='w-full px-4 py-3 resize-none rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary'
                                    placeholder="Hello, I'd like to talk about ... "
                                />
                            </div>
                            <button type='submit' disabled={isSubmitting} className={cn(
                                "cosmic-button w-full flex items-center justify-center gap-2",

                            )}>
                                {isSubmitting
                                    ?
                                        "Submitting..."
                                    :
                                        <>
                                            Send Message <Send size={16} />
                                        </>
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
