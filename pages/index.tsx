import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import GameCard from '../components/GameCard'
import nba from '../public/assets/nba-logo.png'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Data {
    date: string
    home_team: {
      abbreviation: string,
      city: string,
      conference: string,
      division: string,
      full_name: string,
      id: number,
      name: string
    },
    home_team_score: number,
    id: number,
    period: number,
    postseason: boolean,
    season: number,
    status: string,
    time: string,
    visitor_team: {
      abbreviation: string,
      city: string,
      conference: string,
      division: string,
      full_name: string,
      id: number,
      name: string
    },
    visitor_team_score: number,
}
interface DataGame { // renamed from ITrueFalse
  data: Data[];
}

// const fetcher = (...args) => fetch(...args).then((res) => res.json())

/* const getData = async (day: string) => {
  const date = new Date();
  let queryDay: string;
  if (day === 'today') {
    queryDay = date.toISOString().slice(0, 10);
  } else if (day === 'yesterday') {
    date.setDate(date.getDate() - 1);
    queryDay = date.toISOString().slice(0, 10);
  } else {
    date.setDate(date.getDate() + 1);
    queryDay = date.toISOString().slice(0, 10);
  }
  const { data, error } = useSWR(`https://balldontlie.io/api/v1/games?start_date=${queryDay}&end_date=${queryDay}`, fetcher)
  // const res = await fetch(`https://balldontlie.io/api/v1/games?start_date=${queryDay}&end_date=${queryDay}`);
  //const { data, error } = await res.json();

  return {
    props: { data: data.data }
  }
} */
const Home: NextPage<DataGame> = ({ data } ) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NBA Live Games</title>
        <meta name="description" content="Find NBA live games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="h-2/5 w-100 flex items-center justify-between flex-wrap bg-sky-900 p-6">
        <div className="flex w-full justify-center flex-shrink-0 text-white mr-6">
          <Image
              src={nba}
              alt="NBA Logo"
              width={'250px'}
              height={'100px'}
            />
        </div>
        <div className="w-full flex justify-around font-bold text-lg text-white">
          <div className="hover:text-orange-500">
            <Link href="/games/yesterday">
              <span>Yesterday</span>
            </Link>
          </div>
          <div className="hover:text-orange-500">
            <Link href="/games/today">
              <span>Today</span>
            </Link>
          </div>
          <div className="hover:text-orange-500">
            <Link href="/games/tomorrow">
              <span>Tomorrow</span>
            </Link>
          </div>
        </div>
      </nav>
      <main className={styles.main} >
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4 sm:grid-cols-2'>
          {data.map((game: Object, index: number)=>(
            <GameCard key={index} game={data[index]}/>
          ))
          }
        </div>
        {/* <section className="w-50 bg-red">
          <h1 className="text-3xl">Welcome to NBA Today!</h1>
          <p>The NBA Today app is an application designed for basketball enthusiasts who want to stay up-to-date with statistics from the NBA. With this app, users can follow their favorite teams in real-time, as well as get access to live scores.</p>
        </section> */}
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
  const today = new Date().toISOString().slice(0, 10);
  const res = await fetch(`https://balldontlie.io/api/v1/games?start_date=${today}&end_date=${today}`);
  const data = await res.json();

  return {
    props: { data: data.data }
  }
}

export default Home;
