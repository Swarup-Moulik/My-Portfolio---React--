import React, { useContext, useState } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'

const WorkInfoEdit = () => {
  const { port, handleUpdate, handleUpdateAll } = useContext(PortfolioContext);
  const [form, setForm] = useState({
    reflex: '',
    story: '',
    nspf: '',
    dspf: '',
    nsps: '',
    dsps: '',
    experience: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleFieldUpdate = (field) => {
    handleUpdate(field, form[field], setForm);
  };
  const handleAllFieldsUpdate = () => {
    handleUpdateAll(form, setForm);
  };
  return (
    <div className='flex flex-col gap-4 mx-3 mt-3 bg-primary/20 pt-4 rounded-md'>
      {/* My Reflexion */}
      <div className='flex md:flex-row flex-col gap-3 my-1'>
        <div className='mx-2 flex flex-col md:flex-row gap-3 justify-center items-center'>
          <h3 className='text-glow text-2xl px-2 font-bold'>My Reflexion :-</h3>
          <div className='bg-card text-xl md:text-2xl rounded-md md:pt-1 px-2 pb-1 w-auto font-bold text-primary'>
            {port.reflex}
          </div>
        </div>
        <div className='flex justify-center'>
          <input
            type="text"
            name="reflex"
            className='text-lg bg-background px-2 py-2 mx-3 md:mx-1 my-2 md:my-0 rounded-md md:w-auto w-full'
            placeholder='Reflect Differently...'
            value={form.reflex}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-center'>
          <button
            className='cosmic-button rounded-md p-2 mx-5'
            onClick={() => handleFieldUpdate('reflex')}
          >
            Change Your Reflexion
          </button>
        </div>
      </div>
      {/* My Life Story */}
      <div className='flex flex-col gap-3 my-1'>
        <div className='mx-2 flex flex-col md:grid grid-cols-[1fr_4fr] gap-3 justify-center items-center'>
          <h3 className='text-glow text-2xl md:pt-1 px-2 font-bold'>My Life Story :-</h3>
          <div className='bg-card text-xl p-1 rounded-md font-bold text-primary'>
            {port.story}
          </div>
        </div>
        <div className='flex justify-center'>
          <textarea
            type="text"
            name="story"
            className='text-lg bg-background px-2 py-2 mx-3 my-2 md:my-0 rounded-md w-full resize-none'
            placeholder='Change Your Life Story...'
            value={form.story}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-center'>
          <button
            className='cosmic-button rounded-md p-2 mx-5'
            onClick={() => handleFieldUpdate('story')}
          >
            Change Your Reflexion
          </button>
        </div>
      </div>
      <div className='flex justify-center'>
        <hr className='bg-primary w-[75%] mx-3 mb-3 justify-center h-[3px]' />
      </div>
      <h3 className='flex justify-center gap-2 text-3xl font-semibold mb-2'>
        Your <span className='text-glow'> First </span><span className='text-primary'> Speciality </span>
      </h3>
      {/* First Speciality Name */}
     <div className='flex md:flex-row md:mx-7 flex-col gap-3 my-1'>
        <div className='mx-2 flex flex-col md:flex-row gap-3 items-center'>
          <h3 className='text-glow text-2xl md:pt-1 px-2 font-bold'>Title :-</h3>
          <div className='bg-card text-xl md:text-2xl rounded-md md:pt-1 px-2 pb-1 font-bold text-primary'>
            {port.nspf}
          </div>
        </div>
        <div className='flex justify-center'>
          <input
            type="text"
            name="nspf"
            className='text-lg bg-background px-2 py-2 mx-3 md:mx-1 my-2 md:my-0 rounded-md md:w-md w-full'
            placeholder='Change your 1st speciality...'
            value={form.nspf}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-center'>
          <button
            className='cosmic-button rounded-md p-2 mx-5'
            onClick={() => handleFieldUpdate('nspf')}
          >
            Update Title
          </button>
        </div>
      </div>
      {/* First Speciality Description */}
      <div className='flex flex-col gap-3 my-1'>
        <div className='mx-2 flex flex-col md:grid grid-cols-[1fr_4fr] gap-3 justify-center items-center'>
          <h3 className='text-glow text-2xl md:pt-1 px-2 font-bold'>Description :-</h3>
          <div className='bg-card text-xl p-1 px-2 w-fit rounded-md font-bold text-primary text-start'>
            {port.dspf}
          </div>
        </div>
        <div className='flex justify-center'>
          <textarea
            type="text"
            name="dspf"
            className='text-lg bg-background px-2 py-2 mx-3 my-2 md:my-3 rounded-md w-full md:w-[80%] resize-none'
            placeholder='New Description...'
            value={form.dspf}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-center'>
          <button
            className='cosmic-button rounded-md p-2 mx-5 md:text-xl'
            onClick={() => handleFieldUpdate('dspf')}
          >
            Update Description
          </button>
        </div>
      </div>
      <div className='flex justify-center'>
        <hr className='bg-primary w-[75%] mx-3 mb-3 justify-center h-[3px]' />
      </div>
      <h3 className='flex justify-center gap-2 text-3xl font-semibold mb-2'>
        Your <span className='text-glow'> Second </span><span className='text-primary'> Speciality </span>
      </h3>
      {/* Second Speciality Name */}
      <div className='flex md:flex-row md:mx-7 flex-col gap-3 my-1'>
        <div className='mx-2 flex flex-col md:flex-row gap-3 items-center'>
          <h3 className='text-glow text-2xl md:pt-1 px-2 font-bold'>Title :-</h3>
          <div className='bg-card text-xl md:text-2xl rounded-md md:pt-1 px-2 pb-1 font-bold text-primary'>
            {port.nsps}
          </div>
        </div>
        <div className='flex justify-center'>
          <input
            type="text"
            name="nsps"
            className='text-lg bg-background px-2 py-2 mx-3 md:mx-1 my-2 md:my-0 rounded-md md:w-md w-full'
            placeholder='Change your 2nd speciality...'
            value={form.nsps}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-center'>
          <button
            className='cosmic-button rounded-md p-2 mx-5'
            onClick={() => handleFieldUpdate('nsps')}
          >
            Update Title
          </button>
        </div>
      </div>
      {/* Second Speciality Description */}
      <div className='flex flex-col gap-3 my-1'>
        <div className='mx-2 flex flex-col md:grid grid-cols-[1fr_4fr] gap-3 justify-center items-center'>
          <h3 className='text-glow text-2xl md:pt-1 px-2 font-bold'>Description :-</h3>
          <div className='bg-card text-xl p-1 px-2 w-fit rounded-md font-bold text-primary text-start'>
            {port.dsps}
          </div>
        </div>
        <div className='flex justify-center'>
          <textarea
            type="text"
            name="dsps"
            className='text-lg bg-background px-2 py-2 mx-3 my-2 md:my-3 rounded-md w-full md:w-[80%] resize-none'
            placeholder='New Description...'
            value={form.dsps}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-center'>
          <button
            className='cosmic-button rounded-md p-2 mx-5 md:text-xl'
            onClick={() => handleFieldUpdate('dsps')}
          >
            Update Description
          </button>
        </div>
      </div>
      <div className='flex justify-center'>
        <hr className='bg-primary w-[75%] mx-3 mb-3 justify-center h-[3px]' />
      </div>
      <h3 className='flex justify-center gap-2 text-3xl font-semibold mb-2'>
        Your <span className='text-primary'> Work </span><span className='text-glow'> Experience </span>
      </h3>
      {/* Work Experience */}
      <div className='flex flex-col gap-3 my-1 mx-2 justify-center'>
        <div className='flex justify-center'>
          <div className='text-xl bg-card rounded-md py-3 px-3 font-bold text-primary'>{port.experience}</div>
        </div>
        <div className='flex justify-center my-3'>
          <textarea
            type="text"
            name='experience'
            id='experience'
            value={form.experience}
            onChange={handleChange}
            className='text-lg bg-background px-2 py-2 rounded-md h-20 w-[80%] resize-none'
            placeholder='Life goes long...'
          />
        </div>
        <div className='flex justify-center'>
          <button className='cosmic-button rounded-md p-2 mx-3 mb-5 text-lg' onClick={() => handleFieldUpdate('experience')}>Update Work Experience</button>
        </div>
      </div>
      <div className='flex justify-center'>
        <hr className='bg-primary w-[75%] mx-3 mb-3 justify-center h-[3px]' />
      </div>
      <div className="flex justify-center my-3 mb-5">
        <button
          className='cosmic-button rounded-md p-3 text-2xl'
          onClick={handleAllFieldsUpdate}
        >
          Change Everything
        </button>
      </div>
    </div>
  )
}

export default WorkInfoEdit
