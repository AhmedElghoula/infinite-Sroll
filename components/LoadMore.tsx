'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchAnime } from "../app/action";
import AnimeCard, { AnimeProp } from "./AnimeCard";

let page = 2;

function LoadMore() {
    const { ref, inView } = useInView();
    const [data, setData] = useState<AnimeProp[]>([]);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (inView) {
            if (inView) {
               
                  fetchAnime(page)
                  .then((res) => {
                    setData([...data, ...res]);
                    page++;
                  })
                  .catch((err)=>{setIsLoading(false)}
                  );
          
              }
        }
      }, [inView ,data]);
    
  return (
    <>
    <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item: AnimeProp, index: number) => (
          <AnimeCard key={item.id} anime={item} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        {isLoading?
          <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
        :
        <div className="sm:text-3xl text-2xl text-red-500 lg:max-w-lg font-bold " >
            not content to load 
      </div>}
      
      </section>
    </>
  );
}

export default LoadMore;