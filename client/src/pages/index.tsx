import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import {Fragment, useEffect,useState} from 'react'
import {Post} from '../types'

import PostCard from '../components/PostCard'
import { GetServerSideProps } from 'next'





export default function Home() {
   const [posts,setPosts]=useState<Post[]>([])
  useEffect(()=>{
   axios.get('/posts').then(res=> setPosts(res.data)).catch(err=>console.log(err))
  },[])


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
            <PostCard post={post} key={post.identifier}/>
           ))
         }
       </div>
       {/* sidebar */}
      </div>
    </div>
  )
}


// export const getServerSideProps:GetServerSideProps = async(context) => {
//   try {
//    const res= await axios.get('/posts')

//    return { props:{
//      posts:res.data
//    }}
//   }catch(err){
//    return { props: {error:"something is wrong"}}
//   }
// }