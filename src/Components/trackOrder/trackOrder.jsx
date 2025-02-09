import { useEffect, useRef } from 'react';
import { TimelineLite } from 'gsap';
import './trackOrder.css'

const OrderTracker = () => {
  const progressBarRef = useRef(null);
  const processedRef = useRef(null);
  const shippedRef = useRef(null);
  const enrouteRef = useRef(null);
  const arrivedRef = useRef(null);

  const allStates = [
    { ref: processedRef, drawPercentage: '30%' },
    { ref: shippedRef, drawPercentage: '60%' },
    { ref: enrouteRef, drawPercentage: '90%' },
    { ref: arrivedRef, drawPercentage: '100%' }
  ];

  useEffect(() => {
    const timeline = new TimelineLite();

    allStates.forEach((state, index) => {
      const prevState = allStates[index - 1];
      const delay = prevState ? '-=0.15' : 0;

      // Animation for each state
      timeline
        .from(state.ref.current, 0.1, { autoAlpha: 0, scale: 0, transformOrigin: "50% 50%" }, delay)
        .fromTo(progressBarRef.current, 0.5, { drawSVG: index === 0 ? 0 : prevState.drawPercentage }, { drawSVG: state.drawPercentage });
    });
  }, []);

  return (
    <div id="app">
      <article className="order-tracker">
        <section className="order-info">
          <div className="order-info__number">
            <span>Order</span>
            <a href="/" className="order-number__number">#Y34XDHR</a>
          </div>
          
          <div className="order-info__details">
            <span className="order-info__details__arrival-date">Expected Arrival 01/13/18</span>
            <span className="order-info__details__tracking-number">USPS <a href="/">24339482904809482</a></span>
          </div>
        </section>
        
        <section className="order-status__progress">
          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 562.4 38.21">
            <defs>
              <style>
                {`
                  .cls-1 { fill: #c1d9e4; }
                  .cls-2, .cls-3, .cls-5 { fill: none; stroke-miterlimit: 10; }
                  .cls-2, .cls-5 { stroke: #fff; }
                  .cls-2 { stroke-width: 3px; }
                  .cls-3 { stroke: #1c7ff0; stroke-width: 20px; }
                  .cls-4 { fill: #1c7ff0; }
                  .cls-5 { stroke-width: 2.64px; }
                `}
              </style>
            </defs>
            <path className="cls-1" d="M551.34,4.89A19,19,0,0,0,535,14.22H358.34a19,19,0,0,0-32.67,0H200.12a19,19,0,0,0-32.67,0H43.34a19,19,0,1,0-.4,20H167.85a19,19,0,0,0,31.86,0H326.08a19,19,0,0,0,31.86,0H535.41A19,19,0,1,0,551.34,4.89Z" transform="translate(-8.01 -4.87)"/>
            <circle className="cls-2" cx="175.8" cy="19.21" r="10.11"/>
            <circle className="cls-2" cx="334.04" cy="19.06" r="10.11"/>
            <circle className="cls-2" cx="19.06" cy="19.13" r="10.11"/>
            <circle className="cls-2" cx="543.4" cy="19" r="10.11"/>
            <line className="cls-3 progress-bar" x1="8.98" y1="19.47" x2="554.76" y2="19.47"/>
            <g>
              <circle ref={processedRef} className="cls-4 overlay-check-bubble processed" cx="19.06" cy="19.13" r="19"/>
            </g>
            <g>
              <circle ref={shippedRef} className="cls-4 overlay-check-bubble shipped" cx="175.8" cy="19.21" r="19"/>
            </g>
            <g>
              <circle ref={enrouteRef} className="cls-4 overlay-check-bubble enroute" cx="334.04" cy="19.06" r="19"/>
            </g>
            <g>
              <circle ref={arrivedRef} className="cls-4 overlay-check-bubble arrived" cx="543.4" cy="19" r="19"/>
            </g>
          </svg>
        </section>
        
        <section className="order-status__status-info">
          <ol>
            <ul>
                <li>Order Conform</li>
                <li>Order Shipped</li>
                <li>Order En Route</li>
                <li>Order Arrived</li>
            </ul>
          </ol>
        </section>
      </article>
    </div>
  );
};

export default OrderTracker;
