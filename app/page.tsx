import Carousel from '../components/Carousel'
import DevTile from '../components/DevTile'
import GameTile from '../components/GameTile'
import Header from '../components/Header'
import { db } from '../prisma/db'
import styles from '../styles/Home.module.scss'

export default async function Home() {
    const images: string[] = []
    for (let i = 1; i <= 38; i++) {
        images.push(`/images/image${i}.jpg`)
    }
    const { games, devs, pubs, platforms } = await getData();

    return (
        <div>
            <div className={styles.heading}>
                <Carousel images={images} />
                <h1 className={styles.h1} > <span>The</span> <span>Internet</span> <span >Games</span> <span >Database</span></h1>
            </div>
            <Header heading='Games' />
            <div className={styles.games} >
                {games.map(item => <GameTile key={item.gameId} game={item} className="" />)}
            </div>

            <Header heading='Developers' />
            <div className={styles.logos}>
                {devs.map(dev => <DevTile key={dev.developerId} className={styles.tile} href={'developer'} item={{ ...dev, id: dev.developerId }} />)}
            </div>

            <Header heading='Publishers' />
            <div className={styles.logos}>
                {pubs.map(pub => <DevTile key={pub.publisherId} className={styles.tile} href="publisher" item={{ ...pub, id: pub.publisherId }} />)}
            </div>

            <Header heading='Platforms' />
            <div className={styles.logos}>
                {platforms.map(pform => <DevTile key={pform.platformId} className={styles.tile} href="platform" item={{ ...pform, id: pform.platformId }} />)}
            </div>
        </div>
    )
}

async function getData() {
    const gamesQuery = db.game.findMany({ take: 14 });
    const devsQuery = db.developer.findMany({ take: 20 });
    const pubsQuery = db.publisher.findMany({ take: 20 });
    const platformQuery = db.platform.findMany();

    const [games, devs, pubs, platforms] = await Promise.all([gamesQuery, devsQuery, pubsQuery, platformQuery])

    return {
        games,
        devs,
        pubs,
        platforms
    }
}