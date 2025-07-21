import React, { useContext, useState } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'

const ContactEdit = () => {
  const { port, handleUpdate } = useContext(PortfolioContext);
  const [form, setForm] = useState({
    email: '',
    phoneNumber: '',
    location: '',
    git: '',
    cv: null,
    instagram: '',
    linkedin: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cv') {
      return setForm(prev => ({ ...prev, cv: files[0] }))
    }
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleFieldUpdate = (field) => {
    handleUpdate(field, form[field], setForm);
  };
  const cvUrl = port?.cv ? port.cv.split('/').pop() : 'No CV uploaded';
  //const cvUrl = port.cv;
  return (
    <div className='flex flex-col gap-4 mx-3 mt-3 pb-5 bg-primary/20 pt-4 rounded-md'>
      {/* Contact */}
      <h3 className='flex justify-center gap-2 text-3xl font-semibold mb-2 text-glow'>
        Change <span className='text-primary'> Contacts </span>
      </h3>
      <div className='flex md:flex-row flex-col gap-3 my-1'>
        <div className='mx-2 flex flex-col md:flex-row gap-3 justify-center items-center'>
          <h3 className='text-glow text-2xl px-2 font-bold'>My Email :-</h3>
          <div className='bg-card text-xl md:text-2xl rounded-md md:pt-1 px-2 pb-1 w-auto font-bold text-primary'>
            {port.email}
          </div>
        </div>
        <div className='flex justify-center'>
          <input
            type="text"
            name="email"
            className='text-lg bg-background px-2 py-2 mx-3 md:mx-1 my-2 md:my-0 rounded-md md:w-auto w-full'
            placeholder='New Email...'
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-center'>
          <button
            className='cosmic-button rounded-md p-2 mx-5'
            onClick={() => handleFieldUpdate('email')}
          >
            Change Your Email
          </button>
        </div>
      </div>
      <div className='flex md:flex-row flex-col gap-3 my-1'>
        <div className='mx-2 flex flex-col md:flex-row gap-3 justify-center items-center'>
          <h3 className='text-glow text-2xl px-2 font-bold'>Phone Number :-</h3>
          <div className='bg-card text-xl md:text-2xl rounded-md md:pt-1 px-2 pb-1 w-auto font-bold text-primary'>
            {port.phoneNumber}
          </div>
        </div>
        <div className='flex justify-center'>
          <input
            type="text"
            name="phoneNumber"
            className='text-lg bg-background px-2 py-2 mx-3 md:mx-1 my-2 md:my-0 rounded-md md:w-auto w-full'
            placeholder='New Number...'
            value={form.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-center'>
          <button
            className='cosmic-button rounded-md p-2 mx-5'
            onClick={() => handleFieldUpdate('phoneNumber')}
          >
            Change Your Number
          </button>
        </div>
      </div>
      <div className='flex md:flex-row flex-col gap-3 my-1'>
        <div className='mx-2 flex flex-col md:flex-row gap-3 justify-center items-center'>
          <h3 className='text-glow text-2xl px-2 font-bold'>Location :-</h3>
          <div className='bg-card text-xl md:text-2xl rounded-md md:pt-1 px-2 pb-1 w-auto font-bold text-primary'>
            {port.location}
          </div>
        </div>
        <div className='flex justify-center'>
          <input
            type="text"
            name="location"
            className='text-lg bg-background px-2 py-2 mx-3 md:mx-1 my-2 md:my-0 rounded-md md:w-auto w-full'
            placeholder='New Location...'
            value={form.location}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-center'>
          <button
            className='cosmic-button rounded-md p-2 mx-5'
            onClick={() => handleFieldUpdate('location')}
          >
            Change Your Location
          </button>
        </div>
      </div>
      <div className='flex justify-center'>
        <hr className='bg-primary w-[75%] mx-3 justify-center h-[3px]' />
      </div>
      {/* Git Hub and CV */}
      <h3 className='flex justify-center gap-2 text-3xl font-semibold mb-2 text-glow'>
        Change <span className='text-primary'> GitHub </span> & <span className='text-primary'> CV </span>
      </h3>
      <div className='flex flex-col justify-center gap-4 mx-2 '>
        <div className='mx-2 flex flex-col md:grid grid-cols-[1fr_4fr] gap-3 justify-center items-center'>
          <h3 className='text-glow text-2xl px-2 font-bold'>GitHub Link :-</h3>
          <div className='text-xl bg-card rounded-md px-2 p-1 w-fit font-bold text-primary'>{port.git}</div>
        </div>
        <div className='flex justify-center'>
          <input
            type="text"
            name='git'
            id='git'
            value={form.git}
            onChange={handleChange}
            className='text-lg bg-background px-2 py-2 mx-4 rounded-md justify-center'
            placeholder='New Git-Hub Link...'
          />
        </div>
        <div className='flex justify-center mb-5'>
          <button className='cosmic-button rounded-md p-2 mx-3 text-lg' onClick={() => handleFieldUpdate('git')}>Change Knowledge Labrinyth</button>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4 mx-2 '>
        <div className='mx-2 flex flex-col md:grid grid-cols-[1fr_4fr] gap-3 justify-center items-center'>
          <h3 className='text-glow text-2xl px-2 font-bold'>Uploaded CV :-</h3>
          <div className='text-xl bg-card rounded-md px-2 p-1 w-fit font-bold text-primary'>{cvUrl}</div>
        </div>
        <div className='flex justify-center gap-3 text-lg'>
          {!form.cv ? (
            <input type="file" accept=".pdf,.doc,.docx" name='cv' id='cv'
              onChange={(e) => setForm(prev => ({ ...prev, cv: e.target.files[0] }))}
              className='bg-background rounded-md px-2 py-2' />
          ) : (
            <>
              <p className="text-xl text-primary-foreground py-2">Selected :- {form.cv.name}</p>
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, cv: null }))}
                className="cosmic-button text-white px-2 py-2 rounded transition"
              >
                Change CV
              </button>
            </>
          )}
        </div>
        <div className='flex justify-center'>
          <button className='cosmic-button rounded-md p-2 mx-3 text-lg' onClick={() => handleFieldUpdate('cv')}>Update Resume</button>
        </div>
      </div>
      <div className='flex justify-center'>
        <hr className='bg-primary w-[75%] mx-3 justify-center h-[3px]' />
      </div>
      {/* Social Media Links */}
      <h3 className='flex justify-center gap-2 text-3xl font-semibold mb-5 text-glow'>
        Change <span className='text-primary'> Socials </span>
      </h3>
      <div className='flex flex-col gap-3 my-1'>
        <div className='mx-2 flex flex-col md:grid grid-cols-[1fr_4fr] gap-3 justify-center items-center'>
          <h3 className='text-glow text-2xl px-2 font-bold'>My Instagram :-</h3>
          <div className='bg-card text-lg md:text-xl p-1 px-3 rounded-md font-bold text-primary w-fit justify-start'>
            {port.instagram}
          </div>
        </div>
        <div className='flex justify-center'>
          <input
            type="text"
            name="story"
            className='text-lg bg-background px-2 py-2 mx-3 my-2 rounded-md w-full md:w-[70%] resize-none'
            placeholder='Change Instagram Link...'
            value={form.instagram}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-center'>
          <button
            className='cosmic-button rounded-md p-2 mx-5 text-xl'
            onClick={() => handleFieldUpdate('instagram')}
          >
            Change Your Instagram
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-3 my-1'>
        <div className='mx-2 flex flex-col md:grid grid-cols-[1fr_4fr] gap-3 justify-center items-center'>
          <h3 className='text-glow text-2xl px-2 font-bold'>My LinkedIn :-</h3>
          <div className='bg-card text-lg md:text-xl p-1 px-3 rounded-md font-bold text-primary w-fit justify-start'>
            {port.linkedin}
          </div>
        </div>
        <div className='flex justify-center'>
          <input
            type="text"
            name="linkedin"
            className='text-lg bg-background px-2 py-2 mx-3 my-2 rounded-md w-full md:w-[70%] resize-none'
            placeholder='Change LinkedIn Link...'
            value={form.linkedin}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-center'>
          <button
            className='cosmic-button rounded-md p-2 mx-5 text-xl'
            onClick={() => handleFieldUpdate('linkedin')}
          >
            Change Your LinkedIn
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactEdit
