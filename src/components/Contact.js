import React, { useContext } from "react";
import {
  Button,
  Container,
  Icon,
  Select,
  TextInput,
  Textarea,
} from "react-materialize";
import "../App.css";
import { ThemeContext } from "./ThemeContext";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const { theme } = useContext(ThemeContext);
  return (
    <div className="about5" style={{ backgroundColor: theme.backgroundColor }}>
      <Container>
        <h3 style={{ color: theme.color }}>Contact us</h3>
        <form onSubmit={handleSubmit}>
          <TextInput id="TextInput-38" label="Your Name" />
          <TextInput id="TextInput-39" label="Your Phone" />
          <TextInput email id="TextInput-41" label="Email" validate />
          <Select
            id="Select-46"
            multiple={false}
            onChange={function notRefCheck() {}}
            value=""
          >
            <option disabled value="">
              <span className="option">Choose your favourite nation</span>
            </option>
            <option value="1">Fantasty</option>
            <option value="2">Comedy</option>
            <option value="3">Adventure</option>
            <option value="4">Action</option>
            <option value="5">Drama</option>
            <option value="6">Crime</option>
          </Select>
          <Textarea
            icon={<Icon style={{ color: theme.color }}>mode_edit</Icon>}
            id="Textarea-28"
            label="Your content"
          />
          <Button
            className="button-submit"
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
}
