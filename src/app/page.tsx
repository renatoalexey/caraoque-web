"use client";
import Image from "next/image";
import { getSongs, deleteSong, getClients, getNextSongs, addNextSong, deleteNextSong } from "@/lib/firestore";
import { useEffect, useState } from "react";
import {Client, Song} from "@/types"
import './ItemList.css';

export default function Home() {
  const [songs, setSongs] = useState([] as Song[])
  const [nextSongs, setNextSongs] = useState([] as Song[]);
  const [clients, setClients] = useState([] as Client[])

  useEffect(() => {
    console.log("Songs ###: " + songs)
    getSongs().then( (docSongs: any) => {
      //const songs: Song[] = getSongsFromDocs(docSongs)
      teste( docSongs ) 
    })

    console.log("Songs ###: " + songs)
    getClients().then( (docClients: any) => {
      //const songs: Song[] = getSongsFromDocs(docSongs)
      setClients( docClients ) 
    })
  }, [])

  const teste = (docSongs: Song[]) => {

    getNextSongs().then( (nextSongsTemp: any) => {

      const songsAfter2 = sortSongList(docSongs)

      while(nextSongsTemp.length < 5 && songsAfter2.length > 0) {
        const songAux = songsAfter2.shift() 
        nextSongsTemp.push(songAux!)
        deleteSong(songAux.id)
        delete songAux.id
        addNextSong(songAux)
      }

      setNextSongs(nextSongsTemp)
      setSongs(songsAfter2)
      console.log("Songs after Y: " + JSON.stringify(songs))
    })

    //const songsAfter: any = docSongs.filter( (input) =>  nextSongs.find( (ns: any) => ns.id == input.id ) == undefined  )    
  }

  const sortSongList = (songList: Song[]): any => {
    const sortedList = songList.map( (entry, index) => {
      const order = entry.weight * (index + 1)
      return {id: entry.id, order: order}
    }).sort( (a, b) => {
      if(a.order < b.order) return -1;
      return 1;
    })


    const songListAux: any = sortedList.map( (entry) => {
      return songList.find( (input) => {
        if (input.id == entry.id) return input;
      });
    }) 

    return songListAux;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
        
        <div className="list-container">
          <h2 className="list-title">Próximas 5 músicas </h2>
          <ul >
            {nextSongs.map((item, index) => (
              <li className="list-item" key={index}> 
              <span style={ {marginRight: '15px'} }>{ clients.find( (client: Client) => client.id == item.clientId )?.name} </span>

                <a href={`https://www.youtube.com/watch?v=${item.videoId}`} onClick={ () => deleteNextSong(item.id) }
                  target="_blank" rel="noopener noreferrer">  {item.title} </a> 
              </li> // Always add a unique key!
            ))}
          </ul>
        </div>
         <div className="list-container">
          <h2 className="list-title">Lista de músicas </h2>
          <ul>
            {songs.map((item, index) => (
              <li className="list-item" key={index}> 
              
              <span style={ {marginRight: '15px'} }>{ clients.find( (client: Client) => client.id == item.clientId )?.name} </span>
                <a style={{ pointerEvents: 'none' }} href={`https://www.youtube.com/watch?v=${item.videoId}`}
                  rel="noopener noreferrer">  {item.title} </a> 
              </li> // Always add a unique key!
            ))}
          </ul>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
