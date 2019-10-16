# liri-node-app

## Purpose
    * Purpose of the app is to create LIRI, a Lanaguage Interpretation & Recognition Interface. To interpret parameters entered by a user and give back data based on the command.

## High level overview of organization
    - User inputs in a parameter
    - A parameter is compared against list of commands using if-else if statements
    - each if-else if statement calls on different function for each commands
    - function using the api will give back the requested data. if there was any problem in getting the data, a function for handling error message is called
    - outputs the data/error message to the user

## Instruction
    - Navigate through folder structure to where the file is located
    - Open Git Bash/Terminal
    - type one of the following command & inside the bracket, type your choice of band/song/movie
        * node liri.js concert-this [band name/artist]
            - this will give concert information for the band user typed in
        * node liri.js spotify-this-song [song title]
            - this will give information about the song user typed in
            - i have limited the command to limit top 5 matches for the search
        * node liri.js movie-this [movie title]
            - this will give information about the movie user typed in
        * node liri.js do-what-it-says
            - this gets a random command from random.txt file using 'fs.readFile' method

## Screenshots
4. Include screenshots, gifs, or videos of the app functioning

## Link to deployed version
    * this homework cannot be deployed on GitHub

## Technologies used
    * node.js
    * moment.js
    * axios.js
    * APIs - Spotify, BandsInTown, OMDB


