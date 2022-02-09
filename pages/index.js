import Head from 'next/head'
import React, { useState } from 'react';
import { Swiper, SwiperSlide,useSwiperSlide } from 'swiper/react';
import SwiperCore,{Autoplay,Direction,Navigation,Pagination } from 'swiper'
import { useSpring,useSprings, animated,config } from 'react-spring'
//import styles from '../styles/Home.module.css'
import 'swiper/css/bundle';

//problem list 
//menu not animating
//slides not animating properly
//add new font 
//better shape generation

export default function Home() {
  const colors = {white:"#e2fcef",shade1:"#9b287b",shade2:"#5c164e",shade3:"#402039",dark:"#170f11"}
  const [showMenu,setShowMenu] = useState(false)
  const randomNumber=(max,min,unit)=>{
    return (typeof(unit) == 'String') ? Math.floor(Math.random()*(max - min) + min )+''+unit : Number(Math.floor(Math.random()*(max - min) + min )) 
  }
  const NavigationBar = ()=>{
    const menuIdleAnimation = useSpring({ 
      config:{duration:15000,...config.gentle},
      from:{backgroundPosition:"86% 0%"},
      to:{backgroundPosition:"17% 100%"}
        // backgroundPosition.to({
        //   range: [0,  0.5,  1],
        //   output: ['0% 50%','100% 50%','0% 50%'],
        // }) 
    })
    return (
      <nav className="navigation">
        <span onClick={()=>setShowMenu(!showMenu)} className="burger">
          {showMenu ? 
            <img src="https://img.icons8.com/external-neu-royyan-wijaya/32/000000/external-cancel-neu-interface-neu-royyan-wijaya-2.png"/> :
          
            <img src="https://img.icons8.com/material-two-tone/24/000000/menu--v3.png"/>
          }
        </span>
        <div className="menu">
          <span className="neon-title">halo_therapy</span>
          {showMenu && <div style={{}}className="menu-bar">
            <span>link 1</span>
            <span>link 2</span>  
          </div>}
        </div> 
    </nav>
    )
  }
  const GiveShapes=()=>{
    const LShape = (props)=>{
      const pos = {y:props.top,x:props.left}
      const lStyle = {
       top:pos.y,
       left:pos.x
      }
      return<div style={lStyle} className="l-shape"><div className="shadow"></div></div>
    }
    const TShape = (props)=>{
      const pos = {y:props.top,x:props.left}
      const TStyle = {
       top:pos.y,
       left:pos.x
      }
      return<div style={TStyle} className="t-shape"></div>
    }
    const CircleShape = (props)=>{
      const pos = {y:props.top,x:props.left}
      const CStyle = {
       top:pos.y,
       left:pos.x
      }
      return<div style={CStyle} className="circle"></div>
    }
    return (
      <div className="all-shapes">
        <LShape top={randomNumber(100,195,'vh')} left={randomNumber(9,95,'vw')}/>
        <LShape top={randomNumber(100,195,'vh')} left={randomNumber(9,95,'vw')}/>
        <LShape top={randomNumber(100,95,'vh')} left={randomNumber(9,95,'vw')}/>
        <LShape top={randomNumber(195,215,'vh')} left={randomNumber(9,95,'vw')}/>
        <LShape top={randomNumber(95,115,'vh')} left={randomNumber(9,95,'vw')}/>
        <CircleShape top={randomNumber(119,195,'vh')} left={randomNumber(9,95,'vw')}/>
        <CircleShape top={randomNumber(95,115,'vh')} left={randomNumber(9,95,'vw')}/>
        <CircleShape top={randomNumber(95,115,'vh')} left={randomNumber(9,95,'vw')}/>
        <CircleShape top={randomNumber(95,115,'vh')} left={randomNumber(9,95,'vw')}/>
      </div>
    )
  }
  const imageList = ['1.jpg','2.jpg','3.jpg','4.jpg','6.jpg']

  const HeroPage = ()=>{
    const s = {
      backgroundImage:'url(../images/'+imageList[1]+')',
      width:"100%",
      height:"100%",
      backgroundSize:"cover",
    }
    return (
      <div className="hero">
        <div style={s} className="hero-bg">
        <h3 className="hero-text">light_up your_space</h3>
        </div>
      </div>
    )
  }
  const MainPage = ()=>{
    const fadeIn = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })
    const getBGStyle = (color,image)=>{
      return {
        color:color,
        backgroundImage:image,
        backgroundSize:"cover",
        backgroundPosition: "center",
      }      
    }
    const slideInfo = [{
        text:'express yourself',
        style:{...getBGStyle(colors.white,`url(../images/${imageList[0]})`)}
      },{
        text:'any color',
        style:{...getBGStyle(colors.white,`url(../images/${imageList[2]})`)}
      },{
        text:'any style',
        style:{...getBGStyle(colors.white,`url(../images/${imageList[3]})`)}

      },{
        text:'fully you',
        style:{...getBGStyle(colors.white,`url(../images/${imageList[4]})`)}
      }]
   
    return(
      <div style={{background:`linear-gradient(12deg,${colors.shade1} ,${colors.dark})`}} className="pageSlider">
      <Swiper
        modules={[Pagination]}
        direction={'vertical'}
        style={{height:'100vh',width:'100vw'}}
        pagination = {{dynamicBullets:true}}
      >
        {slideInfo.map(val=>{
          const s = val.style  
          const zoomIn = useSpring({ 
            duration:1000,
            delay:1000,
            to: { 
              height: "80%",
              width:"80vw",
              ...s
            }, 
            from:{
              height: "50%",
              width:"50vw",
              ...s
            }
          })
          return(
          <SwiperSlide>
            {({isActive})=>(
            <animated.div className="div-space" style={isActive ? zoomIn : s}>
              <animated.div className="text" style={fadeIn}>{val.text}</animated.div>
            </animated.div>    
            )}
          
          </SwiperSlide>
          )  
        })}
      </Swiper>
      </div>
    )
  }
  return (
    <div className=''>
      <Head>
        <title>Halo App</title>
        <meta name="description" content="halo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GiveShapes/>
      <main className="">
        <NavigationBar/>
        <HeroPage/>
        {/* <div className="container"> */}
        <MainPage/>
      </main>
    </div>
  )
}
