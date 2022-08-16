import react from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";


const renderWithRouter = (Component) => {
    const history = createMemoryHistory();
    return ({
        ...render(<Router history={ history }>{Component}</Router>),
        history,
    })
}

export default renderWithRouter;