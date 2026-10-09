import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RecruitmentSection from '../RecruitmentSection';

describe('RecruitmentSection Component - Task 3.1', () => {
  it('renders section with correct id and scroll offset class', () => {
    const mockOnOpenApply = vi.fn();
    const { container } = render(<RecruitmentSection onOpenApply={mockOnOpenApply} />);
    
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('id', 'recruitment');
    expect(section).toHaveClass('scroll-mt-20');
  });

  it('accepts onOpenApply prop', () => {
    const mockOnOpenApply = vi.fn();
    expect(() => render(<RecruitmentSection onOpenApply={mockOnOpenApply} />)).not.toThrow();
  });

  it('renders with max-w-7xl container', () => {
    const mockOnOpenApply = vi.fn();
    const { container } = render(<RecruitmentSection onOpenApply={mockOnOpenApply} />);
    
    const maxWidthContainer = container.querySelector('.max-w-7xl');
    expect(maxWidthContainer).toBeInTheDocument();
  });

  it('renders section header with correct props', () => {
    const mockOnOpenApply = vi.fn();
    render(<RecruitmentSection onOpenApply={mockOnOpenApply} />);
    
    // Verify section label
    expect(screen.getByText('RECRUITMENT')).toBeInTheDocument();
    
    // Verify meta text
    expect(screen.getByText('TECHNICAL ROLES')).toBeInTheDocument();
    
    // Verify title text
    expect(screen.getByText(/COME BUILD/i)).toBeInTheDocument();
    expect(screen.getByText(/WITH US/i)).toBeInTheDocument();
  });

  it('uses design system background color', () => {
    const mockOnOpenApply = vi.fn();
    const { container } = render(<RecruitmentSection onOpenApply={mockOnOpenApply} />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-[#F2EFE6]');
  });

  it('has responsive padding classes', () => {
    const mockOnOpenApply = vi.fn();
    const { container } = render(<RecruitmentSection onOpenApply={mockOnOpenApply} />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('py-28', 'sm:py-36');
    
    const maxWidthContainer = container.querySelector('.max-w-7xl');
    expect(maxWidthContainer).toHaveClass('px-6', 'sm:px-10');
  });

  it('renders with proper border styling', () => {
    const mockOnOpenApply = vi.fn();
    const { container } = render(<RecruitmentSection onOpenApply={mockOnOpenApply} />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('border-b', 'border-[#11120F]/14');
  });
});
