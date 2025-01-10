import React from 'react';
import '../app/styles/Loading.css';

export default function Loading() {
  return (
    <div className="flex justify-start items-center pt-64">
      <div className="flex space-x-4">
        <div className="w-6 h-6 rounded-full bg-gray-300 animate-loading delay-0"></div>
        <div className="w-6 h-6 rounded-full bg-gray-300 animate-loading delay-200"></div>
        <div className="w-6 h-6 rounded-full bg-gray-300 animate-loading delay-400"></div>
        <div className="w-6 h-6 rounded-full bg-gray-300 animate-loading delay-600"></div>
        <div className="w-6 h-6 rounded-full bg-gray-300 animate-loading delay-800"></div>
      </div>
    </div>
  );
}
