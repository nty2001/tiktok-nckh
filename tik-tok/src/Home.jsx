import React from "react";
import Tiktok from "./icon/tiktok.jpg";
import Search from "./icon/search.svg";
import music from "./icon/music.svg";
import heart from "./icon/heart.svg";
import comment from "./icon/comment.svg";
import share from "./icon/share.svg";
import { Link } from "react-router-dom";
import video from "./icon/video.mp4";
import { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [data, setData] = useState([]);
  const [input,setInput]=useState("")
  const [search,setSearch] = useState("")
  const onSearch=(e)=>{
    e.preventDefault();
    setSearch(input)

  }
  const [limit,setLimit] = useState(2)
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`http://localhost:5000/tiktok?desc_like=${search}&_page=1&_limit=${limit}`);
      setData(res.data);
    };
    getData();
  }, [search,limit]);
  
  return (
    <div className="main">
      <div className="header">
        <div className="header__logo">
          <img src={Tiktok} className="img" alt="" />
        </div>
        <form className="header__form" onSubmit={onSearch}>
          <div className="header__input">
            <input
              type="text"
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              className="form__input"
              placeholder="Search accounts video"
            />
          </div>
          <div className="header__search">
            <button>
              <img src={Search} className="img--search" alt="" />
            </button>
          </div>
        </form>
        <div className="header__logo">
          <div class="header__upload">
            <p>Upload</p>
          </div>
          <div className="header__login">
            <button>Login in</button>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="left"></div>
        <main>
          {data.map((tiktok) => (
            <div className="between" key={tiktok.id}>
              <div className="between__name">
                <Link to="/" className="nav__link">
                  <p className="nav__text"> {tiktok.author.uniqueId}</p>
                 
                </Link>
              </div>
              <div className="between__title">
              <p className="nav__text"> {tiktok.desc}</p>
              </div>
              <div className="between__music">
                <div class="icon">
                  <img src={music} className="icon" alt="" />
                </div>
                <div className="title">
                  <Link to="/" class="title__link">
                    {tiktok.music.title}
                  </Link>
                </div>
              </div>
              <div class="videooo">
                <div class="between__video">
                  <video width="320px" autoPlay controls src={video} alt="" />
                </div>
                <div class="icon__share">
                  <div className="heart">
                    <img src={heart} className="img__heart" alt="" />
                    <p>{tiktok.stats.diggCount}</p>
                  </div>
                  <div className="comment">
                    <img src={comment} className="img__comment" alt="" />
                    <p>{tiktok.stats.commentCount}</p>
                  </div>
                  <div className="share">
                    <img src={share} className="img__share" alt="" />
                    <p>{tiktok.stats.shareCount}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button className="learnMore" value={`${limit+2}`} onClick={(e)=>setLimit(e.target.value)}>Learn More</button>
        </main>

        <div className="right"></div>
      </div>
    </div>
  );
};

export default Home;
