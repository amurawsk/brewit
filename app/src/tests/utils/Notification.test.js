import { render, screen } from '@testing-library/react';
import Notification from '../../components/utils/Notification';

describe('Notification', () => {
    it('should render notification when isVisible is true', () => {
        render(<Notification message="Test message" isVisible={true} />);

        expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('should not render notification when isVisible is false', () => {
        render(<Notification message="Test message" isVisible={false} />);

        expect(screen.queryByText('Test message')).toBeNull();
    });

    it('should render correct message', () => {
        render(<Notification message="Custom message" isVisible={true} />);

        expect(screen.getByText('Custom message')).toBeInTheDocument();
    });
});
