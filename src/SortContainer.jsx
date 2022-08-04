import React, { useState, useEffect } from 'react';
import { randomizeArray } from './helpers/randomizeArray';
import { sortByName, sortByAttribute } from './helpers/sortMethods';
import { gameArray } from './constants/sampleArrays';

export const SortContainer = () => {
    const [renderArray, setRenderArray] = useState(gameArray);
    const [sortMethod, setSortMethod] = useState('default');
    const [loading, setLoading] = useState(false);

    // TODO - move sortMethod states to enums file

    const handleRandomize = () => {
        setLoading(true);
        setSortMethod('random');
    };

    const handleAlphaSort = () => {
        setLoading(true);
        setSortMethod('alphaTitle');
    };

    const handleGenreSort = () => {
        setLoading(true);
        setSortMethod('alphaGenre');
    };

    useEffect(() => {
        if(sortMethod === 'random') {
            const randomArray = randomizeArray(renderArray);
            setRenderArray(randomArray);
            setLoading(false);
        } 

        if (sortMethod === 'alphaTitle') {
            const sorted = sortByName(renderArray);
            setRenderArray(sorted);
            setLoading(false);
        }

        if(sortMethod === 'alphaGenre') {
            const sorted = sortByAttribute(renderArray, 'genre');
            setRenderArray(sorted);
            setLoading(false);
        }

    }, [loading, sortMethod]);

    return(
        <div>
            <div>
                <button onClick={handleRandomize}>
                    Randomize Array
                </button>
                <button disabled={sortMethod === 'alphaTitle'} onClick={handleAlphaSort}>
                    {'Sort By Title (A -> Z)'}
                </button>
                <button disabled={sortMethod === 'alphaGenre'} onClick={handleGenreSort}>
                    {'Sort By Genre (A -> Z)'}
                </button>
                <button disabled>
                    {'Sort By Score (high -> low)'}
                </button>
            </div>
            <table className="gameTable">
                <tbody>
                {
                    renderArray.map((entry) => {
                        const { id, title, genre, score } = entry;
                        return(
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{title}</td>
                                <td>{genre}</td>
                                <td>{score}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
};