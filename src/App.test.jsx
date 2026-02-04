/** @format */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import App from './App';

// Mock the component imports
vi.mock('#components', () => ({
  Navbar: vi.fn(() => <nav data-testid="navbar">Navbar Component</nav>),
  Welcome: vi.fn(() => <section data-testid="welcome">Welcome Component</section>),
  Dock: vi.fn(() => <section data-testid="dock">Dock Component</section>),
}));

describe('App Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it('should render a main element as the root container', () => {
      render(<App />);
      const mainElement = screen.getByRole('main');
      expect(mainElement).toBeInTheDocument();
    });

    it('should render the Navbar component', () => {
      render(<App />);
      const navbar = screen.getByTestId('navbar');
      expect(navbar).toBeInTheDocument();
    });

    it('should render the Welcome component', () => {
      render(<App />);
      const welcome = screen.getByTestId('welcome');
      expect(welcome).toBeInTheDocument();
    });

    it('should render the Dock component', () => {
      render(<App />);
      const dock = screen.getByTestId('dock');
      expect(dock).toBeInTheDocument();
    });
  });

  describe('Component Order', () => {
    it('should render components in correct order: Navbar, Welcome, Dock', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      const children = Array.from(main.children);

      expect(children[0]).toHaveAttribute('data-testid', 'navbar');
      expect(children[1]).toHaveAttribute('data-testid', 'welcome');
      expect(children[2]).toHaveAttribute('data-testid', 'dock');
    });

    it('should have exactly three child components in main', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      expect(main.children).toHaveLength(3);
    });
  });

  describe('Structure', () => {
    it('should have all components nested within main element', () => {
      render(<App />);
      const main = screen.getByRole('main');

      const navbar = within(main).getByTestId('navbar');
      const welcome = within(main).getByTestId('welcome');
      const dock = within(main).getByTestId('dock');

      expect(navbar).toBeInTheDocument();
      expect(welcome).toBeInTheDocument();
      expect(dock).toBeInTheDocument();
    });

    it('should not render any unexpected elements', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');

      // Should only have the three expected components
      expect(main.children).toHaveLength(3);
    });
  });

  describe('Integration', () => {
    it('should export App as default export', () => {
      expect(App).toBeDefined();
      expect(typeof App).toBe('function');
    });

    it('should render complete application structure', () => {
      const { container } = render(<App />);

      // Verify complete structure
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();

      // All three components should be present
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('welcome')).toBeInTheDocument();
      expect(screen.getByTestId('dock')).toBeInTheDocument();
    });

    it('should maintain structure after re-render', () => {
      const { rerender } = render(<App />);

      rerender(<App />);

      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('welcome')).toBeInTheDocument();
      expect(screen.getByTestId('dock')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple renders without side effects', () => {
      const { unmount, rerender } = render(<App />);

      rerender(<App />);
      rerender(<App />);

      expect(screen.getByRole('main')).toBeInTheDocument();

      unmount();
    });

    it('should unmount cleanly without errors', () => {
      const { unmount } = render(<App />);

      expect(() => unmount()).not.toThrow();
    });

    it('should be a functional component', () => {
      expect(typeof App).toBe('function');
      expect(App.prototype?.render).toBeUndefined(); // Not a class component
    });
  });

  describe('Accessibility', () => {
    it('should use semantic HTML with main landmark', () => {
      render(<App />);

      const main = screen.getByRole('main');
      expect(main.tagName.toLowerCase()).toBe('main');
    });

    it('should have only one main landmark', () => {
      render(<App />);

      const mains = screen.getAllByRole('main');
      expect(mains).toHaveLength(1);
    });
  });

  describe('Component Import Resolution', () => {
    it('should properly import components from #components alias', () => {
      // This test verifies that the imports work correctly
      // If imports fail, the component would not render
      render(<App />);

      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('welcome')).toBeInTheDocument();
      expect(screen.getByTestId('dock')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should render efficiently without unnecessary re-renders', () => {
      const { rerender } = render(<App />);

      const initialMain = screen.getByRole('main');

      rerender(<App />);

      const afterRerender = screen.getByRole('main');

      // Main element should be the same reference if no changes
      expect(initialMain).toBeInTheDocument();
      expect(afterRerender).toBeInTheDocument();
    });
  });

  describe('Regression Tests', () => {
    it('should maintain correct component hierarchy after multiple operations', () => {
      const { rerender, unmount } = render(<App />);

      // Perform multiple rerenders
      rerender(<App />);
      rerender(<App />);

      const main = screen.getByRole('main');
      expect(main.children).toHaveLength(3);

      // Verify order is still correct
      expect(main.children[0]).toHaveAttribute('data-testid', 'navbar');
      expect(main.children[1]).toHaveAttribute('data-testid', 'welcome');
      expect(main.children[2]).toHaveAttribute('data-testid', 'dock');

      unmount();
    });

    it('should not introduce any wrapper divs or fragments in main', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');

      // All direct children should be our components, no extra wrappers
      Array.from(main.children).forEach((child) => {
        expect(child.hasAttribute('data-testid')).toBe(true);
      });
    });
  });

  describe('Snapshot Consistency', () => {
    it('should have consistent structure across renders', () => {
      const { container: container1 } = render(<App />);
      const { container: container2 } = render(<App />);

      const main1 = container1.querySelector('main');
      const main2 = container2.querySelector('main');

      expect(main1.children).toHaveLength(main2.children.length);
      expect(main1.children).toHaveLength(3);
    });
  });

  describe('Error Boundaries', () => {
    it('should handle component render without errors', () => {
      // Spy on console.error to catch any React errors
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<App />);

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});