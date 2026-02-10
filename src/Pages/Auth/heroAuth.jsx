import {
  faAlarmClock,
  faChartArea,
  faHeartbeat,
  faPhotoFilm,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import src from "../../assets/alex-avatar-BLDJqiDr.png";

import {
  faHeart,
  faMessage,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
export default function HeroAuth() {
  return (
    <>
      <section className="hero_login sm:w-full sm:h-1/2 md:w-1/2 md:h-full bg-blue-500 p-10 flex flex-col justify-between">
        {/* Upper */}
        <div className="upperSection flex items-center gap-4">
          <div className="bg-white/30 backdrop-blur-3xl border border-white rounded-[15px] py-3 px-2 w-12.5">
            <p className="font-bold text-white text-center m-0 text-2xl sm:text-3xl">
              S
            </p>
          </div>
          <p className="text-white text-2xl sm:text-3xl font-bold m-0">
            SocialHup
          </p>
        </div>

        {/* Middle */}
        <div className="middel_section flex flex-col gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Welcome Back <br />
              <span className="text-cyan-300">to SocialHub App</span>
            </h2>
            <p className="text-white text-sm sm:text-base md:text-lg">
              Signin to connect people all over the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              ["Real-time Chat", "Instant messaging", faMessage],
              ["Share Media", "Photos & videos", faPhotoFilm],
              ["Smart Alerts", "Stay updated", faAlarmClock],
              ["Communities", "Find your tribe", faUsers],
            ].map(([title, desc, icon], i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-2 py-3 bg-white/30 backdrop-blur-3xl border border-amber-50 rounded-2xl hover:scale-[1.01] duration-75"
              >
                <FontAwesomeIcon
                  icon={icon}
                  className="text-emerald-300 bg-white/10 rounded-2xl p-4 backdrop-blur-2xl"
                />
                <div>
                  <p className="text-white font-bold text-sm sm:text-base">
                    {title}
                  </p>
                  <p className="text-white font-bold text-xs sm:text-sm">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-3 mt-3 text-white">
            <div className="text-center">
              <span className="font-bold text-sm sm:text-base md:text-lg">
                <FontAwesomeIcon icon={faUsers} /> 2M+
              </span>
              <p className="text-xs sm:text-sm md:text-base">Active Users</p>
            </div>
            <div className="text-center">
              <span className="font-bold text-sm sm:text-base md:text-lg">
                <FontAwesomeIcon icon={faHeartbeat} /> 10M+
              </span>
              <p className="text-xs sm:text-sm md:text-base">Posts Shared</p>
            </div>
            <div className="text-center">
              <span className="font-bold text-sm sm:text-base md:text-lg">
                <FontAwesomeIcon icon={faChartArea} /> 50M+
              </span>
              <p className="text-xs sm:text-sm md:text-base">Messages Sent</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="bg-white/30 backdrop-blur-2xl rounded-2xl p-3 flex flex-col gap-5">
          <div>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>

          <p className="text-white text-sm sm:text-base leading-relaxed">
            "SocialHub has completely changed how I connect with friends and
            discover new communities. The experience is seamless!"
          </p>

          <div className="flex items-center gap-3">
            <img src={src} className="size-11 rounded-full" alt="" />
            <div>
              <p className="font-bold text-white text-sm sm:text-base">
                Alex Johnson
              </p>
              <p className="text-white text-xs sm:text-sm">Product Designer</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
