import React, { useContext, useState, useEffect } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';

const BasicInfoEdit = () => {
  const { port, handleUpdate, handleUpdateAll } = useContext(PortfolioContext);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    description: '',
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
      {/* First Name */}
      <div className='flex md:flex-row flex-col gap-3 my-1'>
        <div className='mx-2 flex gap-2 justify-center'>
          <h3 className='text-glow text-2xl md:pt-1 px-2 font-bold'>First Name :-</h3>
          <div className='bg-card text-2xl pb-1 rounded-md md:pt-1 px-2 font-bold text-primary'>
            {port.firstName}
          </div>
        </div>
        <div className='flex justify-center'>
          <input
            type="text"
            name="firstName"
            className='text-lg bg-background px-2 py-2 rounded-md md:w-auto w-1/2'
            placeholder='Change Your First Name...'
            value={form.firstName}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-center'>
          <button
            className='cosmic-button rounded-md p-2 mx-5'
            onClick={() => handleFieldUpdate('firstName')}
          >
            Change First Name
          </button>
        </div>
      </div>
      {/* Last Name */}
      <div className='flex md:flex-row flex-col gap-3 my-1'>
        <div className='mx-2 flex gap-2 justify-center'>
          <h3 className='text-glow text-2xl px-2 md:pt-1 font-bold'>Last Name :-</h3>
          <div className='bg-card text-2xl pb-1 rounded-md md:pt-1 px-2 font-bold text-primary'>
            {port.lastName}
          </div>
        </div>
        <div className='flex justify-center'>
          <input
            type="text"
            name="lastName"
            className='text-lg bg-background px-2 py-2 rounded-md md:w-auto w-1/2'
            placeholder='Change Your Last Name...'
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-center'>
          <button
            className='cosmic-button rounded-md p-2 mx-5'
            onClick={() => handleFieldUpdate('lastName')}
          >
            Change Last Name
          </button>
        </div>
      </div>

      {/* Description */}
      <div className='flex flex-col gap-3 my-2 mx-2'>
        <div className='flex gap-4 flex-col md:grid grid-cols-[1fr_4fr]'>
          <h3 className='text-primary text-glow text-2xl font-bold'>My Description :-</h3>
          <div className='text-xl px-2 pt-1 font-bold'>
            {port.description}
          </div>
        </div>
        <textarea
          name="description"
          className='text-lg bg-background mx-5 my-3 px-3 py-3 rounded-md resize-none h-30'
          placeholder='Change Your Description...'
          value={form.description}
          onChange={handleChange}
        />
        <div className="flex justify-center my-3 mb-5">
          <button
            className='cosmic-button rounded-md p-3 text-xl'
            onClick={() => handleFieldUpdate('description')}
          >
            Change Description
          </button>
        </div>
        <div className='flex justify-center'>
          <hr className='bg-primary-foreground w-[75%] mx-3 mb-3 justify-center h-[2px]' />
        </div>
        <div className="flex justify-center my-3 mb-5">
          <button
            className='cosmic-button rounded-md p-3 text-xl'
            onClick={handleAllFieldsUpdate}
          >
            Change Everything
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoEdit;
