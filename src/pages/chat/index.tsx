import React from "react";
import Image from 'next/image';
import { Button } from "@/components/ui/button";

import imgRobot from '/public/images/robot.png';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#222222]">
      <div className="relative">
        {/* Hero Section with 3D Model */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full flex items-center">
            <Image src={imgRobot} alt='robot' width={100} height={100} />
            <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 text-white">Hi, I am TYPH<span className="text-[green]">O</span>N ChatBot</h1>
          </div>
          <div className="text-center">
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Here, you can have Professional conversation about Crypto
            </p>
          </div>

          <div className="w-full">

            <form className="max-w-5xl mx-auto">
              <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Select a professional option</label>
              <select id="countries" className="bg-[#222222] text-md border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500">
                <option selected>Choose a question</option>
                <option value="US" className="text-md">United States</option>
                <option value="CA" className="text-md">Canada</option>
                <option value="FR" className="text-md">France</option>
                <option value="DE" className="text-md">Germany</option>
              </select>
            </form>

          </div>
          {/* 3D Model Container */}
          <div className="mt-4 relative h-[400px] w-full max-w-5xl mx-auto rounded-lg shadow-sm animate-fade-in border border-gray-300" style={{ overflow: "scroll" }}>
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            </div>
          </div>

          <div className="w-full max-w-5xl mx-auto text-right">
            <textarea rows={4} className="mt-2 block p-2.5 w-full text-md rounded-lg bg-[#222222] border border-gray-300" placeholder="Here..."></textarea>
            <Button size="sm" className="w-[50%] mt-1"
            >Answer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
