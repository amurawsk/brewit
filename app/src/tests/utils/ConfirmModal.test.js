import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from '../../components/utils/ConfirmModal';

describe('ConfirmModal', () => {
    it('should render modal with message and buttons', () => {
        render(
            <ConfirmModal
                message="Are you sure?"
                onConfirm={jest.fn()}
                onCancel={jest.fn()}
            />
        );

        expect(screen.getByText('Are you sure?')).toBeInTheDocument();
        expect(screen.getByText('Tak')).toBeInTheDocument();
        expect(screen.getByText('Cofnij')).toBeInTheDocument();
    });

    it('should render description if provided', () => {
        render(
            <ConfirmModal
                message="Are you sure?"
                description="This action cannot be undone."
                onConfirm={jest.fn()}
                onCancel={jest.fn()}
            />
        );

        expect(
            screen.getByText('This action cannot be undone.')
        ).toBeInTheDocument();
    });

    it('should call onConfirm when "Tak" button is clicked', () => {
        const mockOnConfirm = jest.fn();
        render(
            <ConfirmModal
                message="Are you sure?"
                onConfirm={mockOnConfirm}
                onCancel={jest.fn()}
            />
        );

        fireEvent.click(screen.getByText('Tak'));

        expect(mockOnConfirm).toHaveBeenCalled();
    });

    it('should call onCancel when "Cofnij" button is clicked', () => {
        const mockOnCancel = jest.fn();
        render(
            <ConfirmModal
                message="Are you sure?"
                onConfirm={jest.fn()}
                onCancel={mockOnCancel}
            />
        );

        fireEvent.click(screen.getByText('Cofnij'));

        expect(mockOnCancel).toHaveBeenCalled();
    });
});
