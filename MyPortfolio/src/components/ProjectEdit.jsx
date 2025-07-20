import { ArrowRight, ExternalLink, Github, X, UploadCloudIcon } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { PortfolioContext } from '../context/PortfolioContext';
import { toast } from 'react-toastify';

const ProjectEdit = () => {
  const { port, handleUpdate, handleRemoveItem } = useContext(PortfolioContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    about: '',
    image: null,
    stack: [],
    tempStack: '',
    live: '',
    github: '',
  });

  const handleInputChange = (field, value) => {
    setNewProject((prev) => ({ ...prev, [field]: value }));
  };

  const handleStackKeyDown = (e) => {
    if (["Enter", ",", ".", " "].includes(e.key)) {
      e.preventDefault();
      const trimmed = newProject.tempStack.trim();
      if (!trimmed) return;
      if (!newProject.stack.includes(trimmed)) {
        setNewProject((prev) => ({
          ...prev,
          stack: [...prev.stack, trimmed],
          tempStack: '',
        }));
      }
    }
  };

  const handleImageChange = (file) => {
    setNewProject((prev) => ({ ...prev, image: file }));
  };

  const handleRemoveStackTag = (tag) => {
    setNewProject((prev) => ({
      ...prev,
      stack: prev.stack.filter((t) => t !== tag),
    }));
  };

  const submitProject = async () => {
    const { title, about, image, stack, live, github } = newProject;
    if (!title || !about || !image || !stack || !live || !github) return toast.error("All fields are required");
    setIsSubmitting(true); // ⏳ Start loading
    try {
      await handleUpdate('projects', [{ title, about, image, stack, live, github }], { image });

      // ✅ Reset form after successful submission
      setNewProject({
        title: '',
        about: '',
        image: null,
        stack: [],
        tempStack: '',
        live: '',
        github: '',
      });
    } catch (err) {
      toast.error("Project update failed");
    } finally {
      setIsSubmitting(false); // ✅ Stop loading regardless of success/failure
    }
  };

  return (
    <div className='mx-3 bg-primary/20 py-3 mt-3 px-3 rounded-md'>
      <h2 className='text-3xl font-bold text-center mb-3 mt-2'>
        My  <span className='text-glow'> Featured </span> <span className='text-primary'> Projects </span>
      </h2>
      {(!port.projects || port.projects.length === 0) ?
        <div className="text-center text-glow font-bold m-10 text-xl text-primary-foreground">
          No Projects in here. Flex your skills!
        </div>
        :
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
                  {/* Left-side icon group */}
                  <div className='flex space-x-3'>
                    <a
                      href={project.live}
                      target='_blank'
                      className='text-foreground/80 hover:text-primary transition-colors duration-300'
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.github}
                      target='_blank'
                      className='text-foreground/80 hover:text-primary transition-colors duration-300'
                    >
                      <Github size={20} />
                    </a>
                  </div>
                  {/* Right-aligned X button */}
                  <button className='transition-colors duration-300 hover:text-primary cursor-pointer' onClick={() => handleRemoveItem('projects', project.title)}>
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
      <div className='flex justify-center'>
        <hr className='bg-primary w-[75%] mx-3 my-7 justify-center h-[3px]' />
      </div>
      <h2 className='text-3xl font-bold text-center mb-3'>
        Add  <span className='text-glow'> New </span> <span className='text-primary'> Projects </span>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-[1fr_0.5fr_1fr_1fr] px-1 py-1 gap-3 w-full rounded-md'>
        <div className="flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover">
          <label htmlFor={`title`} className='text-lg font-semibold'>Project Title :-</label>
          <input
            type="text"
            name={`title`}
            id={`title `}
            value={newProject.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="E-commerce Website"
            className="bg-background rounded-md px-2 py-2 w-full"
            required
          />
          <label htmlFor={`about`} className='text-lg font-semibold'>About Project :-</label>
          <input
            type="text"
            name={`about`}
            id={`about`}
            value={newProject.about}
            onChange={(e) => handleInputChange('about', e.target.value)}
            placeholder="Such an AI powered..."
            className="bg-background rounded-md px-2 py-2 w-full"
            required
          />
        </div>
        <div className="flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover md:w-full">
          <p className='text-lg font-semibold'>Snapshot :-</p>
          <label htmlFor={`image`} className='rounded-md card-hover overflow-hidden'>
            {newProject.image ? (
              <img className='w-full h-full my-2 object-cover transition-transform duration-500 hover:scale-110 rounded-md'
                src={
                  typeof newProject.image === 'string'
                    ? newProject.image
                    : URL.createObjectURL(newProject.image)
                } alt="Snapshot" />
            ) : (
              <UploadCloudIcon className="w-35 h-35 mx-6" />
            )}
            <input onChange={(e) => handleImageChange(e.target.files[0])} type="file" id={`image`} hidden />
          </label>
        </div>
        <div className="flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover">
          <label htmlFor={`stack`} className='text-lg font-semibold'>Technical Stack :-</label>
          <textarea
            type="text"
            value={newProject.tempStack}
            onChange={(e) => handleInputChange('tempStack', e.target.value)}
            onKeyDown={handleStackKeyDown}
            placeholder="Type a skill and press space/enter/comma/period"
            className="bg-background rounded-md resize-none p-2 w-full h-full"
          />
          {newProject.stack?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {newProject.stack.map((s, i) => (
                <span key={i} className="bg-background px-2 pb-1 rounded flex gap-2 items-center">
                  {s} <X size={14} className='cursor-pointer mt-1' onClick={() => handleRemoveStackTag(s)} />
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover">
          <label htmlFor={`live`} className='text-lg font-semibold'>Live URL :-</label>
          <input
            type="text"
            name={`live`}
            id={`live`}
            value={newProject.live}
            onChange={(e) => handleInputChange('live', e.target.value)}
            placeholder="www.shadi.com"
            className="bg-background rounded-md px-2 py-2 w-full"
            required
          />
          <label htmlFor={`github`} className='text-lg font-semibold'>Git-Hub Repo :-</label>
          <input
            type="text"
            name={`github`}
            id={`github`}
            value={newProject.github}
            onChange={(e) => handleInputChange('github', e.target.value)}
            placeholder="www.github/shadi.com"
            className="bg-background rounded-md px-2 py-2 w-full"
            required
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <button className='cosmic-button rounded-md p-2 mx-3 mt-3 text-lg' onClick={submitProject} disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Portray New Adventure'}
        </button>
      </div>
    </div>
  )
}
export default ProjectEdit
