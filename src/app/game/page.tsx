'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Navbar from '../components/Navbar';

interface Game {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
}

const GamePage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/games`);
        const gameData = res.data.data ?? res.data; 
        setGames(gameData);
      } catch (err: any) {
        console.error;
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return ( <>
  < Navbar />
  <div className="bg-white dark:bg-gray-800 min-h-screen py-6 sm:pw-8 lg:py-12">
    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:mb-8 md:mb-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl dark:text-white">Game List</h2>
          <p className="max-w-screen-md text-gray-500 dark:text-gray-300">
            Temukan berbagai game menarik yang bisa kamu mainkan langsung di browser. Klik salah satu untuk mulai bermain!
          </p>
        </div>
        <div className="flex justify-center items-center">
	<div className=" text-gray-900 dark:text-gray-100">
	<div className="relative w-full group">
		<label className="text-xs text-gray-400">Select Category</label><button className="py-2.5 px-3 w-full md:text-sm text-site bg-transparent border border-dimmed  focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded font-semibold">All</button>
		<div
			className="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg min-w-[200px] w-max peer-focus:visible peer-focus:opacity-100 opacity-0 invisible duration-200 p-1 bg-gray-100 dark:bg-gray-800  border border-dimmed text-xs md:text-sm">
			<div
				className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
				All (25)</div>
			<div
				className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
				Populaty (6)
			</div>
			<div
				className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
				Recent Update (5)
			</div>
			<div
				className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
				ASC 
			</div>
			<div
				className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
				DSC</div>
		</div>
	</div>
</div>
</div>
        <Link
          href="#"
          className="inline-block rounded-lg border bg-white dark:bg-gray-700 dark:border-none px-4 py-2 text-center text-sm font-semibold text-gray-500 dark:text-gray-200 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
        >
          Lihat Semua
        </Link>
      </div>


      
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
          {games.map((game, index) => (
            <Link
              href={`/game/${game.slug}`}
              key={game.id}
              className={`group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80 `}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${game.thumbnail}`}
                alt={game.title}
                fill
                unoptimized 
                loader={({ src }) => src} 
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50" />
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                {game.title}
              </span>
            </Link>
          ))}
        </div>
      
    </div>
  </div></>
    
  );
};

export default GamePage;