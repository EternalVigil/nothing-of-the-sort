import React, { useState } from 'react';
import { randomizeArray } from './helpers/randomizeArray';
import { sortByAttribute } from './helpers/sortMethods';
import { gameArray } from './constants/sampleArrays';

export const SortContainer = () => {
    const [sortMethod, setSortMethod] = useState('default');

    // TODO - move sortMethod states to enums file
    // TODO - remove JANK
    const handleRandomize = () => {
        if(sortMethod === 'random') {
            setSortMethod('random-2');
        } else setSortMethod('random');
    };

    const handleAlphaSort = () => {
        setSortMethod('alphaTitle');
    };

    const handleGenreSort = () => {
        setSortMethod('alphaGenre');
    };

    const handleScoreSort = () => {
        setSortMethod('highScore');
    };

    const handleArrayReset = () => {
        setSortMethod('default');
    };

    const renderArray = [...gameArray];

    let newArray = [];

    if(sortMethod === 'random') {
        newArray = randomizeArray(renderArray);
    }

    if(sortMethod === 'random-2') {
        newArray = randomizeArray(renderArray);
    }

    if(sortMethod === 'alphaTitle') {
        newArray = sortByAttribute(renderArray, 'title');
    }

    if(sortMethod === 'alphaGenre') {
        newArray = sortByAttribute(renderArray, 'genre');
    }

    if(sortMethod === 'highScore') {
        newArray = sortByAttribute(renderArray, 'score');
    }

    if(sortMethod === 'default') {
        newArray = [...gameArray];
    }

    // TODO - assumes identical structure of game entities / could leave out columns if asymmetric
    const gameObj = gameArray[0];
    const objKeys = gameObj && Object.keys(gameObj);

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
                                return(<th key={columnName} className='tableHeader'>{columnName}</th>)
                            })
                        }
                    </tr>
                {
                    newArray.map((entry) => {
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