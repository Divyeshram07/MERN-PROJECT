import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "@coreui/coreui/dist/css/coreui.min.css";
import MovieCards from "./components/MovieCards";
import Register from "./components/Register";
import Signin from "./components/SignIn";
import EventPage from "./components/EventPage";
import ContactPage from "./components/ContactPage";
import MoviePage from "./components/MoviePage";
import SportsEventPage from "./components/SportsPage";
import AboutUs from "./components/AboutUs";
import MovieShowTime from "./components/MovieShowTime";
import EventDetails from "./components/EventDetails";
import TicketSelection from "./components/TicketSelection";
import { Carousel } from "react-bootstrap";
import Footer from "./components/Footer";
import SeatSelection from "./components/SeatSelection";
import ForgotPassword from "./components/ForgotPasswordPopup";
import AdminPage from "./components/AdminPage";
import AddMovie from './components/admin/AddMovie';
import AddEvent from './components/admin/AddEvent';
import PaymentSuccess from "./components/PaymentSucess";
import TicketConfirmation from "./components/TicketConfirmation";


import "./App.css";
import TicketRainLoader from "./TicketRainLoader"; // ✅ Import the loader

// ✅ Home component
const Home = () => {
  return (
    <div className="carousel-container">
      <Carousel>
        <Carousel.Item>
          <video autoPlay loop muted className="carousel-video">
            <source src="./videos/kingdom.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="carousel-overlay"></div>
          <Carousel.Caption className="carousel-caption">
            <span className="badge">Movie</span>
            <h2>Kingdom</h2>
            <p>Let The King Rise</p>
            <div className="price-details">
              <strong>₹300.00</strong> / ticket &nbsp; <span>150 seats left</span>
            </div>
            <button className="book-now-btn">Book Now</button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <video autoPlay loop muted className="carousel-video">
            <source src="./videos/hit3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="carousel-overlay"></div>
          <Carousel.Caption className="carousel-caption">
            <span className="badge">Movie</span>
            <h2>HIT The Third Case</h2>
            <p>Get ready for the HITVERSE</p>
            <div className="price-details">
              <strong>₹250.0</strong> / ticket &nbsp; <span>200 seats left</span>
            </div>
            <button className="book-now-btn">Book Now</button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <video autoPlay loop muted className="carousel-video">
            <source src="./videos/a2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="carousel-overlay"></div>
          <Carousel.Caption className="carousel-caption">
            <span className="badge">Movie</span>
            <h2>Animal</h2>
            <p>Park</p>
            <div className="price-details">
              <strong>₹300.00</strong> / ticket &nbsp; <span>150 seats left</span>
            </div>
            <button className="book-now-btn">Book Now</button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <MovieCards />
      <Footer />
    </div>
  );
};

// ✅ App with loader
const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <TicketRainLoader onFinish={() => setLoading(false)} />
      ) : (
        <Router>
          <Navbar />
          <div style={{ marginTop: "0px", padding: "0px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/eventpage" element={<EventPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/movies" element={<MoviePage />} />
              <Route path="/sports" element={<SportsEventPage />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/showtimes" element={<MovieShowTime />} />
              <Route path="/eventdetails/:id" element={<EventDetails />} />
              <Route path="/ticket-selection/:id" element={<TicketSelection />} />
              <Route path="/seatselection" element={<SeatSelection />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />\
              <Route path="AdminPage" element={<AdminPage />} />
              <Route path="/admin/add-movie" element={<AddMovie />} />
              <Route path="/admin/add-event" element={<AddEvent />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/ticket-confirmation" element={<TicketConfirmation />} />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
};

export default App;
