import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PortfolioContext } from '../context/PortfolioContext'
import BasicInfoEdit from '../components/BasicInfoEdit'
import WorkInfoEdit from '../components/WorkInfoEdit'
import SkillsEdit from '../components/SkillsEdit'
import ProjectEdit from '../components/ProjectEdit'
import ContactEdit from '../components/ContactEdit'
import { cn } from "../lib/utils";
import { User, Menu, X } from 'lucide-react'

const Edit = () => {
  const { user: userIdFromURL } = useParams();
  const [activeSection, setActiveSection] = useState(localStorage.getItem('activeSection') || 'basic');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getPortfolio, loading, portfolio, navigate, handleDeleteAccount } = useContext(PortfolioContext);
  const getButtonClass = (section) =>
    `rounded-md text-xl flex py-2 justify-center cursor-pointer md:text-primary-foreground transition-colors ${activeSection === section
      ? 'md:bg-primary md:text-primary-foreground/80 text-primary'
      : 'md:hover:bg-primary md:hover:text-white hover:text-primary text-primary-foreground/70'
    }`;
  const handleSectionChange = (section) => {
    setActiveSection(section);
    localStorage.setItem('activeSection', section);
  };
  useEffect(() => {
    if (userIdFromURL) {
      getPortfolio(userIdFromURL); // ⬅️ pass user ID from the URL
    }
  }, [userIdFromURL]);
  if (loading || !portfolio) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="animate-pulse text-lg text-muted">Editor Goes In...</p>
      </div>
    )
  }
  return (
    <div className='flex items-center justify-center container px-5 min-h-screen'>
      <div className='w-full rounded-md shadow-2xl p-6'>
        <h1 className='text-3xl my-3 font-bold text-center'>
          <div className='flex flex-row gap-2 justify-center'>
            <span className='text-primary'> Redefine </span>
            <span className='text-glow'> Yourself </span>
            {!isMenuOpen && (
              <button
                onClick={() => setIsMenuOpen(true)}
                className="fixed top-4 right-4 z-50 p-2 bg-background/80 rounded-md shadow-md md:hidden"
                aria-label="Open menu"
              >
                <Menu size={28} className="text-foreground" />
              </button>
            )}
          </div>
          <hr className='mx-2 my-2 h-[2px] bg-primary-foreground' />
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-[1fr_7fr] gap-2 w-full'>
          <div className='hidden md:flex flex-col text-xl pt-5 gap-5 max-h-120 rounded-md mt-3 bg-primary/5 text-primary'>
            <div onClick={() => handleSectionChange('basic')} className={getButtonClass('basic')}>Basic Info</div>
            <div className={getButtonClass('work')} onClick={() => handleSectionChange('work')}>Work Info</div>
            <div className={getButtonClass('skills')} onClick={() => handleSectionChange('skills')}>Skills</div>
            <div className={getButtonClass('projects')} onClick={() => handleSectionChange('projects')}>Project</div>
            <div className={getButtonClass('contact')} onClick={() => handleSectionChange('contact')}>Contact</div>
            <div className="cosmic-button bg-transparent hover:bg-primary rounded-md" onClick={() => navigate('/')}> Home </div>
            <div className="cosmic-button text-xl bg-transparent hover:bg-primary rounded-md flex gap-2 justify-center" onClick={handleDeleteAccount} >
              <div>Delete</div><User />
            </div>
          </div>
          <div>
            {activeSection === 'basic' && <BasicInfoEdit />}
            {activeSection === 'work' && <WorkInfoEdit />}
            {activeSection === 'skills' && <SkillsEdit />}
            {activeSection === 'projects' && <ProjectEdit />}
            {activeSection === 'contact' && <ContactEdit />}
          </div>
          {/* Phone Menu */}
          <div className={cn("fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col gap-5 items-center justify-center",
            "md:hidden transition-all duration-300",
            isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}>
            <div onClick={() => { handleSectionChange('basic'); setIsMenuOpen(false); }} className={getButtonClass('basic')}>Basic Info</div>
            <div onClick={() => { handleSectionChange('work'); setIsMenuOpen(false); }} className={getButtonClass('work')}>Work Info</div>
            <div onClick={() => { handleSectionChange('skills'); setIsMenuOpen(false); }} className={getButtonClass('skills')}>Skills</div>
            <div onClick={() => { handleSectionChange('projects'); setIsMenuOpen(false); }} className={getButtonClass('projects')}>Project</div>
            <div onClick={() => { handleSectionChange('contact'); setIsMenuOpen(false); }} className={getButtonClass('contact')}>Contact</div>
            <div className={getButtonClass('home')} onClick={() => navigate('/')}> Home </div>
            <div className={getButtonClass('delete')} onClick={handleDeleteAccount} >
              <div>Delete</div><User />
            </div>
            <div className='cursor-pointer'>
              <X size={24} onClick={() => setIsMenuOpen((prev) => !prev)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
