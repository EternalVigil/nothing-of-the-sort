import React, { useState, useEffect } from 'react';
import { randomizeArray } from './helpers/randomizeArray';
import { sortByAttribute } from './helpers/sortMethods';
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

    const handleScoreSort = () => {
        setLoading(true);
        setSortMethod('highScore');
    };

    const handleArrayReset = () => {
        setLoading(true);
        setSortMethod('default');
    };

    useEffect(() => {
        if(sortMethod === 'random') {
            const randomArray = randomizeArray(renderArray);
            setRenderArray(randomArray);
            setLoading(false);
        } 

        if (sortMethod === 'alphaTitle') {
            const sorted = sortByAttribute(renderArray, 'title');
            setRenderArray(sorted);
            setLoading(false);
        }

        if(sortMethod === 'alphaGenre') {
            const sorted = sortByAttribute(renderArray, 'genre');
            setRenderArray(sorted);
            setLoading(false);
        }

        if(sortMethod === 'highScore') {
            const sorted = sortByAttribute(renderArray, 'score');
            setRenderArray(sorted);
            setLoading(false);
        }

        if(sortMethod === 'default') {
            const original = [...gameArray];
            setRenderArray(original);
            setLoading(false);
        }

    }, [loading, sortMethod]);

    // TODO - assumes identical structure of game entities / could leave out columns if asymmetric
    const gameObj = gameArray[0];
    const objKeys = Object.keys(gameObj);

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
                <button disabled={sortMethod === 'highScore'} onClick={handleScoreSort}>
                    {'Sort By Score (high -> low)'}
                </button>
                <button disabled={sortMethod === 'default'} onClick={handleArrayReset}>
                    Reset to Default
                </button>
            </div>
            <table className="gameTable">
                <tbody>
                    <tr className="tableRow">
                        {
                            objKeys.map((column) => {
                                const firstLetter = column.substring(0, 1).toUpperCase();
                                const remaining = column.substring(1, column.length);
                                const columnName = `${firstLetter}${remaining}`;
                                return(<th className='tableHeader'>{columnName}</th>)
                            })
                        }
                    </tr>
                {
                    renderArray.map((entry) => {
                        const { id, title, genre, score } = entry;
                        return(
                            <tr key={id} className="tableRow">
                                <td className="tableCell">{id}</td>
                                <td className="tableCell">{title}</td>
                                <td className="tableCell">{genre}</td>
                                <td className="tableCell">{score}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
};