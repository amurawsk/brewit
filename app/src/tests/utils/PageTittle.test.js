import { render, screen } from '@testing-library/react';
import PageTitle from '../../components/utils/PageTitle';

describe('PageTitle', () => {
    it('should render the correct text', () => {
        render(<PageTitle text="Test Title" />);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should render the h1 element', () => {
        render(<PageTitle text="Test Title" />);

        const title = screen.getByText('Test Title');
        expect(title.tagName).toBe('H1');
    });

    it('should apply correct styles', () => {
        render(<PageTitle text="Test Title" />);

        const title = screen.getByText('Test Title');
        expect(title).toHaveClass('pageTitle');
    });
});
