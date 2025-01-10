import { render, screen } from '@testing-library/react';
import PageTittle from '../../components/PageTittle';

describe('PageTittle', () => {
    it('should render the correct text', () => {
        render(<PageTittle text="Test Title" />);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should render the h1 element', () => {
        render(<PageTittle text="Test Title" />);

        const title = screen.getByText('Test Title');
        expect(title.tagName).toBe('H1');
    });

    it('should apply correct styles', () => {
        render(<PageTittle text="Test Title" />);

        const title = screen.getByText('Test Title');
        expect(title).toHaveClass('pageTittle');
    });
});
