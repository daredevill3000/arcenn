import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutArcen from '../AboutArcen';

describe('AboutArcen Component - Task 2.1 Verification', () => {
  it('displays the correct section title in subtitle', () => {
    render(<AboutArcen />);
    expect(screen.getByText(/ARCEN is being developed as a multi-layered technology system/i)).toBeInTheDocument();
  });

  it('describes the core focus on translating customer intent', () => {
    render(<AboutArcen />);
    expect(screen.getByText(/translation of unstructured customer intent into structured, manufacturable design outputs/i)).toBeInTheDocument();
  });

  it('displays all 9 technology components', () => {
    render(<AboutArcen />);
    
    const expectedComponents = [
      'AI/ML models',
      'Computer vision systems',
      'Parametric CAD/geometry engines',
      'High-throughput backend systems',
      'Event-driven pipelines',
      'Scalable cloud infrastructure',
      'Mobile and application layers with offline-first capabilities',
      'AR/XR and spatial computing interfaces',
      'Simulation and rendering systems'
    ];

    expectedComponents.forEach((component) => {
      expect(screen.getByText(component)).toBeInTheDocument();
    });
  });

  it('displays the development approach description', () => {
    render(<AboutArcen />);
    expect(screen.getByText(/Structured phases starting with MVP followed by progressive expansion/i)).toBeInTheDocument();
  });

  it('renders with correct grid layout classes', () => {
    const { container } = render(<AboutArcen />);
    const gridElement = container.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.md\\:grid-cols-3');
    expect(gridElement).toBeInTheDocument();
  });

  it('uses SectionHeader with correct props', () => {
    render(<AboutArcen />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
    expect(screen.getByText('MULTI-LAYERED TECHNOLOGY SYSTEM')).toBeInTheDocument();
  });

  it('displays technology components section header', () => {
    render(<AboutArcen />);
    expect(screen.getByText('// TECHNOLOGY COMPONENTS')).toBeInTheDocument();
  });

  it('displays development approach section header', () => {
    render(<AboutArcen />);
    expect(screen.getByText('DEVELOPMENT APPROACH')).toBeInTheDocument();
  });

  it('numbers technology components from 01 to 09', () => {
    const { container } = render(<AboutArcen />);
    const numbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];
    
    numbers.forEach((num) => {
      const elements = container.querySelectorAll(`span.font-mono.text-xs.text-\\[\\#D85B46\\]`);
      const hasNumber = Array.from(elements).some(el => el.textContent === num);
      expect(hasNumber).toBe(true);
    });
  });
});
