import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import {Fragment, useEffect,useState} from 'react'
import {Post} from '../types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { GetServerSideProps } from 'next'


dayjs.extend(relativeTime)


export default function Home({posts}) {
  //  const [posts,setPosts]=useState<Post[]>([])
  // useEffect(()=>{
  //  axios.get('/posts').then(res=> setPosts(res.data)).catch(err=>console.log(err))
  // },[])


  return (
    <div className='pt-12 '>
      <Head>
        <title>readit: the front page of the internet</title>
      </Head>
      <div className="container flex pt-4">
        {/* posts area */}
       <div className="pt-4 w-160">
         {
           posts.map(post=>(
             <div key={post.identifier}
              className="flex mb-4 bg-white rounded"
             >
             {/* vote section */}
             <div className="w-10 text-center bg-gray-200 rounded-l">
              <p>v</p>
             </div>
             {/* post section */}
             <div className="w-full p-2">
            <div className="flex items-center">
              <Fragment>
              <Link href={`/r/${post.subName}`}>
                <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" className="w-6 h-6 mr-1 rounded-full cursor-pointer"/>
              </Link>
              <Link href={`/r/${post.subName}`}>
               <a className="text-xs font-bold cursor-pointer hover:underline">
                 /r/{post.subName}
               </a>
              </Link>
              <p className="text-xs text-gray-500">
                <span className="mx-1">•</span>
                Posted By 
                <Link href={`/u/${post.username}`}>
                  <a className="mx-1 hover:underline">
                    /u/{post.username}
                  </a>
                </Link>
                <Link href={`/r/${post.subName}/${post.identifier}/${post.slug}`}>
                  <a className="mx-1 hover:underline">
                    {dayjs(post.createdAt).fromNow()}
                  </a>
                </Link>
              </p>
              </Fragment>    
            </div>
            <Link href={post.url}>
              <a className="my-1 text-lg font-medium">
                {post.title}
              </a>
            </Link>
            {post.body && <p className="my-1 text-sm">{post.body}</p>}
            <div className="flex">
              <Link href={post.url}>
                <a>
                  <div className="px-1 py-1 mr-2 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                    <i className="my-1 mr-1 fas fa-comment-alt fa-xs"></i>
                    <span className="font-bold">20 comments</span>
                  </div>                  
                </a>
              </Link>
                <div className="px-1 py-1 mr-2 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                  <i className="my-1 mr-1 fas fa-share fa-xs"></i>
                  <span className="font-bold">share</span>
                </div> 
                <div className="px-1 py-1 mr-2 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                  <i className="my-1 mr-1 fas fa-bookmark fa-xs"></i>
                  <span className="font-bold">save</span>
                </div> 
            </div>
             </div>
             </div>
           ))
         }
       </div>
       {/* sidebar */}
      </div>
    </div>
  )
}


export const getServerSideProps:GetServerSideProps = async(context) => {
  try {
   const res= await axios.get('/posts')

   return { props:{
     posts:res.data
   }}
  }catch(err){
   return { props: {error:"something is wrong"}}
  }
}