//import React from 'react'

import Table from './Table'
import Form from './Form'
import axios from 'axios';
import React, {useState, useEffect} from 'react';

/*const characters = [
    {
        name: 'Charlie',
        job: 'Janitor',
    },
    {
        name: 'Mac',
        job: 'Bouncer',
    },
    {
        name: 'Dee',
        job: 'Aspring actress',
    },
    {
        name: 'Dennis',
        job: 'Bartender',
    },
];

function MyApp() {
    return (
        <div className="container">
            <Table characterData={characters} />
        </div>
    );
}*/
function MyApp() {
    const [characters, setCharacters] = useState([]);

    function updateList(person) {
        makePostCall(person).then( result => {
            if (result)
                setCharacters([...characters, result] );
        });
    }
    async function fetchAll(){
        try {
            const response = await axios.get('http://localhost:5000/users');
            return response.data.users_list;
        }
        catch (error){
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    async function makePostCall(person){
        try {
            const response = await axios.post('http://localhost:5000/users', person);
            return response.data;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    async function makeDeleteCall(person){
        try {
            const response = await axios.delete('http://localhost:5000/users', person);
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        fetchAll().then( result => {
            if (result)
                setCharacters(result);
        });
    }, [] );

    /*const [characters, setCharacters] = useState([
        {
            name: 'Charlie',
            job: 'Janitor',
        },
        {
            name: 'Mac',
            job: 'Bouncer',
        },
        {
            name: 'Dee',
            job: 'Aspring actress',
        },
        {
            name: 'Dennis',
            job: 'Bartender',
        },

    ]);*/
    return (
        <div className="container">
            <Table characterData={characters} removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList} />

        </div>
    )

 function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {
        return i !== index
    });
     makeDeleteCall(characters.character).then( result => {
         if (result)
             setCharacters( updated );
     });

  }
}
export default MyApp;