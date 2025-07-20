import React, { useState, useContext } from 'react'
import { cn } from '../lib/utils';
import { PortfolioContext } from '../context/PortfolioContext';
import { Cross, CrossIcon, X } from 'lucide-react';
import { toast } from 'react-toastify';

const categories = ['All', 'Frontend', 'Backend', 'Tools', 'AIML & Data Science', 'Others'];
const SkillsEdit = () => {
  const { port, handleUpdate, handleRemoveItem } = useContext(PortfolioContext);
  const [activeCat, setActiveCat] = useState("All");
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const filteredSkills = (port.skills ?? []).filter(skill => activeCat === 'All' || skill.category === activeCat);
  const submitSkill = async () => {
    const { name, level, category } = newSkill;
    if (!name || !level || !category) return toast.error("All fields are required");

    const parsedLevel = parseInt(level);
    if (isNaN(parsedLevel) || parsedLevel < 0 || parsedLevel > 100)
      return toast.error("Skill level must be a number between 0 and 100");
    setIsSubmitting(true); // ⏳ Start loading
    try {
      await handleUpdate('skills', [{ name, level: parsedLevel, category }]);

      // ✅ Reset form after successful submission
      setNewSkill({ name: '', level: '', category: '' });
    } catch (err) {
      toast.error("Project update failed");
    } finally {
      setIsSubmitting(false); // ✅ Stop loading regardless of success/failure
    }
  };

  return (
    <div className='mx-3 bg-primary/20 py-3 mt-3 px-3 rounded-md'>
      <h2 className='text-3xl font-bold text-center mb-3 mt-3'>
        My  <span className='text-glow'> Existing </span> <span className='text-primary'> Skills </span>
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
      <div>
        {(!port.skills || port.skills.length === 0) ?
          <div className="text-center text-glow font-bold m-10 text-xl text-primary-foreground">
            No skills in here. Train Yourself!
          </div>
          :
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {(filteredSkills ?? []).map((skill, key) => (
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
                <div className='flex gap-3 mt-3 justify-around'>
                  <p className='text-md text-gray-200'>{skill.category}</p>
                  <button className='transition-colors duration-300 hover:text-primary cursor-pointer'
                    onClick={() => handleRemoveItem('skills', skill.name)}
                  >
                    <X />
                  </button>
                </div>
              </div>
            ))
            }
          </div>
        }
      </div>
      <div className='flex justify-center'>
        <hr className='bg-primary w-[75%] mx-3 my-7 justify-center h-[3px]' />
      </div>
      <h2 className='text-3xl font-bold text-center mb-3'>
        Add  <span className='text-glow'> New </span> <span className='text-primary'> Skills </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1.5fr] px-1 py-1 gap-3 md:mx-1 rounded-md">
        <div className="flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover">
          <label htmlFor={`name`} className='text-lg font-semibold'>Skill Name :-</label>
          <input
            type="text"
            name={`name`}
            id={`name`}
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            placeholder="React"
            className="bg-background rounded-md px-2 py-2 w-full"
            required
          />
        </div>
        <div className="flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover">
          <label htmlFor={`level`} className='text-lg font-semibold'>Skill Level [0-100%] :-</label>
          <input
            type="text"
            name={`level`}
            id={`level`}
            value={newSkill.level}
            onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
            placeholder="75"
            className="bg-background rounded-md px-2 py-2 w-full"
            required
          />
        </div>
        <div className="flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover">
          <label htmlFor={`category`} className='text-lg font-semibold'>Category :-</label>
          <input
            type="text"
            name={`category`}
            id={`category`}
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
            placeholder="Frontend"
            className="bg-background rounded-md px-2 py-2 w-full"
            required
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <button className='cosmic-button rounded-md p-2 mx-3 mt-3 text-lg' onClick={submitSkill} disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Your Competences'}
        </button>
      </div>
    </div>
  )
}

export default SkillsEdit
