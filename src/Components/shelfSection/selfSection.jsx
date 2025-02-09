import './selfSection.css';
import Truck from './assets/delivery-truck.gif'
import Payment from './assets/payment.gif'
import Relation from './assets/relationship.gif'
import PaymentDone from './assets/icons8-in-progress.gif'
import Exchange from './assets/icons8-exchange.gif'

const selfSection = () => {
    return (
        <div>
            <h2 className='head2'>
                <span className='first'>Ter<span className='second'>iento</span></span> With you every step of the holiday.
            </h2>
            <div className="services-container">
                <div className="services-grid">
                    <div data-aos="zoom-in-right" className="service-card">
                        <h3>Need more info?</h3>
                        <h3>I <span className="highlight">got you.</span></h3>
                        <p>Here are some of the services I offer. If you have any questions, feel free to reach out.</p>
                    </div>
                    <div data-aos="zoom-in" className="service-card">
                        <span className="icon"><img src={Truck} alt="" /></span>
                        <h4>On Time Delivery</h4>
                        <p>Get gifts in time for the holidays with free delivery or easy pickup.</p>
                    </div>
                    <div data-aos="zoom-in-left" className="service-card">
                        <span className="icon"><img src={Payment} alt="" /></span>
                        <h4>Instant Cashback</h4>
                        <p>Enjoy instant rewards with cashback on eligible purchases, no waiting time involved.</p>
                    </div>
                    <div data-aos="zoom-in-right" className="service-card">
                        <span className="icon"><img src={Relation} alt="" /></span>
                        <h4>Happy Customers</h4>
                        <p>Enhancing your website visibility in search engines to drive more organic traffic and boost your online presence.</p>
                    </div>
                    <div data-aos="zoom-in" className="service-card">
                        <span className="icon"><img src={PaymentDone} alt="" /></span>
                        <h4>Secure Payments</h4>
                        <p>Creating websites that are not only visually appealing but also responsive on all devices and screen sizes.</p>
                    </div>
                    <div data-aos="zoom-in-left" className="service-card">
                        <span className="icon"><img src={Exchange} alt="" /></span>
                        <h4>Exchange Your Products.</h4>
                        <p>Building scalable and robust back-end systems to handle a wide variety of web applications seamlessly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default selfSection;
