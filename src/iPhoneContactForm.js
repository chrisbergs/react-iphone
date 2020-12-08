import React from "react";
import { SendMail } from "../helpers/SendMail.js";

import "./iPhoneContactForm.css";

class ContactForm extends React.Component {
  constructor() {
    super();

    this.handleUnFocus = this.handleUnFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    let response = await SendMail(this.state);
    console.log(response);
    this.props.closeContactForm();
    if (response.data.sent === true) {
      this.props.handleMessage("Meddelandet har skickats!");
    } else {
      this.props.handleMessage(
        "Något gick snett när vi försökte skicka meddelandet, försök igen!"
      );
    }
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleUnFocus(e) {
    const Input = e.target;
    Input.value
      ? Input.classList.add("Has-Value")
      : Input.classList.remove("Has-Value");
  }

  render() {
    return (
      <>
        <form className="iPhone-Contact-Form" onSubmit={this.handleSubmit}>
          <h3>Kontakta oss</h3>
          <div className="Wrap-Input">
            <input
              type="text"
              name="name"
              onChange={this.handleInputChange}
              onBlur={this.handleUnFocus}
              className="Input"
              required
            ></input>
            <span className="Focus-Input">Namn</span>
          </div>
          <div className="Wrap-Input">
            <input
              type="text"
              name="phone"
              onChange={this.handleInputChange}
              onBlur={this.handleUnFocus}
              className="Input"
              required
            ></input>
            <span className="Focus-Input">Telefonnummer</span>
          </div>
          <div className="Wrap-Input">
            <input
              type="email"
              name="email"
              onChange={this.handleInputChange}
              onBlur={this.handleUnFocus}
              className="Input"
              required
            ></input>
            <span className="Focus-Input">E-post</span>
          </div>
          <div className="Wrap-Input Message">
            <textarea
              name="message"
              onChange={this.handleInputChange}
              onBlur={this.handleUnFocus}
              rows="4"
              className="Input"
              required
            ></textarea>
            <span className="Focus-Input">Meddelande</span>
          </div>
          <button type="submit">Skicka</button>
        </form>
      </>
    );
  }
}

export default ContactForm;
