"use client";

import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Image } from 'lucide-react'
import axios from 'axios';

interface Game {
    id: number;
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
}

const GameList = () => {
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

    return (
        <> < Navbar />

            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h1>Discover Games</h1>
                </div>
            </div>

            <div className="list-form py-5">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2 className="mb-3">300 Game Avaliable</h2>
                        </div>

                        <div className="col-lg-8 text-align: right" >
                            <div className="mb-3">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-secondary">Popularity</button>
                                    <button type="button" className="btn btn-outline-primary">Recently Updated</button>
                                    <button type="button" className="btn btn-outline-primary">Alphabetically</button>
                                </div>

                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-secondary">ASC</button>
                                    <button type="button" className="btn btn-outline-primary">DESC</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                            <a href="detail-games.html" className="card card-default mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${game.thumbnail}`}
                                                alt={game.title}
                                                fill
                                                unoptimized
                                                loader={({ src }) => src}
                                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="col">
                                            <h5 className="mb-1">Demo Game 1 <small className="text-muted">By Dev1</small></h5>
                                            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.</div>
                                            <hr className="mt-1 mb-1" />
                                            <div className="text-muted">#scores submitted : 203</div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="col-md-6">
                            <a href="detail-games.html" className="card card-default mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4">
                                            <Image src="../example_game/v1/thumbnail.png" alt="Demo Game 2 Logo" className="width: 100%" />
                                        </div>
                                        <div className="col">
                                            <h5 className="mb-1">Demo Game 2 <small className="text-muted">By Dev1</small></h5>
                                            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.</div>
                                            <hr className="mt-1 mb-1" />
                                            <div className="text-muted">#scores submitted : 320</div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="col-md-6">
                            <a href="detail-games.html" className="card card-default mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4">
                                            <Image src="../example_game/v1/thumbnail.png" alt="Demo Game 3 Logo" className="width: 100%" />
                                        </div>
                                        <div className="col">
                                            <h5 className="mb-1">Demo Game 3 <small className="text-muted">By Dev2</small></h5>
                                            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.</div>
                                            <hr className="mt-1 mb-1" />
                                            <div className="text-muted">#scores submitted : 1143</div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="col-md-6">
                            <a href="detail-games.html" className="card card-default mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4">
                                            <Image src="../example_game/v1/thumbnail.png" alt="Demo Game 4 Logo" className="width: 100%" />
                                        </div>
                                        <div className="col">
                                            <h5 className="mb-1">Demo Game 4 <small className="text-muted">By Dev1</small></h5>
                                            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.</div>
                                            <hr className="mt-1 mb-1" />
                                            <div className="text-muted">#scores submitted : 23</div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Game