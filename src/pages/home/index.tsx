import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import React, { useRef } from 'react';
import type * as THREE from 'three';

import Image from 'next/image';
import imgLogo from '/public/images/logo.png';
import imgTwitter from '/public/images/socials/twitter.png';
import imgDiscord from '/public/images/socials/discord.png';
import imgDocument from '/public/images/socials/document.png';
import imgGithub from '/public/images/socials/github.png';
import imgHelp from '/public/images/socials/help.png';
import imgTelegram from '/public/images/socials/telegram.png';
import imgSolana from '/public/images/socials/solana.png';


import { Button } from "@/components/ui/button";

const RotatingModel = () => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/model.glb'); // Load your 3D model

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Rotate the model
    }
  });

  return <primitive ref={modelRef} object={scene} scale={0.2} />;
};

const Home = () => {
  return (
    <div className="min-h-screen">
      <a className="absolute" style={{ right: "30px", top: "30px", zIndex: "9999" }} href='/'>
        <Button size="sm" className='w-[200px]'>Get Started</Button>
      </a>

      <div className="relative pt-16">
        {/* Hero Section with 3D Model */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full flex justify-center items-center">
            <span className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">Welcome to</span>
            <Image src={imgLogo} alt="My Image" width={220} height={300} />
          </div>
          <h1 className="max-w-4xl mx-auto text-[20px] font-bold text-white">Typhon is an all-in-one AI framework designed to optimize crypto portfolios, enhance security, audit smart contracts, and predict market trends. With tools for managing assets, tracking NFTs, calculating taxes, and detecting fraud, Typhon empowers users to navigate the crypto world with confidence and intelligence.</h1>

          {/* 3D Model Container */}
          <div className="relative h-[450px] w-full max-w-3xl mx-auto rounded-lg shadow-sm animate-fade-in">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Canvas camera={{ position: [2, 2, 5] }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[2, 0.5, 0.5]} />
                <RotatingModel />
                <OrbitControls enableZoom={false} />
              </Canvas>
            </div>
          </div>

          <div className="w-full max-w-3xl mx-auto flex justify-between  py-4">
            <div className="text-center">
              <a href="">
                <Image src={imgTwitter} alt="My Image" width={50} height={50} />
                <h2>X</h2>
              </a>
            </div>
            <div className="text-center">
              <a href="">
                <Image src={imgDiscord} alt="My Image" width={50} height={50} />
                <h2>Discord</h2>
              </a>
            </div>
            <div className="text-center">
              <a href="">
                <Image src={imgTelegram} alt="My Image" width={50} height={50} />
                <h2>Telegram</h2>
              </a>
            </div>
            <div className="text-center">
              <a href="">
                <Image src={imgGithub} alt="My Image" width={50} height={50} />
                <h2>Github</h2>
              </a>
            </div>
            <div className="text-center">
              <a href="">
                <Image src={imgSolana} alt="My Image" width={50} height={50} />
                <h2>Solana</h2>
              </a>
            </div>
            <div className="text-center">
              <a href="">
                <Image src={imgHelp} alt="My Image" width={50} height={50} />
                <h2>Help</h2>
              </a>
            </div>
            <div className="text-center">
              <a href="">
                <Image src={imgDocument} alt="My Image" width={50} height={50} />
                <h2>Docs</h2>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
