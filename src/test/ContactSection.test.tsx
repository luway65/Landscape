import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactSection } from '../components/ui/ContactSection';

describe('ContactSection', () => {
  it('renders the contact form', () => {
    render(<ContactSection />);
    expect(screen.getByRole('heading', { name: /ready to scale/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    render(<ContactSection />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it('shows invalid email error', async () => {
    render(<ContactSection />);
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Smith' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'notanemail' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello there' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  it('shows success state after valid submission', async () => {
    render(<ContactSection />);
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Smith' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello there' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(
      () => {
        expect(screen.getByText(/message received/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
