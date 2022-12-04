import React, { useState } from "react";
import { IApp } from "./Page";
import styled from 'styled-components';
interface IMovies {
    moviesData: IApp[]
}

const Card=styled.div`
    width: 400px;
    height: 700px;
    display: flex;
    flex-direction: column;
    float: left;
    border: 1px solid #5F021F;
    border-radius: 40px ;
    margin-right: 50px;
    margin-bottom: 50px;
    margin-top: 50px;
    color: #000000b2;
    text-align: center;
    box-shadow: 2px 5px #5b001a9e;
`

const Image=styled.img`
    width: 300px;
    height: 400;
    margin-left: auto;
    margin-right: auto;
    opacity: 1;

    &:hover{
        opacity: 0.5;
    }
    
`
const StyledButton=styled.button`
    width: 300px;
    height: 50px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 40px ;
    background-color: #5f021f65;
    color: white;
  
`
const Wrapper=styled.div`
    background-color:black;
`
const Movies: React.FC<IMovies> = (props) => {
    return (
        <Wrapper>
            {
                props.moviesData.map(movie => {
                    return (
                        <Card className="card">
                            <h1>{movie.Title}</h1>
                            <Image src={movie.Poster}></Image>
                            <p>Year {movie.Year}</p>
                            <StyledButton> Read more...</StyledButton>
                        </Card>

                    )
                })
            }
        </Wrapper>
    )
}

function open(propert: string){

    window.open(propert);
}
export default Movies;