import React from "react";
import "./iPhone.css";
import Logo from "../images/body-logo.png";
import ContactForm from "./iPhoneContactForm.js";

const weekdays = [
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
  "Söndag",
];

class iPhone extends React.Component {
  constructor() {
    super();

    this.state = {
      volume: 7,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.arrowBlinker = this.arrowBlinker.bind(this);
    this.autoScroll = this.autoScroll.bind(this);
    this.setTime = this.setTime.bind(this);
    this.setVolume = this.setVolume.bind(this);
  }

  autoScroll() {
    const iPhone = document.querySelector(".iPhone-Screen");
    iPhone.scrollTop = iPhone.scrollHeight;
  }

  handleScroll() {
    const iPhone = document.querySelector(".iPhone-Screen");
    const iPhoneLogo = document.querySelector(".iPhone-Logo");
    const iPhoneScreen = document.querySelector(".iPhone-Screen");
    const iPhoneArrow = document.querySelector(".iPhone-Arrow");
    const iPhoneTime = document.querySelector(".iPhone-Time");
    const iPhoneLockedTime = document.querySelector(".iPhone-Locked-Time");

    if (iPhone.scrollTop > 200) {
      iPhoneLockedTime.classList.add("Hidden");
      iPhoneTime.classList.remove("Hidden");
      iPhoneLogo.classList.add("Hidden");
      iPhoneScreen.classList.add("Hidden");
      iPhoneArrow.classList.add("Hidden");
      iPhoneArrow.classList.remove("Blinker");
    } else {
      iPhoneLockedTime.classList.remove("Hidden");
      iPhoneLogo.classList.remove("Hidden");
      iPhoneScreen.classList.remove("Hidden");
      iPhoneArrow.classList.remove("Hidden");
      iPhoneTime.classList.add("Hidden");
    }
  }

  setTime() {
    const iPhoneTime = document.querySelector(".iPhone-Time");
    const iPhoneLockedTime = document.querySelector(".iPhone-Locked-Time p");
    const iPhoneLockedTimeDay = document.querySelector(
      ".iPhone-Locked-Time span"
    );

    var DateToday = new Date();
    var Hours = DateToday.getHours();
    var Minutes = DateToday.getMinutes();
    if (Minutes < 10) {
      Minutes = "0" + Minutes.toString();
    }
    var Time = Hours + ":" + Minutes;
    var Day = weekdays[DateToday.getDay() - 1];

    iPhoneTime.innerText = Time;
    iPhoneLockedTime.innerText = Time;
    iPhoneLockedTimeDay.innerText = Day;
  }

  toggleScreen() {
    const screenLock = document.querySelector(".iPhone-Locked");
    const iPhoneScreen = document.querySelector(".iPhone-Screen");
    if (screenLock.classList.contains("Show")) {
      iPhoneScreen.scrollTop = 0;
    }
    screenLock.classList.toggle("Show");
  }

  arrowBlinker() {
    const iPhoneArrow = document.querySelector(".iPhone-Arrow");
    if (!iPhoneArrow.classList.contains("Hidden")) {
      iPhoneArrow.classList.contains("Blinker")
        ? iPhoneArrow.classList.remove("Blinker")
        : iPhoneArrow.classList.add("Blinker");
    }
  }

  componentDidMount() {
    const iPhone = document.querySelector(".iPhone-Screen");
    iPhone.addEventListener("scroll", this.handleScroll);
    this.Blinker = setInterval(this.arrowBlinker, 1000);
    this.setTime();
    this.GetTime = setInterval(this.setTime, 1000);
  }

  componentWillUnmount() {
    const iPhone = document.querySelector(".iPhone-Screen");
    iPhone.removeEventListener("scroll", this.handleScroll);
    clearInterval(this.Blinker);
    clearInterval(this.GetTime);
  }

  setVolume(e) {
    const Volume = document.querySelector(".Volume-Wrapper");
    const VolumeButtons = document.querySelectorAll(".iPhone-Volume-Button");

    var removeVolume = setTimeout(function () {
      Volume.classList.remove("Show");
    }, 2000);

    VolumeButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        clearTimeout(removeVolume);
        removeVolume = setTimeout(function () {
          Volume.classList.remove("Show");
        }, 2000);
      });
    });

    Volume.classList.add("Show");

    if (e.target.classList[1] === "Higher") {
      if (this.state.volume <= 9) {
        this.setState({ volume: this.state.volume + 1 });
      }
    }

    if (e.target.classList[1] === "Lower") {
      if (this.state.volume > 0) {
        this.setState({ volume: this.state.volume - 1 });
      }
    }
  }

  render() {
    const volumeHeight = (100 / 10) * this.state.volume;
    const volume = {
      height: volumeHeight,
    };

    return (
      <>
        <div className="iPhone-Wrapper">
          <div className="iPhone-Volume-Buttons">
            <div
              value="Higher"
              onClick={this.setVolume}
              className="iPhone-Volume-Button Higher"
            ></div>
            <div
              name="Lower"
              onClick={this.setVolume}
              className="iPhone-Volume-Button Lower"
            ></div>
          </div>
          <div
            onClick={this.toggleScreen}
            className="iPhone-Power-Button"
          ></div>
          <div className="iPhone-Overlay"></div>
          <div className="iPhone-Locked"></div>
          <div className="iPhone">
            <div className="iPhone-Top">
              <div className="iPhone-Speaker"></div>
            </div>
            <div className="iPhone-Screen">
              <div className="Volume-Wrapper">
                <p className="Volume-Counter">{this.state.volume}</p>
                <div style={volume} className="Volume"></div>
              </div>
              <p className="iPhone-Time Hidden"></p>
              <i className="iPhone-Battery fas fa-battery-three-quarters"></i>
              <i className="iPhone-Wifi fas fa-wifi"></i>
              <div className="iPhone-Locked-Time">
                <p></p>
                <span></span>
              </div>
              <div className="iPhone-Logo">
                <img src={Logo} alt="Kite-Logo" />
              </div>
              <div className="iPhone-Content">
                <ContactForm />
              </div>
              <div className="iPhone-Arrow" onClick={this.autoScroll}>
                <p style={{ fontSize: "1.2rem" }}>SCROLL</p>
                <i className="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default iPhone;
