import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head'
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import nba from '../../public/assets/nba-logo.png';
import GameCard from '../../components/GameCard'

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

const Games: NextPage<DataGame> = ({ data } ) => {
    return (
        <div className={styles.container}>
          <Head>
            <title>NBA Live Games</title>
            <meta name="description" content="Find NBA live games" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <nav className="h-2/5 w-100 flex items-center justify-between flex-wrap bg-sky-900 p-6">
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
            <div className="w-full flex justify-around font-bold text-xl text-white">
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
          </main>
        </div>
      )
}
export const getServerSideProps: GetServerSideProps = async({params}) => {
    //const router = useRouter();
    //const { day } = router.query;
    const date = new Date();
    let queryDay: string = '';
    const day = params?.day;
    if (day) {
        if (day === 'today') {
            queryDay = date.toISOString().slice(0, 10);
        } else if (day === 'yesterday') {
            date.setDate(date.getDate() - 1);
            queryDay = date.toISOString().slice(0, 10);
        } else {
            date.setDate(date.getDate() + 1);
            queryDay = date.toISOString().slice(0, 10);
        }

    }
    
    const res = await fetch(`https://balldontlie.io/api/v1/games?start_date=${queryDay}&end_date=${queryDay}`);
    const data = await res.json();
    return {
      props: { data: data.data }
    }
}
export default Games;
