import { Minus, Plus, UploadCloudIcon, User, X } from 'lucide-react';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PortfolioContext } from '../context/PortfolioContext';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const Initial = () => {
  const [skills, setSkills] = useState(0);
  const [project, setProject] = useState(0);
  const [loading, setLoading] = useState(false);
  const { navigate, backendURL, token, user, setUser, setPortfolio } = useContext(PortfolioContext);
  const [myLife, setMyLife] = useState({
    fName: '',
    lName: '',
    description: '',
    reflex: '',
    story: '',
    nspf: '',
    dspf: '',
    nsps: '',
    dsps: '',
    experience: '',
    email: '',
    number: '',
    location: '',
    git: '',
    linkedin: '',
    instagram: '',
    cv: null,
    skills: [],       // array of { name, level, category }
    projects: [],     // array of { title, about, image, stack, live, github }
  });
  useEffect(() => {
    if (!token || token.split('.').length !== 3) {
      console.warn("Invalid token");
      navigate('/login');
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUser(decoded.id); // ✅ safe here
    } catch (err) {
      console.error("JWT Decode failed", err);
      navigate('/login');
    }
  }, [token]);
  //Handle Functions
  const handleMyLifeChange = (e) => {
    const { name, value } = e.target;
    setMyLife(prev => ({ ...prev, [name]: value }));
  };
  // Skill change
  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...myLife.skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setMyLife(prev => ({ ...prev, skills: updatedSkills }));
  };
  // Project change
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...myLife.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setMyLife(prev => ({ ...prev, projects: updatedProjects }));
  };
  // For image
  const handleProjectImageChange = (index, file) => {
    const updatedProjects = [...myLife.projects];
    updatedProjects[index] = { ...updatedProjects[index], image: file };
    setMyLife(prev => ({ ...prev, projects: updatedProjects }));
  };
  // Stack entry handling
  const handleStackChange = (index, value) => {
    const updatedProjects = [...myLife.projects];
    updatedProjects[index] = { ...updatedProjects[index], tempStack: value };
    setMyLife(prev => ({ ...prev, projects: updatedProjects }));
  };
  const handleStackKeyDown = (index, e) => {
    if (['Enter', ',', '.', ' '].includes(e.key)) {
      e.preventDefault();
      const trimmed = (myLife.projects[index].tempStack || '').trim();
      if (!trimmed) return;
      const updatedProjects = [...myLife.projects];
      if (!updatedProjects[index].stack?.includes(trimmed)) {
        updatedProjects[index].stack = [...(updatedProjects[index].stack || []), trimmed];
      }
      updatedProjects[index].tempStack = '';
      setMyLife(prev => ({ ...prev, projects: updatedProjects }));
    }
  };
  const handleRemoveStackTag = (projectIndex, tag) => {
    const updatedProjects = [...myLife.projects];
    updatedProjects[projectIndex].stack = updatedProjects[projectIndex].stack.filter((t) => t !== tag);
    setMyLife((prev) => ({ ...prev, projects: updatedProjects }));
  };
  //useEffect
  useEffect(() => {
    setMyLife(prev => ({
      ...prev,
      skills: Array.from({ length: skills }, (_, i) => prev.skills[i] || { name: '', level: '', category: '' })
    }));
  }, [skills]);
  useEffect(() => {
    setMyLife(prev => ({
      ...prev,
      projects: Array.from({ length: project }, (_, i) => prev.projects[i] || { title: '', about: '', image: null, stack: [], live: '', github: '' })
    }));
  }, [project]);
  //Submit Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Form Data:", myLife);
    try {
      const formData = new FormData();
      formData.append('userId', user)
      // Append myLife text fields
      // Iterate over myLife keys to append all non-file data and stringify arrays
      for (const key in myLife) {
        if (myLife.hasOwnProperty(key)) {
          if (key === 'skills' || key === 'projects') {
            // Stringify arrays to send as JSON strings
            formData.append(key, JSON.stringify(myLife[key]));
          } else if (key === 'cv' && myLife.cv instanceof File) {
            // CV file is handled below, skip for now to avoid duplicate append
            continue;
          } else {
            // Append other text fields directly
            formData.append(key, myLife[key]);
          }
        }
      }
      // Append CV file if it exists
      if (myLife.cv instanceof File) {
        formData.append('cv', myLife.cv);
      }
      // Append project images individually
      myLife.projects.forEach((projectItem) => {
        if (projectItem.image instanceof File) {
          formData.append(`projectImages`, projectItem.image);
        }
      });
      setLoading(true);
      const response = await axios.post(backendURL + '/api/portfolio/add', formData, { headers: { token } });
      if (response.data.success) {
        setPortfolio(response.data.portfolio);
        toast.success(response.data.success);
        setMyLife({
          fName: '', lName: '', description: '', reflex: '', story: '', nspf: '', dspf: '', nsps: '', dsps: '',
          experience: '', email: '', number: '', location: '', git: '', linkedin: '', instagram: '', cv: null,
          skills: [], projects: [],
        });
        setSkills(0);
        setProject(0);
        // Redirect to the home page after successful submission
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='relative md:px-8 px-2 py-8 flex flex-col gap-2 font-semibold '>
      <div className='max-w-10xl mx-1 container z-10 justify-center w-[116%] md:w-full text-center'>
        <form onSubmit={onSubmitHandler} className='flex flex-col bg-background/10 rounded-md  py-2 md:text-lg gap-3'>
          <h1 className='mx-13 md:justify-center text-2xl md:text-3xl my-3 font-bold flex items-center gap-2 '>
            <span className='text-glow flex gap-2'><div> Talk </div><div> About </div><div className='text-primary flex'>Yourself<hr className='bg-primary w-15 md:w-20 mx-1 my-4 md:my-5 h-[2px]' /></div></span>
          </h1>
          {/*---Hero---*/}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:w-4xl w-[80%]'>
            <div className='flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover'>
              <label htmlFor="fName">First Name :-</label>
              <input type="text" name='fName' id='fName' value={myLife?.fName || ''} onChange={handleMyLifeChange} placeholder='John' className='bg-background rounded-md px-2 py-2 w-full' required />
            </div>
            <div className='flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover'>
              <label htmlFor="lName">Last Name :-</label>
              <input type="text" name='lName' id='lName' value={myLife?.lName || ''} onChange={handleMyLifeChange} placeholder='Doe' className='bg-background rounded-md px-2 py-2 w-full' required />
            </div>
            <div className='flex flex-col gap-3 items-start px-3 py-3 md:w-3xl bg-primary/30 rounded-lg card-hover'>
              <label htmlFor="description">Your Description :- </label>
              <textarea name="description" id="description" value={myLife?.description || ''} onChange={handleMyLifeChange} placeholder='I am a developer...' className='bg-background rounded-md px-2 py-2 w-full resize-none' required></textarea>
            </div>
          </div>
          {/*---About Left---*/}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:w-4xl w-[80%] md:px-5'>
            <div className='flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover'>
              <label htmlFor="reflex">Your Reflexion About Yourself:-</label>
              <input type="text" name='reflex' id='reflex' value={myLife?.reflex || ''} onChange={handleMyLifeChange} placeholder='AIML Engineer' className='bg-background rounded-md px-2 py-2 w-full' required />
            </div>
            <div className='flex flex-col gap-3 items-start px-3 py-3 md:w-4xl bg-primary/30 rounded-lg card-hover'>
              <label htmlFor="story">Life Story :- </label>
              <textarea name="story" id="story" value={myLife?.story || ''} onChange={handleMyLifeChange} placeholder='I am passionate...' className='bg-background rounded-md px-2 py-2 w-full resize-none' required></textarea>
            </div>
          </div>
          {/*---About Right---*/}
          <h1 className='text-2xl md:text-3xl my-3 font-bold flex mx-23 md:justify-center items-center gap-2 '>
            <span className='text-glow flex gap-2'><div> Your </div><div className='text-primary'> Real </div><div className='flex'>Life<hr className='bg-primary w-15 md:w-20 mx-1 my-4 md:my-5 h-[3px]' /></div></span>
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-3 md:w-4xl w-[80%]'>
            <div className='flex flex-col gap-3 items-start px-3 py-3 md:w-100 bg-primary/30 rounded-lg card-hover'>
              <label htmlFor="nspf">First Speciality :-</label>
              <input type="text" name='nspf' id='nspf' value={myLife?.nspf || ''} onChange={handleMyLifeChange} placeholder='Web Developer' className='bg-background rounded-md px-2 py-2 w-full' required />
              <label htmlFor="dspf">Your Anecdote :-</label>
              <input type="text" name='dspf' id='dspf' value={myLife?.dspf || ''} onChange={handleMyLifeChange} placeholder='Creating Legacies...' className='bg-background rounded-md px-2 py-2 w-full' required />
            </div>
            <div className='flex flex-col gap-3 items-start px-3 py-3 md:w-100 bg-primary/30 rounded-lg card-hover'>
              <label htmlFor="nsps">Second Speciality :-</label>
              <input type="text" name='nsps' id='nsps' value={myLife?.nsps || ''} onChange={handleMyLifeChange} placeholder='UI/UX Designer' className='bg-background rounded-md px-2 py-2 w-full' required />
              <label htmlFor="dsps">Your Anecdote :-</label>
              <input type="text" name='dsps' id='dsps' value={myLife?.dsps || ''} onChange={handleMyLifeChange} placeholder='Aesthethical Looks...' className='bg-background rounded-md px-2 py-2 w-full' required />
            </div>
            <div className='flex flex-col gap-3 items-start px-3 py-3 md:w-137 bg-primary/30 rounded-lg card-hover'>
              <label htmlFor="experience">Work Experience :- </label>
              <textarea name="experience" id="experience" value={myLife?.experience || ''} onChange={handleMyLifeChange} placeholder='Loyalist 4ever...' className='bg-background rounded-md px-2 py-2 w-full resize-none h-full' required></textarea>
            </div>
          </div>
          {/*---Skills---*/}
          <h1 className='md:justify-center mx-30 text-2xl md:text-3xl my-3 font-bold flex items-center gap-2 '>
            <span className='flex gap-2'><div className='text-glow'>Your</div><div className='text-primary flex'> Skills <hr className='bg-primary w-15 md:w-20 mx-1 my-4 md:my-5 h-[2px]' /></div></span>
          </h1>
          <div className='flex flex-row gap-2 bg-primary/30 rounded-lg justify-center py-2 md:px-[30%] px-2 md:mx-3 w-[80%] md:w-full'>
            <label htmlFor='skills' className='font-bold text-glow text-lg'>How Many Skills You Have :- </label>
            <input type="text" name='skills' id='skills' placeholder='15' onChange={(e) => setSkills(parseInt(e.target.value) || 0)} value={skills || ''} className='bg-background rounded-md px-2 py-1 w-10 md:w-50 h-8 text-lg md:h-7' required />
            <div className='flex flex-row gap-1 pt-1 md:pt-1'>
              <Plus onClick={(e) => setSkills(prev => prev + 1)} />
              <Minus onClick={(e) => setSkills(skills > 0 ? skills - 1 : 0)} />
            </div>
          </div>
          {/*---Your Skills---*/}
          {myLife.skills.map((skill, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1.5fr] px-3 py-3 gap-3 md:mx-3 md:w-full w-[80%] bg-primary/30 rounded-md"
            >
              <div className="flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover">
                <label htmlFor={`skillname-${index}`}>Skill <span className='font-extrabold'>{index + 1}</span> Name :-</label>
                <input
                  type="text"
                  name={`skillname-${index}`}
                  id={`skillname-${index}`}
                  value={skill?.name || ''}
                  onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                  placeholder="React"
                  className="bg-background rounded-md px-2 py-2 w-full"
                  required
                />
              </div>
              <div className="flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover">
                <label htmlFor={`skilllevel-${index}`}>Skill Level [0-100%] :-</label>
                <input
                  type="text"
                  name={`skilllevel-${index}`}
                  id={`skilllevel-${index}`}
                  value={skill?.level || ''}
                  onChange={(e) => handleSkillChange(index, 'level', Math.min(+e.target.value, 100).toString())}
                  placeholder="75"
                  className="bg-background rounded-md px-2 py-2 w-full"
                  required
                />
              </div>
              <div className="flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover">
                <label htmlFor={`category-${index}`}>Category :-</label>
                <input
                  type="text"
                  name={`category-${index}`}
                  id={`category-${index}`}
                  value={skill?.category || ''}
                  onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                  placeholder="Frontend"
                  className="bg-background rounded-md px-2 py-2 w-full"
                  required
                />
              </div>
            </div>
          ))}
          {/*---Featured Projects---*/}
          <h1 className='md:justify-center mx-22 text-2xl md:text-3xl my-3 font-bold flex items-center gap-2 '>
            <span className='flex gap-2'><div className='text-primary'>Reality</div><div className='text-glow flex'> Served <hr className='bg-primary w-15 md:w-20 mx-1 my-4 md:my-5 h-[2.5px]' /></div></span>
          </h1>
          <div className='flex flex-row gap-2 bg-primary/30 justify-center rounded-lg py-2 md:px-[30%] px-2 md:mx-3 w-[80%] md:w-full'>
            <p className='font-bold text-glow text-lg'>Projects You Want to Show :- </p>
            <input type="text" name='projnum' id='projnum' placeholder='15' onChange={(e) => setProject(parseInt(e.target.value) || 0)} value={project || ''} className='bg-background rounded-md px-2 py-2 w-10 md:w-50 h-8 text-lg md:h-7' required />
            <div className='flex flex-row gap-1 pt-1 md:pt-1'>
              <Plus onClick={(e) => setProject(prev => prev + 1)} />
              <Minus onClick={(e) => setProject(project > 0 ? project - 1 : 0)} />
            </div>
          </div>
          {/*---Your Featured Projects---*/}
          {myLife.projects.map((project, index) => (
            <div key={index} className='grid grid-cols-1 md:grid-cols-[1fr_0.5fr_1fr_1fr] px-3 py-3 gap-3 md:mx-3 md:w-full w-[80%] bg-primary/30 rounded-md'>
              <div className="flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover">
                <label htmlFor={`title-${index}`}>Project Title :-</label>
                <input
                  type="text"
                  name={`title-${index}`}
                  id={`title-${index}`}
                  value={project?.title || ''}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                  placeholder="E-commerce Website"
                  className="bg-background rounded-md px-2 py-2 w-full"
                  required
                />
                <label htmlFor={`about-${index}`}>About Project :-</label>
                <input
                  type="text"
                  name={`about-${index}`}
                  id={`about-${index}`}
                  value={project?.about || ''}
                  onChange={(e) => handleProjectChange(index, 'about', e.target.value)}
                  placeholder="Such an AI powered..."
                  className="bg-background rounded-md px-2 py-2 w-full"
                  required
                />
              </div>
              <div className="flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover md:w-full">
                <p>Snapshot :-</p>
                <label htmlFor={`image-${index}`} className='rounded-md card-hover overflow-hidden'>
                  {project.image ? (
                    <img className='w-full h-full my-2 object-cover transition-transform duration-500 hover:scale-110 rounded-md'
                      src={URL.createObjectURL(project.image)} alt="Snapshot" />
                  ) : (
                    <UploadCloudIcon className="w-35 h-35 mx-6" />
                  )}
                  <input onChange={(e) => handleProjectImageChange(index, e.target.files[0])} type="file" id={`image-${index}`} hidden />
                </label>
              </div>
              <div className="flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover">
                <label htmlFor={`stack-${index}`}>Technical Stack :-</label>
                <textarea
                  type="text"
                  value={project?.tempStack || ''}
                  onChange={(e) => handleStackChange(index, e.target.value)}
                  onKeyDown={(e) => handleStackKeyDown(index, e)}
                  placeholder="Type a skill and press space/enter/comma/period"
                  className="bg-background rounded-md resize-none p-2 w-full h-full"
                />
                {project.stack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.stack.map((s, i) => (
                      <span key={i} className="bg-background px-2 py-1 rounded flex gap-2 items-center">
                        {s} <X size={14} className='cursor-pointer mt-1' onClick={() => handleRemoveStackTag(index, s)} />
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover">
                <label htmlFor={`live-${index}`}>Live URL :-</label>
                <input
                  type="text"
                  name={`live-${index}`}
                  id={`live-${index}`}
                  value={project?.live || ''}
                  onChange={(e) => handleProjectChange(index, 'live', e.target.value)}
                  placeholder="www.shadi.com"
                  className="bg-background rounded-md px-2 py-2 w-full"
                  required
                />
                <label htmlFor={`about-${index}`}>Git-Hub Repo :-</label>
                <input
                  type="text"
                  name={`github-${index}`}
                  id={`github-${index}`}
                  value={project?.github || ''}
                  onChange={(e) => handleProjectChange(index, 'github', e.target.value)}
                  placeholder="www.github/shadi.com"
                  className="bg-background rounded-md px-2 py-2 w-full"
                  required
                />
              </div>
            </div>
          ))}
          {/*---Personal Contact---*/}
          <h1 className='text-2xl md:text-3xl my-3 font-bold flex md:justify-center mx-22 items-center gap-2 '>
            <span className='text-glow flex gap-2'><div> Let's </div><div className='text-primary flex'> Connect <hr className='bg-primary w-15 md:w-20 mx-1 my-4 md:my-5 h-[3px]' /></div></span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1.5fr] px-3 py-3 gap-3 md:w-[103%] w-[80%] bg-primary/30 rounded-md">
            <div className='flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover'>
              <label htmlFor="email">Your Email :-</label>
              <input type="email" name='email' id='email' value={myLife?.email || ''} onChange={handleMyLifeChange} placeholder='john@gmail.com' className='bg-background rounded-md px-2 py-2 w-full' required />
            </div>
            <div className='flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover'>
              <label htmlFor="number">Phone Number :-</label>
              <input type="text" name='number' id='number' value={myLife?.number || ''} onChange={handleMyLifeChange} placeholder='+91 1234567890' className='bg-background rounded-md px-2 py-2 w-full' required />
            </div>
            <div className='flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover'>
              <label htmlFor="location">Where are you based :-</label>
              <input type="text" name='location' id='location' value={myLife?.location || ''} onChange={handleMyLifeChange} placeholder='Tel Aviv' className='bg-background rounded-md px-2 py-2 w-full' required />
            </div>
          </div>
          {/*---Socials---*/}
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr] px-3 py-3 gap-3 md:w-[103%] w-[80%] bg-primary/30 rounded-md">
            <div className='flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover'>
              <label htmlFor="git">GitHub Link :-</label>
              <input type="text" name='git' id='git' value={myLife?.git || ''} onChange={handleMyLifeChange} className='bg-background rounded-md px-2 py-2 w-full' required />
            </div>
            <div className='flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover'>
              <label htmlFor="linkedin">LinkedIn Link :-</label>
              <input type="text" name='linkedin' id='linkedin' value={myLife?.linkedin || ''} onChange={handleMyLifeChange} className='bg-background rounded-md px-2 py-2 w-full' required />
            </div>
            <div className='flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover'>
              <label htmlFor="instagram">Instagram Link :-</label>
              <input type="text" name='instagram' id='instagram' value={myLife?.instagram || ''} onChange={handleMyLifeChange} className='bg-background rounded-md px-2 py-2 w-full' />
            </div>
            <div className='flex flex-col gap-3 items-start px-3 py-3 bg-primary/30 rounded-lg card-hover'>
              <label htmlFor="cv">Upload Your CV :-</label>
              {!myLife.cv ? (
                <input type="file" accept=".pdf,.doc,.docx" name='cv' id='cv'
                  onChange={(e) => setMyLife(prev => ({ ...prev, cv: e.target.files[0] }))}
                  className='bg-background rounded-md px-2 py-2 w-full' />
              ) : (
                <>
                  <p className="text-sm text-primary-foreground">Selected: {myLife.cv.name}</p>
                  <button
                    type="button"
                    onClick={() => setMyLife(prev => ({ ...prev, cv: null }))}
                    className="cosmic-button text-white px-2 py-1 rounded mt-2 transition"
                  >
                    Change CV
                  </button>
                </>
              )}
            </div>
          </div>
          <button type="submit" className='cosmic-button flex gap-2 justify-center w-[75%] md:w-[21%] mx-2 my-2 md:mx-135'>
            {loading ? 'Creating Account...' : <>
              <div>Portray Yourself</div><User />
            </>}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Initial
