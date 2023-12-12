"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Home() {
  const [underOV, setUnderOV] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [data, setState] = useState(null);
  const videoRef = useRef(null);

  const updateLocation = (position) => {
    setLocationData(position.coords);
  };

  const getLocationInfo = () => {
    // Get the location when the button is clicked
    if (!underOV) {
      navigator.geolocation.getCurrentPosition(updateLocation);
    }
    // Toggle the state to start/stop
    setUnderOV(!underOV);
  };

  const sendEmail = async (data) => {
    // Check if the flag and timestamp are set in localStorage
    const emailSentFlag = localStorage.getItem("emailSent");
    const emailSentTimestamp = localStorage.getItem("emailSentTimestamp");

    // Set an expiration time (e.g., 24 hours)
    const expirationTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // console.log(Date.now(), "now data");
    // console.log(emailSentFlag);
    // console.log(emailSentTimestamp);
    // console.log(expirationTime);
    // console.log(Date.now() - emailSentTimestamp);

    // If the flag is set and the timestamp is within the expiration time, don't send the email again
    if (
      emailSentFlag &&
      emailSentTimestamp &&
      Date.now() - emailSentTimestamp < expirationTime
    ) {
      console.log("Email already sent recently. Skipping.");
      return;
    }

    // const response = await fetch("/api/sendMail", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: "bibekjoshi34@gmail.com",
    //     subject: `IP Information: ${data.ip}`,
    //     message: `
    //     IP Address: ${data?.ip || "Unknown"}
    //     Network: ${data?.network || "Unknown"}
    //     Version: ${data?.IPv4 || "Unknown"}
    //     City: ${data?.city || "Unknown"}
    //     Region: ${data?.region || "Unknown"}
    //     Country: ${data?.country_name || "Unknown"}
    //     Latitude: ${data?.latitude || "Unknown"}
    //     Longitude: ${data?.longitude || "Unknown"}
    //     Timezone: ${data?.timezone || "Unknown"}
    //     Currency: ${data?.currency || "Unknown"}
    //     Languages: ${data?.languages || "Unknown"}
    //     Organization: ${data?.org || "Unknown"}
    //     `,
    //   }),
    // });

    const result = await response.json();
    localStorage.setItem("emailSent", "true");
    localStorage.setItem("emailSentTimestamp", Date.now());
  };

  useEffect(() => {
    // Get Info
    const getInfo = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setState(data);
        sendEmail(data);
      } catch (error) {
        console.error("Error fetching IP information:", error);
      }
    };
    getInfo();
  }, []);

  // Video Streaming

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        const videoRefCurrent = videoRef.current; // Capture the current value
        if (videoRefCurrent) {
          videoRefCurrent.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    if (underOV) {
      startWebcam();
    }

    return () => {
      // Use the captured variable in the cleanup function
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [underOV, videoRef]); // Include videoRef in the dependency array

  const btnOnClick = () => {
    setUnderOV(!underOV);
  };

  const metadata = {
    title: "Monitor",
    description: "You are under observation!",
    imageUrl: "../assets/monitor.jpg",
  };

  return (
    <>
      <Head>
        {/* Meta tags */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Title and description */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Open Graph tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={metadata.imageUrl} />

        {/* Twitter tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.imageUrl} />

        {/* Fonts */}
        <style dangerouslySetInnerHTML={{ __html: inter.styles }} />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Click &quot;Allow&quot; to grant access, and let the adventure
            begin! 🚀
          </p>
          {underOV && (
            <div className={styles.video}>
              <video ref={videoRef} autoPlay playsInline />
            </div>
          )}
        </div>

        <div className={styles.center}>
          <h1>
            {!underOV
              ? "Witnessing the Unseen: Your Journey Under Observation"
              : "You are under Observation!"}
          </h1>
        </div>

        <div className={styles.bottom}>
          <button className="start" onClick={btnOnClick}>
            {underOV ? "Stop" : "Start"}
            <FaArrowRightLong />
          </button>
        </div>
      </main>
    </>
  );
}
