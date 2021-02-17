import '../styles/tailwind.css'
import { AppProps } from "next/app";
import axios from 'axios';
import Navbar from '../components/Navbar'
import {useRouter} from 'next/router'
import '../styles/icons.css'
import {AuthProvider} from '../context/auth'
//https://swr.vercel.app/docs/global-configuration
import  { SWRConfig } from 'swr'

axios.defaults.baseURL = 'http://localhost:5000/api'
//always want to send cookie to client side
axios.defaults.withCredentials = true

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

function App({ Component, pageProps }: AppProps) {
  const {pathname} = useRouter()
  const authRoutes=['/register','/login']
  const authRoute = authRoutes.includes(pathname)
  return (
  <SWRConfig value={{
    fetcher,
    dedupingInterval:10000
  }}>
  <AuthProvider>
    {!authRoute && <Navbar/>}
    <div className={authRoute?'':"pt-12"}>
    <Component {...pageProps} />
    </div>
     
  </AuthProvider>
  </SWRConfig>
  
  )
    
 
}

export default App;
