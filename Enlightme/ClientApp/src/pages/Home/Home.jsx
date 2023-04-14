import React, { useCallback, useEffect, useState } from "react";

import BasePage from "src/components/base/BasePage/basePage";
import IntroSection from "src/features/home-page/components/IntroSection/introSection";

import upload from "src/static/images/upload";

import './home.scss'

const Home = () => {
    const [video, setVideo] = useState();

    const onFileUploaded = useCallback((e) => {
        console.log(e.target.files[0]);
        setVideo(e.target.files[0]);
    }, [setVideo]);

    useEffect(() => {
        if (video) {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'fb18ddc94fmshd8b32e00a1cbdd1p17d0d1jsn7d69a1031784',
                    'X-RapidAPI-Host': 'youtube-transcriptor.p.rapidapi.com'
                }
            };
            
            fetch('https://youtube-transcriptor.p.rapidapi.com/transcript?video_id=5Vx1NO1dxUQ&lang=en', options)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err));
        }
    }, [video]);

    return (
        <BasePage>
            <section className="upload-section">
                <label htmlFor="inputFile" className="upload-section__uploader">
                    Upload your book
                    <input 
                        id="inputFile" 
                        type="file" 
                        accept="video/*"
                        className="upload-input" 
                        onChange={onFileUploaded}
                    />
                    <img src={upload} className="upload-image" />
                </label>
                <div className="upload-section__info">
                    Here you can upload your video and create some new cards
                </div>
            </section>
        </BasePage>
    );
}

export default Home;