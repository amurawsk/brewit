import { render, screen, fireEvent } from '@testing-library/react';
import ChangePriceModal from '../../components/utils/ChangePriceModal';

describe('ChangePriceModal', () => {
    it('should render modal with input and buttons', () => {
        render(<ChangePriceModal onConfirm={jest.fn()} onCancel={jest.fn()} />);

        expect(screen.getByText('Zmiana ceny')).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('Wprowadź nową cenę')
        ).toBeInTheDocument();
        expect(screen.getByText('Zatwierdź')).toBeInTheDocument();
        expect(screen.getByText('Anuluj')).toBeInTheDocument();
    });

    it('should update the newPrice state when user types in input', () => {
        render(<ChangePriceModal onConfirm={jest.fn()} onCancel={jest.fn()} />);

        const input = screen.getByPlaceholderText('Wprowadź nową cenę');

        fireEvent.change(input, { target: { value: '100' } });

        expect(input.value).toBe('100');
    });

    it('should call onConfirm with the new price when form is submitted', () => {
        const mockOnConfirm = jest.fn();
        render(
            <ChangePriceModal onConfirm={mockOnConfirm} onCancel={jest.fn()} />
        );

        const input = screen.getByPlaceholderText('Wprowadź nową cenę');
        const submitButton = screen.getByText('Zatwierdź');

        fireEvent.change(input, { target: { value: '200' } });

        fireEvent.click(submitButton);

        expect(mockOnConfirm).toHaveBeenCalledWith('200');
    });

    it('should call onCancel when Cancel button is clicked', () => {
        const mockOnCancel = jest.fn();
        render(
            <ChangePriceModal onConfirm={jest.fn()} onCancel={mockOnCancel} />
        );

        const cancelButton = screen.getByText('Anuluj');

        fireEvent.click(cancelButton);

        expect(mockOnCancel).toHaveBeenCalled();
    });

    it('should not call onConfirm if input is empty', () => {
        const mockOnConfirm = jest.fn();
        render(
            <ChangePriceModal onConfirm={mockOnConfirm} onCancel={jest.fn()} />
        );

        const submitButton = screen.getByText('Zatwierdź');

        fireEvent.click(submitButton);

        expect(mockOnConfirm).not.toHaveBeenCalled();
    });
});
