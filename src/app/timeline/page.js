"use client";

import { useState, useEffect } from 'react';
import styles from './timeline.module.css';

export default function TimelinePage() {
  const [birthYear, setBirthYear] = useState('');
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false); 
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    setBirthYear(e.target.value);
  };

  const handleSearch = () => {
    setLoading(true); // Show loading screen

    // Delay the timeline generation and background color change by 2 seconds
    setTimeout(() => {
      const generatedEvents = generateTimelineEvents(birthYear);
      setTimelineEvents(generatedEvents);
      setShowTimeline(true); // Trigger background color change
      setLoading(false); // Hide loading screen
    }, 2000);
  };

  return (
    <div className={`${styles.container} ${showTimeline ? styles.blueBackground : ''}`}>
      <div className={`${styles.fixedHeader} ${scrolled ? styles.scrolled : ''}`}>
        <h1 className={styles.title}>Environmental Impact Timeline</h1>
        <input
          type="number"
          placeholder="Enter birth year"
          value={birthYear}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.button}>Show Timeline</button>
      </div>

      {loading ? ( // Show loading screen if loading is true
        <div className={styles.loadingScreen}>
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className={styles.timeline}>
          {timelineEvents.map((event, index) => (
            <div key={index} className={styles.timelineEvent}>
              <img src={event.image} alt="Event" className={styles.eventImage} />
              <div className={styles.eventContent}>
                <h3 className={styles.eventDate}>{event.year}</h3>
                <p className={styles.eventDescription}>{event.description}</p>
                <a href={event.link} target="_blank" rel="noopener noreferrer" className={styles.eventLink}>
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <footer className={styles.footer}>
        <div className={styles.footerMessage}>Protect Our Planet - Every Action Counts</div>
      </footer>
    </div>
  );
}

function generateTimelineEvents(birthYear) {
  const events = [
    { year: 1930, description: 'Dust Bowl in the United States', image: 'https://assets.editorial.aetnd.com/uploads/2009/10/dust-bowl-envelopes-swathes-of-the-u-s.jpg?width=828&amp%3Bheight=400&amp%3Bcrop=2%3A1&quality=75&auto=webp', link: 'https://www.history.com/topics/great-depression/dust-bowl' },
    { year: 1945, description: 'Atomic Bombings of Hiroshima and Nagasaki', image: 'https://img.freepik.com/premium-vector/typography-vector-design-with-historical-concept-hiroshima-nagasaki-japan-atomic-bomb-explosion_758894-1389.jpg', link: 'https://www.icanw.org/hiroshima_and_nagasaki_bombings' },
    { year: 1952, description: 'The Great Smog of London', image: 'https://images.immediate.co.uk/production/volatile/sites/7/2022/12/GettyImages514954664-cbcc8d5.png', link: 'https://www.history.com/news/the-killer-fog-that-blanketed-london-60-years-ago' },
    { year: 1962, description: 'Publication of Silent Spring by Rachel Carson', image: 'https://www.nrdc.org/sites/default/files/styles/medium_16x9_150/public/media-uploads/HEAs11_RM50334116_678x1024_0.jpg.webp?h=e98195d0&itok=Z6f_GRAH', link: 'https://www.nrdc.org/stories/story-silent-spring' },
    { year: 1969, description: 'Cuyahoga River Fire', image: 'https://th-thumbnailer.cdn-si-edu.com/ngPjSkFJLI9LNuw0iCKaxOLSrII=/1000x750/filters:no_upscale():focal(685x657:686x658)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/13/e4136a97-b510-432c-8089-15a4d7ba50f7/gettyimages-515303088.jpg', link: 'https://www.smithsonianmag.com/history/cuyahoga-river-caught-fire-least-dozen-times-no-one-cared-until-1969-180972444/' },
    { year: 1970, description: 'First Earth Day Celebration', image: 'https://images.thequint.com/thequint%2F2023-04%2F369235fb-580e-472f-9f57-ecd9f41686e2%2Fworld_earth_day_or_environment_day_concept_jpg_s_1024x1024_w_is_k_20_c_rNO1JrJx59A_0qaQ22XXBtAENvlrj.jpg', link: 'https://www.earthday.org/history/' },
    { year: 1978, description: 'Love Canal Toxic Waste Disaster', image: 'https://i.ytimg.com/vi/PokvHGf07qI/maxresdefault.jpg', link: 'https://www.epa.gov/aboutepa/love-canal-tragedy' },
    { year: 1985, description: 'Discovery of the Ozone Hole', image: 'https://i.ytimg.com/vi/Ur_OKw1dHWk/maxresdefault.jpg', link: 'https://www.britannica.com/science/ozone-depletion' },
    { year: 1986, description: 'Chernobyl Nuclear Disaster', image: 'https://www.shutterstock.com/image-illustration/3d-renderchernobyl-ruins-nuclear-power-600nw-2207998923.jpg', link: 'https://www.britannica.com/event/Chernobyl-disaster' },
    { year: 1989, description: 'Exxon Valdez Oil Spill', image: 'https://assets.editorial.aetnd.com/uploads/2018/03/exxon-valdez-oil-spill-gettyimages-542342318.jpg?width=1920&height=960&crop=1920%3A960%2Csmart&quality=75&auto=webp', link: 'https://www.history.com/topics/1980s/exxon-valdez-oil-spill' },
    { year: 1991, description: 'Kuwaiti Oil Fires', image: 'https://i.guim.co.uk/img/media/d61efeff56e2a21897721fe049dbab54c01321aa/0_0_3000_1801/master/3000.jpg?width=1300&dpr=2&s=none&crop=none', link: 'https://www.theguardian.com/environment/2021/dec/11/the-sound-of-roaring-fires-is-still-in-my-memory-30-years-on-from-kuwaits-oil-blazes' },
    { year: 1992, description: 'Rio Earth Summit', image: 'https://sgkplanet.com/wp-content/uploads/2022/12/Summary-and-conclusions-of-the-Rio-Summit.-Second-Earth-Summit.jpg', link: 'https://www.un.org/en/conferences/environment/rio1992' },
    { year: 1997, description: 'Kyoto Protocol Signed', image: 'https://newsinterpretation.com/wp-content/uploads/2023/11/kyoto-protocol.jpg', link: 'https://unfccc.int/kyoto_protocol' },
    { year: 2004, description: 'Indian Ocean Earthquake and Tsunami', image: 'https://cdn.britannica.com/30/151930-138-2777C079/John-Rafferty-sciences-tsunamis-Earth-Encyclopaedia-Britannica.jpg?w=800&h=450&c=crop', link: 'https://www.britannica.com/event/Indian-Ocean-tsunami-of-2004' },
    { year: 2010, description: 'BP Oil Spill in Gulf of Mexico', image: 'https://safety4sea.com/wp-content/uploads/2018/04/deepwater-horizon-e1524217453666.jpg', link: 'https://www.britannica.com/event/Deepwater-Horizon-oil-spill' },
    { year: 2011, description: 'Fukushima Nuclear Disaster', image: 'https://i0.wp.com/www.opensourceinvestigations.com/wp-content/uploads/2015/12/fukusima-accident.jpg?w=840&ssl=1', link: 'https://www.world-nuclear.org/information-library/safety-and-security/safety-of-plants/fukushima-accident.aspx' },
    { year: 2015, description: 'Paris Climate Agreement', image: 'https://concernusa.org/uploads/23595388112_a931b9305e_o.webp', link: 'https://unfccc.int/process-and-meetings/the-paris-agreement/the-paris-agreement' },
    { year: 2019, description: 'Amazon Rainforest Wildfires', image: 'https://ichef.bbci.co.uk/news/1024/cpsprodpb/12644/production/_108523357_matogrossodrone1marizildacruppeamnestyinternational23august2019.jpg.webp', link: 'https://www.bbc.com/news/world-latin-america-49433767' },
    { year: 2020, description: 'Australian Bushfires', image: 'https://ichef.bbci.co.uk/news/1024/cpsprodpb/12BB2/production/_110722767_fires_scape_getty_976.jpg.webp', link: 'https://www.bbc.com/news/world-australia-50951043' },
    { year: 2021, description: 'Texan Winter Storm and Power Crisis', image: 'https://www.undrr.org/sites/default/files/styles/landscape_16_9/public/2022-06/Texas-coldwave-2021.jpg?h=2cf907fb&itok=7EIpeZfX', link: 'https://www.undrr.org/news/texas-coldwave-disaster-how-cascading-risks-took-out-entire-power-grid' },
    { year: 2022, description: 'Pakistan Floods', image: 'https://www.unicef.org/sites/default/files/styles/hero_extended/public/UN0802739.jpg.webp?itok=tLPxXk6K', link: 'https://www.unicef.org/emergencies/devastating-floods-pakistan-2022' },
    { year: 2023, description: 'Record Heatwaves and Wildfires in Europe', image: 'https://images.deccanherald.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Farticleimages%2F2023%2F07%2F17%2Ffile7r21hzmzel11dqrrtj2-1237783-1689582316.jpg?auto=format%2Ccompress&fmt=webp&fit=max&format=webp&q=70&w=400&dpr=2', link: 'https://wmo.int/news/media-centre/europe-experiences-widespread-flooding-and-severe-heatwaves-2023' },
    { year: 2024, description: 'Global Coral Bleaching', image: 'https://cloudfront-us-east-2.images.arcpublishing.com/reuters/W7T6BNYI7ZG2NBOUROEYENTAOQ.JPG', link: 'https://www.reuters.com/business/environment/global-coral-bleaching-event-expands-now-largest-record-2024-10-17/' }
  ];

  return events.filter(event => event.year >= birthYear);
}
