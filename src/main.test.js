import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/dom';
import Slider from './main.js';

function setupDom(){
  const quotes = `
    <div id="quoteList">
      <div>This is a sample quote</div>
      <div>And this is another quote</div>
      <div>Yet another quote</div>
    </div>
  `;

  document.body.innerHTML = quotes;
}

beforeEach(() => {
  setupDom();
});

it('Renders prev and next buttons', () => {
  new Slider("quoteList");

  expect(screen.queryByLabelText("Previous")).toBeInTheDocument();
  expect(screen.queryByLabelText("Next")).toBeInTheDocument();
});

it('Hides prev and next buttons if hideActions is true', () => {
  new Slider("quoteList", {hideActions: true});

  expect(screen.queryByLabelText("Previous")).toBeNull();
  expect(screen.queryByLabelText("Next")).toBeNull();
});

it('Returns correct onChange params', () => {
  const onChange = jest.fn();
  new Slider("quoteList", {
    onChange
  });

  expect(onChange).not.toHaveBeenCalled();
  fireEvent.click(screen.getByLabelText("Next"));
  expect(onChange).toHaveBeenCalledWith(1, 50);
});