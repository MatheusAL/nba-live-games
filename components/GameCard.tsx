import { NextPage } from "next";
import Image from 'next/image'
import styles from '../styles/GameCard.module.css'

interface Game {
  game:{
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
}


const GameCard: NextPage<Game> = ({ game }) => { 
  const { 
    visitor_team_score,
    home_team_score
  } = game;
  return (
      <div className={styles.card}>
        <div className="pt-3 flex justify-center font-bold">{game.home_team.city}</div>
        <div className={styles.teams}>
          <div className="">
            <Image
              src={`/assets/${game.home_team.abbreviation.toLowerCase()}.png`}
              alt="team"
              width={'100px'}
              height={'80px'}
              className="flex justify-center"
            />
            <p className='flex justify-center font-bold text-sm'>{game.home_team.name}</p>
            <p className='flex justify-center text-xs'>Home</p>
          </div>
          <div className={styles.score}>
            <h1>{home_team_score}</h1>
            <p className="p-2"> : </p>
            <h1>{visitor_team_score}</h1> 
          </div>
          <div className="">
            <Image
              src={`/assets/${game.visitor_team.abbreviation.toLowerCase()}.png`}
              alt="team"
              width={'100px'}
              height={'80px'}
              className="flex justify-center"
            />
            <p className='flex justify-center font-bold text-sm'>{game.visitor_team.name}</p>
            <p className='flex justify-center text-xs'>Visitor</p>
          </div> 
        </div>
        <div className="flex justify-center w-100">
          <p className="flex items-center justify-center w-2/4 rounded-full tracking-wider border-2 border-black bg-black text-white h-10">{game.time === '' ? game.status : game.time}</p>
        </div>
        
      </div>
    )
  }

  export default GameCard;