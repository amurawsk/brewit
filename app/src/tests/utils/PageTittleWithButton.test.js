import { render, screen, fireEvent } from '@testing-library/react';
import PageTittleWithButton from '../../components/utils/PageTittleWithButton';

describe('PageTittleWithButton', () => {
    it('should render the correct title text', () => {
        render(
            <PageTittleWithButton
                text="Test Title"
                buttonText="Click Me"
                buttonFunction={jest.fn()}
            />
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should render the correct button text', () => {
        render(
            <PageTittleWithButton
                text="Test Title"
                buttonText="Click Me"
                buttonFunction={jest.fn()}
            />
        );

        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('should call buttonFunction when button is clicked', () => {
        const mockButtonFunction = jest.fn();
        render(
            <PageTittleWithButton
                text="Test Title"
                buttonText="Click Me"
                buttonFunction={mockButtonFunction}
            />
        );

        fireEvent.click(screen.getByText('Click Me'));

        expect(mockButtonFunction).toHaveBeenCalled();
    });

    it('should apply correct styles to title and button', () => {
        render(
            <PageTittleWithButton
                text="Test Title"
                buttonText="Click Me"
                buttonFunction={jest.fn()}
            />
        );

        const title = screen.getByText('Test Title');
        const button = screen.getByText('Click Me');

        expect(title).toHaveClass('tittle');
        expect(button).toHaveClass('button');
    });
});
