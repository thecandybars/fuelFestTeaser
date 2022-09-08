//USERS & PERSONS
import owner from "../icons/owner-icon.svg";
//SOCIAL
import facebook from "../icons/social/facebook.svg";
import instagram from "../icons/social/instagram.svg";
import twitter from "../icons/social/twitter.svg";
import youtube from "../icons/social/youtube.svg";
//FAVORITE
import favoriteOn from "../icons/favorite_FILL1_wght400_GRAD0_opsz48.svg";
import favoriteOff from "../icons/favorite_FILL0_wght400_GRAD0_opsz48.svg";
//UPGRADES
import body from "../icons/upgrade/Body.svg";
import wheels from "../icons/upgrade/Tires.svg";
import brakes from "../icons/upgrade/Brakes.svg";
import engine from "../icons/upgrade/Engine.svg";
import nitro from "../icons/upgrade/Nitro.svg";
import suspension from "../icons/upgrade/Suspension.svg";
// import lights from "../icons/directions_car_FILL1_wght400_GRAD0_opsz48.svg";
// import paint from "../icons/directions_car_FILL1_wght400_GRAD0_opsz48.svg";
import stereo from "../icons/speaker_FILL1_wght400_GRAD0_opsz48.svg";
//MAPS
import map from "../icons/map_FILL0_wght400_GRAD0_opsz48.svg";
import location from "../icons/location_on_FILL0_wght400_GRAD0_opsz48.svg";
//VOTING
import bestLigths from "../icons/voting/best_light.svg";
import bestInterior from "../icons/voting/best_interior.svg";
import bestPaint from "../icons/voting/best_paint.svg";
import bestRims from "../icons/voting/best_rims.svg";
import bestStereo from "../icons/voting/best_stereo.svg";
//EVENTS
import clock from "../icons/event/clock.svg";
import calendar from "../icons/event/calendar.svg";
//NAVIGATION
import homeOn from "../icons/navigation/home-on.svg";
import homeOff from "../icons/navigation/home-off.svg";
import walletOn from "../icons/navigation/wallet-on.svg";
import walletOff from "../icons/navigation/wallet-off.svg";
import qrOn from "../icons/navigation/qr-on.svg";
import qrOff from "../icons/navigation/qr-off.svg";
import favoritesOn from "../icons/navigation/favorites-on.svg";
import favoritesOff from "../icons/navigation/favorites-off.svg";
//TEMPNAV
import home from "../icons/navigation/home_FILL0_wght400_GRAD0_opsz48.svg";
import wallet from "../icons/navigation/wallet_FILL0_wght400_GRAD0_opsz48.svg";
import qr_code_scanner from "../icons/navigation/qr_code_scanner_FILL0_wght400_GRAD0_opsz48.svg";
import favorite from "../icons/navigation/favorite_FILL0_wght400_GRAD0_opsz48.svg";

export const icons = {
  owner,
  map,
  location,
  social: { facebook, instagram, twitter, youtube },
  favorite: { on: favoriteOn, off: favoriteOff },
  upgrade: { body, wheels, brakes, engine, nitro, suspension, stereo },
  voting: { bestLigths, bestInterior, bestPaint, bestRims, bestStereo },
  event: { clock, calendar },
  navigation: {
    home: { on: homeOn, off: homeOff },
    wallet: { on: walletOn, off: walletOff },
    qr: { on: qrOn, off: qrOff },
    favorite: { on: favoritesOn, off: favoritesOff },
  },
  tempNav: {
    home,
    wallet,
    qr: qr_code_scanner,
    favorite,
  },
};
