import Nav from "./components/nav/Nav";

const Instructions = () => {
  return (
    <Nav>
      <Nav.Title />
      <Nav.Links>
        <Nav.Link to="/">Home</Nav.Link>
        <Nav.Link to="/instructions">Instructions</Nav.Link>
      </Nav.Links>
    </Nav>
  );
};

export default Instructions;
