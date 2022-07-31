import React from 'react';

const home = () => {
    return (
        <div className='p-20'>
        <form className="flex flex-col space-y-2  p-5 ">
        <input
          type="text"
          required
          placeholder="Username"
          className="border p-1 peer border-gray-400 rounded-md  outline-none"
        />
        <span className="hidden peer-invalid:block peer-invalid:text-red-500">
          This input is invalid
        </span>
        <span className="hidden peer-valid:block peer-valid:text-teal-500">
          Awesome username
        </span>
        <span className="hidden peer-hover:block peer-hover:text-amber-500">
          Hello
        </span>
        <input type="submit" value="Login" className="bg-white" />
      </form>
      <details className='select-none open:text-white open:bg-violet-500'>
        <summary>
            what is your favoriate food?
        </summary>
        <span>피자</span>
      </details>
      <div className='flex flex-col space-y-2 p-5'>
      <ul className='list-decimal marker:text-teal-500'>
        <li>hi</li>
        <li>hi</li>
        <li>hi</li>
      </ul>
      <input type="file" className='file:hover:text-pu file:cursor-pointer file:transition-colors file:border-0 file:rounded-md file:bg-violet-300 file:px-3'/>
      </div>
      </div>
    );
};

export default home;