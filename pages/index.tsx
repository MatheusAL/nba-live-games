import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import GameCard from '../components/GameCard'
import nba from '../public/assets/nba-logo.png'
import styles from '../styles/Home.module.css'

interface Data{
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

const Home: NextPage<DataGame> = ({ data } ) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NBA Live Games</title>
        <meta name="description" content="Find NBA live games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="h-2/5 w-100 flex items-center justify-between flex-wrap bg-blue-500 p-6">
        {/* <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div> */}
        <div className="flex w-full justify-center flex-shrink-0 text-white mr-6">
          <Image
              src={nba}
              alt="NBA Logo"
              width={'250px'}
              height={'100px'}
            />
        </div>
        <div className="w-full flex">
          <div className="flex flex-grow lg:flex lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <a href="#" className="flex justify-center mt-4 lg:mt-0 text-white text-lg text-bold hover:text-black">
                Eastern Conference
              </a>
            </div>
          </div>
          <div className="flex flex-grow lg:flex lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <a href="#" className="flex justify-center mt-4 lg:mt-0 text-white text-lg text-bold hover:text-black">
                Western Conference
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main className={styles.main} >
        <div className='grid grid-cols-4 gap-4 lg:grid-cols-4 sm:grid-cols-2'>
          {data.map((game: Object, index: number)=>(
            <GameCard key={index} game={data[index]}/>
          ))
          }
        </div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async() => {
  const today = new Date().toISOString().slice(0, 10);
  const res = await fetch(`https://balldontlie.io/api/v1/games?start_date=${today}&end_date=${today}`);
  const data = await res.json();

  return {
    props: { data: data.data }
  }
}

export default Home;
