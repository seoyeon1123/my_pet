import React from 'react';
import '../app/styles/Loading.css';

export default function Loading() {
  return (
    <div className="flex justify-start items-center xl:pt-64 lg:pt-64 pt-36 ">
      <div className="flex space-x-4">
        <div className="size-5 rounded-full bg-gray-300 animate-loading delay-0"></div>
        <div className="size-5 rounded-full bg-gray-300 animate-loading delay-200"></div>
        <div className="size-5 rounded-full bg-gray-300 animate-loading delay-400"></div>
        <div className="size-5 rounded-full bg-gray-300 animate-loading delay-600"></div>
        <div className="size-5 rounded-full bg-gray-300 animate-loading delay-800"></div>
      </div>
    </div>
  );
}
