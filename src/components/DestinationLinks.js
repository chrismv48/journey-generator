import React from 'react';
var googleLogo = require('../../static/google_logo.png');
var redditLogo = require('../../static/reddit_logo.png');
var tripadvisorLogo = require('../../static/tripadvisor_logo.png');


const DestinationLinks = ({ tripadvisorLink, city_name, country_name }) => {
  const googleHref = encodeURI(`https://www.google.com/search?q=${city_name}+${country_name}&tbm=isch&tbs=itp:photo`);
  const redditHref = encodeURI(`https://www.reddit.com/r/travel/search?q=${city_name}&restrict_sr=on&sort=relevance&t=all`);
  return (
    <div style={{marginTop: -8}}>
      <a href={googleHref} target="_target" style={{paddingRight: 4}}>
        <img src={googleLogo} width={20} height={20}/>
      </a>
       <a href={redditHref} target="_target" style={{paddingRight: 4}}>
         <img src={redditLogo} width={20} height={20}/>
       </a>
       <a href={tripadvisorLink} target="_target" style={{paddingRight: 4}}>
         <img src={tripadvisorLogo} width={25} height={20} />
       </a>
    </div>
  )
};

export default DestinationLinks
