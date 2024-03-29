import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
    it('renders without crashing', () => {
        render(<Dashboard />);
    });

    it('renders strike, ball, foul and hit buttons', () => {
        const { getByText } = render(<Dashboard />);

        const strikeBtn = getByText(/record strike/i);
        const ballBtn = getByText(/record ball/i);
        const foulBtn = getByText(/record foul/i);
        const hitBtn = getByText(/record hit/i);

        expect(strikeBtn).toBeInTheDocument();
        expect(ballBtn).toBeInTheDocument();
        expect(foulBtn).toBeInTheDocument();
        expect(hitBtn).toBeInTheDocument();
    })

    it('updates strike count according to game rules when strike button is fired', () => {
        const { getByTestId, getByText } = render(<Dashboard />);
    
        const strikeButton = getByText(/record strike/i);
        const strikeCount = getByTestId('strikes');
    
        expect(strikeCount.textContent).toBe("0");
        fireEvent.click(strikeButton);
        expect(strikeCount.textContent).toBe("1");
        fireEvent.click(strikeButton);
        expect(strikeCount.textContent).toBe("2");
        fireEvent.click(strikeButton);
        expect(strikeCount.textContent).toBe("0");
    });

    it('updates ball count according to game rules when ball button is fired', () => {
        const { getByTestId, getByText } = render(<Dashboard />);
    
        const ballButton = getByText(/record ball/i);
        const ballCount = getByTestId('balls');
    
        expect(ballCount.textContent).toBe("0");
        fireEvent.click(ballButton);
        expect(ballCount.textContent).toBe("1");
        fireEvent.click(ballButton);
        expect(ballCount.textContent).toBe("2");
        fireEvent.click(ballButton);
        expect(ballCount.textContent).toBe("3");
        fireEvent.click(ballButton);
        expect(ballCount.textContent).toBe("0");
    });

    it('updates strike count according to game rules when foul button is fired', () => {
        const { getByTestId, getByText } = render(<Dashboard />);
    
        const foulButton = getByText(/record foul/i);
        const strikeCount = getByTestId('strikes');

        fireEvent.click(foulButton);
        expect(strikeCount.textContent).toBe("1");
        fireEvent.click(foulButton);
        expect(strikeCount.textContent).toBe("2");
        fireEvent.click(foulButton);
        expect(strikeCount.textContent).toBe("2");
    });

    it('resets ball and strike count when hit button is pressed', () => {
        const { getByTestId, getByText } = render(<Dashboard />);
        const strikeCount = getByTestId("strikes");
        const ballCount = getByTestId("balls");
        const hitButton = getByText(/record hit/i);

        fireEvent.click(hitButton);
        expect(strikeCount.textContent).toBe("0");
        expect(ballCount.textContent).toBe("0");
        
    })

})