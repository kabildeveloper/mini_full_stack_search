"use client";
import React, {useState} from "react";
import {fetchFaqs} from "@/app/api/faqApis";
import {FAQ, HttpError, Summary} from "@/types/types";
import ListItem from "@/components/ListItem";
import SpinnerWidget from "@/components/SpinnerWidget";

export default function Home() {

  const [search, setSearch] = useState<string>('');
  const [isFirstSearch, setIsFirstSearch] = useState<boolean>(true);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [summary, setSummary] = useState<Summary>();
  const [errorState, setErrorState] = useState<string| null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const onClickSearch = () => {
    setIsLoading(true);
    fetchFaqs(search).then(results => {
      console.log(results);
      setFaqs(results.result);
      setSummary(results.summary);
      setErrorState(null);
    }).catch(e => {
      if (e instanceof HttpError) {
        setErrorState(e.message);
        setFaqs(e.body.data as Array<FAQ>);
      } else {
        setErrorState(e.message);
        setFaqs([]);
      }
    }).finally(() => {
      setIsLoading(false);
      if (isFirstSearch) {
        setIsFirstSearch(false);
      }
    })
  }

  function render() {
    if (isLoading) {
      return (
        <div className='mt-10'>
          <SpinnerWidget/>
        </div>
      );
    }
    else if (faqs.length === 0 && isFirstSearch) {
      return (<p className='text-slate-400 text-3xl text-center mt-5'>Search Something</p>)
    }
    else if (errorState && errorState.length>0) {
      return (
        <div className=' text-center text-slate-500 text-2xl font-bold my-5'>{errorState}</div>
      )
    }
    else if (faqs.length > 0) {
      return (
        <>
          <div className='mt-10'>
            <h3 className='text-slate-700 text-2xl font-bold mb-5'>
              Search Results
            </h3>
            {faqs.map((faq, i) => (
              <ListItem key={faq.id} faq={faq} i={i}/>
            ))}
          </div>

          <div className="my-10">
            <h3 className='text-slate-700 text-2xl font-bold mb-5'>
              Summary
            </h3>
            <div className='bg-green-50 border-green-200 border p-5 text-slate-600 rounded-lg'>
              {summary?.summary}
            </div>
            {summary?.sources && summary.sources?.length > 0 && <div className='flex items-center gap-2 py-5'>
              <h3 className='text-slate-700 text-2xl font-bold mb-0'>
                Sources:
              </h3>
              {
                summary.sources.map((source, i) => (
                  <div
                    className='text-lg font-medium flex items-center justify-center text-white rounded-full w-[30px] h-[30px] bg-violet-500'
                    key={i}>{source}</div>
                ))
              }
            </div>}
          </div>
        </>
      )
    }
  }

  return (
    <div>
      <header>
        <h1 className="text-4xl font-bold text-center my-8 text-slate-700">Mini Search App</h1>
      </header>
      <main className="w-full max-w-[720px] mx-auto">
        <div className="flex w-full">
          <input
            onChange={handleSearch}
            value={search}
            placeholder='Search...'
            className="rounded-l-full px-6 py-3 border-2 border-blue-500 focus:outline-none focus:border-blue-600 w-full text-lg"
            type="search"/>
          <button onClick={onClickSearch}
                  className="rounded-r-full bg-blue-500 px-10 py-3 text-white font-bold hover:bg-blue-600 cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors text-lg">
            Search
          </button>
        </div>
        <section>
          {render()}
        </section>
      </main>
    </div>
  );
}
