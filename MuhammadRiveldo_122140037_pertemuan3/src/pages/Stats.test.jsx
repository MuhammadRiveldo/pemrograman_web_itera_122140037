import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stats from './Stats';
import useBookStats from '../hooks/useBookStats';

// Mock untuk costum hook
jest.mock('../hooks/useBookStats');

describe('Stats Component', () => {
    it('renders the stats correctly', () => {
        // Mock mengembalikan nilai hook
        useBookStats.mockReturnValue({
            total: 10,
            owned: 5,
            reading: 3,
            wishlist: 2,
        });

        render(<Stats />);

        // cek untuk statistik ditampilkan dengan benar
        expect(screen.getByText('Statistik Buku')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('Milik Saya')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('Sedang Dibaca')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('Ingin Membeli')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('Total Buku')).toBeInTheDocument();
    });

    it('renders correctly when stats are zero', () => {
        useBookStats.mockReturnValue({
            total: 0,
            owned: 0,
            reading: 0,
            wishlist: 0,
        });

        render(<Stats />);

        //expect(screen.getByText('0')).toBeInTheDocument();
        expect(screen.getByText('Milik Saya')).toBeInTheDocument();
        expect(screen.getByText('Sedang Dibaca')).toBeInTheDocument();
        expect(screen.getByText('Ingin Membeli')).toBeInTheDocument();
        expect(screen.getByText('Total Buku')).toBeInTheDocument();
    });

    it('renders correctly with large numbers', () => {
        useBookStats.mockReturnValue({
            total: 1000,
            owned: 500,
            reading: 300,
            wishlist: 200,
        });

        render(<Stats />);

        expect(screen.getByText('500')).toBeInTheDocument();
        expect(screen.getByText('300')).toBeInTheDocument();
        expect(screen.getByText('200')).toBeInTheDocument();
        expect(screen.getByText('1000')).toBeInTheDocument();
    });
});