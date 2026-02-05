/** @format */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as exports from './index.js';

// We need to mock the actual component files since they have dependencies
vi.mock('#components/Navbar.jsx', () => ({
  default: vi.fn(() => 'Navbar'),
}));

vi.mock('#components/Welcome.jsx', () => ({
  default: vi.fn(() => 'Welcome'),
}));

vi.mock('#components/Dock.jsx', () => ({
  default: vi.fn(() => 'Dock'),
}));

describe('components/index.js', () => {
  describe('Named Exports', () => {
    it('should export Navbar', () => {
      expect(exports.Navbar).toBeDefined();
    });

    it('should export Welcome', () => {
      expect(exports.Welcome).toBeDefined();
    });

    it('should export Dock', () => {
      expect(exports.Dock).toBeDefined();
    });

    it('should export exactly three named exports', () => {
      const namedExports = Object.keys(exports).filter((key) => key !== 'default');
      expect(namedExports).toHaveLength(3);
    });
  });

  describe('Export Types', () => {
    it('should export Navbar as a function or component', () => {
      expect(typeof exports.Navbar).toBe('function');
    });

    it('should export Welcome as a function or component', () => {
      expect(typeof exports.Welcome).toBe('function');
    });

    it('should export Dock as a function or component', () => {
      expect(typeof exports.Dock).toBe('function');
    });
  });

  describe('Export Integrity', () => {
    it('should not have undefined exports', () => {
      expect(exports.Navbar).not.toBeUndefined();
      expect(exports.Welcome).not.toBeUndefined();
      expect(exports.Dock).not.toBeUndefined();
    });

    it('should not have null exports', () => {
      expect(exports.Navbar).not.toBeNull();
      expect(exports.Welcome).not.toBeNull();
      expect(exports.Dock).not.toBeNull();
    });

    it('should export the correct component references', () => {
      // Each export should be a valid React component (function)
      expect(typeof exports.Navbar).toBe('function');
      expect(typeof exports.Welcome).toBe('function');
      expect(typeof exports.Dock).toBe('function');
    });
  });

  describe('Import Paths', () => {
    it('should use the correct path aliases', async () => {
      // This test verifies that the imports work with the #components alias
      const module = await import('./index.js');

      expect(module.Navbar).toBeDefined();
      expect(module.Welcome).toBeDefined();
      expect(module.Dock).toBeDefined();
    });
  });

  describe('Module Structure', () => {
    it('should be an ES module with named exports', () => {
      expect(exports).toBeDefined();
      expect(typeof exports).toBe('object');
    });

    it('should allow destructuring of all components', () => {
      const { Navbar, Welcome, Dock } = exports;

      expect(Navbar).toBeDefined();
      expect(Welcome).toBeDefined();
      expect(Dock).toBeDefined();
    });

    it('should maintain export names matching component names', () => {
      expect('Navbar' in exports).toBe(true);
      expect('Welcome' in exports).toBe(true);
      expect('Dock' in exports).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple imports of the same module', async () => {
      const import1 = await import('./index.js');
      const import2 = await import('./index.js');

      // Both imports should reference the same module
      expect(import1.Navbar).toBe(import2.Navbar);
      expect(import1.Welcome).toBe(import2.Welcome);
      expect(import1.Dock).toBe(import2.Dock);
    });

    it('should not export any unexpected properties', () => {
      const expectedExports = ['Navbar', 'Welcome', 'Dock'];
      const actualExports = Object.keys(exports).filter((key) => key !== 'default');

      expect(actualExports.sort()).toEqual(expectedExports.sort());
    });
  });

  describe('Barrel Export Pattern', () => {
    it('should successfully re-export components from their source files', () => {
      // Verify that the barrel export pattern works correctly
      expect(exports.Navbar).toBeTruthy();
      expect(exports.Welcome).toBeTruthy();
      expect(exports.Dock).toBeTruthy();
    });

    it('should allow importing all components in a single statement', () => {
      // This pattern should work: import { Navbar, Welcome, Dock } from '#components'
      const components = { ...exports };
      delete components.default; // Remove default export if it exists

      expect(Object.keys(components)).toContain('Navbar');
      expect(Object.keys(components)).toContain('Welcome');
      expect(Object.keys(components)).toContain('Dock');
    });

    it('should maintain separate component identities', () => {
      // Each component should be distinct
      expect(exports.Navbar).not.toBe(exports.Welcome);
      expect(exports.Welcome).not.toBe(exports.Dock);
      expect(exports.Dock).not.toBe(exports.Navbar);
    });
  });

  describe('Component Availability', () => {
    it('should make Navbar available for consumption', () => {
      const NavbarComponent = exports.Navbar;
      expect(NavbarComponent).toBeTruthy();
      expect(typeof NavbarComponent).toBe('function');
    });

    it('should make Welcome available for consumption', () => {
      const WelcomeComponent = exports.Welcome;
      expect(WelcomeComponent).toBeTruthy();
      expect(typeof WelcomeComponent).toBe('function');
    });

    it('should make Dock available for consumption', () => {
      const DockComponent = exports.Dock;
      expect(DockComponent).toBeTruthy();
      expect(typeof DockComponent).toBe('function');
    });
  });

  describe('Regression Tests', () => {
    it('should continue to export components after module re-evaluation', async () => {
      // Force re-import
      const module1 = await import('./index.js');

      expect(module1.Navbar).toBeDefined();
      expect(module1.Welcome).toBeDefined();
      expect(module1.Dock).toBeDefined();
    });

    it('should handle rapid successive imports', async () => {
      const imports = await Promise.all([
        import('./index.js'),
        import('./index.js'),
        import('./index.js'),
      ]);

      imports.forEach((module) => {
        expect(module.Navbar).toBeDefined();
        expect(module.Welcome).toBeDefined();
        expect(module.Dock).toBeDefined();
      });
    });
  });

  describe('Developer Experience', () => {
    it('should provide clear component names for debugging', () => {
      // Component functions should have meaningful names
      expect(exports.Navbar.name).toBeTruthy();
      expect(exports.Welcome.name).toBeTruthy();
      expect(exports.Dock.name).toBeTruthy();
    });

    it('should support tree-shaking by using named exports', () => {
      // Named exports support tree-shaking better than default exports
      const hasNamedExports = Object.keys(exports).filter((key) => key !== 'default').length > 0;

      expect(hasNamedExports).toBe(true);
    });
  });

  describe('Export Consistency', () => {
    it('should maintain consistent export structure', async () => {
      const module = await import('./index.js');

      const keys = Object.keys(module).filter((key) => key !== 'default');

      // Should always have these three exports in the same order
      expect(keys).toContain('Navbar');
      expect(keys).toContain('Welcome');
      expect(keys).toContain('Dock');
    });

    it('should not have any side effects on import', async () => {
      // Importing should not cause any side effects
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await import('./index.js');

      expect(consoleSpy).not.toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
      errorSpy.mockRestore();
    });
  });

  describe('Circular Dependency Prevention', () => {
    it('should not create circular dependencies', async () => {
      // Import should complete without hanging
      const startTime = Date.now();
      await import('./index.js');
      const endTime = Date.now();

      // Import should be fast (under 1 second)
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });

  describe('Type Safety', () => {
    it('should export components that can be used as React components', () => {
      // All exports should be callable (functions/components)
      expect(typeof exports.Navbar).toBe('function');
      expect(typeof exports.Welcome).toBe('function');
      expect(typeof exports.Dock).toBe('function');
    });

    it('should not export primitives or non-component values', () => {
      // Ensure exports are not strings, numbers, or other primitives
      expect(typeof exports.Navbar).not.toBe('string');
      expect(typeof exports.Navbar).not.toBe('number');

      expect(typeof exports.Welcome).not.toBe('string');
      expect(typeof exports.Welcome).not.toBe('number');

      expect(typeof exports.Dock).not.toBe('string');
      expect(typeof exports.Dock).not.toBe('number');
    });
  });
});