import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookFilter from './BookFilter';

describe('BookFilter Component', () => {
    it('renders correctly with default props', () => {
        const mockSetFilterStatus = jest.fn();
        render(<BookFilter filterStatus="all" setFilterStatus={mockSetFilterStatus} />);

        expect(screen.getByText('Semua Status')).toBeInTheDocument();
        expect(screen.getByText('Milik Saya')).toBeInTheDocument();
        expect(screen.getByText('Sedang Dibaca')).toBeInTheDocument();
        expect(screen.getByText('Ingin Membeli')).toBeInTheDocument();
    });

    it('calls setFilterStatus when a new option is selected', () => {
        const mockSetFilterStatus = jest.fn();
        render(<BookFilter filterStatus="all" setFilterStatus={mockSetFilterStatus} />);

        const selectElement = screen.getByRole('combobox');
        fireEvent.change(selectElement, { target: { value: 'milik' } });

        expect(mockSetFilterStatus).toHaveBeenCalledTimes(1);
        expect(mockSetFilterStatus).toHaveBeenCalledWith('milik');
    });

    it('displays the correct value based on filterStatus prop', () => {
        const mockSetFilterStatus = jest.fn();
        render(<BookFilter filterStatus="baca" setFilterStatus={mockSetFilterStatus} />);

        expect(screen.getByRole('combobox')).toHaveValue('baca');
    });

    it('renders all options correctly', () => {
        const mockSetFilterStatus = jest.fn();
        render(<BookFilter filterStatus="all" setFilterStatus={mockSetFilterStatus} />);

        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(4);
        expect(options[0]).toHaveTextContent('Semua Status');
        expect(options[1]).toHaveTextContent('Milik Saya');
        expect(options[2]).toHaveTextContent('Sedang Dibaca');
        expect(options[3]).toHaveTextContent('Ingin Membeli');
    });
});